import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/App.css';

function Header(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-gray sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <b className="logo-text text-white">Anon Blogs</b>
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link id='tab1' className={`nav-link ${props.home ? 'active' : ''} text-white`} to={props.tab_links[0]}>{props.tabs[0]}</Link>
            </li>
            <li className="nav-item">
              <Link id='tab3' className={`nav-link ${props.hots ? 'active' : ''} text-white`} to={props.tab_links[2]}>{props.tabs[2]}</Link>
            </li>
            <li className="nav-item">
              <Link id='tab4' className={`nav-link ${props.contact ? 'active' : ''} text-white`} to={props.tab_links[3]}>{props.tabs[3]}</Link>
            </li>
          </ul>
          <div className="d-flex d-lg-inline-flex">
            {isAuthenticated ? (
              <>
                <div className="user-icon">
                  <i className="fa fa-user-circle fa-2xl text-white" aria-hidden="true"></i>
                </div>
                <button onClick={handleSignOut} className="signout-btn btn btn-outline-secondary submit-btn-signup text-white">Sign out</button>
              </>
            ) : (
              <>
                <Link to={props.btn_links[0]}>
                  <button className={`signup-btn btn ${props.btn_classes[0]}`}>Sign in</button>
                </Link>
                <Link to={props.btn_links[1]}>
                  <button className={`signup-btn btn ${props.btn_classes[1]}`}>Sign up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  tabs: ['Home', 'NEWS', 'Add Post', 'Modify Post'],
  tab_links: ['/', '/all-news', '/add-post', '/edit-post'],
  btn: ['Sign in', 'Sign up'],
  btn_links: ['/sign-in', '/sign-up'],
  btn_classes: ['btn-outline-primary', 'btn-outline-success']
};

export default Header;

















// import React from 'react'
// import '../css/App.css'
// import { Link } from 'react-router-dom'


// function Header(props) {

//   return (
//     <header>
//     <div className="logo" id='nav-logo'>
//       <b className='logo-text'>HotBlogs</b>
//     </div>
//     <nav>
//       <ul>
//       <Link id='tab1' className={props.home===true?"Tabs active":"Tabs"} to={props.tab_links[0]}>{props.tabs[0]}</Link>
//         {/* <Link id='tab2' className={props.news===true?"Tabs active":"Tabs"} to={props.tab_links[1]} >{props.tabs[1]}</Link> */}
//         <Link id='tab3' className={props.hots===true?"Tabs active":"Tabs"} to={props.tab_links[2]} >{props.tabs[2]}</Link>
//         <Link id='tab4' className={props.contact===true?"Tabs active":"Tabs"} to={props.tab_links[3]} >{props.tabs[3]}</Link>
//       </ul>
//     </nav>
//     <div className='nav-sidebar d-flex' role='search'>
//       <form className="search-bar" id='search-bar-container'>
//         <i className="fa fa-search search-icon" aria-hidden="true"></i>
//         <input type="search" className='search-bar form-control me-2' id='search-bar-nav' placeholder="Search" aria-label="Search" />
//       </form>


//     <div className="register-buttons" id='nav-login-btn' >
//       <Link to={props.btn_links[0]}>
//       {props.btn[0]===null?" ":<button className={props.btn_classes[0]} id='sign-in-nav'>{props.btn[0]}</button>}
//       </Link>
//       <Link to={props.btn_links[1]}>
//       {props.btn[1]===null?" ":<button className={props.btn_classes[1]} id='sign-up-nav'>{props.btn[1]}</button>}
//       </Link>

//     </div>
//     </div>
//     </header>
//   )
// }

// Header.defaultProps = {
//   tabs: ['Home','NEWS', 'Add Post', 'Modify Post'],
//   tab_links: ['/', '/all-news', '/add-post', '/edit-post'],
//   btn: ['Sign in', 'Sign up'],
//   btn_links: ['/sign-in', '/sign-up'],
//   btn_classes: ['signin-btn', 'signup-btn']
// }

// export default Header;
