'use client';

import { useState, useEffect } from 'react';
import { 
    Save, 
    Loader2, 
    Check, 
    AlertCircle,
    Plus,
    Trash2,
    MessageSquare,
    Star,
    Type,
    BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatTemplate {
    id: string;
    label_en: string;
    label_hi: string;
    prompt_en: string;
    prompt_hi: string;
}

export default function GuruAiManager() {
    const [templates, setTemplates] = useState<ChatTemplate[]>([]);
    const [instruction, setInstruction] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const ADMIN_SECRET = 'mantrapuja-admin-keys';

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/guru-ai?secret=${ADMIN_SECRET}`);
            const json = await res.json();
            if (json.data) {
                setTemplates(JSON.parse(json.data.templates || '[]'));
                setInstruction(json.data.instruction || '');
            }
        } catch (error: any) {
            console.error('Fetch Error:', error);
            setMessage({ type: 'error', text: `Failed to fetch settings: ${error.message}` });
        } finally {
            setIsLoading(false);
        }
    };

    const saveSettings = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/admin/guru-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    secret: ADMIN_SECRET, 
                    templates, 
                    instruction 
                })
            });

            if (!res.ok) throw new Error('Failed to save settings.');
            
            setMessage({ type: 'success', text: 'Guru AI settings updated successfully.' });
        } catch (error: any) {
            console.error('Save Error:', error);
            setMessage({ type: 'error', text: `Save failed: ${error.message}` });
        } finally {
            setIsSaving(false);
        }
    };

    const addTemplate = () => {
        const newTemplate: ChatTemplate = {
            id: `temp_${Date.now()}`,
            label_en: 'New Template',
            label_hi: 'नया टेम्पलेट',
            prompt_en: 'Please guide me about...',
            prompt_hi: 'कृपया मुझे बताएं...'
        };
        setTemplates([...templates, newTemplate]);
    };

    const updateTemplate = (id: string, updates: Partial<ChatTemplate>) => {
        setTemplates(templates.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const removeTemplate = (id: string) => {
        setTemplates(templates.filter(t => t.id !== id));
    };

    if (isLoading) {
        return (
            <div className="p-20 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <BrainCircuit className="text-indigo-600" />
                        Guru AI Configuration
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Manage chat templates and AI response directives</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={addTemplate}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Plus size={18} /> Add Template
                    </button>
                    <button
                        onClick={saveSettings}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </header>

            {message && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                        message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}
                >
                    {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    <span className="text-sm font-medium">{message.text}</span>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* System Instruction */}
                <div className="lg:col-span-12">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            <Star size={16} /> First Response Instruction (System Prompt)
                        </h2>
                        <textarea
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                            rows={6}
                            placeholder="Enter instructions for the AI on how to handle initial greetings and template responses..."
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 ring-indigo-600/10 outline-none font-medium text-slate-700 transition-all"
                        />
                        <p className="text-[11px] text-slate-400 mt-3 italic">
                            Tip: These instructions are appended to the core system prompt to refine its spiritual persona and response style.
                        </p>
                    </div>
                </div>

                {/* Templates Section */}
                <div className="lg:col-span-12">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <MessageSquare size={16} /> Chat Quick-Start Templates
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {templates.map((template, index) => (
                                <motion.div
                                    key={template.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-6 relative group hover:border-indigo-200 transition-all shadow-sm"
                                >
                                    <button 
                                        onClick={() => removeTemplate(template.id)}
                                        className="absolute top-4 right-4 p-2 bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">
                                                {index + 1}
                                            </div>
                                            <h3 className="font-bold text-slate-800">Template Details</h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-1 space-y-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                    <Type size={10} /> Label (English)
                                                </label>
                                                <input 
                                                    value={template.label_en}
                                                    onChange={e => updateTemplate(template.id, { label_en: e.target.value })}
                                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:ring-1 ring-indigo-500"
                                                />
                                            </div>
                                            <div className="col-span-1 space-y-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                    <Type size={10} /> Label (Hindi)
                                                </label>
                                                <input 
                                                    value={template.label_hi}
                                                    onChange={e => updateTemplate(template.id, { label_hi: e.target.value })}
                                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:ring-1 ring-indigo-500"
                                                />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                    Prompts (AI Message)
                                                </label>
                                                <div className="space-y-3">
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-2.5 text-[10px] font-bold text-slate-300">EN</span>
                                                        <textarea 
                                                            rows={2}
                                                            value={template.prompt_en}
                                                            onChange={e => updateTemplate(template.id, { prompt_en: e.target.value })}
                                                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none focus:ring-1 ring-indigo-500"
                                                            placeholder="Prompt in English"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-2.5 text-[10px] font-bold text-slate-300">HI</span>
                                                        <textarea 
                                                            rows={2}
                                                            value={template.prompt_hi}
                                                            onChange={e => updateTemplate(template.id, { prompt_hi: e.target.value })}
                                                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none focus:ring-1 ring-indigo-500 text-right"
                                                            placeholder="Prompt in Hindi"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {templates.length === 0 && (
                            <div className="col-span-full p-12 text-center bg-slate-50 border border-slate-200 border-dashed rounded-3xl">
                                <MessageSquare size={32} className="mx-auto text-slate-300 mb-3" />
                                <h3 className="text-sm font-bold text-slate-500">No Custom Templates Yet</h3>
                                <button onClick={addTemplate} className="text-indigo-600 text-xs font-bold mt-2 hover:underline">Create First Template</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
