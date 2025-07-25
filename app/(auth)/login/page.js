'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import {UserContext} from '../../../helpers/Context';
import { toast, ToastContainer } from 'react-toastify';
export default function LoginPage() {
      // Assuming you have an AppProvider context with a setUser or setUsername function:
        // 
    const { setUsername } = useContext(UserContext);
   React.useEffect(() => {
           const user = localStorage.getItem('user');
           if (user) {
               // Redirect to home page if user is logged in
               redirect('/home');
           }
       }, []);
    async function handleLogin(event) {
        event.preventDefault();
        const username = event.target.username.value;
        
      
        // If you don't have access to context here, you need to lift the context usage up.
        const password = event.target.password.value;
        const body = JSON.stringify({ username, password });
        console.log(body);
        // Send data to API route to store in MongoDB
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        });

        if (res.ok) {
            // Registration successful, handle as needed
            toast.success('Login successful!');
            // Redirect to home page after successful login
            const data = await res.json();
            console.log("Login response data:", data);
            localStorage.setItem('user', JSON.stringify(data.data));
            setUsername(username);

            redirect('/home');
            } else {
            // Handle error
            alert('Login failed.');
        }
    }
    return (
        <>
        <div id='login-page-container' className='flex flex-col items-center justify-center min-h-screen bg-blue-600'>
            <div id='login-box' className='flex flex-col justify-around bg-white px-8 py-8 rounded-2xl shadow-lg h-160 w-90'>
                
                <h1 className='text-4xl text-center font-bold font-stretch-75% text-gray-600'>Login</h1>
                <form className='flex flex-col w-full' onSubmit={handleLogin}>
                    <input type='username' placeholder='Username' id='username' className='py-3 px-4 mb-6 border-white bg-gray-100 rounded-3xl' required />
                    <input type='password' placeholder='Password' id='password' className='py-3 px-4 mb-12 border-white bg-gray-100 rounded-3xl' required />

                    <button type='submit' className='bg-orange-300 text-2xl mt-6 text-white p-2 rounded-3xl hover:bg-blue-500 cursor-pointer transition duration-200'>LOG IN</button>
                </form>
                <div className='flex flex-col items-center mt-6'>
                    <p className='text-gray-600'>Dont have an account</p>
                    <Link href='/register' className='text-blue-600 hover:underline mt-2'>Register here</Link>
                </div>

            </div>
        </div>
        <ToastContainer/>
        </>
    );
}