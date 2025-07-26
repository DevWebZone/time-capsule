'use client';
import { redirect } from "next/navigation";
import React, { useContext } from 'react';
import {UserContext} from '../../helpers/Context';
import { Connect, Execute } from '../../helpers/SmartContract';

export default function HomePage() {
    const {username, setIsConnected, setSigner, signer} = useContext(UserContext);

    console.log("HomePage username:", username);
    React.useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setSigner(Connect());
            setIsConnected(true);
        }
        if (!user) {
            // Redirect to login page if user is not logged in
            redirect('/login');
        }
    }, []);
    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const unlockDate = form.unlockDate.value;
        const currentDate = new Date();
        const unlockTimeStamp = Math.floor(new Date(unlockDate).getTime() / 1000);
        const currentTimeStamp = Math.floor(currentDate.getTime() / 1000);
        const message = form.message.value;
        const title = form.title.value || 'Untitled Message';
        const user = localStorage.getItem('user');
        if (unlockTimeStamp <= currentTimeStamp) {
            alert('Please select a future date and time for unlocking your message.');
            return;
        }
        console.log('Message:', message);
        console.log('signer:', signer);
        console.log('unlockTimeStamp:', unlockTimeStamp);
        console.log('currentTimeStamp:', currentTimeStamp); 
        console.log('title:', title);
        console.log('user:', user);
        // Call the Execute function to handle the smart contract interaction
        Execute(title, unlockTimeStamp, currentTimeStamp, message, user, signer);
    }

    return (
        <>
            <main className="flex-grow pt-20 pb-24 text-gray-700 max-w-4xl mx-auto px-6">
                <section aria-labelledby="main-title" className="text-center mb-16">
                    <h1 id="main-title" className="text-5xl font-extrabold tracking-tight leading-tight text-black mb-3">
                        Create Your Time Capsule, {username || 'Friend'}!
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Compose a private message and lock it away until your chosen unlock date. We&apos;ll keep it safe until then.
                    </p>
                </section>

                <section aria-label="Create new time capsule message" className="bg-white rounded-xl shadow-md p-10 mb-20">
                    <form id="timeCapsuleForm" noValidate className="space-y-8" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block mb-2 font-semibold text-black select-none">
                                Message Title <span className="text-gray-400 font-normal">(optional)</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                maxLength={100}
                                autoComplete="off"
                                placeholder="Give your message a name"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 font-semibold text-black select-none">
                                Your Message <span aria-hidden="true" className="text-red-600">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Write your message here..."
                                required
                                aria-required="true"
                                minLength={10}
                                maxLength={2000}
                                rows={6}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-y text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="unlockDate" className="block mb-2 font-semibold text-black select-none">
                                Unlock Date &amp; Time <span aria-hidden="true" className="text-red-600">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                id="unlockDate"
                                name="unlockDate"
                                required
                                aria-required="true"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                                min=""
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                id="submitBtn"
                                className="inline-flex items-center justify-center cursor-pointer bg-black text-white font-extrabold text-lg rounded-xl px-8 py-4 shadow-md hover:bg-gray-900 focus:bg-gray-900 focus:outline-none transition-transform duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Save Message
                            </button>
                        </div>
                    </form>
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
                &copy; 2024 Time Capsule App. All rights reserved.
            </footer>
        </>
    );
}