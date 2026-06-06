'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

export default function CourseTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  const params = useParams();
  const day = params?.day || '1'; // Default to day 1

  const tabs = [
    { label: 'Lessons', path: `/courses/${slug}/${day}`, exactMatch: `/courses/${slug}/${day}` },
    { label: 'Practice', path: `/courses/${slug}/${day}/practice`, exactMatch: `/courses/${slug}/${day}/practice` },
    { label: 'Quiz', path: `/courses/${slug}/${day}/quiz`, exactMatch: `/courses/${slug}/${day}/quiz` },
    { label: 'Projects', path: `/courses/${slug}/projects`, match: `/courses/${slug}/projects` }
  ];

  return (
    <div className="glass" style={{
      padding: '0 40px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      gap: '32px'
    }}>
      {tabs.map(tab => {
        let isActive = false;
        if (tab.exactMatch) {
          isActive = pathname === tab.exactMatch;
        } else if (tab.match) {
          isActive = pathname.includes(tab.match);
        }

        return (
          <Link 
            key={tab.label} 
            href={tab.path} 
            style={{
              padding: '20px 0',
              color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.925rem',
              borderBottom: '2px solid',
              borderColor: isActive ? 'var(--accent-blue)' : 'transparent',
              transition: 'var(--transition-fast)',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
