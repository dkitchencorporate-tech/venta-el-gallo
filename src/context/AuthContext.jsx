import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('veg_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Intentar autenticación contra API si está disponible en producción
      const isProduction = window.location.hostname.includes('cuevaventaelgallo.es');
      
      if (isProduction) {
        const response = await fetch('/api/auth.php?action=login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Credenciales inválidas');
        }
        localStorage.setItem('veg_auth_token', data.token);
        localStorage.setItem('veg_auth_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        return data.user;
      } else {
        // En entorno de pruebas GitHub Pages (Modo Staging Seguro)
        if (email.toLowerCase() === 'info@cuevaventaelgallo.es' || email.toLowerCase() === 'admin@ventaelgallo.com') {
          const user = { email: email.toLowerCase(), role: 'admin' };
          localStorage.setItem('veg_auth_token', 'mock_jwt_staging_token_2026');
          localStorage.setItem('veg_auth_user', JSON.stringify(user));
          setCurrentUser(user);
          return user;
        } else {
          throw new Error('Credenciales incorrectas. El usuario administrador es info@cuevaventaelgallo.es');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email) => {
    const isProduction = window.location.hostname.includes('cuevaventaelgallo.es');
    if (isProduction) {
      const response = await fetch('/api/auth.php?action=request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await response.json();
    }
    return {
      success: true,
      message: 'Si el correo coincide con el administrador, se ha enviado un enlace de recuperación a tu bandeja de entrada.'
    };
  };

  const confirmPasswordReset = async (token, password) => {
    const isProduction = window.location.hostname.includes('cuevaventaelgallo.es');
    if (isProduction) {
      const response = await fetch('/api/auth.php?action=confirm-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error al restablecer contraseña.');
      }
      return data;
    }
    return {
      success: true,
      message: 'Contraseña actualizada con éxito en el entorno de pruebas.'
    };
  };

  const logout = () => {
    localStorage.removeItem('veg_auth_token');
    localStorage.removeItem('veg_auth_user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, requestPasswordReset, confirmPasswordReset, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
