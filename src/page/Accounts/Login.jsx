// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://timesheet-api-main.onrender.com/user/login',
        {
          email,
          password,
        },
        {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        // Login was successful, you can handle it here
        console.log('Login successful');
        // You may want to store the access token in your application state or a cookie for future requests.
      } else {
        // Login failed, handle the error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='App'>
            <div className="done">
              <h3>
                User Login
              </h3>
      {/* <h1>User Login</h1> */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

