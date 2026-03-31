import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSvg from '../assets/logo.svg'
import DitherCanvas from '../components/DitherCanvas'
import MiniChatbot from '../components/MiniChatbot'
import './ProductPage.css'

export default function ProductPage() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'purple' ? 'purple' : '')
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'purple' : 'dark'))
  }

  return (
    <div className="product-page">
      <DitherCanvas theme={theme} />

      <nav className="product-nav">
        <Link to="/" className="product-nav-logo">
          <img src={logoSvg} alt="Patchwork" className="product-logo-img" />
        </Link>
        <div className="product-nav-actions">
          <button className="btn-pill" onClick={handleToggleTheme}>
            {theme === 'dark' ? 'Purple Mode' : 'Dark Mode'}
          </button>
          <Link to="/" className="btn-pill">Open Console</Link>
        </div>
      </nav>

      <main className="product-content">
        <section className="hero-section">
          <span className="hero-badge">QUANTUM-4 ENGINE</span>
          <h1 className="hero-title">
            Enterprise AI Synthesis<br />
            <span className="hero-highlight">at Quantum Scale</span>
          </h1>
          <p className="hero-description">
            Transform unstructured chaos into linear logic. Process 40TB/s across distributed
            neural architectures with military-grade encryption and predictive modeling.
          </p>
          <div className="hero-actions">
            <Link to="/" className="btn-primary">Launch Console</Link>
            <a href="#features" className="btn-secondary">Explore Features</a>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-value">40 TB/s</div>
            <div className="stat-label">Data Throughput</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">99.99%</div>
            <div className="stat-label">Uptime SLA</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3.2 ms</div>
            <div className="stat-label">Avg Latency</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">2.3B</div>
            <div className="stat-label">Parameters</div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2 className="section-title">Core Capabilities</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Neural Architecture</h3>
              <p>14 interconnected layers processing across distributed clusters with adaptive topology optimization.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Quantum Encryption</h3>
              <p>Military-grade AES-256-GCM with quantum-resistant key exchange protecting all data streams.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3>Predictive Modeling</h3>
              <p>890M data points with 96.7% validation accuracy. 30-day forecasts with 93.4% confidence.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                </svg>
              </div>
              <h3>Entropy Reduction</h3>
              <p>Adaptive filtering algorithms reducing noise by 51.3% with real-time signal clarity monitoring.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <h3>Edge Processing</h3>
              <p>Global edge nodes in SF, Berlin, and Tokyo with sub-35ms inter-cluster latency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                </svg>
              </div>
              <h3>Auto-Scaling</h3>
              <p>Intelligent horizontal and vertical scaling with predictive demand forecasting and pre-warming.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="section-title">Ready to Transform Your Data?</h2>
          <p className="cta-description">
            Deploy your first Quantum instance in seconds. No configuration required.
          </p>
          <Link to="/" className="btn-primary">Get Started Free</Link>
        </section>

        <footer className="product-footer">
          ©2024 QUANTUM SYSTEMS INC. ALL RIGHTS RESERVED.
        </footer>
      </main>

      <MiniChatbot theme={theme} />
    </div>
  )
}
