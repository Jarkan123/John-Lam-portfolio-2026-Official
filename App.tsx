

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
import DiscoveryCallModal from './components/DiscoveryCallModal';
import Lightbox from './components/Lightbox';

import type { ProjectKey, GalleryImage } from './types';
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
    const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);
    const [lightboxState, setLightboxState] = useState<{ images: GalleryImage[], index: number } | null>(null);
    
    const { projects } = useProjects();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // This effect handles browser back/forward navigation for page changes.
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        
        window.addEventListener('popstate', handleLocationChange);
        
        return () => window.removeEventListener('popstate', handleLocationChange);
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
        if (activeProject || isDiscoveryModalOpen || lightboxState) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [activeProject, isDiscoveryModalOpen, lightboxState]);

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

    const openDiscoveryModal = useCallback(() => setIsDiscoveryModalOpen(true), []);
    const closeDiscoveryModal = useCallback(() => setIsDiscoveryModalOpen(false), []);

    const openLightbox = useCallback((images: GalleryImage[], index: number) => {
        setLightboxState({ images, index });
    }, []);
    const closeLightbox = useCallback(() => setLightboxState(null), []);
    
    const navigate = (path: string) => {
        if (path !== currentPath) {
            window.history.pushState({}, '', path);
            setCurrentPath(path);
            window.scrollTo(0, 0); // Scroll to top on page change.
        }
    };

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    const renderPage = () => {
        if (currentPath.startsWith('/admin')) {
            return <Admin />;
        }
        switch (currentPath) {
            case '/archive':
                return <Archive projects={projects} onOpenProject={openProject} />;
            case '/':
            default:
                return <Home onOpenProject={openProject} onNavigate={navigate} isLoading={isLoading} onOpenDiscoveryModal={openDiscoveryModal} />;
        }
    };

    return (
        <>
            <Intro isLoading={isLoading} />
            <div className={`bg-white dark:bg-dark-900 text-black dark:text-light-100 transition-opacity duration-1000 w-full selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <NoiseOverlay />
                <Toast message={toastMessage} />
                <Header onToggleTheme={toggleTheme} theme={theme} onNavigate={navigate} onScrollToSection={scrollToSection} />
                <ProjectOverlay project={activeProject ? projects[activeProject] : null} onClose={closeProject} onOpenLightbox={openLightbox} />
                <DiscoveryCallModal isOpen={isDiscoveryModalOpen} onClose={closeDiscoveryModal} />

                {renderPage()}

                <Footer onNavigate={navigate} />
            </div>

            {lightboxState && (
                <Lightbox 
                    images={lightboxState.images} 
                    startIndex={lightboxState.index} 
                    onClose={closeLightbox} 
                />
            )}
        </>
    );
};

export default App;