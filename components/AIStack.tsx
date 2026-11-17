import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { useLang } from '../i18n';

// Two halves: "get clients" on white, "close clients" on black.
// Each module inverts on hover, like the original service rows.
const AIStack: React.FC = () => {
    const { t } = useLang();
    const a = t.ai;
    return (
        <section id="ai" className="border-b border-black/5 dark:border-white/5">
            <div className="px-6 md:px-12 pt-24 md:pt-40 max-w-[1920px] mx-auto">
                <SectionHeading eyebrow={a.eyebrow} title1={a.title1} title2={a.title2} intro={a.intro} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {a.groups.map((group, gi) => {
                    const dark = gi === 1;
                    return (
                        <div key={group.label} className={`${dark ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-light-100 text-black dark:bg-dark-800 dark:text-white'} px-6 md:px-12 py-14 md:py-20`}>
                            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block mb-10">{String(gi + 1).padStart(2, '0')} · {group.label}</span>
                            <div className="flex flex-col">
                                {group.items.map(item => (
                                    <div
                                        key={item.title}
                                        className={`group relative overflow-hidden flex items-start gap-6 py-7 border-t ${dark ? 'border-white/15 dark:border-black/15' : 'border-black/10 dark:border-white/10'}`}
                                    >
                                        <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-custom ${dark ? 'bg-white dark:bg-black' : 'bg-black dark:bg-white'}`}></div>
                                        <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${dark ? 'bg-white/10 dark:bg-black/10 group-hover:text-black dark:group-hover:text-white' : 'bg-black/5 dark:bg-white/5 group-hover:text-white dark:group-hover:text-black'}`}>
                                            <Icon name={item.icon} className="w-5 h-5" />
                                        </div>
                                        <div className={`relative z-10 transition-colors duration-500 ${dark ? 'group-hover:text-black dark:group-hover:text-white' : 'group-hover:text-white dark:group-hover:text-black'}`}>
                                            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight mb-1">{item.title}</h3>
                                            <p className="text-sm md:text-base font-light opacity-70 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="px-6 md:px-12 py-10 max-w-[1920px] mx-auto">
                <p className="text-sm text-black/60 dark:text-white/60 font-light max-w-2xl">{a.manageNote}</p>
            </div>
        </section>
    );
};

export default AIStack;
