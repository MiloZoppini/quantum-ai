import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import DitherCanvas from './components/DitherCanvas'
import { generateResponse } from './fakeResponses'
import './App.css'

const initialModelMessages = {
  policy: [
    {
      id: 1,
      sender: 'ai',
      label: 'Policy Model —',
      text: 'Policy model active. I am configured to analyze **regulatory frameworks**, compliance requirements, and governance structures. How can I assist you today?',
    },
  ],
  insight: [
    {
      id: 2,
      sender: 'ai',
      label: 'Insight Model —',
      text: 'Insight model active. I am optimized for **data pattern recognition**, intelligence synthesis, and predictive analytics. What would you like to explore?',
    },
  ],
  hybrid: [
    {
      id: 3,
      sender: 'ai',
      label: 'Hybrid Model —',
      text: 'Hybrid model active. I combine **policy analysis** with **data insights** for comprehensive synthesis across all domains. Ready to process your query.',
    },
  ],
}

function App() {
  const [activeModel, setActiveModel] = useState('policy')
  const [modelChats, setModelChats] = useState(initialModelMessages)
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

  const messages = modelChats[activeModel] ?? []

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
    setModelChats((prev) => ({
      ...prev,
      [activeModel]: [...(prev[activeModel] || []), userMsg],
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
      setModelChats((prev) => ({
        ...prev,
        [activeModel]: [...(prev[activeModel] || []), aiMsg],
      }))
    }, delay)
  }, [activeModel])

  const handleSelectModel = (modelId) => {
    setActiveModel(modelId)
  }

  return (
    <>
      <Sidebar
        activeModel={activeModel}
        onSelectModel={handleSelectModel}
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
