import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 0 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container animate-fade-in">
          <span style={{ 
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--accent-emerald)',
            fontSize: 'max(0.75rem, 12px)',
            fontWeight: 600,
            marginBottom: '24px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            New: Mastering React Course coming soon
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            marginBottom: '24px',
            maxWidth: '1000px',
            marginInline: 'auto'
          }}>
            Your path to <span className="text-gradient">Professional Coding</span> starts here.
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-muted)', 
            marginBottom: '40px',
            maxWidth: '640px',
            marginInline: 'auto',
            lineHeight: 1.6
          }}>
            Learn step-by-step with guided lessons, interactive practice, and real-world projects. 
            No more tutorial hell—just structured growth.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link href="/courses/html/1">
              <Button variant="primary" size="lg">Start Free Journey</Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">Browse Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            marginBottom: '48px'
          }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '12px' }}>Start with the <span className="text-gradient">Fundamentals</span></h2>
              <p style={{ color: 'var(--text-muted)' }}>Build a rock-solid foundation for your developer career.</p>
            </div>
            <Link href="/courses" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>View all courses &rarr;</Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '32px' 
          }}>
            <CourseCard 
              title="HTML Mastering" 
              description="Learn the skeleton of the web. Day 1 starts with basic tags and structure."
              duration="7 Days"
              level="Beginner"
              accent="var(--accent-emerald)"
              slug="html"
            />
            <CourseCard 
              title="CSS Mastery" 
              description="Style beautiful, responsive websites from scratch using modern techniques."
              duration="7 Days"
              level="Beginner"
              accent="var(--accent-blue)"
              slug="css"
            />
            <CourseCard 
              title="JavaScript Essentials" 
              description="Master the logic of the web. Functions, DOM, and interactive programming."
              duration="14 Days"
              level="Intermediate"
              accent="var(--accent-purple)"
              slug="javascript"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({ title, description, duration, level, accent, slug }: any) {
  return (
    <div className="glass card-hover" style={{
      padding: '32px',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: 'var(--radius-md)',
        background: accent,
        opacity: 0.2,
        position: 'absolute',
        top: '32px',
        right: '32px'
      }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
        <span style={{ color: accent }}>{level}</span>
        <span style={{ color: 'var(--text-dim)' }}>•</span>
        <span style={{ color: 'var(--text-muted)' }}>{duration}</span>
      </div>
      
      <h3 style={{ fontSize: '1.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{description}</p>
      
      <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
        <Link href={`/courses/${slug}`}>
          <Button variant="outline" fullWidth>Learn More</Button>
        </Link>
      </div>
    </div>
  );
}
