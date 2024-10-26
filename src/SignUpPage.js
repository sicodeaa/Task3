import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9]{4,12}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailRegex.test(email)) {
            setError('Invalid email format.');
            return;
        }
        if (!usernameRegex.test(username)) {
            setError('Username must be 4-12 characters and alphanumeric.');
            return;
        }
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('https://auth-backend-138t.onrender.com/api/v1/users/register',  
                JSON.stringify({
                username: username,
                fullName: name,
                email: email,
                password: password,
                phone: phone,
                dob:dob
            }));
            const body = await response.data();
            console.log(body);
            if (response.status === 201) {
                setSuccess('Signup successful! Redirecting to sign-in...');
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 2000);
            }
        } catch (err) {
            if (err.response?.status === 409) {
                setError('An account with this email or username already exists.');
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Server error:', err.response?.data || err.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    required
                />
                <button type="submit">Sign Up</button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
            </form>
        </div>
    );
};

export default SignUpPage;
