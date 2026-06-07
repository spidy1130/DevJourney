import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { MOCK_COURSES } from '@/lib/mock-data';
import Link from 'next/link';
import CourseTabs from '@/components/course/CourseTabs';
import CourseSidebar from '@/components/course/CourseSidebar';

export default async function CourseLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = MOCK_COURSES.find(c => c.slug === slug);

  if (!course) {
    return <div>Course not found</div>;
  }


  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        paddingTop: 'var(--header-height)',
        height: 'calc(100vh - var(--header-height))',
        position: 'relative',
      }}>
        {/* Sidebar — hidden on mobile, shown as drawer via CourseSidebar state */}
        <CourseSidebar course={course} />

        {/* Main Content — always full width on mobile since sidebar is absolute */}
        <main style={{ 
          flex: 1, 
          overflowY: 'auto', 
          background: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}>
          <CourseTabs slug={course.slug} />

          <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
