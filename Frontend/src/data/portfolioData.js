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
        'Built AI Face Recognition systems',
        'Worked with CNN-based computer vision models',
        'Responsible for AI model training and evaluation',
        'Developed API integrations for seamless model deployment',
        'Contributed to React, PHP, HTML, and CSS development'
      ],
      tags: ['Computer Vision', 'CNN', 'React', 'PHP', 'API'],
      color: '#6366f1',
      icon: '🤖',
    },
  ],

  projects: [
    {
      id: 1,
      title: 'JARVIS Personal AI Assistant',
      description:
        'AI-powered multi-agent personal assistant inspired by Iron Man JARVIS. Supports voice control, mobile control, AI automation, tool calling, multilingual conversation, and can assist in building websites and applications.',
      tags: ['Python', 'GenAI', 'RAG', 'LLM Integration', 'AI Agents', 'n8n', 'Automation Anywhere', 'Voice AI', 'Text-to-Speech', 'Tool Calling'],
      category: 'AI / ML / Automation',
      featured: true,
      github: 'https://github.com/BodlapatiJeevan160',
      demo: null,
      impact: 'Automated personal workflows and voice interactions',
      gradient: 'from-indigo-500 to-purple-600',
      glowColor: '#6366f1',
      icon: '🤖',
      stars: 248,
    },
    {
      id: 2,
      title: 'AI Driven Data Analytics Platform',
      description:
        'AI-powered analytics platform that automates data analyst workflows including data cleaning, visualization, data lifecycle processing, stock market analysis, crypto analysis, and intelligent insights.',
      tags: ['Python', 'Pandas', 'NumPy', 'React', 'MongoDB', 'AI APIs', 'Automation'],
      category: 'Data Engineering / AI',
      featured: true,
      github: 'https://github.com/BodlapatiJeevan160/AI-drivendataAnalysisAPP',
      demo: null,
      impact: 'Automated 80% of manual data analysis tasks',
      gradient: 'from-purple-500 to-pink-600',
      glowColor: '#a855f7',
      icon: '📊',
      stars: 182,
    },
    {
      id: 3,
      title: 'Fraud Payment & Card Detection Platform',
      description:
        'AI fraud detection system using machine learning algorithms to identify suspicious transactions and protect users from fraudulent payments using pattern recognition.',
      tags: ['Python', 'Random Forest', 'Machine Learning', 'React', 'AI APIs'],
      category: 'AI / Machine Learning',
      featured: true,
      github: 'https://github.com/BodlapatiJeevan160',
      demo: 'https://guard-card-scan.base44.app/',
      impact: 'Improved fraud detection accuracy using ML',
      gradient: 'from-cyan-500 to-blue-600',
      glowColor: '#06b6d4',
      icon: '🛡️',
      stars: 135,
    },
    {
      id: 4,
      title: 'Veggie Farmers Market',
      description:
        'Platform connecting farmers directly with city customers, reducing middlemen and enabling access to fresh organic vegetables while improving farmer profits.',
      tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
      category: 'Full Stack / Social Impact',
      featured: false,
      github: 'https://github.com/BodlapatiJeevan160',
      demo: 'https://bodlapatijeevan.wixsite.com/veggie-farmers-marke',
      impact: 'Empowered local farmers with direct consumer access',
      gradient: 'from-green-500 to-teal-600',
      glowColor: '#10b981',
      icon: '🥬',
      stars: 97,
    },
    {
      id: 5,
      title: 'ShopSocial.com',
      description:
        'Social commerce platform combining e-commerce and social media where sellers promote products, create stories, advertisements, and customers purchase directly.',
      tags: ['React', 'JavaScript', 'REST API', 'Flask', 'UI/UX'],
      category: 'Full Stack',
      featured: false,
      github: 'https://github.com/BodlapatiJeevan160',
      demo: 'https://shop-social-7cec8ae9.base44.app/',
      impact: 'Integrated social sharing with direct e-commerce',
      gradient: 'from-amber-500 to-orange-600',
      glowColor: '#f59e0b',
      icon: '🛍️',
      stars: 73,
    },
    {
      id: 6,
      title: 'Cafe Website',
      description: 'Freelance project developing an attractive, responsive modern website for a local cafe business to enhance digital presence.',
      tags: ['Frontend', 'UI/UX', 'Responsive Design'],
      category: 'Freelance',
      featured: false,
      github: '#',
      demo: '#',
      impact: 'Increased local cafe online visibility',
      gradient: 'from-pink-500 to-rose-600',
      glowColor: '#ec4899',
      icon: '☕',
      stars: 12,
    },
    {
      id: 7,
      title: 'AI Prototype for Train Ticket Booking',
      description: 'Freelance prototype application leveraging AI to streamline and automate train ticket booking operations and user flows.',
      tags: ['AI Integration', 'Prototype', 'Automation'],
      category: 'Freelance',
      featured: false,
      github: '#',
      demo: '#',
      impact: 'Streamlined booking flows using AI',
      gradient: 'from-blue-500 to-indigo-600',
      glowColor: '#3b82f6',
      icon: '🚂',
      stars: 18,
    },
    {
      id: 8,
      title: 'AI Attendance Marking Application',
      description: 'Freelance AI-powered attendance application using facial recognition to automate student/employee attendance logging.',
      tags: ['Computer Vision', 'Python', 'AI'],
      category: 'Freelance',
      featured: false,
      github: '#',
      demo: '#',
      impact: 'Automated manual attendance using Face Recognition',
      gradient: 'from-teal-500 to-green-600',
      glowColor: '#14b8a6',
      icon: '👤',
      stars: 25,
    }
  ],

  certifications: [
    {
      title: 'ServiceNow Certified System Administrator (CSA)',
      issuer: 'ServiceNow',
      date: 'Recent',
      credentialId: 'SN-CSA',
      link: '#',
      icon: '⚙️',
      color: '#4ade80',
      skills: ['ServiceNow', 'Administration', 'ITSM'],
      verified: true
    },
    {
      title: 'ServiceNow Certified Application Developer (CAD)',
      issuer: 'ServiceNow',
      date: 'Recent',
      credentialId: 'SN-CAD',
      link: '#',
      icon: '💻',
      color: '#06b6d4',
      skills: ['ServiceNow', 'App Development', 'Scripting'],
      verified: true
    },
    {
      title: 'Automation Anywhere Advanced Professional',
      issuer: 'Automation Anywhere',
      date: 'Recent',
      credentialId: 'AA-AAP',
      link: '#',
      icon: '🤖',
      color: '#f59e0b',
      skills: ['RPA', 'Bot Development', 'Automation'],
      verified: true
    },
    {
      title: 'Prompt Engineering & Programming with OpenAI',
      issuer: 'OpenAI',
      date: 'Recent',
      credentialId: 'OAI-PE',
      link: '#',
      icon: '✨',
      color: '#ec4899',
      skills: ['Prompt Engineering', 'LLMs', 'OpenAI API'],
      verified: true
    },
    {
      title: 'AI Tools Workshop Certification',
      issuer: 'Workshop',
      date: 'Recent',
      credentialId: 'AI-TOOLS',
      link: '#',
      icon: '🛠️',
      color: '#8b5cf6',
      skills: ['AI Tools', 'ChatGPT', 'Productivity'],
      verified: true
    },
    {
      title: 'Cambridge Linguaskill English Certification B1',
      issuer: 'Cambridge',
      date: 'Recent',
      credentialId: 'CAM-ENG',
      link: '#',
      icon: '🗣️',
      color: '#ef4444',
      skills: ['English', 'Communication'],
      verified: true
    },
    {
      title: 'Web Development Bootcamp',
      issuer: 'Bootcamp',
      date: 'Recent',
      credentialId: 'WEB-DEV',
      link: '#',
      icon: '🌐',
      color: '#3b82f6',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      verified: true
    },
  ],
}
