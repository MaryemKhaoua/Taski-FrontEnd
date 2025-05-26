import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <header className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom shadow-sm">
      <Link to="/" className="d-flex align-items-center text-decoration-none">
        <div
          className="d-flex align-items-center justify-content-center bg-primary rounded"
          style={{ width: '32px', height: '32px' }}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span className="fw-semibold fs-4 text-dark ms-2">Taski</span>
      </Link>

      <nav className="d-flex align-items-center gap-3">
        <Link to="/login" className="text-dark text-decoration-none">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </nav>
    </header>
  );
}