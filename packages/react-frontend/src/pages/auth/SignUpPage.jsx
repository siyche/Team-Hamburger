import React from 'react';
import UsernamePasswordForm from './UsernamePasswordForm';

export default function RegisterPage() {
    const handleSubmit = (event) => {
        event.preventDefault();

        // Handle form submission logic here
        // logging form submission to console for now
        console.log('Form submitted');
    };

    return (
        <div>
            <h1>Register</h1>
            {/* Using the UsernamePasswordForm component */}
            <UsernamePasswordForm onSubmit={handleSubmit} />
        </div>
    );
}