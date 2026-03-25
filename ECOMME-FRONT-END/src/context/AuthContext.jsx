
import { createContext, useContext, useState, useEffect } from "react";
import {
    login as loginApi,
    register as registerApi,
    logout as logoutApi,
    getCurrentUser
} from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await getCurrentUser();
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        verifyUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginApi(email, password);
            const { user, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await registerApi(name, email, password);
            // After register, we navigate to login (handled in component)
            // No longer logging in automatically here.
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
        } catch (error) {
            console.error("Logout failed on backend", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
