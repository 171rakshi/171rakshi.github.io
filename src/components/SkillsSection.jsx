import React, { useState, useMemo } from 'react';
import { skillsData } from '../data/portfolioData';

export default function SkillsSection({ onHighlightTech }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillHover, setActiveSkillHover] = useState(null);

  const getCategoryIcon = (color) => {
    switch (color) {
      case 'purple':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        );
      case 'cyan':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        );
      case 'emerald':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'amber':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );
      case 'rose':
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
    }
  };

  const categories = [
    { id: 'all', label: 'All Arsenal', count: 35 },
    { id: 'purple', label: 'Backend & APIs', count: 8 },
    { id: 'cyan', label: 'Languages & DBs', count: 7 },
    { id: 'emerald', label: 'Auth & Testing', count: 7 },
    { id: 'amber', label: 'Cloud & Realtime', count: 7 },
    { id: 'rose', label: 'Frontend', count: 7 }
  ];

  const filteredGroups = useMemo(() => {
    return skillsData.filter((group) => {
      const matchesCat = activeCategory === 'all' || group.color === activeCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inCategory = group.category.toLowerCase().includes(q);
      const inSkills = group.skills.some((s) => s.toLowerCase().includes(q));
      return inCategory || inSkills;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">TECHNICAL ARSENAL</span>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-subtitle">
            Curated stack utilized in production SaaS, REST APIs, database schemas, and modern interfaces. Click any skill to highlight its usage across the portfolio.
          </p>
        </div>

        {/* Dynamic Controls Bar: Filter Tabs & Live Search */}
        <div className="skills-controls-bar">
          <div className="skills-filter-tabs">
            {categories.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`skill-tab-btn ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                <span>{tab.label}</span>
                <span className="skill-tab-count">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="skills-search-wrap">
            <svg className="skills-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="skills-search-input"
              placeholder="Filter tech (e.g. Node, Python, Mongo, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="skills-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear filter"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Skills Grid */}
        <div className="skills-dynamic-grid">
          {filteredGroups.length === 0 ? (
            <div className="skills-empty-state">
              <p>No technologies found matching "<strong>{searchQuery}</strong>"</p>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredGroups.map((group, idx) => {
              const q = searchQuery.toLowerCase().trim();

              return (
                <div
                  key={idx}
                  className={`skill-dynamic-card ${group.color} ${group.fullWidth && activeCategory === 'all' ? 'full-width-span' : ''}`}
                >
                  {/* Top Glowing Color Line */}
                  <div className={`skill-card-glow-bar ${group.color}`}></div>

                  {/* Card Header */}
                  <div className="skill-card-head">
                    <div className="sch-left">
                      <div className={`group-icon-orb ${group.color}`}>
                        {getCategoryIcon(group.color)}
                      </div>
                      <div className="sch-title-wrap">
                        <h3 className="sch-title">{group.category}</h3>
                        <span className="sch-count-tag">{group.skills.length} Technologies</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Skills Tags */}
                  <div className="skill-interactive-tags">
                    {group.skills.map((skill, sIdx) => {
                      const isMatched = q && skill.toLowerCase().includes(q);
                      const isHovered = activeSkillHover === skill;

                      return (
                        <button
                          key={sIdx}
                          type="button"
                          className={`skill-interactive-pill ${isMatched ? 'highlighted-query' : ''} ${isHovered ? 'hover-pulse' : ''}`}
                          onClick={() => onHighlightTech(skill)}
                          onMouseEnter={() => setActiveSkillHover(skill)}
                          onMouseLeave={() => setActiveSkillHover(null)}
                          title={`Click to highlight ${skill} across projects & experience`}
                        >
                          <span className={`pill-status-dot ${group.color}`}></span>
                          <span className="pill-text">{skill}</span>
                          <span className="pill-arrow">&rarr;</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
