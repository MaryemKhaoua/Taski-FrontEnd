import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/Dashboard';
import Unauthorized from './components/pages/Unauthorized';

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        
      </Routes>
    </AuthProvider>
  );
};