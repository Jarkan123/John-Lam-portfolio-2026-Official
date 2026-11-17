import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { useLang } from '../i18n';

interface RoadmapProps {
    onOpenDiscoveryModal: () => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ onOpenDiscoveryModal }) => {
    const { t } = useLang();
    const r = t.roadmap;
    return (
        <section id="roadmap" className="px-6 md:px-12 py-24 md:py-40 border-b border-black/5 dark:border-white/5">
            <div className="max-w-[1920px] mx-auto">
                <SectionHeading eyebrow={r.eyebrow} title1={r.title1} title2={r.title2} intro={r.intro} />

                {/* Phases: a thin timeline */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-28 md:mb-40">
                    <div className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-black/15 dark:bg-white/15"></div>
                    {r.phases.map((phase, i) => (
                        <div key={phase.title} className="relative md:pr-12">
                            <span className={`block w-[15px] h-[15px] rounded-full border border-black dark:border-white mb-8 ${i === 0 ? 'bg-black dark:bg-white' : 'bg-white dark:bg-dark-900'}`}></span>
                            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block mb-3">{phase.when}</span>
                            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-black dark:text-white mb-6">{phase.title}</h3>
                            <ul className="space-y-3">
                                {phase.items.map(item => (
                                    <li key={item} className="flex items-start gap-3 text-base text-black/70 dark:text-white/70 font-light">
                                        <span className="w-4 h-px bg-current mt-3 flex-shrink-0 opacity-60"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Ways to work together */}
                <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-black dark:text-white mb-10 md:mb-14">{r.waysTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {r.ways.map(way => {
                        const featured = way.popular;
                        return (
                            <div
                                key={way.name}
                                className={`group relative flex flex-col justify-between rounded-2xl p-8 md:p-10 min-h-[320px] border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${featured ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' : 'bg-transparent text-black border-black/10 dark:text-white dark:border-white/10'}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-10">
                                        <h4 className="font-display text-3xl md:text-4xl uppercase tracking-tighter">{way.name}</h4>
                                        {featured && (
                                            <span className="text-[9px] uppercase tracking-[0.25em] font-bold border border-current rounded-full px-3 py-1 opacity-80">{r.popular}</span>
                                        )}
                                    </div>
                                    <p className="text-base font-light leading-relaxed opacity-70">{way.desc}</p>
                                </div>
                                <button onClick={onOpenDiscoveryModal} className="mt-10 inline-flex items-center gap-3 w-fit text-[10px] uppercase tracking-[0.3em] font-bold border-b border-current pb-1 hover:opacity-60 transition-opacity">
                                    {r.cta}
                                    <Icon name="arrow-right" className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <p className="text-sm text-black/50 dark:text-white/50 font-light max-w-3xl mt-10">{r.note}</p>
            </div>
        </section>
    );
};

export default Roadmap;
