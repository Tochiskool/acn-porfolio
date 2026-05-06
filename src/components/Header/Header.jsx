import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo" onClick={closeMenu}>
        ACN
      </NavLink>

      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        type="button"
      >
        {isOpen ? '×' : '☰'}
      </button>

      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="about" onClick={closeMenu}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="projects" onClick={closeMenu}>
            Projects
          </NavLink>
        </li>

        <li>
          <NavLink to="skills" onClick={closeMenu}>
            Skills
          </NavLink>
        </li>

        <li>
          <NavLink to="contact" onClick={closeMenu} className="contactLink">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
