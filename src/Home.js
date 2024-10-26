import React from 'react';
import { useAuth } from './useAuth';
import ProtectedRoute from './ProtectedRoute';

const Home = () => {
    const { email, logout } = useAuth();

    return (
        <ProtectedRoute>
            <div style={{ padding: '20px' }}>
                <h1>Welcome to Your Home Page</h1>
                <p>Email: {email || 'Unknown User'}</p>
                <button onClick={logout}>Log Out</button>
            </div>
        </ProtectedRoute>
    );
};

export default Home;
