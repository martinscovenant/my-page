
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
  < header className='navbar-middle p-2 p-md-2 p-lg-2'>
    {/* <div className='container-xxl'> */}
    <div className="row align-items-center m-0">
      <div className="col-md-2 d-flex justify-content-center">
      {/* <div className="col-md-8 me-auto"> */}
      <button className="navbar-toggler d-md-none " type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon">{ showMenu ? <AiOutlineClose /> : <AiOutlineMenu /> }
          </span>
        </button>

        {/* <Link to='/'>
          <img src={logo} alt="logo" className='img-fluid logo' />
        </Link> */}
             
      <div className="col-md-10 row col-lg-10">
      <div className="col-md-3 m-auto">
        <div className='input-group d-none d-md-flex'>
        {/* <div className="search-container"> */}

          {/* <input type="text" 
          className="form-control"
          placeholder="Search ..." 
          aria-label="Search ..." 
          aria-describedby="basic-addon2" 
          />

          <button 
          className="input-group-text" 
          id="basic-addon2">search
          </button>
        </div> */}
        </div>

        <div className="col-md-6 m-auto">
        <div className='menu-links mt-2 d-none d-md-flex d-lg-flex'>
          <div className='ms-auto gap-3'><NavLink to="/" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>Home</NavLink></div>
          <div className='ms-auto gap-3'><NavLink to="/shop" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>Report</NavLink></div>
          <div className='ms-auto gap-3'><NavLink to="/blog" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>View</NavLink></div>
          <div className='ms-auto gap-3'><NavLink to="/about" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>About</NavLink></div>
          <div className='ms-auto gap-3'><NavLink to="/SignUp" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>Account</NavLink></div>
        </div>
        </div>
      </div>
      {showMenu && (
        <div className="col-md-10 d-md-none mt-3">
           {/* <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Find products ..." aria-label="Find products ..." aria-describedby="basic-addon2" />
            <button className="input-group-text" id="basic-addon2">search</button>
          </div>  */}
          <div className='menu-links mt-2'>
            <div className='mb-2'><NavLink className={ location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>HOME</NavLink></div>
            <div className='mb-2'><NavLink className={ location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>Report</NavLink></div>
            <div className='mb-2'><NavLink className={ location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>View</NavLink></div>
            <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>ABOUT</NavLink></div>
            <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>Account</NavLink></div>
          </div>
          {/* <div className='mb-2'>
          <Link to="/login" className={location.pathname === '/login' ? 'active' : 'not-active'} onClick={toggleMenu}>
            <img src={user} alt="user" className='d-none' />
            <span>Account</span>
          </Link>
        </div> */}
      </div>
      )}
    </div>
  </div>
  </div>
  {/* </div> */}
</header>
  </>;
};
