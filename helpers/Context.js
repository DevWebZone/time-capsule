'use client';
import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const AppProvider = ({ children }) => {
    const [username, setUsername] = useState("System");
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner] = useState();

    return (
        <UserContext.Provider value={{ username, setUsername, isConnected, setIsConnected, signer, setSigner }}>
            {children}
        </UserContext.Provider>
    );
};
export default AppProvider;