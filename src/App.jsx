import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import DitherCanvas from './components/DitherCanvas'
import './App.css'

function App() {
  return (
    <>
      <Sidebar />
      <main className="main-area">
        <DitherCanvas />
        <Header />

        <div className="chat-container">
          <ChatMessage sender="ai" label="Quantum Core Logic —">
            How can I assist with your enterprise data synthesis today? I am ready to
            transform <span className="highlight">unstructured chaos</span> into linear
            logic across your neural architecture.
          </ChatMessage>

          <ChatMessage sender="user">
            Analyze the current signal-to-noise ratio in the San Francisco cluster and
            suggest automated entropy reduction parameters.
          </ChatMessage>

          <ChatMessage sender="ai" label="Neural Architecture —">
            Analysis complete. The SF-Main-Cluster is currently processing{' '}
            <span className="highlight">40TB of visual data per second</span>.
            <br /><br />
            I recommend the following entropy reduction protocol:
            <ul style={{ margin: '1rem 0', paddingLeft: '1.5rem' }}>
              <li>Initialize military-grade AES-256 wrapping for outgoing signal packets.</li>
              <li>Apply predictive model v2.4 to the static noise layer.</li>
              <li>Restructure invisible data streams using scaffolding-alpha.</li>
            </ul>
            System Status: Active. Deployment ready.
          </ChatMessage>
        </div>

        <ChatInput />
      </main>
    </>
  )
}

export default App
