import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminCMSModal } from './AdminCMSModal'; // Assume moved or access from backend folder

const CMSWrapper: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  // In a real scenario, this would be fetched from API
  const [data, setData] = useState({ blogs: [], portfolio: [], services: [] });

  return (
    <AdminCMSModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      user={user}
      onLoginSuccess={(user) => { /* handle login if needed, or AuthContext does it */ }}
      onLogout={logout}
      refreshAllData={() => { /* fetch data */ }}
      blogs={data.blogs}
      portfolio={data.portfolio}
      services={data.services}
    />
  );
};
