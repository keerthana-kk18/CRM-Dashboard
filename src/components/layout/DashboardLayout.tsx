import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { ContactModal } from '../contacts/ContactModal';
import { useCRM } from '../../context/CRMContext';

export const DashboardLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const { addContact } = useCRM();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Off-canvas Sidebar */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenAddContactModal={() => setIsAddContactModalOpen(true)}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet context={{ openAddContactModal: () => setIsAddContactModalOpen(true) }} />
          </div>
        </main>
      </div>

      {/* Global Quick Add Contact Modal */}
      <ContactModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onSubmit={(data) => {
          addContact(data);
          setIsAddContactModalOpen(false);
        }}
      />
    </div>
  );
};
