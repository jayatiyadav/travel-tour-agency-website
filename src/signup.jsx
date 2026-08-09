import { useState } from "react";
import "./login.css";

function Signup({ onClose, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    // Check empty fields
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed.");
        return;
      }

      alert("Account created successfully 🎉");

      // Close signup window
      onClose();

      // Open login window
      

    } catch (error) {
      console.error("Signup Error:", error);

      alert(
        "Error: " + error.message
      );
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="login-input"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          className="login-btn"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="signup-text">
          Already have an account?{" "}
          <span onClick={onLogin}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;