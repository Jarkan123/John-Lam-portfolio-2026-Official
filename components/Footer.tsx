import React, { useState, useEffect } from 'react';
import { useLang } from '../i18n';
import type { Page } from '../App';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const { t, lang } = useLang();
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString(lang === 'vi' ? 'vi-VN' : 'en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh', timeZoneName: 'short' }));
        };
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [lang]);

    return (
        <footer className="bg-white text-black dark:bg-black dark:text-white py-16 px-6 overflow-hidden relative border-t border-black/5 dark:border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest opacity-50">John Lam</span>
                    <p className="text-sm max-w-xs opacity-70">{t.footer.tagline}</p>
                </div>
                <div className="flex flex-col gap-3 md:text-right">
                    <span className="text-[10px] uppercase tracking-widest opacity-50">{t.footer.localTime}</span>
                    <span className="text-sm font-mono opacity-70">{time}</span>
                </div>
            </div>

            <div className="border-t border-black/10 dark:border-white/10 pt-8 flex justify-between items-center text-[10px] uppercase tracking-widest gap-4">
                <div className="flex gap-4 items-center">
                    <span className="opacity-40">© {new Date().getFullYear()} John Lam</span>
                    <a href="#/du-an" onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }} className="opacity-40 hover:opacity-100 transition-opacity">{t.nav.portfolio}</a>
                </div>
                <span className="opacity-40">{t.footer.rights}</span>
            </div>

            <div className="mt-12 select-none pointer-events-none">
                <h1 className="font-display text-[18vw] leading-[0.7] uppercase tracking-tighter text-center opacity-5 dark:opacity-20">John Lam</h1>
            </div>
        </footer>
    );
};

export default Footer;
