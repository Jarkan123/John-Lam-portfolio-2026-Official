
import React, { useState, useEffect } from 'react';

interface FooterProps {
    onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
            setTime(timeString);
        };
        
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        
        return () => clearInterval(intervalId);
    }, []);

    return (
        <footer className="bg-white text-black dark:bg-black dark:text-white py-16 px-6 overflow-hidden relative border-t border-black/5 dark:border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest opacity-50">John Lam</span>
                    <p className="text-sm max-w-xs opacity-70">
                        A creative developer building the interfaces of tomorrow.
                    </p>
                </div>
                <div className="flex flex-col gap-3 text-right">
                    <span className="text-[10px] uppercase tracking-widest opacity-50">Local Time</span>
                    <span id="time-display" className="text-sm font-mono opacity-70">{time}</span>
                </div>
            </div>
            
            <div className="border-t border-black/10 dark:border-white/10 pt-8 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
                <div className="flex gap-4">
                    <span>© 2024 John Lam</span>
                    <a href="/admin" onClick={(e) => { e.preventDefault(); onNavigate('/admin'); }} className="hover:text-white transition-colors">Admin</a>
                </div>
                <span>All Rights Reserved</span>
            </div>

            <div className="mt-12 select-none pointer-events-none">
                 <h1 className="font-display text-[18vw] leading-[0.7] uppercase tracking-tighter text-center opacity-5 dark:opacity-20">John Lam</h1>
            </div>
        </footer>
    );
};

export default Footer;
