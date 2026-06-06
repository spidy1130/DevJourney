import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import { MOCK_COURSES } from '@/lib/mock-data';

export default function AdminDashboard() {
  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '48px 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem' }}>Admin <span className="text-gradient">Control Center</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your courses, lessons, and student content.</p>
          </div>
          <Button variant="primary">+ Create New Course</Button>
        </div>

        {/* Stats Summary */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          <StatCard label="Total Courses" value="4" />
          <StatCard label="Active Students" value="1,240" />
          <StatCard label="Lessons Completed" value="8,432" />
          <StatCard label="Live Feedback" value="24" />
        </div>

        {/* Course Table */}
        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)' }}>
                <th style={thStyle}>Course Name</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Duration</th>
                <th style={thStyle}>Lessons</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_COURSES.map(course => (
                <tr key={course.id} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition-fast)' }} className="hover-row">
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600 }}>{course.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>/{course.slug}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: 'var(--radius-sm)', 
                      fontSize: '0.75rem', 
                      background: course.isAvailable ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                      color: course.isAvailable ? 'var(--accent-emerald)' : 'var(--text-dim)',
                      border: '1px solid currentColor'
                    }}>
                      {course.isAvailable ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={tdStyle}>{course.duration}</td>
                  <td style={tdStyle}>{course.lessons.length} Lessons</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Stats</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '20px 24px',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--text-dim)',
};

const tdStyle: React.CSSProperties = {
  padding: '20px 24px',
  fontSize: '0.925rem',
};
