
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import ProjectOverlay from './components/ProjectOverlay';
import Toast from './components/Toast';
import Intro from './components/Intro';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Admin from './pages/Admin';

import type { ProjectKey } from './types';
import { useProjects } from './hooks/useProjects';

// Declare lucide on the window object
declare global {
    interface Window {
        lucide: any;
        Cal: any;
    }
}

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    
    const { projects } = useProjects();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', onLocationChange);
        return () => window.removeEventListener('popstate', onLocationChange);
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        window.lucide?.createIcons({ attrs: { 'stroke-width': 1.5 } });
        window.Cal?.("init", {origin:"https://cal.com"});
    });

    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [activeProject]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }, []);

    const showToast = useCallback((message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    }, []);

    const openProject = useCallback((key: ProjectKey) => {
        showToast("Loading Project Asset...");
        setActiveProject(key);
    }, [showToast]);

    const closeProject = useCallback(() => {
        setActiveProject(null);
    }, []);
    
    const navigate = (path: string) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
    };

    const renderPage = () => {
        if (currentPath.startsWith('/admin')) {
            return <Admin />;
        }
        switch (currentPath) {
            case '/archive':
                return <Archive projects={projects} onOpenProject={openProject} />;
            case '/':
            default:
                return <Home onOpenProject={openProject} onNavigate={navigate} />;
        }
    };

    return (
        <>
            <Intro isLoading={isLoading} />
            <div className={`bg-white dark:bg-dark-900 text-black dark:text-light-100 transition-opacity duration-1000 w-full relative selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <NoiseOverlay />
                <Toast message={toastMessage} />
                <Header onToggleTheme={toggleTheme} theme={theme} onNavigate={navigate} />
                <ProjectOverlay project={activeProject ? projects[activeProject] : null} onClose={closeProject} />

                {renderPage()}

                <Footer onNavigate={navigate} />
            </div>
        </>
    );
};

export default App;
