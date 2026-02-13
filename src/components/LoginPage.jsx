import { useState } from 'react'
import './LoginPage.css'

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignup, setIsSignup] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mock login logic - in real app would call API
        if (email && password) {
            onLogin()
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">MoodPopz</h1>
                <p className="login-subtitle">Your safe space for small steps.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="hello@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        {isSignup ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-divider">or continue with</div>

                <div className="social-login">
                    <button className="social-btn google" onClick={onLogin} aria-label="Continue with Google">G</button>
                    <button className="social-btn facebook" onClick={onLogin} aria-label="Continue with Facebook">f</button>
                    <button className="social-btn instagram" onClick={onLogin} aria-label="Continue with Instagram">In</button>
                </div>

                <p className="auth-switch">
                    {isSignup ? "Already have an account?" : "New here?"}
                    <button onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    )
}
