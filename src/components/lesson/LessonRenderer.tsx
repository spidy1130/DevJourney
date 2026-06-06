import React from 'react';
import Button from '@/components/ui/Button';

interface LessonContentProps {
  lesson: any;
  onComplete: () => void;
}

const LessonRenderer: React.FC<LessonContentProps> = ({ lesson, onComplete }) => {
  const { content } = lesson;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Day {lesson.day}: {lesson.title}</h1>
      
      {content.sections?.map((section: any, idx: number) => {
        switch (section.type) {
          case 'heading':
            return (
              <h2 key={idx} style={{ fontSize: '1.75rem', marginTop: '16px', color: 'var(--accent-blue)' }}>
                {section.text}
              </h2>
            );
          
          case 'text':
            return (
              <p key={idx} style={{ color: 'var(--text-main)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                {section.text}
              </p>
            );

          case 'code':
            return (
              <div key={idx} className="glass" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                {section.language && (
                  <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', fontSize: '0.875rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    {section.language}
                  </div>
                )}
                <pre style={{ padding: '20px', margin: 0, overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1rem', background: 'var(--bg-secondary)', color: 'var(--accent-emerald)' }}>
                  <code>{section.code}</code>
                </pre>
              </div>
            );

          case 'list':
            const ListTag = section.ordered ? 'ol' : 'ul';
            return (
              <ListTag key={idx} style={{ paddingLeft: '24px', color: 'var(--text-main)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                {section.items.map((item: string, i: number) => (
                  <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
                ))}
              </ListTag>
            );

          case 'analogy':
            return (
              <div key={idx} style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-purple)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>💡</span> Analogy
                </h3>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {section.items.map((item: any, i: number) => (
                    <li key={i} style={{ marginBottom: '8px' }}>
                      <strong>{item.left}</strong> → {item.right}
                    </li>
                  ))}
                </ul>
              </div>
            );

          case 'note':
            return (
              <div key={idx} style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.05)', border: '1px left solid var(--accent-blue)', borderLeftWidth: '4px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-blue)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{section.icon || '📌'}</span> {section.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{section.text}</p>
              </div>
            );

          case 'mistake':
            return (
              <div key={idx} style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#ef4444', marginBottom: '12px' }}>⚠️ {section.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Wrong:</span>
                    <pre style={{ margin: '4px 0 0', padding: '12px', background: 'rgba(0,0,0,0.2)', color: '#ef4444', borderRadius: '4px', overflowX: 'auto' }}><code>{section.wrong}</code></pre>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Correct:</span>
                    <pre style={{ margin: '4px 0 0', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'var(--accent-emerald)', borderRadius: '4px', overflowX: 'auto' }}><code>{section.correct}</code></pre>
                  </div>
                </div>
              </div>
            );

          case 'output':
            return (
              <div key={idx} style={{ padding: '16px', borderRadius: '4px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Output browser preview</div>
                <div style={{ color: 'var(--text-main)' }}>{section.text.split('\n').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</div>
              </div>
            );

          default:
            return null;
        }
      })}

      <section style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Ready for the next step?</h3>
        <Button variant="primary" size="lg" onClick={onComplete}>Complete Lesson</Button>
      </section>
    </div>
  );
};

export default LessonRenderer;
