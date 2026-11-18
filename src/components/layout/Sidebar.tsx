import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  Briefcase,
  CheckSquare,
  BarChart3,
  Settings,
  Layers,
  ChevronRight,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { useCRM } from '../../context/CRMContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { contacts, leads, tasks } = useCRM();

  const pendingTasksCount = tasks.filter(t => !t.completed).length;

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Contacts', href: '/contacts', icon: Users, badge: contacts.length },
    { name: 'Leads', href: '/leads', icon: UserCheck, badge: leads.length },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Deals', href: '/deals', icon: Briefcase },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare, badge: pendingTasksCount, badgeColor: 'bg-amber-500' },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-full bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 shrink-0 select-none">
      {/* Top Section: Brand */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-brand-500/20 text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                Nexus<span className="text-brand-400">CRM</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase block -mt-0.5">
                Admin Enterprise
              </span>
            </div>
          </div>
        </div>

        {/* Workspace pill */}
        <div className="px-4 pt-4 pb-2">
          <div className="px-3 py-2 bg-slate-800/60 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs">
                <p className="font-medium text-slate-200">Acme Global</p>
                <p className="text-[10px] text-slate-400">Enterprise Cloud Plan</p>
              </div>
            </div>
            <span className="text-[10px] bg-brand-500/20 text-brand-300 px-1.5 py-0.5 rounded font-mono">
              v2.4
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-2">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/25 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4.5 h-4.5 transition-transform duration-150 group-hover:scale-105 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge !== undefined && (
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : item.badgeColor
                                ? `${item.badgeColor} text-slate-950 font-bold`
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {!isActive && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <div className="px-3 py-2 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Documentation</span>
          </div>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">⌘/</span>
        </div>

        {/* User Card */}
        <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar
              name="Jessica Wu"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
              size="sm"
              showStatus
            />
            <div className="text-xs truncate max-w-[110px]">
              <p className="font-semibold text-white truncate">Jessica Wu</p>
              <p className="text-[10px] text-brand-300 truncate">VP of Sales Admin</p>
            </div>
          </div>
          <button
            title="Log out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
