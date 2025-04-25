import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home.jsx";
import About from "../About/About.jsx";
import Project from "../Projects/Project.jsx";
import Skills from "../Skills/Skills.jsx";
import Services from "../Services/Services.jsx";
import Contacts from "../Contacts/Contacts.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contacts />} />
            <Route path='projects' element={<Project />} />
            <Route path='skills' element={<Skills />} />
            <Route path='services' element={<Services />} />
          </Route>
        </Routes>
      </div>
      {!isHomePage && <Footer />}
    </div>
  );
};
export default AppContent;
