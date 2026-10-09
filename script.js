// Rakshitha E - Portfolio Interactive Scripts
// Responsive UI interactions, theme switching, interactive terminal, and modals

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileDrawer();
  initProjectFilters();
  initContactForm();
  initModalTriggers();
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
   3. Project Filter Tabs
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
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ----------------------------------------------------
   4. Modals Management
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

// Make functions globally available for HTML onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.openActivLineModal = () => openModal("activLineModal");
window.openJomsModal = () => openModal("jomsModal");
window.openReadifyModal = () => openModal("readifyModal");
window.openResumeModal = () => openModal("resumeModal");
window.openEmbeddedAppModal = () => openModal("embeddedAppModal");

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

  // ESC key closes active modal
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
   6. Contact Form
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
   8. Helpers
   ---------------------------------------------------- */
function showPortfolioToast(msg, isError = false) {
  const toast = document.getElementById("portfolioToast");
  if (!toast) return;

  toast.textContent = msg;
  toast.style.borderColor = isError ? "rgba(244, 63, 94, 0.5)" : "rgba(16, 185, 129, 0.5)";
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3500);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

