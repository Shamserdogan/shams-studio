import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import toast, { Toaster } from 'react-hot-toast';
import slugify from 'slugify';
import { CMSMediaUploader } from './CMSMediaUploader';
import {
  X,
  Lock,
  Mail,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Upload,
  BookOpen,
  Briefcase,
  Cpu,
  MessageSquare,
  Database,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  ExternalLink,
  LogOut,
  Image as ImageIcon,
  LayoutDashboard,
  Settings as SettingsIcon,
  User as UserIcon,
  Search,
  Filter,
  Eye,
  EyeOff,
  Check,
  Star,
  Globe,
  Phone,
  Sparkles,
  Code,
  Video,
  Megaphone,
  Layers,
  Palette,
  Shield,
  Zap,
  Rocket,
  ChevronLeft,
  ChevronRight,
  FileText,
  Share2,
  Clock,
  CheckSquare,
  Download,
  Folder,
  FolderPlus,
  RefreshCw,
  HardDrive,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  FileSpreadsheet,
  Moon,
  Sun,
  Archive,
  Tag,
  Bold,
  Italic,
  List,
  Heading,
  Link as LinkIcon,
  Quote,
  Server,
  Key,
  Calendar,
  Heart,
  Sliders,
  Terminal,
} from 'lucide-react';
import { Blog, ContactMessage, PortfolioItem, Service, User, MediaItem, WebsiteSettings, AuditLogItem, VisitorAnalytics } from '../types';
import { api } from '../services/api';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
  refreshAllData: () => void;
  blogs: Blog[];
  portfolio: PortfolioItem[];
  services: Service[];
}

const DEFAULT_SETTINGS: WebsiteSettings = {
  logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
  companyName: 'SHAMS STUDIO',
  email: 'contact@shamsstudio.com',
  phone: '+1 (800) 555-0199',
  whatsapp: '+1 (800) 555-0199',
  address: 'San Francisco, CA & Global Digital Studio',
  socialLinks: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    youtube: 'https://youtube.com',
    twitter: 'https://x.com',
    instagram: 'https://instagram.com',
  },
  footer: '© 2026 SHAMS STUDIO. All rights reserved.',
  seoTitle: 'SHAMS STUDIO | Next-Gen AI & Full-Stack Development',
  seoDescription: 'Empowering brands with cutting-edge AI video ads, high-converting Web3 applications, and enterprise custom software.',
  maintenanceMode: false,
  announcementBar: {
    enabled: true,
    text: '🚀 Launching AI Video Generator 3.0 — Get Early Studio Access Today!',
    link: '#contact',
  },
  themeMode: 'dark',
  accentColor: '#06b6d4',
  smtp: {
    host: 'smtp.shamsstudio.com',
    port: 587,
    user: 'notifications@shamsstudio.com',
    enabled: true,
  },
  robotsTxt: `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://shamsstudio.com/sitemap.xml`,
};

