'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';

const QuizSystem = ({ questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
    correct: 0,
    explanation: "HTML is the standard markup language for creating web pages."
  },
  {
    id: 2,
    question: "Which HTML element is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    correct: 2,
    explanation: "<h1> defines the most important heading."
  }
] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleCheck = () => {
    if (selected === null) return;
    if (selected === questions[currentStep].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // End of quiz
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Question {currentStep + 1}/{questions.length}</h2>
        <span style={{ color: 'var(--text-muted)' }}>Score: {score}</span>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '32px', lineHeight: 1.5 }}>
          {questions[currentStep].question}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {questions[currentStep].options.map((option, i) => (
            <button
              key={i}
              disabled={showResult}
              onClick={() => setSelected(i)}
              style={{
                padding: '16px 24px',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                background: selected === i ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                border: '1px solid',
                borderColor: selected === i ? 'var(--accent-blue)' : 'var(--border)',
                color: selected === i ? 'var(--text-main)' : 'var(--text-muted)',
                transition: 'var(--transition-fast)',
                cursor: 'pointer'
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div style={{ 
            marginTop: '32px', 
            padding: '24px', 
            borderRadius: 'var(--radius-md)', 
            background: selected === questions[currentStep].correct ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
            border: '1px solid',
            borderColor: selected === questions[currentStep].correct ? 'var(--accent-emerald)' : '#ef4444'
          }}>
            <h4 style={{ 
              color: selected === questions[currentStep].correct ? 'var(--accent-emerald)' : '#ef4444',
              marginBottom: '8px'
            }}>
              {selected === questions[currentStep].correct ? 'Correct! 🎉' : 'Incorrect ❌'}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{questions[currentStep].explanation}</p>
          </div>
        )}

        <div style={{ marginTop: '40px' }}>
          {!showResult ? (
            <Button variant="primary" fullWidth onClick={handleCheck} disabled={selected === null}>Check Answer</Button>
          ) : (
            <Button variant="secondary" fullWidth onClick={handleNext}>
              {currentStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSystem;
