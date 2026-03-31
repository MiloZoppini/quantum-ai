import { useEffect, useRef, useState } from 'react'
import iconSvg from '../assets/icon.svg'
import logoSvg from '../assets/logo.svg'
import DitherCanvas from './DitherCanvas'
import { generateResponse } from '../fakeResponses'
import './MiniChatbot.css'

const baseThreads = {
  default: [
    {
      id: 1,
      sender: 'ai',
      label: 'Solution Architect',
      text: 'I can help with rollout planning, guardrails, model selection, retrieval architecture, and cost sizing for the Patchwork platform.',
    },
    {
      id: 2,
      sender: 'user',
      text: 'We need a practical pilot for enterprise knowledge search.',
    },
    {
      id: 3,
      sender: 'ai',
      label: 'Pilot Plan',
      text: 'For a strong first pilot I would start with one internal use case, one trusted document corpus, and tight evaluation criteria.\n\n• Use case: support knowledge retrieval for internal agents\n• Scope: 5k to 20k vetted documents\n• Success metrics: answer quality, citation accuracy, and time saved per case\n• Rollout: 2-week sandbox, 2-week shadow mode, then restricted production\n\nIf you want, I can turn this into a full implementation checklist.',
    },
  ],
  architecture: [
    {
      id: 10,
      sender: 'ai',
      label: 'Architecture Review',
      text: 'This thread is focused on architecture decisions for enterprise AI assistants.',
    },
    {
      id: 11,
      sender: 'user',
      text: 'What stack would you use for a secure internal assistant over company docs?',
    },
    {
      id: 12,
      sender: 'ai',
      label: 'Reference Stack',
      text: 'I would use a standard RAG stack with strict permissions.\n\n• Ingestion: scheduled document sync with metadata tagging\n• Retrieval: hybrid search with chunking tuned for policy and handbook docs\n• Generation: grounded answers with citations only\n• Security: SSO, role-aware filtering, audit logs, and prompt injection defenses\n• Operations: offline eval set plus weekly review of failed answers',
    },
  ],
  guardrails: [
    {
      id: 20,
      sender: 'ai',
      label: 'Security Review',
      text: 'This thread is tracking guardrails and compliance constraints for the deployment.',
    },
    {
      id: 21,
      sender: 'user',
      text: 'What guardrails do we need before exposing this to employees?',
    },
    {
      id: 22,
      sender: 'ai',
      label: 'Guardrail Checklist',
      text: 'Before launch I would require these controls.\n\n• Role-based document filtering at retrieval time\n• Redaction for secrets, PII, and credentials in indexed content\n• Response policies for legal, HR, and security-sensitive topics\n• Citation requirement for factual answers\n• Full audit logs for prompts, retrieval sources, and final responses',
    },
  ],
  economics: [
    {
      id: 30,
      sender: 'ai',
      label: 'Cost Modeling',
      text: 'This thread is estimating the financial profile of a production rollout.',
    },
    {
      id: 31,
      sender: 'user',
      text: 'How would you estimate cost for 50,000 requests per day?',
    },
    {
      id: 32,
      sender: 'ai',
      label: 'Sizing Approach',
      text: 'I would break it into input tokens, output tokens, retrieval cost, and platform overhead.\n\n• Traffic model: average prompt size, average answer size, peak concurrency\n• Retrieval: vector storage, reranking, and cache hit rate\n• Reliability: retries and fallback model usage\n• Optimization: prompt compression, response caching, and tiered models\n\nWith those assumptions, I can produce a monthly operating estimate and a cheaper fallback plan.',
    },
  ],
  rollout: [
    {
      id: 40,
      sender: 'ai',
      label: 'Rollout Planning',
      text: 'This thread is focused on staging and adoption strategy.',
    },
    {
      id: 41,
      sender: 'user',
      text: 'How should we phase the rollout across teams?',
    },
    {
      id: 42,
      sender: 'ai',
      label: 'Deployment Strategy',
      text: 'I would phase it in three waves.\n\n• Wave 1: one high-signal team with clear workflows and fast feedback\n• Wave 2: broaden to adjacent teams after evaluating failure patterns\n• Wave 3: company-wide release with documentation, office hours, and usage monitoring\n\nThe key is to keep approval gates between waves rather than launching everywhere at once.',
    },
  ],
  infra: [
    {
      id: 50,
      sender: 'ai',
      label: 'Platform Ops',
      text: 'Infra thread active. I can help with regions, uptime targets, rate limits, and fallback paths.',
    },
  ],
  evaluation: [
    {
      id: 60,
      sender: 'ai',
      label: 'Evaluation',
      text: 'Evaluation thread active. I can help define groundedness checks, human review loops, and offline benchmarks.',
    },
  ],
}

const threadLibrary = {
  default: 'Pilot Strategy',
  architecture: 'Architecture',
  guardrails: 'Guardrails',
  economics: 'Cost Model',
  rollout: 'Rollout Plan',
  infra: 'Infrastructure',
  evaluation: 'Evaluation',
}

const threadGroups = [
  { title: 'Workstreams', ids: ['default', 'architecture', 'guardrails', 'economics', 'rollout'] },
  { title: 'Operations', ids: ['infra', 'evaluation'] },
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
  const [activeThread, setActiveThread] = useState('default')
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chatBodyRef = useRef(null)
  const typingTimerRef = useRef(null)
  const sequenceRef = useRef(1000)

  const messages = threads[activeThread] ?? emptyMessages
  const liveThreads = Object.keys(threads).filter((threadId) => threadId.startsWith('new-'))

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

  const handleNewThread = () => {
    const threadId = `new-${nextId()}`
    const starterMessage = {
      id: nextId(),
      sender: 'ai',
      label: 'Working Session',
      text: 'New session ready. Ask for architecture, rollout, costs, guardrails, or evaluation and I will structure the plan clearly.',
    }

    setThreads((prev) => ({
      ...prev,
      [threadId]: [starterMessage],
    }))
    setActiveThread(threadId)
    setSidebarOpen(false)
  }

  const selectThread = (threadId) => {
    setActiveThread(threadId)
    setSidebarOpen(false)
  }

  const getThreadName = (threadId) => {
    if (threadLibrary[threadId]) {
      return threadLibrary[threadId]
    }

    const position = liveThreads.indexOf(threadId)
    if (position >= 0) {
      return `New Chat ${position + 1}`
    }

    return 'Chat'
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

                <button className="mini-chatbot-new" onClick={handleNewThread}>
                  + New Chat
                </button>

                <div className="mini-chatbot-nav">
                  {liveThreads.length > 0 && (
                    <div className="mini-chatbot-nav-section">
                      <span className="mini-chatbot-nav-label">Recent</span>
                      {liveThreads.map((threadId) => (
                        <button
                          key={threadId}
                          className={`mini-chatbot-thread${activeThread === threadId ? ' active' : ''}`}
                          onClick={() => selectThread(threadId)}
                        >
                          {getThreadName(threadId)}
                        </button>
                      ))}
                    </div>
                  )}

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
