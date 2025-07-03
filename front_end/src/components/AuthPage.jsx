import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Auth.css'; 

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate(); 

  // Form 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const url = isRegister
    ? 'http://localhost:5000/api/register'
    : 'http://localhost:5000/api/login';
  
      const payload = isRegister
      ? { name, email, password, confirmpassword: confirmPassword }
      : { email, password };
    
    try {
      const response = await axios.post(url, payload);
      console.log(response.data);
      alert(`${isRegister ? 'Registration' : 'Login'} successful!`);
    
      if (!isRegister) {
        const user = response.data.user;
    
        if (user && user._id) {
          localStorage.setItem('userId', user._id);
          localStorage.setItem('userName', user.name || user.email);
          console.log(" userId saved:", user._id);
          navigate('/dashboard');
        } else {
          console.error("Login response is missing user ID");
          alert("Login failed: No user ID returned from server.");
        }
      }
    
    } catch (error) {
      console.error(" Auth error:", error);
      alert(`${isRegister ? 'Registration' : 'Login'} failed!`);
    }
  };    
  return (
    <div className="auth-container">
      <div className="form-box">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>

        <p>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="toggle-btn" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
