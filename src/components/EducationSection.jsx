import React, { useState } from 'react';

export default function EducationSection() {
  const [activeCard, setActiveCard] = useState(null);

  const educationList = [
    {
      id: 'be',
      degree: 'Bachelor of Engineering (B.E.)',
      major: 'Computer Science & Engineering',
      institution: 'MVJ College of Engineering',
      location: 'Bengaluru, Karnataka',
      period: '2021 – 2025',
      score: '8.34',
      scoreScale: '/ 10.0',
      scoreBadge: 'First Class with Distinction',
      color: 'indigo',
      iconSvg: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      coursePills: [
        { label: 'Data Structures & Algorithms', tag: 'Core CS' },
        { label: 'Database Systems (DBMS & SQL)', tag: 'Data' },
        { label: 'Operating Systems & Concurrency', tag: 'Systems' },
        { label: 'Computer Networks & Protocols', tag: 'Networks' },
        { label: 'Object-Oriented Programming (OOP)', tag: 'Design' },
        { label: 'Software Engineering Principles', tag: 'Architecture' }
      ],
      highlights: [
        'Rigorous 4-year curriculum covering computational theory, distributed paradigms, and system design.',
        'High proficiency in relational data normalization, transaction modeling, and algorithmic complexity.'
      ]
    },
    {
      id: 'puc',
      degree: 'Pre-University Course (PUC)',
      major: 'PCMB (Physics, Chemistry, Math, Biology)',
      institution: 'Sri Vasavi P U College',
      location: 'Challakere, Karnataka',
      period: '2019 – 2021',
      score: '92.8%',
      scoreScale: 'Aggregate',
      scoreBadge: 'Top Percentile Distinction',
      color: 'cyan',
      iconSvg: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      coursePills: [
        { label: 'Advanced Mathematics', tag: 'Logic' },
        { label: 'Applied Physics', tag: 'Analytical' },
        { label: 'Chemical Sciences', tag: 'Empirical' },
        { label: 'Biological Systems', tag: 'Scientific' }
      ],
      highlights: [
        'Graduated with distinction honors, achieving an overall score of 92.8% in state examinations.',
        'Strong foundational mastery in calculus, linear algebra, discrete reasoning, and quantitative analysis.'
      ]
    }
  ];

  return (
    <section id="education" className="section education-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">ACADEMIC FOUNDATION</span>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal computer science rigor paired with continuous engineering excellence.
          </p>
        </div>

        {/* Dynamic Interactive Cards Grid */}
        <div className="edu-interactive-grid">
          {educationList.map((edu) => {
            const isHovered = activeCard === edu.id;

            return (
              <div
                key={edu.id}
                className={`edu-dynamic-card ${edu.color} ${isHovered ? 'card-glow' : ''}`}
                onMouseEnter={() => setActiveCard(edu.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Glowing Top Accent Strip */}
                <div className={`edu-top-accent-bar ${edu.color}`}></div>

                {/* Card Header */}
                <div className="edu-card-top-row">
                  <div className="edu-icon-shield">
                    <span className={`edu-icon-inner ${edu.color}`}>{edu.iconSvg}</span>
                  </div>

                  <div className="edu-grade-capsule">
                    <div className="egc-score-group">
                      <span className="egc-score">{edu.score}</span>
                      <span className="egc-scale">{edu.scoreScale}</span>
                    </div>
                    <span className="egc-badge">{edu.scoreBadge}</span>
                  </div>
                </div>

                {/* Degree Title & Institution */}
                <div className="edu-title-group">
                  <h3 className="edu-degree-title">{edu.degree}</h3>
                  <div className="edu-major-subtitle">{edu.major}</div>
                  <div className="edu-institution-row">
                    <span className="edu-inst-name">{edu.institution}</span>
                    <span className="edu-dot-sep">•</span>
                    <span className="edu-inst-loc">{edu.location}</span>
                  </div>
                  <div className="edu-timeline-pill">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Coursework & Competency Matrix */}
                <div className="edu-coursework-section">
                  <span className="edu-sec-label">Core Coursework &amp; Key Focus:</span>
                  <div className="edu-pills-wrap">
                    {edu.coursePills.map((c, cIdx) => (
                      <span key={cIdx} className="edu-chip" title={`${c.label} (${c.tag})`}>
                        <span className="chip-bullet">•</span>
                        <span>{c.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Academic Highlights */}
                <div className="edu-highlights-box">
                  <ul className="edu-highlights-list">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx}>
                        <svg className="edu-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
