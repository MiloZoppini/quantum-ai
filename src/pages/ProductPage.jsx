import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSvg from '../assets/logo.svg'
import dashboardBg from '../assets/patchwork-dashboard-bg.png'
import MiniChatbot from '../components/MiniChatbot'
import './ProductPage.css'

export default function ProductPage() {
  const [theme, setTheme] = useState('dark')
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'purple' ? 'purple' : '')
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'purple' : 'dark'))
  }

  return (
    <div className={`product-page${isChatOpen ? ' chat-active' : ''}`}>
      <div className="product-backdrop" aria-hidden="true">
        <img src={dashboardBg} alt="" className="product-backdrop-image" />
      </div>

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

      <main className="product-content" aria-hidden="true" />

      <MiniChatbot theme={theme} onOpenChange={setIsChatOpen} />
    </div>
  )
}
