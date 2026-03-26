import iconSvg from '../assets/icon.svg'
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

export default function Sidebar({ activeThread, onSelectThread, onNewChat }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={iconSvg} alt="Patchwork" className="logo-icon" />
      </div>

      <div className="sidebar-nav">
        <button className="nav-item new-synthesis" onClick={onNewChat}>
          + New Synthesis
        </button>

        <span className="label">Recent Threads —</span>
        {recentThreads.map((thread) => (
          <button
            className={`nav-item${activeThread === thread.id ? ' active' : ''}`}
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
          >
            {thread.name}
          </button>
        ))}

        <span className="label">Instances —</span>
        {instances.map((instance) => (
          <button
            className={`nav-item${activeThread === instance.id ? ' active' : ''}`}
            key={instance.id}
            onClick={() => onSelectThread(instance.id)}
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
  )
}
