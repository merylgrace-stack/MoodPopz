import { useState, useRef, useEffect } from 'react'

const KEYWORDS = {
    distress: ['die', 'kill', 'suicide', 'hurt myself', 'end it', 'give up', 'hopeless', 'worthless', 'pain', 'dead'],
    sad: ['sad', 'lonely', 'cry', 'crying', 'unhappy', 'down', 'depressed', 'blue', 'tears'],
    anxious: ['anxious', 'scared', 'worry', 'worried', 'panic', 'stress', 'stressed', 'nervous', 'overwhelm'],
    tired: ['tired', 'exhausted', 'sleep', 'sleepy', 'drained', 'fatigue', 'bed'],
    happy: ['happy', 'good', 'great', 'better', 'okay', 'fine', 'thanks', 'thank you', 'cool']
}

const RESPONSES = {
    default: [
        "I hear you. Tell me more about that?",
        "That sounds heavy. I'm here to listen.",
        "It's okay to feel this way. How does that feel in your body?",
        "I'm listening. Take your time.",
        "You're not alone in this.",
        "Breathe with me. In... and out...",
        "Sending you a virtual hug. 🫂"
    ],
    sad: [
        "I'm so sorry you're feeling low. It's okay to let the tears come.",
        "Sadness is a heavy blanket. Can you do one tiny nice thing for yourself today?",
        "You are worthy of love, even when you're sad.",
        "It's brave of you to share that. I'm here."
    ],
    anxious: [
        "That sounds overwhelmingly stressful. Let's take a deep breath together.",
        "Anxiety is a liar. You are safe right now.",
        "Focus on your feet on the floor. You are here. You are safe.",
        "One small step at a time. What's one tiny thing you can control right now?"
    ],
    tired: [
        "Rest is productive. It's okay to do nothing.",
        "Your body knows what it needs. Listen to it.",
        "Can you close your eyes for just 1 minute?",
        "Be gentle with yourself. You've been carrying a lot."
    ],
    happy: [
        "I'm so glad to hear that! 💛",
        "That's wonderful! Hold onto that feeling.",
        "Yay! Small wins matter.",
        "You deserve to feel good."
    ],
    safety: [
        "I can hear how much pain you're in. Please remember that you don't have to carry this alone. Talking to a professional can help light up the path forward. 🕯️",
        "I'm concerned about how heavy things feel for you. A therapist can provide a safe space to unpack this weight. 💛",
        "It sounds like you're carrying the world on your shoulders. Professional support is a sign of strength, not weakness. 🌿"
    ],
    crisis: [
        "I am just a bot, but your life matters deeply. Please reach out for human help immediately.",
        "Please call or text 988 (in the US) or your local emergency number right now.",
        "You are important. Please stay. Reach out to a crisis line provided below."
    ]
}

export function useAIChat() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [distressCount, setDistressCount] = useState(0)

    const sendMessage = async (userMessage) => {
        setLoading(true)

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])

        // Simulate network delay
        setTimeout(() => {
            const lowerMsg = userMessage.toLowerCase()
            let response = ""

            // Determine response logic
            // Check for CRISIS keywords first
            const isCrisis = KEYWORDS.distress.some(k => lowerMsg.includes(k) && (k.includes('die') || k.includes('suicide') || k.includes('kill')))

            if (isCrisis) {
                response = RESPONSES.crisis[Math.floor(Math.random() * RESPONSES.crisis.length)]
                // Force high distress so future messages stay safe
                setDistressCount(100)
            } else {
                // Check for general Distress/Negative keywords
                const isDistressed = KEYWORDS.distress.some(k => lowerMsg.includes(k)) ||
                    KEYWORDS.sad.some(k => lowerMsg.includes(k)) ||
                    KEYWORDS.anxious.some(k => lowerMsg.includes(k))

                let currentCount = distressCount
                if (isDistressed) {
                    currentCount += 1
                    setDistressCount(currentCount)
                }

                // Logic based on count
                if (currentCount >= 3 && isDistressed) {
                    // 3rd Warning -> Safety Nudge
                    const nudge = RESPONSES.safety[Math.floor(Math.random() * RESPONSES.safety.length)]
                    if (currentCount === 3) {
                        response = "I've noticed you've accumulated a lot of heavy feelings in our chat. " + nudge
                    } else {
                        response = nudge
                    }
                } else if (KEYWORDS.happy.some(k => lowerMsg.includes(k))) {
                    response = RESPONSES.happy[Math.floor(Math.random() * RESPONSES.happy.length)]
                    if (currentCount > 0) setDistressCount(currentCount - 1) // Healing
                } else if (KEYWORDS.tired.some(k => lowerMsg.includes(k))) {
                    response = RESPONSES.tired[Math.floor(Math.random() * RESPONSES.tired.length)]
                } else if (KEYWORDS.anxious.some(k => lowerMsg.includes(k))) {
                    response = RESPONSES.anxious[Math.floor(Math.random() * RESPONSES.anxious.length)]
                } else if (KEYWORDS.sad.some(k => lowerMsg.includes(k))) {
                    response = RESPONSES.sad[Math.floor(Math.random() * RESPONSES.sad.length)]
                } else {
                    // Default response (random from default list)
                    // To avoid repetition, maybe pick one based on length? No, random is fine.
                    response = RESPONSES.default[Math.floor(Math.random() * RESPONSES.default.length)]
                }
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response }])
            setLoading(false)
        }, 1000 + Math.random() * 1000) // 1-2s delay
    }

    const clearChat = () => {
        setMessages([])
        setDistressCount(0)
    }

    return { messages, sendMessage, loading, clearChat }
}
