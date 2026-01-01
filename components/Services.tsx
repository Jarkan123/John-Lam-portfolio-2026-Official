
import React from 'react';
import Icon from './Icon';

interface ServiceCardProps {
    num: string;
    icon: string;
    title: string;
    description: string;
    className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ num, icon, title, description, className = '' }) => (
    <div className={`p-8 md:p-12 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-300 group ${className}`}>
        <div className="mb-16 flex justify-between items-start">
            <span className="text-[10px] font-mono opacity-40 border border-current px-2 py-0.5 rounded">{num}</span>
            <Icon name={icon} className="w-6 h-6 opacity-60 group-hover:text-blue-500 transition-colors" />
        </div>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{title}</h3>
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed font-light whitespace-pre-line">
            {description}
        </p>
    </div>
);

const Services: React.FC = () => {
    return (
        <section id="services" className="border-b border-black/5 dark:border-white/5">
            <div className="px-6 md:px-12 py-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter max-w-3xl leading-[0.9]">
                    A spectrum of services, <br /><span className="text-black/40 dark:text-white/40">tailored for impact.</span>
                </h2>
                <p className="text-sm text-black/60 dark:text-white/60 font-light max-w-xs">
                    From initial strategy to final deployment, I provide end-to-end solutions that guarantee quality and performance.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <ServiceCard
                    num="01"
                    icon="compass"
                    title="Growth Strategy & Brand Management"
                    description={`Most brands don’t fail because of traffic.
They fail because nothing is aligned.

I help brands define positioning, creative direction, funnels, and growth priorities — turning scattered efforts into a focused system built to scale.`}
                    className="border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/5"
                />
                <ServiceCard
                    num="02"
                    icon="bar-chart-2"
                    title="Performance Marketing"
                    description={`Ads are an investment.
And returns are the benchmark.

I scale paid media systems from early-stage budgets to consistent five-figure monthly spend, focusing on high-quality lead acquisition and revenue efficiency across platforms like Meta and Google Ads.`}
                    className="border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/5"
                />
                <ServiceCard
                    num="03"
                    icon="zap"
                    title="AI & Automation Systems"
                    description={`Speed and leverage decide who wins.

I build fast, SEO-ready websites and automation systems that remove friction from growth — from lead capture to follow-up and reporting.`}
                />
            </div>
        </section>
    );
};

export default Services;