const INITIAL_ANALYTICS: VisitorAnalytics = {
  today: 1482,
  weekly: 10840,
  monthly: 42910,
  conversionRate: 4.8,
  trafficSources: [
    { name: 'Direct Traffic', percentage: 42, count: 18022 },
    { name: 'Google Organic', percentage: 31, count: 13302 },
    { name: 'Social Media', percentage: 18, count: 7723 },
    { name: 'Referral Sites', percentage: 9, count: 3863 },
  ],
  mostVisitedBlog: 'The Future of Generative AI Video Ads in 2026',
  mostVisitedPortfolio: 'Cyberpunk Web3 Marketplace Platform',
};

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    action: 'Admin Session Login',
    user: 'Super Admin',
    timestamp: new Date().toISOString(),
    details: 'Authenticated via JWT token with full access permissions',
    category: 'auth',
  },
  {
    id: 'log-2',
    action: 'Blog Article Updated',
    user: 'Shams Admin',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'Published article "Generative AI Ads Blueprint"',
    category: 'cms',
  },
  {
    id: 'log-3',
    action: 'Security Policy Verified',
    user: 'System Shield',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    details: 'Helmet headers, Rate limiter, and XSS sanitization verified active',
    category: 'security',
  },
];

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
  refreshAllData,
  blogs,
  portfolio,
  services,
}) => {
  const { setUser } = useAuth();
  const [pendingUploads, setPendingUploads] = useState(0);
  const handleUploadStart = () => setPendingUploads(prev => prev + 1);
  const handleUploadEnd = () => setPendingUploads(prev => Math.max(0, prev - 1));

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'blogs' | 'portfolio' | 'services' | 'messages' | 'media' | 'settings' | 'seo' | 'backup' | 'security' | 'system' | 'profile'
  >('dashboard');

  // --- AUTHENTICATION STATE ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  // --- SYSTEM HEALTH ---

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setBlogFormData(prev => ({ ...prev, content: editor.getHTML() }));
    }
  });

  // --- SYSTEM HEALTH ---
  const [healthStatus, setHealthStatus] = useState<any>(null);

  // --- CONTACT MESSAGES STATE ---
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [messageSearch, setMessageSearch] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'read' | 'starred' | 'archived'>('all');
  const [replyStatuses, setReplyStatuses] = useState<Record<string, 'pending' | 'in_progress' | 'replied'>>({});
  const [priorities, setPriorities] = useState<Record<string, 'low' | 'medium' | 'high'>>({});
  const [starredMessages, setStarredMessages] = useState<Record<string, boolean>>({});
  const [archivedMessages, setArchivedMessages] = useState<Record<string, boolean>>({});

  // --- MEDIA LIBRARY STATE ---
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('shams_media_library');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [
      {
        id: 'm1',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        filename: 'ai_banner_hero.jpg',
        type: 'image',
        uploadedAt: new Date().toISOString(),
        size: '1.2 MB',
        folder: 'Hero Banners',
      },
      {
        id: 'm2',
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        filename: 'cyberpunk_tech.jpg',
        type: 'image',
        uploadedAt: new Date().toISOString(),
        size: '850 KB',
        folder: 'Portfolio Assets',
      },
    ];
  });
  const [activeMediaFolder, setActiveMediaFolder] = useState<string>('All');
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaSort, setMediaSort] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // --- WEBSITE SETTINGS STATE ---
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem('shams_site_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  // --- AUDIT LOGS & ANALYTICS ---
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [analytics, setAnalytics] = useState<VisitorAnalytics | null>(null);

  // --- PROFILE STATE ---
  const [profileName, setProfileName] = useState(user?.name || 'Shams Admin');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'admin@shamsstudio.com');
  const [profileRole, setProfileRole] = useState<'superadmin' | 'admin' | 'editor'>(user?.role === 'superadmin' || user?.role === 'editor' ? user.role : 'admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // --- CMS FILTERING & PAGINATION STATES ---
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [blogStatusFilter, setBlogStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState('all');

  const [serviceSearch, setServiceSearch] = useState('');

  // --- EDIT FORMS MODAL STATES ---
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    mainImage: '',
    mainVideo: '',
    previewImage: '',
    previewVideo: '',
    category: 'AI Video Ads',
    tags: 'AI, Video, Marketing',
    author: 'SHAMS STUDIO',
    status: 'published' as 'published' | 'draft',
    featured: false,
    scheduledAt: '',
    seoTitle: '',
    seoDescription: '',
  });

  // Auto-slug generator
  useEffect(() => {
    if (isBlogFormOpen) {
      setBlogFormData(prev => ({ ...prev, slug: slugify(prev.title, { lower: true, strict: true }) }));
    }
  }, [blogFormData.title, isBlogFormOpen]);

  const [isPortfolioFormOpen, setIsPortfolioFormOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [portfolioFormData, setPortfolioFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    technologies: 'React, TypeScript, Express',
    tags: '',
    image: '',
    video: '',
    mainImage: '',
    mainVideo: '',
    previewImage: '',
    previewVideo: '',
    liveUrl: '',
    githubUrl: '',
    clientName: '',
    featured: false,
  });

  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    icon: 'Sparkles',
    image: '',
    video: '',
    mainImage: '',
    mainVideo: '',
    previewImage: '',
    previewVideo: '',
    highlights: 'Feature 1, Feature 2',
    technologies: 'Tech 1, Tech 2',
  });

  // Action status toast
  const [actionStatus, setActionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Debugging: Log state changes
  useEffect(() => {
    console.log('DEBUG: Portfolio Form State updated:', JSON.stringify(portfolioFormData, null, 2));
  }, [portfolioFormData]);

  // Sync profile when user changes
  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfileEmail(user.email);
      if (user.role === 'superadmin' || user.role === 'editor') {
        setProfileRole(user.role);
      }
    }
  }, [user]);

  // Sync settings & media to local storage
  useEffect(() => {
    localStorage.setItem('shams_media_library', JSON.stringify(mediaList));
  }, [mediaList]);

  useEffect(() => {
    localStorage.setItem('shams_site_settings', JSON.stringify(settings));
  }, [settings]);

  // Load health & messages on open
  useEffect(() => {
    if (isOpen) {
      api.getHealth().then((res) => setHealthStatus(res)).catch(() => {});
      if (user) {
        fetchContacts();
        api.getDashboardStats().then((data) => setAnalytics(data)).catch(() => {});
      }
    }
  }, [isOpen, user]);

  const fetchContacts = async () => {
    try {
      console.log("DIAG: Fetching contacts...");
      const data = await api.getContacts();
      console.log("DIAG: Contacts fetched:", data);
      setContacts(data);
    } catch (err) {
      console.error("DIAG: Failed to fetch contacts:", err);
      // Ignored if not authorized
    }
  };

  // Helper log generator
  const addAuditLog = (action: string, details: string, category: 'security' | 'cms' | 'system' | 'auth' = 'cms') => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      action,
      user: user?.name || 'Admin',
      timestamp: new Date().toISOString(),
      details,
      category,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // --- AUTH HANDLERS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("LOGIN START");
    setAuthLoading(true);
    setAuthError('');

    try {
      const data = await api.login(email, password);
      console.log("LOGIN RESPONSE", data);
      
      console.log("TOKEN SAVED");
      
      // Update global auth state
      setUser(data.user);
      
      console.log("USER UPDATED");
      onLoginSuccess(data.user);
      fetchContacts();
      setActiveTab('dashboard');
      addAuditLog('Admin CMS Sign In', `User ${data.user.email} logged in with role ${data.user.role}`, 'auth');
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please verify admin credentials.');
      setAuthLoading(false); // Reset loading on error
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.forgotPassword(forgotPasswordEmail);
      toast.success('Password reset email sent');
      setIsForgotPasswordOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset email');
    }
  };

  // --- FILE UPLOADER FOR FORMS ---
  const handleInlineFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetFieldSetter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setActionStatus({ type: 'success', message: 'Uploading media asset...' });
      const res = await api.uploadMedia(file);
      console.log('DEBUG: Cloudinary upload response URL:', res.url); // LOG 1
      targetFieldSetter(res.url);
      // ... (rest of function)
      const newMedia: MediaItem = {
        id: `media_${Date.now()}`,
        url: res.url,
        filename: file.name,
        type: file.type.startsWith('video/') ? 'video' : 'image',
        uploadedAt: new Date().toISOString(),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        folder: activeMediaFolder === 'All' ? 'Portfolio Assets' : activeMediaFolder,
      };
      setMediaList((prev) => [newMedia, ...prev]);

      setActionStatus({ type: 'success', message: 'Media attached successfully!' });
      addAuditLog('Media File Uploaded', `File ${file.name} uploaded`, 'cms');
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Media upload failed' });
    }
  };

  // --- BLOG HANDLERS ---
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const words = blogFormData.content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(words / 200));

      const payload = {
        title: blogFormData.title,
        slug: blogFormData.slug || blogFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: blogFormData.description,
        content: blogFormData.content,
        image: blogFormData.image,
        mainImage: blogFormData.mainImage,
        mainVideo: blogFormData.mainVideo,
        previewImage: blogFormData.previewImage,
        previewVideo: blogFormData.previewVideo,
        category: blogFormData.category,
        tags: typeof blogFormData.tags === 'string' ? blogFormData.tags.split(',').map((t) => t.trim()) : blogFormData.tags,
        author: blogFormData.author,
        status: blogFormData.status,
        featured: blogFormData.featured,
        scheduledAt: blogFormData.scheduledAt,
        seoTitle: blogFormData.seoTitle,
        seoDescription: blogFormData.seoDescription,
        readingTime,
        seoScore: Math.min(100, (blogFormData.title.length > 10 ? 30 : 10) + (blogFormData.seoDescription ? 35 : 10) + (blogFormData.image ? 35 : 10)),
      };

      if (editingBlog) {
        await api.updateBlog(editingBlog._id, payload as any);
        setActionStatus({ type: 'success', message: 'Blog article updated successfully!' });
        addAuditLog('Blog Post Updated', `Updated "${blogFormData.title}"`);
      } else {
        await api.createBlog(payload as any);
        setActionStatus({ type: 'success', message: 'New blog post published!' });
        addAuditLog('New Blog Published', `Published "${blogFormData.title}"`);
      }
      setIsBlogFormOpen(false);
      setEditingBlog(null);
      refreshAllData();
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Failed to save blog' });
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog article?')) return;
    try {
      await api.deleteBlog(id);
      setActionStatus({ type: 'success', message: 'Blog article deleted!' });
      addAuditLog('Blog Article Deleted', `Removed blog ID ${id}`);
      refreshAllData();
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Failed to delete blog' });
    }
  };

  // --- PORTFOLIO HANDLERS ---
  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("DIAG: FORM SUBMITTED");
    console.log("DIAG: PortfolioFormData BEFORE Save:", JSON.stringify(portfolioFormData, null, 2));
    try {
      const payload = {
        title: portfolioFormData.title,
        description: portfolioFormData.description,
        category: portfolioFormData.category,
        technologies:
          typeof portfolioFormData.technologies === 'string'
            ? portfolioFormData.technologies.split(',').map((t) => t.trim())
            : portfolioFormData.technologies,
        tags:
          typeof portfolioFormData.tags === 'string'
            ? portfolioFormData.tags.split(',').map((t) => t.trim())
            : portfolioFormData.tags,
        image: portfolioFormData.image,
        video: portfolioFormData.video,
        mainImage: portfolioFormData.mainImage,
        mainVideo: portfolioFormData.mainVideo,
        previewImage: portfolioFormData.previewImage,
        previewVideo: portfolioFormData.previewVideo,
        liveUrl: portfolioFormData.liveUrl,
        githubUrl: portfolioFormData.githubUrl,
        clientName: portfolioFormData.clientName,
        featured: portfolioFormData.featured
      };
      
      console.log("DIAG: FINAL MEDIA PAYLOAD:", JSON.stringify(payload, null, 2));
      
      let response;
      if (editingPortfolio) {
        response = await api.updatePortfolio(editingPortfolio._id, payload as any);
        console.log("DIAG: SAVED RESPONSE:", JSON.stringify(response, null, 2));
        setActionStatus({ type: 'success', message: 'Portfolio project updated!' });
        addAuditLog('Portfolio Item Updated', `Updated "${portfolioFormData.title}"`);
      } else {
        response = await api.createPortfolio(payload as any);
        console.log("DIAG: CREATED RESPONSE:", JSON.stringify(response, null, 2));
        setActionStatus({ type: 'success', message: 'New portfolio item created!' });
        addAuditLog('New Portfolio Created', `Added "${portfolioFormData.title}"`);
      }
      setIsPortfolioFormOpen(false);
      setEditingPortfolio(null);
      refreshAllData();
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Failed to save project' });
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deletePortfolio(id);
      setActionStatus({ type: 'success', message: 'Portfolio project deleted!' });
      addAuditLog('Portfolio Deleted', `Deleted portfolio ID ${id}`);
      refreshAllData();
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Failed to delete item' });
    }
  };

  // --- SERVICE HANDLERS ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: serviceFormData.title,
        subtitle: serviceFormData.subtitle,
        description: serviceFormData.description,
        icon: serviceFormData.icon,
        image: serviceFormData.image,
        video: serviceFormData.video,
        mainImage: serviceFormData.mainImage,
        mainVideo: serviceFormData.mainVideo,
        previewImage: serviceFormData.previewImage,
        previewVideo: serviceFormData.previewVideo,
        highlights:
          typeof serviceFormData.highlights === 'string'
            ? serviceFormData.highlights.split(',').map((h) => h.trim())
            : serviceFormData.highlights,
        technologies:
          typeof serviceFormData.technologies === 'string'
            ? serviceFormData.technologies.split(',').map((t) => t.trim())
            : serviceFormData.technologies,
      };

      if (editingService) {
        await api.updateService(editingService._id, payload as any);
        setActionStatus({ type: 'success', message: 'Service updated successfully!' });
      } else {
        await api.createService(payload as any);
        setActionStatus({ type: 'success', message: 'New service created!' });
      }
      setIsServiceFormOpen(false);
      setEditingService(null);
      refreshAllData();
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Failed to save service' });
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.deleteService(id);
      setActionStatus({ type: 'success', message: 'Service removed!' });
      refreshAllData();
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Failed to delete service' });
    }
  };

  // --- CONTACT CRM HANDLERS ---
  const handleDeleteContact = async (id: string) => {
    if (!confirm('Delete this inquiry message?')) return;
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selectedContact?._id === id) setSelectedContact(null);
      setActionStatus({ type: 'success', message: 'Inquiry message removed!' });
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Failed to delete inquiry' });
    }
  };

  const exportContactsCSV = () => {
    const csvRows = [
      ['Name', 'Email', 'Phone', 'Message', 'Date', 'Reply Status', 'Priority'],
      ...contacts.map((c) => [
        `"${c.name}"`,
        `"${c.email}"`,
        `"${c.phone || ''}"`,
        `"${c.message.replace(/"/g, '""')}"`,
        `"${new Date(c.createdAt).toLocaleDateString()}"`,
        `"${replyStatuses[c._id] || 'pending'}"`,
        `"${priorities[c._id] || 'medium'}"`,
      ]),
    ];
    const blob = new Blob([csvRows.map((e) => e.join(',')).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SHAMS_Studio_Contacts_Export.csv';
    a.click();
    setActionStatus({ type: 'success', message: 'Contacts CSV exported successfully!' });
  };

  // --- MEDIA UPLOAD HANDLER ---
  const handleFileUpload = async (file: File, onUploaded: (url: string) => void) => {
    setPendingUploads(prev => prev + 1);
    setActionStatus({ type: 'success', message: 'Uploading...' });
    try {
      const res = await api.uploadMedia(file);
      onUploaded(res.url);
      setActionStatus({ type: 'success', message: 'Upload successful!' });
    } catch (err: any) {
      setActionStatus({ type: 'error', message: err.message || 'Upload failed' });
    } finally {
      setPendingUploads(prev => Math.max(0, prev - 1));
    }
  };

  const handleBulkDeleteMedia = () => {
    if (selectedMediaIds.length === 0) return;
    if (!confirm(`Delete ${selectedMediaIds.length} selected media files?`)) return;
    setMediaList((prev) => prev.filter((m) => !selectedMediaIds.includes(m.id)));
    setSelectedMediaIds([]);
    setActionStatus({ type: 'success', message: 'Selected media assets deleted!' });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDropMedia = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files) as File[];
    if (files.length === 0) return;

    setActionStatus({ type: 'success', message: `Uploading ${files.length} file(s)...` });
    for (const file of files) {
      try {
        const res = await api.uploadMedia(file);
        const newMedia: MediaItem = {
          id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          url: res.url,
          filename: file.name,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          uploadedAt: new Date().toISOString(),
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          folder: activeMediaFolder === 'All' ? 'General Assets' : activeMediaFolder,
        };
        setMediaList((prev) => [newMedia, ...prev]);
      } catch (err) {
        // Continue
      }
    }
    setActionStatus({ type: 'success', message: 'Bulk media drop completed!' });
  };

  // --- BACKUP & RESTORE HANDLERS ---
  const handleExportFullDatabase = () => {
    const fullBackup = {
      timestamp: new Date().toISOString(),
      version: '2.0-Enterprise',
      settings,
      blogs,
      portfolio,
      services,
      contacts,
      mediaList,
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SHAMS_Studio_Full_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setActionStatus({ type: 'success', message: 'Full database backup JSON downloaded!' });
    addAuditLog('Database Backup Downloaded', 'Full JSON backup export executed', 'system');
  };

  const handleImportDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.settings) setSettings(data.settings);
        if (data.mediaList) setMediaList(data.mediaList);
        setActionStatus({ type: 'success', message: 'Backup imported and restored successfully!' });
        addAuditLog('Database Backup Restored', `Restored from file ${file.name}`, 'system');
      } catch (err) {
        setActionStatus({ type: 'error', message: 'Invalid backup JSON file format' });
      }
    };
    reader.readAsText(file);
  };

  // --- PROFILE SAVE ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileSaving(true);
    try {
      const res = await api.updateProfile({
        name: profileName,
        email: profileEmail,
      });
      onLoginSuccess({ ...res.user, role: profileRole });
      setProfileMsg({ type: 'success', text: 'Profile updated!' });
      addAuditLog('Admin Profile Updated', `User profile updated`, 'auth');
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    if (newPassword !== confirmPassword) {
      setProfileMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
        setProfileMsg({ type: 'error', text: 'New password must be at least 8 characters.' });
        return;
    }
    setProfileSaving(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      setProfileMsg({ type: 'success', text: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      addAuditLog('Admin Password Changed', 'User password updated', 'auth');
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message || 'Failed to update password' });
    } finally {
      setProfileSaving(false);
    }
  };

  // Permissions helper
  const role = user?.role || 'admin';
  const isSuperAdmin = role === 'superadmin';
  const isAdminOrBetter = role === 'superadmin' || role === 'admin';

  // --- FILTERED COMPUTATIONS ---
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
        b.description.toLowerCase().includes(blogSearch.toLowerCase()) ||
        b.category.toLowerCase().includes(blogSearch.toLowerCase());
      const matchesCategory = blogCategoryFilter === 'all' || b.category.toLowerCase() === blogCategoryFilter.toLowerCase();
      const matchesStatus = blogStatusFilter === 'all' || (b.status || 'published') === blogStatusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, blogSearch, blogCategoryFilter, blogStatusFilter]);

  const blogCategories = useMemo(() => {
    return Array.from(new Set(blogs.map((b) => b.category)));
  }, [blogs]);

  const filteredPortfolio = useMemo(() => {
    return portfolio.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(portfolioSearch.toLowerCase());
      const matchesCategory = portfolioCategoryFilter === 'all' || p.category.toLowerCase() === portfolioCategoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [portfolio, portfolioSearch, portfolioCategoryFilter]);

  const portfolioCategories = useMemo(() => {
    return Array.from(new Set(portfolio.map((p) => p.category)));
  }, [portfolio]);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      return (
        s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        (s.subtitle && s.subtitle.toLowerCase().includes(serviceSearch.toLowerCase())) ||
        s.description.toLowerCase().includes(serviceSearch.toLowerCase())
      );
    });
  }, [services, serviceSearch]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const isStarred = !!starredMessages[c._id];
      const isArchived = !!archivedMessages[c._id];

      if (messageFilter === 'starred') return isStarred;
      if (messageFilter === 'archived') return isArchived;
      if (isArchived) return false; // hide archived by default

      const matchesSearch =
        c.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
        c.message.toLowerCase().includes(messageSearch.toLowerCase());
      return matchesSearch;
    });
  }, [contacts, messageSearch, messageFilter, starredMessages, archivedMessages]);

  const mediaFolders = ['All', 'Hero Banners', 'Portfolio Assets', 'Service Icons', 'Blog Covers'];

  const filteredMedia = useMemo(() => {
    return mediaList.filter((m) => {
      const matchesFolder = activeMediaFolder === 'All' || m.folder === activeMediaFolder;
      const matchesSearch = m.filename.toLowerCase().includes(mediaSearch.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [mediaList, activeMediaFolder, mediaSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-7xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col h-[93vh] max-h-[920px] overflow-hidden"
      >
        {/* --- HEADER TOPBAR --- */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black tracking-wide text-white uppercase">{settings.companyName} Enterprise CMS</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 font-mono border border-indigo-800">
                  v2.5 Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Active Role: <span className="text-cyan-400 font-bold uppercase">{user?.role || 'Admin'}</span> • REST + JWT Secured
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Database Health Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
              <Database className={`w-3.5 h-3.5 ${healthStatus?.mongoConnected ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
              <span>{healthStatus?.mongoConnected ? 'MongoDB Atlas' : 'In-Memory Store'}</span>
            </div>

            {user && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 hover:bg-rose-900 hover:text-white transition-all font-semibold"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- GLOBAL ACTION STATUS TOAST --- */}
        <AnimatePresence>
          {actionStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`px-5 py-2 text-xs font-semibold flex items-center justify-between border-b ${
                actionStatus.type === 'success'
                  ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-800/80 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {actionStatus.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                <span>{actionStatus.message}</span>
              </div>
              <button onClick={() => setActionStatus(null)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- MAIN CONTENT / LOGIN GATE --- */}
        {!user ? (
          /* --- LOGIN VIEW --- */
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/50 overflow-y-auto">
            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl space-y-6 text-slate-200">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400 mx-auto shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-white">Enterprise CMS Portal</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter credentials to access full CMS management controls.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button type="button" onClick={() => setIsForgotPasswordOpen(true)} className="text-cyan-400 hover:text-cyan-300">Forgot Password?</button>
                  <span className="text-cyan-400 font-mono text-[11px]">JWT Auth Ready</span>
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating JWT...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Sign In To Enterprise CMS</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* --- AUTHENTICATED ENTERPRISE CMS LAYOUT --- */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* --- SIDEBAR NAVIGATION --- */}
            <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 shrink-0 p-3 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto">
              <nav className="flex md:flex-col gap-1 w-full">
                {[
                  { id: 'dashboard', label: 'Dashboard & Analytics', icon: LayoutDashboard, allow: true },
                  { id: 'blogs', label: 'Blogs CMS', icon: BookOpen, count: blogs.length, allow: true },
                  { id: 'portfolio', label: 'Portfolio CMS', icon: Briefcase, count: portfolio.length, allow: true },
                  { id: 'services', label: 'Services CMS', icon: Cpu, count: services.length, allow: isAdminOrBetter },
                  { id: 'messages', label: 'Contact CRM', icon: MessageSquare, count: contacts.length, allow: isAdminOrBetter },
                  { id: 'media', label: 'Media Library', icon: ImageIcon, count: mediaList.length, allow: isAdminOrBetter },
                  { id: 'seo', label: 'SEO Manager', icon: Globe, allow: isAdminOrBetter },
                  { id: 'settings', label: 'Site Settings', icon: SettingsIcon, allow: isAdminOrBetter },
                  { id: 'backup', label: 'Backup & Restore', icon: HardDrive, allow: isSuperAdmin },
                  { id: 'security', label: 'Security & Logs', icon: Shield, allow: isSuperAdmin },
                  { id: 'system', label: 'System Diagnostics', icon: Server, allow: isSuperAdmin },
                  { id: 'profile', label: 'Admin Profile', icon: UserIcon, allow: true },
                ]
                  .filter((item) => item.allow)
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>

                        {item.count !== undefined ? (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                              isActive ? 'bg-slate-950/20 text-slate-900 font-bold' : 'bg-slate-900 text-slate-400'
                            }`}
                          >
                            {item.count}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
              </nav>

              {/* Active Role Card */}
              <div className="hidden md:block pt-3 border-t border-slate-900">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{user.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{user.email}</p>
                </div>
              </div>
            </aside>

            {/* --- MAIN WORKSPACE AREA --- */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 bg-slate-900/40">
              {/* ========================================================================= */}
              {/* 1. DASHBOARD & VISITOR ANALYTICS TAB */}
              {/* ========================================================================= */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Banner */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-white">Studio Analytics Dashboard</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                          Live Local Tracker
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Private visitor analytics, content engagement metrics, and contact lead conversion rate.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingBlog(null);
                        setBlogFormData({
                          title: '',
                          slug: '',
                          description: '',
                          content: '',
                          image: '',
                          category: 'AI Video Ads',
                          tags: 'AI, Video',
                          author: 'SHAMS STUDIO',
                          status: 'published',
                          featured: false,
                          scheduledAt: '',
                          seoTitle: '',
                          seoDescription: '',
                        });
                        setIsBlogFormOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-md shadow-cyan-500/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Post New Article</span>
                    </button>
                  </div>

                  {/* 4 Visitor Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-semibold">Today's Visitors</span>
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-black text-white">{analytics?.today?.toLocaleString() ?? '...'}</div>
                      <p className="text-[10px] text-emerald-400 font-mono">+14% vs yesterday</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-semibold">Weekly Visitors</span>
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-2xl font-black text-white">{analytics?.weekly?.toLocaleString() ?? '...'}</div>
                      <p className="text-[10px] text-cyan-300 font-mono">7 Days Active Traffic</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-semibold">Monthly Visitors</span>
                        <Activity className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="text-2xl font-black text-white">{analytics?.monthly?.toLocaleString() ?? '...'}</div>
                      <p className="text-[10px] text-indigo-300 font-mono">30 Days Total Visits</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-semibold">Contact Conversion Rate</span>
                        <Zap className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-black text-white">{analytics?.conversionRate != null ? `${analytics.conversionRate}%` : '...'}</div>
                      <p className="text-[10px] text-amber-300 font-mono">{contacts.length} Form Inquiries</p>
                    </div>
                  </div>

                  {/* Traffic Sources & Top Visited */}
                  {analytics && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Traffic Sources Breakdown */}
                      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
                          <PieChart className="w-4 h-4 text-cyan-400" />
                          <span>Traffic Acquisition Sources</span>
                        </h4>

                        <div className="space-y-3">
                          {(analytics?.trafficSources ?? []).map((src) => (
                            <div key={src.name} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-300 font-semibold">{src.name}</span>
                                <span className="text-slate-400 font-mono">
                                  {src.percentage}% ({src.count.toLocaleString()})
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500" style={{ width: `${src.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Content Breakdown */}
                      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
                          <Star className="w-4 h-4 text-amber-400" />
                          <span>Most Visited Studio Content</span>
                        </h4>

                        <div className="space-y-3">
                          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-[10px] text-cyan-400 font-mono uppercase font-bold">Top Performing Blog</div>
                            <div className="text-xs font-bold text-white">{analytics?.mostVisitedBlog ?? 'N/A'}</div>
                            <div className="text-[11px] text-slate-400">1,840 views • 142 likes</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-[10px] text-indigo-400 font-mono uppercase font-bold">Top Portfolio Case Study</div>
                            <div className="text-xs font-bold text-white">{analytics?.mostVisitedPortfolio ?? 'N/A'}</div>
                            <div className="text-[11px] text-slate-400">2,310 views • Client Showcase</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* 2. BLOGS CMS TAB */}
              {/* ========================================================================= */}
              {activeTab === 'blogs' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white">Blog CMS Articles ({filteredBlogs.length})</h3>
                      <p className="text-xs text-slate-400">Rich text articles, draft saving, reading time, and SEO score.</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingBlog(null);
                        setBlogFormData({
                          title: '',
                          slug: '',
                          description: '',
                          content: '',
                          image: '',
                          category: 'AI Video Ads',
                          tags: 'AI, Video',
                          author: 'SHAMS STUDIO',
                          status: 'published',
                          featured: false,
                          scheduledAt: '',
                          seoTitle: '',
                          seoDescription: '',
                        });
                        setIsBlogFormOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-md shadow-cyan-500/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Blog Article</span>
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                      <input
                        type="text"
                        value={blogSearch}
                        onChange={(e) => setBlogSearch(e.target.value)}
                        placeholder="Search articles by title or tag..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <select
                      value={blogCategoryFilter}
                      onChange={(e) => setBlogCategoryFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <option value="all">All Categories</option>
                      {blogCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>

                    <select
                      value={blogStatusFilter}
                      onChange={(e) => setBlogStatusFilter(e.target.value as any)}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Drafts</option>
                    </select>
                  </div>

                  {/* Blog Table / Grid */}
                  <div className="space-y-3">
                    {filteredBlogs.map((b) => (
                      <div
                        key={b._id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {b.image ? (
                            <img src={b.image} alt={b.title} className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-900 border border-slate-800" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                              <BookOpen className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white truncate">{b.title}</h4>
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase ${
                                  b.status === 'draft' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                }`}
                              >
                                {b.status || 'published'}
                              </span>
                              {b.featured && <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Featured</span>}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{b.description}</p>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                              <span>Cat: {b.category}</span>
                              <span>• {b.readingTime || 3} min read</span>
                              <span>• SEO Score: {b.seoScore || 85}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingBlog(b);
                              setBlogFormData({
                                title: b.title,
                                slug: b.slug || '',
                                description: b.description,
                                content: b.content,
                                image: b.image || '',
                                mainImage: b.mainImage || '',
                                mainVideo: b.mainVideo || '',
                                previewImage: b.previewImage || '',
                                previewVideo: b.previewVideo || '',
                                category: b.category,
                                tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags || '',
                                author: b.author,
                                status: b.status || 'published',
                                featured: !!b.featured,
                                scheduledAt: b.scheduledAt || '',
                                seoTitle: b.seoTitle || '',
                                seoDescription: b.seoDescription || '',
                              });
                              setIsBlogFormOpen(true);
                            }}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteBlog(b._id)}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 3. PORTFOLIO CMS TAB */}
              {/* ========================================================================= */}
              {activeTab === 'portfolio' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white">Portfolio Projects ({filteredPortfolio.length})</h3>
                      <p className="text-xs text-slate-400">Manage studio showcases, client case studies, and live links.</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingPortfolio(null);
                        setPortfolioFormData({
                          title: '',
                          description: '',
                          category: 'Web Development',
                          technologies: 'React, TypeScript',
                          image: '',
                          video: '',
                          liveUrl: '',
                          githubUrl: '',
                          clientName: '',
                          featured: false,
                        });
                        setIsPortfolioFormOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-md shadow-cyan-500/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Portfolio Project</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPortfolio.map((p) => (
                      <div key={p._id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                        <img src={p.image} alt={p.title} className="w-full h-36 rounded-xl object-cover border border-slate-800" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{p.title}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{p.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                          <span className="text-[10px] font-mono text-cyan-400">{p.category}</span>
                          <div className="flex gap-2">
                            <button
                            onClick={() => {
                              console.log('DIAG: Edit Portfolio Item Loaded:', JSON.stringify(p, null, 2));
                              setEditingPortfolio(p);
                              const formData = {
                                title: p.title,
                                description: p.description,
                                category: p.category,
                                technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies || '',
                                tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
                                image: p.image || '',
                                video: p.video || '',
                                mainImage: p.mainImage || '',
                                mainVideo: p.mainVideo || '',
                                previewImage: p.previewImage || '',
                                previewVideo: p.previewVideo || '',
                                liveUrl: p.liveUrl || '',
                                githubUrl: p.githubUrl || '',
                                clientName: p.clientName || '',
                                featured: !!p.featured,
                              };
                              console.log('DIAG: Setting Portfolio Form Data:', JSON.stringify(formData, null, 2));
                              setPortfolioFormData(formData);
                              setIsPortfolioFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePortfolio(p._id)}
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 4. SERVICES CMS TAB */}
              {/* ========================================================================= */}
              {activeTab === 'services' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white">Studio Services ({services.length})</h3>
                      <p className="text-xs text-slate-400">Configure core agency capabilities, highlights, and icons.</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingService(null);
                        setServiceFormData({
                          title: '',
                          subtitle: '',
                          description: '',
                          icon: 'Sparkles',
                          image: '',
                          video: '',
                          highlights: 'Feature 1, Feature 2',
                          technologies: 'Tech 1',
                        });
                        setIsServiceFormOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Service</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredServices.map((s) => (
                      <div key={s._id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white">{s.title}</h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingService(s);
                                setServiceFormData({
                                  title: s.title,
                                  subtitle: s.subtitle || '',
                                  description: s.description,
                                  icon: s.icon || 'Sparkles',
                                  image: s.image || '',
                                  video: s.video || '',
                                  mainImage: s.mainImage || '',
                                  mainVideo: s.mainVideo || '',
                                  previewImage: s.previewImage || '',
                                  previewVideo: s.previewVideo || '',
                                  highlights: Array.isArray(s.highlights) ? s.highlights.join(', ') : s.highlights || '',
                                  technologies: Array.isArray(s.technologies) ? s.technologies.join(', ') : s.technologies || '',
                                  });
                                setIsServiceFormOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteService(s._id)} className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-rose-400">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 5. CONTACT CRM TAB */}
              {/* ========================================================================= */}
              {activeTab === 'messages' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white">Contact CRM & Inquiries ({contacts.length})</h3>
                      <p className="text-xs text-slate-400">Manage client inquiry statuses, priority levels, and CSV exports.</p>
                    </div>

                    <button
                      onClick={exportContactsCSV}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 text-xs font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  <div className="flex gap-2 text-xs">
                    {(['all', 'unread', 'read', 'starred', 'archived'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setMessageFilter(filter)}
                        className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
                          messageFilter === filter ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Contacts List */}
                    <div className="lg:col-span-1 space-y-3">
                      {filteredContacts.map((c) => (
                        <div
                          key={c._id}
                          onClick={() => setSelectedContact(c)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                            selectedContact?._id === c._id ? 'bg-slate-900 border-cyan-500/80 shadow-md' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{c.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{new Date(c.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-1">{c.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Contact Detail Card */}
                    <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-5">
                      {selectedContact ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                            <div>
                              <h4 className="text-sm font-bold text-white">{selectedContact.name}</h4>
                              <p className="text-xs text-cyan-400 font-mono">{selectedContact.email}</p>
                            </div>
                            <button onClick={() => handleDeleteContact(selectedContact._id)} className="p-2 rounded-xl bg-slate-900 text-rose-400 hover:bg-rose-950">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                            {selectedContact.message}
                          </div>
                        </div>
                      ) : (
                        <div className="p-12 text-center text-xs text-slate-500">Select an inquiry from the list to view details.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 6. MEDIA LIBRARY TAB */}
              {/* ========================================================================= */}
              {activeTab === 'media' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white">Media Library ({mediaList.length})</h3>
                      <p className="text-xs text-slate-400">Drag & drop files, manage folders, and copy direct media URLs.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedMediaIds.length > 0 && (
                        <button onClick={handleBulkDeleteMedia} className="px-3 py-1.5 rounded-xl bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold">
                          Delete Selected ({selectedMediaIds.length})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Drag & Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDropMedia}
                    className={`p-6 rounded-2xl border-2 border-dashed transition-colors text-center ${
                      isDragOver ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 bg-slate-950/50'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-200">Drag and drop images or video files here</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Supports PNG, JPG, WEBP, MP4 files up to 50MB</p>
                  </div>

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredMedia.map((m) => (
                      <div key={m.id} className="group relative p-2 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition-all space-y-2">
                        <img src={m.url} alt={m.filename} className="w-full h-28 rounded-xl object-cover border border-slate-900" />
                        <div className="truncate text-[10px] font-mono text-slate-300 px-1">{m.filename}</div>
                        <div className="flex items-center justify-between px-1">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(m.url);
                              setActionStatus({ type: 'success', message: 'Media URL copied!' });
                            }}
                            className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Copy URL
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 7. SEO MANAGER TAB */}
              {/* ========================================================================= */}
              {activeTab === 'seo' && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>SEO Manager & Meta Tags</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Global SEO Title</label>
                        <input
                          type="text"
                          value={settings.seoTitle}
                          onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Global Meta Description</label>
                        <textarea
                          rows={3}
                          value={settings.seoDescription}
                          onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Robots.txt Content</label>
                        <textarea
                          rows={4}
                          value={settings.robotsTxt || DEFAULT_SETTINGS.robotsTxt}
                          onChange={(e) => setSettings({ ...settings, robotsTxt: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 8. SITE SETTINGS TAB */}
              {/* ========================================================================= */}
              {activeTab === 'settings' && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <SettingsIcon className="w-4 h-4 text-cyan-400" />
                      <span>Studio Settings & Announcement Bar</span>
                    </h3>

                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <div>
                          <div className="font-bold text-white">Maintenance Mode</div>
                          <div className="text-[10px] text-slate-400">Display maintenance banner to visitors</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={!!settings.maintenanceMode}
                          onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                          className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                        <input
                          type="text"
                          value={settings.companyName}
                          onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 9. BACKUP & RESTORE TAB */}
              {/* ========================================================================= */}
              {activeTab === 'backup' && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-cyan-400" />
                      <span>Database Backup & Restore</span>
                    </h3>

                    <p className="text-xs text-slate-400">
                      Export your complete studio database as a JSON backup or restore from a previous JSON export.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={handleExportFullDatabase}
                        className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Complete Backup</span>
                      </button>

                      <label className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white text-xs font-bold cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4 text-indigo-400" />
                        <span>Restore From JSON</span>
                        <input type="file" accept=".json" onChange={handleImportDatabase} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 10. SECURITY & AUDIT LOGS TAB */}
              {/* ========================================================================= */}
              {activeTab === 'security' && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>Security Shields & Audit Logs</span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        'Helmet Headers',
                        'Rate Limiting',
                        'XSS Shield',
                        'CSRF Protection',
                      ].map((item) => (
                        <div key={item} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-300">Live Security Audit Logs</h4>
                      <div className="space-y-2">
                        {auditLogs.map((log) => (
                          <div key={log.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                            <div className="flex justify-between text-cyan-400">
                              <span>[{log.category.toUpperCase()}] {log.action}</span>
                              <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-slate-300 text-[11px]">{log.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 11. SYSTEM DIAGNOSTICS TAB */}
              {/* ========================================================================= */}
              {activeTab === 'system' && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Server className="w-4 h-4 text-cyan-400" />
                      <span>System Health & Memory Status</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400">Uptime</div>
                        <div className="text-lg font-bold text-emerald-400">99.98%</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400">Response Latency</div>
                        <div className="text-lg font-bold text-cyan-400">18 ms</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-slate-400">Memory RSS</div>
                        <div className="text-lg font-bold text-indigo-400">42.5 MB</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 12. ADMIN PROFILE TAB */}
              {/* ========================================================================= */}
              {activeTab === 'profile' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white">Admin Profile & Role Manager</h3>

                  {profileMsg && (
                    <div className={`p-3 rounded-xl text-xs ${profileMsg.type === 'success' ? 'bg-emerald-950 text-emerald-200' : 'bg-rose-950 text-rose-200'}`}>
                      {profileMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Name</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Email</label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Role Permission Level</label>
                      <select
                        value={profileRole}
                        onChange={(e) => setProfileRole(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-bold"
                      >
                        <option value="superadmin">Super Admin (Full Access)</option>
                        <option value="admin">Admin (CMS & CRM)</option>
                        <option value="editor">Editor (Blogs & Portfolio Only)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                    >
                      Save Profile & Role
                    </button>
                    </form>

                    <form onSubmit={handlePasswordChange} className="space-y-4 text-xs mt-8 pt-6 border-t border-slate-800">
                    <h4 className="text-sm font-bold text-white">Change Password</h4>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Current Password</label>
                      <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100" />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">New Password</label>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100" />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Confirm New Password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100" />
                    </div>
                    <button type="submit" disabled={profileSaving} className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500">
                      Update Password
                    </button>
                    </form>

                </div>
              )}
            </main>
          </div>
        )}
      </motion.div>

      {/* --- EDIT BLOG MODAL --- */}
      {isBlogFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[90vh] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-sm font-bold text-white">{editingBlog ? 'Edit Article' : 'Create New Article'}</h3>
              <button onClick={() => setIsBlogFormOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              <form id="blog-form" onSubmit={handleSaveBlog} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Text Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={blogFormData.title}
                        onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Description</label>
                      <textarea
                        required
                        rows={3}
                        value={blogFormData.description}
                        onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Content</label>
                      <textarea
                        required
                        rows={6}
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-[11px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Category</label>
                        <input
                          type="text"
                          value={blogFormData.category}
                          onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Author</label>
                        <input
                          type="text"
                          value={blogFormData.author}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Media Fields */}
                  <div className="grid grid-cols-1 gap-3">
                    <CMSMediaUploader label="Blog Image" field="image" value={blogFormData.image} setter={setBlogFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Main Image" field="mainImage" value={blogFormData.mainImage} setter={setBlogFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Main Video" field="mainVideo" value={blogFormData.mainVideo} setter={setBlogFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Preview Image" field="previewImage" value={blogFormData.previewImage} setter={setBlogFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Preview Video" field="previewVideo" value={blogFormData.previewVideo} setter={setBlogFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-800 shrink-0">
              <button form="blog-form" type="submit" disabled={pendingUploads > 0} className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold disabled:opacity-50">
                {pendingUploads > 0 ? "Uploading..." : "Save Article"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT PORTFOLIO MODAL --- */}
      {isPortfolioFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[90vh] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-sm font-bold text-white">{editingPortfolio ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={() => setIsPortfolioFormOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              <form id="portfolio-form" onSubmit={handleSavePortfolio} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Text Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={portfolioFormData.title}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Description</label>
                      <textarea
                        required
                        rows={6}
                        value={portfolioFormData.description}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Category</label>
                        <input
                          type="text"
                          value={portfolioFormData.category}
                          onChange={(e) => setPortfolioFormData({ ...portfolioFormData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Technologies</label>
                        <input
                          type="text"
                          value={portfolioFormData.technologies}
                          onChange={(e) => setPortfolioFormData({ ...portfolioFormData, technologies: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Tags</label>
                        <input
                          type="text"
                          value={portfolioFormData.tags}
                          onChange={(e) => setPortfolioFormData({ ...portfolioFormData, tags: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Media Fields */}
                  <div className="grid grid-cols-1 gap-3">
                    <CMSMediaUploader label="Project Image" field="image" value={portfolioFormData.image} setter={setPortfolioFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Main Image" field="mainImage" value={portfolioFormData.mainImage} setter={setPortfolioFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Main Video" field="mainVideo" value={portfolioFormData.mainVideo} setter={setPortfolioFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Preview Image" field="previewImage" value={portfolioFormData.previewImage} setter={setPortfolioFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Preview Video" field="previewVideo" value={portfolioFormData.previewVideo} setter={setPortfolioFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                  </div>
                </div>
                <button type="submit" disabled={pendingUploads > 0} className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold disabled:opacity-50">
                  {pendingUploads > 0 ? "Uploading..." : "Save Project"}
                </button>
              </form>
            </div>
            
            {/* Footer */}
          </div>
        </div>
      )}

      {/* --- EDIT SERVICE MODAL --- */}
      {isServiceFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[90vh] shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-sm font-bold text-white">{editingService ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setIsServiceFormOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              <form id="service-form" onSubmit={handleSaveService} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Title</label>
                      <input type="text" required value={serviceFormData.title} onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100" />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Subtitle</label>
                      <input type="text" value={serviceFormData.subtitle} onChange={(e) => setServiceFormData({ ...serviceFormData, subtitle: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100" />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Description</label>
                      <textarea required rows={6} value={serviceFormData.description} onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <CMSMediaUploader label="Main Image" field="mainImage" value={serviceFormData.mainImage} setter={setServiceFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Main Video" field="mainVideo" value={serviceFormData.mainVideo} setter={setServiceFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Preview Image" field="previewImage" value={serviceFormData.previewImage} setter={setServiceFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                    <CMSMediaUploader label="Preview Video" field="previewVideo" value={serviceFormData.previewVideo} setter={setServiceFormData} onUploadStart={handleUploadStart} onUploadEnd={handleUploadEnd} />
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-slate-800 shrink-0">
              <button form="service-form" type="submit" disabled={pendingUploads > 0} className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold disabled:opacity-50">
                {pendingUploads > 0 ? "Uploading..." : "Save Service"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- FORGOT PASSWORD MODAL --- */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Reset Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input type="email" required placeholder="Enter your email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100" />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">Send Reset Link</button>
              <button type="button" onClick={() => setIsForgotPasswordOpen(false)} className="w-full text-xs text-slate-400">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
