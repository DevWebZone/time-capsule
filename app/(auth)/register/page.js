'use client';
import React from 'react';
import { redirect } from "next/navigation";

export default function Register() {
    
    async function handleRegister(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const body = JSON.stringify({ username, email, password });
        console.log(body);
        // Send data to API route to store in MongoDB
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        });

        if (res.ok) {
            // Registration successful, handle as needed
            alert('Registration successful!');
            
            redirect('/login');
        } else {
            // Handle error
            alert('Registration failed.');
        }
    }

    return (
        <div id='register-page-container' className='flex flex-col items-center justify-center min-h-screen bg-blue-600'>
            <div id='register-box' className='flex flex-col justify-around bg-white px-8 py-14 rounded-2xl shadow-lg h-160 w-90'>
                
                <h1 className='text-4xl text-center font-bold font-stretch-75% text-gray-600'>Register</h1>
                <form className='flex flex-col w-full' onSubmit={handleRegister}>
                    <input type='username' placeholder='Username' id='username' className='py-3 px-4 mb-6 border-white bg-gray-100 rounded-3xl' required />
                    
                    <input type='email' placeholder='Email' id='email' className='py-3 px-4 mb-6 border-white bg-gray-100 rounded-3xl' required />
                    <input type='password' placeholder='Password' id='password' className='py-3 px-4 mb-12 border-white bg-gray-100 rounded-3xl' required />

                    <button type='submit'  className='bg-orange-300 text-2xl mt-6 text-white p-2 rounded-3xl hover:bg-blue-700 transition duration-200'>REGISTER</button>
                </form>
            </div>
        </div>
    );
}