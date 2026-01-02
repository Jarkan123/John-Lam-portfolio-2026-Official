
import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Work from '../components/Work';
import Brands from '../components/Brands';
import Testimonials from '../components/Testimonials';
import Services from '../components/Services';
import Belief from '../components/Belief';
import Contact from '../components/Contact';
import LazySection from '../components/LazySection';
import type { ProjectKey } from '../types';

interface HomeProps {
    onOpenProject: (key: ProjectKey) => void;
    onNavigate: (path: string) => void;
    isLoading: boolean;
    onOpenDiscoveryModal: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenProject, onNavigate, isLoading, onOpenDiscoveryModal }) => {
    return (
        <main className="w-full max-w-[1920px] mx-auto border-x border-black/5 dark:border-white/5 bg-white dark:bg-dark-900 transition-colors duration-500">
            <Hero isLoading={isLoading} />
            <Marquee />
            <LazySection minHeight="120vh">
                <Work onOpenProject={onOpenProject} onNavigate={onNavigate} />
            </LazySection>
            <LazySection minHeight="300px">
                <Brands />
            </LazySection>
            <LazySection minHeight="80vh">
                <Testimonials />
            </LazySection>
            <LazySection minHeight="80vh">
                <Services />
            </LazySection>
            <LazySection minHeight="50vh">
                <Belief />
            </LazySection>
            <LazySection minHeight="100vh">
                <Contact onOpenDiscoveryModal={onOpenDiscoveryModal} />
            </LazySection>
        </main>
    );
};

export default Home;
