import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from './Icon';

const AnimatedWord: React.FC<{ text: string; baseDelay: number; isHighlighted?: boolean; hasMargin?: boolean; }> = ({ text, baseDelay, isHighlighted = false, hasMargin = true }) => {
    const chars = Array.from(text);
    const charDelayIncrement = 0.03;

    const containerClasses = `relative inline-block align-bottom ${hasMargin ? 'mr-3 md:mr-6' : ''}`;
    const highlightPaddingClasses = "px-3 pt-1 pb-0.5 md:px-5 md:pt-2 md:pb-1";

    const highlightBgClasses = "absolute inset-0 bg-black dark:bg-white rounded-md z-0";
    const textClasses = isHighlighted ? "text-white dark:text-black" : "";

    return (
        <span className={`${containerClasses} ${isHighlighted ? highlightPaddingClasses : ''}`}>
            {isHighlighted && (
                <span
                    aria-hidden="true"
                    className={highlightBgClasses}
                    style={{
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        animationName: 'scale-in',
                        animationDuration: '0.5s',
                        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        animationFillMode: 'forwards',
                        animationDelay: `${baseDelay}s`
                    }}
                />
            )}
            
            <span aria-hidden="true" className="relative z-10">
                {chars.map((char, index) => {
                    const delay = baseDelay + index * charDelayIncrement;
                    return (
                        <span key={index} className="reveal-text inline-block">
                            <span className={`reveal-inner ${textClasses}`} style={{ animationDelay: `${delay}s` }}>
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

const IPadMockup = React.forwardRef<HTMLDivElement, { currentIndex: number }>(({ currentIndex }, ref) => {
    const ipadImages = [
        "https://i.ibb.co/Swxg7kvs/GLOBETROTTER-2048-x-1530-px-1.png",
        "https://i.ibb.co/8ghFMz4D/by-SASSY-Final-Presentation-0724-pdf.png",
        "https://i.ibb.co/LzQf6NCc/tp-MYp0-Abqt.png",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2732&h=2048&auto=format&fit=crop"
    ];

    return (
        <div ref={ref} className="relative z-0 scale-100 transition-all duration-300 ease-out will-change-transform">
            <div className="relative w-[320px] md:w-[480px] lg:w-[540px] aspect-[4/3] border-[10px] md:border-[12px] border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-800 rounded-[2rem] overflow-hidden shadow-xl mx-auto">
                <div className="absolute inset-0">
                    {ipadImages.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                            alt={`iPad Portfolio ${index + 1}`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
});

const PhoneMockup = React.forwardRef<HTMLDivElement, { currentIndex: number }>(({ currentIndex }, ref) => {
    const images = [
        "https://i.ibb.co/zH6hRxw8/Mobile-Iphone-mockup.png",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1080&h=2340&auto=format&fit=crop",
        "https://i.ibb.co/4ZpWP6TY/Mobile-Iphone-mockup-1.png",
        "https://i.ibb.co/fzXw6Hzg/Bysassy-10.png"
    ];

    return (
        <div ref={ref} className="relative z-20 group animate-float flex-shrink-0 transition-all duration-300 ease-out will-change-transform">
            <div className="relative w-[180px] md:w-[220px] aspect-[9/19.5] border-[8px] md:border-[10px] border-zinc-950 dark:border-white bg-zinc-100 dark:bg-zinc-800 rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden shadow-2xl mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-28 h-5 md:h-7 bg-zinc-950 dark:bg-white rounded-b-xl z-20 mt-[-1px]"></div>
                
                <div className="absolute inset-0 z-10">
                    {images.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                            alt={`Work Mockup ${index + 1}`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
});

interface HeroProps {
    isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ isLoading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const ipadRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (phoneRef.current) {
                phoneRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
            if (ipadRef.current) {
                ipadRef.current.style.transform = `translateY(${scrollY * 0.05}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const startTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % 4);
        }, 5000);
    }, []);

    useEffect(() => {
        startTimer();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startTimer]);

    const handleManualChange = (index: number) => {
        setCurrentIndex(index);
        startTimer();
    };

    const line1 = [
        { text: 'Crafting', highlight: false },
        { text: 'digital', highlight: true },
    ];
    const line2 = [
        { text: 'marketing', highlight: true },
    ];
    const line3 = [
        { text: 'solution', highlight: false },
    ];
    const line4 = [
        { text: 'that help', highlight: false },
        { text: 'brand grow', highlight: true },
    ];

    let runningDelay = 0.1;
    const charDelay = 0.03;
    const wordPause = 0.08;

    return (
        <header className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
                <div className="w-full lg:w-3/5 text-center lg:text-left">
                    <h1 key={isLoading ? 'loading' : 'loaded'} className="font-display text-[10.5vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.95] tracking-tighter uppercase font-medium select-none text-black dark:text-white z-20">
                        <span className="block mb-2 md:mb-4">
                            {line1.map((word, index) => {
                                const baseDelay = runningDelay;
                                runningDelay += (word.text.length * charDelay) + wordPause;
                                return <AnimatedWord key={index} text={word.text} baseDelay={baseDelay} isHighlighted={word.highlight} hasMargin={index < line1.length - 1} />;
                            })}
                        </span>
                        <span className="block mb-2 md:mb-4">
                             {line2.map((word, index) => {
                                const baseDelay = runningDelay;
                                runningDelay += (word.text.length * charDelay) + wordPause;
                                return <AnimatedWord key={index} text={word.text} baseDelay={baseDelay} isHighlighted={word.highlight} hasMargin={index < line1.length - 1} />;
                            })}
                        </span>
                        <span className="block mb-2 md:mb-4">
                             {line3.map((word, index) => {
                                const baseDelay = runningDelay;
                                runningDelay += (word.text.length * charDelay) + wordPause;
                                return <AnimatedWord key={index} text={word.text} baseDelay={baseDelay} isHighlighted={word.highlight} hasMargin={index < line2.length - 1} />;
                            })}
                        </span>
                        <span className="block">
                             {line4.map((word, index) => {
                                const baseDelay = runningDelay;
                                runningDelay += (word.text.length * charDelay) + wordPause;
                                return <AnimatedWord key={index} text={word.text} baseDelay={baseDelay} isHighlighted={word.highlight} hasMargin={index < line4.length - 1} />;
                            })}
                        </span>
                    </h1>
                </div>

                <div className="relative w-full lg:w-2/5 flex flex-col items-center lg:items-end justify-center h-auto min-h-[500px]">
                    <div className="relative w-full flex flex-col items-center lg:block">
                        <div className="relative lg:absolute lg:-left-16 lg:top-1/2 lg:-translate-y-1/2 z-20 mb-12 lg:mb-0">
                            <PhoneMockup ref={phoneRef} currentIndex={currentIndex} />
                        </div>
                        <div className="w-full lg:w-auto">
                            <IPadMockup ref={ipadRef} currentIndex={currentIndex} />
                        </div>
                        
                        <div className="mt-12 lg:mt-16 lg:absolute lg:bottom-[-90px] lg:right-0">
                            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-black/10 dark:border-white/10 shadow-lg">
                                {[0, 1, 2, 3].map((idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleManualChange(idx)}
                                        className="group relative px-2 py-3 focus:outline-none"
                                        aria-label={`Go to slide ${idx + 1}`}
                                    >
                                        <div className={`h-3 rounded-full transition-all duration-500 ease-custom ${
                                            idx === currentIndex 
                                            ? 'w-14 bg-black dark:bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                                            : 'w-5 bg-black/20 dark:bg-white/20 group-hover:bg-black/40 dark:group-hover:bg-white/40 group-hover:w-8'
                                        }`}></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 mt-12 lg:mt-8 items-end relative z-10">
                <div className="max-w-xs text-center md:text-left mx-auto md:mx-0">
                    <p className="text-sm text-black/70 dark:text-white/70 font-medium leading-relaxed">
                        For half a decade, I have been helping clients transform their brands into systems that create revenue. If growth matters to you, then you have come to the right place.
                    </p>
                </div>
                <div className="flex flex-col gap-3 items-center md:items-end w-full md:w-auto">
                    <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Status</span>
                    <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 w-fit px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="uppercase text-[10px] font-bold tracking-wide">Available for Projects</span>
                    </div>
                </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gradient-to-tr from-gray-200/50 to-gray-300/50 dark:from-blue-500/10 dark:to-purple-500/10 blur-[120px] rounded-full pointer-events-none opacity-30 dark:opacity-100"></div>
        </header>
    );
};

export default Hero;