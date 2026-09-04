import React, { useState, useEffect } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export const AuthPage = ({ initialMode = 'login', onBackToHome }) => {
  const [mode, setMode] = useState(initialMode);
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);

  if (initialMode !== prevInitialMode) {
    setPrevInitialMode(initialMode);
    setMode(initialMode);
  }

  // Set document title according to SEO rules
  useEffect(() => {
    const pageTitle = mode === 'signup' 
      ? 'Create Account | LOOMSHINE Luxury Garment Care'
      : 'Member Login | LOOMSHINE Luxury Garment Care';
    document.title = pageTitle;
  }, [mode]);

  return (
    <AuthLayout onBackToHome={onBackToHome}>
      {mode === 'login' ? (
        <LoginForm
          onSwitchToSignup={() => setMode('signup')}
          onLoginSuccess={() => onBackToHome?.()}
        />
      ) : (
        <SignupForm
          onSwitchToLogin={() => setMode('login')}
          onSignupSuccess={() => setMode('login')}
        />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
