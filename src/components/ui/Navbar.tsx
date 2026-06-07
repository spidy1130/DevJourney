'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
      }}>
        {/* Logo */}
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Dev<span className="text-gradient">Journey</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/courses" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Browse Courses</Link>
          <Link href="/roadmap" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Roadmap</Link>
          <Link href="/about" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>About</Link>
        </div>

        {/* Desktop Buttons & Theme */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeSwitcher />
          <Button variant="ghost" size="sm">Log in</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </div>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            zIndex: 1100,
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--text-main)',
            transition: 'var(--transition-fast)',
            transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--text-main)',
            transition: 'var(--transition-fast)',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--text-main)',
            transition: 'var(--transition-fast)',
            transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: 'absolute',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 999,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        }}>
          <Link href="/courses" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Browse Courses</Link>
          <Link href="/roadmap" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Roadmap</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>About</Link>
          <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <ThemeSwitcher />
            <Button variant="ghost" size="sm">Log in</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
