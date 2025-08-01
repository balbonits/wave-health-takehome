import { useState, useMemo, useCallback } from 'react';

import { useUsers } from '../../context/UserContext';
import Modal from '../../components/Modal/Modal';
import UserRow from './UserRow';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import './Users.css';

const Users = () => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized normalized search term
  const normalizedSearchTerm = useMemo(() => 
    searchTerm.toLowerCase().trim(), 
    [searchTerm]
  );

  // Memoized filtered users
  const filteredUsers = useMemo(() => 
    users.filter(user => 
      user.name.toLowerCase().includes(normalizedSearchTerm) ||
      user.email.toLowerCase().includes(normalizedSearchTerm)
    ), 
    [users, normalizedSearchTerm]
  );

  // Memoized sorted users
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  // Memoized sort handler
  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Memoized modal handlers
  const toggleModal = useCallback((user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      setSelectedUser(null);
      setIsModalOpen(false);
    }
  }, []);

  // Loading state (with spinner)
  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error loading users: {error}</div>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Users counter */}
      <h2 className="users-header">Users ({sortedUsers.length})</h2>
      
      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      {/* Users table */}
      <div className="users-table">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="sortable-header" onClick={() => handleSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="sortable-header" onClick={() => handleSort('email')}>
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="sortable-header" onClick={() => handleSort('phone')}>
                Phone {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => (
              <UserRow 
                key={user.id}
                user={user}
                onRowClick={toggleModal}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* No results message */}
      {sortedUsers.length === 0 && !loading && (
        <div className="no-results">No users found matching your search.</div>
      )}

      {/* User Detail Modal */}
      <Modal 
        isOpen={isModalOpen}
        title={selectedUser?.name || 'User Details'}
        toggleModal={toggleModal}
      >
        {selectedUser && (
          <>
            <div className="user-detail">
              <label>Email:</label>
              <span>{selectedUser.email}</span>
            </div>
            
            <div className="user-detail">
              <label>Phone:</label>
              <span>{selectedUser.phone}</span>
            </div>
            
            <div className="user-detail">
              <label>Website:</label>
              <span>{selectedUser.website}</span>
            </div>
            
            <div className="user-detail">
              <label>Address:</label>
              <span>
                {selectedUser.address?.street}, {selectedUser.address?.city} {selectedUser.address?.zipcode}
              </span>
            </div>
            
            <div className="user-detail">
              <label>Company:</label>
              <span>{selectedUser.company?.name}</span>
            </div>
            
            {selectedUser.company?.catchPhrase && (
              <div className="user-detail">
                <label>Slogan:</label>
                <span>{selectedUser.company.catchPhrase}</span>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default Users;