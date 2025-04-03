import React from 'react';

export default function UsernamePasswordForm({ onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' required />
            </div>
            <div>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' required />
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
}