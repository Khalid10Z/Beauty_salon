import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bg from '../assets/hair-care-products-and-styling-items-on-green-background-flat-lay-style-women-beauty-and-beauty-salon-cosmetics-concept-WBGB0Y.jpg'

// Style global CSS intégré ici :
const style = `
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff;
}

.homepage {
  background-image: url('${bg}');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
  color: #222;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(3px);
  z-index: 0;
}

.navbar {
  position: relative;
  z-index: 1;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 26px;
  font-weight: bold;
  color: #5b341b;
  font-style: italic;
}

.nav-links a {
  margin: 30px;
  text-decoration: none;
  color: #5b341b;
  font-weight: 500;
  font-weight: bold;
}

.nav-links a:hover {
  color: #2E7D65;
}

.cta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cta button {
  padding: 10px 20px;
  background-color: #2E7D65;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.cta button:hover {
  background-color: #245f4f;
}

.main-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 120px;
  padding-left: 20px;
  padding-right: 20px;
}

.main-content h2 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
}

.main-content .highlight {
  color: #2E7D65;
}

.main-content p {
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto 40px auto;
  color: #a48686ff;
  font-weight: bold; /* <-- le gras ajouté ici */
}


.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: #2e7d32;
  color: white;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #1b5e20;
}

.btn-secondary {
  background-color: #cba96b;
  color: white;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #a67c44;
}


`;

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/register');
  }, [navigate]);

  return (
    <>
      {/* Inject the CSS directly into the page */}
      <style>{style}</style>

      <div className="homepage">
        <div className="overlay" />

        {/* Navigation */}
        <header className="navbar">
          <div className="logo">💅 BeautySalon</div>
          <nav className="nav-links">
            <Link to="/">Accueil</Link>
            <Link to="/salons">Salons</Link>
            <Link to="/mes-reservations">Mes Réservations</Link>
          </nav>
          <div className="cta">
            <span className="phone-icon">📞</span>
            <button onClick={() => navigate('/register')}>Prendre rendez-vous</button>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="main-content">
          <h2>
            Bienvenue sur <span className="highlight">BeautySalon</span>
          </h2>
          <p>
            Réservez facilement vos soins beauté dans nos salons partenaires. Explorez les services disponibles près de chez vous.
          </p>

          <div className="actions">
            <button className="btn-primary" onClick={() => navigate('/register')}>
              👤 S'inscrire
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              🔑 Se connecter
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
