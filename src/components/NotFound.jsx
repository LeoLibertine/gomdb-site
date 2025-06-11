import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#001E2B',
      color: '#FFFFFF',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        La página que buscas no existe.
      </p>
      <Link 
        to="/" 
        style={{
          color: '#00ED64',
          fontSize: '1rem',
          textDecoration: 'underline'
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}