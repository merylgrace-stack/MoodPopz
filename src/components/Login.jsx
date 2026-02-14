import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now just go to home page
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Continue your path to peace</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="your@email.com" required />

          <label>Password</label>
          <input type="password" placeholder="••••••••" required />

          <button type="submit">Sign In</button>
        </form>

        <div className="divider">Or continue with</div>

        <div className="socials">
          <button>Google</button>
          <button>Facebook</button>
          <button>Instagram</button>
        </div>
      </div>
    </div>
  );
}