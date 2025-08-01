import { createContext, useContext, useState, useEffect } from 'react';
import { getLocalUsers, addLocalUser } from '../utils/storage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users from API + localStorage
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const apiUsers = await response.json();

      // localStorage
      const localUsers = getLocalUsers();

      // Combine
      const allUsers = [...apiUsers, ...localUsers];
      setUsers(allUsers);
    } catch (err) {
      setError(err.message);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addUser = async (userData) => {
    try {
      // Add to localStorage and get the new user object
      const newUser = addLocalUser(userData);
      
      // Update state immediately
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      return newUser;
    } catch (err) {
      console.error('Error adding user:', err);
      throw err;
    }
  };

  // Refresh users data
  const refreshUsers = () => {
    loadUsers();
  };

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const value = {
    users,
    loading,
    error,
    addUser,
    refreshUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUsers };