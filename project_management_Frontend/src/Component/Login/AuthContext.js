
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:8081/check", {
                    method: "GET",
                    credentials: "include", // Include cookies
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Authentication Error:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Set loading to false after check
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
