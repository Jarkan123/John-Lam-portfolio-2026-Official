import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';

const AnimatedWord: React.FC<{ text: string; baseDelay: number; isHighlighted?: boolean; hasMargin?: boolean; }> = ({ text, baseDelay, isHighlighted = false, hasMargin = true }) => {
    const chars = Array.from(text);
    const charDelayIncrement = 0.03;
    const containerClasses = `relative inline-block align-bottom ${hasMargin ? 'mr-3 md:mr-6' : ''}`;
    const highlightPaddingClasses = 'px-3 pt-1 pb-0.5 md:px-5 md:pt-2 md:pb-1';

    return (
        <span className={`${containerClasses} ${isHighlighted ? highlightPaddingClasses : ''}`}>
            {isHighlighted && (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-black dark:bg-white rounded-md z-0"
                    style={{
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        animationName: 'scale-in',
                        animationDuration: '0.5s',
                        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        animationFillMode: 'forwards',
                        animationDelay: `${baseDelay}s`,
                    }}
                />
            )}
            <span aria-hidden="true" className="relative z-10">
                {chars.map((char, index) => (
                    <span key={index} className="reveal-text inline-block">
                        <span className={`reveal-inner ${isHighlighted ? 'text-white dark:text-black' : ''}`} style={{ animationDelay: `${baseDelay + index * charDelayIncrement}s` }}>
                            {char === ' ' ? ' ' : char}
                        </span>
                    </span>
                ))}
            </span>
            <span className="sr-only">{text}</span>
        </span>
    );
};

// Illustrative screens showing the system at work (monochrome, built in HTML).
const PHONE_SCREENS = {
    vi: [
        {
            label: 'Khách mới',
            time: '21:41',
            lines: [
                { who: 'Khách', text: 'Chị muốn hỏi giá liệu trình trị mụn ạ?' },
                { who: 'AI', text: 'Dạ chào chị Lan! Liệu trình gồm 3 bước, em gửi chị chi tiết nhé. Chị muốn đặt lịch soi da miễn phí không ạ?' },
            ],
            footer: 'AI trả lời sau 42 giây',
        },
        {
            label: 'Báo sale · Zalo',
            time: '21:43',
            lines: [
                { who: 'Hệ thống', text: 'Khách nóng: Chị Lan · Trị mụn · Ngân sách 3–5 triệu' },
                { who: 'Hệ thống', text: 'Nguồn: Quảng cáo TikTok → Landing page' },
            ],
            footer: 'Đã lưu vào CRM',
        },
        {
            label: 'Đặt lịch',
            time: '21:44',
            lines: [
                { who: 'AI', text: 'Em đã giữ lịch cho chị lúc 10:00 sáng mai. Em sẽ nhắc chị trước 1 tiếng nhé!' },
                { who: 'Khách', text: 'Ok em, cảm ơn em.' },
            ],
            footer: 'Lịch hẹn đã xác nhận',
        },
    ],
    en: [
        {
            label: 'New lead',
            time: '9:41 PM',
            lines: [
                { who: 'Buyer', text: 'Hi, how much is the acne treatment plan?' },
                { who: 'AI', text: 'Hi Lan! It has 3 steps, I’ll send you the details. Would you like a free skin check?' },
            ],
            footer: 'AI replied in 42 seconds',
        },
        {
            label: 'Sales alert · Zalo',
            time: '9:43 PM',
            lines: [
                { who: 'System', text: 'Hot lead: Lan · Acne plan · Budget $120–200' },
                { who: 'System', text: 'Source: TikTok ad → Landing page' },
            ],
            footer: 'Saved to CRM',
        },
        {
            label: 'Booking',
            time: '9:44 PM',
            lines: [
                { who: 'AI', text: 'You’re booked for 10:00 AM tomorrow. I’ll remind you an hour before!' },
                { who: 'Buyer', text: 'Great, thank you.' },
            ],
            footer: 'Appointment confirmed',
        },
    ],
};

