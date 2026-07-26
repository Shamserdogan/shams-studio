import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, User as UserIcon, Tag, ArrowRight, X, Sparkles } from 'lucide-react';
import { Blog } from '../types';

interface BlogSectionProps {
  blogs: Blog[];
  loading: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs, loading }) => {
  const [readingBlog, setReadingBlog] = useState<Blog | null>(null);

  return (
    <section id="blog" className="py-24 bg-slate-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Studio Journal & Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Latest Industry Articles & Insights
          </h2>
          <p className="text-base text-slate-400">
            Insights on AI video synthesis, modern web platform architecture, scalable design systems, and network security.
          </p>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-slate-800/40 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
            <p className="text-sm">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={blog.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-950/90 backdrop-blur-md text-indigo-300 border border-indigo-800">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Header & Excerpt */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                        {blog.author}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                </div>

                {/* Read Article Trigger */}
                <div className="p-6 pt-0 border-t border-slate-900 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[10px] text-slate-400 font-mono font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setReadingBlog(blog)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {readingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto text-slate-200"
            >
              <button
                onClick={() => setReadingBlog(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950 text-indigo-300 text-xs font-semibold uppercase border border-indigo-800">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{readingBlog.category}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {readingBlog.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 border-b border-slate-800 pb-4">
                  <span>Author: {readingBlog.author}</span>
                  <span>•</span>
                  <span>
                    Published:{' '}
                    {new Date(readingBlog.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {readingBlog.image && (
                <div className="rounded-xl overflow-hidden h-64 border border-slate-800">
                  <img
                    src={readingBlog.image}
                    alt={readingBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
                {readingBlog.content}
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {readingBlog.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setReadingBlog(null)}
                  className="px-5 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 hover:bg-slate-800"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
