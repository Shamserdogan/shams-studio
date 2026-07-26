import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogById } from '../services/blogService';
import { Blog } from '../types/blog';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogById(id).then(setBlog);
    }
  }, [id]);

  if (!blog) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="pt-24 p-8 text-white max-w-4xl mx-auto">
      {(() => {
        const mediaUrl = blog.mainVideo || blog.mainImage || blog.previewVideo || blog.previewImage || blog.image;
        const isVideo = mediaUrl.endsWith('.mp4') || mediaUrl.includes('/video/');

        return (
          <div className="w-full aspect-[1/1] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10">
            {isVideo ? (
              <video src={mediaUrl} className="w-full h-full object-cover" controls muted autoPlay playsInline />
            ) : (
              <img src={mediaUrl} alt={blog.title} className="w-full h-full object-cover" />
            )}
          </div>
        );
      })()}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="mb-4 text-gray-400">{blog.category} | {new Date(blog.createdAt || '').toLocaleDateString()}</p>
      <div className="prose prose-invert">{blog.content}</div>
    </div>
  );
};

export default BlogDetail;
