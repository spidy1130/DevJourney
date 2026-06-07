'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@/components/ui/Button';

const WebPlayground = ({ initialHtml = '<h1>Hello!</h1>', initialCss = 'h1 { color: #10b981; }' }) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [srcDoc, setSrcDoc] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splitPercent, setSplitPercent] = useState(45); // editors take 45% width on desktop
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html><style>${css}</style><body>${html}</body></html>`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css]);

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
    const panelsEl = containerRef.current.querySelector('.playground-panels') as HTMLElement;
    if (!panelsEl) return;
    const rect = panelsEl.getBoundingClientRect();
    const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.max(20, Math.min(75, newPercent)));
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
          Web Playground
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button variant="outline" size="sm" onClick={() => { setHtml(initialHtml); setCss(initialCss); }}>
            Reset
          </Button>
          <Button variant="primary" size="sm">Save</Button>
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              background: isFullscreen ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.07)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'var(--transition-fast)',
              fontFamily: 'inherit',
            }}
          >
            {isFullscreen ? '⛶ Exit' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>

      {/* Panels */}
      <div
        className="playground-panels"
        style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0, position: 'relative' }}
      >
        {/* Editors: HTML + CSS stacked */}
        <div
          className="editor-stack"
          style={{ width: `${splitPercent}%`, display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>HTML</label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
              style={{ ...editorStyle, borderRadius: 'var(--radius-md) 0 0 var(--radius-md)' }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>CSS</label>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              spellCheck={false}
              style={{ ...editorStyle, borderRadius: 'var(--radius-md) 0 0 var(--radius-md)' }}
            />
          </div>
        </div>

        {/* Drag Handle */}
        <div
          onMouseDown={onDragStart}
          className="drag-handle"
          title="Drag to resize"
          style={{
            width: '8px',
            background: 'var(--border)',
            cursor: 'col-resize',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            transition: 'background var(--transition-fast)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-blue)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--border)')}
        >
          <div style={{ width: '2px', height: '40px', background: 'currentColor', borderRadius: '1px', opacity: 0.5 }} />
        </div>

        {/* Live Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Live Preview</label>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            style={{
              width: '100%',
              flex: 1,
              minHeight: '200px',
              border: '1px solid var(--border)',
              borderLeft: 'none',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              background: 'white',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .playground-panels {
            flex-direction: column !important;
          }
          .editor-stack {
            width: 100% !important;
            flex-direction: column !important;
          }
          .drag-handle {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

const editorStyle: React.CSSProperties = {
  flex: 1,
  width: '100%',
  minHeight: '160px',
  background: 'var(--bg-secondary)',
  color: 'var(--accent-emerald)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  padding: '16px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.9rem',
  resize: 'none',
  outline: 'none',
};

export default WebPlayground;
