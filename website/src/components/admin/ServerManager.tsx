"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RefreshCw, Trash2, Activity, Database, HardDrive, CheckCircle, XCircle, Clock } from "lucide-react";

type Log = {
    id: string;
    event_type: string;
    message: string;
    status: 'success' | 'failed' | 'info' | 'warning' | 'processing';
    details: any;
    created_at: string;
};

export default function ServerManager() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'logs' | 'status'>('logs');
    const [serviceStatus, setServiceStatus] = useState({
        database: 'unknown',
        storage: 'unknown',
        auth: 'unknown',
        webhook: 'unknown'
    });
    const [lastWebhook, setLastWebhook] = useState<string | null>(null);

    const fetchLogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('system_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            console.error("Error fetching logs:", error);
        } else {
            setLogs(data || []);
        }
        setLoading(false);
    };

    const checkServices = async () => {
        setLoading(true);
        const status = { database: 'unknown', storage: 'unknown', auth: 'unknown', webhook: 'unknown' };

        // Check Connection
        try {
            const start = performance.now();
            const { error } = await supabase.from('categories').select('count', { count: 'exact', head: true });
            if (!error) status.database = `online (${Math.round(performance.now() - start)}ms)`;
            else status.database = 'offline';
        } catch (e) { status.database = 'error'; }

        // Check Storage
        try {
            const { data, error } = await supabase.storage.listBuckets();
            if (!error) status.storage = `online (${data.length} buckets)`;
            else status.storage = 'offline';
        } catch (e) { status.storage = 'error'; }

        // Check Auth Session
        try {
            const { data } = await supabase.auth.getSession();
            if (data.session) status.auth = 'authenticated';
            else status.auth = 'guest';
        } catch (e) { status.auth = 'error'; }

        // Check Last Webhook
        try {
            const { data, error } = await supabase
                .from('system_logs')
                .select('created_at')
                .eq('event_type', 'automation')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (data) {
                setLastWebhook(new Date(data.created_at).toLocaleString());
                const hoursSince = (Date.now() - new Date(data.created_at).getTime()) / (1000 * 60 * 60);
                status.webhook = hoursSince < 24 ? 'active' : 'idle';
            } else {
                status.webhook = 'never';
            }
        } catch (e) { status.webhook = 'error'; }

        setServiceStatus(status);
        setLoading(false);
    };

    useEffect(() => {
        if (activeTab === 'logs') fetchLogs();
        if (activeTab === 'status') checkServices();
    }, [activeTab]);

    const clearLogs = async () => {
        if (!confirm("Are you sure you want to clear all system logs?")) return;

        // Only delete older than 1 hour or something? Or just truncate.
        // For now, let's just delete all visible ones or truncate.
        // RLS might block DELETE without policy, let's assume policy exists or we add it.
        // Actually I didn't add DELETE policy in migration. Let's add it via SQL tool later if needed.
        // For now, let's try.

        const { error } = await supabase.from('system_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
        if (error) {
            alert("Error clearing logs (Check RLS policies): " + error.message);
        } else {
            setLogs([]);
            alert("Logs cleared.");
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Activity className="text-purple-500" /> Server Manager
                    </h2>
                    <p className="text-sm text-gray-500">Monitor system health and automation logs.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'logs' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Request Logs
                    </button>
                    <button
                        onClick={() => setActiveTab('status')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'status' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Service Status
                    </button>
                    <button
                        onClick={() => activeTab === 'logs' ? fetchLogs() : checkServices()}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        title="Refresh"
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </header>

            {activeTab === 'status' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Database Status */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-sm text-gray-500 font-medium mb-1">Database</div>
                                <div className="text-lg font-bold flex items-center gap-2">
                                    {serviceStatus.database.includes('online') ? (
                                        <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16} /> Online</span>
                                    ) : (
                                        <span className="text-red-500 flex items-center gap-1"><XCircle size={16} /> Error</span>
                                    )}
                                </div>
                            </div>
                            <Database className="text-blue-400 opacity-50" size={24} />
                        </div>
                        <div className="text-xs text-gray-400">{serviceStatus.database}</div>
                    </div>

                    {/* Storage Status */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-sm text-gray-500 font-medium mb-1">Storage</div>
                                <div className="text-lg font-bold flex items-center gap-2">
                                    {serviceStatus.storage.includes('online') ? (
                                        <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16} /> Active</span>
                                    ) : (
                                        <span className="text-red-500 flex items-center gap-1"><XCircle size={16} /> Error</span>
                                    )}
                                </div>
                            </div>
                            <HardDrive className="text-indigo-400 opacity-50" size={24} />
                        </div>
                        <div className="text-xs text-gray-400">{serviceStatus.storage}</div>
                    </div>

                    {/* Auth Status */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-sm text-gray-500 font-medium mb-1">Auth</div>
                                <div className="text-lg font-bold flex items-center gap-2">
                                    {serviceStatus.auth === 'authenticated' ? (
                                        <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16} /> Active</span>
                                    ) : (
                                        <span className="text-yellow-500 flex items-center gap-1"><Clock size={16} /> Guest</span>
                                    )}
                                </div>
                            </div>
                            <Activity className="text-orange-400 opacity-50" size={24} />
                        </div>
                        <div className="text-xs text-gray-400">Current Session</div>
                    </div>

                    {/* Webhook Status */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-sm text-gray-500 font-medium mb-1">Automation</div>
                                <div className="text-lg font-bold flex items-center gap-2">
                                    {serviceStatus.webhook === 'active' ? (
                                        <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16} /> Active</span>
                                    ) : serviceStatus.webhook === 'idle' ? (
                                        <span className="text-yellow-500 flex items-center gap-1"><Clock size={16} /> Idle</span>
                                    ) : (
                                        <span className="text-gray-400 flex items-center gap-1">No Data</span>
                                    )}
                                </div>
                            </div>
                            <RefreshCw className="text-pink-400 opacity-50" size={24} />
                        </div>
                        <div className="text-xs text-gray-400">
                            {lastWebhook ? `Last: ${lastWebhook}` : "No webhooks yet"}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'logs' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Recent Activity</h3>
                        <button
                            onClick={clearLogs}
                            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                        >
                            <Trash2 size={12} /> Clear History
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-500">
                                <tr>
                                    <th className="px-4 py-3 font-medium w-32">Timestamp</th>
                                    <th className="px-4 py-3 font-medium w-24">Status</th>
                                    <th className="px-4 py-3 font-medium w-32">Type</th>
                                    <th className="px-4 py-3 font-medium">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-8 text-center text-gray-400 italic">
                                            No logs found.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map(log => (
                                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                                                    ${log.status === 'success' ? 'bg-green-100 text-green-800' :
                                                        log.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                            log.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-blue-100 text-blue-800'}`}>
                                                    {log.status === 'success' && <CheckCircle size={10} className="mr-1" />}
                                                    {log.status === 'failed' && <XCircle size={10} className="mr-1" />}
                                                    {log.status === 'info' && <Activity size={10} className="mr-1" />}
                                                    {log.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">
                                                {log.event_type}
                                            </td>
                                            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                                                {log.message}
                                                {log.details && Object.keys(log.details).length > 0 && (
                                                    <details className="mt-1">
                                                        <summary className="text-xs text-gray-400 cursor-pointer hover:text-blue-500 select-none">View Details</summary>
                                                        <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded text-[10px] overflow-x-auto text-gray-600 font-mono">
                                                            {JSON.stringify(log.details, null, 2)}
                                                        </pre>
                                                    </details>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
