import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppContent from "./pages/AppContent/AppContent";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <BrowserRouter>
    <ErrorBoundary>
       <AppContent />
    </ErrorBoundary>
     
    </BrowserRouter>
  );
};

export default App;
