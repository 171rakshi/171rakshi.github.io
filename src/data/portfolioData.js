// Rakshitha E - Portfolio Data
// 100% of the original content preserved without altering any text, projects, or achievements

export const heroData = {
  badge: "Software Developer  • Bengaluru, India",
  titlePart1: "Building Modern",
  titleGradient: "Web Applications",
  titlePart2: "& Reliable APIs.",
  bio: "I'm Rakshitha E, a software developer delivering production-grade web applications, REST APIs, role-based access control (RBAC), and third-party integrations using Node.js, Express.js, Python, Django, and MongoDB.",
  email: "rakshithasannira2003@gmail.com",
  phone: "+91 9686344910",
  githubQuickCare: "https://github.com/171rakshi/Quickcare",
  metrics: [
    { val: "6+ Mos", lbl: "Production SaaS" },
    { val: "8.34", lbl: "CGPA (B.E. CSE)" },
    { val: "4+", lbl: "3rd-Party APIs" },
    { val: "99.8%", lbl: "Sync Reliability", isEmerald: true }
  ],
  specializations: [
    { icon: "🛡️", text: "Controller-Service-Repository Pattern" },
    { icon: "🔐", text: "Role-Based Access Control (RBAC) & JWT" },
    { icon: "🔄", text: "Scheduled Cron Data Reconciliation" },
    { icon: "💳", text: "Payment Gateways & Real-Time Sync" }
  ],
  primaryStack: [
    "Node.js", "Express.js", "Python", "Django", "MongoDB", "SQL", "React 19", "TypeScript"
  ]
};

export const statsRibbonData = [
  { target: 6, suffix: "+", title: "Months Production SaaS", desc: "Kods Technologies Pvt Ltd" },
  { target: 4, suffix: "+", title: "3rd-Party Integrations", desc: "Razorpay, Firebase, Socket.io, PDFKit" },
  { target: 100, suffix: "+", title: "Active Users Served", desc: "Marketplace & ISP Platform" },
  { target: 8.34, decimals: 2, title: "CGPA Engineering", desc: "B.E. Computer Science, MVJCE" }
];

export const aboutData = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z"/><path d="M21 12H16.5"/></svg>`,
    title: "Layered Architectural Integrity",
    desc: "Strictly separation of concerns across Controller (request routing & validation), Service (business logic orchestration), and Repository (database abstraction) layers with centralized error management."
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    title: "Enterprise Security & RBAC",
    desc: "Deep experience engineering fine-grained Role-Based Access Control, JWT authentication with tenant-isolated payload claims, OTP validation workflows, and Joi payload schema protection against malicious payloads."
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    title: "Data Synchronization & Reconciliation",
    desc: "Expertise implementing scheduled cron reconciliation jobs to sync multiple external payment gateways (Razorpay) and billing databases, eliminating mismatches and ledger drift in real-time."
  }
];

export const skillsData = [
  {
    category: "Backend Architecture",
    color: "purple",
    skills: ["Node.js", "Express.js", "Django (MVT)", "REST APIs", "Controller-Service-Repo", "API Integrations", "Joi Schema Validation"]
  },
  {
    category: "Languages & Databases",
    color: "cyan",
    skills: ["Python", "TypeScript", "JavaScript (ES6+)", "SQL", "MongoDB", "Relational Schemas", "Multi-Tenant Modeling"]
  },
  {
    category: "Auth & Quality Assurance",
    color: "emerald",
    skills: ["JWT (JSON Web Tokens)", "Role-Based Access (RBAC)", "SimpleJWT Auth", "OTP Workflows", "Centralized Error Handling", "Vitest Unit Testing", "Postman API Testing"]
  },
  {
    category: "Cloud, Real-Time & Utilities",
    color: "amber",
    skills: ["Socket.io", "Razorpay Payments", "Firebase Cloud Messaging", "Cloudinary CDN", "PDFKit Engine", "ExcelJS", "Git / GitHub"]
  },
  {
    category: "Frontend Engineering Capabilities",
    color: "rose",
    fullWidth: true,
    skills: ["React.js (React 19)", "Vite", "TanStack Query", "TanStack Table", "Zustand State Store", "React Router", "HTML5 & Modern CSS"]
  }
];

