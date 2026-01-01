
import React, { useRef, useEffect } from 'react';
import type { Project } from '../types';

interface WorkCardProps {
    project: Project;
    onClick: () => void;
    className?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ project, onClick, className = '' }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const cursor = cursorRef.current;
        const img = imgRef.current;

        if (!card || !cursor || !img) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;

            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            img.style.transform = `scale(1.1) translate(${xPercent}px, ${yPercent}px)`;
        };

        const handleMouseLeave = () => {
            img.style.transform = 'scale(1)';
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
            onClick={onClick}
            className={`work-card group border-t border-black/5 dark:border-white/5 relative h-[60vh] cursor-none overflow-hidden bg-light-100 dark:bg-dark-800 ${className}`}
        >
            <div className="img-container absolute inset-0 w-full h-full overflow-hidden">
                <img
                    ref={imgRef}
                    src={project.coverImg}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-transform duration-1000 ease-custom"
                    alt={project.title}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
            
            <div
                ref={cursorRef}
                className="absolute w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2"
            >
                <span className="text-white text-[10px] uppercase tracking-widest">View</span>
            </div>

            <div className="absolute bottom-0 w-full p-8 flex justify-between items-end z-10">
                <div>
                    <span className="text-white/60 text-[10px] uppercase tracking-widest mb-2 block">{project.cat}</span>
                    <h3 className="text-white font-display text-3xl uppercase tracking-tighter">{project.title}</h3>
                </div>
                <span className="text-white/40 font-mono text-xs">{project.year}</span>
            </div>
        </div>
    );
};

export default WorkCard;
