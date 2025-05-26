import { useState } from 'react';
import './Login.css';
import Navbar from '../../assets/Navbar/Navbar';

export default function TaskiLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('leslie@pixsellz.io');
  const [password, setPassword] = useState('');

  return (
    <>
      <Navbar />

      <div className="login-wrapper">
        <div className="login-container">
          <div className="logo-section">
            <div className="logo-icon">
              <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="logo-text">Taski</span>
          </div>

          <h1 className="login-title">Login</h1>

          <div className="login-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="leslie@pixsellz.io"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M9.878 9.878L14.12 14.12m-4.242-4.242L8.464 8.464M14.12 14.12l1.415 1.415m-1.415-1.415L8.464 8.464" />
                    </svg>
                  ) : (
                    <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              className="login-button"
              onClick={(e) => {
                e.preventDefault();
                console.log('Login attempt with:', { email, password });
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}