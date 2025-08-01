import { useState } from 'react';

import { useUsers } from '../../context/UserContext';
import Modal from '../../components/Modal/Modal';

import './Users.css';

const Users = () => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;

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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Modal functions
  const toggleModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      setSelectedUser(null);
      setIsModalOpen(false);
    }
  };

  // Loading state
  if (loading) {
    return <div className="loading">Loading users...</div>;
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
              <tr 
                key={user.id} 
                className="table-row clickable-row"
                onClick={() => toggleModal(user)}
              >
                <td className="table-cell">
                  {user.name} {user.isLocal && <span className="local-badge">Local</span>}
                </td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.phone}</td>
                <td className="table-cell">{user.company?.name}</td>
              </tr>
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