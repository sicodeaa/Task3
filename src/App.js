import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import MainPage from './MainPage';
import './styles.css'; 
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} /> 
                    <Route 
                        path="/main" 
                        element={
                            <ProtectedRoute>
                                <MainPage />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
