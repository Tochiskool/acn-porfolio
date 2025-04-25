import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App/App.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Project from "./pages/Projects/Project.jsx";
import Skills from "./pages/Skills/Skills.jsx";
import Services from "./pages/Services/Services.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contacts />} />
      <Route path='/projects' element={<Project />} />
      <Route path='/skills' element={<Skills />} />
      <Route path='/services' element={<Services />} />
    </Routes>
  </BrowserRouter>
);
