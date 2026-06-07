'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@/components/ui/Button';

const JSConsole = () => {
  const [code, setCode] = useState('// Write your JS here\nconst message = "Hello DevJourney!";\nconsole.log(message);\n\nfunction add(a, b) {\n  return a + b;\n}\n\nconsole.log("2 + 3 =", add(2, 3));');
  const [logs, setLogs] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splitPercent, setSplitPercent] = useState(50); // editor takes 50% width
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const runCode = () => {
    setLogs([]);
    const originalLog = console.log;
    const newLogs: string[] = [];
    const customLog = (...args: any[]) => {
      newLogs.push(args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' '));
      originalLog(...args);
    };
    try {
      const execute = new Function('console', code);
      execute({ log: customLog });
      setLogs(newLogs);
    } catch (err: any) {
      setLogs([...newLogs, `Error: ${err.message}`]);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const panelsEl = containerRef.current.querySelector('.console-panels') as HTMLElement;
    if (!panelsEl) return;
    const rect = panelsEl.getBoundingClientRect();
    const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.max(20, Math.min(80, newPercent)));
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: isFullscreen ? '100vh' : '100%',
        minHeight: '400px',
        background: isFullscreen ? 'var(--bg-primary)' : 'transparent',
        padding: isFullscreen ? '16px' : '0',
        boxSizing: 'border-box',
      }}
    >
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          JavaScript Console
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button variant="outline" size="sm" onClick={() => setLogs([])}>Clear</Button>
          <Button variant="secondary" size="sm" onClick={runCode}>▶ Run</Button>
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            style={{
              padding: '6px 10px',
              background: isFullscreen ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.07)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'var(--transition-fast)',
            }}
          >
            {isFullscreen ? '⛶' : '⛶'}
            {isFullscreen ? ' Exit' : ' Fullscreen'}
          </button>
        </div>
      </div>

      {/* Panels */}
      <div
        className="console-panels"
        style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0, position: 'relative' }}
      >
        {/* Editor */}
        <div style={{ width: `${splitPercent}%`, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            JavaScript Editor
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1,
              width: '100%',
              minHeight: '200px',
              background: 'var(--bg-secondary)',
              color: 'var(--accent-emerald)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              resize: 'none',
              outline: 'none',
            }}
          />
        </div>

        {/* Drag Handle */}
        <div
          onMouseDown={onDragStart}
          title="Drag to resize"
          style={{
            width: '8px',
            background: 'var(--border)',
            cursor: 'col-resize',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast)',
            userSelect: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-blue)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--border)')}
        >
          <div style={{ width: '2px', height: '40px', background: 'currentColor', borderRadius: '1px', opacity: 0.5 }} />
        </div>

        {/* Output */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Console Output
          </label>
          <div style={{
            flex: 1,
            minHeight: '200px',
            background: 'var(--bg-primary)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            borderLeft: 'none',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            overflowY: 'auto',
          }}>
            {logs.length === 0 ? (
              <span style={{ color: 'var(--text-dim)' }}>Run code to see output...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} style={{
                  padding: '4px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  color: log.startsWith('Error:') ? '#ef4444' : 'inherit'
                }}>
                  <span style={{ color: 'var(--text-dim)', marginRight: '8px' }}>&gt;</span>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .console-panels {
            flex-direction: column !important;
          }
          .console-panels > div:first-child {
            width: 100% !important;
          }
          .console-panels > div[style*="col-resize"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JSConsole;
