import InsightsView from './InsightsView'
import AIChatModal from './AIChatModal'
import { useMoodHistory } from '../hooks/useMoodHistory'

// In MainApp component:
const { history, recordMood, slope } = useMoodHistory()
const [showInsights, setShowInsights] = useState(false)
const [showAIChat, setShowAIChat] = useState(false)
const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '')

// Handle API Key change in settings
const handleApiKeyChange = (key) => {
    setApiKey(key)
    localStorage.setItem('openai_api_key', key)
}

// In handleMoodSelect:
recordMood(mood)

// In render:
if (showInsights) {
    return (
        <>
            <FrequencyWave analyser={analyser} />
            <InsightsView
                history={history}
                slope={slope}
                onBack={() => setShowInsights(false)}
                onTriggerCheckIn={() => setShowAIChat(true)}
            />
            <AIChatModal
                isOpen={showAIChat}
                onClose={() => setShowAIChat(false)}
                apiKey={apiKey}
            />
        </>
    )
}
