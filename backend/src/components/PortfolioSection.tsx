import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Play, Layers, X, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
  loading: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio, loading }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeVideoModal, setActiveVideoModal] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'AI Video Ads',
    'Web Development',
    'UI/UX Design',
    'Enterprise Networking',
    'AI Content Creation',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter((item) => item.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="portfolio" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Selected Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Featured Portfolio & Case Studies
          </h2>
          <p className="text-base text-slate-400">
            Discover how SHAMS STUDIO merges creative vision with technical precision across global AI video campaigns, web platforms, and network systems.
          </p>
        </div>

        {/* Category Filter Pills - Sleek Interface Theme */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
            <p className="text-sm font-medium">No portfolio items found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 overflow-hidden flex flex-col transition-all duration-300 shadow-md hover:shadow-indigo-500/10"
                >
                  {/* Media Cover Container */}
                  <div className="relative h-52 overflow-hidden bg-slate-950">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-950/90 backdrop-blur-md text-indigo-300 border border-indigo-800">
                        {item.category}
                      </span>
                    </div>

                    {/* Play Video Trigger */}
                    {item.video && (
                      <button
                        onClick={() => setActiveVideoModal(item)}
                        className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity"
                        title="Watch Video Reel"
                      >
                        <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Technology Badges & Links */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {item.technologies?.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-semibold"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                            title="GitHub Source"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800 transition-colors"
                            title="Live Project"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Video Reel Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl"
            >
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>{activeVideoModal.title} — Video Showcase</span>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video bg-black flex items-center justify-center">
                {activeVideoModal.video ? (
                  <video
                    src={activeVideoModal.video}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <p className="text-slate-400 text-xs">No video URL available for preview.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
