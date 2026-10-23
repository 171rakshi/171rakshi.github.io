// Rakshitha E - Software Developer Portfolio
// Official Software Company Interactive Architecture
// Responsiveness, Lazy Loading, 60FPS DOM Virtualization, QuickCare Simulator & Command Palette (Ctrl+K)

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileDrawer();
  initScrollspy();
  initScrollProgress();
  initStatCounters();
  initScrollReveal();
  initProjectFilters();
  initTechStackFilter();
  initQuickCareSimulator();
  initVirtualizationEngine();
  initCommandPalette();
  initCopyButtons();
  initContactForm();
  initModalTriggers();
  initBackToTop();
});

/* ----------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
   ---------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem("rakshitha_portfolio_theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  } else {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("theme-light");
      document.body.classList.toggle("theme-dark", !isLight);
      const newTheme = isLight ? "light" : "dark";
      localStorage.setItem("rakshitha_portfolio_theme", newTheme);
      showPortfolioToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ----------------------------------------------------
   2. Mobile Drawer Navigation
   ---------------------------------------------------- */
function initMobileDrawer() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerBackdrop = document.getElementById("mobileDrawerBackdrop");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  if (!mobileDrawer || !drawerBackdrop) return;

  const openDrawer = () => {
    mobileDrawer.classList.add("open");
    drawerBackdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("open");
    drawerBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  drawerBackdrop.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });
}

/* ----------------------------------------------------
   3. Scroll Progress Indicator Bar
   ---------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", Math.round(progress));
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

/* ----------------------------------------------------
   4. Scrollspy (Active Section Highlighting in Navbar)
   ---------------------------------------------------- */
function initScrollspy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#desktopNavLinks .nav-link");

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollY = window.scrollY + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ----------------------------------------------------
   5. Animated Statistics Counters
   ---------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (!statNumbers.length) return;

  let animated = false;

  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute("data-target"));
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const duration = 1600;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * target;

      el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => animateCount(num));
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const ribbon = document.querySelector(".stats-ribbon");
  if (ribbon) observer.observe(ribbon);
}

/* ----------------------------------------------------
   6. Lazy Loading & Scroll Reveal Animations
   ---------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal], .section, .card, .timeline-item");
  
  revealElements.forEach(el => {
    el.classList.add("reveal-init");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------
   7. Project Filter Tabs
   ---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal) {
          card.style.display = "flex";
          card.classList.add("revealed");
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ----------------------------------------------------
   8. Interactive Tech Stack Highlighting
   ---------------------------------------------------- */
function initTechStackFilter() {
  const techChips = document.querySelectorAll(".tech-chip, .skill-pill");
  const projectCards = document.querySelectorAll(".project-card");
  const expItems = document.querySelectorAll(".timeline-item");

  let activeTech = null;

  techChips.forEach(chip => {
    chip.style.cursor = "pointer";
    chip.setAttribute("title", "Click to highlight matching projects & experience");

    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const techName = chip.textContent.trim().toLowerCase();

      if (activeTech === techName) {
        // Reset
        activeTech = null;
        projectCards.forEach(c => c.classList.remove("highlighted-match"));
        expItems.forEach(i => i.classList.remove("highlighted-match"));
        showPortfolioToast("Filter reset");
        return;
      }

      activeTech = techName;
      let matchCount = 0;

      projectCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(techName)) {
          card.classList.add("highlighted-match");
          matchCount++;
        } else {
          card.classList.remove("highlighted-match");
        }
      });

      expItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(techName)) {
          item.classList.add("highlighted-match");
          matchCount++;
        } else {
          item.classList.remove("highlighted-match");
        }
      });

      showPortfolioToast(`Highlighted ${matchCount} items using ${chip.textContent.trim()}`);
    });
  });
}

/* ----------------------------------------------------
   9. Interactive QuickCare OPD Live Queue Desk Simulator
   ---------------------------------------------------- */
