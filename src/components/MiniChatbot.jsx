import { useEffect, useRef, useState } from 'react'
import iconSvg from '../assets/icon.svg'
import logoSvg from '../assets/logo.svg'
import DitherCanvas from './DitherCanvas'
import { generateResponse } from '../fakeResponses'
import './MiniChatbot.css'

const baseThreads = {
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

const threadLibrary = {
  policy: 'Policy',
  insight: 'Insight',
  hybrid: 'Hybrid',
}

const threadGroups = [
  { title: 'Models', ids: ['policy', 'insight', 'hybrid'] },
]

const quickActions = [
  'Design a pilot rollout for Patchwork',
  'Suggest a secure RAG architecture for internal docs',
  'Estimate cost for 50k daily requests',
  'List enterprise guardrails before launch',
]

const emptyMessages = []

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="mini-chatbot-highlight">
          {part.slice(2, -2)}
        </span>
      )
    }

    if (part.includes('\n')) {
      return part.split('\n').map((line, lineIndex, lines) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))
    }

    return part
  })
}

export default function MiniChatbot({ theme = 'dark', onOpenChange = () => {} }) {
  const [threads, setThreads] = useState(baseThreads)
  const [activeThread, setActiveThread] = useState('policy')
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chatBodyRef = useRef(null)
  const typingTimerRef = useRef(null)
  const sequenceRef = useRef(1000)

  const messages = threads[activeThread] ?? emptyMessages

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages, isTyping, isOpen])

  useEffect(() => () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (sidebarOpen) {
          setSidebarOpen(false)
        } else {
          setIsOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, sidebarOpen])

  useEffect(() => {
    onOpenChange(isOpen)
  }, [isOpen, onOpenChange])

  const nextId = () => {
    sequenceRef.current += 1
    return sequenceRef.current
  }

  const openAssistant = () => {
    setIsOpen(true)
    setSidebarOpen(false)
  }

  const closeAssistant = () => {
    setIsOpen(false)
    setSidebarOpen(false)
  }

  const handleSend = (forcedText) => {
    const trimmed = (forcedText ?? input).trim()
    if (!trimmed || isTyping) return

    const activeMessages = threads[activeThread] ?? emptyMessages
    const userMsg = { id: nextId(), sender: 'user', text: trimmed }

    setThreads((prev) => ({
      ...prev,
      [activeThread]: [...activeMessages, userMsg],
    }))
    setInput('')
    setIsTyping(true)

    typingTimerRef.current = setTimeout(() => {
      const response = generateResponse(trimmed)
      const aiMsg = {
        id: nextId(),
        sender: 'ai',
        label: response.label,
        text: response.text,
      }

      setThreads((prev) => ({
        ...prev,
        [activeThread]: [...(prev[activeThread] ?? emptyMessages), aiMsg],
      }))
      setIsTyping(false)
      typingTimerRef.current = null
    }, 1400)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const selectThread = (threadId) => {
    setActiveThread(threadId)
    setSidebarOpen(false)
  }

  const getThreadName = (threadId) => {
    return threadLibrary[threadId] ?? 'Chat'
  }

  return (
    <div className="mini-chatbot">
      <button
        className={`mini-chatbot-fab${isOpen ? ' is-open' : ''}`}
        onClick={isOpen ? closeAssistant : openAssistant}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        ) : (
          <img src={iconSvg} alt="" className="mini-chatbot-fab-icon" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="mini-chatbot-modal" role="dialog" aria-modal="true" aria-label="Chatbot">
            {sidebarOpen && (
              <button
                className="mini-chatbot-sidebar-overlay"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close chat navigation"
              />
            )}

            <div className="mini-chatbot-window">
              <aside className={`mini-chatbot-sidebar${sidebarOpen ? ' open' : ''}`}>
                <div className="mini-chatbot-brand">
                  <img src={logoSvg} alt="Patchwork" className="mini-chatbot-brand-logo" />
                </div>

                <div className="mini-chatbot-nav">
                  {threadGroups.map((group) => (
                    <div key={group.title} className="mini-chatbot-nav-section">
                      <span className="mini-chatbot-nav-label">{group.title}</span>
                      {group.ids.map((threadId) => (
                        <button
                          key={threadId}
                          className={`mini-chatbot-thread${activeThread === threadId ? ' active' : ''}`}
                          onClick={() => selectThread(threadId)}
                        >
                          {getThreadName(threadId)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </aside>

              <section className="mini-chatbot-main">
                <div className="mini-chatbot-main-bg">
                  <DitherCanvas theme={theme} />
                </div>

                <header className="mini-chatbot-header">
                  <div className="mini-chatbot-header-left">
                    <button
                      className="mini-chatbot-menu"
                      onClick={() => setSidebarOpen(true)}
                      aria-label="Open chat navigation"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                      </svg>
                    </button>

                    <div>
                      <div className="mini-chatbot-title">{getThreadName(activeThread)}</div>
                    </div>
                  </div>

                  <button className="mini-chatbot-close" onClick={closeAssistant} aria-label="Close chatbot">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </header>

                <div className="mini-chatbot-body" ref={chatBodyRef}>
                  {messages.map((message) => (
                    <div key={message.id} className={`mini-chatbot-message${message.sender === 'user' ? ' is-user' : ''}`}>
                      <div className="mini-chatbot-message-content">
                        <div
                          className={`mini-chatbot-bubble${
                            message.sender === 'user' ? ' is-user' : ' is-ai'
                          }`}
                        >
                          {renderText(message.text)}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="mini-chatbot-message">
                      <div className="mini-chatbot-message-content">
                        <div className="mini-chatbot-bubble is-ai is-typing">
                          <span className="mini-typing">
                            <span className="mini-dot" />
                            <span className="mini-dot" />
                            <span className="mini-dot" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <footer className="mini-chatbot-composer">
                  <div className="mini-chatbot-quick-actions">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        className="mini-chatbot-chip"
                        onClick={() => handleSend(action)}
                        disabled={isTyping}
                      >
                        {action}
                      </button>
                    ))}
                  </div>

                  <div className="mini-chatbot-input-row">
                    <textarea
                      className="mini-chatbot-input"
                      placeholder="Ask about rollout, architecture, guardrails, costs, or evaluation..."
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isTyping}
                      rows={1}
                    />
                    <button className="mini-chatbot-send" onClick={() => handleSend()} disabled={isTyping}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </div>
                </footer>
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
