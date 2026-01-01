
import React from 'react';
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
    const featuredProjects = Object.keys(projects).slice(0, 2);

    return (
        <section id="work" className="border-b border-black/5 dark:border-white/5">
            <div className="px-6 md:px-12 py-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter max-w-3xl leading-[0.9]">
                    Engineering digital presence <br /><span className="text-black/40 dark:text-white/40">through Tech & Marketing.</span>
                </h2>
                <span className="text-[10px] uppercase tracking-widest opacity-40 border border-black/20 dark:border-white/20 px-3 py-1 rounded-full">Selected Work</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {featuredProjects.map((key, index) => (
                    <WorkCard 
                        key={key} 
                        project={projects[key]} 
                        onClick={() => onOpenProject(key)} 
                        className={index % 2 === 0 ? 'md:border-r' : ''}
                    />
                ))}
                
                <div className="group border-t border-black/5 dark:border-white/5 relative h-[60vh] bg-light-100 dark:bg-dark-800 flex flex-col items-center justify-center">
                    <div className="text-center z-10">
                        <h3 className="font-display text-4xl uppercase tracking-tighter mb-4 text-black/30 dark:text-white/30">More Coming Soon</h3>
                        <p className="text-black/30 dark:text-white/30 text-xs uppercase tracking-widest">Stay Tuned</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;