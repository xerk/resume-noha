import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Film } from "lucide-react";

export const DATA = {
  name: "Noha Fathy",
  role: "Senior Copywriter & Content Creator",
  initials: "NF",
  url: "https://noha.xerk.io",
  location: "15th of May Extension, Helwan, Cairo",
  locationLink: "https://www.google.com/maps/place/15th+of+may+city+helwan",
  description: 
    "Senior Copywriter and Content Creator with extensive experience in crafting compelling narratives across multiple platforms. Expert in content strategy, voice-over production, and marketing campaigns.",
  summary: 
    "I am a versatile content professional specializing in copywriting, content creation, and voice-over work. With proven expertise in developing strategic marketing campaigns and engaging content across various platforms, I excel in both written and audiovisual content production. Fluent in English and Arabic, I bring a comprehensive skill set in creative direction, marketing strategy, and multimedia production.",
  avatarUrl: "/profile.png",
  resumeUrl: "https://drive.google.com/nohafathy-cv",
  skills: [
    "Content Creation & Strategy",
    "Copywriting & Scriptwriting",
    "Voice Over Production",
    "Adobe Audition",
    "Adobe Premiere",
    "Social Media Management",
    "SEO Optimization",
    "Marketing Strategy",
    "Creative Direction",
    "Television Production",
    "Public Speaking",
    "Research & Analysis",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/reels", icon: Film, label: "Reels" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "noha.fathy213@gmail.com",
    tel: "+20 1099816389",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/noha-fathy-03a66b242/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:noha.fathy213@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Black Box",
      href: "https://blackbox.sa",
      badges: [],
      location: "Saudi Arabia",
      title: "Senior Copywriter",
      logoUrl: "/experiences/blackbox.png",
      start: "November 2022",
      end: "Present",
      description:
        "Spearhead development of strategic marketing campaigns with compelling copy that drives audience engagement. Collaborate with cross-functional teams to develop innovative creative concepts. Create tailored content that effectively communicates brand messaging across various platforms.",
    },
    {
      company: "Experts Marketing Agency",
      href: "https://experts.sa",
      badges: [],
      location: "Saudi Arabia",
      title: "Senior Copywriter",
      logoUrl: "/experiences/experts.png",
      start: "May 2022",
      end: "November 2022",
      description:
        "Developed engaging creative content for diverse marketing initiatives. Led collaborative efforts with cross-functional teams to execute successful campaigns. Implemented strategic content approaches to maximize audience engagement.",
    },
    {
      company: "Shetaa Wa Sief",
      href: "https://shetaawasief.sa",
      badges: [],
      location: "Saudi Arabia",
      title: "Senior Copywriter",
      logoUrl: "/experiences/shetaawasief.png",
      start: "May 2020",
      end: "May 2022",
      description:
        "Conceptualized and executed innovative content strategies. Created impactful copy across multiple platforms. Contributed to successful client campaign outcomes through strategic messaging.",
    },
    {
      company: "Independent Content Creator",
      href: "#",
      badges: [],
      location: "Freelance",
      title: "Content Creator & Voice Over Artist",
      logoUrl: "/experiences/freelance.png",
      start: "2019",
      end: "Present",
      description:
        "Create and produce diverse content including commercials, narrations, and podcasts. Deliver versatile voice-over performances across multiple styles and tones. Manage end-to-end content production from conceptualization to final delivery.",
    },
  ],
  education: [
    {
      school: "Al-Azhar University",
      href: "https://www.azhar.edu.eg",
      degree: "Pre-Master's Degree in Radio & Television",
      logoUrl: "/alazhar.png",
      start: "2018",
      end: "2021",
      description:
        "Completed advanced studies in Radio and Television, focusing on media production and broadcasting techniques.",
    },
    {
      school: "Al-Azhar University",
      href: "https://www.azhar.edu.eg",
      degree: "Bachelor's Degree in Media (Very Good)",
      logoUrl: "/alazhar.png",
      start: "2014",
      end: "2018",
      description:
        "Graduated with honors from the Radio and Television Department. Received first place with merit for graduation project in Talk Show Production.",
    },
  ],
  projects: [
    {
      title: "Talk Show Production",
      href: "#",
      dates: "2018",
      active: false,
      type: "project",
      description:
        "Award-winning graduation project showcasing excellence in television production and content creation.",
      technologies: [
        "Television Production",
        "Content Creation",
        "Script Writing",
        "Direction",
      ],
      links: [
        // Add relevant links to portfolio pieces
      ],
      image: "/projects/talkshow.png",
      video: {
        thumbnail: "/projects/talkshow.png",
        url: "/projects/talkshow.mp4",
        hasAudio: true,
      },
    },
    // Reels - YouTube Shorts
    {
      title: "Content Creation Showcase",
      href: "https://youtube.com/shorts/vG612DgAaO8",
      dates: "2024",
      active: true,
      type: "reel",
      description:
        "Behind the scenes of my content creation process and creative workflow.",
      technologies: ["Video Production", "Content Creation", "Editing"],
      links: [],
      image: "https://img.youtube.com/vi/vG612DgAaO8/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/vG612DgAaO8/maxresdefault.jpg",
        url: "https://youtube.com/shorts/vG612DgAaO8",
        hasAudio: true,
      },
    },
    {
      title: "Voice Over Demo Reel",
      href: "https://youtube.com/shorts/yXNblAVMYhY",
      dates: "2024",
      active: true,
      type: "reel",
      description:
        "Compilation of various voice-over projects showcasing range and versatility.",
      technologies: ["Voice Over", "Audio Production", "Adobe Audition"],
      links: [],
      image: "https://img.youtube.com/vi/yXNblAVMYhY/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/yXNblAVMYhY/maxresdefault.jpg",
        url: "https://youtube.com/shorts/yXNblAVMYhY",
        hasAudio: true,
      },
    },
    {
      title: "Marketing Campaign Highlight",
      href: "https://youtube.com/shorts/7O2-5A69vV4",
      dates: "2024",
      active: true,
      type: "reel",
      description:
        "Key highlights from recent marketing campaigns and creative projects.",
      technologies: ["Marketing", "Creative Direction", "Copywriting"],
      links: [],
      image: "https://img.youtube.com/vi/7O2-5A69vV4/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/7O2-5A69vV4/maxresdefault.jpg",
        url: "https://youtube.com/shorts/7O2-5A69vV4",
        hasAudio: true,
      },
    },
    {
      title: "Professional Work Sample",
      href: "https://youtube.com/shorts/DEDdW8zac4w",
      dates: "2024",
      active: true,
      type: "reel",
      description:
        "Professional work samples demonstrating expertise in content creation.",
      technologies: ["Content Strategy", "Copywriting", "Production"],
      links: [],
      image: "https://img.youtube.com/vi/DEDdW8zac4w/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/DEDdW8zac4w/maxresdefault.jpg",
        url: "https://youtube.com/shorts/DEDdW8zac4w",
        hasAudio: true,
      },
    },
    {
      title: "Creative Portfolio Piece",
      href: "https://youtube.com/shorts/SbQXV55oVAk",
      dates: "2024",
      active: true,
      type: "reel",
      description:
        "Creative portfolio piece showcasing versatility and creative direction.",
      technologies: ["Creative Direction", "Video Production"],
      links: [],
      image: "https://img.youtube.com/vi/SbQXV55oVAk/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/SbQXV55oVAk/maxresdefault.jpg",
        url: "https://youtube.com/shorts/SbQXV55oVAk",
        hasAudio: true,
      },
    },
    // Stories - YouTube Shorts (same content, displayed as stories)
    {
      title: "Daily Content Tips",
      href: "https://youtube.com/shorts/vG612DgAaO8",
      dates: "2024",
      active: true,
      type: "story",
      description:
        "Quick tips and insights on content creation and copywriting.",
      technologies: ["Content Strategy", "Tips & Tricks"],
      links: [],
      image: "https://img.youtube.com/vi/vG612DgAaO8/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/vG612DgAaO8/maxresdefault.jpg",
        url: "https://youtube.com/shorts/vG612DgAaO8",
        hasAudio: true,
      },
    },
    {
      title: "Behind the Mic",
      href: "https://youtube.com/shorts/yXNblAVMYhY",
      dates: "2024",
      active: true,
      type: "story",
      description:
        "A glimpse into the voice-over recording process.",
      technologies: ["Voice Over", "Studio Setup"],
      links: [],
      image: "https://img.youtube.com/vi/yXNblAVMYhY/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/yXNblAVMYhY/maxresdefault.jpg",
        url: "https://youtube.com/shorts/yXNblAVMYhY",
        hasAudio: true,
      },
    },
    {
      title: "Creative Process",
      href: "https://youtube.com/shorts/7O2-5A69vV4",
      dates: "2024",
      active: true,
      type: "story",
      description:
        "How I approach brainstorming and developing creative concepts.",
      technologies: ["Creative Direction", "Strategy"],
      links: [],
      image: "https://img.youtube.com/vi/7O2-5A69vV4/maxresdefault.jpg",
      video: {
        thumbnail: "https://img.youtube.com/vi/7O2-5A69vV4/maxresdefault.jpg",
        url: "https://youtube.com/shorts/7O2-5A69vV4",
        hasAudio: true,
      },
    },
    // Add more projects as needed...
  ],
  hackathons: [],
} as const;
