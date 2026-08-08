import { useState } from "react";
import "./saarthi.css";

function SaarthiAI({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! 🙏 Main  hoon Saarthi AI, aapka apna personal travel assistant. Aap Bharat mein kahin bhi travel plan karna chahte hain?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    const userMessage = {
      sender: "user",
      text: userText
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);
    } catch (error) {
      console.error("Saarthi Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry 😔 Saarthi abhi response nahi de paa raha. Please thodi der baad try karein."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="saarthi-window">

      {/* Header */}
      <div className="saarthi-header">
        <div>
          <h2>🤖 Saarthi AI</h2>
          <span>Your Travel Companion</span>
        </div>

        <button
          className="saarthi-close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      {/* Chat Messages */}
      <div className="saarthi-chat">

        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}`}
          >
            {message.text}
          </div>
        ))}

        {loading && (
          <div className="message bot">
            ✨ Saarthi is planning your trip...
          </div>
        )}

      </div>

      {/* Input */}
      <div className="saarthi-input-area">

        <input
          type="text"
          placeholder="Ask Saarthi about your trip..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          ➤
        </button>

      </div>

    </div>
  );
}

export default SaarthiAI;