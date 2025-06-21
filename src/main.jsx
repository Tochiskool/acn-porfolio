import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "normalize.css";
import "./index.css";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider.jsx";
// ..
AOS.init();

createRoot(document.getElementById("root")).render(
    <StrictMode>
  
        <ThemeProvider> 
          <App />
        </ThemeProvider>
   
    </StrictMode>
  );