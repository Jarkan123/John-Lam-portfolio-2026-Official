
import React, { useState, useEffect, useCallback } from 'react';
import type { GalleryImage } from '../types';
import Icon from './Icon';

interface LightboxProps {
    images: GalleryImage[];
    startIndex: number;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : prev));
    }, [images.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrev();
    }, [onClose, goToNext, goToPrev]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const image = images[currentIndex];
    if (!image) return null;

    return (
        <div 
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in" 
            style={{ animationDuration: '0.3s' }}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
                {/* Main Content: Keyed to re-trigger animation on change */}
                <div key={currentIndex} className="relative w-full max-w-7xl animate-fade-in text-center" style={{ animationDuration: '0.3s' }}>
                    <img 
                        src={image.imageUrl} 
                        alt={image.description || 'Gallery image'} 
                        className="max-w-full max-h-[85vh] object-contain inline-block align-middle rounded-lg shadow-2xl"
                    />
                    {image.description && (
                        <p className="mt-4 text-white/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">{image.description}</p>
                    )}
                </div>

                {/* Controls */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-opacity w-10 h-10 flex items-center justify-center bg-black/20 rounded-full"
                    aria-label="Close lightbox"
                >
                    <Icon name="x" className="w-6 h-6" />
                </button>

                <button 
                    onClick={goToPrev} 
                    disabled={currentIndex === 0}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-opacity w-12 h-12 flex items-center justify-center bg-black/20 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous image"
                >
                    <Icon name="chevron-left" className="w-8 h-8" />
                </button>

                <button 
                    onClick={goToNext} 
                    disabled={currentIndex === images.length - 1}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-opacity w-12 h-12 flex items-center justify-center bg-black/20 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next image"
                >
                    <Icon name="chevron-right" className="w-8 h-8" />
                </button>
                
                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 text-white/80 text-xs px-3 py-1 rounded-full font-mono">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
};

export default Lightbox;
