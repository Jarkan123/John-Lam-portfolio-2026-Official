
import React, { useState, useRef, useEffect, useMemo } from 'react';

interface LazySectionProps {
    children: React.ReactNode;
    minHeight?: string;
    rootMargin?: string;
}

const LazySection: React.FC<LazySectionProps> = ({ children, minHeight = '50vh', rootMargin = '0px 0px 200px 0px' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const observerOptions = useMemo(() => ({
        rootMargin,
    }), [rootMargin]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            observerOptions
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [observerOptions]);

    return (
        <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }} className={`transition-opacity duration-700 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {isVisible ? children : null}
        </div>
    );
};

export default LazySection;
