import logoSvg from '../assets/logo.svg'
import './Sidebar.css'

const models = [
  { id: 'policy', name: 'Policy' },
  { id: 'insight', name: 'Insight' },
  { id: 'hybrid', name: 'Hybrid' },
]

export default function Sidebar({ activeModel, onSelectModel, isOpen, onClose }) {
  const handleSelect = (id) => {
    onSelectModel(id)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="logo">
          <img src={logoSvg} alt="Patchwork" className="logo-full" />
        </div>

        <div className="sidebar-nav">
          <span className="label">Models —</span>
          {models.map((model) => (
            <button
              className={`nav-item${activeModel === model.id ? ' active' : ''}`}
              key={model.id}
              onClick={() => handleSelect(model.id)}
            >
              {model.name}
            </button>
          ))}
        </div>

        <div className="footer-sidebar">
          <button className="nav-item">User Profile</button>
          <button className="nav-item">System Status: Active</button>
        </div>
      </aside>
    </>
  )
}
