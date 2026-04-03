"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    icon?: React.ReactNode;
    placeholder?: string;
    className?: string;
}

export function CustomDropdown({
    value,
    onChange,
    options,
    icon,
    placeholder = "Select...",
    className = "",
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3 
                    bg-card border border-input/50 rounded-xl shadow-sm 
                    hover:border-primary/50 hover:shadow-md transition-all duration-300
                    text-sm font-medium text-foreground min-w-[160px] cursor-pointer outline-none focus:ring-2 focus:ring-primary/20
                    ${isOpen ? "border-primary ring-2 ring-primary/10" : ""}
                `}
            >
                <div className="flex items-center gap-2 truncate">
                    {icon && <span className="text-primary shrink-0">{icon}</span>}
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden ring-1 ring-black/5 max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        <div className="p-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left
                                        transition-colors duration-200
                                        ${value === option.value
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-foreground hover:bg-secondary/80"
                                        }
                                    `}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {value === option.value && (
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
