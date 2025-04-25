import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Project from "./pages/Projects/Project.jsx";
import Skills from "./pages/Skills/Skills.jsx";
import Services from "./pages/Services/Services.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";
import Layout from "./components/Layout/Layout.jsx";
const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
