"use client";

import React, { useEffect, useState } from "react";
import api from "@/../utils/axios";
import Link from "next/link";
import { rgba } from "framer-motion";

export interface EcommerceUserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  preferredPayment: string;
}

const defaultProfile: EcommerceUserProfile = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  phone: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  preferredPayment: "Cash on Delivery",
};


const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<EcommerceUserProfile>(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [showNewPassModal, setShowNewPassModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [userData, setSessionUser] = useState<any>(null);

    useEffect (() => {
        const currentUser = sessionStorage.getItem("user");
         if (!currentUser) {
            console.log("User not found in session storage");
        }
        const userData = currentUser ? JSON.parse(currentUser) : {};

        setProfile({
            id: userData.id,
            first_name: userData.name?.split(" ")[0] || "",
            last_name: userData.name?.split(" ")[1] || "",
            email: userData.email,
            address: userData.address || "",
            phone: userData.phone || "",
            city: userData.city || "",
            state: userData.state || "",
            postcode: userData.postcode || "",
            country: userData.country || "",
            preferredPayment: "Cash on Delivery",
        });
        
        setSessionUser(userData);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const updateProfile = async (profile: EcommerceUserProfile) => {
        
        const payload = {
            ...profile,
        };
        await api.post("/users/editInfo", payload)
            .then((response) => {
                    console.log("Profile updated successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                    setError("Failed to update profile. Please try again.");
                });
    };

    const updatePass = async (profile: EcommerceUserProfile) => {
        
        const payload = {
            id: userData.id,
            currentPassword: currentPassword,
            newPassword: newPassword
        };
        await api.post("/users/updatePass", payload)
            .then((response) =>{
                // console.log("Password updated successfully:", response.data);
                console.log("Password updated successfully");
            })
            .catch((error) => {
                console.error("Error updating password:", error);
                setError("Failed to update password. Please try again.");
            });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(false);
        //  send the updated profile to your backend
        updateProfile(profile); 
        
        setError("");
        sessionStorage.setItem("user", JSON.stringify(profile));
        console.log("Profile saved:", profile);
        setShowPasswordModal(false);
    };

    // const handlePasswordReset = async () => {
    //     setSending(true);
    //     // Simulate sending password reset email
    //     updatePass(profile);
    //     setEmailSent(true);
    //     setSending(false);
    //     console.log("Password changed!");
    //     setShowPasswordModal(false);
    // };

    return (
        <div
            style={{
            maxWidth: 420,
            margin: "3rem auto",
            padding: "2.5rem 2rem",
            background: "#fafbfc",
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(30,34,40,0.07)",
            fontFamily: "Inter, Arial, sans-serif",
            }}
        >
            <h2 style={{ fontWeight: 600, fontSize: 26, marginBottom: 28, color: "#23272f", letterSpacing: -1 }}>
            Profile
            <span>
                <Link href="../orderTrack" >
                    <button
                        style={{
                            background: "rgb(255, 255, 255)",
                            border: "1px solid green",
                            borderRadius: 4,
                            padding: "0.5rem 1rem",
                            fontSize: 14,
                            fontWeight: 500,
                            color: "000", 
                            cursor: "pointer",
                            marginLeft: 12,
                        }}
                    >
                    Track order
                    </button>
                </Link>
            </span>
            </h2>
            {!editing ? (
            <div>
                <div style={{ marginBottom: 18 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>First Name</div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{profile.first_name}</div>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Last Name</div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{profile.last_name}</div>
                </div>
                <div style={{ marginBottom: 18 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Email</div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{profile.email}</div>
                </div>
                <div style={{ marginBottom: 18 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Address</div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{profile.address}</div>
                </div>
                <div style={{ marginBottom: 18 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Phone</div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{profile.phone}</div>
                </div>
                <div style={{ marginBottom: 28 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Preferred Payment</div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{profile.preferredPayment}</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                <button
                    onClick={() => setEditing(true)}
                    style={{
                    background: "#23272f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "0.6rem 1.4rem",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={() => { setShowNewPassModal(true); setError(""); setSuccess(""); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }}
                    style={{
                    background: "#f3f4f6",
                    color: "#23272f",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    padding: "0.6rem 1.4rem",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    }}
                >
                    Change Password
                </button>
                </div>
            </div>
            ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                <label style={{ color: "#6b7280", fontSize: 13, display: "block", marginBottom: 4 }}>
                    First Name
                </label>
                <input
                    name="First name"
                    value={profile.first_name}
                    onChange={handleChange}
                    required
                    style={{
                    width: "100%",
                    padding: "0.55rem 0.9rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 15,
                    background: "#fff",
                    outline: "none",
                    }}
                />
                </div>
                <div>
                <label style={{ color: "#6b7280", fontSize: 13, display: "block", marginBottom: 4 }}>
                    Last Name
                </label>
                <input
                    name="Last name"
                    value={profile.last_name}
                    onChange={handleChange}
                    required
                    style={{
                    width: "100%",
                    padding: "0.55rem 0.9rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 15,
                    background: "#fff",
                    outline: "none",
                    }}
                />
                </div>
                <div>
                <label style={{ color: "#6b7280", fontSize: 13, display: "block", marginBottom: 4 }}>
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    style={{
                    width: "100%",
                    padding: "0.55rem 0.9rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 15,
                    background: "#fff",
                    outline: "none",
                    }}
                />
                </div>
                <div>
                <label style={{ color: "#6b7280", fontSize: 13, display: "block", marginBottom: 4 }}>
                    Address
                </label>
                <input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    required
                    style={{
                    width: "100%",
                    padding: "0.55rem 0.9rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 15,
                    background: "#fff",
                    outline: "none",
                    }}
                />
                </div>
                <div>
                <label style={{ color: "#6b7280", fontSize: 13, display: "block", marginBottom: 4 }}>
                    Phone
                </label>
                <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                    style={{
                    width: "100%",
                    padding: "0.55rem 0.9rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 15,
                    background: "#fff",
                    outline: "none",
                    }}
                />
                </div>
                <div>
                <label style={{ color: "#6b7280", fontSize: 13, display: "block", marginBottom: 4 }}>
                    Preferred Payment
                </label>
                <select
                    name="preferredPayment"
                    value={profile.preferredPayment}
                    onChange={handleChange}
                    style={{
                    width: "100%",
                    padding: "0.55rem 0.9rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 15,
                    background: "#fff",
                    outline: "none",
                    }}
                >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button
                    type="submit"
                    style={{
                    background: "#23272f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "0.6rem 1.4rem",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    }}
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={() => setEditing(false)}
                    style={{
                    background: "#f3f4f6",
                    color: "#23272f",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    padding: "0.6rem 1.4rem",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    }}
                >
                    Cancel
                </button>
                </div>
            </form>
            )}

            {showNewPassModal && (
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
            >
                <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");
                    setSuccess("");
                    if (!currentPassword || !newPassword || !confirmPassword) {
                    setError("All fields are required.");
                    return;
                    }
                    if (newPassword !== confirmPassword) {
                    setError("New passwords do not match.");
                    return;
                    }
                    try {
                    // await api.post("/users/updatePass", {
                    //     profile,
                    //     currentPassword,
                    //     newPassword,
                    // });
                    await updatePass(profile);
                    setSuccess("Password changed successfully.");
                    setShowNewPassModal(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    } catch (err: any) {
                    setError(
                        err?.response?.data?.message ||
                        "Failed to change password. Please try again."
                    );
                    }
                }}
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
                }}
                >
                <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 10, color: "#23272f" }}>
                    Change Password
                </h3>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
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
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
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
                    required
                />
                <input
                    type="password"
                    placeholder="Re-type New Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
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
                    required
                />
                <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 8 }}>
                    <button
                    type="submit"
                    style={{
                        background: "#23272f",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "0.6rem 1.4rem",
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: "pointer",
                        transition: "background 0.15s",
                        flex: 1,
                    }}
                    >
                    Confirm
                    </button>
                    <button
                    type="button"
                    onClick={() => setShowNewPassModal(false)}
                    style={{
                        background: "#f3f4f6",
                        color: "#23272f",
                        border: "1px solid #e5e7eb",
                        borderRadius: 6,
                        padding: "0.6rem 1.4rem",
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: "pointer",
                        transition: "background 0.15s",
                        flex: 1,
                    }}
                    >
                    Cancel
                    </button>
                </div>
                {error && <div style={{ color: "#ef4444", fontSize: 14, marginTop: 6 }}>{error}</div>}
                {success && <div style={{ color: "#22c55e", fontSize: 14, marginTop: 6 }}>{success}</div>}
                </form>
            </div>
            )}
        </div>
    );
};

export default ProfilePage;
