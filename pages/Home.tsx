import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Problems from '../components/Problems';
import Framework from '../components/Framework';
import AIStack from '../components/AIStack';
import Roadmap from '../components/Roadmap';
import Process from '../components/Process';
import WorkTeaser from '../components/WorkTeaser';
import Brands from '../components/Brands';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Belief from '../components/Belief';
import Contact from '../components/Contact';
import type { Page } from '../App';

interface HomeProps {
    isLoading: boolean;
    onOpenProject: (key: string) => void;
    onNavigate: (page: Page) => void;
    onScrollToSection: (id: string) => void;
    onOpenDiscoveryModal: () => void;
}

const Home: React.FC<HomeProps> = ({ isLoading, onOpenProject, onNavigate, onScrollToSection, onOpenDiscoveryModal }) => (
    <main className="w-full max-w-[1920px] mx-auto border-x border-black/5 dark:border-white/5 bg-white dark:bg-dark-900 transition-colors duration-500">
        <Hero isLoading={isLoading} onOpenDiscoveryModal={onOpenDiscoveryModal} onScrollToSection={onScrollToSection} />
        <Marquee />
        <Problems />
        <Framework />
        <AIStack />
        <Roadmap onOpenDiscoveryModal={onOpenDiscoveryModal} />
        <Process />
        <WorkTeaser onOpenProject={onOpenProject} onNavigate={onNavigate} />
        <Brands />
        <Testimonials />
        <FAQ />
        <Belief />
        <Contact onOpenDiscoveryModal={onOpenDiscoveryModal} />
    </main>
);

export default Home;
