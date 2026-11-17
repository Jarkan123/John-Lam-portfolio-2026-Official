import React from 'react';

interface SectionHeadingProps {
    eyebrow: string;
    title1: string;
    title2?: string;
    intro?: string;
    invert?: boolean;
    children?: React.ReactNode;
}

// The site's signature heading: small spaced label, huge uppercase title,
// second line faded to grey, optional intro text on the right.
const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title1, title2, intro, invert = false, children }) => {
    const ink = invert ? 'text-white dark:text-black' : 'text-black dark:text-white';
    const faded = invert ? 'text-white/30 dark:text-black/30' : 'text-black/30 dark:text-white/30';
    const soft = invert ? 'text-white/60 dark:text-black/60' : 'text-black/60 dark:text-white/60';
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 mb-16 md:mb-24">
            <div className="space-y-6">
                <span className={`text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block ${ink}`}>{eyebrow}</span>
                <h2 className={`font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] max-w-5xl ${ink}`}>
                    {title1}
                    {title2 && (<><br /><span className={faded}>{title2}</span></>)}
                </h2>
            </div>
            {(intro || children) && (
                <div className="max-w-md">
                    {intro && <p className={`text-sm md:text-lg font-light leading-relaxed ${soft}`}>{intro}</p>}
                    {children}
                </div>
            )}
        </div>
    );
};

export default SectionHeading;
