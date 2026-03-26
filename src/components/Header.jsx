import './Header.css'

export default function Header({ theme, onToggleTheme, onMenuOpen }) {
  return (
    <header className="main-header">
      <button className="menu-btn" onClick={onMenuOpen}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      <div className="header-actions">
        <button className="btn-pill" onClick={onToggleTheme}>
          {theme === 'dark' ? 'Purple Mode' : 'Dark Mode'}
        </button>
        <a href="#" className="btn-pill">Deploy Instance</a>
        <a href="#" className="btn-pill btn-pill-hide-mobile">White Paper</a>
      </div>
    </header>
  )
}
