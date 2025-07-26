'use client';
import { redirect } from "next/navigation";
import React, { useContext } from 'react';
import {UserContext} from '../../../helpers/Context';
import { Recieve, GetMessage } from '../../../helpers/SmartContract';
import { set } from "mongoose";

export default function CapsulesPage() {
    
    const {username, isConnected, signer} = useContext(UserContext);
    
    const [modalOpen, setModalOpen] = React.useState(false);
    
    const [modalText, setModalText] = React.useState("");
    
    const [capsules, setCapsules] = React.useState([]);
    //const capsules = [{title: "Test 1", unlockDate: Date(), CreatedOn: Date()}, {title: "Test 2" , unlockDate: Date(), CreatedOn: Date()}]; // This should be replaced with actual data fetching logic
    // This should be replaced with actual data fetching logic
    React.useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            fetchCapsules();
        }
        if (!user) {
            // Redirect to login page if user is not logged in
            redirect('/login');
        }
    }, []);

    async function fetchCapsules() {
        const user = localStorage.getItem('user');
        
        const res = await Recieve(user, signer);
        const messages = res.map(m => ({
            title: m.title,
            unlockTime: new Date(Number(m.unlockTime) * 1000), 
            createdOn: new Date(Number(m.createdOn) * 1000),
            messageId: m.messageId
            }));
        if (res) {
            // Assuming res is an array of capsule objects
            setCapsules(messages);
            console.log('messages:', messages);
        }
    }

    return (
        <>
        {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" style={{  backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center relative" style={{ opacity: 1 }}>
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl font-bold"
                    onClick={() => setModalOpen(false)}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="mb-4 text-lg text-black">{modalText}</div>
                <button
                    className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-blue-700 transition"
                    onClick={() => setModalOpen(false)}
                >
                    Close
                </button>
            </div>
        </div>
        )}
        <main className="flex-grow pt-20 pb-24 text-gray-700 max-w-4xl mx-auto px-6">
                <section aria-labelledby="main-title" className="text-center mb-16">
                    <h1 id="main-title" className="text-5xl font-extrabold tracking-tight leading-tight text-black mb-3">
                        Your Upcoming Time Capsules, 
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        We have kept them safe until the time comes.
                    </p>
                </section>

                <section aria-label="list of time capsules" className="bg-white rounded-xl shadow-md p-10 mb-20">
                   <table className="table-fixed h-full w-full">
                    <thead>
                        <tr className="text-left font-bold text-black h-12 border-b border-gray-300 w-full">
                            <th>Title</th>
                            <th>Unlock Date</th>
                            <th>Created On</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {capsules.map((capsule, index) => {
                            const isUnlockable = new Date(capsule.unlockTime) <= new Date();
                            return (
                                <tr key={index} className="text-left text-gray-400 h-12 border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-2">{capsule.title}</td>
                                    <td className="py-2">{new Date(capsule.unlockTime).toLocaleString()}</td>
                                    <td className="py-2">{new Date(capsule.createdOn).toLocaleString()}</td>
                                    <td className="py-2 relative">
                                        {isUnlockable && (
                                            <button
                                                className="bg-black top-2 absolute left-10 cursor-pointer text-white px-4 py-1 rounded hover:bg-gray-700 transition"
                                                onClick={ async () => {
                                                    const message = await GetMessage( capsule.messageId, signer);
                                                    setModalOpen(true);
                                                    setModalText(`Your message: ${message}`);
                                                }}
                                            >
                                                Unlock
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
                </section>

                <section aria-label="How it works" className="grid gap-12 sm:grid-cols-3">
                    <article tabIndex={0} className="bg-white rounded-xl shadow-md p-6 space-y-4 focus:outline-none focus:ring-2 focus:ring-black hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 select-none">
                        <svg className="w-10 h-10 stroke-black mx-auto" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 12l2 2 4-4" />
                        </svg>
                        <h3 className="text-xl font-extrabold text-black text-center">Secure &amp; Private</h3>
                        <p className="text-center text-gray-500 text-base">Your messages are encrypted and will be securely stored until the unlock date arrives.</p>
                    </article>
                    <article tabIndex={0} className="bg-white rounded-xl shadow-md p-6 space-y-4 focus:outline-none focus:ring-2 focus:ring-black hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 select-none">
                        <svg className="w-10 h-10 stroke-black mx-auto" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2" />
                        </svg>
                        <h3 className="text-xl font-extrabold text-black text-center">Choose Unlock Date</h3>
                        <p className="text-center text-gray-500 text-base">Set the exact date and time when you want your message to be revealed to you or others.</p>
                    </article>
                    <article tabIndex={0} className="bg-white rounded-xl shadow-md p-6 space-y-4 focus:outline-none focus:ring-2 focus:ring-black hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 select-none">
                        <svg className="w-10 h-10 stroke-black mx-auto" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                        </svg>
                        <h3 className="text-xl font-extrabold text-black text-center">Notifications</h3>
                        <p className="text-center text-gray-500 text-base">Get notified when your messages unlock so you can revisit your memories at the right moment.</p>
                    </article>
                </section>
            </main>

            <footer role="contentinfo" className="bg-gray-50 text-gray-400 text-center text-sm py-12 select-none">
                &copy; 2025 Time Capsule App. All rights reserved.
            </footer>
        </>
    );
}