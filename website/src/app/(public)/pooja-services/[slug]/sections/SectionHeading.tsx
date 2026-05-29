import React from 'react';

interface SectionHeadingProps {
    children: React.ReactNode;
    subtitle?: string;
    themeColor?: string;
}

export const SectionHeading = ({ children, subtitle, themeColor = "saffron" }: SectionHeadingProps) => {
    // Divine Saffron Gradient for the title
    const titleGradient = "from-orange-500 via-yellow-500 to-orange-600";

    return (
        <div className="text-center mb-4 md:mb-6 relative z-10 px-4">
            {subtitle && (
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="h-[1px] w-6 md:w-12 bg-gradient-to-r from-transparent to-orange-500/50"></div>
                    <span className="text-orange-500 font-bold tracking-[0.15rem] md:tracking-[0.2em] uppercase text-[9px] md:text-xs">{subtitle}</span>
                    <div className="h-[1px] w-6 md:w-12 bg-gradient-to-l from-transparent to-orange-500/50"></div>
                </div>
            )}
            <h2 className={`text-2xl sm:text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleGradient} bg-[length:200%_auto] animate-gradient mb-2 md:mb-3 pb-1 leading-tight`} style={{ fontFamily: 'Georgia, serif' }}>
                {children}
            </h2>
        </div>
    );
};
