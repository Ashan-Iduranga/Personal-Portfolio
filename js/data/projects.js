/*
  js/data/projects.js
  CONTENT ONLY: your GitHub link, the project categories, the projects and the
  "On the workbench" ideas. No logic here.

  How to add a project: copy one { ... } block, paste it, and edit the values.
  - title, year, description: text shown on the card (keep descriptions to 1-2 sentences)
  - category: one of the keys in PROJECT_CATEGORIES
  - tags:  technologies used
  - image: a real screenshot, saved in assets/images/ (desktop shots: landscape, about 1600 x 1000)
  - live:  link to a live site or app store page, or "" if there isn't one.
           (Code links aren't per card: one "See all my code on GitHub" button sits under the grid.)
  Optional:
  - status: short label next to the year, e.g. "In progress"
  - role:   one line on what you did or learned, e.g. "Built the API and the dashboard"
  - note:   text shown instead of a link when there's no public code, e.g. "Closed source"
  - fit:    "whole" to show the full screenshot instead of cropping it (phone screens, app windows)

  Order matters: cards alternate wide / narrow, starting with a wide one.
*/

// Your GitHub profile (used by the empty state in js/projects.js)
const GITHUB_PROFILE = "https://github.com/Ashan-Iduranga";

// Category id -> label shown on the card ("2026 / Mobile")
const PROJECT_CATEGORIES = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  ai: "AI tool",
  backend: "Backend",
};

const PROJECTS = [
  {
    title: "BOQ Filler",
    year: 2026,
    category: "desktop",
    status: "Client product",
    description: "A Windows app that fills Excel bills of quantities from Excel files and scanned PDFs, turning hours of manual copying into minutes.",
    role: "Built it end to end: the desktop app, the OCR reading and the licence server on Cloudflare Workers.",
    tags: ["Python", "Tkinter", "OCR", "Cloudflare Workers"],
    image: "assets/images/project-boq-filler.jpg",
    fit: "whole",
    live: "",
    note: "Closed source · sold with licence keys",
  },
  {
    title: "MemoStack",
    year: 2026,
    category: "mobile",
    status: "In progress",
    description: "A study notes app for university students: modules, rich notes, quizzes, offline saving, streaks and XP. Still building it.",
    role: "Designing and building it solo, from the screens to offline saving and the Firebase backend.",
    tags: ["React Native", "Expo", "TypeScript", "Firebase"],
    image: "assets/images/project-memostack.jpg",
    fit: "whole",
    live: "",
  },
  {
    title: "Internship Job Agent",
    year: 2026,
    category: "ai",
    description: "Collects Sri Lankan IT internships twice a day, has Claude score each one against my profile, and ranks them on a local dashboard.",
    role: "Wrote the job collectors, the Claude scoring prompts and the FastAPI dashboard.",
    tags: ["Python", "FastAPI", "SQLite", "Claude"],
    image: "assets/images/project-job-agent.jpg",
    live: "",
  },
  {
    title: "Design Library MCP",
    year: 2026,
    category: "ai",
    description: "My own library of design references that Claude can search by keyword or by meaning while it builds UI.",
    role: "Built the MCP server, the keyword and meaning search, and the web gallery.",
    tags: ["Python", "MCP", "FastAPI", "SQLite", "Embeddings"],
    image: "assets/images/project-design-library.jpg",
    live: "",
  },
  {
    title: "Expense Tracker",
    year: 2026,
    category: "mobile",
    description: "Coursework app for logging spending, with charts, a custom amount keypad and undo.",
    role: "Learned Expo Router navigation and keeping data in sync with Firebase.",
    tags: ["Expo Router", "TypeScript", "Firebase"],
    image: "assets/images/project-expense-tracker.jpg",
    fit: "whole",
    live: "",
  },
  {
    title: "Firebase CRUD App",
    year: 2026,
    category: "mobile",
    description: "Coursework Flutter app that creates, reads, updates and deletes records in Cloud Firestore.",
    role: "Learned Flutter layouts and live reads and writes with Firestore.",
    tags: ["Flutter", "Dart", "Firestore"],
    image: "assets/images/project-firebase-crud.jpg",
    fit: "whole",
    live: "",
  },
];

// Ideas still being planned or built. Shown in a small "On the workbench" strip under the cards.
// Leave the list empty ([]) to hide the strip.
const BREWING = [
  {
    title: "EchoSight",
    description: "A voice-first AI assistant that describes the surroundings for visually impaired Sri Lankans.",
  },
  {
    title: "Baitless",
    description: "An AI detector for scam and fraud messages, aimed at Sri Lankan mobile users.",
  },
];
