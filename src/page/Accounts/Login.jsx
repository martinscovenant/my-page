

import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; 

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://timesheet-api-main.onrender.com/user/login',
        formData,
        {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        console.log('Login successful');
        setMessage('Login successful');
        // You can save the access token and user ID in local storage or state for future use.
      } else {
        console.error('Login failed');
        setMessage('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <div className='done'>
        <h3>User Login</h3>
        {message && <p>{message}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br/>
        
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};


