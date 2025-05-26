import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/Dashboard'; // ✅ Import Dashboard

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
