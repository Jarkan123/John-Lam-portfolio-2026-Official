
import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { Project, GalleryImage } from '../types';
import Icon from './Icon';

interface ProjectOverlayProps {
    project: Project | null;
    onClose: () => void;
    onOpenLightbox: (images: GalleryImage[], startIndex: number) => void;
}

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ project, onClose, onOpenLightbox }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkForScrollability = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
        }
    }, []);

    useEffect(() => {
        if (project) {
            // Need to re-run lucide when content changes
            setTimeout(() => window.lucide?.createIcons({ attrs: { 'stroke-width': 1.5 } }), 100);
            
            const el = scrollContainerRef.current;
            if (el) {
                // Check scrollability shortly after content is rendered
                setTimeout(checkForScrollability, 100);
                el.addEventListener('scroll', checkForScrollability, { passive: true });
                window.addEventListener('resize', checkForScrollability);
                return () => {
                    el.removeEventListener('scroll', checkForScrollability);
                    window.removeEventListener('resize', checkForScrollability);
                };
            }
        }
    }, [project, checkForScrollability]);

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.8;
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    if (!project) {
        return (
            <div id="project-overlay" className="fixed inset-0 bg-white dark:bg-dark-900 z-[80] translate-y-full transition-transform duration-700 ease-custom overflow-y-auto">
            </div>
        );
    }
    
    const gallery = project?.gallery || [];

    return (
        <div id="project-overlay" className={`fixed inset-0 bg-white dark:bg-dark-900 z-[80] transition-transform duration-700 ease-custom ${project ? 'translate-y-0' : 'translate-y-full'} overflow-y-auto`}>
            <button onClick={onClose} className="fixed top-6 right-6 z-[90] w-10 h-10 bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                <Icon name="x" className="w-4 h-4" />
            </button>
            <div id="project-content" className="min-h-screen">
                <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                    <img src={project.heroImg} className="w-full h-full object-cover" alt={project.title} />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                        <span className="text-white/80 text-xs uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{project.cat}</span>
                        <h1 className="text-white font-display text-5xl md:text-8xl uppercase tracking-tighter mt-4">{project.title}</h1>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 bg-white dark:bg-dark-900 text-black dark:text-white">
                    <div className="md:col-span-4 space-y-8">
                        <div className="border-t border-black/10 dark:border-white/10 pt-4">
                            <span className="block text-[10px] uppercase tracking-widest opacity-50 mb-2">Scope</span>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(t => <span key={t} className="text-sm border border-black/10 dark:border-white/10 px-2 py-1 rounded">{t}</span>)}
                            </div>
                        </div>
                        <div className="border-t border-black/10 dark:border-white/10 pt-4">
                            <span className="block text-[10px] uppercase tracking-widest opacity-50 mb-2">Year</span>
                            <span className="text-lg font-display">{project.year}</span>
                        </div>
                        <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-4">
                            {project.liveSiteUrl && (
                                <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 bg-black dark:bg-white text-white dark:text-black uppercase tracking-widest text-xs font-medium hover:opacity-80 transition-opacity">
                                    Visit Live Site
                                </a>
                            )}
                             {project.socialMediaUrl && (
                                <a href={project.socialMediaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 bg-blue-600 text-white uppercase tracking-widest text-xs font-medium hover:opacity-80 transition-opacity">
                                    Visit Social Media
                                </a>
                            )}
                        </div>
                    </div>
                    
                    <div className="md:col-span-8">
                        <h3 className="font-display text-2xl uppercase tracking-tight mb-6">Overview</h3>
                        <p className="text-lg md:text-xl font-light leading-relaxed opacity-80 mb-12">
                            {project.desc}
                        </p>
                        
                        {gallery.length > 0 ? (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-display text-2xl uppercase tracking-tight">Gallery</h3>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => scroll('left')} disabled={!canScrollLeft} className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                            <Icon name="arrow-left" className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => scroll('right')} disabled={!canScrollRight} className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                            <Icon name="arrow-right" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
                                    {gallery.map((image, index) => (
                                        <div key={index} className="flex-shrink-0 w-[85%] md:w-[48%] aspect-video">
                                            <div onClick={() => onOpenLightbox(gallery, index)} className="relative h-full w-full bg-cover bg-center rounded-lg overflow-hidden cursor-pointer group border border-black/5 dark:border-white/5">
                                                <img src={image.imageUrl} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                    <Icon name="zoom-in" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : project.detailImg && (
                             <div className="space-y-8">
                                <div className="bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden border border-black/5 dark:border-white/5">
                                    <img src={project.detailImg} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="Detail"/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-black/5 dark:border-white/5 py-24 text-center bg-light-100 dark:bg-dark-800 text-black dark:text-white">
                    <button onClick={onClose} className="group inline-flex flex-col items-center gap-4">
                        <span className="text-[10px] uppercase tracking-widest opacity-40">Back to Index</span>
                        <span className="font-display text-4xl uppercase tracking-tighter group-hover:opacity-50 transition-opacity">Close Project</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverlay;