
import React, { useRef, useState, useEffect, useCallback } from 'react';
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

const testimonialsData = [
    {
        quote: "John works fast and thinks clearly. He’s open to change, quick to test, and always focused on what actually helps the brand succeed.",
        name: "Ms. Sassy Nguyen",
        title: "Founder — S&S Sons"
    },
    {
        quote: "Working with John was a seamless experience. He understands brand integrity, respects long-term value, and builds systems that support both. The final product was not only beautiful but also incredibly performant.",
        name: "Ms. Anita Kwok",
        title: "Representative — O2H2O"
    },
    {
        quote: "The strategic insights and execution speed were game-changers. Our lead acquisition costs dropped by 40% within the first quarter, and our pipeline has never been stronger. A true partner in growth.",
        name: "Ms. Jade Pham",
        title: "Regional Marketing Lead — GSK"
    }
];

const Testimonials: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkForScrollability = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            setCanScrollLeft(el.scrollLeft > 0);
            // Use a small buffer to account for subpixel rendering
            setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
        }
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            checkForScrollability();
            el.addEventListener('scroll', checkForScrollability, { passive: true });
            window.addEventListener('resize', checkForScrollability);
            return () => {
                el.removeEventListener('scroll', checkForScrollability);
                window.removeEventListener('resize', checkForScrollability);
            };
        }
    }, [checkForScrollability]);

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            // Scroll by 80% of the container's visible width for a pleasant scroll effect
            const scrollAmount = el.clientWidth * 0.8;
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="testimonials" className="py-24 px-6 md:px-12 border-b border-black/5 dark:border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <span className="text-[10px] uppercase tracking-widest opacity-40 border border-black/20 dark:border-white/20 px-3 py-1 rounded-full">Testimonials</span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mt-6">What My Clients Say</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => scroll('left')} disabled={!canScrollLeft} className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            <Icon name="arrow-left" className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll('right')} disabled={!canScrollRight} className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            <Icon name="arrow-right" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div ref={scrollContainerRef} className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar -mx-6 px-6 md:-mx-12 md:px-12">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="flex-shrink-0 w-[90%] md:w-[45%] lg:w-[40%]">
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;