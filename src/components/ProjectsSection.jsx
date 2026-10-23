import React, { useState, useRef } from 'react';
import QuickCareSimulator from './QuickCareSimulator';

export default function ProjectsSection({ onOpenModal, onShowToast, activeFilterTech }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('sidewise'); // 'sidewise' | 'grid'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInlineSimulator, setShowInlineSimulator] = useState(false);
  const trackRef = useRef(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects (4)' },
    { id: 'personal', label: '⭐ Personal (QuickCare)' },
    { id: 'ai', label: '🤖 AI / Speech (Readify)' },
    { id: 'company', label: '🏢 Enterprise SaaS' }
  ];

  const matchesActiveTech = (textToMatch) => {
    if (!activeFilterTech) return false;
    return textToMatch.toLowerCase().includes(activeFilterTech.toLowerCase());
  };

  const scrollTrack = (direction) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('.project-card')?.offsetWidth || 480;
    const scrollAmount = (cardWidth + 24) * direction;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('.project-card')?.offsetWidth || 480;
    const index = Math.round(trackRef.current.scrollLeft / (cardWidth + 24));
    setCurrentSlide(Math.max(0, Math.min(3, index)));
  };

  const projects = [
    {
      id: 'quickcare',
      category: 'personal',
      badgeClass: 'badge-featured',
      badgeText: '⭐ PERSONAL PROJECT • STAR REPOSITORY',
      techBadge: 'React 19 • TypeScript • Django REST',
      title: 'QuickCare: Hospital OPD Queue Platform',
      pitch: 'Real-time outpatient queue engine eliminating waiting room congestion with dynamic live tokens and doctor desk workflows.',
      bullets: [
        { icon: '🎫', title: 'Live Wait-Time Tracker', desc: 'Real-time queue counters, estimated wait-time calculation, and chime alert notifications.' },
        { icon: '🔐', title: 'Role-Scoped JWT Security', desc: 'Secure Django REST serializers, token refreshes, and relational database modeling.' }
      ],
      tags: ['React 19', 'TypeScript', 'Django REST', 'SimpleJWT', 'SQL'],
      primaryLink: {
        text: 'View GitHub Repository ↗',
        href: 'https://github.com/171rakshi/Quickcare'
      },
      hasSimulator: true
    },
    {
      id: 'readify',
      category: 'ai',
      badgeClass: 'badge-ai',
      badgeText: '🤖 AI & SPEECH RECOGNITION',
      techBadge: 'Python NLP • Speech Engine • React 19',
      title: 'Readify: AI Reading Cadence Assistant',
      pitch: 'Intelligent reading assistant analyzing live audio streams to calculate speech cadence, phoneme accuracy, and WPM scoring.',
      bullets: [
        { icon: '🎙️', title: 'Real-Time Audio Ingestion', desc: 'Streams microphone audio via Web Audio API for continuous phoneme alignment.' },
        { icon: '📈', title: 'Cadence & WPM Scoring', desc: 'Calculates dynamic words-per-minute rate, articulation pauses, and fluency curve metrics.' }
      ],
      tags: ['React.js', 'Python', 'NLP', 'Speech Recognition', 'Web Audio API'],
      modalTrigger: 'readify',
      modalBtnText: 'Deep-Dive Architecture'
    },
    {
      id: 'activline',
      category: 'company',
      badgeClass: 'badge-company',
      badgeText: '🏢 ENTERPRISE PRODUCTION SAAS • KODS',
      techBadge: 'Node.js • Express • MongoDB • SQL',
      title: 'ActivLine: ISP & Broadband Operations SaaS',
      pitch: 'High-availability ISP subscriber and broadband operations platform with automated billing cycles and ledger reconciliation.',
      bullets: [
        { icon: '🔄', title: 'Automated Ledger Cron', desc: 'Reconciles Razorpay payment webhooks against subscriber ledgers, cutting drift by 98%.' },
        { icon: '📄', title: 'Dynamic Invoice Engine', desc: 'Automated billing invoice PDF creation via PDFKit and financial exports in ExcelJS.' }
      ],
      tags: ['Node.js', 'Express', 'MongoDB', 'SQL', 'Razorpay', 'Socket.io'],
      modalTrigger: 'activline',
      modalBtnText: 'View Tech Specs'
    },
    {
      id: 'joms',
      category: 'company',
      badgeClass: 'badge-company',
      badgeText: '🏢 ENTERPRISE PLATFORM • KODS',
      techBadge: 'React • Node.js • Express • MongoDB',
      title: 'JOMS: On-Demand Marketplace Platform',
      pitch: 'Full-stack marketplace ecosystem for booking venue slots and expert consultations with strict slot concurrency control.',
      bullets: [
        { icon: '👥', title: 'Marketplace Slot Booking', desc: 'Venue bookings and expert consultations with transactional calendar slot locking.' },
        { icon: '🛡️', title: 'Role-Based Access Control', desc: 'Fine-grained admin governance, multi-tier user permissions, and audit tracking.' }
      ],
      tags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
      modalTrigger: 'joms',
      modalBtnText: 'View Architecture'
    }
  ];

  const visibleProjects = projects.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="projects-header-wrapper">
          <div className="section-header-left">
            <span className="section-tag">ENGINEERING PORTFOLIO</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Browse production-grade applications, AI speech systems, and enterprise architectures side-by-side.
            </p>
          </div>

          {/* Interactive Sidewise Controls */}
          <div className="sidewise-controls-bar">
            {/* View Mode Switcher */}
            <div className="view-mode-toggle" title="Switch between Sidewise Slider and Side-by-Side Grid">
              <button
                type="button"
                className={`vm-btn ${viewMode === 'sidewise' ? 'active' : ''}`}
                onClick={() => setViewMode('sidewise')}
                aria-label="Sidewise Horizontal Scroll View"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span>Sidewise</span>
              </button>
              <button
                type="button"
                className={`vm-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Side-by-Side 2-Column Grid View"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>2-Col Grid</span>
              </button>
            </div>

            {/* Sidewise Arrow Navigators */}
            {viewMode === 'sidewise' && (
              <div className="sidewise-arrows">
                <button
                  type="button"
                  className="arrow-nav-btn prev"
                  onClick={() => scrollTrack(-1)}
                  aria-label="Previous project"
                  title="Scroll left to previous project"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="arrow-nav-btn next"
                  onClick={() => scrollTrack(1)}
                  aria-label="Next project"
                  title="Scroll right to next project"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="project-filters-row">
          <div className="project-filters">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                className={`filter-btn ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {viewMode === 'sidewise' && (
            <div className="sidewise-hint-pill">
              <span>← Swipe or Click Arrows to Browse Sidewise →</span>
            </div>
          )}
        </div>

        {/* Projects Container (Sidewise Track or 2-Col Grid) */}
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className={`projects-display-container ${viewMode === 'sidewise' ? 'sidewise-track' : 'side-by-side-grid'}`}
        >
          {visibleProjects.map((p) => {
            const isMatch = matchesActiveTech(`${p.title} ${p.tags.join(' ')}`);

            return (
              <div
                key={p.id}
                className={`card project-card ${p.id === 'quickcare' ? 'featured-card' : ''} ${isMatch ? 'highlighted-match' : ''}`}
                data-category={p.category}
              >
                {/* Badge Row */}
                <div className="project-badge-row">
                  <span className={p.badgeClass}>{p.badgeText}</span>
                  <span className="badge-tech">{p.techBadge}</span>
                </div>

                {/* Project Body */}
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-pitch">{p.pitch}</p>

                  {/* Bullets Grid (2x2 Balanced Across All Cards) */}
                  <div className="feature-bullets-grid">
                    {p.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="feature-bullet">
                        <span className="fb-icon">{b.icon}</span>
                        <div>
                          <strong>{b.title}:</strong>
                          <p>{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="project-tags">
                    {p.tags.map((tag, tIdx) => (
                      <span key={tIdx}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="project-footer">
                  {p.primaryLink && (
                    <a
                      href={p.primaryLink.href}
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="launchWorkingAppCardBtn"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      <span>{p.primaryLink.text}</span>
                    </a>
                  )}

                  {p.hasSimulator && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onOpenModal('quickcareSimulator')}
                      title="Launch live interactive OPD token desk simulator"
                    >
                      <span>⚡ Launch Live Simulator</span>
                    </button>
                  )}

                  {p.modalTrigger && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onOpenModal(p.modalTrigger)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <span>{p.modalBtnText}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidewise Slide Indicators */}
        {viewMode === 'sidewise' && (
          <div className="sidewise-dots-indicator">
            {visibleProjects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`dot-pill ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  if (!trackRef.current) return;
                  const cardWidth = trackRef.current.querySelector('.project-card')?.offsetWidth || 480;
                  trackRef.current.scrollTo({ left: (cardWidth + 24) * idx, behavior: 'smooth' });
                  setCurrentSlide(idx);
                }}
                aria-label={`Jump to project ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
