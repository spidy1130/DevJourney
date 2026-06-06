import React from 'react';
import Navbar from '@/components/ui/Navbar';

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>About <span className="text-gradient">DevJourney</span></h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>
            DevJourney is a structured learning platform built specifically for coding beginners, self-learners, and students who want to build a career in technology without getting overwhelmed.
          </p>

          <section className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--accent-blue)' }}>Our Philosophy</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
              We believe in <strong>learning by doing</strong>. Traditional tutorials often lead to "tutorial hell"—a state where you copy code without understanding how to write it yourself. 
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              DevJourney uses progressive unlocking. You can only move to the next lesson or challenge when you complete the current one. This ensures you master each building block before moving forward.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--accent-emerald)' }}>✓ Curated Paths</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>No information overload. Focus on what's critical for beginners.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--accent-purple)' }}>✓ Interactive Practice</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Write real code inside your browser with immediate feedback.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
