
import { useState, useEffect } from 'react';
import { PROJECTS as initialProjects } from '../constants';
import type { Project, ProjectKey } from '../types';

export const useProjects = () => {
    const [projects, setProjects] = useState<Record<ProjectKey, Project>>(() => {
        try {
            const localData = window.localStorage.getItem('projects');
            return localData ? JSON.parse(localData) : initialProjects;
        } catch (error) {
            console.error("Error reading projects from localStorage", error);
            return initialProjects;
        }
    });

    const updateProjects = (newProjects: Record<ProjectKey, Project>) => {
        setProjects(newProjects);
        try {
            window.localStorage.setItem('projects', JSON.stringify(newProjects));
        } catch (error) {
            console.error("Error saving projects to localStorage", error);
        }
    };
    
    const addProject = (project: Project) => {
        const newProjects = { ...projects, [project.key]: project };
        updateProjects(newProjects);
    };

    const deleteProject = (key: ProjectKey) => {
        const newProjects = { ...projects };
        delete newProjects[key];
        updateProjects(newProjects);
    };

    return { projects, addProject, deleteProject, updateProjects };
};
