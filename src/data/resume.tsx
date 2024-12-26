import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

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
    // Add more projects as needed...
  ],
  hackathons: [],
} as const;
