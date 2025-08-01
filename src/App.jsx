import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NetworkStatus from './components/NetworkStatus/NetworkStatus';
import './App.css';

// Lazy load components
const Users = lazy(() => import('./pages/Users/Users'));
const AddUser = lazy(() => import('./pages/AddUser/AddUser'));

const App = () => {
  return (
    <ErrorBoundary>
      <UserProvider>
        <BrowserRouter>
          <div className="app">
            <NetworkStatus />
            
            <nav className="nav">
              <div className="nav-container">
                <h1 className="nav-title">User Dashboard</h1>
                <div className="nav-links">
                  <Link to="/" className="nav-link">Users</Link>
                  <Link to="/add-user" className="nav-link">Add User</Link>
                </div>
              </div>
            </nav>

            <main className="main-content">
              <Suspense fallback={<div className="loading">Loading page...</div>}>
                <Routes>
                  <Route path="/" element={<Users />} />
                  <Route path="/add-user" element={<AddUser />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </UserProvider>
    </ErrorBoundary>
  );
};

export default App;