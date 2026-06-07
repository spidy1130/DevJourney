'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';

export default function CourseSidebar({ course }: { course: any }) {
  const pathname = usePathname();
  const { courses } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

  const reactiveCourse = courses.find(c => c.slug === course.slug) || course;

  const completedLessons = reactiveCourse.lessons.filter((l: any) => l.isCompleted).length;
  const progressPercent = reactiveCourse.lessons.length > 0
    ? Math.round((completedLessons / reactiveCourse.lessons.length) * 100)
    : 0;

  const sidebarContent = (
    <aside className={`glass ${mobileOpen ? 'sidebar-mobile-open' : 'sidebar-mobile-hidden'}`} style={{
      width: 'var(--sidebar-width)',
      flexShrink: 0,
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{course.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
          <div style={{ flex: 1, height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px' }}>
            <div style={{
              width: `${progressPercent}%`, height: '100%',
              background: 'var(--accent-emerald)', borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <span style={{ color: 'var(--text-muted)' }}>{progressPercent}%</span>
        </div>
      </div>

      <nav style={{ padding: '16px 0' }}>
        {reactiveCourse.lessons.map((lesson: any) => {
          const lessonPath = `/courses/${reactiveCourse.slug}/${lesson.day}`;
          const isActive = pathname === lessonPath;

          if (!lesson.isUnlocked) {
            return (
              <div key={lesson.id} style={{
                display: 'flex', alignItems: 'center', padding: '12px 24px', gap: '12px',
                color: 'var(--text-dim)', cursor: 'not-allowed',
                borderLeft: '3px solid transparent', background: 'transparent', userSelect: 'none'
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  border: '2px solid var(--border)', background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700
                }}>
                  {lesson.day}
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.925rem' }}>{lesson.title}</span>
                <span style={{ marginLeft: 'auto', fontSize: '14px' }}>🔒</span>
              </div>
            );
          }

          return (
            <Link
              key={lesson.id}
              href={lessonPath}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', padding: '12px 24px', gap: '12px',
                color: 'var(--text-main)', cursor: 'pointer',
                borderLeft: isActive ? '3px solid var(--accent-emerald)' : '3px solid transparent',
                background: isActive ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: '2px solid',
                borderColor: lesson.isCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)',
                background: lesson.isCompleted ? 'var(--accent-emerald)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 700,
                color: lesson.isCompleted ? '#000' : 'inherit'
              }}>
                {lesson.isCompleted ? '✓' : lesson.day}
              </div>
              <span style={{ fontWeight: isActive ? 600 : 500, fontSize: '0.925rem' }}>{lesson.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 950,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--accent-emerald)',
          color: '#000',
          fontWeight: 700,
          fontSize: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Overlay when sidebar open on mobile */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          style={{ display: 'none' }}
        />
      )}

      {sidebarContent}

      <style>{`
        @media (max-width: 768px) {
          .sidebar-toggle {
            display: flex !important;
          }
          .sidebar-overlay {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
