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
          <li><a href="/ViewSpecificReport">View</a></li>
          <li><a href="/UpdateReport">Update</a></li>

      <div className="dropdown">
       <button className="dropdown-button" onClick={toggleDropdown}>
          Accounts
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <a href="/Signup">Signup</a>
            <a href="/Signin">Login</a>
          </div>
        )}
      </div>
      </ul>
      </nav>
    </header>
  );
};
