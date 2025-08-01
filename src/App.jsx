import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Users from './pages/Users/Users';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="nav">
          <div className="nav-container">
            <h1 className="nav-title">User Dashboard</h1>
            <div className="nav-links">
              <Link to="/users" className="nav-link">Users</Link>
              <Link to="/add-user" className="nav-link">Add User</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const AddUser = () => {
  return <div>Add User Form - Coming soon...</div>;
};

export default App;