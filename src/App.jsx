import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import DitherCanvas from './components/DitherCanvas'
import { generateResponse } from './fakeResponses'
import './App.css'

const EMPTY_MESSAGES = []

const threadData = {
  default: [
    {
      id: 1,
      sender: 'ai',
      label: 'Quantum Core Logic —',
      text: 'How can I assist with your enterprise data synthesis today? I am ready to transform **unstructured chaos** into linear logic across your neural architecture.',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Analyze the current signal-to-noise ratio in the San Francisco cluster and suggest automated entropy reduction parameters.',
    },
    {
      id: 3,
      sender: 'ai',
      label: 'Neural Architecture —',
      text: 'Analysis complete. The SF-Main-Cluster is currently processing **40TB of visual data per second**.\n\nI recommend the following entropy reduction protocol:\n\n• Initialize military-grade AES-256 wrapping for outgoing signal packets.\n• Apply predictive model v2.4 to the static noise layer.\n• Restructure invisible data streams using scaffolding-alpha.\n\nSystem Status: Active. Deployment ready.',
    },
  ],
  neural: [
    {
      id: 10,
      sender: 'ai',
      label: 'Neural Architecture —',
      text: 'Neural architecture analysis session loaded. The current topology consists of **14 interconnected layers** with a total of 2.3 billion active parameters.',
    },
    {
      id: 11,
      sender: 'user',
      text: 'What is the current throughput of the primary inference pipeline?',
    },
    {
      id: 12,
      sender: 'ai',
      label: 'Deep Analysis —',
      text: 'The primary inference pipeline is processing **12,400 requests/second** with an average latency of **3.2ms**.\n\n• GPU utilization: 78%\n• Memory bandwidth: 1.8TB/s\n• Queue depth: Nominal\n\nNo bottlenecks detected in the current configuration.',
    },
  ],
  entropy: [
    {
      id: 20,
      sender: 'ai',
      label: 'Entropy Module —',
      text: 'Entropy reduction log initialized. Displaying last **48 hours** of noise filtering activity.',
    },
    {
      id: 21,
      sender: 'user',
      text: 'Show me the entropy levels for the Berlin edge node.',
    },
    {
      id: 22,
      sender: 'ai',
      label: 'Signal Processing —',
      text: 'Berlin-Edge-01 entropy levels over the past 48 hours:\n\n• T-48h: **0.847** (elevated)\n• T-24h: **0.623** (stabilizing)\n• T-0h: **0.412** (nominal)\n\nThe adaptive filtering algorithm reduced noise by **51.3%** during this period. Current signal clarity is within acceptable thresholds.',
    },
  ],
  signal: [
    {
      id: 30,
      sender: 'ai',
      label: 'Signal Processing —',
      text: 'Signal-to-noise ratio monitoring active. Currently tracking **7 data channels** across all clusters.',
    },
    {
      id: 31,
      sender: 'user',
      text: 'Compare SNR between SF and Berlin clusters.',
    },
    {
      id: 32,
      sender: 'ai',
      label: 'Synthesis Engine —',
      text: 'Comparative SNR analysis:\n\n**SF-Main-Cluster:**\n• SNR: 42.7 dB\n• Channel quality: Excellent\n• Packet loss: 0.001%\n\n**Berlin-Edge-01:**\n• SNR: 38.2 dB\n• Channel quality: Good\n• Packet loss: 0.003%\n\nSF cluster maintains a **4.5 dB advantage** due to proximity to primary data sources. Recommend deploying signal amplification on Berlin node.',
    },
  ],
  predictive: [
    {
      id: 40,
      sender: 'ai',
      label: 'Predictive Matrix —',
      text: 'Predictive Modeling v2 workspace loaded. The current model has been trained on **890 million data points** with a validation accuracy of **96.7%**.',
    },
    {
      id: 41,
      sender: 'user',
      text: 'Run a 30-day forecast on compute demand.',
    },
    {
      id: 42,
      sender: 'ai',
      label: 'Predictive Matrix —',
      text: 'Forecast complete. 30-day compute demand projection:\n\n• Week 1: **+8%** — Normal growth pattern\n• Week 2: **+15%** — Seasonal data influx expected\n• Week 3: **+22%** — Peak demand period\n• Week 4: **+12%** — Stabilization phase\n\nConfidence interval: **93.4%**. Recommend pre-scaling infrastructure by Week 2 to avoid latency spikes.',
    },
  ],
  sf: [
    {
      id: 50,
      sender: 'ai',
      label: 'Quantum Core Logic —',
      text: 'Connected to **SF-Main-Cluster**. All systems operational.\n\n• Nodes online: 247 / 250\n• Data throughput: 40TB/s\n• Uptime: 99.9997%\n• Temperature: 18.3°C\n\n3 nodes are in scheduled maintenance. Expected return: 02:00 UTC.',
    },
  ],
  berlin: [
    {
      id: 60,
      sender: 'ai',
      label: 'Quantum Core Logic —',
      text: 'Connected to **Berlin-Edge-01**. Operating in edge processing mode.\n\n• Nodes online: 64 / 64\n• Data throughput: 12TB/s\n• Uptime: 99.98%\n• Temperature: 16.7°C\n\nAll European data streams are routing through this node. Latency to SF-Main: **34ms**.',
    },
  ],
}

function App() {
  const [activeThread, setActiveThread] = useState('default')
  const [threads, setThreads] = useState(threadData)
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'purple' ? 'purple' : '')
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'purple' : 'dark'))
  }

  const messages = threads[activeThread] ?? EMPTY_MESSAGES

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = useCallback((text) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
    }
    setThreads((prev) => ({
      ...prev,
      [activeThread]: [...(prev[activeThread] || []), userMsg],
    }))
    setIsTyping(true)

    const delay = 1000 + Math.random() * 2000
    setTimeout(() => {
      const response = generateResponse(text)
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        label: response.label,
        text: response.text,
      }
      setIsTyping(false)
      setThreads((prev) => ({
        ...prev,
        [activeThread]: [...(prev[activeThread] || []), aiMsg],
      }))
    }, delay)
  }, [activeThread])

  const handleNewChat = () => {
    const newId = 'new-' + Date.now()
    setThreads((prev) => ({
      ...prev,
      [newId]: [
        {
          id: Date.now(),
          sender: 'ai',
          label: 'Quantum Core Logic —',
          text: 'New synthesis session initialized. All neural pathways are clear and ready for processing. What would you like to explore?',
        },
      ],
    }))
    setActiveThread(newId)
  }

  const handleSelectThread = (threadId) => {
    setActiveThread(threadId)
  }

  return (
    <>
      <Sidebar
        activeThread={activeThread}
        onSelectThread={handleSelectThread}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main-area">
        <DitherCanvas theme={theme} />
        <Header theme={theme} onToggleTheme={handleToggleTheme} onMenuOpen={() => setSidebarOpen(true)} />

        <div className="chat-container" ref={chatRef}>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} sender={msg.sender} label={msg.label}>
              {renderText(msg.text)}
            </ChatMessage>
          ))}
          {isTyping && (
            <ChatMessage sender="ai">
              <span className="typing-indicator">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </span>
            </ChatMessage>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </main>
    </>
  )
}

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="highlight">
          {part.slice(2, -2)}
        </span>
      )
    }
    if (part.includes('\n')) {
      return part.split('\n').map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ))
    }
    return part
  })
}

export default App
