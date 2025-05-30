import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom shadow-sm">
      <Link to="/" className="d-flex align-items-center text-decoration-none">
        <div className="d-flex align-items-center justify-content-center bg-primary rounded" style={{ width: '32px', height: '32px' }}>
          <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="fw-semibold fs-4 text-dark ms-2">Taski</span>
      </Link>

      <nav className="d-flex align-items-center gap-3">
        {user ? (
          <Dropdown show={showDropdown} onToggle={setShowDropdown}>
            <Dropdown.Toggle 
              variant="light" 
              id="dropdown-user" 
              className="d-flex align-items-center gap-2 bg-transparent border-0"
            >
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                   style={{ width: '32px', height: '32px' }}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="d-none d-md-inline">{user.username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.ItemText className="small text-muted">
                Signed in as {user.username}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Link to="/login" className="text-dark text-decoration-none">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}