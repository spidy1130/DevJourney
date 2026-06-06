'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

const WebPlayground = ({ initialHtml = '<h1>Hello!</h1>', initialCss = 'h1 { color: #10b981; }' }) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>${html}</body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css]);

  return (
    <div style={{ height: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
        {/* Editors */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>HTML</label>
            <textarea 
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              style={editorStyle}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>CSS</label>
            <textarea 
              value={css}
              onChange={(e) => setCss(e.target.value)}
              style={editorStyle}
            />
          </div>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Live Preview</label>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              background: 'white',
            }}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <Button variant="outline" size="sm" onClick={() => { setHtml(initialHtml); setCss(initialCss); }}>Reset Code</Button>
        <Button variant="primary" size="sm">Save Progress</Button>
      </div>
    </div>
  );
};

const editorStyle: React.CSSProperties = {
  flex: 1,
  width: '100%',
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
