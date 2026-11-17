import React from 'react';
import Work from '../components/Work';
import Brands from '../components/Brands';
import Contact from '../components/Contact';
import { useLang } from '../i18n';

interface PortfolioProps {
    onOpenProject: (key: string) => void;
    onOpenDiscoveryModal: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onOpenProject, onOpenDiscoveryModal }) => {
    const { t } = useLang();
    const p = t.portfolioPage;
    return (
        <main className="w-full max-w-[1920px] mx-auto border-x border-black/5 dark:border-white/5 bg-white dark:bg-dark-900 transition-colors duration-500">
            <header className="px-6 md:px-12 pt-40 md:pt-48 pb-16 md:pb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block">{p.eyebrow}</span>
                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85] text-black dark:text-white">
                        {p.title1}<br /><span className="text-black/30 dark:text-white/30">{p.title2}</span>
                    </h1>
                </div>
                <p className="max-w-md text-sm md:text-lg text-black/60 dark:text-white/60 font-light leading-relaxed">{p.intro}</p>
            </header>
            <Work onOpenProject={onOpenProject} onOpenDiscoveryModal={onOpenDiscoveryModal} />
            <Brands />
            <Contact onOpenDiscoveryModal={onOpenDiscoveryModal} />
        </main>
    );
};

export default Portfolio;
