
import React from 'react';
import Icon from './Icon';

interface ServiceCardProps {
    num: string;
    icon: string;
    title: string;
    description: string;
    image: string;
    isReversed?: boolean;
    onInquire: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ num, icon, title, description, image, isReversed = false, onInquire }) => (
    <div className={`group relative overflow-hidden border-b border-black/5 dark:border-white/5 flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        
        <div className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-custom z-0"></div>

        <div className="relative w-full lg:w-1/2 h-[350px] lg:h-auto overflow-hidden z-10">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-[2s] ease-custom group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>

        <div className="relative w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center z-10">
            <div className="flex justify-between items-start mb-8 md:mb-12">
                <div className="space-y-4">
                    <span className="inline-block text-[10px] md:text-xs font-mono border border-current px-3 py-1 rounded-full uppercase tracking-[0.3em] transition-all duration-500 group-hover:text-white dark:group-hover:text-black group-hover:border-white/20 dark:group-hover:border-black/20 font-bold">
                        {num}
                    </span>
                    <h3 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.9] transition-colors duration-500 group-hover:text-white dark:group-hover:text-black">
                        {title}
                    </h3>
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors">
                    <Icon name={icon} className="w-6 h-6 md:w-8 md:h-8 opacity-60 group-hover:opacity-100 group-hover:text-white dark:group-hover:text-black transition-all" />
                </div>
            </div>

            <p className="text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed font-light group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors whitespace-pre-line max-w-xl mb-12">
                {description}
            </p>

            <button 
                onClick={onInquire}
                className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 cursor-pointer w-fit"
            >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white dark:text-black border-b border-current pb-1">Inquire for Strategy</span>
                <Icon name="arrow-right" className="w-4 h-4 text-white dark:text-black" />
            </button>
        </div>
    </div>
);

interface ServicesProps {
    onOpenDiscoveryModal: () => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenDiscoveryModal }) => {
    return (
        <section id="service" className="bg-white dark:bg-dark-900 border-t border-black/5 dark:border-white/5 overflow-hidden">
            <div className="px-6 md:px-12 py-24 md:py-40 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 max-w-[1920px] mx-auto">
                <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block">Services</span>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] max-w-4xl text-black dark:text-white">
                        Integrated <br />
                        <span className="text-black/30 dark:text-white/30">Digital Marketing.</span>
                    </h2>
                </div>
                <div className="max-w-md">
                    <p className="text-sm md:text-lg text-black/60 dark:text-white/60 font-light leading-relaxed mb-6">
                        I build data-driven systems that bridge the gap between creative brand identity and measurable revenue performance.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-black/5 dark:bg-white/5 rounded-full text-[9px] uppercase tracking-widest font-bold border border-black/5 dark:border-white/5 opacity-80">Fullstack Marketing</div>
                        <div className="px-4 py-2 bg-black/5 dark:bg-white/5 rounded-full text-[9px] uppercase tracking-widest font-bold border border-black/5 dark:border-white/5 opacity-80">Automation</div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col">
                <ServiceCard
                    num="01"
                    icon="compass"
                    title="Growth Strategy"
                    image="https://i.ibb.co/VYsBsnC1/Ipad-mockup-1.png"
                    onInquire={onOpenDiscoveryModal}
                    description={`Alignment is the key to scale.

I help luxury brands define positioning, creative direction, and acquisition funnels — turning scattered marketing into a revenue-generating system.`}
                />
                <ServiceCard
                    num="02"
                    icon="bar-chart-2"
                    title="Performance Ads"
                    image="https://i.ibb.co/9mvPQFFN/performance-marketing-scaled.jpg"
                    isReversed={true}
                    onInquire={onOpenDiscoveryModal}
                    description={`Ads are an investment, not a cost.

I scale paid media systems for high-intent lead acquisition, focusing on revenue efficiency across Meta, Google, and LinkedIn Ads.`}
                />
                <ServiceCard
                    num="03"
                    icon="zap"
                    title="AI & Automation"
                    image="https://i.ibb.co/5gqky5dQ/cover-image-o-EE6-I0-XU-AI-support-jpeg-960x540-q85-crop-upscale.jpg"
                    onInquire={onOpenDiscoveryModal}
                    description={`Leverage decides who wins.

I build lightning-fast, SEO-optimized web systems and automation that removes friction from the sales cycle — from lead capture to final close.`}
                />
            </div>
        </section>
    );
};

export default Services;
