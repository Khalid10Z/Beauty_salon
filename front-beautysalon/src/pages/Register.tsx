import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  role: 'client' | 'admin';
}

function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    role: 'client',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Compte créé avec succès !');
        setFormData({ fullName: '', email: '', password: '', role: 'client' });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Erreur réseau : ' + error);
    }
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleRegister} style={formStyle}>
        <h2 style={titleStyle}>🎉 Créer un compte</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Nom complet"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>S'inscrire</button>

        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

// 🎨 Styles
const pageStyle: React.CSSProperties = {
  background: '#f4fdf9',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: '"Segoe UI", sans-serif',
};

const formStyle: React.CSSProperties = {
  background: 'white',
  padding: '2.5rem',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle: React.CSSProperties = {
  marginBottom: '1.5rem',
  textAlign: 'center',
  color: '#1b4332',
};

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 14px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default Register;
