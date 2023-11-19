import React from "react"
import logo from './assets/dashtoon.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="https://dashtoon.com/" target="_blank" rel="noreferrer" className="company-logo">
        <img src={logo} alt="logo"/>
         <h1>DASHTOON</h1>
      </a>

      <div className="nav-links">
        <a href="https://shawsk04.github.io/" target="_blank" rel="noreferrer">About Developer</a>
        <a href="https://github.com/shawsk04/Dashtoon-Assignment-Submission-PE" target="_blank" rel="noreferrer">Github</a>
      </div>
    </nav>
  );
};

export default Navbar;
