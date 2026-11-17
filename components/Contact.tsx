import React, { useState } from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';

interface ContactProps {
    onOpenDiscoveryModal: () => void;
}

export const FORM_ENDPOINT = 'https://formspree.io/f/mbdllvre';

const Field: React.FC<{ name: string; id: string; label: string; type?: string; required?: boolean }> = ({ name, id, label, type = 'text', required = true }) => (
    <div className="relative z-0 w-full group">
        <input type={type} name={name} id={id} className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b border-black/20 dark:border-white/20 appearance-none text-black dark:text-white focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer font-light" placeholder=" " required={required} />
        <label htmlFor={id} className="peer-focus:font-medium absolute text-lg text-black/60 dark:text-white/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{label}</label>
    </div>
);

const Contact: React.FC<ContactProps> = ({ onOpenDiscoveryModal }) => {
    const { t } = useLang();
    const c = t.contact;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

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
        <section id="contact-us" className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/5 bg-light-100 dark:bg-dark-800">
                <div className="sticky top-32">
                    <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold block mb-8">{c.eyebrow}</span>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] mb-8 text-black dark:text-white">
                        {c.title1}<br />{c.title2}
                    </h2>
                    <p className="text-base text-black/60 dark:text-white/60 font-light max-w-md mb-12">{c.intro}</p>
                    <div className="flex flex-col gap-6">
                        <button onClick={onOpenDiscoveryModal} className="text-lg hover:opacity-70 transition-opacity flex items-center gap-3 w-fit text-black dark:text-white">
                            <Icon name="calendar" className="w-4 h-4" />
                            <span className="underline decoration-1 underline-offset-4 decoration-black/30 dark:decoration-white/30 font-medium">{c.bookCall}</span>
                        </button>
                        <a href="mailto:minhlam14052001@gmail.com" className="text-lg hover:opacity-70 transition-opacity flex items-center gap-3 w-fit text-black dark:text-white">
                            <Icon name="mail" className="w-4 h-4" />
                            <span className="underline decoration-1 underline-offset-4 decoration-black/30 dark:decoration-white/30 font-medium">minhlam14052001@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 lg:p-24 flex items-center relative min-h-[560px]">
                {!isSuccess ? (
                    <div className="w-full max-w-lg mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <input type="hidden" name="_subject" value="New inquiry from website" />
                            <Field name="name" id="name" label={c.name} />
                            <Field name="phone" id="phone" label={c.phone} type="tel" />
                            <Field name="email" id="email" label={c.email} type="email" required={false} />
                            <Field name="message" id="message" label={c.details} />
                            {error && <p className="text-sm text-center text-black dark:text-white underline decoration-dotted">{error}</p>}
                            <button type="submit" disabled={isSubmitting} className="group mt-8 inline-flex items-center gap-4 py-3 pr-6 text-sm uppercase tracking-widest font-bold border-b border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-all text-black dark:text-white disabled:opacity-50 disabled:pointer-events-none">
                                <span>{isSubmitting ? c.sending : c.submit}</span>
                                <Icon name="arrow-right" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="w-full flex flex-col justify-center items-center text-center p-8">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-black/20 dark:border-white/20 text-black dark:text-white">
                            <Icon name="check" className="w-8 h-8" />
                        </div>
                        <h3 className="font-display text-3xl uppercase tracking-tight mb-2 text-black dark:text-white">{c.received}</h3>
                        <p className="text-black/60 dark:text-white/60 text-sm max-w-xs mb-8">{c.receivedDesc}</p>
                        <button onClick={() => setIsSuccess(false)} className="text-xs uppercase tracking-widest border-b border-current hover:opacity-50 transition-opacity pb-1 text-black dark:text-white font-bold">{c.sendAnother}</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
