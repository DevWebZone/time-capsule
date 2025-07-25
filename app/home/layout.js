import React from "react";
import "../globals.css";
import Header from '../components/header/header';
import UserContext from '../../helpers/Context';

export default function HomeLayout({ children }) {
    return (
        <div className="min-h-screen">
            {/* You can add a custom header or sidebar here */}
                <Header />
                {children}
            {/* You can add a custom footer here */}
        </div>
    );
}