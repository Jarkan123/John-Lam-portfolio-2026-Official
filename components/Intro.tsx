
import React from 'react';

interface IntroProps {
    isLoading: boolean;
}

const Intro: React.FC<IntroProps> = ({ isLoading }) => {
    const texts = ['John', 'Lam'];
    return (
        <div className={`fixed inset-0 bg-white dark:bg-dark-900 z-[100] flex items-center justify-center transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-black dark:text-white uppercase tracking-tighter">
                {texts.map((text, i) => (
                    <span key={i} className="reveal-text inline-block mx-2">
                        <span className="reveal-inner" style={{ animationDelay: `${i * 0.2 + 0.5}s`, animationDuration: '1.2s' }}>
                            {text}
                        </span>
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default Intro;
