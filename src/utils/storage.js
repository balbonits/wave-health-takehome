// Storage utilities for user data
export const getLocalUsers = () => {
  try {
    const users = localStorage.getItem('dashboard-users');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return [];
  }
};

export const saveLocalUsers = (users) => {
  try {
    localStorage.setItem('dashboard-users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

export const addLocalUser = (userData) => {
  const existingUsers = getLocalUsers();
  
  // Generate ID based on existing users (API users start from 1-10)
  const maxId = Math.max(
    ...existingUsers.map(u => u.id),
    10 // Start local IDs from 11+
  );
  
  const newUser = {
    id: maxId + 1,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    website: userData.website || '',
    address: {
      street: userData.street || '',
      city: userData.city || '',
      zipcode: userData.zipcode || ''
    },
    company: {
      name: userData.company || ''
    },
    isLocal: true // Mark as locally created
  };
  
  const updatedUsers = [...existingUsers, newUser];
  saveLocalUsers(updatedUsers);
  
  return newUser;
};