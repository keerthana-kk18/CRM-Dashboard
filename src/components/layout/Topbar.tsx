import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  UserPlus,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Command,
  ChevronDown,
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { useCRM } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onOpenMobileNav: () => void;
  onOpenAddContactModal?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileNav,
  onOpenAddContactModal,
}) => {
  const { globalSearch, setGlobalSearch, activities } = useCRM();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setShowQuickCreate(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search contacts, deals, companies, tasks... (Press ⌘K)"
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm pl-9 pr-14 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800 placeholder-slate-400 transition-all duration-150"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs pointer-events-none">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live sync badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Sync</span>
        </div>

        {/* Quick Action "Create New" Dropdown */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setShowQuickCreate(!showQuickCreate)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs sm:text-sm font-medium shadow-xs shadow-brand-500/20 transition-all duration-150"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {showQuickCreate && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95">
              <button
                onClick={() => {
                  setShowQuickCreate(false);
                  if (onOpenAddContactModal) {
                    onOpenAddContactModal();
                  } else {
                    navigate('/contacts');
                  }
                }}
                className="w-full px-3.5 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
              >
                <UserPlus className="w-4 h-4 text-brand-600" />
                <div>
                  <p className="font-medium text-slate-800">Add Contact</p>
                  <p className="text-[11px] text-slate-400">Add a client or customer profile</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowQuickCreate(false);
                  navigate('/leads');
                }}
                className="w-full px-3.5 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="font-medium text-slate-800">New Lead</p>
                  <p className="text-[11px] text-slate-400">Capture new marketing prospect</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowQuickCreate(false);
                  navigate('/deals');
                }}
                className="w-full px-3.5 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
              >
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-800">Create Deal</p>
                  <p className="text-[11px] text-slate-400">Add high-value pipeline opportunity</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Notifications</h4>
                  <p className="text-[11px] text-slate-400">3 unread notifications</p>
                </div>
                <span className="text-[10px] font-medium text-brand-600 hover:underline cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="p-3 hover:bg-slate-50 transition-colors flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="text-xs flex-1">
                      <p className="font-medium text-slate-800">{act.title}</p>
                      <p className="text-slate-500 line-clamp-2 mt-0.5">{act.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Avatar
              name="Jessica Wu"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
              size="sm"
              showStatus
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">Jessica Wu</p>
              <p className="text-[10px] text-slate-500">VP of Sales Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Jessica Wu</p>
                <p className="text-[11px] text-slate-400 truncate">jessica.wu@acmeglobal.com</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 bg-brand-50 text-brand-700 text-[10px] font-semibold rounded">
                  Administrator
                </span>
              </div>
              <div className="py-1 text-xs">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/reports');
                  }}
                  className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50"
                >
                  Sales Performance Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
