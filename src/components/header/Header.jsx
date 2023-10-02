
// Header.js
import React, { useEffect, useState } from 'react';
import './Header.css';

export const Header = () => {
  const [headerData, setHeaderData] = useState('');

  useEffect(() => {
    fetch('https://example.com/api/header')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the API response contains the header data
        setHeaderData(data.header);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
      <header className="navbar sticky-top">
         <h1>{headerData}</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">View</a></li>
        <li><a href="/Update">Update</a></li>
        </ul>
    </nav>
        <div className="dropdown">
  <button className="dropbtn">Accounts</button>
  <div className="dropdown-content">
  <a href="SignUp">SignUp</a>
  <a href="Login">Login</a>
  </div>
</div>
  </header>
  );
};



