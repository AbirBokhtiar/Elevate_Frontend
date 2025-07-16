'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../../utils/axios";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await api.post("/users/signup", { name, email, password });
      // setSuccess("Account created! Redirecting...");
      localStorage.setItem("otpToken", res.data.otpToken);
      sessionStorage.setItem("email", email);
      router.push("/pages/verify");
      // window.location.href = "./verify";
      // setTimeout(() => {
      //   window.location.href = "/pages/auth1";
      // }, timeout=1200);
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Email may already be in use.");
      }
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,rgb(251, 248, 255) 0%,rgb(58, 81, 119) 100%)",
      }}
    >
      <div
        className="signup-card"
        style={{
          background: "rgb(255, 255, 255)",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(30,60,114,0.15)",
          padding: "40px 32px",
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 24,
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
            Create Account
          </h2>
          <p style={{ color: "#6b7280", margin: "8px 0 0 0", fontSize: 15 }}>
            Please sign up to get started
          </p>
        </div>
        <form
          onSubmit={handleSignup}
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
            type="username"
            placeholder="Username"
            value={name}
            required
            onChange={e => setName(e.target.value)}
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
            minLength={6}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            minLength={6}
            onChange={e => setConfirmPassword(e.target.value)}
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
            Sign Up
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
          {success && (
            <div
              style={{
                color: "#059669",
                textAlign: "center",
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              {success}
            </div>
          )}
        </form>
        <div style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
          Already have an account?{" "}
          <a
            href="./auth"
            style={{
              color: "#1e3c72",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}