function initQuickCareSimulator() {
  const currentTokenEl = document.getElementById("qcCurrentToken");
  const queueWaitingEl = document.getElementById("qcQueueWaiting");
  const waitTimeEl = document.getElementById("qcWaitTime");
  const issueBtn = document.getElementById("qcIssueTokenBtn");
  const callNextBtn = document.getElementById("qcCallNextBtn");
  const completeBtn = document.getElementById("qcCompleteVisitBtn");

  if (!currentTokenEl || !queueWaitingEl) return;

  let currentTokenNum = 104;
  let nextTokenNum = 109;
  let waitingTokens = ["A-105", "A-106", "A-107", "A-108"];

  const playSynthesizedChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.setValueAtTime(880, now + 0.12); // A5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);
    } catch (_) {}
  };

  const updateDisplay = () => {
    currentTokenEl.textContent = `A-${currentTokenNum}`;
    queueWaitingEl.textContent = `${waitingTokens.length} Patients`;
    waitTimeEl.textContent = `~${Math.max(3, waitingTokens.length * 3)} Mins`;
  };

  if (issueBtn) {
    issueBtn.addEventListener("click", () => {
      const newTkn = `A-${nextTokenNum++}`;
      waitingTokens.push(newTkn);
      updateDisplay();
      playSynthesizedChime();
      showPortfolioToast(`🎫 Token ${newTkn} generated for patient.`);

      // Emit to Virtual Stream
      if (window.pushVirtualEvent) {
        window.pushVirtualEvent({
          id: newTkn,
          type: "quickcare",
          service: "QuickCare OPD",
          badgeClass: "qc",
          desc: `New token registered &bull; Dept: General Medicine`,
          status: "WAITING",
          statusClass: "active",
          time: "Just now"
        });
      }
    });
  }

  if (callNextBtn) {
    callNextBtn.addEventListener("click", () => {
      if (waitingTokens.length === 0) {
        showPortfolioToast("All queue tokens have been attended to!", true);
        return;
      }
      const nextTkn = waitingTokens.shift();
      currentTokenNum = parseInt(nextTkn.replace("A-", ""), 10);
      updateDisplay();
      playSynthesizedChime();
      showPortfolioToast(`🔔 Calling Token ${nextTkn} to Consultation Desk #2`);

      if (window.pushVirtualEvent) {
        window.pushVirtualEvent({
          id: nextTkn,
          type: "quickcare",
          service: "QuickCare OPD",
          badgeClass: "qc",
          desc: `Token summoned to Desk #2 (Dr. Ramesh)`,
          status: "CALLED",
          statusClass: "done",
          time: "Just now"
        });
      }
    });
  }

  if (completeBtn) {
    completeBtn.addEventListener("click", () => {
      showPortfolioToast(`✅ Consultation complete for Token A-${currentTokenNum}`);
      if (window.pushVirtualEvent) {
        window.pushVirtualEvent({
          id: `A-${currentTokenNum}`,
          type: "quickcare",
          service: "QuickCare OPD",
          badgeClass: "qc",
          desc: `Consultation marked COMPLETE &bull; E-Prescription issued`,
          status: "CLOSED",
          statusClass: "done",
          time: "Just now"
        });
      }
    });
  }
}

/* ----------------------------------------------------
   10. High-Performance Virtualization Engine
   ---------------------------------------------------- */
