const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
const { isDbConnected } = require('../config/db');

const legacyPortfolio = [
  {
    title: "AI Video Advertisement",
    description: "High-impact AI-driven video advertisements designed to maximize conversion and engagement.",
    category: "video",
    technologies: ["AI", "Video Production"],
    image: "/images/projects/content-creator.jpeg",
    video: "/videos/services/content-creator.mp4",
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "Modern Web Development",
    description: "Custom-built, high-performance web applications using modern stacks.",
    category: "web",
    technologies: ["React", "TypeScript", "Node.js"],
    image: "/images/projects/web-development.jpeg",
    video: "",
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "AI Automation Solutions",
    description: "Automated workflow solutions using advanced AI models for business efficiency.",
    category: "automation",
    technologies: ["AI", "Python", "Automation"],
    image: "/images/projects/ai-automation.jpeg",
    video: "",
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "Creative Graphic Design",
    description: "Professional graphic design portfolios and branding solutions.",
    category: "design",
    technologies: ["Figma", "Adobe Suite"],
    image: "/images/projects/graphic-design.jpeg",
    video: "",
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "Network Infrastructure",
    description: "Secure, scalable networking architecture for enterprise infrastructure.",
    category: "networking",
    technologies: ["Cisco", "Linux", "Network Security"],
    image: "/images/projects/networking.jpeg",
    video: "",
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "AI Content Creation",
    description: "Innovative AI-powered tools and content generation platforms.",
    category: "automation",
    technologies: ["AI", "Content Strategy"],
    image: "/images/projects/ai-project-1.jpg",
    video: "",
    liveUrl: "",
    githubUrl: ""
  }
];

const seedPortfolio = async () => {
  try {
    if (!isDbConnected(Portfolio)) {
      console.log("MongoDB unavailable, skipping portfolio seed");
      return;
    }

    for (const item of legacyPortfolio) {
      const exists = await Portfolio.findOne({ title: item.title });
      if (!exists) {
        await Portfolio.create(item);
        console.log(`Portfolio item ${item.title} created.`);
      } else {
        console.log(`Portfolio item ${item.title} already exists, skipping.`);
      }
    }
  } catch (error) {
    console.error('Error seeding portfolio:', error.message);
  }
};

module.exports = seedPortfolio;
