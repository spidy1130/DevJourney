'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';

const JSConsole = () => {
  const [code, setCode] = useState('// Write your JS here\nconst message = "Hello DevJourney!";\nconsole.log(message);\n\nfunction add(a, b) {\n  return a + b;\n}\n\nconsole.log("2 + 3 =", add(2, 3));');
  const [logs, setLogs] = useState<string[]>([]);

  const runCode = () => {
    setLogs([]);
    const originalLog = console.log;
    const newLogs: string[] = [];
    
    // Override console.log
    const customLog = (...args: any[]) => {
      newLogs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' '));
      originalLog(...args);
    };

    try {
      // Execute the code in a sandbox-like way
      const execute = new Function('console', code);
      execute({ log: customLog });
      setLogs(newLogs);
    } catch (err: any) {
      setLogs([...newLogs, `Error: ${err.message}`]);
    }
  };

  return (
    <div style={{ height: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
        {/* Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>JavaScript Editor</label>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
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
            }}
          />
        </div>

        {/* Output */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Console Output</label>
          <div style={{
            flex: 1,
            background: 'var(--bg-primary)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
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
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <Button variant="outline" size="sm" onClick={() => setLogs([])}>Clear Console</Button>
        <Button variant="secondary" size="sm" onClick={runCode}>Run Code ▶</Button>
      </div>
    </div>
  );
};

export default JSConsole;
