import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        const savedUser = JSON.parse(localStorage.getItem('user'));
        
        if (savedUser && savedUser.username === username && savedUser.password === password) {
            login(savedUser); 
            alert('Login successful!');
            window.location.href = '/main'; 
        } else {
            setError('Invalid credentials. Please try again.');
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
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default SignInPage;
