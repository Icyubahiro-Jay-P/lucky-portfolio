export const person = {
  name: "Nisingizwe Lucky Junior",
  firstLine: "Nisingizwe",
  secondLine: "Lucky Junior",
  role: "Backend Developer",
  location: "Rwanda",
  tagline: "From bare metal to REST endpoints.",
  summary:
    "I build the systems other interfaces stand on: APIs, databases, and the plumbing between them. I started out repairing computer hardware, and I still debug software the same way: find where it is actually broken, not just where it complains.",
  email: "nisingizweluckyjunior@gmail.com",
  whatsapp: "250791538227",
  github: "https://github.com/123luju",
  githubHandle: "github.com/123luju",
  cv: "/CV.pdf",
  portrait: "/lucky.jpg",
};

export const skillGroups = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "PHP"] },
  { label: "Runtime & APIs", items: ["Node.js", "Express", "REST", "Socket.IO"] },
  { label: "Data", items: ["MongoDB", "Mongoose", "MySQL", "Schema design"] },
  { label: "Quality & Security", items: ["JWT auth", "Zod", "Helmet", "Vitest", "Jest"] },
  { label: "Tools", items: ["Git & GitHub", "HTML", "CSS"] },
  { label: "Hardware", items: ["Repair & troubleshooting"] },
];

// Projects render in this order. Any field left as null is simply not shown.
// An entry with no `summary` appears only by name under "Also built"; give it
// a summary and it is promoted to a full row automatically.
export const projects = [
  {
    id: "hotel",
    name: "El Cielo Hotel Management",
    summary:
      "Rooms, bookings and guests behind one Express + MongoDB API, with a React dashboard that charts occupancy and revenue.",
    stack: ["Node.js", "Express", "MongoDB", "React", "Recharts"],
    repo: "https://github.com/123luju/hotel",
    live: "https://hotel-pink-nu.vercel.app",
  },
  {
    id: "ivfluid",
    name: "Smart IV Monitoring System",
    summary:
      "Real-time IV fluid levels for hospital wards in Rwanda. Nurses get live alerts over WebSockets, SMS and push before a drip runs dry.",
    stack: ["Express", "MongoDB", "Socket.IO", "JWT", "Twilio", "Web Push"],
    repo: "https://github.com/123luju/backend-ivfluid",
    live: null,
  },
  {
    id: "businesshub",
    name: "BusinessHub API",
    summary:
      "A typed business-management backend: Zod-validated routes, structured Pino logging, scheduled jobs and a Vitest suite.",
    stack: ["TypeScript", "Express", "MongoDB", "Zod", "Pino", "Vitest"],
    repo: "https://github.com/123luju/hub-backendbusiness",
    live: null,
  },
  // TODO(owner): fill summary / stack / repo / live to promote to a full row.
  {
    id: "epms",
    name: "Employee Payroll Management System",
    summary: null,
    stack: null,
    repo: null,
    live: null,
  },
  // TODO(owner): fill summary / stack / repo / live to promote to a full row.
  {
    id: "boutique",
    name: "Boutique Management System",
    summary: null,
    stack: null,
    repo: null,
    live: null,
  },
];

export const education = [
  { school: "ESSA Nyarugunga", detail: "Advanced Level, Software Development" },
  { school: "Mater Dei Secondary School", detail: "Ordinary Level" },
];

export const certifications = [
  "Leadership Certificate",
  "Software Development Internship, Certificate of Completion",
  "FPR Participation Certificate",
];
