import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link,NavLink} from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="inner">
      <nav className="navbar nav-masthead navbar-dark bg-dark ">
        <h3 className="nav-link active">
          <NavLink to="/">Home</NavLink>
        </h3>

      <h3 className="nav-link active">
          <NavLink to="/robots">Robots</NavLink>
          <span> </span>
          <NavLink to="/projects">Projects</NavLink>
      </h3>
      </nav>
    </div>
  );
};

export default Navbar;
