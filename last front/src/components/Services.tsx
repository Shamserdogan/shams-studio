import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServiceModal from "./ServiceModal";
import { motion } from "motion/react";
import {
  Brain,
  Code,
  Palette,
  Network,
  Video,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { api } from "../services/api";
import { Service } from "../types";

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('ai')) return Brain;
    if (title.toLowerCase().includes('web')) return Code;
    if (title.toLowerCase().includes('design')) return Palette;
    if (title.toLowerCase().includes('network')) return Network;
    return Video;
  };

  return (
    <section 
      id="services" 
      className="relative min-h-screen py-24 sm:py-32 bg-[#030712] overflow-hidden border-b border-white/5"
    >
      {/* Background Lighting & Radial Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[-10%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[160px]" />
        
        {/* Subtle Horizontal grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:100%_4rem] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 lg:pt-5 w-full">
         <div className="mb-2 -ml-3 md:ml-0">
  <Link
    to="/"
    className="inline-flex items-center gap-0 px-1.5 py-1 md:gap-2 md:px-5 md:py-2 text-[10px] md:text-sm md:text-sm font-medium rounded-full bg-white md:bg-white/5 border border-gray-300 md:border-white/10 text-gray-900 md:text-gray-300 shadow-sm md:shadow-none hover:bg-gray-100 md:hover:text-cyan-400 md:hover:border-cyan-400 transition-all"
  >
    ← Back Home
  </Link>
</div>
        
        {/* Section Header */}
     <div 
  className="max-w-4xl mx-auto -mt-24 mb-2 text-center" 
  id="services-header"
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
              Capabilities
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display"
          >
            Premium Digital Solutions.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 text-lg text-gray-400 leading-relaxed font-sans max-w-3xl mx-auto"
          >
            SHAMS STUDIO merges state-of-the-art AI automation, bespoke full-stack engineering, and premium design standards to build the digital systems your business needs to excel.
          </motion.p>
        </div>

        {/* Services Grid (Modular Bento Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="services-grid-container">
          {loading ? (
            <p className="text-white text-center">Loading services...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : (
            services.map((service, idx) => {
              const IconComponent = getIcon(service.title);

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setSelectedService(service);
                    setIsModalOpen(true);
                  }}
                  className="relative rounded-2xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-xl flex flex-col justify-between group overflow-hidden shadow-2xl cursor-pointer"
                  id={`service-card-${service._id}`}
                >
                  {/* Service Image Preview */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-6">
                    {(service.mainVideo || service.previewVideo) ? (
                      <video
                        src={service.mainVideo || service.previewVideo}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={service.mainImage || service.previewImage || service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    )}
                  </div>
                  
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500/5 to-blue-500/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-20 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all">
                        <IconComponent className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="text-gray-600 group-hover:text-cyan-400 transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 uppercase">
                        {service.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed font-sans">
                      {service.description}
                    </p>

                    <hr className="border-white/5" />

                    <ul className="space-y-2.5">
                      {service.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400/80 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-20 pt-8 mt-6 border-t border-white/5 flex flex-wrap gap-1.5">
                    {service.technologies.map((t) => (
                      <span 
                        key={t} 
                        className="text-[9px] font-mono tracking-wider font-semibold uppercase px-2.5 py-1 rounded bg-slate-900 border border-white/5 text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
        
        {/* Call to Action Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl relative overflow-hidden"
          id="services-cta-banner"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h4 className="text-xl sm:text-2xl font-bold text-white font-display">Have a unique system architecture in mind?</h4>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              We specialize in custom integrations. Let's discuss your custom AI automations, complex web interfaces, or networking designs directly over a strategy call.
            </p>
          </div>

          <motion.a
            href="https://wa.me/923429225675"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap"
            id="services-cta-button"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

      </div>
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}
