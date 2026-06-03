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

### Phase 2 — JavaScript · `completed`
Full interactivity added in vanilla JS. Tasks can be added, completed, deleted, and filtered. Habits toggle on click with live streak calculation. Notes persist via localStorage.

**Skills:** DOM manipulation, event listeners, localStorage, array methods (filter, sort, map), Date API

---

### Phase 3 — React · `in progress`
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

### Phase 3 — Frontend (React + Vite)
The frontend is a Vite + React app located in the `frontend/` folder. To run or build it locally:

- Install dependencies (from project root):

```bash
cd frontend
npm install
```

- Run the dev server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

- Preview the built site locally:

```bash
npm run preview
```

Notes:
- Node 18+ and npm (or pnpm/yarn) are recommended.
- The `frontend/package.json` includes `dev`, `build`, and `preview` scripts using Vite.

---

## Live demo

[Timothy-Mc.github.io/life-dashboard](https://Timothy-Mc.github.io/life-dashboard)

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

---

**Contributing**

- Bug reports and small PRs welcome. Open issues for larger feature discussions.
- Run the frontend locally (see above) and include clear repro steps in PR descriptions.

**License**

This repository does not currently include a license file — add one if you want to permit reuse.