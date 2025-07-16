import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

// The base URL of YOUR NestJS backend server.
// This is the ONLY server the frontend will talk to.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Change if your NestJS backend runs on a different port

/**
 * A dedicated, clean function for calling your backend's chat API.
 * It sends only the user's query and expects a consistent response format.
 * @param {string} query The user's message.
 * @returns {Promise<{success: boolean, reply: string}>} A promise that resolves to an object with the AI's reply.
 */
const callChatApi = async (query: string): Promise<{ success: boolean; reply: string }> => {
    try {
        // We only need to send the customer's query.
        // The backend handles the product list, refund policy, and all other business logic.
        const response = await axios.post(`${API_BASE_URL}/chat`, { // Assumes a '/chat' endpoint in your NestJS app
            customerQuery: query,
        });

        // We expect the backend to always return data in a consistent format.
        // For example: { success: true, reply: "Your order is on its way." }
        return response.data;

    } catch (error) {
        console.error("Error calling chat API:", error);
        // If the API call fails, return a standardized error message.
        return { 
            success: false, 
            reply: "Sorry, I'm having trouble connecting to the support service right now. Please try again later." 
        };
    }
};

const ChatWidget = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "ai", text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // This removes the dangerous and inefficient `useEffect` that was fetching
  // the entire product list and exposing your API keys.

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { from: "user" as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput(""); // Clear input immediately for better UX

    // Call our clean, secure, and simple API function
    const res = await callChatApi(input);

    // The backend now guarantees a clean response object.
    // The complex and brittle parsing logic is no longer needed.
    const aiMessage = { 
        from: "ai" as const, 
        text: res.reply || "Sorry, I couldn't process that. Could you please rephrase?" 
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .chat-widget-container {
        position: relative;
        z-index: 1001;
      }

      .chat-widget-container::before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 2px;
        background: linear-gradient(270deg, #ff3c3c, #3c8eff, #ff3cff);
        background-size: 600% 600%;
        animation: move-border 5s linear infinite;
        border-radius: 16px;
        pointer-events: none; /* This line makes the border layer non-interactive */
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
      }

      @keyframes move-border {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 100% 50%;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);



  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
          background: "linear-gradient(135deg,rgb(246, 244, 243) 60%, #60a5fa 100%)",
          color: "#1e293b",
          borderRadius: "50%",
          width: 50,
          height: 50,
          fontSize: 28,
          boxShadow: "0 4px 16px rgba(96,165,250,0.18)",
          border: " 1px solid rgb(171, 200, 250)",
          cursor: "pointer",
          transition: "box-shadow 0.2s",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Open chat"
        title="Chat with support"
      >
        <Image 
          src="/white_chat_icon.png" 
          alt="Chat Icon" 
          width={36}
          height={36}
          style={{ objectFit: 'contain' }}
        />
      </button>

      {/* Chat Widget */}
      {open && (

        <div 
          style={{
            position: "fixed",
            bottom: 104,
            right: 32,
            width: 360,
            height: '70vh',
            maxHeight: 520,
            background: "white",
            borderRadius: 16,
            border: " 1px solid rgba(196, 215, 248, 1)",
            boxShadow: "0 8px 32px rgba(30,64,175,0.18)",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            // border: "1px solid #e5e7eb"
          }}
        >

          {/* {spinning border} */}
          <div className="chat-widget-container" 
            style={{
              position: "fixed",
              bottom: 104,
              right: 32,
              width: 360,
              height: '70vh',
              maxHeight: 520,
              background: "transparent",
              borderRadius: 16,
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
          >
        
          {/* Header */}
          <div style={{
            padding: "18px 20px",
            borderBottom: "1px solid #e5e7eb",
            background: "linear-gradient(135deg,rgb(139, 184, 238) 30%,rgb(207, 115, 115) 100%)",
            color: "white",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 0.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>AI Chat Support</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                color: "white",
                fontSize: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Close chat"
              title="Close"
            >×</button>
          </div>
          
          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: "18px 16px",
            overflowY: "auto",
            background: "#f3f4f6",
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}>
            {messages.length === 0 && (
              <div style={{ color: "#6b7280", textAlign: "center", marginTop: 32, fontSize: 15 }}>
                👋 Hey! I'm Jarvis. I can help with order status, product questions, and more.
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    background: msg.from === "user"
                      ? "linear-gradient(90deg, #2563eb 100%,rgb(53, 164, 179) 100%)"
                      : "#e5e7eb",
                    color: msg.from === "user" ? "white" : "#1e293b",
                    borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "10px 14px",
                    maxWidth: "80%",
                    fontSize: 15,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    wordBreak: "break-word"
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ background: "#e5e7eb", color: "#1e293b", borderRadius: "16px 16px 16px 4px", padding: "10px 14px" }}>
                        ...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: "14px 16px",
            borderTop: "1px solid #e5e7eb",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              // onKeyDown={e => e.key === "Enter" && sendMessage()}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  sendMessage();
                } else if (e.key === "Enter" && e.shiftKey) {
                  setInput(input + "");
                }
              }}
              disabled={loading}
              placeholder="Type your message…"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 15,
                outline: "none",
                background: "#f9fafb",
                height:50,
                lineHeight:1.2,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 18px",
                background: "linear-gradient(90deg, #2563eb 80%, #1e40af 100%)",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: 15,
                opacity: loading || !input.trim() ? 0.7 : 1,
                transition: "opacity 0.2s"
              }}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default ChatWidget;