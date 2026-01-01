
import React from 'react';
import Icon from './Icon';

// Helper component for character-level reveal animation
const AnimatedWord: React.FC<{ text: string; baseDelay: number; isHighlighted?: boolean; hasMargin?: boolean; }> = ({ text, baseDelay, isHighlighted = false, hasMargin = true }) => {
    const chars = Array.from(text);
    const highlightClasses = "bg-black text-white dark:bg-white dark:text-black px-2 pt-1 pb-0 md:px-4 md:pt-2 md:pb-1 rounded-md";
    const charDelayIncrement = 0.03;

    return (
        <span className={`inline-block align-bottom ${hasMargin ? 'mr-3' : ''} ${isHighlighted ? highlightClasses : ''}`}>
            <span aria-hidden="true">
                {chars.map((char, index) => {
                    const delay = baseDelay + index * charDelayIncrement;
                    return (
                        <span key={index} className="reveal-text inline-block">
                            <span className="reveal-inner" style={{ animationDelay: `${delay}s` }}>
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        </span>
                    );
                })}
            </span>
            <span className="sr-only">{text}</span>
        </span>
    );
};

interface HeroProps {
    isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ isLoading }) => {
    const line1 = [
        { text: 'I', highlight: false },
        { text: "don't", highlight: false },
        { text: 'just', highlight: false },
        { text: 'do', highlight: false },
        { text: 'marketing,', highlight: true },
    ];
    const line2 = [
        { text: 'I', highlight: false },
        { text: 'build', highlight: false },
        { text: 'growth', highlight: true },
        { text: 'systems.', highlight: true },
    ];

    let runningDelay = 0.1;
    const charDelay = 0.03;
    const wordPause = 0.08;

    return (
        <header className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-12 relative overflow-hidden">
            <div className="relative z-10">
                <h1 key={isLoading ? 'loading' : 'loaded'} className="font-display text-[13vw] md:text-[8.5vw] leading-[1.1] tracking-tighter uppercase font-medium select-none text-black dark:text-white">
                    <span className="block">
                        {line1.map((word, index) => {
                            const baseDelay = runningDelay;
                            runningDelay += (word.text.length * charDelay) + wordPause;
                            return <AnimatedWord key={index} text={word.text} baseDelay={baseDelay} isHighlighted={word.highlight} hasMargin={index < line1.length - 1} />;
                        })}
                    </span>
                    <span className="block mt-2 md:mt-4">
                         {line2.map((word, index) => {
                            const baseDelay = runningDelay;
                            runningDelay += (word.text.length * charDelay) + wordPause;
                            return <AnimatedWord key={index} text={word.text} baseDelay={baseDelay} isHighlighted={word.highlight} hasMargin={index < line2.length - 1} />;
                        })}
                    </span>
                </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 mt-24 items-end relative z-10">
                <div className="max-w-xs">
                    <p className="text-sm text-black/60 dark:text-white/60 font-light leading-relaxed">
                        For half a decade, I have been helping clients transform their brands into systems that create revenue. If growth matters to you, then you have come to the right place.
                    </p>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">System Status</span>
                    <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 w-fit px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="uppercase text-[10px] font-medium tracking-wide">Available for Projects</span>
                    </div>
                </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-tr from-gray-200/50 to-gray-300/50 dark:from-blue-500/10 dark:to-purple-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-100"></div>
        </header>
    );
};

export default Hero;
