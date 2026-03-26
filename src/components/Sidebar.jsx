import logoSvg from '../assets/logo.svg'
import './Sidebar.css'

const recentThreads = [
  { id: 'neural', name: 'Neural Architecture Analysis' },
  { id: 'entropy', name: 'Entropy Reduction Logs' },
  { id: 'signal', name: 'Signal-to-Noise Ratio' },
  { id: 'predictive', name: 'Predictive Modeling v2' },
]

const instances = [
  { id: 'sf', name: 'SF-Main-Cluster' },
  { id: 'berlin', name: 'Berlin-Edge-01' },
]

export default function Sidebar({ activeThread, onSelectThread, onNewChat, isOpen, onClose }) {
  const handleSelect = (id) => {
    onSelectThread(id)
    onClose()
  }

  const handleNew = () => {
    onNewChat()
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
          <button className="nav-item new-synthesis" onClick={handleNew}>
            + New Synthesis
          </button>

          <span className="label">Recent Threads —</span>
          {recentThreads.map((thread) => (
            <button
              className={`nav-item${activeThread === thread.id ? ' active' : ''}`}
              key={thread.id}
              onClick={() => handleSelect(thread.id)}
            >
              {thread.name}
            </button>
          ))}

          <span className="label">Instances —</span>
          {instances.map((instance) => (
            <button
              className={`nav-item${activeThread === instance.id ? ' active' : ''}`}
              key={instance.id}
              onClick={() => handleSelect(instance.id)}
            >
              {instance.name}
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
