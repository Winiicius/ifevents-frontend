import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
    user: null,
    hasRole: () => false,
    hasAnyRole: () => false,
    isAuthenticated: false
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        // Verificar se há um token armazenado ao carregar a aplicação
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Verificar se o token ainda é válido
                if (decodedToken.exp * 1000 > Date.now()) {
                    setCurrentUser(decodedToken);
                    setIsAuthenticated(true);
                    setUserRoles(decodedToken.roles || []);
                } else { // Token expirado
                    logout();
                }
            } catch (error) {
                logout();
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setCurrentUser(decodedToken);
        setIsAuthenticated(true);
        setUserRoles(decodedToken.roles || []);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        setIsAuthenticated(false);
        setUserRoles([]);
    };

    // Função para verificar se o usuário tem uma role específica
    const hasRole = (role) => {
        return userRoles.includes(role);
    };

    // Função para verificar se o usuário tem qualquer uma das roles especificadas
    const hasAnyRole = (roles) => {
        return roles.some(role => userRoles.includes(role));
    };

    // Função para verificar se o usuário tem todas as roles especificadas
    const hasAllRoles = (roles) => {
        return roles.every(role => userRoles.includes(role));
    };

    const value = {
        currentUser,
        isAuthenticated,
        userRoles,
        login,
        logout,
        hasRole,
        hasAnyRole,
        hasAllRoles
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);