import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import DitherCanvas from './components/DitherCanvas'
import { generateResponse } from './fakeResponses'
import './App.css'

const initialMessages = [
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
]

function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
    }
    setMessages((prev) => [...prev, userMsg])
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
      setMessages((prev) => [...prev, aiMsg])
    }, delay)
  }

  return (
    <>
      <Sidebar />
      <main className="main-area">
        <DitherCanvas />
        <Header />

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
