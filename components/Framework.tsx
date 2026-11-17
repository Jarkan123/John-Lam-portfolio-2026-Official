import React, { useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import { useLang } from '../i18n';

// The Niche Leader System: five steps that light up one by one as you scroll,
// echoing the word-by-word reveal of the Belief section.
const Framework: React.FC = () => {
    const { t } = useLang();
    const f = t.framework;
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [litCount, setLitCount] = useState(0);

    useEffect(() => {
        const update = () => {
            const trigger = window.innerHeight * 0.62;
            let count = 0;
            rowRefs.current.forEach(el => {
                if (el && el.getBoundingClientRect().top < trigger) count += 1;
            });
            setLitCount(count);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <section id="system" className="px-6 md:px-12 py-24 md:py-40 border-b border-black/5 dark:border-white/5">
            <div className="max-w-[1920px] mx-auto">
                <SectionHeading eyebrow={f.eyebrow} title1={f.title1} title2={f.title2} intro={f.intro} />

                <div className="border-t border-black/10 dark:border-white/10">
                    {f.steps.map((step, i) => {
                        const lit = i < litCount;
                        return (
                            <div
                                key={step.word}
                                ref={el => { rowRefs.current[i] = el; }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16 border-b border-black/10 dark:border-white/10"
                            >
                                <div className="lg:col-span-5 flex items-baseline gap-5">
                                    <span className={`text-[10px] font-mono uppercase tracking-[0.3em] transition-opacity duration-700 ${lit ? 'opacity-60' : 'opacity-20'}`}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className={`font-display uppercase tracking-tighter leading-[0.85] text-6xl md:text-8xl lg:text-[6.2vw] xl:text-[6.5rem] transition-colors duration-700 ease-custom ${lit ? 'text-black dark:text-white' : 'text-black/10 dark:text-white/10'}`}
                                    >
                                        {step.word}
                                    </span>
                                </div>
                                <div className={`lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-custom ${lit ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-3'}`}>
                                    <div>
                                        <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-black dark:text-white mb-4">{step.title}</h3>
                                        <p className="text-base text-black/60 dark:text-white/60 font-light leading-relaxed">{step.desc}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold block mb-4">{f.insideLabel}</span>
                                        <ul className="space-y-3">
                                            {step.inside.map(item => (
                                                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-black/80 dark:text-white/80">
                                                    <span className="w-4 h-px bg-current mt-3 flex-shrink-0 opacity-60"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="font-display text-2xl md:text-4xl tracking-tight leading-tight text-black dark:text-white max-w-4xl mt-16 md:mt-24">
                    {f.outcome}
                </p>
            </div>
        </section>
    );
};

export default Framework;
