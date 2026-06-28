// ============================================================
// SINGLE SOURCE OF TRUTH — Used by the Local Resume Generator
// All data sourced directly from the portfolio components.
// Edit this file to update what appears in the generated PDF.
// ============================================================

export const portfolioData = {
  personalInfo: {
    name: 'Jeevan Bodlapati',
    title: 'AI Engineer | Full Stack Developer | Prompt Engineer',
    email: 'jeevan@example.com',
    phone: '+91-XXXXXXXXXX',
    location: 'India',
    linkedin: 'linkedin.com/in/jeevanbodlapati',
    github: 'github.com/jeevanbodlapati',
    portfolio: 'jeevanbodlapati.dev',
    summary:
      'Results-driven AI Engineer and Full Stack Developer with 3+ years of experience architecting intelligent, scalable applications. Specialized in Large Language Models, RAG systems, prompt engineering, and building end-to-end web applications using React, Node.js, and Python. Passionate about bridging complex AI models with beautiful, high-performance user interfaces.',
  },

  education: [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Jawaharlal Nehru Technological University',
      location: 'Hyderabad, India',
      year: '2018 – 2022',
      grade: 'First Class with Distinction',
    },
  ],

  skills: {
    ai: [
      'Large Language Models (LLMs)',
      'Prompt Engineering',
      'LangChain',
      'LlamaIndex',
      'RAG Systems',
      'OpenAI / GPT-4',
      'Anthropic / Claude',
      'Hugging Face',
      'TensorFlow',
      'PyTorch',
      'Vector Databases',
      'AI Agents',
      'Fine-tuning',
      'Semantic Search',
    ],
    frontend: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'Framer Motion',
      'HTML5 / CSS3',
      'Three.js',
      'Redux',
      'Figma',
    ],
    backend: [
      'Python',
      'FastAPI',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'REST APIs',
      'GraphQL',
      'WebSockets',
    ],
    cloudAndDevops: [
      'AWS',
      'GCP',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'GitHub Actions',
      'Vercel',
      'Nginx',
      'Linux',
      'Git',
    ],
  },

  experience: [
    {
      role: 'AI Engineer',
      company: 'TechVision AI Labs',
      location: 'Bangalore, India',
      duration: 'Jan 2024 – Present',
      type: 'Full-time',
      highlights: [
        'Architected and deployed RAG-based document intelligence system serving 10K+ users',
        'Engineered prompt pipelines reducing LLM costs by 40% while maintaining quality',
        'Led integration of GPT-4o and Claude APIs into enterprise SaaS product',
        'Built real-time AI chat infrastructure handling 50K+ daily messages',
      ],
      tags: ['LangChain', 'OpenAI', 'FastAPI', 'AWS', 'React'],
    },
    {
      role: 'Full Stack Developer',
      company: 'Innovate Digital Solutions',
      location: 'Hyderabad, India',
      duration: 'Jun 2022 – Dec 2023',
      type: 'Full-time',
      highlights: [
        'Built and shipped 8+ full-stack web applications using React and Node.js',
        'Reduced API response time by 60% through caching and query optimization',
        'Mentored 3 junior developers on React best practices and code review',
        'Integrated AI-powered features including smart search and recommendations',
      ],
      tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
    },
    {
      role: 'Prompt Engineer & AI Consultant',
      company: 'Freelance / Remote',
      location: 'Remote',
      duration: 'Jan 2022 – May 2022',
      type: 'Freelance',
      highlights: [
        'Consulted for 12+ clients on AI integration strategies and prompt design',
        'Created comprehensive prompt templates for marketing, content, and coding tasks',
        'Evaluated and benchmarked leading LLMs for client-specific use cases',
        'Delivered AI automation workflows saving clients 15+ hours/week',
      ],
      tags: ['GPT-4', 'Claude', 'Prompt Design', 'Python', 'Automation'],
    },
    {
      role: 'Frontend Developer Intern',
      company: 'StartUp Hub',
      location: 'Hyderabad, India',
      duration: 'Jun 2021 – Dec 2021',
      type: 'Internship',
      highlights: [
        'Built responsive UI components using React and Tailwind CSS',
        'Collaborated with design team to implement pixel-perfect interfaces',
        'Improved page load performance by 35% through code splitting and lazy loading',
      ],
      tags: ['React', 'Tailwind CSS', 'JavaScript', 'Figma'],
    },
  ],

  projects: [
    {
      title: 'AI Chat Assistant',
      description:
        'Full-featured AI chatbot powered by GPT-4 with memory, context awareness, and multi-modal capabilities. Supports voice input, image analysis, and real-time streaming responses.',
      tags: ['OpenAI', 'LangChain', 'React', 'FastAPI', 'PostgreSQL'],
      category: 'AI / ML',
      featured: true,
      github: '#',
      demo: '#',
    },
    {
      title: 'RAG Knowledge Base',
      description:
        'Enterprise-grade Retrieval-Augmented Generation system that indexes company documents and enables natural language queries. Deployed with vector search and semantic chunking.',
      tags: ['Python', 'Pinecone', 'LlamaIndex', 'FastAPI', 'Docker'],
      category: 'AI / ML',
      featured: true,
      github: '#',
      demo: '#',
    },
    {
      title: 'Prompt Optimizer',
      description:
        'SaaS tool that analyzes and auto-optimizes prompts for various LLMs. Features A/B testing, analytics dashboard, and team collaboration for prompt management.',
      tags: ['Next.js', 'TypeScript', 'OpenAI', 'Prisma', 'Stripe'],
      category: 'Prompt Eng.',
      featured: true,
      github: '#',
      demo: '#',
    },
    {
      title: 'Full Stack E-Commerce',
      description:
        'Modern e-commerce platform with AI-powered product recommendations, real-time inventory management, and seamless payment integration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
      category: 'Full Stack',
      featured: false,
      github: '#',
      demo: '#',
    },
    {
      title: 'AI Image Generator',
      description:
        'Web app integrating Stable Diffusion and DALL-E APIs with custom style presets, batch generation, and gallery management features.',
      tags: ['Python', 'Stable Diffusion', 'React', 'AWS S3'],
      category: 'AI / ML',
      featured: false,
      github: '#',
      demo: '#',
    },
    {
      title: 'DevOps AI Pipeline',
      description:
        'Automated CI/CD pipeline with AI-driven code review, test generation, and deployment monitoring using natural language commands.',
      tags: ['Python', 'Docker', 'GitHub Actions', 'AWS', 'FastAPI'],
      category: 'Full Stack',
      featured: false,
      github: '#',
      demo: '#',
    },
  ],

  certifications: [
    {
      title: 'AWS Certified Machine Learning – Specialty',
      issuer: 'Amazon Web Services',
      date: 'Mar 2024',
      credentialId: 'AWS-MLS-2024',
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'deeplearning.ai / Coursera',
      date: 'Nov 2023',
      credentialId: 'DL-SPEC-2023',
    },
    {
      title: 'LangChain for LLM Application Development',
      issuer: 'deeplearning.ai',
      date: 'Sep 2023',
      credentialId: 'LC-LLM-2023',
    },
    {
      title: 'Meta Front-End Developer Professional',
      issuer: 'Meta / Coursera',
      date: 'Jun 2023',
      credentialId: 'META-FE-2023',
    },
    {
      title: 'OpenAI Prompt Engineering Certificate',
      issuer: 'OpenAI',
      date: 'Apr 2023',
      credentialId: 'OAI-PE-2023',
    },
    {
      title: 'Google Cloud Professional Data Engineer',
      issuer: 'Google Cloud',
      date: 'Jan 2023',
      credentialId: 'GCP-DE-2023',
    },
  ],
}
