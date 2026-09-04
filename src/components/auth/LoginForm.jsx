import React, { useState } from 'react';
import './LoginForm.css';

export const LoginForm = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrMobile || !password) {
      setErrorMsg('Please enter your email or mobile number and password.');
      return;
    }

    setIsLoading(true);

    // Simulate luxury auth feedback
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({ emailOrMobile, keepSignedIn });
      } else {
        alert(`Welcome back to LOOMSHINE! Signed in as ${emailOrMobile}`);
      }
    }, 800);
  };

  return (
    <div className="loom-auth-form-wrap">
      <div className="loom-auth-form-header">
        <p className="loom-auth-eyebrow">MEMBER ACCESS</p>
        <h2 className="loom-auth-heading">WELCOME BACK.</h2>
        <p className="loom-auth-subheading">
          Enter your details to continue where you left off.
        </p>
      </div>

      {errorMsg && (
        <div className="loom-auth-alert loom-auth-alert--error" role="alert">
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="loom-auth-form" onSubmit={handleSubmit} noValidate>
        {/* Email or Mobile Input */}
        <div className="loom-form-group">
          <label htmlFor="login-identifier" className="loom-form-label">
            EMAIL OR MOBILE
          </label>
          <div className="loom-input-wrapper">
            <input
              id="login-identifier"
              type="text"
              className="loom-form-input"
              placeholder="you@example.com"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="loom-form-group">
          <div className="loom-form-label-row">
            <label htmlFor="login-password" className="loom-form-label">
              PASSWORD
            </label>
            <button
              type="button"
              className="loom-auth-forgot-link"
              onClick={() => alert('Password reset instructions sent to your email.')}
            >
              FORGOT?
            </button>
          </div>
          <div className="loom-input-wrapper loom-input-wrapper--password">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              className="loom-form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="loom-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                /* Eye Off Icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Eye Icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Checkbox */}
        <div className="loom-form-group loom-form-group--checkbox">
          <label className="loom-checkbox-container" htmlFor="keep-signed-in">
            <input
              type="checkbox"
              id="keep-signed-in"
              className="loom-checkbox-input"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <span className="loom-checkbox-custom" />
            <span className="loom-checkbox-text">Keep me signed in on this device</span>
          </label>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          className={`loom-auth-submit-btn ${isLoading ? 'loom-auth-submit-btn--loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>SIGNING IN...</span>
          ) : (
            <>
              <span>SIGN IN</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loom-auth-arrow-icon">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="loom-auth-divider">
        <span className="loom-auth-divider__line" />
        <span className="loom-auth-divider__text">OR</span>
        <span className="loom-auth-divider__line" />
      </div>

      {/* Social Google Login */}
      <button
        type="button"
        className="loom-auth-google-btn"
        onClick={() => alert('Redirecting to Google Authentication...')}
      >
        <svg className="loom-google-icon" width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>CONTINUE WITH GOOGLE</span>
      </button>

      {/* Switcher */}
      <div className="loom-auth-switch-prompt">
        <span>New to LOOMSHINE? </span>
        <button
          type="button"
          className="loom-auth-switch-link"
          onClick={onSwitchToSignup}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
