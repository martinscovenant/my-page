
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
// import { Link } from 'react-router-dom'
import { NavLink , useLocation} from 'react-router-dom';
import './Header.css';


export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return <>
  <header className='header'>
    <div className="row ">
      <div className="row2">
      <button className="btn" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon">{showMenu ? <AiOutlineClose /> : <AiOutlineMenu /> }
          </span>
        </button>
             
      <div className="col-md-10 row col-lg-10">
        <div className="search-container">

          <input type="text" 
          className="form-control" 
          placeholder="Search ..." 
          aria-label="Search ..." 
          aria-describedby="basic-addon2" 
          />

          <button 
          className="input" 
          id="basic-addon2">search
          </button>
        </div>

        <div className="nav-list">
        <div className='nav-item'>
          <div className='nav-links'><NavLink to="/" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>Home</NavLink></div>
          <div className='nav-links'><NavLink to="/shop" className={location.pathname === '/shop' ? 'active' : 'not-active'} onClick={toggleMenu}>Report</NavLink></div>
          <div className='nav-links'><NavLink to="/blog" className={location.pathname === '/blog' ? 'active' : 'not-active'} onClick={toggleMenu}>View</NavLink></div>
          <div className='nav-links'><NavLink to="/about" className={location.pathname === '/about' ? 'active' : 'not-active'} onClick={toggleMenu}>About</NavLink></div>
          <div className='nav-links'><NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : 'not-active'} onClick={toggleMenu}>Contact</NavLink></div>
        </div>
        </div>
        
      </div>
      {showMenu && (
        <div className="col-md-10 d-md-none mt-3">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Find products ..." aria-label="Find products ..." aria-describedby="basic-addon2" />
            <button className="input-group-text" id="basic-addon2">search</button>
          </div>
          <div className='menu-links mt-2'>
            <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>HOME</NavLink></div>
            <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>Report</NavLink></div>
            <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>View</NavLink></div>
            <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>ABOUT</NavLink></div>
            <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>CONTACT</NavLink></div>
          </div>
      </div>
      )}
    </div>
  </div>
</header>
  </>;
};
