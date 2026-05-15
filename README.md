# Life Dashboard

A productivity web app for tracking tasks, habits, and notes — built from scratch as a learning project, progressing from static HTML through to a deployed full-stack application.

---

## Project overview

Life Dashboard is a single-page productivity tool with three panels:

- **Tasks** — add, complete, delete, and filter your to-dos
- **Habits** — track daily habits across the week with streak counters
- **Notes** — a persistent scratchpad that saves as you type

The project is built in phases, each one adding a new layer of technology. Every phase produces a working, deployable app.

---

## Phases

### Phase 1 — Static HTML/CSS · `complete`
Responsive dashboard layout built with semantic HTML, CSS custom properties, Flexbox, and CSS Grid. Deployed to GitHub Pages.

**Skills:** HTML5, CSS Grid, Flexbox, responsive design, Git, GitHub Pages

---

### Phase 2 — JavaScript · `in progress`
Full interactivity added in vanilla JS. Tasks can be added, completed, deleted, and filtered. Habits toggle on click with live streak calculation. Notes persist via localStorage.

**Skills:** DOM manipulation, event listeners, localStorage, array methods (filter, sort, map), Date API

---

### Phase 3 — React · `upcoming`
Full frontend rebuild using React. Component-based architecture, React Router for multi-page navigation, Context API for dark mode, habit completion chart.

**Skills:** React, JSX, hooks (useState, useEffect, useContext), React Router, Vite

---

### Phase 4 — Python backend + database · `upcoming`
REST API built with FastAPI, connected to a PostgreSQL database. User authentication with JWT. Frontend connected to the real backend and deployed.

**Skills:** FastAPI, PostgreSQL, SQL, REST API design, JWT auth, Railway deployment

---

### Phase 5 — Security audit · `upcoming`
Full security audit of the Phase 4 app. OWASP Top 10 testing, vulnerability identification and remediation, written pentest report.

**Skills:** OWASP Top 10, API security testing, input validation, rate limiting, security report writing

---

## Tech stack

| Phase | Technology |
|-------|-----------|
| 1 | HTML5, CSS3 |
| 2 | Vanilla JavaScript |
| 3 | React, Vite, React Router |
| 4 | Python, FastAPI, PostgreSQL |
| 5 | Burp Suite, Postman |

---

## Getting started

### Phase 1 & 2 (no build step needed)

1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/life-dashboard.git
   cd life-dashboard
   ```
2. Open `index.html` in VS Code
3. Run with the Live Server extension — right-click `index.html` → **Open with Live Server**

### Phase 3+ (coming soon)
Instructions will be added here once the React build is set up.

---

## Live demo

[yourusername.github.io/life-dashboard](https://yourusername.github.io/life-dashboard)

---

## What I learned

- How to structure a multi-panel UI using CSS Grid and Flexbox without a framework
- The save/load/render pattern for managing state in vanilla JS — the same mental model React uses
- How localStorage works and when it's the right tool
- Writing real streak logic: iterating backwards through an array while a condition holds
- Why semantic HTML matters for accessibility and how to run a Lighthouse audit

---

## Roadmap

- [x] Responsive HTML/CSS layout
- [x] Task CRUD with DOM manipulation
- [x] localStorage persistence for tasks and notes
- [x] Habit grid with streak tracking
- [x] Task filtering (All / Active / Completed)
- [ ] React rebuild with component architecture
- [ ] Dark mode toggle
- [ ] Habit completion chart
- [ ] Python/FastAPI backend
- [ ] User authentication
- [ ] Security audit and pentest report

---

## Author

Built by Timothy McLeod as a self-directed learning project covering web development and cybersecurity fundamentals.