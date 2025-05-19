import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { //children component ko auth data provide krega
  const [user, setUser] = useState(null);

  // ✅ Function to send authorized requests
  const authorizedFetch = async (url, options = {}) => {// authorizedfetch function hai api request bhejne ke liye bna hai
    const token = await AsyncStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,//Jo bhi extra headers options me aaye wo bhi add karta hai.
    };

    return fetch(url, {   //Finally fetch function ko call karta hai with updated headers.

      ...options,    //Isse har authorized request me token automatic chala jayega.
         headers,
    });
  };


  // ✅ Login and save token
  const login = async (email, password) => {
    const response = await fetch('http://192.168.18.56:3000/loginuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Login failed');

    setUser(data.user);
    await AsyncStorage.setItem('token', data.token); // Save JWT
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  };

  // ✅ Logout and remove token
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  // ✅ Restore user when app reloads
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const savedUser = await AsyncStorage.getItem('user');
      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authorizedFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
