import React, { useState, useEffect } from 'react'
import './Cosmica.css'

const Cosmica = () => {
  const [activeProduct, setActiveProduct] = useState(null)

  // Generar estrellas aleatorias
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.querySelector('.stars-container')
      if (!starsContainer) return

      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.animationDelay = `${Math.random() * 3}s`
        star.style.opacity = Math.random()
        starsContainer.appendChild(star)
      }
    }

    createStars()
  }, [])

  const products = [
    {
      id: 1,
      name: 'COSMICA',
      color: '#FF1493',
      message: 'Estas en mi corazón - Mis mejores deseos',
      image: '🌙'
    },
    {
      id: 2,
      name: 'COSMICA',
      color: '#1E90FF',
      message: 'Felicidades Campeón - Disfruta Sonríe Celebra',
      image: '⚽'
    },
    {
      id: 3,
      name: 'COSMICA',
      color: '#32CD32',
      message: 'Que seas muy feliz - Felicidades Princesa',
      image: '👑'
    },
    {
      id: 4,
      name: 'COSMICA',
      color: '#FFD700',
      message: 'Feliz Cumpleaños - ¡Te Quiero Mucho!',
      image: '🎂'
    },
    {
      id: 5,
      name: 'COSMICA',
      color: '#FF4500',
      message: 'Dios Te Bendiga - Eres Especial',
      image: '✨'
    },
    {
      id: 6,
      name: 'COSMICA',
      color: '#8A2BE2',
      message: 'Eres Mi Héroe - Feliz Día',
      image: '🦸'
    }
  ]

  return (
    <div className="cosmica-page">
      {/* Fondo de estrellas animadas */}
      <div className="stars-container"></div>

      {/* Sol animado */}
      <div className="sun"></div>

      {/* Luna animada */}
      <div className="moon"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="rocket">🚀</div>
            <h1 className="brand-name">COSMICA</h1>
            <div className="planet">🪐</div>
          </div>
          <p className="tagline">Velas cósmicas para pastel</p>
          <p className="subtitle">¡Haz de tu fiesta súper espacial!</p>
        </div>
      </section>

      {/* Características */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🕯️</span>
            <h3>Vela cósmica para pastel</h3>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔥</span>
            <h3>Incluye mecha</h3>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌿</span>
            <h3>No tóxica</h3>
          </div>
          <div className="feature-card">
            <span className="feature-icon">✨</span>
            <h3>No contiene pólvora</h3>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👨‍👩‍👧</span>
            <h3>Usar bajo supervisión de un adulto</h3>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="products-section">
        <h2 className="section-title">
          <span className="star-icon">⭐</span>
          Nuestras Velas Cósmicas
          <span className="star-icon">⭐</span>
        </h2>

        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${activeProduct === product.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
              style={{ '--product-color': product.color }}
            >
              <div className="product-icon">{product.image}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-message">{product.message}</div>
              <div className="product-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¡Ilumina tu celebración!</h2>
          <p>Personaliza tus velas con mensajes especiales</p>
          <div className="cta-buttons">
            <a href="https://www.velacosmica.com.mx" target="_blank" rel="noopener noreferrer" className="cta-button primary">
              Visitar Tienda
            </a>
            <a href="#contact" className="cta-button secondary">
              Contactar
            </a>
          </div>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              📘
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              📷
            </a>
            <a href="https://www.velacosmica.com.mx" target="_blank" rel="noopener noreferrer" className="social-icon">
              🌐
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>www.velacosmica.com.mx</p>
        <p>© 2025 Cosmica - Velas que iluminan tus momentos especiales</p>
      </footer>
    </div>
  )
}

export default Cosmica
