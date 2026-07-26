import { Blog, BlogResponse, SingleBlogResponse } from '../types/blog';

const API_BASE = 'http://localhost:5000/api';

/**
 * Fetch blogs from backend API
 * @param limit - Optional limit for number of blogs to fetch
 * @param page - Optional page number for pagination
 * @param category - Optional category filter
 * @param search - Optional search query
 */
export async function fetchBlogs(
  limit?: number,
  page?: number,
  category?: string,
  search?: string
): Promise<Blog[]> {
  try {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (page) params.append('page', page.toString());
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    const queryString = params.toString();
    const url = `${API_BASE}/blogs${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data: BlogResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by ID
 * @param id - Blog post ID
 */
export async function fetchBlogById(id: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_BASE}/blogs/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.statusText}`);
    }

    const data: SingleBlogResponse = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function createBlog(blog: Partial<Blog>, token: string): Promise<Blog> {
  const response = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-auth-token': token
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error('Failed to create blog');
  }

  const data = await response.json();
  return data.data;
}

export async function updateBlog(id: string, blog: Partial<Blog>, token: string): Promise<Blog> {
  const response = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-auth-token': token
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error('Failed to update blog');
  }

  const data = await response.json();
  return data.data;
}

export async function deleteBlog(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-auth-token': token
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete blog');
  }
}
