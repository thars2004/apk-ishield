import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Ensure axios is installed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const loadAuthData = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedUser = await AsyncStorage.getItem('user');
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading authentication data:', error);
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  const login = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('user');
  };

  const activateUser = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:3306/activate-account/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to activate user:', error.message);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3306/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, activateUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
