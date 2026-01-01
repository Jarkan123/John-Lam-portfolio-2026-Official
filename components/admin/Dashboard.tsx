
import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import type { Project, ProjectKey } from '../../types';
import Icon from '../Icon';

interface DashboardProps {
    onLogout: () => void;
}

const ProjectForm: React.FC<{ project?: Project; onSave: (project: Project) => void; onCancel: () => void; }> = ({ project, onSave, onCancel }) => {
    // FIX: The initial state for a new project is not a valid `Project`.
    // The explicit `useState<Project>` is too restrictive.
    // By removing it, we allow the state to be inferred, accommodating the initial empty form state.
    const [formData, setFormData] = useState(project || {
        key: '', title: '', cat: '', year: '', desc: '', tags: [], coverImg: '', heroImg: '', detailImg: ''
    });
    const isEditing = !!project;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData(prev => ({ ...prev, tags: value.split(',').map(tag => tag.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // FIX: Assert formData as Project on submit, as we expect a complete project object
        // from the form at this point.
        onSave(formData as Project);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-dark-900 rounded-lg border border-black/5 dark:border-white/5">
            <h3 className="text-xl font-display">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
            {Object.keys(formData).map(key => (
                <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={key === 'tags' ? (formData as any).tags.join(', ') : (formData as any)[key]}
                        onChange={handleChange}
                        required
                        disabled={isEditing && key === 'key'}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            ))}
            <div className="flex justify-end gap-4">
                 <button type="button" onClick={onCancel} className="py-2 px-4 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-800">Cancel</button>
                 <button type="submit" className="py-2 px-4 text-sm font-medium rounded-md text-white bg-black dark:bg-white dark:text-black hover:opacity-80">Save Project</button>
            </div>
        </form>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const { projects, addProject, deleteProject, updateProjects } = useProjects();
    const [isAdding, setIsAdding] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleSave = (project: Project) => {
        addProject(project);
        setIsAdding(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <div className="flex gap-4">
                    <button onClick={() => setIsAdding(true)} className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md text-sm font-medium hover:opacity-80">Add Project</button>
                    <button onClick={() => setIsExporting(true)} className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:opacity-80">Export for Update</button>
                    <button onClick={onLogout} className="bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">Logout</button>
                </div>
            </div>

            {isAdding && <div className="mb-8"><ProjectForm onSave={handleSave} onCancel={() => setIsAdding(false)} /></div>}
            
            {isExporting && (
                <div className="mb-8 p-6 bg-white dark:bg-dark-900 rounded-lg border border-black/5 dark:border-white/5">
                    <h3 className="text-xl font-display mb-2">Export Project Data</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Copy this code and send it to your developer to update the live site.</p>
                    <textarea 
                        readOnly 
                        className="w-full h-64 p-2 font-mono text-xs bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-gray-700 rounded-md"
                        value={`export const PROJECTS = ${JSON.stringify(projects, null, 2)};`}
                    />
                    <button onClick={() => setIsExporting(false)} className="mt-4 bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-md text-sm font-medium">Close</button>
                </div>
            )}

            <div className="bg-white dark:bg-dark-900 shadow overflow-hidden sm:rounded-lg border border-black/5 dark:border-white/5">
                <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                    {Object.values(projects).map((project) => (
                        <li key={project.key} className="px-6 py-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black dark:text-white">{project.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{project.cat}</p>
                            </div>
                            <button onClick={() => deleteProject(project.key)} className="text-red-600 hover:text-red-900">
                                <Icon name="trash-2" className="w-4 h-4"/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
