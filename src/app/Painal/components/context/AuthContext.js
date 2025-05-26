'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage on initial load
    const storedUser = localStorage.getItem('painalUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Create a wrapper for setUser that also updates localStorage
  const updateUser = (userData) => {
    if (userData) {
      localStorage.setItem('painalUser', JSON.stringify(userData));
    } else {
      localStorage.removeItem('painalUser');
    }
    setUser(userData);
  };

  // Add logout function
  const logout = () => {
    localStorage.removeItem('painalUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 