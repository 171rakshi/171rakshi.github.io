import React, { useState, useEffect, useRef } from 'react';
import QuickCareSimulator from './QuickCareSimulator';

export default function Modals({
  activeModal,
  onCloseModal,
  onOpenModal,
  onToggleTheme,
  onHighlightTech,
  onCopyText,
  onShowToast
}) {
  const [cmdSearch, setCmdSearch] = useState('');
  const [cmdIndex, setCmdIndex] = useState(0);
  const cmdInputRef = useRef(null);

  // Lock background scrolling when modal is active, allowing internal modal scroll
  useEffect(() => {
    if (activeModal) {
      const originalOverflow = document.body.style.overflow;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '';
      };
    }
  }, [activeModal]);

  // Clean, isolated print handler for A4 single-page resume
  const handlePrintResume = () => {
    const paperEl = document.getElementById('resumePaper');
    if (!paperEl) {
      window.print();
      return;
    }

    const existingFrame = document.getElementById('resume-print-frame');
    if (existingFrame) existingFrame.remove();

    const printFrame = document.createElement('iframe');
    printFrame.id = 'resume-print-frame';
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rakshitha_E_Software_Developer_Resume</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4 portrait;
              margin: 7mm 10mm;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #111827;
              background: #ffffff;
              font-size: 8.5pt;
              line-height: 1.33;
              padding: 0;
              margin: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .resume-paper { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; }
            .rp-header { text-align: center; margin-bottom: 5px; }
            .rp-name { font-size: 16pt; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
            .rp-subtitle { font-size: 9pt; font-weight: 700; color: #2563eb; margin-bottom: 3px; }
            .rp-contacts { font-size: 7.8pt; color: #475569; display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; }
            .rp-contacts a { color: #2563eb; text-decoration: none; }
            .rp-contacts .sep { color: #94a3b8; }
            .rp-divider { border: none; border-top: 1.5px solid #0f172a; margin: 6px 0 8px 0; }
            .rp-section { margin-bottom: 8px; page-break-inside: avoid; }
            .rp-sec-title {
              font-size: 8.3pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
              color: #0f172a; border-bottom: 1px solid #94a3b8; padding-bottom: 2px; margin-bottom: 4px;
            }
            .rp-paragraph { font-size: 8.1pt; line-height: 1.36; color: #334155; }
            .rp-skills-grid { display: flex; flex-direction: column; gap: 2.5px; }
            .rp-skill-row { font-size: 7.9pt; line-height: 1.32; color: #334155; }
            .rp-skill-cat { font-weight: 700; color: #0f172a; display: inline-block; min-width: 110px; }
            .rp-entry { margin-bottom: 6px; page-break-inside: avoid; }
            .rp-entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 4px; }
            .rp-role { font-size: 8.3pt; font-weight: 700; color: #0f172a; }
            .rp-company { font-size: 8.1pt; color: #475569; }
            .rp-date { font-size: 7.5pt; font-weight: 600; color: #64748b; }
            .rp-link { font-size: 7.5pt; color: #2563eb; text-decoration: none; }
            .rp-bullets { margin: 2px 0 0 0; padding-left: 14px; display: flex; flex-direction: column; gap: 2px; }
            .rp-bullets li { font-size: 7.8pt; line-height: 1.32; color: #334155; }
            .rp-bullets strong { color: #0f172a; }
          </style>
        </head>
        <body>
          <div class="resume-paper">
            ${paperEl.innerHTML}
          </div>
        </body>
      </html>
    `);
    frameDoc.close();

    setTimeout(() => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    }, 250);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal) {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onCloseModal]);

  // Focus input when Command Palette opens
  useEffect(() => {
    if (activeModal === 'cmdPalette') {
      setCmdSearch('');
      setCmdIndex(0);
      setTimeout(() => {
        cmdInputRef.current?.focus();
      }, 50);
    }
  }, [activeModal]);

  if (!activeModal) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onCloseModal();
    }
  };

  const scrollTo = (id) => {
    onCloseModal();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Commands for Command Palette
  const commands = [
    { category: "Navigation", label: "Jump to Overview", action: () => scrollTo("hero"), tag: "Section" },
    { category: "Navigation", label: "Jump to Engineering Philosophy", action: () => scrollTo("about"), tag: "Section" },
    { category: "Navigation", label: "Jump to Technical Arsenal (Skills)", action: () => scrollTo("skills"), tag: "Section" },
    { category: "Navigation", label: "Jump to Work Experience", action: () => scrollTo("experience"), tag: "Section" },
    { category: "Navigation", label: "Jump to Featured Projects", action: () => scrollTo("projects"), tag: "Section" },
    { category: "Navigation", label: "Jump to Education", action: () => scrollTo("education"), tag: "Section" },
    { category: "Navigation", label: "Jump to Contact", action: () => scrollTo("contact"), tag: "Section" },

    { category: "Projects", label: "QuickCare Hospital OPD Queue (GitHub)", action: () => { window.open("https://github.com/171rakshi/Quickcare", "_blank"); }, tag: "GitHub" },
    { category: "Projects", label: "Launch QuickCare Interactive Token Simulator", action: () => onOpenModal("quickcareSimulator"), tag: "Demo" },
    { category: "Projects", label: "Readify AI Speech Recognition Architecture", action: () => onOpenModal("readify"), tag: "Details" },
    { category: "Projects", label: "ActivLine ISP SaaS Platform Architecture", action: () => onOpenModal("activline"), tag: "Details" },
    { category: "Projects", label: "JOMS On-Demand Marketplace Architecture", action: () => onOpenModal("joms"), tag: "Details" },

    { category: "Skills", label: "Node.js & Express.js Architecture", action: () => onHighlightTech("Node.js"), tag: "Backend" },
    { category: "Skills", label: "Python & Django REST Framework", action: () => onHighlightTech("Python"), tag: "Backend" },
    { category: "Skills", label: "MongoDB & SQL Database Modeling", action: () => onHighlightTech("MongoDB"), tag: "Database" },
    { category: "Skills", label: "React 19 & TypeScript Frontend", action: () => onHighlightTech("React 19"), tag: "Frontend" },

    { category: "Actions", label: "Toggle Dark / Light Theme", action: onToggleTheme, tag: "UI" },
    { category: "Actions", label: "View & Print Curriculum Vitae (Resume)", action: () => onOpenModal("resume"), tag: "Resume" },
    { category: "Actions", label: "Copy Email: rakshithasannira2003@gmail.com", action: () => onCopyText("rakshithasannira2003@gmail.com"), tag: "Copy" },
    { category: "Actions", label: "Copy Phone: +91 9686344910", action: () => onCopyText("+919686344910"), tag: "Copy" },
    { category: "Actions", label: "Visit GitHub Profile (171rakshi)", action: () => window.open("https://github.com/171rakshi", "_blank"), tag: "External" }
  ];

  const filteredCommands = commands.filter(c => {
    const q = cmdSearch.toLowerCase();
    return !q || c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q);
  });

  const handleCmdKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCmdIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCmdIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[cmdIndex]) {
        filteredCommands[cmdIndex].action();
        onCloseModal();
      }
    }
  };

  return (
    <>
      {/* 1. QuickCare Simulator Modal */}
      {activeModal === 'quickcareSimulator' && (
        <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
          <div className="modal-window modern-modal sim-modal">
            <div className="modal-head">
              <div className="modal-title-group">
                <span className="modal-tag indigo">⭐ Personal Project &bull; Live Interactive Simulator</span>
                <h3 className="modal-headline">QuickCare: Hospital OPD Token Desk</h3>
              </div>
              <button className="modal-close" onClick={onCloseModal} aria-label="Close dialog">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body-content">
              <p className="modal-lead">
                Interactive real-time outpatient department (OPD) queue engine. Test issuing tokens, doctor calling workflows, audio chime alerts, and live queue updates.
              </p>
              <QuickCareSimulator onShowToast={onShowToast || onCopyText} />
            </div>
            <div className="modal-foot">
              <a
                href="https://github.com/171rakshi/Quickcare"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                <span>View QuickCare Repository &rarr;</span>
              </a>
              <button className="btn btn-sm btn-secondary" onClick={onCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Readify Modal */}
      {activeModal === 'readify' && (
        <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
          <div className="modal-window modern-modal">
            <div className="modal-head">
              <div className="modal-title-group">
                <span className="modal-tag cyan">AI & Speech Recognition</span>
                <h3 className="modal-headline">Readify: Intelligent Reading Cadence Assistant</h3>
              </div>
              <button className="modal-close" onClick={onCloseModal} aria-label="Close dialog">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body-content">
              <p className="modal-lead">
                Built to assess and improve reading fluency, speech cadence, and pronunciation accuracy by analyzing real-time audio streams with NLP.
              </p>

              {/* Feature Highlights Grid */}
              <div className="modal-features-list">
                <div className="m-feature-row">
                  <div className="m-feature-icon indigo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Real-Time Speech Processing</strong>
                    <p>Captures client microphone streams via Web Audio API, chunking audio chunks into Python for noise filtration and phoneme alignment.</p>
                  </div>
                </div>

                <div className="m-feature-row">
                  <div className="m-feature-icon cyan">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>NLP Fluency & Words-Per-Minute Scoring</strong>
                    <p>Calculates dynamic WPM cadence, evaluates articulation confidence intervals, and detects pauses to measure true reading comprehension.</p>
                  </div>
                </div>

                <div className="m-feature-row">
                  <div className="m-feature-icon emerald">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Interactive React Analytics Dashboard</strong>
                    <p>Graphs user fluency curves, pronunciation error hotspots, and recommends adaptive reading exercises.</p>
                  </div>
                </div>
              </div>

              {/* End-to-End Pipeline Flow */}
              <div className="modal-flow-box">
                <span className="mfb-title">End-to-End Processing Pipeline:</span>
                <div className="architecture-flow-diagram">
                  <div className="flow-step">Audio Stream (Mic)</div>
                  <div className="flow-arrow">&rarr;</div>
                  <div className="flow-step">Python Speech Engine</div>
                  <div className="flow-arrow">&rarr;</div>
                  <div className="flow-step">NLP Cadence &amp; WPM</div>
                  <div className="flow-arrow">&rarr;</div>
                  <div className="flow-step">React 19 Analytics</div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="modal-tech-bar">
                <span className="mt-label">Tech Stack:</span>
                <span className="m-tag">React.js</span>
                <span className="m-tag">Python</span>
                <span className="m-tag">NLP</span>
                <span className="m-tag">Speech Recognition</span>
                <span className="m-tag">Web Audio API</span>
              </div>
            </div>
            <div className="modal-foot">
              <span className="modal-foot-note">Backend staging deployment in progress. Public demo link connecting shortly.</span>
              <button className="btn btn-sm btn-primary" onClick={onCloseModal}>Close Overview</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. ActivLine Modal */}
      {activeModal === 'activline' && (
        <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
          <div className="modal-window modern-modal">
            <div className="modal-head">
              <div className="modal-title-group">
                <span className="modal-tag amber">Enterprise Production SaaS &bull; Kods Technologies</span>
                <h3 className="modal-headline">ActivLine: ISP & Broadband Operations Architecture</h3>
              </div>
              <button className="modal-close" onClick={onCloseModal} aria-label="Close dialog">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body-content">
              <p className="modal-lead">
                High-availability enterprise system managing subscriber lifecycles, automated billing cycles, third-party payment gateways, and data reconciliation for regional broadband providers.
              </p>

              {/* Highlights Metric Badges */}
              <div className="modal-stat-ribbon">
                <div className="ms-box">
                  <span className="ms-num">99.8%</span>
                  <span className="ms-lbl">Billing Ledger Accuracy</span>
                </div>
                <div className="ms-box">
                  <span className="ms-num">98%</span>
                  <span className="ms-lbl">Reduced Ledger Drift</span>
                </div>
                <div className="ms-box">
                  <span className="ms-num">4+</span>
                  <span className="ms-lbl">Synchronized 3rd-Party APIs</span>
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="modal-features-list">
                <div className="m-feature-row">
                  <div className="m-feature-icon purple">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                      <line x1="6" y1="6" x2="6.01" y2="6"></line>
                      <line x1="6" y1="18" x2="6.01" y2="18"></line>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Controller-Service-Repository Pattern</strong>
                    <p>Strict decoupling across HTTP controllers with Joi schema validation, multi-tenant billing services, and MongoDB / SQL repositories.</p>
                  </div>
                </div>

                <div className="m-feature-row">
                  <div className="m-feature-icon cyan">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Scheduled Reconciliation Cron Engines</strong>
                    <p>Automated scheduled cron jobs cross-reference Razorpay webhooks against subscriber billing ledgers, eliminating payment discrepancies.</p>
                  </div>
                </div>

                <div className="m-feature-row">
                  <div className="m-feature-icon emerald">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Dynamic Reporting & Live Alerts</strong>
                    <p>Automated PDF invoice generation via PDFKit, financial Excel exports via ExcelJS, and live session updates with Socket.io.</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="modal-tech-bar">
                <span className="mt-label">Tech Stack:</span>
                <span className="m-tag">Node.js</span>
                <span className="m-tag">Express.js</span>
                <span className="m-tag">MongoDB</span>
                <span className="m-tag">SQL</span>
                <span className="m-tag">Razorpay</span>
                <span className="m-tag">Socket.io</span>
                <span className="m-tag">Vitest</span>
              </div>
            </div>
            <div className="modal-foot">
              <span className="modal-foot-note">Internal Enterprise System &bull; Kods Technologies Private Limited</span>
              <button className="btn btn-sm btn-primary" onClick={onCloseModal}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. JOMS Modal */}
      {activeModal === 'joms' && (
        <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
          <div className="modal-window modern-modal">
            <div className="modal-head">
              <div className="modal-title-group">
                <span className="modal-tag amber">Enterprise Platform &bull; Kods Technologies</span>
                <h3 className="modal-headline">JOMS: On-Demand Marketplace Platform Architecture</h3>
              </div>
              <button className="modal-close" onClick={onCloseModal} aria-label="Close dialog">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body-content">
              <p className="modal-lead">
                Full-stack marketplace ecosystem for booking venue slots, consulting domain experts, and managing recurring memberships for 100+ active users.
              </p>

              {/* Stat Ribbon */}
              <div className="modal-stat-ribbon">
                <div className="ms-box">
                  <span className="ms-num">100+</span>
                  <span className="ms-lbl">Active Users Served</span>
                </div>
                <div className="ms-box">
                  <span className="ms-num">Zero</span>
                  <span className="ms-lbl">Slot Concurrency Conflicts</span>
                </div>
                <div className="ms-box">
                  <span className="ms-num">100%</span>
                  <span className="ms-lbl">RBAC Permission Coverage</span>
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="modal-features-list">
                <div className="m-feature-row">
                  <div className="m-feature-icon purple">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Calendar Slot Concurrency Workflows</strong>
                    <p>Engineered venue bookings, expert consultations, and membership pipelines with strict transactional slot locking.</p>
                  </div>
                </div>

                <div className="m-feature-row">
                  <div className="m-feature-icon cyan">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Administrative Governance & Auditing</strong>
                    <p>Role-Based Access Control protecting admin approval workflows, bulk mutations, fuzzy search, and cursor-based pagination.</p>
                  </div>
                </div>

                <div className="m-feature-row">
                  <div className="m-feature-icon emerald">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                    </svg>
                  </div>
                  <div className="m-feature-text">
                    <strong>Media & Reporting Microservices</strong>
                    <p>Cloudinary microservices for credential file uploads alongside ExcelJS pipelines for automated financial audit logs.</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="modal-tech-bar">
                <span className="mt-label">Tech Stack:</span>
                <span className="m-tag">React.js</span>
                <span className="m-tag">Node.js</span>
                <span className="m-tag">Express.js</span>
                <span className="m-tag">MongoDB</span>
                <span className="m-tag">Cloudinary</span>
                <span className="m-tag">ExcelJS</span>
              </div>
            </div>
            <div className="modal-foot">
              <span className="modal-foot-note">Internal Enterprise Platform &bull; Kods Technologies Private Limited</span>
              <button className="btn btn-sm btn-primary" onClick={onCloseModal}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Executive Curriculum Vitae / Resume Sheet */}
      {activeModal === 'resume' && (
        <div className="modal-backdrop" id="resumeModal" onClick={handleBackdropClick} role="dialog" aria-modal="true">
          <div className="modal-window resume-window-wrapper">
            {/* Top Toolbar */}
            <div className="resume-toolbar">
              <div className="rt-left">
                <span className="rt-title">Curriculum Vitae &bull; Rakshitha E</span>
                <span className="rt-badge">Ready for PDF / Print</span>
              </div>
              <div className="rt-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-primary print-trigger-btn"
                  onClick={handlePrintResume}
                  title="Print or Save as PDF"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    const resumeContent = `RAKSHITHA E
Software Developer • Bengaluru, India
Email: rakshithasannira2003@gmail.com | Phone: +91 9686344910
GitHub: https://github.com/171rakshi

PROFESSIONAL SUMMARY
Software developer building scalable, secure web applications using Node.js, Express.js, Python, Django, MongoDB, and SQL. Proven track record delivering production SaaS solutions, REST APIs, role-based access control (RBAC), and third-party integrations.

TECHNICAL SKILLS
• Languages: Python, TypeScript, JavaScript, SQL
• Backend: Node.js, Express.js, Django REST Framework, CSR Pattern, Joi
• Databases: MongoDB, SQLite, SQL
• Frontend: React 19, TypeScript, Vite, Modern CSS
• Tools: Git, Socket.io, Razorpay, Cloudinary, PDFKit, ExcelJS, Vitest

EXPERIENCE
• MERN Stack Developer | Kods Technologies (6 Months, Bengaluru)
  Engineered core services for enterprise ISP SaaS (ActivLine) and on-demand marketplace (JOMS).
  Synchronized 4+ external APIs with scheduled cron engines reducing ledger drift by 98%.
• Python Full Stack Developer Intern | PySpiders (Apr 2025 – Oct 2025)
  Engineered database-driven web applications using Django MVT architecture and ORM queries.
• Full Stack Developer Intern | Campus To Tech (3 Months)
  Built responsive full-stack e-commerce prototypes with React client state and REST API endpoints.

EDUCATION
• B.E. in Computer Science & Engineering | MVJ College of Engineering (2021 – 2025 | CGPA: 8.34)
• PUC (PCMB) | Sri Vasavi P U College (2021 | 92.8%)`;
                    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Rakshitha_E_Software_Developer_Resume.txt';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    if (onShowToast) onShowToast('📄 Resume downloaded as text file!');
                  }}
                  title="Download clean plain text resume file"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download .txt</span>
                </button>
                <button className="modal-close" onClick={onCloseModal} aria-label="Close dialog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* The Authentic White Paper Resume Sheet */}
            <div className="resume-viewport">
              <div className="resume-paper" id="resumePaper">
                {/* Header */}
                <header className="rp-header">
                  <h1 className="rp-name">RAKSHITHA E</h1>
                  <p className="rp-subtitle">Software Developer &bull; Full-Stack &amp; Backend Engineering</p>
                  <div className="rp-contacts">
                    <span>Bengaluru, Karnataka, India</span>
                    <span className="sep">&bull;</span>
                    <a href="tel:+919686344910">+91 9686344910</a>
                    <span className="sep">&bull;</span>
                    <a href="mailto:rakshithasannira2003@gmail.com">rakshithasannira2003@gmail.com</a>
                    <span className="sep">&bull;</span>
                    <a href="https://github.com/171rakshi" target="_blank" rel="noreferrer">github.com/171rakshi</a>
                  </div>
                </header>

                <hr className="rp-divider" />

                {/* Professional Summary */}
                <section className="rp-section">
                  <h2 className="rp-sec-title">Professional Summary</h2>
                  <p className="rp-paragraph">
                    Performance-driven <strong>Software Developer</strong> with hands-on production experience designing, building, and deploying scalable web applications, REST APIs, and microservices using <strong>Node.js, Express.js, Python, Django, MongoDB, and SQL</strong>. Proven expertise at Kods Technologies engineering multi-tenant SaaS features, role-based access control (RBAC), and automated cron reconciliation engines reducing financial ledger drift by <strong>98%</strong>.
                  </p>
                </section>

                {/* Technical Skills */}
                <section className="rp-section">
                  <h2 className="rp-sec-title">Technical Skills</h2>
                  <div className="rp-skills-grid">
                    <div className="rp-skill-row">
                      <span className="rp-skill-cat">Languages:</span>
                      <span className="rp-skill-val">Python, TypeScript, JavaScript (ES6+), SQL, C/C++</span>
                    </div>
                    <div className="rp-skill-row">
                      <span className="rp-skill-cat">Backend &amp; APIs:</span>
                      <span className="rp-skill-val">Node.js, Express.js, Django REST Framework, MVC / CSR Pattern, Joi Validation, RESTful APIs</span>
                    </div>
                    <div className="rp-skill-row">
                      <span className="rp-skill-cat">Databases:</span>
                      <span className="rp-skill-val">MongoDB (Mongoose), SQLite, SQL Relational Modeling, Indexing &amp; Query Optimization</span>
                    </div>
                    <div className="rp-skill-row">
                      <span className="rp-skill-cat">Frontend:</span>
                      <span className="rp-skill-val">React 19, TypeScript, Modern CSS3, HTML5, Responsive Layouts, Vite</span>
                    </div>
                    <div className="rp-skill-row">
                      <span className="rp-skill-cat">Tools &amp; Libraries:</span>
                      <span className="rp-skill-val">Git, GitHub, Socket.io, Razorpay Webhooks, Cloudinary Microservices, PDFKit, ExcelJS, Vitest, Postman</span>
                    </div>
                  </div>
                </section>

                {/* Professional Experience */}
                <section className="rp-section">
                  <h2 className="rp-sec-title">Work Experience</h2>

                  <div className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <strong className="rp-role">MERN Stack Developer</strong>
                        <span className="rp-company"> &mdash; Kods Technologies Private Limited</span>
                      </div>
                      <span className="rp-date">6 Months | Bengaluru, India</span>
                    </div>
                    <ul className="rp-bullets">
                      <li>
                        Engineered core backend services and REST APIs for <strong>ActivLine</strong>, an enterprise ISP SaaS managing subscriber lifecycles, automated billing schedules, and third-party telecom integrations.
                      </li>
                      <li>
                        Synchronized 4+ external telecom and banking APIs using automated cron reconciliation engines, reducing subscriber billing ledger discrepancies by <strong>98%</strong>.
                      </li>
                      <li>
                        Implemented dynamic billing PDF invoice generation pipelines using <strong>PDFKit</strong> and financial auditing spreadsheets using <strong>ExcelJS</strong>.
                      </li>
                      <li>
                        Architected Role-Based Access Control (RBAC), multi-role permissions, fuzzy search, and calendar booking slot concurrency protection for <strong>JOMS</strong> marketplace serving 100+ active users.
                      </li>
                    </ul>
                  </div>

                  <div className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <strong className="rp-role">Python Full Stack Developer Intern</strong>
                        <span className="rp-company"> &mdash; PySpiders</span>
                      </div>
                      <span className="rp-date">Apr 2025 – Oct 2025 | Bengaluru, India</span>
                    </div>
                    <ul className="rp-bullets">
                      <li>
                        Developed database-driven web applications leveraging Django MVT (Model-View-Template) architecture, Django ORM queries, and relational database schemas.
                      </li>
                      <li>
                        Engineered modular backend routing, user session authentication, and automated form validation.
                      </li>
                    </ul>
                  </div>

                  <div className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <strong className="rp-role">Full Stack Developer Intern</strong>
                        <span className="rp-company"> &mdash; Campus To Tech</span>
                      </div>
                      <span className="rp-date">3 Months | Remote</span>
                    </div>
                    <ul className="rp-bullets">
                      <li>
                        Built responsive full-stack e-commerce prototypes with React client state management and RESTful API endpoints.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Featured Projects */}
                <section className="rp-section">
                  <h2 className="rp-sec-title">Featured Projects</h2>

                  <div className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <strong className="rp-role">QuickCare: Hospital OPD Queue &amp; Consultation Desk Engine</strong>
                        <span className="rp-company"> &bull; <em>Node.js, Express, MongoDB, Socket.io</em></span>
                      </div>
                      <a href="https://github.com/171rakshi/Quickcare" target="_blank" rel="noreferrer" className="rp-link">github.com/171rakshi/Quickcare</a>
                    </div>
                    <ul className="rp-bullets">
                      <li>
                        Real-time outpatient queue engine supporting patient token ticketing, doctor desk call workflows, and audio chime alerts with zero concurrency collisions.
                      </li>
                    </ul>
                  </div>

                  <div className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <strong className="rp-role">Readify: Intelligent Speech &amp; Reading Cadence Assistant</strong>
                        <span className="rp-company"> &bull; <em>React, Python, Speech Recognition, Web Audio API</em></span>
                      </div>
                    </div>
                    <ul className="rp-bullets">
                      <li>
                        Assesses reading fluency and speech cadence by streaming microphone audio chunks via Web Audio API into Python for NLP phoneme evaluation and dynamic WPM scoring.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Education */}
                <section className="rp-section">
                  <h2 className="rp-sec-title">Education</h2>
                  <div className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <strong className="rp-role">Bachelor of Engineering (B.E.) in Computer Science &amp; Engineering</strong>
                        <span className="rp-company"> &mdash; MVJ College of Engineering, Bengaluru</span>
                      </div>
                      <span className="rp-date">2021 – 2025 | CGPA: <strong>8.34 / 10.0</strong></span>
                    </div>
                  </div>
                  <div className="rp-entry" style={{ marginTop: '4px' }}>
                    <div className="rp-entry-header">
                      <div>
                        <strong className="rp-role">Pre-University Course (PUC - PCMB)</strong>
                        <span className="rp-company"> &mdash; Sri Vasavi P U College</span>
                      </div>
                      <span className="rp-date">2021 | Score: <strong>92.8%</strong></span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Command Palette Modal (Ctrl+K) */}
      {activeModal === 'cmdPalette' && (
        <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Command Palette">
          <div className="modal-window cmd-palette-window">
            <div className="cmd-palette-header">
              <svg className="cmd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={cmdInputRef}
                type="text"
                className="cmd-input"
                placeholder="Type a command, project, skill, or section..."
                value={cmdSearch}
                onChange={(e) => { setCmdSearch(e.target.value); setCmdIndex(0); }}
                onKeyDown={handleCmdKeyDown}
                autoComplete="off"
              />
              <button className="cmd-esc-btn" onClick={onCloseModal} aria-label="Close palette">
                <kbd>ESC</kbd>
              </button>
            </div>
            <div className="cmd-palette-body">
              {filteredCommands.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No matching commands found for "{cmdSearch}"
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const showCatHeader = idx === 0 || filteredCommands[idx - 1].category !== cmd.category;
                  const isActive = idx === cmdIndex;

                  return (
                    <React.Fragment key={idx}>
                      {showCatHeader && <div className="cmd-group-label">{cmd.category}</div>}
                      <div
                        className={`cmd-item ${isActive ? 'active' : ''}`}
                        onClick={() => { cmd.action(); onCloseModal(); }}
                      >
                        <div className="cmd-item-left">
                          <span>{cmd.label}</span>
                        </div>
                        <span className="cmd-item-tag">{cmd.tag}</span>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>
            <div className="cmd-palette-footer">
              <div className="cmd-hints">
                <span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> Navigate</span>
                <span><kbd>&crarr;</kbd> Select</span>
                <span><kbd>ESC</kbd> Close</span>
              </div>
              <span className="cmd-tag">Rakshitha E React App</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
