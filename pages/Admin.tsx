
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/admin/Login';
import Dashboard from '../components/admin/Dashboard';

const Admin: React.FC = () => {
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <div className="min-h-screen bg-light-100 dark:bg-dark-800 pt-20">
            {isAuthenticated ? <Dashboard onLogout={logout} /> : <Login onLogin={login} />}
        </div>
    );
};

export default Admin;
