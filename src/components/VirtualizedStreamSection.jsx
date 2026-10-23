import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

const ROW_HEIGHT = 52;
const BUFFER = 3;
const VIEWPORT_HEIGHT = 340;

const initialTemplates = [
  { type: "quickcare", service: "QuickCare OPD", badgeClass: "qc", desc: "Token {id} issued to General Medicine OPD", status: "WAITING", statusClass: "active" },
  { type: "quickcare", service: "QuickCare OPD", badgeClass: "qc", desc: "Doctor consultation desk called Token {id}", status: "CALLED", statusClass: "done" },
  { type: "quickcare", service: "QuickCare OPD", badgeClass: "qc", desc: "SimpleJWT role verification: Doctor Role (Desk #2)", status: "VERIFIED", statusClass: "done" },
  { type: "activline", service: "ActivLine Cron", badgeClass: "cron", desc: "Scheduled billing sync matched Razorpay webhook {id}", status: "RECONCILED", statusClass: "done" },
  { type: "activline", service: "ActivLine CSR", badgeClass: "cron", desc: "Joi schema validated for subscriber invoice payload {id}", status: "VALID", statusClass: "sync" },
  { type: "activline", service: "ActivLine PDF", badgeClass: "cron", desc: "PDFKit generated monthly broadband statement #{id}", status: "EXPORTED", statusClass: "done" },
  { type: "auth", service: "RBAC Security", badgeClass: "auth", desc: "Multi-tenant isolated JWT claim verified for tenant_id:{id}", status: "AUTHORIZED", statusClass: "done" },
  { type: "auth", service: "Socket.io Sync", badgeClass: "auth", desc: "Real-time session broadcast emitted for subscriber {id}", status: "DISPATCHED", statusClass: "active" }
];

function generateInitialEvents() {
  const events = [];
  for (let i = 250; i >= 1; i--) {
    const tmpl = initialTemplates[i % initialTemplates.length];
    const minsAgo = Math.floor((250 - i) * 1.5);
    const timeStr = minsAgo === 0 ? "Just now" : minsAgo < 60 ? `${minsAgo}m ago` : `${Math.floor(minsAgo / 60)}h ago`;
    const eventId = tmpl.type === "quickcare" ? `A-${100 + (i % 80)}` : `EVT-${1000 + i}`;

    events.push({
      id: eventId,
      type: tmpl.type,
      service: tmpl.service,
      badgeClass: tmpl.badgeClass,
      desc: tmpl.desc.replace("{id}", eventId),
      status: tmpl.status,
      statusClass: tmpl.statusClass,
      time: timeStr
    });
  }
  return events;
}

