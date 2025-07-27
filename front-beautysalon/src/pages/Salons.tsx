// Salons.tsx
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import salonImage from '../assets/pexels-photo-705255.jpeg';
import BookingForm from './BookingForm';

interface Salon {
  id: number;
  name: string;
  address: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

function Salons() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await fetch('http://localhost:3000/salons');
        const data = await res.json();
        setSalons(data);
      } catch (err) {
        setMessage('❌ Erreur lors du chargement des salons');
      }
    };
    fetchSalons();
  }, []);

  const openModal = async (salonId: number) => {
    setSelectedSalonId(salonId);
    setShowModal(true);
    setLoadingServices(true);
    try {
      const res = await fetch(`http://localhost:3000/services/salon/${salonId}`);
      const data = await res.json();
      setServices(data);
    } catch (error) {
      setMessage("❌ Erreur lors du chargement des services");
    } finally {
      setLoadingServices(false);
    }
  };

  const openBookingModal = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const closeAllModals = () => {
    setShowModal(false);
    setBookingModalOpen(false);
    setServices([]);
    setSelectedSalonId(null);
    setSelectedServiceId(null);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: fadeUp 0.3s ease-out;
        }
      `}</style>

      <div style={{ padding: '3rem 2rem', backgroundColor: '#f1fdf7', minHeight: '100vh' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 'bold', marginBottom: '3rem', color: '#1b4332' }}>
          🌿 Nos Salons Partenaires
        </h2>

        {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

        <div style={gridStyle}>
          {salons.map((salon, index) => (
            <div key={salon.id} style={{ ...cardStyle, animation: 'fadeUp 0.6s ease both', animationDelay: `${index * 0.1}s` }}>
              <img src={salonImage} alt="Salon" style={imageStyle} />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#1b4332', marginBottom: '0.5rem' }}>{salon.name}</h3>
                <p style={{ color: '#555', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} /> {salon.address}
                </p>
                <button onClick={() => openModal(salon.id)} style={linkStyle}>Voir les services</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.6rem' }}>💇 Services disponibles</h3>
            {loadingServices ? <p>Chargement...</p> : services.length === 0 ? <p>Aucun service disponible</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#eafaf1', textAlign: 'left' }}>
                    <th style={thStyle}>Nom</th>
                    <th style={thStyle}>Prix / Durée</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={tdStyle}>{service.name}</td>
                      <td style={tdStyle}>{service.price}€ / {service.duration} min</td>
                      <td style={tdStyle}>
                        <button onClick={() => openBookingModal(service.id)} style={reserveBtnStyle}>Réserver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div style={{ textAlign: 'right', marginTop: '2rem' }}>
              <button onClick={closeAllModals} style={closeBtnStyle}>Fermer</button>
            </div>
          </div>
        </div>
      )}

      {bookingModalOpen && selectedSalonId && selectedServiceId && (
        <div className="modal-backdrop" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '1rem' }}>📅 Réserver un créneau</h3>
            <BookingForm salonId={selectedSalonId} serviceId={selectedServiceId} onClose={closeAllModals} />
          </div>
        </div>
      )}
    </>
  );
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2.5rem',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
};

const linkStyle: React.CSSProperties = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '8px 14px',
  borderRadius: '8px',
  fontWeight: 500,
  fontSize: '0.9rem',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
};

const thStyle: React.CSSProperties = {
  padding: '0.8rem',
  fontWeight: 600,
  color: '#1b4332',
};

const tdStyle: React.CSSProperties = {
  padding: '0.7rem',
};

const reserveBtnStyle: React.CSSProperties = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
};

const closeBtnStyle: React.CSSProperties = {
  backgroundColor: '#ccc',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default Salons;