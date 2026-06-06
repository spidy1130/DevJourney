import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { MOCK_COURSES } from '@/lib/mock-data';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CoursesPage() {
  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
      <Navbar />
      
      <header style={{ padding: '64px 0 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>All <span className="text-gradient">Courses</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
            Choose your learning path and start your developer journey.
          </p>
        </div>
      </header>

      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
            gap: '32px' 
          }}>
            {MOCK_COURSES.map(course => (
              <CourseGridItem key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseGridItem({ course }: { course: any }) {
  const isComingSoon = !course.isAvailable || course.duration === 'Coming Soon';

  return (
    <div className="glass card-hover" style={{
      padding: '32px',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      opacity: isComingSoon ? 0.7 : 1,
      filter: isComingSoon ? 'grayscale(0.5)' : 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--accent-blue)' }}>{course.level}</span>
          <span style={{ color: 'var(--text-dim)' }}>•</span>
          <span style={{ color: 'var(--text-muted)' }}>{course.duration}</span>
        </div>
        {isComingSoon && (
          <span style={{ 
            fontSize: '0.75rem', 
            padding: '4px 8px', 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            Coming Soon
          </span>
        )}
      </div>

      <h3 style={{ fontSize: '1.5rem' }}>{course.title}</h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{course.description}</p>
      
      <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
        {isComingSoon ? (
          <Button variant="outline" fullWidth disabled>Coming Soon</Button>
        ) : (
          <Link href={`/courses/${course.slug}`}>
            <Button variant="primary" fullWidth>Start Learning</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
