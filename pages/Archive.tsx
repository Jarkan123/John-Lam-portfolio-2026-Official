import React from 'react';
import WorkCard from '../components/WorkCard';
import type { Project, ProjectKey } from '../types';

interface ArchiveProps {
    projects: Record<ProjectKey, Project>;
    onOpenProject: (key: ProjectKey) => void;
}

const Archive: React.FC<ArchiveProps> = ({ projects, onOpenProject }) => {
    const allProjects = Object.values(projects);

    return (
        <main className="w-full max-w-[1920px] mx-auto border-x border-black/5 dark:border-white/5 bg-white dark:bg-dark-900 transition-colors duration-500">
            <header className="px-6 md:px-12 py-32 text-center">
                <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter">Project Archive</h1>
                <p className="text-black/60 dark:text-white/60 mt-4 max-w-2xl mx-auto">
                    A collection of my selected works and experiments. Each project is a story of collaboration, challenge, and creative problem-solving.
                </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* FIX: Explicitly type `project` to `Project` to resolve TypeScript error where it was inferred as `unknown`. */}
                {allProjects.map((project: Project) => (
                    <WorkCard
                        key={project.key}
                        project={project}
                        onClick={() => onOpenProject(project.key)}
                        className="border-r border-b border-black/5 dark:border-white/5"
                    />
                ))}
            </div>
        </main>
    );
};

export default Archive;