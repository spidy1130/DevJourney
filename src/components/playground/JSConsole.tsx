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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const panelsEl = containerRef.current.querySelector('.console-panels') as HTMLElement;
    if (!panelsEl) return;
    
    const rect = panelsEl.getBoundingClientRect();
    let newPercent = 50;
    if (window.getComputedStyle(panelsEl).flexDirection === 'column') {
      newPercent = ((e.clientY - rect.top) / rect.height) * 100;
    } else {
      newPercent = ((e.clientX - rect.left) / rect.width) * 100;
    }
    setSplitPercent(Math.max(20, Math.min(80, newPercent)));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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
        overflowY: isFullscreen ? 'auto' : 'visible',
      }}
    >
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          JavaScript Console
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
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
        style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0, position: 'relative', '--split-percent': `${splitPercent}%` } as React.CSSProperties}
      >
        {/* Editor */}
        <div className="console-editor-pane" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
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
              minHeight: '60px',
              background: 'var(--bg-secondary)',
              color: 'var(--accent-emerald)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              resize: 'none',
              outline: 'none',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
            }}
          />
        </div>

        {/* Drag Handle */}
        <div
          className="console-dragger"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          title="Drag to resize"
          style={{
            background: 'var(--border)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast)',
            userSelect: 'none',
            touchAction: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-blue)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--border)')}
        >
          <div className="console-dragger-line" style={{ background: 'currentColor', borderRadius: '1px', opacity: 0.5 }} />
        </div>

        {/* Output */}
        <div className="console-output-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Console Output
          </label>
          <div style={{
            flex: 1,
            minHeight: '60px',
            background: 'var(--bg-primary)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            borderLeft: 'none',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            padding: '16px',
            paddingBottom: isFullscreen ? '16px' : '80px',
            boxSizing: 'border-box',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
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
        .console-editor-pane {
          width: var(--split-percent);
        }
        .console-dragger {
          width: 8px;
          cursor: col-resize;
          flex-direction: column;
        }
        .console-dragger-line {
          width: 2px;
          height: 40px;
        }
        @media (max-width: 600px) {
          .console-panels {
            flex-direction: column !important;
          }
          .console-editor-pane {
            width: 100% !important;
            height: var(--split-percent);
          }
          .console-dragger {
            width: 100% !important;
            height: 12px;
            cursor: row-resize;
            flex-direction: row;
          }
          .console-dragger-line {
            width: 40px;
            height: 2px;
          }
        }
      `}</style>
    </div>
  );
};

export default JSConsole;