function initVirtualizationEngine() {
  const viewport = document.getElementById("vstreamViewport");
  const phantom = document.getElementById("vstreamPhantom");
  const content = document.getElementById("vstreamContent");
  const totalCountEl = document.getElementById("vstreamTotalCount");
  const domCountEl = document.getElementById("vstreamDomCount");
  const offsetEl = document.getElementById("vstreamWindowOffset");
  const filterBtns = document.querySelectorAll(".vpill-btn");
  const searchInput = document.getElementById("vstreamSearch");
  const simulateBtn = document.getElementById("vstreamSimulateBtn");
  const autoToggle = document.getElementById("vstreamAutoToggle");
  const autoLabel = document.getElementById("vstreamAutoLabel");
  const countAllEl = document.getElementById("vfilterCountAll");

  if (!viewport || !phantom || !content) return;

  const ROW_HEIGHT = 52;
  const BUFFER = 3;
  let activeFilter = "all";
  let searchQuery = "";
  let isAutoStreaming = true;
  let autoStreamInterval = null;

  // Generate 250 initial realistic events from Rakshitha's actual architectures
  const mockTemplates = [
    { type: "quickcare", service: "QuickCare OPD", badgeClass: "qc", desc: "Token {id} issued to General Medicine OPD", status: "WAITING", statusClass: "active" },
    { type: "quickcare", service: "QuickCare OPD", badgeClass: "qc", desc: "Doctor consultation desk called Token {id}", status: "CALLED", statusClass: "done" },
    { type: "quickcare", service: "QuickCare OPD", badgeClass: "qc", desc: "SimpleJWT role verification: Doctor Role (Desk #2)", status: "VERIFIED", statusClass: "done" },
    { type: "activline", service: "ActivLine Cron", badgeClass: "cron", desc: "Scheduled billing sync matched Razorpay webhook {id}", status: "RECONCILED", statusClass: "done" },
    { type: "activline", service: "ActivLine CSR", badgeClass: "cron", desc: "Joi schema validated for subscriber invoice payload {id}", status: "VALID", statusClass: "sync" },
    { type: "activline", service: "ActivLine PDF", badgeClass: "cron", desc: "PDFKit generated monthly broadband statement #{id}", status: "EXPORTED", statusClass: "done" },
    { type: "auth", service: "RBAC Security", badgeClass: "auth", desc: "Multi-tenant isolated JWT claim verified for tenant_id:{id}", status: "AUTHORIZED", statusClass: "done" },
    { type: "auth", service: "Socket.io Sync", badgeClass: "auth", desc: "Real-time session broadcast emitted for subscriber {id}", status: "DISPATCHED", statusClass: "active" }
  ];

  let eventDatabase = [];
  const now = Date.now();

  for (let i = 250; i >= 1; i--) {
    const tmpl = mockTemplates[i % mockTemplates.length];
    const minsAgo = Math.floor((250 - i) * 1.5);
    const timeStr = minsAgo === 0 ? "Just now" : minsAgo < 60 ? `${minsAgo}m ago` : `${Math.floor(minsAgo / 60)}h ago`;
    const eventId = tmpl.type === "quickcare" ? `A-${100 + (i % 80)}` : `EVT-${1000 + i}`;

    eventDatabase.push({
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

  // Exposed helper to push dynamic events from simulator or UI
  window.pushVirtualEvent = (eventObj) => {
    eventDatabase.unshift(eventObj);
    renderVirtualList();
  };

  const getFilteredData = () => {
    return eventDatabase.filter(item => {
      const matchesFilter = activeFilter === "all" || item.type === activeFilter;
      const matchesSearch = !searchQuery || 
        item.id.toLowerCase().includes(searchQuery) ||
        item.desc.toLowerCase().includes(searchQuery) ||
        item.service.toLowerCase().includes(searchQuery) ||
        item.status.toLowerCase().includes(searchQuery);
      return matchesFilter && matchesSearch;
    });
  };

  const renderVirtualList = () => {
    const filtered = getFilteredData();
    const totalItems = filtered.length;
    const totalHeight = totalItems * ROW_HEIGHT;
    phantom.style.height = `${totalHeight}px`;

    const scrollTop = viewport.scrollTop;
    const viewportHeight = viewport.clientHeight || 340;

    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
    const endIndex = Math.min(totalItems, Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + BUFFER);
    const offsetY = startIndex * ROW_HEIGHT;

    content.style.transform = `translateY(${offsetY}px)`;

    const visibleItems = filtered.slice(startIndex, endIndex);

    content.innerHTML = visibleItems.map(item => `
      <div class="vstream-row">
        <div class="vr-left">
          <span class="vr-id">${escapeHtml(item.id)}</span>
          <span class="vr-service-badge ${item.badgeClass}">${escapeHtml(item.service)}</span>
          <span class="vr-text">${item.desc}</span>
        </div>
        <div class="vr-right">
          <span class="vr-status ${item.statusClass}">${item.status}</span>
          <span class="vr-time">${item.time}</span>
        </div>
      </div>
    `).join("");

    // Telemetry HUD updates
    if (totalCountEl) totalCountEl.textContent = `${eventDatabase.length} Records`;
    if (domCountEl) {
      const pct = ((visibleItems.length / Math.max(1, totalItems)) * 100).toFixed(2);
      domCountEl.textContent = `${visibleItems.length} Nodes (${pct}%)`;
    }
    if (offsetEl) offsetEl.textContent = `${offsetY} px`;
    if (countAllEl) countAllEl.textContent = `${eventDatabase.length}`;
  };

  viewport.addEventListener("scroll", renderVirtualList, { passive: true });

  // Filter Pills
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-vfilter");
      viewport.scrollTop = 0;
      renderVirtualList();
    });
  });

  // Search input with debounce
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      viewport.scrollTop = 0;
      renderVirtualList();
    });
  }

  // Simulate manual event
  if (simulateBtn) {
    simulateBtn.addEventListener("click", () => {
      const randId = `SIM-${Math.floor(1000 + Math.random() * 9000)}`;
      const tmpl = mockTemplates[Math.floor(Math.random() * mockTemplates.length)];
      window.pushVirtualEvent({
        id: randId,
        type: tmpl.type,
        service: tmpl.service,
        badgeClass: tmpl.badgeClass,
        desc: tmpl.desc.replace("{id}", randId),
        status: tmpl.status,
        statusClass: tmpl.statusClass,
        time: "Just now"
      });
      showPortfolioToast(`Simulated real-time event ${randId} ingested`);
    });
  }

  // Auto-stream toggle
  const startAutoStream = () => {
    autoStreamInterval = setInterval(() => {
      if (!isAutoStreaming) return;
      const randId = `EVT-${Math.floor(1000 + Math.random() * 9000)}`;
      const tmpl = mockTemplates[Math.floor(Math.random() * mockTemplates.length)];
      eventDatabase.unshift({
        id: randId,
        type: tmpl.type,
        service: tmpl.service,
        badgeClass: tmpl.badgeClass,
        desc: tmpl.desc.replace("{id}", randId),
        status: tmpl.status,
        statusClass: tmpl.statusClass,
        time: "Just now"
      });
      // Cap at 1000 records
      if (eventDatabase.length > 1000) eventDatabase.pop();
      renderVirtualList();
    }, 3800);
  };

  if (autoToggle) {
    autoToggle.addEventListener("click", () => {
      isAutoStreaming = !isAutoStreaming;
      autoLabel.textContent = isAutoStreaming ? "Live Influx: ON" : "Live Influx: PAUSED";
      autoToggle.classList.toggle("paused", !isAutoStreaming);
      showPortfolioToast(isAutoStreaming ? "Live event stream resumed" : "Live stream paused");
    });
  }

  startAutoStream();
  renderVirtualList();
}

