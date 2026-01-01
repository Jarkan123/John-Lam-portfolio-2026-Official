
import { useState, useEffect } from 'react';

const DUMMY_USER = 'admin';
const DUMMY_PASS = 'password';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('isAuthenticated');
        if (loggedIn === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (user: string, pass: string): boolean => {
        if (user === DUMMY_USER && pass === DUMMY_PASS) {
            sessionStorage.setItem('isAuthenticated', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
};
