import { createContext, useContext, useState, useEffect } from 'react';
import { getLocalUsers, addLocalUser } from '../utils/storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load users from API + localStorage
  const loadUsers = async (showLoadingState = true) => {
    try {
      if (showLoadingState) setLoading(true);
      setError(null);

      // Always load local users first (offline capability)
      const localUsers = getLocalUsers();

      if (!isOnline) {
        // Offline - only show local users
        setUsers(localUsers);
        setError('You are offline. Showing locally stored users only.');
        return;
      }

      // Online - try to load API users
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const apiUsers = await response.json();
        const allUsers = [...apiUsers, ...localUsers];
        setUsers(allUsers);
      } catch (apiError) {
        // API failed, but we have local users
        console.warn('API request failed:', apiError.message);
        setUsers(localUsers);
        
        if (apiError.name === 'AbortError') {
          setError('Request timed out. Showing locally stored users only.');
        } else {
          setError('Unable to load latest users from server. Showing locally stored users only.');
        }
      }
    } catch (err) {
      // Critical error - couldn't even load local users
      console.error('Critical error loading users:', err);
      setError('Failed to load users. Please refresh the page.');
      setUsers([]);
    } finally {
      if (showLoadingState) setLoading(false);
    }
  };

  // Add a new user with enhanced error handling
  const addUser = async (userData) => {
    try {
      // Validate user data
      if (!userData.name?.trim() || !userData.email?.trim() || !userData.phone?.trim()) {
        throw new Error('Missing required user information');
      }

      // Check for duplicate email
      const existingUser = users.find(user => 
        user.email.toLowerCase() === userData.email.toLowerCase()
      );
      if (existingUser) {
        throw new Error('A user with this email already exists');
      }

      // Add to localStorage
      const newUser = addLocalUser(userData);
      
      // Update state immediately
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      return newUser;
    } catch (err) {
      console.error('Error adding user:', err);
      
      // Re-throw with user-friendly message
      if (err.message.includes('localStorage')) {
        throw new Error('Unable to save user data. Your browser storage may be full.');
      }
      
      throw err; // Re-throw original error
    }
  };

  // Refresh users data
  const refreshUsers = () => {
    loadUsers(false); // Don't show loading state for refresh
  };

  // Retry with full loading state
  const retryLoadUsers = () => {
    loadUsers(true);
  };

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, [isOnline]); // Reload when network status changes

  const value = {
    users,
    loading,
    error,
    isOnline,
    addUser,
    refreshUsers,
    retryLoadUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};