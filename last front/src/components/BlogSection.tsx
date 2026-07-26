import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight, Sparkles } from "lucide-react";
import { fetchBlogs } from "../services/blogService";
import { Blog } from "../types/blog";

interface BlogSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export default function BlogSection({ limit = 3, showTitle = true }: BlogSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      const data = await fetchBlogs(limit);
      setBlogs(data);
      setLoading(false);
    }
    loadBlogs();
  }, [limit]);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="relative py-16 sm:py-20 bg-[#020617]" id="blog-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center text-gray-500">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <section
      className="relative py-16 sm:py-20 bg-[#020617] border-t border-white/5"
      id="blog-section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">

        {/* Section Header */}
        {showTitle && (
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center gap-3 mb-4"
            >
              <span className="h-[1px] w-8 bg-cyan-400" />
              <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold font-display">
                Latest Insights
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-display"
            >
              From the Studio.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto"
            >
              Insights, updates, and deep dives into AI, web development, design systems, and digital innovation.
            </motion.p>
          </div>
        )}

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="blog-grid"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/5
                p-6 flex flex-col justify-between overflow-hidden
                transition-all duration-500
                hover:border-cyan-400/40
                hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]
                cursor-pointer"
            >
              {/* Category Badge */}
              <div className="mb-3 inline-flex px-3 py-1 rounded-md bg-slate-950/90 border border-cyan-400/30 text-[9px] font-mono tracking-widest font-bold text-cyan-400 uppercase backdrop-blur-md w-fit">
                {blog.category}
              </div>

              {/* Blog Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/5 mb-4 group-hover:border-white/10 transition-colors">
                <img
                  src={blog.previewImage || blog.mainImage || blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Blog Content */}
              <div className="space-y-3 flex-grow">
                <h3 className="text-xl font-bold text-white font-display tracking-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                  {blog.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
                {/* Date and Author */}
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(blog.createdAt)}</span>
                  <span className="text-gray-600">•</span>
                  <span>{blog.author}</span>
                </div>

                {/* Read More Button */}
                <Link
                  to={`/blog/${blog._id}`}
                  className="relative overflow-hidden flex items-center justify-between w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:-translate-y-1"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button (only show on homepage) */}
        {showTitle && blogs.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-sm transition-all duration-500 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] hover:-translate-y-1 group"
            >
              <span>View All Articles</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
