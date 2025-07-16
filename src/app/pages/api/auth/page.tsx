'use client';

import React, { useState, useEffect } from "react";
import api from "../../../../../utils/axios";
import { useRouter } from "next/navigation";
import {signIn} from 'next-auth/react';
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/users/signin", { email, password });
      // localStorage.setItem("token", res.data.token);
      localStorage.setItem("token", res.data.accessToken);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      // window.location.href = "./home";
      router.push("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const result = await signIn(provider, { callbackUrl: "/pages/home", redirect: true });
      // Optionally handle result here if needed
    } catch (err) {
      setError("Social login failed");
    }
  }

  const handleForgotPassword = async () => {
    setSending(true);
    setMessage('');
    try {
      const res = await api.post('/users/forgotPassword', { email });

      const otpToken = res.data; // token returned from backend
      localStorage.setItem('otpToken', otpToken);
      setMessage('OTP sent to your email');

      router.push('/pages/reset-password');
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Error sending OTP');
    }
    setSending(false);
  };


  return (
    <div
      className="login-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,rgb(236, 236, 236) 0%,rgb(136, 69, 69) 100%)",
      }}
    >
      <div
        className="login-card shadow-2xl m-4"
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(30,60,114,0.15)",
          padding: "40px 32px",
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="flex justify-center mb-2">
            <Link href= "/">
                <img
                src="/elevate.png"
                alt="Logo"
                style={{ width: 100, marginBottom: 12}}
                />
            </Link>
          </div>
          <h2 style={{ margin: 0, color: "#1e3c72", fontWeight: 700 }}>
            Welcome Back
          </h2>
          <p style={{ color: "#6b7280", margin: "8px 0 0 0", fontSize: 15 }}>
            Please sign in to your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={e => (e.target.style.border = "1.5px solid #1e3c72")}
            onBlur={e => (e.target.style.border = "1px solid #d1d5db")}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={e => (e.target.style.border = "1.5px solid #1e3c72")}
            onBlur={e => (e.target.style.border = "1px solid #d1d5db")}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(30,60,114,0.08)",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
          {error && (
            <div
              style={{
                color: "#e11d48",
                textAlign: "center",
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              {error}
            </div>
          )}
        </form>
        <div style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
          Don't have an account?{" "}
          <a
            href="./signup"
            style={{
              color: "#1e3c72",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            Sign up
          </a>
        </div>

        <div style={{ textAlign: "center", fontSize: 14}}>
          <Link onClick={() => setForgotPass(true)} 
            href= "" 
            style={{textDecoration: "underline", color: "#1e3c72"}}>
            Forgot Password
          </Link>
        </div>

        {forgotPass && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(30,34,40,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={() => setForgotPass(false)}
          >
            <div
              style={{
                background: "#fff",
                padding: "2rem 2.2rem",
                borderRadius: 10,
                minWidth: 320,
                boxShadow: "0 2px 16px rgba(30,34,40,0.13)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                position: "relative",
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setForgotPass(false)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "transparent",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#888",
                }}
                aria-label="Close"
                type="button"
              >
                &times;
              </button>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  handleForgotPassword();
                  
                }}
                style={{
                  width: "375px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#1e3c72",
                  }}
                >
                  Forgot Password?
                </h2>
                
                <h3 
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "gray",
                  }}
                >
                  Don't worry - it's easily done! Just enter your email address below and we'll send you an e-mail to reset your password.
                </h3>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.9rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 15,
                    background: "#fff",
                    outline: "none",
                    marginBottom: 6,
                  }}
                  onFocus={e => (e.target.style.border = "1.5px solid #1e3c72")}
                  onBlur={e => (e.target.style.border = "1px solid #d1d5db")}
                />
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 16,
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 0",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(30,60,114,0.08)",
                    transition: "background 0.2s",
                    width: "100%",
                  }}
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send OTP'}
                </button>
                {message && <p>{message}</p>}
              </form>
            </div>
          </div>
        )

        }

        {/* Divider
        <div style={{ textAlign: "center", marginTop: 20, marginBottom: 8 }}>
          <span style={{ color: "#6b7280", fontSize: 14 }}>or continue with</span>
        </div> */}

        {/* Social Login Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => handleSocialLogin("google")}
            style={{
              background: "#fff",
              color: "#000",
              border: "1px solid #d1d5db",
              padding: "10px 0",
              borderRadius: 8,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/googleLogo.png" alt="Google" style={{ width: 20, marginRight: 8, verticalAlign: "middle" }} />
            Continue with Google
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            style={{
              background: "#fff",
              // color: "#fff",
              border: "1px solid #d1d5db",
              padding: "10px 0",
              borderRadius: 8,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/githubLogo.png" alt="GitHub" style={{ width: 25, marginRight: 8, verticalAlign: "middle" }} />
            Continue with GitHub
          </button>
        </div>

        

      </div>
    </div>
  );
}