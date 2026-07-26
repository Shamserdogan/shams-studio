import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminCMSModal } from '../components/AdminCMSModal';
import { api } from '../services/api';
import { Blog, PortfolioItem, Service } from '../types';
import { useAuth } from '../context/AuthContext';

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<{
    blogs: Blog[];
    portfolio: PortfolioItem[];
    services: Service[];
  }>({ blogs: [], portfolio: [], services: [] });

  const refreshData = async () => {
    try {
      const [blogs, portfolio, services] = await Promise.all([
        api.getBlogs(),
        api.getPortfolio(),
        api.getServices(),
      ]);
      setData({ blogs, portfolio, services });
    } catch (err) {
      console.error('Failed to refresh data', err);
    }
  };

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#020617]">
      <AdminCMSModal
        isOpen={true}
        onClose={() => navigate('/')}
        user={user}
        onLoginSuccess={(loggedInUser) => {
            console.log("LOGIN USER", loggedInUser);
            console.log("AUTH CONTEXT USER", user);
            // Since AuthContext handles state, this hook primarily triggers data fetch.
            // If AuthContext needs explicit sync, the logic should be within AdminCMSModal 
            // OR we need a way to trigger AuthContext.setUser here.
            refreshData();
        }}
        onLogout={() => {
            logout();
            navigate('/');
        }}
        refreshAllData={refreshData}
        blogs={data.blogs}
        portfolio={data.portfolio}
        services={data.services}
      />
    </div>
  );
};

export default AdminPage;
