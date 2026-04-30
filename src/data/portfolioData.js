export const CAREER_START_DATE = new Date(2021, 7); // August 2021

export const profile = {
  name: 'Vishu Mishra',
  title: 'Backend Engineer | AI Systems Builder',
  rotatingTitles: [
    'Building resilient backend systems',
    'Designing AI-powered product workflows',
    'Shipping APIs with production-grade reliability',
  ],
  intro: [
    'Software Engineer with 4+ years of experience building scalable, cloud-native applications using Python, Flask, and FastAPI. Skilled in microservices, event-driven architectures, and high-performance distributed systems.',
    'Experienced in AI-driven systems — LLMs, Agentic AI, RAG pipelines, semantic search, and vector embeddings. Proficient in CI/CD, Docker, Kubernetes, and Azure for deploying production systems at scale.',
  ],
  location: 'India',
  email: 'mishra.vishu99@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/vishuishra', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishu-mishra', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:mishra.vishu99@gmail.com', icon: 'email' },
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
  { name: 'AWS Certified Cloud Practitioner', href: 'https://www.credly.com/badges/4b48a695-de8c-45bc-8c26-bb5a821db99e/public_url' },
  { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', href: 'https://www.credly.com/badges/7e786db9-6adc-49dd-8a3c-0a2333a68186' },
];

export const education = {
  degree: 'BTech, Guru Gobind Singh Indraprastha University',
  duration: '2017 - 2021',
};
