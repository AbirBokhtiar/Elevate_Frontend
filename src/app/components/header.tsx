"use client";
import React from 'react';
import { useState, useEffect } from 'react';

const Header = () => {

    return (
        <header style={styles.header}>
            <div style={ styles.logo }>ShopEase</div>
            <nav style={styles.nav}>
                <a href="/" style={styles.link}>Home</a>
                <a href="/shop" style={styles.link}>Shop</a>
                <a href="/about" style={styles.link}>About</a>
                <a href="/contact" style={styles.link}>Contact</a>
            </nav>
            <div style={styles.actions}>
                <a href="/cart" style={styles.icon}>🛒</a>
                <a href="/account" style={styles.icon}>👤</a>
            </div>
        </header>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: '#fff',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logo: {
        fontWeight: 700,
        fontSize: '1.5rem',
        color: '#2d2d2d',
        letterSpacing: '1px',
    },
    nav: {
        display: 'flex',
        gap: '1.5rem',
    },
    link: {
        textDecoration: 'none',
        color: '#2d2d2d',
        fontWeight: 500,
        fontSize: '1rem',
        transition: 'color 0.2s',
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    icon: {
        fontSize: '1.3rem',
        color: '#2d2d2d',
        textDecoration: 'none',
    },
};

export default Header;