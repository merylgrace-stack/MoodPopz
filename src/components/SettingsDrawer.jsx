
import './SettingsDrawer.css'

export default function SettingsDrawer({
  open,
  onClose,
  musicEnabled,
  onMusicToggle,
  frequency,
  onFrequencyChange,
  onLogout,
  onFreshStart,
  onOpenInsights,
  onOpenChat
}) {
  return (
    <>
      <div
        className={`settings-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close settings"
      />
      <aside
        className={`settings-drawer ${open ? 'open' : ''}`}
        aria-label="Settings"
        aria-hidden={!open}
      >
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button
            className="settings-close"
            onClick={onClose}
            aria-label="Close settings"
          >
            ×
          </button>
        </div>
        <div className="settings-body">
          <div className="settings-item">
            <label htmlFor="music-toggle" className="settings-label">
              <span className="settings-icon" aria-hidden>🌊</span>
              Ambient music
            </label>
            <button
              id="music-toggle"
              className={`settings-toggle ${musicEnabled ? 'on' : ''}`}
              onClick={onMusicToggle}
              role="switch"
              aria-checked={musicEnabled}
              aria-label="Toggle ambient music"
            >
              <span className="toggle-track" />
            </button>
          </div>
          {musicEnabled && (
            <div className="settings-item sub-item">
              <label className="settings-label">Frequency</label>
              <div className="settings-freq-toggle">
                <button
                  className={`freq-btn ${frequency === '528Hz' ? 'active' : ''}`}
                  onClick={() => onFrequencyChange('528Hz')}
                >
                  528Hz
                </button>
                <button
                  className={`freq-btn ${frequency === '432Hz' ? 'active' : ''}`}
                  onClick={() => onFrequencyChange('432Hz')}
                >
                  432Hz
                </button>
              </div>
            </div>
          )}

          <div className="settings-divider" />

          <button className="settings-insights-btn" onClick={onOpenInsights}>
            📊 Mood Insights
          </button>

          <button className="settings-insights-btn settings-chat-btn" onClick={onOpenChat}>
            🤖 Chat with Companion
          </button>



          <div className="settings-divider" />
          <div className="settings-item">
            <p className="settings-note">
              <span aria-hidden>♿</span> Reduced motion respects your system preference.
            </p>
          </div>
          <button
            className="settings-fresh"
            onClick={() => {
              if (confirm('Clear all progress and start fresh?')) {
                localStorage.removeItem('moodpop_streak')
                localStorage.removeItem('moodpop_lastCompletedDate')
                localStorage.removeItem('moodpop_totalCompleted')
                localStorage.removeItem('moodpop_history')
                localStorage.removeItem('moodpop_feedback')
                onFreshStart?.()
                onClose()
              }
            }}
          >
            Fresh Start
          </button>
          <button
            className="settings-logout"
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