/* ----------------------------------------------------
   11. Official Software Company Feature: Command Palette (Ctrl+K)
   ---------------------------------------------------- */
function initCommandPalette() {
  const cmdPaletteModal = document.getElementById("cmdPaletteModal");
  const cmdPaletteBtn = document.getElementById("cmdPaletteBtn");
  const cmdInput = document.getElementById("cmdPaletteInput");
  const resultsContainer = document.getElementById("cmdPaletteResults");

  if (!cmdPaletteModal || !cmdInput || !resultsContainer) return;

  const commands = [
    // Sections
    { category: "Navigation", label: "Jump to Hero / Overview", action: () => scrollToSection("hero"), tag: "Section" },
    { category: "Navigation", label: "Jump to About & Architecture", action: () => scrollToSection("about"), tag: "Section" },
    { category: "Navigation", label: "Jump to Technical Arsenal (Skills)", action: () => scrollToSection("skills"), tag: "Section" },
    { category: "Navigation", label: "Jump to Work Experience", action: () => scrollToSection("experience"), tag: "Section" },
    { category: "Navigation", label: "Jump to Projects Portfolio", action: () => scrollToSection("projects"), tag: "Section" },
    { category: "Navigation", label: "Jump to Live Stream & Virtualization", action: () => scrollToSection("virtualization-demo"), tag: "Section" },
    { category: "Navigation", label: "Jump to Education", action: () => scrollToSection("education"), tag: "Section" },
    { category: "Navigation", label: "Jump to Contact", action: () => scrollToSection("contact"), tag: "Section" },

    // Projects
    { category: "Projects", label: "QuickCare Hospital OPD Platform (Personal Star Project)", action: () => { window.open("https://github.com/171rakshi/Quickcare", "_blank"); }, tag: "GitHub" },
    { category: "Projects", label: "Readify AI Reading Cadence Deep Dive", action: () => openModal("readifyModal"), tag: "Architecture" },
    { category: "Projects", label: "ActivLine ISP SaaS Platform Specs", action: () => openModal("activLineModal"), tag: "Specs" },
    { category: "Projects", label: "JOMS On-Demand Marketplace Specs", action: () => openModal("jomsModal"), tag: "Specs" },

    // Tech Skills
    { category: "Skills", label: "Node.js & Express.js Architecture", action: () => highlightTech("Node.js"), tag: "Backend" },
    { category: "Skills", label: "Python & Django REST Framework", action: () => highlightTech("Python"), tag: "Backend" },
    { category: "Skills", label: "PostgreSQL & MongoDB Modeling", action: () => highlightTech("PostgreSQL"), tag: "Database" },
    { category: "Skills", label: "React 19 & TypeScript Frontend", action: () => highlightTech("React 19"), tag: "Frontend" },

    // Actions
    { category: "Actions", label: "Toggle Dark / Light Theme", action: () => document.getElementById("themeToggleBtn")?.click(), tag: "UI" },
    { category: "Actions", label: "View & Print Curriculum Vitae (Resume)", action: () => openModal("resumeModal"), tag: "Resume" },
    { category: "Actions", label: "Copy Email: rakshithasannira2003@gmail.com", action: () => copyToClipboard("rakshithasannira2003@gmail.com"), tag: "Copy" },
    { category: "Actions", label: "Copy Phone: +91 9686344910", action: () => copyToClipboard("+919686344910"), tag: "Copy" },
    { category: "Actions", label: "Visit GitHub Profile (171rakshi)", action: () => window.open("https://github.com/171rakshi", "_blank"), tag: "External" }
  ];

  let selectedIndex = 0;
  let currentFiltered = [...commands];

  const scrollToSection = (id) => {
    closeModal("cmdPaletteModal");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const highlightTech = (name) => {
    closeModal("cmdPaletteModal");
    const chip = Array.from(document.querySelectorAll(".tech-chip, .skill-pill")).find(c => c.textContent.trim().toLowerCase().includes(name.toLowerCase()));
    if (chip) chip.click();
  };

  const renderResults = () => {
    if (currentFiltered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No matching commands found for "${escapeHtml(cmdInput.value)}"
        </div>
      `;
      return;
    }

    let html = "";
    let lastCat = "";

    currentFiltered.forEach((cmd, idx) => {
      if (cmd.category !== lastCat) {
        html += `<div class="cmd-group-label">${escapeHtml(cmd.category)}</div>`;
        lastCat = cmd.category;
      }
      const isActive = idx === selectedIndex ? "active" : "";
      html += `
        <div class="cmd-item ${isActive}" data-idx="${idx}">
          <div class="cmd-item-left">
            <span>${escapeHtml(cmd.label)}</span>
          </div>
          <span class="cmd-item-tag">${escapeHtml(cmd.tag)}</span>
        </div>
      `;
    });

    resultsContainer.innerHTML = html;

    resultsContainer.querySelectorAll(".cmd-item").forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.getAttribute("data-idx"), 10);
        executeCommand(idx);
      });
    });
  };

  const executeCommand = (idx) => {
    if (currentFiltered[idx]) {
      currentFiltered[idx].action();
      closeModal("cmdPaletteModal");
    }
  };

  const filterCommands = (q) => {
    if (!q) {
      currentFiltered = [...commands];
    } else {
      currentFiltered = commands.filter(c => 
        c.label.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q)
      );
    }
    selectedIndex = 0;
    renderResults();
  };

  cmdInput.addEventListener("input", (e) => {
    filterCommands(e.target.value.trim().toLowerCase());
  });

  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % Math.max(1, currentFiltered.length);
      renderResults();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + currentFiltered.length) % Math.max(1, currentFiltered.length);
      renderResults();
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(selectedIndex);
    }
  });

  const openPalette = () => {
    openModal("cmdPaletteModal");
    cmdInput.value = "";
    filterCommands("");
    setTimeout(() => cmdInput.focus(), 50);
  };

  if (cmdPaletteBtn) cmdPaletteBtn.addEventListener("click", openPalette);

  // Global Ctrl+K / Cmd+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdPaletteModal.classList.contains("hidden")) {
        openPalette();
      } else {
        closeModal("cmdPaletteModal");
      }
    }
  });
}

/* ----------------------------------------------------
   12. Copy-To-Clipboard Helper with Feedback
   ---------------------------------------------------- */
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showPortfolioToast(`Copied "${text}" to clipboard!`);
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  showPortfolioToast(`Copied "${text}" to clipboard!`);
}

function initCopyButtons() {
  const copyables = document.querySelectorAll(".copyable");
  copyables.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const val = btn.getAttribute("data-copy");
      if (!val) return;
      copyToClipboard(val);

      btn.classList.add("copied");
      const hint = btn.querySelector(".copy-hint-pill");
      if (hint) hint.textContent = "✓ Copied!";

      setTimeout(() => {
        btn.classList.remove("copied");
        if (hint) hint.textContent = "Copy";
      }, 2000);
    });
  });
}

/* ----------------------------------------------------
   13. Floating Back to Top Button with SVG Progress
   ---------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  const circle = document.getElementById("progressRingCircle");

  if (!btn || !circle) return;

  const totalLength = 119.38; // 2 * PI * 19

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 350) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }

    if (maxScroll > 0) {
      const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
      const offset = totalLength - (scrollPercent * totalLength);
      circle.style.strokeDashoffset = offset;
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ----------------------------------------------------
   14. Modals Management (Compact & Accessible)
   ---------------------------------------------------- */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

// Global modal triggers for HTML onclicks
window.openModal = openModal;
window.closeModal = closeModal;
window.openActivLineModal = () => openModal("activLineModal");
window.openJomsModal = () => openModal("jomsModal");
window.openReadifyModal = () => openModal("readifyModal");
window.openResumeModal = () => openModal("resumeModal");

function initModalTriggers() {
  const viewResumeBtn = document.getElementById("viewResumeBtn");
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener("click", () => openModal("resumeModal"));
  }

  // Close modals on clicking backdrop outside window
  const modalBackdrops = document.querySelectorAll(".modal-backdrop");
  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });
  });

  // ESC key closes active modal or drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalBackdrops.forEach(backdrop => {
        if (!backdrop.classList.contains("hidden")) {
          closeModal(backdrop.id);
        }
      });
      const drawer = document.getElementById("mobileDrawer");
      if (drawer && drawer.classList.contains("open")) {
        drawer.classList.remove("open");
        const drawerBackdrop = document.getElementById("mobileDrawerBackdrop");
        if (drawerBackdrop) drawerBackdrop.classList.add("hidden");
        document.body.style.overflow = "";
      }
    }
  });
}

/* ----------------------------------------------------
   15. Contact Form
   ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("portfolioContactForm");
  const btn = document.getElementById("sendMessageBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      showPortfolioToast("Please fill out all required fields", true);
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>Sending Message...</span>`;
    }

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `
          <span>Send Message</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        `;
      }
      form.reset();
      showPortfolioToast(`Thank you, ${name}! Your message has been dispatched.`);
    }, 800);
  });
}

/* ----------------------------------------------------
   16. Helpers
   ---------------------------------------------------- */
function showPortfolioToast(msg, isError = false) {
  const toast = document.getElementById("portfolioToast");
  if (!toast) return;

  toast.textContent = msg;
  toast.style.borderColor = isError ? "rgba(244, 63, 94, 0.5)" : "rgba(16, 185, 129, 0.5)";
  toast.classList.remove("hidden");

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
