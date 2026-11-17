import React from 'react';
import SectionHeading from './SectionHeading';
import { useLang } from '../i18n';

const Problems: React.FC = () => {
    const { t } = useLang();
    const p = t.problems;
    return (
        <section id="problems" className="px-6 md:px-12 py-24 md:py-40 border-b border-black/5 dark:border-white/5">
            <div className="max-w-[1920px] mx-auto">
                <SectionHeading eyebrow={p.eyebrow} title1={p.title1} title2={p.title2} />
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-black/10 dark:border-white/10">
                    {p.items.map((item, i) => (
                        <div
                            key={item.title}
                            className={`group relative overflow-hidden py-10 md:py-14 md:px-10 first:md:pl-0 border-b md:border-b-0 border-black/10 dark:border-white/10 ${i > 0 ? 'md:border-l' : ''}`}
                        >
                            <span className="font-display text-7xl md:text-8xl text-black/10 dark:text-white/10 leading-none block mb-8">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-black dark:text-white mb-4">{item.title}</h3>
                            <p className="text-base text-black/60 dark:text-white/60 font-light leading-relaxed max-w-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problems;
