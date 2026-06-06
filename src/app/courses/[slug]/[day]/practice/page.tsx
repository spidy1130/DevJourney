'use client';
import React, { use, useState } from 'react';
import WebPlayground from '@/components/playground/WebPlayground';
import JSConsole from '@/components/playground/JSConsole';
import { MOCK_COURSES } from '@/lib/mock-data';

export default function PracticePage({ params }: { params: Promise<{ slug: string, day: string }> }) {
  const { slug, day } = use(params);
  const isJS = slug === 'javascript';

  const course = MOCK_COURSES.find(c => c.slug === slug);
  const dayNum = parseInt(day);
  const lesson = course?.lessons.find(l => l.day === dayNum);

  const assignments = lesson?.practice || [];
  const [activeAssignment, setActiveAssignment] = useState(assignments[0] || null);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Day {dayNum} <span className="text-gradient">Practice</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {isJS 
            ? "Master JavaScript logic by writing and running code in the console below." 
            : "Complete the practical assignments below to solidify your understanding."}
        </p>
      </header>

      {assignments.length > 0 ? (
        <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '600px' }}>
          {/* Assignment list sidebar */}
          <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {assignments.map((assignment: any) => (
              <div 
                key={assignment.id} 
                onClick={() => setActiveAssignment(assignment)}
                style={{ 
                  padding: '20px', 
                  borderRadius: 'var(--radius-md)', 
                  background: activeAssignment?.id === assignment.id ? 'var(--bg-secondary)' : 'transparent',
                  border: '1px solid',
                  borderColor: activeAssignment?.id === assignment.id ? 'var(--accent-blue)' : 'var(--border)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: activeAssignment?.id === assignment.id ? 'var(--accent-blue)' : 'var(--text-main)' }}>
                  {assignment.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                  {assignment.description}
                </p>
                {activeAssignment?.id === assignment.id && (
                  <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {assignment.requirements.map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Playground */}
          <div style={{ flex: 1, padding: '24px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
            {isJS ? (
              <JSConsole key={activeAssignment?.id} />
            ) : (
              <WebPlayground 
                key={activeAssignment?.id} 
                initialHtml={activeAssignment?.starterCode || '<!-- Start coding here -->'} 
                initialCss="/* Styles here */"
              />
            )}
          </div>
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
          <h2>No Practice Assignments Available</h2>
          <p style={{ color: 'var(--text-muted)' }}>Check back later for hands-on exercises for this day.</p>
        </div>
      )}
    </div>
  );
}
