import React, { useCallback } from 'react';

const UserRow = React.memo(({ user, onRowClick }) => {
  const handleClick = useCallback(() => onRowClick(user), [user, onRowClick]);

  return (
    <tr 
      className="table-row clickable-row"
      onClick={handleClick}
    >
      <td className="table-cell">
        {user.name} {user.isLocal && <span className="local-badge">Local</span>}
      </td>
      <td className="table-cell">{user.email}</td>
      <td className="table-cell">{user.phone}</td>
      <td className="table-cell">{user.company?.name}</td>
    </tr>
  );
});

UserRow.displayName = 'UserRow';

export default UserRow;