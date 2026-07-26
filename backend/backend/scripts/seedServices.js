const mongoose = require('mongoose');
const Service = require('../models/Service');
const { isDbConnected } = require('../config/db');

const legacyServices = [
  {
    title: "AI Video Ads",
    subtitle: "High-converting video ads powered by generative AI.",
    description: "We craft cinematic, data-driven video advertisements designed to stop the scroll and drive conversion for your brand.",
    icon: "Video",
    image: "/images/services/ai-solutions.jpg",
    highlights: ["Generative AI Characters", "Automated Editing", "High Conversion Rate"],
    technologies: ["AI", "Video Production"]
  },
  {
    title: "Web Development",
    subtitle: "Custom-built, high-performance web applications.",
    description: "From intuitive frontends to robust backend architectures, we deliver scalable web experiences using modern technologies.",
    icon: "Code",
    image: "/images/services/web-development.jpg",
    highlights: ["React/Next.js", "Node.js/Express", "Scalable Architecture"],
    technologies: ["React", "TypeScript", "Node.js"]
  },
  {
    title: "UI/UX Design and Digital Design",
    subtitle: "Visually stunning brand identities.",
    description: "Transform your brand's presence with professional graphic design, UI/UX, and creative assets that resonate.",
    icon: "Palette",
    image: "/images/services/digital-design.png",
    highlights: ["UI/UX Design", "Brand Identity", "Marketing Collateral"],
    technologies: ["Figma", "Adobe Suite"]
  },
  {
    title: "Enterprise Network",
    subtitle: "Secure and robust network infrastructure.",
    description: "Enterprise-grade networking solutions ensuring security, speed, and reliability for your business operations.",
    icon: "Network",
    image: "/images/services/networking-solutions.png",
    highlights: ["Infrastructure Design", "Network Security", "Maintenance"],
    technologies: ["Cisco", "Linux", "Security"]
  },
  {
    title: "AI Content Creation",
    subtitle: "Innovative AI-powered content generation.",
    description: "Leverage cutting-edge AI tools to generate engaging content, automate social media, and streamline asset creation.",
    icon: "Sparkles",
    image: "/images/services/ai-solutions.jpg",
    highlights: ["AI Copywriting", "Social Media Automation", "Asset Generation"],
    technologies: ["AI", "Content Strategy"]
  }
];

const seedServices = async () => {
  try {
    if (!isDbConnected(Service)) {
      console.log("MongoDB unavailable, skipping services seed");
      return;
    }

    for (const item of legacyServices) {
      const exists = await Service.findOne({ title: item.title });
      if (!exists) {
        await Service.create(item);
        console.log(`Service ${item.title} created.`);
      } else {
        console.log(`Service ${item.title} already exists, skipping.`);
      }
    }
  } catch (error) {
    console.error('Error seeding services:', error.message);
  }
};

module.exports = seedServices;
