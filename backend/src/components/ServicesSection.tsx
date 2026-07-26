import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Code, Palette, Network, Sparkles, CheckCircle2, ChevronRight, X, Cpu } from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  loading: boolean;
}

const getServiceIcon = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case 'video':
      return <Video className="w-5 h-5 text-indigo-400" />;
    case 'code':
      return <Code className="w-5 h-5 text-indigo-400" />;
    case 'palette':
      return <Palette className="w-5 h-5 text-indigo-400" />;
    case 'network':
      return <Network className="w-5 h-5 text-emerald-400" />;
    case 'sparkles':
    default:
      return <Sparkles className="w-5 h-5 text-indigo-400" />;
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, loading }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Dynamic Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Digital & AI Services
          </h2>
          <p className="text-base text-slate-400">
            From high-converting AI video advertisements to zero-trust enterprise network engineering, SHAMS STUDIO delivers end-to-end digital excellence.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-800/40 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div>
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50/10 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                      <div className="group-hover:text-white transition-colors">
                        {getServiceIcon(service.icon)}
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-semibold">
                      Service #0{index + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="text-xs font-semibold text-indigo-400 mt-1">
                      {service.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {service.highlights && service.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {service.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Trigger button */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies?.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50/10 text-indigo-300 border border-indigo-500/20 font-semibold"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/btn"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedService.title}</h3>
                  {selectedService.subtitle && (
                    <p className="text-xs font-semibold text-indigo-400">{selectedService.subtitle}</p>
                  )}
                </div>
              </div>

              {selectedService.image && (
                <div className="rounded-xl overflow-hidden h-48 border border-slate-800">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed">{selectedService.description}</p>

              <div>
                <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-3">
                  Key Service Deliverables & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.highlights?.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Technologies & Tools Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                >
                  Inquire About This Service
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
