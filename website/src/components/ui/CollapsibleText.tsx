"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleTextProps {
    text: string;
    lineClamp?: number;
    className?: string;
    buttonClassName?: string;
}

export default function CollapsibleText({
    text,
    lineClamp = 3,
    className = "",
    buttonClassName = ""
}: CollapsibleTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return null;

    // Simple heuristic to check if truncation is likely needed
    const needsTruncation = text.length > 150;

    return (
        <div className="relative">
            <p className={`${className} transition-all duration-300 ${isExpanded ? '' : `line-clamp-${lineClamp}`}`}>
                {text}
            </p>
            {needsTruncation && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`${buttonClassName} mt-4 text-saffron font-bold hover:underline flex items-center gap-2 group/more`}
                >
                    {isExpanded ? (
                        <>Show Less <ChevronDown className="w-4 h-4 rotate-180 transition-transform" /></>
                    ) : (
                        <>View More <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                    )}
                </button>
            )}
        </div>
    );
}