export const experienceData = [
  {
    role: "MERN Stack Developer",
    company: "Kods Technologies Private Limited • Bengaluru",
    badge: "🏢 Enterprise SaaS Production",
    duration: "6 Months",
    projects: [
      {
        title: "ISP & Broadband Subscriber Management SaaS",
        meta: "Internal Enterprise System",
        desc: "Engineered the core backend services for a multi-tenant Internet Service Provider (ISP) management platform operating at scale.",
        modalId: "activLineModal",
        modalBtnText: "Architecture & Specs",
        bullets: [
          "Built resilient backend services with Node.js, Express.js, and MongoDB for multi-tenant isolation with JWT authentication and Role-Based Access Control (RBAC).",
          "Integrated 4+ third-party REST APIs to synchronize subscriber profiles, plan lifecycles, and billing ledgers; implemented scheduled cron reconciliation engines to eradicate billing mismatches.",
          "Automated payment processing, customer push notifications, real-time status sync, and PDF/Excel financial reports using Razorpay, Firebase, Socket.io, PDFKit, and ExcelJS.",
          "Structured codebase strictly in Controller-Service-Repository layers with Joi request schema validation and centralized exception handling; authored Vitest unit test suites."
        ],
        tags: ["Node.js", "Express", "MongoDB", "SQL", "Razorpay", "Socket.io", "PDFKit", "Vitest"]
      },
      {
        title: "On-Demand Marketplace & Booking Platform",
        meta: "Internal Enterprise Platform",
        desc: "Architected a full-stack marketplace ecosystem uniting venues, domain experts, client bookings, memberships, and referral pipelines for 100+ active users.",
        modalId: "jomsModal",
        modalBtnText: "System Architecture",
        bullets: [
          "Engineered end-to-end booking, recurring subscription, and payment transaction flows paired with live venue availability calendars and analytical dashboard metrics.",
          "Built reusable backend microservices for automated media uploads (Cloudinary), streaming Excel data exports, administrative approval lifecycles, bulk actions, and cursor-based pagination.",
          "Implemented RBAC boundaries protecting expert consultations and admin approval pipelines."
        ],
        tags: ["React.js", "Node.js", "Express", "MongoDB", "Cloudinary", "ExcelJS", "RBAC"]
      }
    ]
  },
  {
    role: "Python Full Stack Development Intern",
    company: "PySpiders • Bengaluru",
    badge: "🏢 Python & Django Internship",
    duration: "Apr 2025 – Oct 2025",
    bullets: [
      "Architected database-driven web applications leveraging Django MVT (Model-View-Template) architecture, JavaScript, and relational SQL.",
      "Engineered user-facing responsive interfaces integrated with Django ORM queries, templates, secure session handling, and authentication views.",
      "Designed and optimized SQL database schemas and model relationships for structured data persistence."
    ],
    tags: ["Python", "Django", "MVT Architecture", "SQL", "JavaScript"]
  },
  {
    role: "Full Stack Development Intern",
    company: "Campus To Technical Careers • Bengaluru",
    badge: "🏢 Full Stack Internship",
    duration: "3 Months",
    bullets: [
      "Built an end-to-end e-commerce shopping platform covering responsive UI layouts, client state management, cart checkout workflows, and SQL persistence.",
      "Implemented user interaction handling with HTML5, CSS3, JavaScript, and managed version control through Git."
    ],
    tags: ["HTML5 / CSS3", "JavaScript", "SQL", "Git"]
  }
];

export const educationData = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    degree: "B.E. in Computer Science & Engineering",
    institution: "MVJ College of Engineering • Bengaluru",
    period: "2021 – 2025",
    scoreBadge: "CGPA: 8.34",
    coursework: "Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, Object-Oriented Programming (OOP), Software Engineering Principles."
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    degree: "Pre-University Course (PUC - PCMB)",
    institution: "Sri Vasavi P U College • Challakere",
    period: "2021",
    scoreBadge: "Aggregate: 92.8%",
    coursework: "Physics, Chemistry, Mathematics, Biology. Graduated with distinction honors."
  }
];
