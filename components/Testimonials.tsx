
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => (
    <div className="p-8 md:p-12 lg:p-16 bg-light-100 dark:bg-dark-800 border border-black/5 dark:border-white/5 rounded-2xl flex flex-col justify-between h-full group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
        <div className="mb-10">
            <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
                <Icon name="quote" className="w-6 h-6 text-black dark:text-white opacity-20" />
            </div>
            <p className="text-xl md:text-3xl font-light leading-[1.4] text-black/90 dark:text-white/90 tracking-tight">
                "{quote}"
            </p>
        </div>
        
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex items-center gap-5">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-display font-bold text-base border border-black/5 dark:border-white/5">
                {name.charAt(0)}
            </div>
            <div className="flex flex-col">
                <p className="font-display text-lg md:text-xl font-bold tracking-tight text-black dark:text-white">{name}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60 font-bold mt-1">{title}</p>
            </div>
        </div>
    </div>
);

const testimonialsData = [
    {
        quote: {
            en: 'John works fast and thinks clearly. He’s open to change, quick to test, and always focused on what actually helps the brand succeed.',
            vi: 'John làm việc nhanh và tư duy rõ ràng. Anh ấy cởi mở với thay đổi, thử nghiệm nhanh và luôn tập trung vào điều thực sự giúp thương hiệu thành công.',
        },
        name: 'Ms. Sassy Nguyen',
        title: 'Founder — S&S Sons',
    },
    {
        quote: {
            en: 'Working with John was a seamless experience. He understands brand integrity, respects long-term value, and builds systems that support both.',
            vi: 'Làm việc với John rất suôn sẻ. Anh ấy hiểu giá trị thương hiệu, tôn trọng giá trị dài hạn và xây dựng hệ thống hỗ trợ cả hai.',
        },
        name: 'Ms. Anita Kwok',
        title: 'Representative — O2H2O',
    },
    {
        quote: {
            en: 'The strategic insights and execution speed were game-changers. Our lead acquisition costs dropped by 40% within the first quarter.',
            vi: 'Góc nhìn chiến lược và tốc độ triển khai đã tạo ra khác biệt lớn. Chi phí có khách của chúng tôi giảm 40% ngay trong quý đầu tiên.',
        },
        name: 'Ms. Jade Pham',
        title: 'Regional Marketing Lead — GSK',
    },
];

const Testimonials: React.FC = () => {
    const { t, lang } = useLang();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkForScrollability = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            setCanScrollLeft(el.scrollLeft > 10);
            setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
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
            const scrollAmount = el.clientWidth * 0.85;
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="testimonial" className="py-24 md:py-40 px-6 md:px-12 border-b border-black/5 dark:border-white/5 overflow-hidden bg-white dark:bg-dark-900">
            <div className="max-w-[1920px] mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4 md:space-y-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold block">{t.testimonials.eyebrow}</span>
                        <h2 className="font-display text-4xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] text-black dark:text-white">
                            {t.testimonials.title1} <br /><span className="text-black/30 dark:text-white/30">{t.testimonials.title2}</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => scroll('left')} className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 transition-all ${canScrollLeft ? 'opacity-100 hover:bg-black hover:text-white' : 'opacity-20 pointer-events-none'}`}>
                            <Icon name="arrow-left" className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll('right')} className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 transition-all ${canScrollRight ? 'opacity-100 hover:bg-black hover:text-white' : 'opacity-20 pointer-events-none'}`}>
                            <Icon name="arrow-right" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 md:gap-8 pb-12 hide-scrollbar -mx-6 px-6 md:-mx-12 md:px-12 snap-x">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="flex-shrink-0 w-[90%] md:w-[60%] lg:w-[45%] xl:w-[35%] snap-start">
                            <TestimonialCard quote={testimonial.quote[lang]} name={testimonial.name} title={testimonial.title} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
