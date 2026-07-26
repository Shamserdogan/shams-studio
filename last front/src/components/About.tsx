import { motion } from "motion/react";
import { 
  GraduationCap, 
  Terminal, 
  Server, 
  Cpu, 
  Layers, 
  BookOpen, 
  Award, 
  Compass, 
  Code,
  Network
} from "lucide-react";

export default function About() {
  const skills = [
    {
      category: "AI & Media Creation",
      icon: Cpu,
      description: "Crafting modern generative AI prompt strategies, specialized AI video advertisements, and high-fidelity graphics.",
      items: ["Midjourney & Stable Diffusion", "Runway Gen-2 & Sora Ads", "GPT Prompt Engineering", "Cinematic Post-Production"],
      percentage: 95
    },
    {
      category: "Full-Stack Development",
      icon: Code,
      description: "Building responsive, modern single-page applications with TypeScript, React, and server-side logic integrations.",
      items: ["React / Vite / Next.js", "TypeScript & ESNext", "Tailwind CSS & Motion", "REST & Server-Side APIs"],
      percentage: 90
    },
    {
      category: "Networking & Systems",
      icon: Network,
      description: "Designing corporate network architectures, routing/switching configurations, and learning CCNA frameworks.",
      items: ["Cisco Packet Tracer", "Routing Protocols & Subnetting", "Network Topology & Security", "CCNA Fundamentals"],
      percentage: 85
    }
  ];

 const timeline = [
  {
    year: "2024 - Present",
    title: "Principal — Muhammad Trust Schools Al-Jannat Campus",
    subtitle: "Education Leadership & Administration",
    description:
      "Serving as Principal at Muhammad Trust Schools Al-Jannat Campus, managing academic operations, teacher coordination, student development, and institutional growth."
  },
  {
    year: "2025 - Present",
    title: "Press Secretary — Waziristan Welfare Foundation",
    subtitle: "Social Welfare & Media Communication",
    description:
      "Working as Press Secretary at Waziristan Welfare Foundation, managing press releases, public awareness campaigns, welfare project coverage, and digital communication."
  },
  {
    year: "2025 - Present",
    title: "Social Media Manager — Ganra Premier League (GPL)",
    subtitle: "Sports Media Management",
    description:
      "Managing GPL social media platforms, match promotions, digital campaigns, event coverage, and audience engagement."
  },
  {
    year: "2024 - Present",
    title: "BS Computer Science",
    subtitle: "Gomal University",
    description:
      "Studying Computer Science with focus on programming, data structures, databases, networking, artificial intelligence, and modern technologies."
  },
  {
    year: "2024",
    title: "Founder, Shams Studio",
    subtitle: "AI Video & Digital Solutions Agency",
    description:
      "Founded Shams Studio, providing AI-powered content creation, web development, digital design, and innovative technology solutions."
  },
  {
    year: "2025 - 2026",
    title: "Specialized Skill Development",
    subtitle: "Networking & AI Systems Integration",
    description:
      "Developing expertise in CCNA networking, AI automation, prompt engineering, web technologies, and advanced digital systems."
  }
];

  return (
    <section 
      id="about" 
      /* تبدیلی: min-h-screen کو ختم کیا، pt-40 کیا تاکہ ہیڈنگ نیچے ہو جائے، اور overflow کو visible کیا */
      className="relative pt-32 sm:pt-40 pb-16 bg-[#020617] border-b border-white/5"
    >
      {/* Background Lighting Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-cyan-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        
        {/* Grid 1: Personal Card & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-24" id="about-intro-grid">
          
          {/* Left: Glassmorphic Personal Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:row-span-2 rounded-2xl bg-white/5 border border-white/10 p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
            id="personal-info-card"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <div className="relative z-10 space-y-6">
              {/* Profile Image Frame */}
              <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 to-blue-500 mx-auto lg:mx-0 shadow-lg shadow-cyan-500/10">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src="/images/shams-profile.jpg" 
                    alt="Shams Ud Din" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-1 right-1 h-4.5 w-4.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center animate-pulse" />
              </div>

              {/* Bio Details */}
              <div className="text-center lg:text-left space-y-1">
                <h3 className="text-2xl font-bold text-white font-display">Shams Ud Din</h3>
                <p className="text-sm font-semibold text-cyan-400 font-mono tracking-widest uppercase">Founder, Shams Studio</p>
                <p className="text-xs text-gray-400">AI Creator & Web Architect</p>
              </div>

              <hr className="border-white/5" />

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 text-left font-sans text-xs">
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase tracking-wider block font-medium">Core Focus</span>
                  <span className="text-gray-300 font-semibold">AI Video Ads & Web Dev</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase tracking-wider block font-medium">Education</span>
                  <span className="text-gray-300 font-semibold">BS Computer Science</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase tracking-wider block font-medium">Network Passion</span>
                  <span className="text-gray-300 font-semibold">Cisco Routing & CCNA</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase tracking-wider block font-medium">Vibe</span>
                  <span className="text-cyan-400 font-semibold font-mono">200 OK / Active</span>
                </div>
              </div>

              {/* Gomal University Highlight */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
                <GraduationCap className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Academic Path</span>
                  <span className="text-xs font-semibold text-gray-200">Gomal University, Pakistan</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Vision Statements */}
          <div className="lg:col-span-7 space-y-6 mt-8 lg:mt-0" id="about-vision-block">
            
            {/* ہیڈنگز والا حصہ: صرف یہ ڈیسک ٹاپ پر دائیں طرف کھسکے گا */}
            <div className="mb-8 text-center lg:text-left lg:pl-32">
              <div className="flex justify-center lg:justify-start items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-cyan-400"></span>
                <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold font-display">
                  Brand Architect
                </span>
                <span className="h-[1px] w-8 bg-cyan-400"></span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                Behind the Intelligence.
              </h2>
            </div>

            {/* ڈسکرپشن والا حصہ: یہ ہیڈنگ والے ڈبے سے باہر ہے اس لیے اپنی جگہ پر رہے گا */}
            <p className="mt-8 text-lg leading-9 text-gray-400 text-center lg:text-left">
              I am a visionary technology student and digital craftsman based in Pakistan. Integrating computer science theory with high-end creative direction, I bridge the gap between artificial intelligence, beautiful web engineering, and rock-solid network systems.
            </p>

            {/* باقی کا نیچے والا کوڈ (Creative Mission وغیرہ) یہاں سے شروع ہوگا */}
            <h3 className="text-2xl font-bold text-white font-display tracking-tight flex items-center justify-center lg:justify-start gap-3 mt-10">
              <Compass className="w-6 h-6 text-cyan-400" />
              Creative Mission & Engineering Code
            </h3>
            
            <p className="text-gray-400 leading-relaxed font-sans text-center lg:text-left">
              At <strong className="text-white">SHAMS STUDIO</strong>, the vision is simple: to make complex technology beautiful, accessible, and cinematic. Whether engineering robust web pipelines with modern frameworks, configuring stateful routers for high-capacity networks, or prompting massive LLMs to generate bespoke content, every line of code serves a narrative.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div
                onClick={() => window.location.href="#services"}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 cursor-pointer hover:border-cyan-400 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">AI Integration</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Specialized prompt design and machine interfaces to translate business targets into cinematic marketing reels and responsive digital workflows.
                </p>
              </div>

              <div
                onClick={() => window.location.href="#services"}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 cursor-pointer hover:border-blue-400 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-500/20 flex items-center justify-center">
                  <Server className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Modern Routing</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Passionate about structural engineering. Building network topologies, understanding subnets, and deep-diving into CCNA switching mechanisms.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Timeline */}
        <div id="about-timeline" className="mt-24">
          <div className="mb-12">
            <span className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase block mb-2 font-bold">Chronology</span>
            <h3 className="text-3xl font-extrabold text-white font-display">Academic & Agency Progress</h3>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
            {timeline.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative pl-8 sm:pl-10 group"
              >
                <span className="absolute left-0 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 transition-all group-hover:scale-125 group-hover:bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]" />
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950/30 border border-cyan-500/20 px-2.5 py-1 rounded">
                    {item.year}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white font-display group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                    <p className="text-xs font-semibold text-gray-500 font-mono tracking-widest uppercase">{item.subtitle}</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-2xl">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Skills Matrix */}
        <div className="mt-24 mb-12" id="about-skills-matrix">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase block mb-2 font-bold">Capabilities</span>
            <h3 className="text-3xl font-extrabold text-white font-display">Technical Matrix</h3>
          </div>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {skills.map((skill, idx) => {
              const SkillIcon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="min-w-[300px] sm:min-w-[340px] snap-center p-6 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <SkillIcon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-400">{skill.percentage}%</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white font-display">{skill.category}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{skill.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {skill.items.map((item) => (
                        <span key={item} className="text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-300 font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-6">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}