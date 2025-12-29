import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token with backend and set user
      // For now, assume token is valid
      setUserState({ username: 'user' }); // Placeholder
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      localStorage.setItem('token', response.access_token);
      setUserState({ username: userData.username });
      setPopupMessage('Registration successful!');
      setIsPopupVisible(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      localStorage.setItem('token', response.access_token);
      setUserState({ username: credentials.username });
      setPopupMessage('Login successful!');
      setIsPopupVisible(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem('token');
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, loading, popupMessage, isPopupVisible, closePopup }}>
      {children}
    </UserContext.Provider>
  );
};
