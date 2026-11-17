import React from 'react';
import { useLang } from '../i18n';

const Process: React.FC = () => {
    const { t } = useLang();
    const p = t.process;
    return (
        <section id="process" className="bg-light-100 dark:bg-dark-800 px-6 md:px-12 py-24 md:py-32 border-b border-black/5 dark:border-white/5">
            <div className="max-w-[1920px] mx-auto">
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block mb-6">{p.eyebrow}</span>
                <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-black dark:text-white mb-14 md:mb-20">{p.title}</h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/10 dark:border-white/10">
                    {p.steps.map((step, i) => (
                        <li key={step.title} className={`py-8 lg:pr-8 border-b lg:border-b-0 border-black/10 dark:border-white/10 ${i > 0 ? 'lg:border-l lg:pl-8' : ''}`}>
                            <span className="font-display text-5xl text-black/15 dark:text-white/15 block mb-6">{i + 1}</span>
                            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight text-black dark:text-white mb-3">{step.title}</h3>
                            <p className="text-sm md:text-base text-black/60 dark:text-white/60 font-light leading-relaxed">{step.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Process;
