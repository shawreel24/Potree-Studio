import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { user, signIn, signUp, signOut } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="container flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - var(--nav-height))', paddingTop: 'var(--nav-height)' }}>
        <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Welcome!</h2>
          <p style={{ color: '#555', marginBottom: '2rem' }}>You are currently logged in as <strong>{user.email}</strong></p>
          <button onClick={async () => await signOut()} className="btn w-full" style={{ padding: '0.75rem', border: '1px solid #111', backgroundColor: 'transparent', color: '#111', fontWeight: '500', borderRadius: '4px' }}>Log Out</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      if (isLogin) {
        const { error } = await signIn({ email, password });
        if (error) throw error;
        navigate('/');
      } else {
        const { data, error } = await signUp({ email, password });
        if (error) throw error;
        
        // If session is null, it means email confirmation is required
        if (!data.session) {
          setSuccessMsg('Signup successful! Please check your email to confirm your account before logging in.');
          setIsLogin(true); // Switch to login view
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: 'calc(100vh - var(--nav-height))', paddingTop: 'var(--nav-height)' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        {successMsg && <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>{successMsg}</div>}
        {error && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '2px', outline: 'none' }}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '2px', outline: 'none' }}
              placeholder="Enter your password"
            />
          </div>
          {!isLogin && (
            <div className="flex flex-col gap-xs">
              <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '2px', outline: 'none' }}
                placeholder="Confirm your password"
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ fontWeight: '500', textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
