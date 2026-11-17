import React, { useState } from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';
import type { Page } from '../App';

interface HeaderProps {
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
    page: Page;
    onNavigate: (page: Page) => void;
    onScrollToSection: (id: string) => void;
    onOpenDiscoveryModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, theme, page, onNavigate, onScrollToSection, onOpenDiscoveryModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, lang, toggleLang } = useLang();

    const navItems: { label: string; action: () => void; active?: boolean }[] = [
        { label: t.nav.system, action: () => onScrollToSection('system') },
        { label: t.nav.ai, action: () => onScrollToSection('ai') },
        { label: t.nav.roadmap, action: () => onScrollToSection('roadmap') },
        { label: t.nav.portfolio, action: () => onNavigate('portfolio'), active: page === 'portfolio' },
        { label: t.nav.faq, action: () => onScrollToSection('faq') },
        { label: t.nav.contact, action: () => onScrollToSection('contact-us') },
    ];

    const run = (fn: () => void) => {
        fn();
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 w-full z-[100] border-b border-black/5 dark:border-white/5 bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl transition-colors duration-500">
            <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 max-w-[1920px] mx-auto gap-4">
                <div className="flex-shrink-0">
                    <a href="./" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-transform group-hover:scale-95">
                            <span className="font-display text-sm md:text-base font-bold text-white dark:text-black">JL</span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-display font-bold text-sm tracking-tight uppercase text-black dark:text-white">John Lam</span>
                            <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 hidden md:block">{t.nav.role}</span>
                        </div>
                    </a>
                </div>

                <div className="hidden xl:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] p-1 rounded-full border border-black/5 dark:border-white/5">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={item.action}
                            className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 ${item.active ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/50 dark:text-white/50 hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleLang}
                        className="h-10 px-3 text-[10px] uppercase tracking-widest font-bold text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full transition-colors"
                        aria-label={t.nav.langLabel}
                        title={t.nav.langLabel}
                    >
                        <span className={lang === 'vi' ? 'text-black dark:text-white' : 'opacity-40'}>VI</span>
                        <span className="opacity-30 mx-1">/</span>
                        <span className={lang === 'en' ? 'text-black dark:text-white' : 'opacity-40'}>EN</span>
                    </button>
                    <button
                        onClick={onToggleTheme}
                        className="p-2.5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={onOpenDiscoveryModal}
                        className="hidden md:inline-flex items-center h-10 px-5 text-[10px] uppercase tracking-widest font-bold bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-80 transition-opacity"
                    >
                        {t.nav.cta}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="xl:hidden p-2.5 text-black dark:text-white bg-black/5 dark:bg-white/5 rounded-full z-[110]"
                        aria-label="Toggle menu"
                    >
                        <Icon name={isMenuOpen ? 'x' : 'menu'} className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className={`fixed inset-0 bg-white dark:bg-dark-900 z-[105] flex flex-col items-center justify-center gap-7 transition-all duration-500 ease-custom ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                {navItems.map((item, index) => (
                    <button
                        key={item.label}
                        onClick={() => run(item.action)}
                        className="text-3xl md:text-4xl font-display uppercase tracking-tighter font-bold text-black dark:text-white hover:opacity-50 transition-all"
                        style={{ transitionDelay: `${index * 80}ms` }}
                    >
                        {item.label}
                    </button>
                ))}
                <button
                    onClick={() => run(onOpenDiscoveryModal)}
                    className="mt-4 px-8 py-4 text-xs uppercase tracking-widest font-bold bg-black text-white dark:bg-white dark:text-black rounded-full"
                >
                    {t.nav.cta}
                </button>
                <div className="absolute bottom-10 flex flex-col items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">{t.nav.getInTouch}</span>
                    <a href="mailto:minhlam14052001@gmail.com" className="text-sm font-medium">minhlam14052001@gmail.com</a>
                </div>
            </div>
        </nav>
    );
};

export default Header;
