
import React, { useState } from 'react';
import Icon from './Icon';

interface HeaderProps {
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
    onNavigate: (path: string) => void;
    onScrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, theme, onNavigate, onScrollToSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'Clients', id: 'my-client' },
        { label: 'Services', id: 'service' },
        { label: 'Testimonials', id: 'testimonial' },
        { label: 'Contact', id: 'contact-us' },
    ];

    const handleNavClick = (id: string) => {
        onScrollToSection(id);
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 w-full z-[100] border-b border-black/5 dark:border-white/5 bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl transition-colors duration-500">
            <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 max-w-[1920px] mx-auto">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-transform group-hover:scale-95">
                            <span className="font-display text-sm md:text-base font-bold text-white dark:text-black">JL</span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-display font-bold text-sm tracking-tight uppercase text-black dark:text-white">John Lam</span>
                            <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 hidden md:block">Growth Marketer</span>
                        </div>
                    </a>
                </div>

                {/* Desktop Navigation - Button Style */}
                <div className="hidden lg:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] p-1 rounded-full border border-black/5 dark:border-white/5">
                    {navItems.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => handleNavClick(item.id)} 
                            className="px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold text-black/50 dark:text-white/50 hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white rounded-full transition-all duration-300"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Controls & Mobile Toggle */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onToggleTheme} 
                        className="p-2.5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full transition-colors" 
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
                    </button>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2.5 text-black dark:text-white bg-black/5 dark:bg-white/5 rounded-full z-[110]"
                        aria-label="Toggle Menu"
                    >
                        <Icon name={isMenuOpen ? "x" : "menu"} className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`fixed inset-0 bg-white dark:bg-dark-900 z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-custom ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                {navItems.map((item, index) => (
                    <button 
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="text-4xl font-display uppercase tracking-tighter font-bold text-black dark:text-white hover:opacity-50 transition-all"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        {item.label}
                    </button>
                ))}
                <div className="absolute bottom-12 flex flex-col items-center gap-4">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">Get in touch</span>
                    <a href="mailto:minhlam14052001@gmail.com" className="text-sm font-medium">minhlam14052001@gmail.com</a>
                </div>
            </div>
        </nav>
    );
};

export default Header;
