"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/../utils/axios';
import email from 'next-auth/providers/email';

const ProfileVerify = () => {

    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setSuccess('');

        try {
            const otpToken = localStorage.getItem('otpToken');
            if (!otpToken) {
                setMessage('No OTP token found. Please try signing up again.');
                setLoading(false);
                return;
            }

            const res = await api.post('/users/otpVerify', {
                otp: otp
            }, {
                headers: {
                    Authorization: `Bearer ${otpToken}`
                }
            });

            setSuccess('OTP verified successfully!');
            setMessage('');
            localStorage.removeItem('otpToken');
            sessionStorage.removeItem('email');
            router.push('/pages/api/auth');
        } catch (error: any) {
            setMessage(error?.response?.data?.message || 'Invalid OTP or expired token.');
        }
        setLoading(false);
    };


    const handleSendOTPAgain = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        setLoading(true);
        setMessage('');
        setSuccess('');
        try {
            
            const userEmail = sessionStorage.getItem('email');
            if (!userEmail) {
                setMessage('No email found. Please try signing up again.');
                setLoading(false);
                return;
            }
            const res = await api.post("/users/otpResend", { email: userEmail });
            localStorage.setItem("otpToken", res.data.otpToken);
            setSuccess("OTP sent again! Please check your email.");
            
        } catch (err: any) {
            setMessage(
                err?.response?.data?.message ||
                "Failed to resend OTP. Please try again."
            );
        }
        setLoading(false);
    };



    return (
        <div style={{
            maxWidth: 420,
            margin: '48px auto',
            padding: '32px 32px 24px 32px',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            background: '#fff'
        }}>
            <h1 style={{ marginBottom: 8, fontWeight: 600, fontSize: 28 }}>Verify Your Email</h1>
            <p style={{ color: '#555', marginBottom: 24 }}>
            Enter the 6-digit code sent to your email address to verify your account.
            </p>
            <form onSubmit={handleSubmit} autoComplete="off">
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: 18,
                border: '1px solid #d0d5dd',
                borderRadius: 8,
                marginBottom: 20,
                letterSpacing: 8,
                textAlign: 'center',
                outline: 'none'
                }}
                required
            />
            <button
                type="submit"
                disabled={loading}
                style={{
                width: '100%',
                padding: '12px 0',
                background: '#2563eb',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                border: 'none',
                borderRadius: 8,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
                }}
            >
                {loading ? 'Verifying...' : 'Verify'}
            </button>
            
            </form>

            {success && (
            <div
                style={{
                marginTop: 20,
                padding: '10px 16px',
                borderRadius: 6,
                background: success ? '#e0f7e9' : '#fdecea',
                color: success ? '#027a48' : '#b42318',
                fontWeight: 500,
                fontSize: 15
                }}
            >
                {success}
            </div>
            )}

            <div style={{ marginTop: 28, textAlign: 'center', color: '#888', fontSize: 14 }}>
                Didn&apos;t receive the code?{' '}
                <button
                type="button"
                style={{ color: '#2563eb', textDecoration: 'underline', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                onClick={handleSendOTPAgain}
                disabled={loading}
                >
                Resend
                </button>
            </div>

        </div>
    );
};

export default ProfileVerify;