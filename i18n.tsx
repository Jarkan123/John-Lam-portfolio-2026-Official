import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CONTENT, type Lang } from './content';

interface LangContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
    toggleLang: () => void;
    t: typeof CONTENT['vi'];
}

const LangContext = createContext<LangContextValue | null>(null);

const readStoredLang = (): Lang => {
    try {
        const stored = window.localStorage.getItem('lang');
        if (stored === 'vi' || stored === 'en') return stored;
    } catch {
        /* storage unavailable */
    }
    return 'vi';
};

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<Lang>(readStoredLang);

    useEffect(() => {
        document.documentElement.lang = lang;
        document.title = CONTENT[lang].meta.title;
        try {
            window.localStorage.setItem('lang', lang);
        } catch {
            /* storage unavailable */
        }
    }, [lang]);

    const setLang = useCallback((next: Lang) => setLangState(next), []);
    const toggleLang = useCallback(() => setLangState(prev => (prev === 'vi' ? 'en' : 'vi')), []);

    return (
        <LangContext.Provider value={{ lang, setLang, toggleLang, t: CONTENT[lang] }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = (): LangContextValue => {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useLang must be used inside LangProvider');
    return ctx;
};
