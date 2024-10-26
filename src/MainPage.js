import React from 'react';
import { useAuth } from './AuthContext';
const MainPage = () => {
    const { user, logout } = useAuth(); 

    const handleLogout = () => {
        logout();
        window.location.href = '/signin';
    };

    return (
        <div className="main-container">
            <h2>Welcome, {user?.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default MainPage;
