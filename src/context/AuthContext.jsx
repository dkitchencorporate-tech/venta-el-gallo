import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Admin Credentials
  const MOCK_ADMIN_EMAIL = "admin@ventaelgallo.com";
  const MOCK_ADMIN_PASSWORD = "admin";

  useEffect(() => {
    // Check local storage for session
    const storedUser = localStorage.getItem('venta_admin_session');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulando delay de red
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
          const user = { email, uid: 'mock-admin-uid-123' };
          setCurrentUser(user);
          localStorage.setItem('venta_admin_session', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('venta_admin_session');
  };

  const resetPassword = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Correo de recuperación enviado a ${email}`);
      }, 1000);
    });
  };

  const value = {
    currentUser,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
