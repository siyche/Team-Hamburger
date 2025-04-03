// LoginPage.jsx 

import React from 'react';
import { Link } from 'react-router-dom';
import UsernamePasswordForm from './UsernamePasswordForm';

export default function LoginPage() {
  const handleSubmit = (event) => {
    e.preventDefault();

    // handle form submission logic here
    // logging form submission to console for now
    console.log('Login Form submitted');
  };

  return (
    <div>
      <h1>Login</h1>
      <UsernamePasswordForm onSubmit={handleSubmit} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}