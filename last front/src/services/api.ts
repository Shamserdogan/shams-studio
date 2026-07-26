import { Blog, ContactMessage, PortfolioItem, Service, User } from '../types';

const API_BASE = 'http://localhost:5000/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('shams_jwt_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // --- AUTH ---
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }
    localStorage.setItem('shams_jwt_token', data.token);
    return data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Forgot password failed');
    return data;
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/reset-password/${token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Reset password failed');
    return data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Change password failed');
    return data;
  },

  async getMe(): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Auth check failed');
    }
    return data.user;
  },

  logout() {
    localStorage.removeItem('shams_jwt_token');
  },

  async updateProfile(data: { name?: string; email?: string; newPassword?: string; currentPassword?: string }): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || 'Failed to update profile');
    if (result.token) {
      localStorage.setItem('shams_jwt_token', result.token);
    }
    return result;
  },

  // --- HEALTH ---
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  },

  async getDashboardStats(): Promise<any> {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch dashboard stats');
    return data.data;
  },

  // --- BLOGS ---
  async getBlogs(): Promise<Blog[]> {
    const res = await fetch(`${API_BASE}/blogs`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch blogs');
    return data.data;
  },

  async getBlogById(id: string): Promise<Blog> {
    const res = await fetch(`${API_BASE}/blogs/${id}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch blog');
    return data.data;
  },

  async createBlog(blog: Partial<Blog>): Promise<Blog> {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(blog),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to create blog');
    return data.data;
  },

  async updateBlog(id: string, blog: Partial<Blog>): Promise<Blog> {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(blog),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update blog');
    return data.data;
  },

  async deleteBlog(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete blog');
  },

  // --- PORTFOLIO ---
  async getPortfolio(): Promise<PortfolioItem[]> {
    const res = await fetch(`${API_BASE}/portfolio`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch portfolio');
    return data.data;
  },

  async createPortfolio(item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const res = await fetch(`${API_BASE}/portfolio`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to create portfolio item');
    return data.data;
  },

  async updatePortfolio(id: string, item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    console.log('DEBUG: api.updatePortfolio sending payload:', JSON.stringify(item, null, 2));
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update portfolio item');
    return data.data;
  },

  async deletePortfolio(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete portfolio item');
  },

  // --- SERVICES ---
  async getServices(): Promise<Service[]> {
    const res = await fetch(`${API_BASE}/services`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch services');
    return data.data;
  },

  async createService(service: Partial<Service>): Promise<Service> {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(service),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to create service');
    return data.data;
  },

  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(service),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update service');
    return data.data;
  },

  async deleteService(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete service');
  },

  // --- CONTACT ---
  async submitContact(formData: { name: string; email: string; phone?: string; message: string }): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to send message');
    return data;
  },

  async getContacts(): Promise<ContactMessage[]> {
    const res = await fetch(`${API_BASE}/contact`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch contacts');
    return data.data;
  },

  async deleteContact(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete message');
  },

  // --- UPLOAD ---
  async uploadMedia(file: File): Promise<{ url: string; message?: string }> {
    const token = localStorage.getItem('shams_jwt_token');
    const formData = new FormData();
    formData.append('file', file);

    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Upload failed');
    return data;
  },
};
