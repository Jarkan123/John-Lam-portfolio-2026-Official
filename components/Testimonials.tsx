
import React from 'react';
import Icon from './Icon';

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => (
    <div className="p-8 md:p-12 bg-light-100 dark:bg-dark-800 border border-black/5 dark:border-white/5 rounded-lg flex flex-col justify-between h-full">
        <Icon name="quote" className="w-8 h-8 opacity-10 mb-8" />
        <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80 dark:text-white/80 flex-grow">"{quote}"</p>
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
            <p className="font-display text-lg font-medium">{name}</p>
            <p className="text-sm opacity-50">{title}</p>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-24 px-6 md:px-12 border-b border-black/5 dark:border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="text-[10px] uppercase tracking-widest opacity-40 border border-black/20 dark:border-white/20 px-3 py-1 rounded-full">Testimonials</span>
                    <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mt-6">What My Clients Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TestimonialCard 
                        quote="John transformed our vision into a digital reality that exceeded all expectations. His attention to detail is unparalleled."
                        name="Ms. Sassy Nguyen"
                        title="Founder — S&S Sons"
                    />
                    <TestimonialCard 
                        quote="Working with John was a seamless experience. He understands brand integrity, respects long-term value, and builds systems that support both. The final product was not only beautiful but also incredibly performant."
                        name="Ms. Anita Kwok"
                        title="Representative — O2H2O"
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
