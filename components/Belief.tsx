
import React, { useRef, useEffect, useState } from 'react';
import { useLang } from '../i18n';

const Belief: React.FC = () => {
    const beliefRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    
    const { t } = useLang();
    const text = t.belief;
    const words = text.split(' ');

    useEffect(() => {
        const el = beliefRef.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            // Start animation when top of element is at 80% of viewport height
            // Animation is complete when top is at 20% of viewport height
            const startPoint = window.innerHeight * 0.8;
            const endPoint = window.innerHeight * 0.2;
            
            const progress = Math.max(0, Math.min(1, 1 - (rect.top - endPoint) / (startPoint - endPoint)));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="belief" className="py-32 md:py-48 px-6 md:px-12 border-b border-black/5 dark:border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <p 
                    ref={beliefRef}
                    className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-black dark:text-white"
                >
                    {words.map((word, index) => {
                        const wordProgress = Math.max(0, Math.min(1, (scrollProgress - (index / words.length)) / 0.05));
                        const opacity = 0.15 + wordProgress * 0.85; // Fades from 0.15 to 1.0
                        return (
                            <span key={index} style={{ opacity, transition: 'opacity 0.3s ease-in-out' }}>
                                {word}{' '}
                            </span>
                        );
                    })}
                </p>
            </div>
        </section>
    );
};

export default Belief;