const DASHBOARD = {
    vi: { title: 'Báo cáo tuần', kpis: [['Khách mới', '48'], ['Đã đặt lịch', '21'], ['Phản hồi TB', '42s']], channels: 'Khách theo kênh', note: 'Minh hoạ' },
    en: { title: 'Weekly report', kpis: [['New leads', '48'], ['Booked', '21'], ['Avg. reply', '42s']], channels: 'Leads by channel', note: 'Illustration' },
};
const CHANNEL_BARS: [string, number][] = [['Meta', 82], ['Google', 58], ['TikTok', 44], ['LinkedIn', 26], ['Organic', 64]];

const PhoneMockup = React.forwardRef<HTMLDivElement, { currentIndex: number }>(({ currentIndex }, ref) => {
    const { lang } = useLang();
    const screens = PHONE_SCREENS[lang];
    return (
        <div ref={ref} className="relative z-20 animate-float flex-shrink-0 transition-all duration-300 ease-out will-change-transform">
            <div className="relative w-[200px] md:w-[230px] aspect-[9/19.5] border-[8px] md:border-[10px] border-zinc-950 dark:border-white bg-white dark:bg-zinc-900 rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden shadow-2xl mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-24 h-5 md:h-6 bg-zinc-950 dark:bg-white rounded-b-xl z-20 mt-[-1px]"></div>
                {screens.map((s, i) => (
                    <div key={i} className={`absolute inset-0 pt-9 px-3 pb-4 flex flex-col transition-opacity duration-700 ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[9px] uppercase tracking-widest font-bold text-black dark:text-white">{s.label}</span>
                            <span className="text-[9px] font-mono text-black/50 dark:text-white/50">{s.time}</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            {s.lines.map((l, j) => {
                                const mine = l.who === 'AI' || l.who === 'Hệ thống' || l.who === 'System';
                                return (
                                    <div key={j} className={`max-w-[88%] rounded-2xl px-3 py-2 text-[10.5px] leading-snug ${mine ? 'self-end bg-black text-white dark:bg-white dark:text-black rounded-br-sm' : 'self-start bg-black/5 text-black dark:bg-white/10 dark:text-white rounded-bl-sm'}`}>
                                        <span className="block text-[8px] uppercase tracking-widest opacity-60 mb-0.5">{l.who}</span>
                                        {l.text}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-2 border-t border-black/10 dark:border-white/10 pt-2">
                            <Icon name="check" className="w-3 h-3 text-black dark:text-white" />
                            <span className="text-[9px] uppercase tracking-widest font-bold text-black/70 dark:text-white/70">{s.footer}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

const IPadMockup = React.forwardRef<HTMLDivElement>((_, ref) => {
    const { lang } = useLang();
    const d = DASHBOARD[lang];
    return (
        <div ref={ref} className="relative z-0 transition-all duration-300 ease-out will-change-transform">
            <div className="relative w-[320px] md:w-[480px] lg:w-[520px] aspect-[4/3] border-[10px] md:border-[12px] border-zinc-900 dark:border-white bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl mx-auto">
                <div className="absolute inset-0 p-5 md:p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <span className="font-display text-sm md:text-lg uppercase tracking-tight text-black dark:text-white">{d.title}</span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-black/40 dark:text-white/40">{d.note}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                        {d.kpis.map(([k, v]) => (
                            <div key={k} className="border border-black/10 dark:border-white/10 rounded-lg p-2 md:p-3">
                                <span className="block text-[8px] md:text-[9px] uppercase tracking-widest text-black/50 dark:text-white/50">{k}</span>
                                <span className="block font-display text-xl md:text-3xl text-black dark:text-white mt-1">{v}</span>
                            </div>
                        ))}
                    </div>
                    <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">{d.channels}</span>
                    <div className="flex-1 flex flex-col justify-between gap-1.5">
                        {CHANNEL_BARS.map(([name, pct]) => (
                            <div key={name} className="flex items-center gap-2 md:gap-3">
                                <span className="w-14 md:w-16 text-[9px] md:text-[10px] text-black/70 dark:text-white/70">{name}</span>
                                <div className="flex-1 h-2 md:h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-black dark:bg-white rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

interface HeroProps {
    isLoading: boolean;
    onOpenDiscoveryModal: () => void;
    onScrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ isLoading, onOpenDiscoveryModal, onScrollToSection }) => {
    const { t, lang } = useLang();
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const ipadRef = useRef<HTMLDivElement>(null);
    const screenCount = PHONE_SCREENS[lang].length;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (phoneRef.current) phoneRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
            if (ipadRef.current) ipadRef.current.style.transform = `translateY(${scrollY * 0.05}px)`;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const startTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => setCurrentIndex(prev => (prev + 1) % screenCount), 4500);
    }, [screenCount]);

    useEffect(() => {
        startTimer();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [startTimer]);

    const handleManualChange = (index: number) => {
        setCurrentIndex(index);
        startTimer();
    };

    let runningDelay = 0.1;
    const charDelay = 0.03;
    const wordPause = 0.08;

    return (
        <header className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
                <div className="w-full lg:w-3/5 text-center lg:text-left">
                    <h1 key={`${isLoading ? 'loading' : 'loaded'}-${lang}`} className="font-display text-[10.5vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.95] tracking-tighter uppercase font-medium select-none text-black dark:text-white z-20">
                        {t.hero.lines.map((line, li) => (
                            <span key={li} className={`block ${li < t.hero.lines.length - 1 ? 'mb-2 md:mb-4' : ''}`}>
                                {line.map((word, index) => {
                                    const baseDelay = runningDelay;
                                    runningDelay += (word.text.length * charDelay) + wordPause;
                                    return <AnimatedWord key={index} text={word.text} baseDelay={baseDelay} isHighlighted={word.highlight} hasMargin={index < line.length - 1} />;
                                })}
                            </span>
                        ))}
                    </h1>
                    <p className="mt-6 md:mt-8 font-display text-lg md:text-2xl uppercase tracking-tight text-black/40 dark:text-white/40">
                        {t.hero.tagline}
                    </p>
                </div>

                <div className="relative w-full lg:w-2/5 flex flex-col items-center lg:items-end justify-center h-auto min-h-[500px]">
                    <div className="relative w-full flex flex-col items-center lg:block">
                        <div className="relative lg:absolute lg:-left-16 lg:top-1/2 lg:-translate-y-1/2 z-20 mb-12 lg:mb-0">
                            <PhoneMockup ref={phoneRef} currentIndex={currentIndex} />
                        </div>
                        <div className="w-full lg:w-auto">
                            <IPadMockup ref={ipadRef} />
                        </div>
                        <div className="mt-12 lg:mt-16 lg:absolute lg:bottom-[-90px] lg:right-0">
                            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-black/10 dark:border-white/10 shadow-lg">
                                {Array.from({ length: screenCount }).map((_, idx) => (
                                    <button key={idx} onClick={() => handleManualChange(idx)} className="group relative px-2 py-3 focus:outline-none" aria-label={`Screen ${idx + 1}`}>
                                        <div className={`h-3 rounded-full transition-all duration-500 ease-custom ${idx === currentIndex ? 'w-14 bg-black dark:bg-white' : 'w-5 bg-black/20 dark:bg-white/20 group-hover:bg-black/40 dark:group-hover:bg-white/40 group-hover:w-8'}`}></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 mt-16 lg:mt-12 items-start md:items-end relative z-10">
                <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
                    <p className="text-base text-black/70 dark:text-white/70 font-light leading-relaxed mb-8">{t.hero.body}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <button onClick={onOpenDiscoveryModal} className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-[0.25em] font-bold hover:opacity-80 transition-opacity">
                            {t.hero.primaryCta}
                            <Icon name="arrow-up-right" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                        <button onClick={() => onScrollToSection('system')} className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-black/15 dark:border-white/20 text-black dark:text-white text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                            {t.hero.secondaryCta}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center md:items-end w-full md:w-auto">
                    <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">{t.hero.status}</span>
                    <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 w-fit px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 dark:bg-white/50"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white"></span>
                        </span>
                        <span className="uppercase text-[10px] font-bold tracking-wide">{t.hero.available}</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gradient-to-tr from-gray-200/50 to-gray-300/50 dark:from-white/5 dark:to-white/[0.02] blur-[120px] rounded-full pointer-events-none opacity-30 dark:opacity-100"></div>
        </header>
    );
};

export default Hero;
