import { Link } from "react-router-dom";
import { motion } from "motion/react";
import BlogSection from "../components/BlogSection";

export default function Blog() {
  return (
    <section
      className="relative pt-16 pb-20 sm:pt-20 sm:pb-24 bg-[#020617] overflow-hidden min-h-screen"
      id="blog-page"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[140px]" />

        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">

        {/* Back Home Button */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 shadow-sm hover:text-cyan-400 hover:border-cyan-400 transition-all"
          >
            ← Back Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-3 mb-2"
          >
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold font-display">
              Knowledge Base
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-display"
          >
            Blog & Insights.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-1 text-sm text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            Deep dives into AI technologies, web development workflows, design systems, and digital transformation strategies from SHAMS STUDIO.
          </motion.p>
        </div>

      </div>

      {/* Blog Section - Show All Posts */}
      <div className="-mt-8">
        <BlogSection limit={100} showTitle={false} />
      </div>
    </section>
  );
}
