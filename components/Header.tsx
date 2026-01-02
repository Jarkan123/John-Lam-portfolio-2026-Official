
import React from 'react';
import Icon from './Icon';

interface HeaderProps {
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, theme, onNavigate }) => {
    return (
        <nav className="fixed top-0 w-full z-[60] border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl transition-colors duration-500">
            <div className="flex justify-between items-center h-16 md:h-20 px-6 md:px-8 max-w-[1920px] mx-auto">
                {/* Logo */}
                <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} className="flex items-center gap-2 group z-50">
                    <div className="w-6 h-6 bg-black dark:bg-white rounded-md flex items-center justify-center">
                        <span className="font-display text-xs font-semibold text-white dark:text-black">JL</span>
                    </div>
                    <span className="font-display font-medium text-sm tracking-tight uppercase hidden md:block group-hover:opacity-60 transition-opacity">John Lam</span>
                </a>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button onClick={onToggleTheme} className="p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors" aria-label="Toggle Theme">
                        {theme === 'dark' ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;