import "./login.css";

function Login({ onClose }) {
  return (
    <div className="login-overlay">
      <div className="login-modal">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />

        <button className="login-btn">
          Login
        </button>

        <p className="signup-text">
          Don't have an account? <span>Sign Up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;