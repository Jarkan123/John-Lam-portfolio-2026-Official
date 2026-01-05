
import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { ProjectKey } from '../types';
import Icon from './Icon';
import WorkCard from './WorkCard';
import { useProjects } from '../hooks/useProjects';

interface WorkProps {
    onOpenProject: (key: ProjectKey) => void;
    onNavigate: (path: string) => void;
}

const Work: React.FC<WorkProps> = ({ onOpenProject, onNavigate }) => {
    const { projects } = useProjects();
    const featuredProjects = Object.keys(projects);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [checkScroll]);

    const scrollToProject = useCallback((index: number) => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            scrollRef.current.scrollTo({
                left: index * width,
                behavior: 'smooth'
            });
        }
    }, []);

    const handleNext = useCallback((currentIndex: number) => {
        const nextIndex = (currentIndex + 1) % featuredProjects.length;
        scrollToProject(nextIndex);
    }, [featuredProjects.length, scrollToProject]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            const currentScroll = scrollRef.current.scrollLeft;
            const target = direction === 'left' ? currentScroll - width : currentScroll + width;
            
            // Loop logic for manual arrow buttons
            if (direction === 'right' && currentScroll >= (featuredProjects.length - 1) * width - 10) {
                scrollToProject(0);
            } else if (direction === 'left' && currentScroll <= 10) {
                scrollToProject(featuredProjects.length - 1);
            } else {
                scrollRef.current.scrollTo({
                    left: target,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <section id="portfolio" className="bg-white dark:bg-dark-900 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 md:px-12 py-20 md:py-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-black/5 dark:border-white/5">
                <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block">Selected Work</span>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] max-w-4xl">
                        Featured <br />
                        <span className="text-black/30 dark:text-white/30">Case Studies.</span>
                    </h2>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => scroll('left')}
                        className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
                        aria-label="Previous Project"
                    >
                        <Icon name="arrow-left" className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
                        aria-label="Next Project"
                    >
                        <Icon name="arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Immersive Slider - FULL WIDTH */}
            <div 
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing w-full"
            >
                {featuredProjects.map((key, index) => (
                    <div key={key} className="flex-shrink-0 w-full snap-center">
                        <WorkCard 
                            project={projects[key]} 
                            onClick={() => onOpenProject(key)}
                            onNext={() => handleNext(index)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Work;
