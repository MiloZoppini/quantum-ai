import iconSvg from '../assets/icon.svg'
import './ChatMessage.css'

export default function ChatMessage({ sender, label, children }) {
  const isUser = sender === 'user'

  return (
    <div className={`message-wrap${isUser ? ' user-row' : ''}`}>
      <div className={`avatar${isUser ? '' : ' ai'}`}>
        {isUser ? 'U' : <img src={iconSvg} alt="" className="avatar-icon" />}
      </div>
      <div className="message-content">
        {label && <span className="label" style={{ marginTop: 0 }}>{label}</span>}
        {children}
      </div>
    </div>
  )
}
