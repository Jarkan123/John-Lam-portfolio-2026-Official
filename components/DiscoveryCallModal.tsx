
import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface DiscoveryCallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({ isOpen, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsSuccess(false);
                setError('');
                const form = document.getElementById('discovery-call-form') as HTMLFormElement;
                form?.reset();
            }, 500);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
    
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
    
        try {
            const response = await fetch("https://formspree.io/f/mbdllvre", {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            if (response.ok) {
                setIsSuccess(true);
            } else {
                setError('There was an error. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className={`fixed inset-0 z-[90] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div 
                    className={`relative bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-black/10 dark:border-white/10 w-full max-w-lg transition-all duration-500 ease-custom ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    role="document"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors" aria-label="Close modal">
                        <Icon name="x" className="w-5 h-5" />
                    </button>

                    <div className={`p-8 md:p-12 transition-opacity duration-300 ${isSuccess ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}>
                        <h2 id="modal-title" className="font-display text-3xl uppercase tracking-tighter mb-2 text-black dark:text-white">Book a Discovery Call</h2>
                        <p className="text-sm text-black/60 dark:text-white/60 mb-8">Fill out the form below and I'll get back to you to schedule a call.</p>
                        
                        <form id="discovery-call-form" onSubmit={handleSubmit} className="space-y-8">
                            <input type="hidden" name="_subject" value="New Discovery Call Request!" />
                            
                            <div className="relative z-0 w-full group">
                                <input type="text" name="name" id="modal-name" className="block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light" placeholder=" " required />
                                <label htmlFor="modal-name" className="peer-focus:font-medium absolute text-base text-black/40 dark:text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                            </div>
                            <div className="relative z-0 w-full group">
                                <input type="email" name="email" id="modal-email" className="block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light" placeholder=" " required />
                                <label htmlFor="modal-email" className="peer-focus:font-medium absolute text-base text-black/40 dark:text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                            </div>
                            <div className="relative z-0 w-full group">
                                <input type="text" name="message" id="modal-message" className="block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light" placeholder=" " required />
                                <label htmlFor="modal-message" className="peer-focus:font-medium absolute text-base text-black/40 dark:text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Details</label>
                            </div>

                            {error && <p className="text-red-500 text-xs text-center !-mt-2">{error}</p>}

                            <button type="submit" disabled={isSubmitting} className="group w-full mt-4 inline-flex items-center justify-center gap-4 py-3 text-sm uppercase tracking-widest font-medium bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition-opacity disabled:opacity-50">
                                <span>{isSubmitting ? 'Submitting...' : 'Request a Call'}</span>
                            </button>
                        </form>
                    </div>

                    <div className={`absolute inset-0 flex-col justify-center items-center text-center p-8 z-10 transition-opacity duration-300 ${isSuccess ? 'flex opacity-100' : 'hidden opacity-0'}`}>
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                            <Icon name="check" className="w-8 h-8" />
                        </div>
                        <h3 className="font-display text-3xl uppercase tracking-tight mb-2 text-black dark:text-white">Request Sent</h3>
                        <p className="text-black/60 dark:text-white/60 text-sm max-w-xs mb-8">Thank you! I'll get back to you shortly to finalize a time.</p>
                        <button onClick={onClose} className="text-xs uppercase tracking-widest border-b border-current hover:opacity-50 transition-opacity pb-1 text-black dark:text-white">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoveryCallModal;