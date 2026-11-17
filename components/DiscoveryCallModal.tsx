import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';
import { FORM_ENDPOINT } from './Contact';

interface DiscoveryCallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const inputClass = 'block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light';
const labelClass = 'peer-focus:font-medium absolute text-base text-black/40 dark:text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';

const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLang();
    const m = t.modal;
    const c = t.contact;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => { setIsSuccess(false); setError(''); }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const form = e.currentTarget;
        try {
            const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
            if (response.ok) {
                setIsSuccess(true);
                form.reset();
            } else {
                setError(c.error);
            }
        } catch {
            setError(c.networkError);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-[120] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
            <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
                <div className={`pointer-events-auto relative bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-black/10 dark:border-white/10 w-full max-w-lg transition-all duration-500 ease-custom ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} role="document">
                    <button onClick={onClose} className="absolute top-4 right-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors" aria-label={m.close}>
                        <Icon name="x" className="w-5 h-5" />
                    </button>

                    {!isSuccess ? (
                        <div className="p-8 md:p-12">
                            <h2 id="modal-title" className="font-display text-3xl uppercase tracking-tighter mb-2 text-black dark:text-white">{m.title}</h2>
                            <p className="text-sm text-black/60 dark:text-white/60 mb-8">{m.desc}</p>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <input type="hidden" name="_subject" value="New discovery call request" />
                                <div className="relative z-0 w-full group">
                                    <input type="text" name="name" id="modal-name" className={inputClass} placeholder=" " required />
                                    <label htmlFor="modal-name" className={labelClass}>{c.name}</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input type="tel" name="phone" id="modal-phone" className={inputClass} placeholder=" " required />
                                    <label htmlFor="modal-phone" className={labelClass}>{c.phone}</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input type="text" name="message" id="modal-message" className={inputClass} placeholder=" " required />
                                    <label htmlFor="modal-message" className={labelClass}>{c.details}</label>
                                </div>
                                {error && <p className="text-xs text-center text-black dark:text-white underline decoration-dotted">{error}</p>}
                                <button type="submit" disabled={isSubmitting} className="w-full mt-4 inline-flex items-center justify-center gap-4 py-3 text-sm uppercase tracking-widest font-medium bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition-opacity disabled:opacity-50">
                                    {isSubmitting ? m.sending : m.submit}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center min-h-[380px]">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-black/20 dark:border-white/20 text-black dark:text-white">
                                <Icon name="check" className="w-8 h-8" />
                            </div>
                            <h3 className="font-display text-3xl uppercase tracking-tight mb-2 text-black dark:text-white">{m.sent}</h3>
                            <p className="text-black/60 dark:text-white/60 text-sm max-w-xs mb-8">{m.sentDesc}</p>
                            <button onClick={onClose} className="text-xs uppercase tracking-widest border-b border-current hover:opacity-50 transition-opacity pb-1 text-black dark:text-white">{m.close}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiscoveryCallModal;
