import './Sidebar.css'

const recentThreads = [
  'Neural Architecture Analysis',
  'Entropy Reduction Logs',
  'Signal-to-Noise Ratio',
  'Predictive Modeling v2',
]

const instances = ['SF-Main-Cluster', 'Berlin-Edge-01']

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Quantum© AI</div>

      <div className="sidebar-nav">
        <a href="#" className="nav-item new-synthesis">+ New Synthesis</a>

        <span className="label">Recent Threads —</span>
        {recentThreads.map((thread) => (
          <a href="#" className="nav-item" key={thread}>{thread}</a>
        ))}

        <span className="label">Instances —</span>
        {instances.map((instance) => (
          <a href="#" className="nav-item" key={instance}>{instance}</a>
        ))}
      </div>

      <div className="footer-sidebar">
        <a href="#" className="nav-item">User Profile</a>
        <a href="#" className="nav-item">System Status: Active</a>
      </div>
    </aside>
  )
}
