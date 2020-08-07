import React from "react";
import { Link } from "react-router-dom";
import Logo from '../logo.jpg';

const Header = () => (

    <>

<div className ="mainNav33">
<nav className="navbar is-white" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="">
    <Link to="/">
      <img src={Logo}/>
      {/* width="112" height="800" */}
      </Link>
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  {/* <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a className="navbar-item"><Link to="/">Home</Link></a>
      <a className="navbar-item"><Link to="/submission">Record your day</Link></a>
      <a className="navbar-item"><Link to="/calendar">Review Results</Link></a>
      <a className="navbar-item"><Link to="/stats">View graphs</Link></a>
      </div>
    </div> */}

    <div className="navbar-center">
      <div className="navbar-item">
        <div className="buttons">
          {/* <a className="button is-primary"> <strong>Sign up</strong></a> */}
          <a className="button is-primary"><strong><Link className="btn" to="/submission">Record your day</Link></strong></a>
          <a className="button is-primary"><strong><Link className="btn" to="/calendar">Review Results</Link></strong></a>
          <a className="button is-primary"><strong><Link className="btn" to="/stats">View graphs</Link></strong></a>
        </div>
      </div>
    </div>
</nav>





{/* <div className="header">
    <ul className="menu">
      <li class="navtext">
            <p>Wellness, It's an inside job.</p>
        </li>
      <li class="navtext">
        <Link to="/">Wellness, It's an inside job.</Link>
      </li>
      <li class="navtext">
        <Link to="/submission">Record your day</Link>
      </li>
      <li class="navtext">
        <Link to="/calendar">Review Results</Link>
      </li>
      <li>
        <Link to="/stats">View graphs</Link>
      </li>
    </ul>
  </div> */}
  </div>
  </>
);

export default Header;
