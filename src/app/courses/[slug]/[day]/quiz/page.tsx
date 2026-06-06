import React from 'react';
import QuizSystem from '@/components/quiz/QuizSystem';
import { MOCK_COURSES } from '@/lib/mock-data';

export default async function QuizPage({ params }: { params: Promise<{ slug: string, day: string }> }) {
  const { slug, day } = await params;
  
  const course = MOCK_COURSES.find(c => c.slug === slug);
  const dayNum = parseInt(day);
  const lesson = course?.lessons.find(l => l.day === dayNum);

  const questions = lesson?.quiz || [];

  if (!questions.length) {
    return (
      <div className="animate-fade-in" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No Quiz Available</h2>
        <p style={{ color: 'var(--text-muted)' }}>There is no quiz for Day {dayNum} yet.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Day {dayNum} <span className="text-gradient">Checkpoint</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Test your understanding of the concepts covered in this lesson.
        </p>
      </header>

      <QuizSystem questions={questions} />
    </div>
  );
}
