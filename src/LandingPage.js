import React from 'react';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h1>Hola, Get Registered!</h1>
            <div className="button-group">
                <a href="/signup" className="landing-button">Sign Up</a>
                <a href="/signin" className="landing-button">Sign In</a>
            </div>
        </div>
    );
};

export default LandingPage;
