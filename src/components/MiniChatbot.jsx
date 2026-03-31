import { useState, useRef, useEffect } from 'react'
import iconSvg from '../assets/icon.svg'
import { generateResponse } from '../fakeResponses'
import './MiniChatbot.css'

const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    text: 'Hi! How can I help you explore Quantum today?',
  },
]

export default function MiniChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatBodyRef = useRef(null)

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    const userMsg = { id: Date.now(), sender: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const delay = 800 + Math.random() * 1500
    setTimeout(() => {
      const response = generateResponse(trimmed)
      // Keep mini chatbot responses short
      const shortText = response.text.split('\n\n')[0]
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: shortText }
      setIsTyping(false)
      setMessages((prev) => [...prev, aiMsg])
    }, delay)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="mini-chatbot">
      {isOpen && (
        <div className="mini-chatbot-window">
          <div className="mini-chatbot-header">
            <div className="mini-chatbot-header-left">
              <img src={iconSvg} alt="" className="mini-chatbot-avatar" />
              <div>
                <div className="mini-chatbot-title">Quantum Assistant</div>
                <div className="mini-chatbot-status">Online</div>
              </div>
            </div>
            <button className="mini-chatbot-close" onClick={() => setIsOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mini-chatbot-body" ref={chatBodyRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`mini-msg ${msg.sender === 'user' ? 'mini-msg-user' : 'mini-msg-ai'}`}>
                {msg.sender === 'ai' && (
                  <img src={iconSvg} alt="" className="mini-msg-avatar" />
                )}
                <div className={`mini-msg-bubble ${msg.sender === 'user' ? 'mini-bubble-user' : 'mini-bubble-ai'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mini-msg mini-msg-ai">
                <img src={iconSvg} alt="" className="mini-msg-avatar" />
                <div className="mini-msg-bubble mini-bubble-ai">
                  <span className="mini-typing">
                    <span className="mini-dot" />
                    <span className="mini-dot" />
                    <span className="mini-dot" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mini-chatbot-input">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button className="mini-send-btn" onClick={handleSend} disabled={isTyping}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button className="mini-chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <img src={iconSvg} alt="Chat" className="mini-fab-icon" />
        )}
      </button>
    </div>
  )
}
