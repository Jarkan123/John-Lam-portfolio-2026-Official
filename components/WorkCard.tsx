
import React, { useRef, useEffect } from 'react';
import type { Project } from '../types';
import Icon from './Icon';

interface WorkCardProps {
    project: Project;
    onClick: () => void;
    onNext: () => void;
    className?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ project, onClick, onNext, className = '' }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const img = imgRef.current;
        if (!card || !img) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const moveX = (x - 0.5) * 10;
            const moveY = (y - 0.5) * 10;
            
            img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        };

        const handleMouseLeave = () => {
            img.style.transform = 'scale(1.05) translate(0, 0)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`group relative h-[90vh] md:h-screen w-full overflow-hidden flex flex-col justify-end ${className}`}
        >
            {/* Background Image - Optimized for Mobile Positioning */}
            <div className="absolute inset-0 z-0">
                <img
                    ref={imgRef}
                    src={project.coverImg}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_30%] md:object-center transition-all duration-[2s] ease-custom scale-[1.05]"
                    alt={project.title}
                />
                {/* Refined Overlays for clarity - Less dark on mobile */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>

            {/* Structured Content Overlay - Responsive Padding */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 pb-12 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-end">
                    
                    {/* Main Title & Impact Section */}
                    <div className="lg:col-span-8 transform transition-transform duration-1000 group-hover:-translate-y-2">
                        <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-10">
                            <span className="text-white text-[9px] md:text-xs uppercase tracking-[0.4em] font-bold flex items-center gap-3 drop-shadow-md">
                                <span className="w-6 md:w-8 h-[1px] bg-white"></span>
                                {project.cat}
                            </span>
                            <h3 className="text-white font-display text-4xl md:text-7xl lg:text-[6vw] uppercase tracking-tighter leading-[0.9] mb-2 drop-shadow-2xl">
                                {project.title}
                            </h3>
                            {project.impactStatement && (
                                <p className="text-white font-display text-lg md:text-3xl tracking-tight leading-tight max-w-2xl font-medium drop-shadow-lg opacity-90">
                                    {project.impactStatement}
                                </p>
                            )}
                        </div>

                        <div className="max-w-2xl space-y-6 md:space-y-8">
                            <p className="hidden md:block text-white/90 text-base md:text-lg font-light leading-relaxed drop-shadow-md">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                                    className="inline-flex items-center gap-4 md:gap-6 py-4 md:py-5 px-6 md:px-10 border border-white/40 rounded-full text-white text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 group/btn shadow-2xl"
                                >
                                    Case Study
                                    <Icon name="arrow-up-right" className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </button>
                                
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                                    className="inline-flex items-center gap-4 md:gap-6 py-4 md:py-5 px-6 md:px-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold backdrop-blur-md transition-all duration-500 group/next"
                                >
                                    Next Case
                                    <Icon name="chevron-right" className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover/next:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Measured Impact Results - Compact for Mobile */}
                    {project.measuredImpact && (
                        <div className="lg:col-span-4 transform transition-transform duration-1000 delay-100 group-hover:-translate-y-1">
                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-xl md:rounded-2xl space-y-4 md:space-y-8 shadow-2xl">
                                <div className="flex items-center gap-2 md:gap-3 opacity-60">
                                    <Icon name="activity" className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                                    <span className="text-[8px] md:text-[10px] text-white uppercase tracking-[0.2em] font-bold">Performance Wins</span>
                                </div>
                                <ul className="space-y-4 md:space-y-6">
                                    {project.measuredImpact.slice(0, 3).map((impact, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                            <span className="text-white/90 text-[12px] md:text-base font-light leading-snug">
                                                {impact}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Year Badge - Subtle on Mobile */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 flex flex-col items-end opacity-20 select-none pointer-events-none group-hover:opacity-40 transition-opacity">
                 <span className="text-white font-display text-4xl md:text-9xl font-bold leading-none">{project.year.slice(-2)}</span>
            </div>
        </div>
    );
};

export default WorkCard;
