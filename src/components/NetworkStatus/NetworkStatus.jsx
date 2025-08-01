import { useUsers } from '../../context/UserContext';
import './NetworkStatus.css';

const NetworkStatus = () => {
  const { isOnline } = useUsers();

  if (isOnline) return null;

  return (
    <div className="network-status offline">
      <span className="status-icon">⚠️</span>
      <span className="status-message">You are offline</span>
    </div>
  );
};

export default NetworkStatus;