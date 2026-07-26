export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor' | 'user';
  avatar?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface Service {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  image?: string;
  video?: string;
  highlights: string[];
  technologies: string[];
  createdAt?: string;
}

export interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  clientName?: string;
  featured?: boolean;
  createdAt?: string;
  views?: number;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  status?: 'published' | 'draft';
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  views?: number;
  likes?: number;
  readingTime?: number;
  featured?: boolean;
  scheduledAt?: string;
  seoScore?: number;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  read?: boolean;
  replyStatus?: 'pending' | 'in_progress' | 'replied';
  priority?: 'low' | 'medium' | 'high';
  starred?: boolean;
  archived?: boolean;
}

export interface MediaItem {
  id: string;
  url: string;
  filename: string;
  type: 'image' | 'video';
  uploadedAt: string;
  size?: string;
  folder?: string;
}

export interface WebsiteSettings {
  logo: string;
  companyName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socialLinks: {
    linkedin: string;
    github: string;
    youtube: string;
    twitter: string;
    instagram: string;
  };
  footer: string;
  seoTitle: string;
  seoDescription: string;
  maintenanceMode?: boolean;
  announcementBar?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  themeMode?: 'dark' | 'light';
  accentColor?: string;
  smtp?: {
    host: string;
    port: number;
    user: string;
    enabled: boolean;
  };
  robotsTxt?: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  category: 'security' | 'cms' | 'system' | 'auth';
}

export interface VisitorAnalytics {
  today: number;
  weekly: number;
  monthly: number;
  conversionRate: number;
  trafficSources: { name: string; percentage: number; count: number }[];
  mostVisitedBlog: string;
  mostVisitedPortfolio: string;
}

export interface ApiHealthResponse {
  status: string;
  service: string;
  timestamp: string;
  mongoConnected?: boolean;
  memoryUsage?: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
  };
}
