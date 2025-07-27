// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Salons from './pages/Salons';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />         {/* Page d’accueil */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/salons/:salonId/services/:serviceId/book" element={<BookingForm />} />
        <Route path="/mes-reservations" element={<MyBookings />} />

      </Routes>
    </Router>
  );
}

export default App;
