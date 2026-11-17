import React from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { PROJECTS } from '../constants';
import { useLang } from '../i18n';
import type { Page } from '../App';

interface WorkTeaserProps {
    onOpenProject: (key: string) => void;
    onNavigate: (page: Page) => void;
}

const WorkTeaser: React.FC<WorkTeaserProps> = ({ onOpenProject, onNavigate }) => {
    const { t, lang } = useLang();
    const w = t.teaser;
    return (
        <section id="portfolio" className="px-6 md:px-12 py-24 md:py-40 border-b border-black/5 dark:border-white/5">
            <div className="max-w-[1920px] mx-auto">
                <SectionHeading eyebrow={w.eyebrow} title1={w.title1} title2={w.title2} intro={w.intro}>
                    <button onClick={() => onNavigate('portfolio')} className="mt-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-current pb-1 hover:opacity-60 transition-opacity">
                        {w.cta}
                        <Icon name="arrow-right" className="w-4 h-4" />
                    </button>
                </SectionHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {PROJECTS.slice(0, 2).map(project => {
                        const c = project.content[lang];
                        return (
                            <button
                                key={project.key}
                                onClick={() => onOpenProject(project.key)}
                                className="group relative text-left aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                                <img src={project.coverImg} alt={c.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-[1.03] group-hover:scale-[1.08] transition-all duration-[1.5s] ease-custom" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <span className="text-white/80 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold block mb-3">{c.cat} · {project.year}</span>
                                    <h3 className="text-white font-display text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9] mb-3">{c.title}</h3>
                                    <p className="text-white/85 text-sm md:text-lg font-light max-w-md">{c.impactStatement}</p>
                                </div>
                                <span className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/40 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                                    <Icon name="arrow-up-right" className="w-5 h-5" />
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WorkTeaser;
