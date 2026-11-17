import React, { useState } from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';

const FAQ: React.FC = () => {
    const { t } = useLang();
    const f = t.faq;
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section id="faq" className="px-6 md:px-12 py-24 md:py-40 border-b border-black/5 dark:border-white/5">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block mb-6">{f.eyebrow}</span>
                    <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-black dark:text-white">{f.title}</h2>
                </div>
                <div className="lg:col-span-8 border-t border-black/10 dark:border-white/10">
                    {f.items.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={item.q} className="border-b border-black/10 dark:border-white/10">
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-display text-xl md:text-2xl tracking-tight text-black dark:text-white group-hover:opacity-60 transition-opacity">{item.q}</span>
                                    <span className={`w-10 h-10 flex-shrink-0 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center transition-transform duration-500 ease-custom ${isOpen ? 'rotate-45 bg-black text-white dark:bg-white dark:text-black' : ''}`}>
                                        <Icon name="plus" className="w-4 h-4" />
                                    </span>
                                </button>
                                <div className={`grid transition-all duration-500 ease-custom ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="pb-8 pr-14 text-base md:text-lg text-black/60 dark:text-white/60 font-light leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
