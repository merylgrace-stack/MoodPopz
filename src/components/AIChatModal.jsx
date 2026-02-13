import { useState, useRef, useEffect } from 'react'
import { useAIChat } from '../hooks/useAIChat'
import './AIChatModal.css'

export default function AIChatModal({ isOpen, onClose }) {
    const [input, setInput] = useState('')
    const { messages, sendMessage, loading, error, clearChat } = useAIChat()
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Initial greeting if needed, or just wait for user
        }
        scrollToBottom()
    }, [isOpen, messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const systemPrompt = `You are an empathetic, non-diagnostic listener for a mood regulation app. 
    The user is feeling down or stressed. 
    Validate their feelings. 
    Suggest small, manageable self-care tasks (like drinking water, breathing, stretching). 
    If they mention self-harm or severe distress, strictly provide emergency resources (988 in US, generic international otherwise) and recommend professional help immediately. 
    Keep responses short (<150 words), warm, and supportive. Do not act as a doctor.`

        sendMessage(input, systemPrompt)
        setInput('')
    }

    if (!isOpen) return null

    return (
        <div className="ai-modal-overlay">
            <div className="ai-modal-content">
                <header className="ai-modal-header">
                    <h3>Support Chat 🤖</h3>
                    <button onClick={onClose} className="expect-close-btn">×</button>
                </header>

                <div className="ai-chat-body">
                    {messages.length === 0 && (
                        <div className="ai-empty-state">
                            <p>I'm here to listen. How are you feeling right now?</p>
                            <p className="ai-disclaimer">I am an AI, not a human or doctor. For emergencies, please call 988.</p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`ai-message ${msg.role}`}>
                            <div className="ai-message-bubble">
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="ai-message assistant">
                            <div className="ai-message-bubble typing">...</div>
                        </div>
                    )}

                    {error && <div className="ai-error">Error: {error}</div>}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="ai-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading || !input.trim()}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}
