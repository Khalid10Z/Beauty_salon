import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface Booking {
  id: number;
  datetime: string;
  salon: { name: string };
  service: { name: string };
}

interface DecodedToken {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('⛔ Vous devez être connecté pour voir vos réservations.');
        return;
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const userId = decoded.sub;

        const res = await fetch(`http://localhost:3000/bookings/user/${userId}`);
        if (!res.ok) {
          const errorData = await res.json();
          setMessage(`❌ ${errorData.message || 'Erreur serveur'}`);
          return;
        }

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setMessage('❌ Erreur réseau ou token invalide');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>📅 Mes Réservations</h2>
        {message && <p style={messageStyle}>{message}</p>}
        {!message && bookings.length === 0 && <p>Aucune réservation pour le moment.</p>}

        <div style={cardGridStyle}>
          {bookings.map((b) => (
            <div key={b.id} style={cardStyle}>
              <h4 style={{ color: '#1b4332', marginBottom: '0.5rem' }}>{b.salon.name}</h4>
              <p><strong>🧖 Service :</strong> {b.service.name}</p>
              <p><strong>⏰ Date :</strong> {new Date(b.datetime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 💅 Styles
const pageStyle: React.CSSProperties = {
  backgroundColor: '#f4fdf9',
  minHeight: '100vh',
  padding: '3rem 1rem',
  fontFamily: 'Segoe UI, sans-serif',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#1b4332',
  marginBottom: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const messageStyle: React.CSSProperties = {
  color: 'red',
  marginBottom: '1.5rem',
};

const cardGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1.5rem',
};

const cardStyle: React.CSSProperties = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s ease',
};

export default MyBookings;
