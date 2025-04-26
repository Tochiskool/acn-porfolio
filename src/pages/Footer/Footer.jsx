import React from "react";
import { FaLinkedin, FaPhoneAlt, FaSkype } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <a
          href='https://www.linkedin.com/in/christian-n-awemu-6553491b9/'
          target='_blank'
          rel='noopener noreferrer'
          className='footer-link'
        >
          <FaLinkedin className='footer-icon' />
          LinkedIn
        </a>
        <a href='tel:+393299856890' className='footer-link'>
          <FaPhoneAlt className='footer-icon' />
          +393299856890
        </a>
        <a
          href='https://join.skype.com/invite/i2d5kO6hi9eR'
          className='footer-link'
          rel='noopener noreferrer'
          target='_blank'
        >
          <FaSkype className='footer-icon' />A Christian N
        </a>
      </div>
      <p className='footer-copy'>
        &copy; {new Date().getFullYear()} Christian Ndifor
      </p>
    </footer>
  );
};

export default Footer;
