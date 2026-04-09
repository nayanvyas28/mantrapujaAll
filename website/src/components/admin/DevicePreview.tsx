"use client";

import { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

interface DevicePreviewProps {
    children: React.ReactNode;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const DevicePreview = ({ children }: DevicePreviewProps) => {
    const [device, setDevice] = useState<DeviceType>('desktop');

    const deviceStyles = {
        desktop: 'w-full',
        tablet: 'w-[768px]',
        mobile: 'w-[375px]'
    };

    return (
        <div className="flex flex-col space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 pl-2">Device Preview</span>
                <div className="flex space-x-1 bg-white dark:bg-gray-900 rounded p-1 shadow-sm">
                    <button
                        onClick={() => setDevice('desktop')}
                        className={`p-2 rounded transition-colors ${device === 'desktop' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        title="Desktop View"
                    >
                        <Monitor size={18} />
                    </button>
                    <button
                        onClick={() => setDevice('tablet')}
                        className={`p-2 rounded transition-colors ${device === 'tablet' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        title="Tablet View"
                    >
                        <Tablet size={18} />
                    </button>
                    <button
                        onClick={() => setDevice('mobile')}
                        className={`p-2 rounded transition-colors ${device === 'mobile' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        title="Mobile View"
                    >
                        <Smartphone size={18} />
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex justify-center bg-gray-200 dark:bg-gray-900/50 p-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 min-h-[500px] overflow-auto">
                <div
                    className={`transition-all duration-300 ease-in-out bg-transparent ${deviceStyles[device]} ${device !== 'desktop' ? 'shadow-2xl border-x-8 border-y-[24px] border-gray-800 rounded-[2rem]' : ''}`}
                >
                    <div className={`h-full bg-white dark:bg-gray-950 ${device !== 'desktop' ? 'rounded-[1.5rem] overflow-hidden' : ''}`}>
                        {children}
                    </div>
                </div>
            </div>

            {device !== 'desktop' && (
                <div className="text-center text-xs text-gray-400">
                    Previewing {device} size ({device === 'tablet' ? '768px' : '375px'})
                </div>
            )}
        </div>
    );
};

export default DevicePreview;
