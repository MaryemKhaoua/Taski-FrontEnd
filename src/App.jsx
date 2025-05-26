import { Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App