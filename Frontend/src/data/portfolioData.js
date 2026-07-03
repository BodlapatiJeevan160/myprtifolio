// ============================================================
// SINGLE SOURCE OF TRUTH — Used by the Local Resume Generator
// All data sourced directly from the portfolio components.
// Edit this file to update what appears in the generated PDF.
// ============================================================

export const portfolioData = {
  personalInfo: {
    name: 'Bodlapati Jeevan',
    title: 'AI Software Engineer | AI Engineer | Automation Engineer',
    email: '2310030160cse@gmail.com',
    phone: '+91 9014345907',
    location: 'Hyderabad, India',
    linkedin: 'linkedin.com/in/jeevan-bodlapati/',
    github: 'github.com/BodlapatiJeevan160',
    portfolio: 'myprtifolio.vercel.app',
    summary:
      'B.Tech Computer Science Engineering student specializing in Data Engineering for AI, focused on building AI-powered software solutions, SaaS platforms, full-stack applications, and automation systems. Skilled at leveraging AI tools to accelerate development, improve productivity, and create scalable solutions. Experienced with AI workflow automation using n8n and Automation Anywhere, API development using FastAPI, REST APIs, and modern web technologies.',
  },

  education: [
    {
      degree: 'B.Tech Computer Science Engineering',
      institution: 'Koneru Lakshmaiah Education Foundation (KLH)',
      location: 'Hyderabad, India',
      year: '2023 – 2027',
      grade: 'CGPA: 8.5+/10',
    },
  ],

  skills: {
    programming: ['Python', 'Java', 'HTML', 'CSS'],
    ai: [
      'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'CNN', 'RNN',
      'Computer Vision', 'Face Recognition', 'Model Evaluation',
      'Prompt Engineering', 'LLM Integration', 'RAG', 'AI Agents',
      'Multi Agent Systems', 'Conversational AI', 'Voice AI', 'Tool Calling'
    ],
    automation: ['n8n', 'Automation Anywhere', 'Workflow Automation', 'RPA'],
    data: ['Pandas', 'NumPy', 'Data Processing', 'Data Analysis', 'Data Engineering'],
    backend: ['FastAPI', 'Flask', 'Django', 'Node.js', 'REST API Development'],
    frontend: ['React', 'UI/UX Design', 'Figma'],
    database: ['SQL', 'MongoDB', 'Firebase'],
    tools: ['ChatGPT', 'Gemini', 'NotebookLM', 'Claude', 'Perplexity AI', 'GitHub Copilot', 'Cursor AI']
  },

  experience: [
    {
      role: 'AI Developer Intern',
      company: 'EZMLR Technologies',
      location: 'Mangalore, India',
      duration: '3 Months',
      type: 'Internship',
      highlights: [
        'Worked on Face Recognition AI Systems and CNN Computer Vision Models',
        'Responsible for AI model training and performance evaluation',
        'Developed API integrations for seamless model deployment',
        'Contributed to React Development, PHP, HTML, and CSS integration'
      ],
      tags: ['Computer Vision', 'CNN', 'React', 'PHP', 'API'],
    },
  ],

  projects: [
    {
      title: 'JARVIS Personal AI Assistant',
      description:
        'AI-powered multi-agent assistant inspired by Iron Man JARVIS. Features voice control, mobile control, AI automation, tool calling, website/app development assistance, and multilingual AI conversation.',
      tags: ['Python', 'GenAI', 'RAG', 'AI Agents', 'n8n', 'Automation Anywhere'],
      category: 'AI / ML',
      featured: true,
      github: '#',
      demo: '#',
    },
    {
      title: 'AI Driven Data Analytics Platform',
      description:
        'Automates data analyst workflows. Features include data cleaning, visualization, analytics, stock analysis, and crypto analysis.',
      tags: ['Python', 'Pandas', 'NumPy', 'React', 'MongoDB', 'AI APIs'],
      category: 'Data / AI',
      featured: true,
      github: 'https://github.com/BodlapatiJeevan160/AI-drivendataAnalysisAPP',
      demo: '#',
    },
    {
      title: 'Fraud Payment & Card Detection Platform',
      description:
        'AI fraud detection platform using Machine Learning models such as Random Forest.',
      tags: ['Python', 'Random Forest', 'Machine Learning', 'React'],
      category: 'AI / ML',
      featured: true,
      github: '#',
      demo: 'https://guard-card-scan.base44.app/',
    },
    {
      title: 'Veggie Farmers Market',
      description:
        'A comprehensive farmer-to-customer marketplace connecting local farmers directly with consumers.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      featured: false,
      github: '#',
      demo: 'https://bodlapatijeevan.wixsite.com/veggie-farmers-marke',
    },
    {
      title: 'ShopSocial',
      description:
        'A social commerce platform integrating social interactions with a modern e-commerce shopping experience.',
      tags: ['React', 'Flask', 'REST API', 'JavaScript'],
      category: 'Full Stack',
      featured: false,
      github: '#',
      demo: 'https://shop-social-7cec8ae9.base44.app/',
    },
  ],

  certifications: [
    {
      title: 'ServiceNow Certified System Administrator',
      issuer: 'ServiceNow',
      date: 'Recent',
      credentialId: 'SN-CSA',
    },
    {
      title: 'ServiceNow Certified Application Developer',
      issuer: 'ServiceNow',
      date: 'Recent',
      credentialId: 'SN-CAD',
    },
    {
      title: 'Automation Anywhere Advanced Automation Professional',
      issuer: 'Automation Anywhere',
      date: 'Recent',
      credentialId: 'AA-AAP',
    },
    {
      title: 'Prompt Engineering & Programming with OpenAI',
      issuer: 'Certification',
      date: 'Recent',
      credentialId: 'OAI-PE',
    },
    {
      title: 'AI Tools & ChatGPT Certification',
      issuer: 'Certification',
      date: 'Recent',
      credentialId: 'AI-TOOLS',
    },
    {
      title: 'Cambridge Linguaskill English Certification',
      issuer: 'Cambridge',
      date: 'Recent',
      credentialId: 'CAM-ENG',
    },
    {
      title: 'Web Development Bootcamp',
      issuer: 'Bootcamp',
      date: 'Recent',
      credentialId: 'WEB-DEV',
    },
  ],
}
