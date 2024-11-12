import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem("isAuthenticated") === "true";
        console.log("Initial load, isAuthenticated:", storedAuth); // Debug initial load
        return storedAuth;
    });
   
    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        console.log("LocalStorage value:", localStorage.getItem("isAuthenticated")); // Check if "true" is set
     
    };
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
