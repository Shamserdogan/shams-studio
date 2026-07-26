import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Footer } from './components/Footer';
import { Blog, PortfolioItem, Service, User } from './types';
import { api } from './services/api';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic Data States
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Check auth & load initial data
  useEffect(() => {
    checkAuth();
    loadAllData();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await api.getMe();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    }
  };

  const loadAllData = () => {
    // Services
    setLoadingServices(true);
    api.getServices()
      .then((data) => setServices(data))
      .catch((err) => console.error('Error fetching services:', err))
      .finally(() => setLoadingServices(false));

    // Portfolio
    setLoadingPortfolio(true);
    api.getPortfolio()
      .then((data) => setPortfolio(data))
      .catch((err) => console.error('Error fetching portfolio:', err))
      .finally(() => setLoadingPortfolio(false));

    // Blogs
    setLoadingBlogs(true);
    api.getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error('Error fetching blogs:', err))
      .finally(() => setLoadingBlogs(false));
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar
        user={user}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenAdmin={() => setIsAdminOpen(true)} />

        <ServicesSection
          services={services}
          loading={loadingServices}
        />

        <PortfolioSection
          portfolio={portfolio}
          loading={loadingPortfolio}
        />

        <BlogSection
          blogs={blogs}
          loading={loadingBlogs}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Portal Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        user={user}
        onLoginSuccess={(u) => {
          setUser(u);
          loadAllData();
        }}
        onLogout={handleLogout}
        refreshAllData={loadAllData}
        blogs={blogs}
        portfolio={portfolio}
        services={services}
      />
    </div>
  );
}
