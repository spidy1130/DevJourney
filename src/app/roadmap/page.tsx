import React from 'react';
import Navbar from '@/components/ui/Navbar';

export default function RoadmapPage() {
  const steps = [
    {
      step: 1,
      title: "HTML Mastering",
      duration: "3 Days",
      status: "Available",
      color: "var(--accent-emerald)",
      description: "Learn how to structure content for the web. Dominate headings, paragraphs, links, media, forms, and semantic elements."
    },
    {
      step: 2,
      title: "CSS Mastery",
      duration: "7 Days",
      status: "Available",
      color: "var(--accent-blue)",
      description: "Style websites with layout engines. Flexbox, CSS Grid, media queries, keyframe animations, and custom styling systems."
    },
    {
      step: 3,
      title: "JavaScript Essentials",
      duration: "10 Days",
      status: "Available",
      color: "var(--accent-purple)",
      description: "Understand variables, types, loops, objects, events, API fetching, and full DOM manipulation."
    },
    {
      step: 4,
      title: "React & Next.js Ecosystem",
      duration: "14 Days",
      status: "Locked",
      color: "var(--text-dim)",
      description: "Understand state, props, hooks, routing, Server Actions, component cycles, and dynamic rendering."
    }
  ];

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Your Learning <span className="text-gradient">Roadmap</span></h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '48px' }}>
            Follow our step-by-step developer journey. Each phase builds directly on the previous one to avoid tutorial hell.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '20px',
              bottom: '20px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-emerald), var(--accent-blue), var(--border))',
              zIndex: 0
            }} />

            {steps.map((s) => (
              <div key={s.step} style={{ display: 'flex', gap: '24px', zIndex: 1, position: 'relative' }}>
                {/* Bullet */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: s.status === 'Locked' ? 'var(--bg-secondary)' : s.color,
                  border: '3px solid var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: s.status === 'Locked' ? 'var(--text-dim)' : '#000',
                  boxShadow: s.status === 'Locked' ? 'none' : `0 0 15px ${s.color}`,
                  flexShrink: 0
                }}>
                  {s.step}
                </div>

                {/* Content */}
                <div className="glass" style={{ padding: '24px 32px', borderRadius: 'var(--radius-lg)', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{s.title}</h3>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '4px 8px', 
                      background: s.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                      color: s.status === 'Available' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      textTransform: 'uppercase'
                    }}>
                      {s.status}
                    </span>
                  </div>
                  
                  <span style={{ fontSize: '0.875rem', color: s.color, fontWeight: 600 }}>Duration: {s.duration}</span>
                  <p style={{ color: 'var(--text-muted)', marginTop: '12px', lineHeight: 1.6 }}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
