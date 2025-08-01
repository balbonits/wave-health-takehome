import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Users from './pages/Users/Users';
import AddUser from './pages/AddUser/AddUser';
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app">
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
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/add-user" element={<AddUser />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;