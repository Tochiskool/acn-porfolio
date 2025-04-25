import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <>
      <nav className='navbar'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? "nav-links active" : "nav-links logo"
          }
        >
          ACN
        </NavLink>
        <div className='hamburger' onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={`nav-links ${isOpen ? "show" : ""}`}>
          <li className='close-btn' onClick={closeMenu}>
            &times;
          </li>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='about'
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to='projects'
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to='skills'
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink
              to='services'
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to='contact'
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
