import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound.jsx";
import Home from "../Home/Home.jsx";
import About from "../About/About.jsx";
import Project from "../Projects/Project.jsx";
import Skills from "../Skills/Skills.jsx";
import Contacts from "../Contacts/Contacts.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";
import "./AppContent.css";
import {FaMoon, FaSun} from "react-icons/fa"
import { useTheme } from "../../components/UseTheme/useTheme.jsx";


const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isDarkMode, toggleTheme } = useTheme();



  return (
    <div className='page-container'>
      <div className='content-wrap'>
      <button 
          onClick={toggleTheme} 
          className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contacts />} />
            <Route path='projects' element={<Project />} />
            <Route path='skills' element={<Skills />} />
            <Route path="*" element={<NotFound />} />  
          </Route>
        </Routes>
            

      </div>
   
      {!isHomePage && <Footer />}
    </div>
  );
};
export default AppContent;
