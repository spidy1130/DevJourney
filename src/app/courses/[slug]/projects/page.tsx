import React from 'react';

const COURSE_PROJECTS: Record<string, any[]> = {
  html: [
    {
      id: 'p-html-1',
      title: "Personal Portfolio Page",
      difficulty: "Easy",
      description: "Build a single-page portfolio layout representing your skills, experience, and contact information using raw semantic HTML tags.",
      requirements: [
        "Include a navigation bar linking to different sections of the page",
        "Use appropriate semantic tags (header, main, section, footer)",
        "Add a working contact form with name, email, and message inputs",
        "Display a table listing your current coding projects and status"
      ]
    }
  ],
  css: [
    {
      id: 'p-css-1',
      title: "Product Landing Page",
      difficulty: "Medium",
      description: "Design and style a responsive landing page for a modern software product or physical item using Flexbox, CSS Grid, and custom fonts.",
      requirements: [
        "Create a fixed header with logo and navigation links",
        "Build a hero section with a smooth gradient background and CTA buttons",
        "Use Flexbox for a 3-column feature section",
        "Implement a responsive layout that changes grid structure on mobile devices using Media Queries"
      ]
    }
  ],
  javascript: [
    {
      id: 'p-js-1',
      title: "Interactive Tasks Dashboard",
      difficulty: "Hard",
      description: "Build a functional Todo/Task application that allows adding, checking, filtering, and deleting tasks, storing data in LocalStorage.",
      requirements: [
        "Dynamic DOM manipulation to render list items",
        "Store and retrieve tasks from LocalStorage so data persists on page refresh",
        "Add filters to view 'All', 'Active', and 'Completed' tasks",
        "Implement smooth entry and exit transitions for list elements using JavaScript-triggered CSS classes"
      ]
    }
  ]
};

export default async function ProjectsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = COURSE_PROJECTS[slug] || COURSE_PROJECTS.html;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Capstone <span className="text-gradient">Projects</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Put your skills to the test with real-world building challenges.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {projects.map((project) => (
          <div key={project.id} className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{project.title}</h2>
              <span style={{ 
                fontSize: '0.875rem', 
                padding: '4px 12px', 
                background: project.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.1)' : project.difficulty === 'Medium' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)', 
                color: project.difficulty === 'Easy' ? 'var(--accent-emerald)' : project.difficulty === 'Medium' ? 'var(--accent-blue)' : 'var(--accent-purple)', 
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600
              }}>
                {project.difficulty}
              </span>
            </div>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
              {project.description}
            </p>

            <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '1rem', fontWeight: 600 }}>Acceptance Criteria:</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)' }}>
                {project.requirements.map((req: string, idx: number) => (
                  <li key={idx} style={{ lineHeight: 1.5 }}>{req}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
              <button className="btn-primary" style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', fontWeight: 600, border: 'none', background: 'var(--accent-blue)', color: 'white', cursor: 'pointer' }}>
                Start Project
              </button>
              <button className="btn-outline" style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', fontWeight: 600, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }}>
                Submit Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
