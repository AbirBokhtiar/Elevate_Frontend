"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/../utils/axios';

const ResetPassword = () => {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setSuccess('');
        setPasswordError('');

        try {
            const otpToken = localStorage.getItem('otpToken');
            // const userEmail = localStorage.getItem('otpEmail');
            if (!otpToken) {
                setMessage('No OTP token or email found. Please try signing up again.');
                setLoading(false);
                return;
            }
            // setEmail(userEmail);
            try {
                const res = await api.post('/users/otpVerify', {
                    otp: otp
                }, {
                    headers: {
                        Authorization: `Bearer ${otpToken}`
                    }
                });

                const userEmail = res.data.email;
                localStorage.setItem('otpEmail', userEmail);
                setEmail(userEmail);

            } catch (error: any) {
                setMessage(error?.response?.data?.message || 'Invalid Email or expired token.');
            }

            setSuccess('OTP verified successfully!');
            setMessage('');
            setShowPasswordModal(true);
            // Don't remove token/email yet, needed for password reset
        } catch (error: any) {
            setMessage(error?.response?.data?.message || 'Invalid OTP or expired token.');
        }
        setLoading(false);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordLoading(true);
        setPasswordError('');
        try {
            await api.post('/users/reset-password', {
                email,
                newPassword
            });
            localStorage.removeItem('otpToken');
            localStorage.removeItem('otpEmail');
            setShowPasswordModal(false);
            router.push('/pages/api/auth');
        } catch (error: any) {
            setPasswordError(error?.response?.data?.message || 'Failed to reset password.');
        }
        setPasswordLoading(false);
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
            {message && (
                <div
                    style={{
                        marginTop: 20,
                        padding: '10px 16px',
                        borderRadius: 6,
                        background: '#fdecea',
                        color: '#b42318',
                        fontWeight: 500,
                        fontSize: 15
                    }}
                >
                    {message}
                </div>
            )}
            {success && (
                <div
                    style={{
                        marginTop: 20,
                        padding: '10px 16px',
                        borderRadius: 6,
                        background: '#e0f7e9',
                        color: '#027a48',
                        fontWeight: 500,
                        fontSize: 15
                    }}
                >
                    {success}
                </div>
            )}
            <div style={{ marginTop: 28, textAlign: 'center', color: '#888', fontSize: 14 }}>
                Didn&apos;t receive the code? <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Resend</a>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 10,
                        padding: 32,
                        minWidth: 320,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                    }}>
                        <h2 style={{ marginBottom: 16, fontWeight: 600 }}>Set New Password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter new password"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    fontSize: 16,
                                    border: '1px solid #d0d5dd',
                                    borderRadius: 8,
                                    marginBottom: 18,
                                    outline: 'none'
                                }}
                                required
                            />
                            <button
                                type="submit"
                                disabled={passwordLoading}
                                style={{
                                    width: '100%',
                                    padding: '12px 0',
                                    background: '#2563eb',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    border: 'none',
                                    borderRadius: 8,
                                    cursor: passwordLoading ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                {passwordLoading ? 'Saving...' : 'Save Password'}
                            </button>
                        </form>
                        {passwordError && (
                            <div style={{
                                marginTop: 14,
                                padding: '8px 12px',
                                borderRadius: 6,
                                background: '#fdecea',
                                color: '#b42318',
                                fontWeight: 500,
                                fontSize: 14
                            }}>
                                {passwordError}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;