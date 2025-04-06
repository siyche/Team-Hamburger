// SignUpPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const navigate = useNavigate(); // allows navigation to other routes

    //TODO: Handle form submission here (this will be replaced with authentication/account creation logic)
    const handleSubmit = (event) => {   
        event.preventDefault();  
        console.log('Sign up form submitted');  
        navigate('/login'); 
    }   

    return (
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-mono'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            alt='hamburger'
            src='../../../public/hamburger.png'
            className='mx-auto h-10 w-auto'
          />
          <h2 className='mt-10 text-center text-2xl font-mono tracking-tight text-gray-900'>
            Create your account
          </h2>
        </div>    
        
        {/* Div container for Form -> Name, Username, Email, Password */}
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name' className='block text-sm text-gray-700'>
                Name
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  autoComplete='name'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>  
            <div>
              <label htmlFor='username' className='block text-sm text-gray-700'>
                Username
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  required
                  autoComplete='username'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>  
            <div>
              <label htmlFor='email' className='block text-sm text-gray-700'>
                Email
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>  
            <div>
              <label htmlFor='password' className='block text-sm text-gray-700'>
                Password
              </label>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  autoComplete='new-password'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>  
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              >
                Sign up
              </button>
            </div>
          </form>   

        {/* Div container in case user doesn't have an account, it will navigate the user towards signing up.*/}
          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <Link to='/login' className='font-semibold leading-6 text-blue-600 hover:text-blue-500'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
}