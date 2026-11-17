import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import ProjectOverlay from './components/ProjectOverlay';
import Toast from './components/Toast';
import Intro from './components/Intro';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import DiscoveryCallModal from './components/DiscoveryCallModal';
import Lightbox from './components/Lightbox';
import { PROJECTS } from './constants';
import { useLang } from './i18n';

import type { ProjectKey, GalleryImage } from './types';

// Pages are routed on the URL hash so the site works on any static host
// (GitHub Pages included) without server rewrites.
export type Page = 'home' | 'portfolio';
const PORTFOLIO_HASH = '#/du-an';

const pageFromHash = (): Page => (window.location.hash === PORTFOLIO_HASH ? 'portfolio' : 'home');

const readStoredTheme = (): 'light' | 'dark' => {
    try {
        return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
};

const App: React.FC = () => {
    const { t } = useLang();
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState<'light' | 'dark'>(readStoredTheme);
    const [page, setPage] = useState<Page>(pageFromHash);
    const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);
    const [lightboxState, setLightboxState] = useState<{ images: GalleryImage[], index: number } | null>(null);
    const [pendingSection, setPendingSection] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2600);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const onHash = () => {
            const next = pageFromHash();
            setPage(prev => {
                if (prev !== next) window.scrollTo(0, 0);
                return next;
            });
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        try {
            window.localStorage.setItem('theme', theme);
        } catch {
            /* storage unavailable */
        }
    }, [theme]);

    useEffect(() => {
        document.body.style.overflow = (activeProject || isDiscoveryModalOpen || lightboxState) ? 'hidden' : '';
    }, [activeProject, isDiscoveryModalOpen, lightboxState]);

    const toggleTheme = useCallback(() => setTheme(prev => (prev === 'light' ? 'dark' : 'light')), []);

    const showToast = useCallback((message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    }, []);

    const openProject = useCallback((key: ProjectKey) => {
        showToast(t.project.loading);
        setActiveProject(key);
    }, [showToast, t]);

    const closeProject = useCallback(() => setActiveProject(null), []);
    const openDiscoveryModal = useCallback(() => setIsDiscoveryModalOpen(true), []);
    const closeDiscoveryModal = useCallback(() => setIsDiscoveryModalOpen(false), []);
    const openLightbox = useCallback((images: GalleryImage[], index: number) => setLightboxState({ images, index }), []);
    const closeLightbox = useCallback(() => setLightboxState(null), []);

    const navigate = useCallback((target: Page) => {
        if (target === 'portfolio') {
            window.location.hash = PORTFOLIO_HASH;
        } else {
            history.pushState(null, '', window.location.pathname + window.location.search);
            setPage('home');
            window.scrollTo(0, 0);
        }
    }, []);

    const scrollToSection = useCallback((sectionId: string) => {
        if (page !== 'home') {
            navigate('home');
            setPendingSection(sectionId);
            return;
        }
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [page, navigate]);

    useEffect(() => {
        if (page === 'home' && pendingSection) {
            const id = pendingSection;
            setPendingSection(null);
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        }
    }, [page, pendingSection]);

    const project = activeProject ? PROJECTS.find(p => p.key === activeProject) ?? null : null;

    return (
        <>
            <Intro isLoading={isLoading} />
            <div className={`bg-white dark:bg-dark-900 text-black dark:text-light-100 transition-opacity duration-1000 w-full selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <NoiseOverlay />
                <Toast message={toastMessage} />
                <Header
                    onToggleTheme={toggleTheme}
                    theme={theme}
                    page={page}
                    onNavigate={navigate}
                    onScrollToSection={scrollToSection}
                    onOpenDiscoveryModal={openDiscoveryModal}
                />
                <ProjectOverlay project={project} onClose={closeProject} onOpenLightbox={openLightbox} />
                <DiscoveryCallModal isOpen={isDiscoveryModalOpen} onClose={closeDiscoveryModal} />

                {page === 'portfolio' ? (
                    <Portfolio onOpenProject={openProject} onOpenDiscoveryModal={openDiscoveryModal} />
                ) : (
                    <Home
                        isLoading={isLoading}
                        onOpenProject={openProject}
                        onNavigate={navigate}
                        onScrollToSection={scrollToSection}
                        onOpenDiscoveryModal={openDiscoveryModal}
                    />
                )}

                <Footer onNavigate={navigate} />
            </div>

            {lightboxState && (
                <Lightbox images={lightboxState.images} startIndex={lightboxState.index} onClose={closeLightbox} />
            )}
        </>
    );
};

export default App;
