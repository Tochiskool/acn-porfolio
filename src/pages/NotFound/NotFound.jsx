import React from 'react';
import { Link } from 'react-router-dom';
import "./notfound.css"

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.🪝</p>
      <Link className="btn-notFound" to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;