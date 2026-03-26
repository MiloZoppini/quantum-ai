import logoSvg from '../assets/logo.svg'
import './Header.css'

export default function Header() {
  return (
    <header className="main-header">
      <img src={logoSvg} alt="Patchwork" className="header-logo" />
      <div className="header-actions">
        <a href="#" className="btn-pill">Deploy Instance ⊕</a>
        <a href="#" className="btn-pill">White Paper</a>
      </div>
    </header>
  )
}
