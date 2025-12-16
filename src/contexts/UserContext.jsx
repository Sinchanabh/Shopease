import { createContext, useContext, useState, useEffect } from 'react';
import { getUser, setUser, clearUser } from '../utils/localStorage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    setUserState(getUser());
  }, []);

  const login = (userData) => {
    setUserState(userData);
    setUser(userData);
  };

  const logout = () => {
    setUserState(null);
    clearUser();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
