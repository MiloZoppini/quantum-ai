import './Header.css'

export default function Header() {
  return (
    <header className="main-header">
      <div className="model-label">Model: QUANTUM-4 (Synthesis)</div>
      <div className="header-actions">
        <a href="#" className="btn-pill">Deploy Instance ⊕</a>
        <a href="#" className="btn-pill">White Paper</a>
      </div>
    </header>
  )
}
