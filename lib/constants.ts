export const PORTFOLIO = {
  personal: {
    name: 'Tewodros Million',
    title: 'Junior AI Systems Engineer',
    tagline: 'Building intelligent systems and scalable AI-powered solutions',
    bio: `AI Systems Engineer specializing in intelligent systems, backend development and AI-driven business automation. Recently graduated with a BSc in Software Engineering from Addis Ababa University (AAU), with hands-on experience in ERP customization and AI integration.`,
    email: 'tedrosmilion19@gmail.com',
    location: 'Ethiopia',
    profilePhoto: '/tewodros-profile.jpg', // for top of website
  },

  experience: [
    {
      role: 'Junior AI Systems Engineer',
      company: 'Alta Computec PLC',
      duration: 'Present (less than 1 year)',
      description:
        'Designing and developing intelligent systems and automating business processes with AI integration, while optimizing backend performance and ERP workflows.',
      image: '/alta.jpg',

        highlights: [
        'AI-powered backend solutions and automation',
        'Odoo ERP customization and module development',
        'System performance optimization and debugging',
        'Client requirement analysis and technical solution design',
      ],
    },
  ],

  certifications: [
     {
      id: 'oci-ai-foundations',
      name: 'OCI AI Foundations Associate',
      issuer: 'Oracle Cloud',
      date: '2025',
      credentialId: 'OCI-AI-Foundations',
      pdfUrl: '/certificates/Oracle AI Foundations Associate 2025 Certificate.pdf',
      thumbnailUrl: '/certificates/Oracle AI Foundations Associate 2025 Certificate 1.png',
      description: 'Professional certification demonstrating knowledge of Oracle AI services.',
    },
    {
      id: 'ibm-cloud-intro',
      name: 'Introduction to Cloud Computing',
      issuer: 'IBM',
      date: '2026',
      credentialId: 'IBM-Cloud-Intro',
      pdfUrl: '/certificates/Introduction to Cloud Computing IBM Full Stack Certificate.pdf',
      thumbnailUrl: '/certificates/Introduction to Cloud Computing IBM Full Stack Coursera.png',
      description: 'Certificate demonstrating foundational knowledge of cloud computing concepts and services.',
    },
    {
      id: 'oracle-fusion-ai-agent',
      name: 'Oracle Fusion AI Agent Studio Certificate',
      issuer: 'Oracle',
      date: '2025',
      credentialId: 'Oracle-Fusion-AI-Agent',
      pdfUrl: '/certificates/Oracle Fusion AI Agent Studio Certificate.pdf',
      thumbnailUrl: '/certificates/Oracle Fusion AI Agent Studio Certificate.png',
      description: 'Certificate showcasing skills in building and managing AI agents using Oracle Fusion AI Agent Studio.',
    },
    {
      id: 'google-ux-design',
      name: 'Google UX Design Professional Certificate',
      issuer: 'Google',
      date: '2026',
      credentialId: 'Google-UX-Design',
      pdfUrl: '/certificates/Google UX Design Professional Certificate.pdf',
      thumbnailUrl: '/certificates/Google UX Design Professional Certificate.png',
      description: 'Professional certificate demonstrating expertise in user experience research and design principles.',
    },
    {
      id: 'legacy-responsive-web-design-v8',
      name: 'Legacy Responsive Web Design v8',
      issuer: 'freeCodeCamp',
      date: '2022',
      credentialId: 'Legacy-Responsive-Web-Design-v8',
      pdfUrl: '/certificates/Legacy Responsive Web Design v8 Certificate.pdf',
      thumbnailUrl: '/certificates/Responsive Web Design.png',
      description: 'Certificate demonstrating proficiency in HTML, CSS, responsive design, Flexbox, Grid, and building accessible web pages.',
    },
  ],
  education: [
    {
      degree: "Bachelor's in Software Engineering",
      institution: 'Addis Ababa University',
      duration: '2024',
      logoUrl: '/Addis-Ababa-University logo.png',
      description:
        'Completed a comprehensive software engineering curriculum with practical experience in full-stack development, backend systems and AI foundations.',
    },
    {
      degree: 'BA in Management',
      institution: 'Haramaya University',
      duration: '2025',
      logoUrl: '/Haramaya logo.png',
      description: 'Focused on organizational leadership, strategic planning and process optimization to achieve business goals efficiently.',
    },
  ],

  skills: {
    'Programming Languages': ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS'],
    'AI & ML Tools': ['OpenAI API', 'Python AI Libraries', 'OCI AI Services', 'Generative AI Foundations'],
    'Frameworks & Libraries': ['React.js', 'Node.js', 'Express.js', 'Odoo Framework'],
    'Databases': ['PostgreSQL', 'MongoDB'],
    'ERP & Tools': ['Odoo ERP', 'Git', 'Docker', 'REST APIs', 'Postman'],
    'Cloud': ['Oracle Cloud Infrastructure (OCI)'],
  },

  projects: [
  {
      title: 'Smart Department-Based Project Access Module',
      description:
        'Custom Odoo module automating project access based on department selection during CRM-to-Project conversion.',
      technologies: ['Python', 'Odoo ORM', 'PostgreSQL'],
      link: 'https://github.com/teddymillion',
      image: '/projects/smart project access.jpg', 
      highlights: [
        'Security-focused access control',
        'Automated workflow integration',
        'Department-based restrictions',
      ],
},
    {
      title: 'TaskFlow – Project & Task Management Web App',
      description:
        'A full-stack task management system with user authentication, project creation, and real-time task tracking.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      link: 'https://github.com/teddymillion',
      image: '/projects/task flow.jpg', 
      highlights: [
        'User authentication system',
        'Real-time task updates',
        'Project organization and collaboration',
      ],
    },
    {
      title: 'Resume Analyzer using AI',
      description:
        'Web app that analyzes resumes and provides AI-generated feedback using prompt engineering principles.',
      technologies: ['JavaScript', 'Node.js', 'OpenAI API', 'REST APIs'],
      link: 'https://github.com/teddymillion',
      image: '/projects/resume analyzer.jpg',
      highlights: [
        'AI-powered analysis',
        'Prompt engineering implementation',
        'Detailed feedback generation',
      ],
    },
  ],

  social: [
    {
      name: 'GitHub',
      url: 'https://github.com/teddymillion',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tewodros-million-a911303a3/',
      icon: 'linkedin',
    },
    {
      name: 'Email',
      url: 'mailto:tedrosmilion19@gmail.com',
      icon: 'mail',
    },
  ],
}