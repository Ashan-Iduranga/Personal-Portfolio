/*
  js/data/skills.js
  CONTENT ONLY: the skills shown on the site. No logic here.

  How to add a skill:
    Copy one line inside a category's "items" list and change it, e.g.
    { name: "Docker", icon: "devicon-docker-plain" },

  - name: what visitors see
  - icon: a Devicon class. Find names at https://devicon.dev (click an icon, copy the class,
          and keep only the part like "devicon-docker-plain"). Phosphor icons also work,
          e.g. "ph ph-database".

  How to add a category: copy a whole { category, items } block. Each block becomes one card.
*/

const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "Java", icon: "devicon-java-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "PHP", icon: "devicon-php-plain" },
      { name: "Dart", icon: "devicon-dart-plain" },
      { name: "SQL", icon: "ph ph-database" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "devicon-react-original" },
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "React Native", icon: "devicon-react-original" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Spring Boot", icon: "devicon-spring-original" },
      { name: "ASP.NET", icon: "devicon-dot-net-plain" },
    ],
  },
  {
    category: "Databases & Cloud",
    items: [
      { name: "MySQL", icon: "devicon-mysql-original" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
      { name: "Microsoft Azure", icon: "devicon-azure-plain" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "Postman", icon: "devicon-postman-plain" },
      { name: "Figma", icon: "devicon-figma-plain" },
      { name: "VS Code", icon: "devicon-vscode-plain" },
      { name: "Android Studio", icon: "devicon-androidstudio-plain" },
    ],
  },
];
