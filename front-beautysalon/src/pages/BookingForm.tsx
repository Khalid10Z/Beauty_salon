// src/pages/BookingForm.tsx
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
interface DecodedToken {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
function BookingForm() {
  const { salonId, serviceId } = useParams<{ salonId: string; serviceId: string }>();
  const navigate = useNavigate();
  const [datetime, setDatetime] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('⚠️ Vous devez être connecté pour réserver');
      return;
    }
    const decoded = jwtDecode<DecodedToken>(token);
    const userId = decoded.sub;
    console.log('Token:', token);
    console.log('User ID:', userId);

    try {
      const res = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          salonId: Number(salonId),
          serviceId: Number(serviceId),
          datetime,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Réservation réussie !');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Erreur réseau : ' + error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📅 Réserver un créneau</h2>
      <form onSubmit={handleBooking}>
        <label>Choisissez un jour et une heure :</label><br />
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Réserver</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BookingForm;
