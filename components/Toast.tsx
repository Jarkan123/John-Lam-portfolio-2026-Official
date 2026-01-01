
import React from 'react';

interface ToastProps {
    message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
    const isVisible = message !== '';

    return (
        <div 
            id="toast" 
            className={`fixed top-24 right-6 z-[100] transition-transform duration-500 ease-custom bg-black dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-white dark:text-white px-5 py-3 rounded-md shadow-2xl flex items-center gap-3 ${
                isVisible ? 'translate-x-0' : 'translate-x-[150%]'
            }`}
        >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium uppercase tracking-wide" id="toast-message">
                {message || 'Loading...'}
            </span>
        </div>
    );
};

export default Toast;
