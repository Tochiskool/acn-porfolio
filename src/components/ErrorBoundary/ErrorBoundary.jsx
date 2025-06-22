import React, { Component } from 'react';


class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
        console.log("Error occured", error)
      return { hasError: true };
    }
  
    handleReset = () => {
      this.setState({ hasError: false });
    };
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="error-fallback">
            <h1>Something went wrong.</h1>
            <button onClick={this.handleReset}>Try Again</button>
          </div>
        );
      }
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;