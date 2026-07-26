import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Video,
  Code,
  Brain,
  Palette,
  Network,
  ArrowUpRight,
  FolderGit2
} from "lucide-react";
import { api } from "../services/api";
import { PortfolioItem } from "../types";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await api.getPortfolio();
        setProjects(data);
      } catch (err) {
        setError("Failed to load portfolio items.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categories = [
    { id: "all", name: "All Works", icon: FolderGit2 },
    { id: "video", name: "AI Video", icon: Video },
    { id: "web", name: "Web Dev", icon: Code },
    { id: "automation", name: "AI & Automation", icon: Brain },
    { id: "design", name: "Graphic Design", icon: Palette },
    { id: "networking", name: "Networking", icon: Network }
  ];

  const filteredProjects = activeTab === "all"
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-32 bg-[#020617] overflow-hidden border-b border-white/5"
    >
      {/* Visual Direction Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-purple-600/5 rounded-full blur-[140px]" />

        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-10 lg:px-12 w-full">

        {/* Back Home Button */}
       <div className="mt-2 md:mt-0">
  <Link
    to="/"
    className="inline-flex items-center gap-0 px-1 py-1 md:gap-2 md:px-5 md:py-2 text-[9px] md:text-sm font-medium rounded-full bg-white md:bg-white/5 border border-gray-300 md:border-white/10 text-gray-900 md:text-gray-300 shadow-sm md:shadow-none hover:bg-gray-100 md:hover:text-cyan-400 md:hover:border-cyan-400 transition-all"
  >
    ← Back Home
  </Link>
</div>

        {/* Header Block */}
        <div
          className="max-w-4xl mx-auto -mt-18 mb-0 text-center"
          id="portfolio-header"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold font-display">
              Works & Labs
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-display"
          >
            Bespoke Portfolios.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            Explore high-fidelity solutions created by Shams Ud Din at SHAMS STUDIO, bridging full-stack software development with artificial intelligence, design systems, and Cisco enterprise networks.
          </motion.p>
        </div>

        {/* Categories Tab Bar */}
        <div className="mt-0 mb-1 flex flex-wrap gap-2 border-b border-white/5 pb-2 overflow-x-auto scrollbar-none" id="portfolio-tabs">
          {categories.map((cat, idx) => {
            const CatIcon = cat.icon;
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${isSelected
                  ? "text-black z-10"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                id={`portfolio-tab-btn-${cat.id}`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <CatIcon className="w-4 h-4 shrink-0" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 -mt-4"
          id="portfolio-grid"
        >
          {loading ? (
            <p className="text-white">Loading projects...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10
  p-6 flex flex-col justify-between overflow-hidden
  transition-all duration-500
  hover:-translate-y-3
  hover:scale-[1.02]
  hover:border-cyan-400/40
  hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]`}
                  id={`project-card-${project._id}`}
                >
                  <div>
                    {/* Category Badge */}
                    <div className="mb-3 inline-flex px-3 py-1 rounded-md bg-slate-950/90 border border-cyan-400/30 text-[9px] font-mono tracking-widest font-bold text-cyan-400 uppercase backdrop-blur-md">
                      {project.category}
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/5 mb-6 group-hover:border-white/10 transition-colors">
                      {project.previewVideo ? (
                        <video
                          src={project.previewVideo}
                          className="w-full h-full object-cover relative z-10"
                          muted
                          autoPlay
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={project.previewImage}
                          alt={project.title}
                          className="w-full h-full object-cover relative z-10 transition-all duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>

                    {/* Project Copy */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white font-display tracking-tight group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer and Tags */}
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono font-semibold text-gray-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="relative overflow-hidden flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:-translate-y-1 cursor-pointer"
                      id={`project-btn-${project._id}`}
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Global Stats Matrix Banner */}
        <div
          className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-xl"
          id="portfolio-stats-grid"
        >
          <div className="space-y-1 text-center md:text-left">
            <span className="text-3xl font-extrabold text-white font-display tracking-tight block">15+</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block font-semibold">AI Video Ads Created</span>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="text-3xl font-extrabold text-cyan-400 font-display tracking-tight block">10+</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block font-semibold">React/Vite Interfaces</span>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="text-3xl font-extrabold text-white font-display tracking-tight block">30k+</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block font-semibold">Social Media Video Views</span>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="text-3xl font-extrabold text-cyan-400 font-display tracking-tight block">100%</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block font-semibold">SLA Client Retention</span>
          </div>
        </div>

      </div>


      {selectedProject && (
       <div
  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
  onClick={() => setSelectedProject(null)}
>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-7xl h-[90vh] bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-[0_0_80px_rgba(6,182,212,0.15)]"
          >

            {/* LEFT SIDE */}
            <div className="lg:w-1/2 w-full bg-black/40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 pointer-events-none"></div>

              {selectedProject.mainVideo ? (
                <video
                  src={selectedProject.mainVideo}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <img
                  src={selectedProject.mainImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                />
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className="lg:w-1/2 w-full overflow-y-auto p-8">

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-white hover:text-cyan-400 text-2xl"
              >
                ✕
              </button>

              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs uppercase tracking-wider">
                {selectedProject.category}
              </span>

              <h2 className="mt-5 text-4xl font-bold text-white">
                {selectedProject.title}
              </h2>

              <p className="mt-6 text-gray-300 leading-8">
                {selectedProject.description}
              </p>
              {/* Technologies */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Technologies Used
                </h3>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center justify-center w-full rounded-xl bg-cyan-600 hover:bg-cyan-700 transition-all py-4 text-white font-bold text-lg"
              >
                View Live Project
              </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
