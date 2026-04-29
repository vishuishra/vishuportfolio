export const CAREER_START_DATE = new Date(2021, 7); // August 2021

export const profile = {
  name: 'Vishu Mishra',
  title: 'Backend Engineer | AI Systems Builder',
  rotatingTitles: [
    'Building resilient backend systems',
    'Designing AI-powered product workflows',
    'Shipping APIs with production-grade reliability',
  ],
  intro:
    'I design resilient backend systems, AI workflows, and scalable APIs that solve real business problems.',
  location: 'India',
  email: 'mishra.vishu99@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/vishuishra' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishumishra99/' },
    { label: 'Email', href: 'mailto:mishra.vishu99@gmail.com' },
  ],
};

export const skills = [
  {
    category: 'Languages & Frameworks',
    items: ['Python', 'Flask', 'FastAPI', 'JavaScript', 'GraphQL'],
  },
  {
    category: 'AI & Search',
    items: ['LLMs', 'RAG', 'Agentic AI', 'Semantic Search', 'Prompt Engineering'],
  },
  {
    category: 'Data & Messaging',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Kafka', 'RabbitMQ'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
  },
];

export const experiences = [
  {
    company: 'BOLD',
    role: 'Software Engineer',
    duration: 'Aug 2024 - Present',
    highlights: [
      'Built QBS service — a semantic caching layer using Pinecone that identifies similar queries, cutting redundant LLM calls by ~40% and improving response times.',
      'Improved application-filling accuracy from 37% to 79% using semantic matching techniques.',
      'Optimized infra spend by ~$2M/year through intelligent proxy routing, 50% K8s pod reduction, and Azure Service Bus tier downgrade saving ~$600K/year.',
      'Drove transition from bespoke automation to a modular agentic AI framework, reducing custom scripts by 30% and accelerating feature delivery by 40%.',
    ],
  },
  {
    company: 'Target Integration',
    role: 'Back End Developer',
    duration: 'Aug 2023 - Jul 2024',
    highlights: [
      'Engineered in-app notifications feature enabling real-time user updates and improving engagement.',
      'Led gateway architecture enhancements for bidirectional communication across API and socket-based interactions.',
      'Migrated GraphQL to GraphQL-over-WebSocket, reducing latency and enabling full-duplex async communication.',
      'Primary point of contact for client integrations — delivered Facebook, Zapier, and IVR integrations, accelerating client onboarding.',
    ],
  },
  {
    company: 'HCLTech',
    role: 'Analyst',
    duration: 'Jul 2021 - Jul 2023',
    highlights: [
      'Developed production-ready web applications focused on UCaaS services within the Python framework.',
      'Built API integrations and backend modules for enterprise-scale applications.',
      'Strengthened foundation in production troubleshooting and performance optimization.',
    ],
  },
];

export const projects = [
  {
    title: 'Aier - The Smart Tab Organizer',
    impact: 'A Chrome/Edge extension that groups tabs by domain (eTLD+1), keeps grouping logic deterministic, and lays the foundation for persistent naming and smart cleanup workflows.',
    stack: ['Chrome Extension', 'JavaScript', 'Browser APIs'],
    link: 'https://github.com/vishuishra/aier',
  },
  {
    title: 'Pdfot-AI (PDF Chatbot System)',
    impact: 'A production-ready AI chatbot system that processes PDF documents and provides contextual answers with citations. Built with Node.js, React, TypeScript, and powered by Pinecone and OpenAI.',
    stack: ['Node.js', 'React', 'TypeScript', 'Pinecone', 'OpenAI'],
    link: 'https://github.com/vishuishra/Pdfot-AI',
  },
];

export const certifications = [
  'AWS Certified Cloud Practitioner',
  'Microsoft Certified: Azure Fundamentals (AZ-900)',
];

export const education = {
  degree: 'BTech, Guru Gobind Singh Indraprastha University',
  duration: '2017 - 2021',
};