export default function VirtualizedStreamSection({ externalEvents, onShowToast }) {
  const [events, setEvents] = useState(() => generateInitialEvents());
  const [scrollTop, setScrollTop] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  const viewportRef = useRef(null);

  // Merge external events from simulator if emitted
  useEffect(() => {
    if (externalEvents && externalEvents.length > 0) {
      setEvents(prev => [externalEvents[0], ...prev]);
    }
  }, [externalEvents]);

  // Live stream interval simulation
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const randId = `EVT-${Math.floor(1000 + Math.random() * 9000)}`;
      const tmpl = initialTemplates[Math.floor(Math.random() * initialTemplates.length)];
      setEvents(prev => [
        {
          id: randId,
          type: tmpl.type,
          service: tmpl.service,
          badgeClass: tmpl.badgeClass,
          desc: tmpl.desc.replace("{id}", randId),
          status: tmpl.status,
          statusClass: tmpl.statusClass,
          time: "Just now"
        },
        ...prev.slice(0, 999)
      ]);
    }, 3800);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Filtered dataset
  const filteredEvents = useMemo(() => {
    return events.filter(item => {
      const matchesCat = activeFilter === 'all' || item.type === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        item.id.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [events, activeFilter, searchQuery]);

  // Virtual calculations
  const totalItems = filteredEvents.length;
  const totalHeight = totalItems * ROW_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const endIndex = Math.min(totalItems, Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ROW_HEIGHT) + BUFFER);
  const offsetY = startIndex * ROW_HEIGHT;
  const visibleItems = filteredEvents.slice(startIndex, endIndex);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const handleSimulate = () => {
    const randId = `SIM-${Math.floor(1000 + Math.random() * 9000)}`;
    const tmpl = initialTemplates[Math.floor(Math.random() * initialTemplates.length)];
    const newEvt = {
      id: randId,
      type: tmpl.type,
      service: tmpl.service,
      badgeClass: tmpl.badgeClass,
      desc: tmpl.desc.replace("{id}", randId),
      status: tmpl.status,
      statusClass: tmpl.statusClass,
      time: "Just now"
    };
    setEvents(prev => [newEvt, ...prev]);
    onShowToast(`Simulated real-time event ${randId} ingested`);
  };

  const handleToggleLive = () => {
    setIsLiveStreaming(prev => {
      const next = !prev;
      onShowToast(next ? 'Live event stream resumed' : 'Live stream paused');
      return next;
    });
  };

  return (
    <section id="virtualization-demo" className="section virtualization-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">ENGINEERING AT SCALE &bull; VIRTUALIZATION ENGINE</span>
          <h2 className="section-title">Live Systems Stream & Virtualized Queue</h2>
          <p className="section-subtitle">
            Interactive 60FPS Virtual DOM windowing engine handling high-concurrency event streams, modeled after the real-time queue orchestration in <strong>QuickCare</strong> and reconciliation pipelines in <strong>ActivLine</strong>.
          </p>
        </div>

        <div className="card vstream-card">
          {/* Live Telemetry HUD */}
          <div className="vstream-hud">
            <div className="hud-item">
              <span className="hud-label">TOTAL DATASET</span>
              <span className="hud-val">{events.length} Records</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">RENDERED IN DOM</span>
              <span className="hud-val text-emerald">
                {visibleItems.length} Nodes ({((visibleItems.length / Math.max(1, totalItems)) * 100).toFixed(2)}%)
              </span>
            </div>
            <div className="hud-item">
              <span className="hud-label">WINDOW OFFSET</span>
              <span className="hud-val text-cyan">{offsetY} px</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">STREAM STATUS</span>
              <span className="hud-val text-purple">60 FPS &bull; {isLiveStreaming ? 'Active' : 'Paused'}</span>
            </div>
          </div>

          {/* Controls Toolbar */}
          <div className="vstream-toolbar">
            <div className="vstream-search-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Filter tokens, doctor desks, webhooks, transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="vstream-filter-pills">
              <button
                className={`vpill-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Events ({events.length})
              </button>
              <button
                className={`vpill-btn ${activeFilter === 'quickcare' ? 'active' : ''}`}
                onClick={() => setActiveFilter('quickcare')}
              >
                QuickCare OPD Tokens
              </button>
              <button
                className={`vpill-btn ${activeFilter === 'activline' ? 'active' : ''}`}
                onClick={() => setActiveFilter('activline')}
              >
                ActivLine Cron & Webhooks
              </button>
              <button
                className={`vpill-btn ${activeFilter === 'auth' ? 'active' : ''}`}
                onClick={() => setActiveFilter('auth')}
              >
                RBAC & Security
              </button>
            </div>

            <div className="vstream-actions">
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleSimulate}
                title="Push a new live simulated event"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>+ Simulate Event</span>
              </button>
              <button
                className="btn btn-sm btn-ghost live-pulse-btn"
                onClick={handleToggleLive}
                title="Toggle automatic live stream influx"
              >
                <span className={isLiveStreaming ? "pulse-green" : ""}></span>
                <span>{isLiveStreaming ? "Live Influx: ON" : "Live Influx: PAUSED"}</span>
              </button>
            </div>
          </div>

          {/* Virtual Scroll Viewport */}
          <div
            className="vstream-viewport"
            ref={viewportRef}
            onScroll={handleScroll}
            tabIndex={0}
            role="region"
            aria-label="Virtualized event stream"
          >
            <div className="vstream-phantom" style={{ height: `${totalHeight}px` }}>
              <div className="vstream-content" style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleItems.map(item => (
                  <div key={item.id + item.time} className="vstream-row">
                    <div className="vr-left">
                      <span className="vr-id">{item.id}</span>
                      <span className={`vr-service-badge ${item.badgeClass}`}>{item.service}</span>
                      <span className="vr-text" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                    <div className="vr-right">
                      <span className={`vr-status ${item.statusClass}`}>{item.status}</span>
                      <span className="vr-time">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Virtualization Performance Metrics Footer */}
          <div className="vstream-footer">
            <div className="vf-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>Virtual DOM Window: Only ~{visibleItems.length} items maintained in DOM simultaneously regardless of dataset size ({events.length} &rarr; 50,000+ items)</span>
            </div>
            <span className="vf-tech">O(1) Scroll Window Calculation &bull; Zero Frame Jitter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
