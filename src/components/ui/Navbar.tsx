import React from 'react';
import Link from 'next/link';
import Button from './Button';

const Navbar = () => {
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
      }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Dev<span className="text-gradient">Journey</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/courses" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Browse Courses</Link>
          <Link href="/roadmap" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Roadmap</Link>
          <Link href="/about" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>About</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="ghost" size="sm">Log in</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
