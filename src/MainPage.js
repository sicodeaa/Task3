import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <div className="main-container">
            <h2>Welcome, {user ? user.username : 'Guest'}!</h2>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default MainPage;
