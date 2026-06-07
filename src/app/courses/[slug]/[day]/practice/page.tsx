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

  // Desktop: minimize panel; Mobile: show/hide panel
  const [panelMinimized, setPanelMinimized] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '12px' }}>
          Day {dayNum} <span className="text-gradient">Practice</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {isJS
            ? 'Master JavaScript logic by writing and running code in the console below.'
            : 'Complete the practical assignments below to solidify your understanding.'}
        </p>
      </header>

      {assignments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>

          {/* Mobile toggle button */}
          <button
            onClick={() => setShowAssignments(!showAssignments)}
            className="assignment-toggle"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-primary)',
              border: '1px solid var(--accent-blue)',
              color: 'var(--accent-blue)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              width: 'fit-content',
            }}
          >
            📋 {showAssignments ? 'Hide Assignments' : 'View Assignments'}
          </button>

          <div className="practice-layout" style={{ display: 'flex', gap: '16px', flex: 1, minHeight: '600px', alignItems: 'stretch' }}>

            {/* Assignment Panel — minimizable on desktop */}
            {panelMinimized ? (
              /* Collapsed strip */
              <div style={{
                width: '40px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '12px',
                gap: '12px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <button
                  onClick={() => setPanelMinimized(false)}
                  title="Expand assignments"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--accent-blue)',
                    fontSize: '18px',
                    lineHeight: 1,
                    padding: '4px',
                  }}
                >
                  ▶
                </button>
                {/* Rotated label */}
                <span style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}>
                  ASSIGNMENTS
                </span>
              </div>
            ) : (
              /* Expanded panel */
              <div
                className={`assignment-panel${showAssignments ? ' assignment-panel-open' : ''}`}
                style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0' }}
              >
                {/* Panel header with minimize button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>ASSIGNMENTS</span>
                  <button
                    className="minimize-btn"
                    onClick={() => setPanelMinimized(true)}
                    title="Minimize panel"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '3px 8px',
                      fontSize: '13px',
                      lineHeight: 1.4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'var(--transition-fast)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-main)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                    }}
                  >
                    ◀ Hide
                  </button>
                </div>

                {/* Assignment cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                  {assignments.map((assignment: any) => (
                    <div
                      key={assignment.id}
                      onClick={() => { setActiveAssignment(assignment); setShowAssignments(false); }}
                      style={{
                        padding: '20px',
                        borderRadius: 'var(--radius-md)',
                        background: activeAssignment?.id === assignment.id ? 'var(--bg-secondary)' : 'transparent',
                        border: '1px solid',
                        borderColor: activeAssignment?.id === assignment.id ? 'var(--accent-blue)' : 'var(--border)',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                      }}
                    >
                      <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', color: activeAssignment?.id === assignment.id ? 'var(--accent-blue)' : 'var(--text-main)' }}>
                        {assignment.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: activeAssignment?.id === assignment.id ? '12px' : '0' }}>
                        {assignment.description}
                      </p>
                      {activeAssignment?.id === assignment.id && (
                        <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {assignment.requirements.map((req: string, i: number) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Playground — fills all remaining space */}
            <div style={{ flex: 1, padding: '24px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-primary)', border: '1px solid var(--border)', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
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
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
          <h2>No Practice Assignments Available</h2>
          <p style={{ color: 'var(--text-muted)' }}>Check back later for hands-on exercises for this day.</p>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .assignment-toggle {
            display: flex !important;
          }
          .minimize-btn {
            display: none !important;
          }
          .practice-layout {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .assignment-panel {
            width: 100% !important;
            display: none !important;
          }
          .assignment-panel.assignment-panel-open {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
