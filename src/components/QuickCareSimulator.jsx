import React, { useState } from 'react';

export default function QuickCareSimulator({ onEmitEvent, onShowToast }) {
  const [currentToken, setCurrentToken] = useState('A-104');
  const [nextTokenNum, setNextTokenNum] = useState(109);
  const [waitingTokens, setWaitingTokens] = useState(['A-105', 'A-106', 'A-107', 'A-108']);

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch (_) {}
  };

  const handleIssueToken = () => {
    const newTkn = `A-${nextTokenNum}`;
    setNextTokenNum(prev => prev + 1);
    setWaitingTokens(prev => [...prev, newTkn]);
    playChime();
    onShowToast(`🎫 Token ${newTkn} generated for patient.`);

    if (onEmitEvent) {
      onEmitEvent({
        id: newTkn,
        type: 'quickcare',
        service: 'QuickCare OPD',
        badgeClass: 'qc',
        desc: `New token registered &bull; Dept: General Medicine`,
        status: 'WAITING',
        statusClass: 'active',
        time: 'Just now'
      });
    }
  };

  const handleCallNext = () => {
    if (waitingTokens.length === 0) {
      onShowToast('All queue tokens have been attended to!', true);
      return;
    }
    const nextTkn = waitingTokens[0];
    setWaitingTokens(prev => prev.slice(1));
    setCurrentToken(nextTkn);
    playChime();
    onShowToast(`🔔 Calling Token ${nextTkn} to Consultation Desk #2`);

    if (onEmitEvent) {
      onEmitEvent({
        id: nextTkn,
        type: 'quickcare',
        service: 'QuickCare OPD',
        badgeClass: 'qc',
        desc: `Token summoned to Desk #2 (Dr. Ramesh)`,
        status: 'CALLED',
        statusClass: 'done',
        time: 'Just now'
      });
    }
  };

  const handleComplete = () => {
    onShowToast(`✅ Consultation complete for Token ${currentToken}`);
    if (onEmitEvent) {
      onEmitEvent({
        id: currentToken,
        type: 'quickcare',
        service: 'QuickCare OPD',
        badgeClass: 'qc',
        desc: `Consultation marked COMPLETE &bull; E-Prescription issued`,
        status: 'CLOSED',
        statusClass: 'done',
        time: 'Just now'
      });
    }
  };

  return (
    <div className="quickcare-live-sim" id="quickcareSimulator">
      <div className="qc-sim-header">
        <div className="qc-live-pill">
          <span className="pulse-green"></span>
          <span>Interactive OPD Queue Simulator</span>
        </div>
        <span className="qc-desk-title">Desk #2 &bull; Dr. Ramesh (General Medicine)</span>
      </div>
      <div className="qc-sim-body">
        <div className="qc-stat-card">
          <span className="qc-stat-lbl">CURRENT TOKEN</span>
          <span className="qc-stat-val text-cyan" id="qcCurrentToken">{currentToken}</span>
        </div>
        <div className="qc-stat-card">
          <span className="qc-stat-lbl">WAITING PATIENTS</span>
          <span className="qc-stat-val text-emerald" id="qcQueueWaiting">{waitingTokens.length}</span>
        </div>
        <div className="qc-stat-card">
          <span className="qc-stat-lbl">EST. WAIT TIME</span>
          <span className="qc-stat-val text-purple" id="qcWaitTime">~{Math.max(3, waitingTokens.length * 3)} Mins</span>
        </div>
      </div>
      <div className="qc-sim-actions">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={handleIssueToken}
          title="Generate next queue token"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Issue New Token</span>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={handleCallNext}
          title="Call next patient in line"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span>Call Next Patient</span>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={handleComplete}
          title="Complete current patient visit"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Complete Consultation</span>
        </button>
      </div>
    </div>
  );
}
