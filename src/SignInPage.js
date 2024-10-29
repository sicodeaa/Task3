import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from './AuthContext';
import axios from 'axios';

const SignInPage = () => {
    const [success, setSuccess] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://auth-backend-138t.onrender.com/api/v1/users/login', {
                username,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setSuccess('Login successful!');
                login(response.data.user); 
                setTimeout(() => {
                    navigate('/main');
                }, 2000);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Incorrect email or password.');
            } else {
                setError('Login failed. Please try again.');
            }
            console.error('Server error:', err.response?.data || err.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign In</button>
                {success && <div className="success">{success}</div>}
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default SignInPage;