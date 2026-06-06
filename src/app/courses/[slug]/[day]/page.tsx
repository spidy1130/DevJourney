'use client';
import React, { use, useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import LessonRenderer from '@/components/lesson/LessonRenderer';
import Link from 'next/link';

export default function LessonPage({ params }: { params: Promise<{ slug: string, day: string }> }) {
  const { slug, day } = use(params);
  const { courses, completeLesson, isLoaded } = useProgress();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const course = courses.find(c => c.slug === slug);
  const dayNum = parseInt(day);
  const lesson = course?.lessons.find(l => l.day === dayNum);

  // Suppress hydration mismatch: don't render until localStorage is loaded
  if (!isLoaded) return null;

  if (!course || !lesson) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Lesson not found</div>;
  }

  if (!lesson.isUnlocked) {
    return (
      <div className="glass animate-fade-in" style={{ 
        padding: '48px', 
        borderRadius: 'var(--radius-lg)', 
        textAlign: 'center',
        maxWidth: '500px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Lesson Locked</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          This lesson is locked because you haven't completed the previous steps. 
          To unlock <strong>"{lesson.title}"</strong>, please complete Day {lesson.day - 1} first!
        </p>
        <Link 
          href={`/courses/${slug}/${lesson.day - 1}`}
          style={{
            padding: '12px 24px',
            background: 'var(--accent-blue)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'var(--transition-fast)'
          }}
        >
          Go to Day {lesson.day - 1}
        </Link>
      </div>
    );
  }

  const handleComplete = () => {
    completeLesson(slug, dayNum);
    setShowSuccessModal(true);
  };

  const hasNextLesson = course.lessons.some(l => l.day === dayNum + 1);

  return (
    <div style={{ position: 'relative' }}>
      <LessonRenderer lesson={lesson} onComplete={handleComplete} />

      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 15, 30, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '24px'
        }}>
          <div className="glass animate-fade-in" style={{
            maxWidth: '480px',
            width: '100%',
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            border: '1px solid var(--accent-emerald)',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'rgba(16, 185, 129, 0.1)', 
              border: '2px solid var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem'
            }}>
              🎉
            </div>

            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>Day {lesson.day} Completed!</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                You have successfully completed <strong>"{lesson.title}"</strong> and unlocked the next phase of your journey!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: '8px' }}>
              {hasNextLesson ? (
                <Link 
                  href={`/courses/${slug}/${dayNum + 1}`}
                  onClick={() => setShowSuccessModal(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'var(--accent-emerald)',
                    color: '#050B14',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  Continue to Day {dayNum + 1}
                </Link>
              ) : (
                <Link 
                  href={`/courses/${slug}/${dayNum}/practice`}
                  onClick={() => setShowSuccessModal(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'var(--accent-blue)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  Go to Practice Arena
                </Link>
              )}
            </div>
            
            <button 
              onClick={() => setShowSuccessModal(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
