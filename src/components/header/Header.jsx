// Dropdown.js
import React, { useState } from 'react';
import './Header.css'; 

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>

      <div className="dropdown">
       <button className="dropdown-button" onClick={toggleDropdown}>
          Accounts
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <a href="/SignUp">Signup</a>
            <a href="/Login">Login</a>
          </div>
        )}
      </div>
      </ul>
      </nav>
    </header>
  );
};
