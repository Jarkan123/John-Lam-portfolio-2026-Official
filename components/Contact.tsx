
import React, { useState } from 'react';
import Icon from './Icon';

interface ContactProps {
    onOpenDiscoveryModal: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenDiscoveryModal }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

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
                setError('There was an error submitting your message. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setError('');
        const form = document.getElementById('contact-form') as HTMLFormElement;
        form?.reset();
    };

    return (
        <section id="contact-us" className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/5 bg-light-100 dark:bg-dark-800">
                <div className="sticky top-32">
                    <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold block mb-8">Start a project</span>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] mb-8 text-black dark:text-white">
                        Let's build<br />the future.
                    </h2>
                    <p className="text-base text-black/60 dark:text-white/60 font-light max-w-md mb-12">
                        I'm currently available for freelance projects and collaborations. Tell me about your vision.
                    </p>
                    
                    <div className="flex flex-col gap-6">
                        <a href="mailto:minhlam14052001@gmail.com" className="text-lg hover:opacity-70 transition-opacity flex items-center gap-3 w-fit text-black dark:text-white">
                            <Icon name="mail" className="w-4 h-4" />
                            <span className="underline decoration-1 underline-offset-4 decoration-black/30 dark:decoration-white/30 font-medium">minhlam14052001@gmail.com</span>
                        </a>
                        <button onClick={onOpenDiscoveryModal} className="text-lg hover:opacity-70 transition-opacity flex items-center gap-3 w-fit text-black dark:text-white">
                            <Icon name="calendar" className="w-4 h-4" />
                            <span className="underline decoration-1 underline-offset-4 decoration-black/30 dark:decoration-white/30 font-medium">Book a discovery call</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 lg:p-24 flex items-center relative">
                <div id="form-container" className={`w-full max-w-lg mx-auto transition-opacity duration-300 ${isSuccess ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}>
                    <form id="contact-form" onSubmit={handleSubmit} className="space-y-12">
                        <div className="relative z-0 w-full group">
                            <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light" placeholder=" " required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-lg text-black/60 dark:text-white/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light" placeholder=" " required />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-lg text-black/60 dark:text-white/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="text" name="message" id="message" className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light" placeholder=" " required />
                            <label htmlFor="message" className="peer-focus:font-medium absolute text-lg text-black/60 dark:text-white/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Details</label>
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        
                        <button type="submit" id="submit-btn" disabled={isSubmitting} className="group mt-8 inline-flex items-center gap-4 py-3 pr-6 text-sm uppercase tracking-widest font-bold border-b border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-all text-black dark:text-white disabled:opacity-50 disabled:pointer-events-none">
                            <span id="btn-text">{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                            <Icon name="arrow-right" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <div id="success-message" className={`absolute inset-0 flex-col justify-center items-center text-center p-8 z-10 ${isSuccess ? 'flex' : 'hidden'}`}>
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                        <Icon name="check" className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-3xl uppercase tracking-tight mb-2 text-black dark:text-white">Received</h3>
                    <p className="text-black/60 dark:text-white/60 text-sm max-w-xs mb-8">I'll review your inquiry and get back to you within 24 hours.</p>
                    <button onClick={resetForm} className="text-xs uppercase tracking-widest border-b border-current hover:opacity-50 transition-opacity pb-1 text-black dark:text-white font-bold">Send another</button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
