/*
  js/data/projects.js
  CONTENT ONLY: your GitHub link, the project categories, the projects and the
  "On the workbench" ideas. No logic here.

  How to add a project: copy one { ... } block, paste it, and edit the values.
  - title, year, description: text shown on the card (keep descriptions to 1-2 sentences)
  - category: one of the keys in PROJECT_CATEGORIES
  - tags:  technologies used
  - image: a real screenshot (WebP), saved in assets/images/. Exact sizes, because cards alternate wide / narrow:
           wide cards (1st, 4th, 5th, 8th...) 1900 x 1000, narrow cards (2nd, 3rd, 6th, 7th...) 1600 x 1200
  - alt:   what the picture shows, for screen readers and if the image fails to load
  - live:  link to a live site or app store page, or "" if there isn't one.
           (Code links aren't per card: one "See all my code on GitHub" button sits under the grid.)
  Optional:
  - status: short label next to the year, e.g. "In progress"
  - role:   one line on what you did or learned, e.g. "Built the API and the dashboard"
  - note:   text shown when there's no public code, e.g. "Closed source"
  - links:  extra buttons, each { label, href, icon }. icon is a Phosphor icon name (phosphoricons.com),
            e.g. "download-simple". Add download: true for file downloads (they open in the same tab).
  - video:  a short muted clip (assets/video/...) that plays over the picture while the card is hovered.
            Make it the same shape as the picture. Phones and "reduce motion" visitors only see the picture.
  - fit:    "whole" to show the full screenshot instead of cropping it (only for images NOT made at the sizes above)

  Order matters: cards alternate wide / narrow, starting with a wide one.
  Moving a project to a different spot can change its card shape, so its picture may need remaking.
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

// Daily Strip's website (the APK download lives there)
const DAILY_STRIP_SITE = "https://daily-strip.vercel.app";

const PROJECTS = [
  {
    // wide
    title: "BOQ Filler",
    year: 2026,
    category: "desktop",
    status: "Client product",
    description: "A Windows app that fills Excel bills of quantities from Excel files and scanned PDFs, turning hours of manual copying into minutes.",
    role: "Built it end to end: the desktop app, the OCR reading and the licence server on Cloudflare Workers.",
    tags: ["Python", "Tkinter", "OCR", "Cloudflare Workers"],
    image: "assets/images/project-boq-filler.webp",
    alt: "BOQ Filler's main window with the steps to pick a BOQ, pick the sheet to fill and match the columns, plus its 'PDF converted' and 'Finished' messages",
    live: "",
    note: "Closed source · sold with licence keys",
  },
  {
    // narrow
    title: "Daily Strip",
    year: 2026,
    category: "mobile",
    status: "Released",
    description: "An Android money app that sets your bills aside first, then tells you what you can spend each day. It started as coursework and is now out as a free download with in-app updates.",
    role: "Designed and built it solo: offline-first saving that syncs to Firestore, bill reminders, CSV import and export, and the release pipeline on GitHub.",
    tags: ["React Native", "Expo", "TypeScript", "SQLite", "Firebase"],
    image: "assets/images/project-daily-strip.webp",
    alt: "Three Daily Strip phone screens: adding a Rs 1,850 lunch on the keypad, the dark home screen with Rs 21,330 spent this month, and the History list",
    video: "assets/video/daily-strip.mp4",
    live: DAILY_STRIP_SITE,
  },
  {
    // narrow
    title: "Daily Strip website",
    year: 2026,
    category: "web",
    description: "The landing page for Daily Strip. It turns one full screen at a time on desktop, has light and dark themes, shows live ratings from the app, and every download button points at the newest APK.",
    role: "Built and deployed it myself, from the page-turn scrolling to the share image and SEO.",
    tags: ["Next.js", "Tailwind CSS", "Motion", "shadcn/ui", "Vercel"],
    image: "assets/images/project-daily-strip-site.webp",
    alt: "The Daily Strip website: the dark desktop hero 'Every rupee on your side' with the app on a phone, and the light mobile page 'Tap the lime plus. Done.'",
    live: DAILY_STRIP_SITE,
  },
  {
    // wide
    title: "Baitless",
    year: 2026,
    category: "ai",
    status: "In progress",
    description: "An Android app that checks a suspicious SMS, WhatsApp message, link or screenshot and explains why it looks like a scam, in Sinhala, Tamil and English.",
    role: "Building it solo: the on-device scam rules, the Supabase backend with Gemini and Safe Browsing checks, and SMS Guard in Kotlin.",
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "Gemini"],
    image: "assets/images/project-baitless.webp", // TODO: add a 1900 x 1000 WebP (placeholder shows until then)
    alt: "Baitless phone screens: scanning a suspicious message and the scam risk result",
    live: "",
  },
  {
    // wide
    title: "Internship Job Agent",
    year: 2026,
    category: "ai",
    description: "Collects Sri Lankan IT internships twice a day, has Claude score each one against my profile, and ranks them on a local dashboard.",
    role: "Wrote the job collectors, the Claude scoring prompts and the FastAPI dashboard.",
    tags: ["Python", "FastAPI", "SQLite", "Claude"],
    image: "assets/images/project-job-agent.webp",
    alt: "Three windows of the Internship radar dashboard: expired jobs, the all-jobs summary with 62 active internships, and match-scored job cards",
    live: "",
  },
  {
    // narrow
    title: "Design Library MCP",
    year: 2026,
    category: "ai",
    description: "My own library of design references that Claude can search by keyword or by meaning while it builds UI.",
    role: "Built the MCP server, the keyword and meaning search, and the web gallery.",
    tags: ["Python", "MCP", "FastAPI", "SQLite", "Embeddings"],
    image: "assets/images/project-design-library.webp",
    alt: "Three Design Library windows: the Sources page, the gallery with nearly 12,000 references by category, and one saved pricing-card design",
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
    title: "MemoStack",
    description: "A study notes app for university students: rich notes, quizzes, offline saving, streaks and XP.",
  },
];
