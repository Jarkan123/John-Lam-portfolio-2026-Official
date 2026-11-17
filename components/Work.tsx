import React, { useRef, useCallback } from 'react';
import Icon from './Icon';
import WorkCard from './WorkCard';
import { PROJECTS } from '../constants';
import { useLang } from '../i18n';

interface WorkProps {
    onOpenProject: (key: string) => void;
    onOpenDiscoveryModal: () => void;
}

// Full-screen case study carousel, used on the portfolio page.
const Work: React.FC<WorkProps> = ({ onOpenProject, onOpenDiscoveryModal }) => {
    const { t } = useLang();
    const scrollRef = useRef<HTMLDivElement>(null);
    const slideCount = PROJECTS.length + 1; // + the "coming soon" slide

    const scrollToSlide = useCallback((index: number) => {
        const el = scrollRef.current;
        if (el) el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    }, []);

    const currentSlide = () => {
        const el = scrollRef.current;
        return el ? Math.round(el.scrollLeft / el.clientWidth) : 0;
    };

    const step = (dir: 1 | -1) => scrollToSlide((currentSlide() + dir + slideCount) % slideCount);

    return (
        <section className="bg-white dark:bg-dark-900 overflow-hidden">
            <div className="px-6 md:px-12 py-6 flex justify-end gap-3 border-b border-black/5 dark:border-white/5">
                <button onClick={() => step(-1)} className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group" aria-label={t.work.prev}>
                    <Icon name="arrow-left" className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <button onClick={() => step(1)} className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group" aria-label={t.work.next}>
                    <Icon name="arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full">
                {PROJECTS.map((project, index) => (
                    <div key={project.key} className="flex-shrink-0 w-full snap-center">
                        <WorkCard project={project} onClick={() => onOpenProject(project.key)} onNext={() => scrollToSlide(index + 1)} />
                    </div>
                ))}
                <div className="flex-shrink-0 w-full snap-center">
                    <div className="h-[70vh] md:h-[80vh] w-full flex flex-col items-center justify-center text-center px-6 bg-light-100 dark:bg-dark-800">
                        <span className="font-display text-[20vw] md:text-[12vw] leading-none text-black/5 dark:text-white/5 select-none">+</span>
                        <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-black dark:text-white mb-4">{t.portfolioPage.comingTitle}</h3>
                        <p className="text-base text-black/60 dark:text-white/60 font-light mb-10">{t.portfolioPage.comingDesc}</p>
                        <button onClick={onOpenDiscoveryModal} className="px-7 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-[0.25em] font-bold hover:opacity-80 transition-opacity">
                            {t.nav.cta}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
