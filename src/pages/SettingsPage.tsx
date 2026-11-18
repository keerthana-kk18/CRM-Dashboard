import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Database, Save, Check } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Avatar } from '../components/common/Avatar';

export const SettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Jessica Wu',
    email: 'jessica.wu@acmeglobal.com',
    role: 'VP of Sales & CRM Admin',
    timezone: 'America/New_York (EST)',
    currency: 'USD ($)',
    autoAssignLeads: true,
    emailAlerts: true,
    slackWebhook: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure user profiles, CRM workspace defaults, and security notifications.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <Check className="w-4 h-4" />
            Changes Saved Successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-semibold text-slate-900">Administrator Profile</h3>
          </div>

          <div className="flex items-center gap-4">
            <Avatar
              name={profile.name}
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
              size="xl"
              showStatus
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
              <p className="text-xs text-slate-500">{profile.role}</p>
              <span className="inline-block mt-1 text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                Superuser Role: All Privileges
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* CRM Workspace Settings */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Database className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-semibold text-slate-900">CRM Workspace & Currency</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Primary Currency
              </label>
              <select
                value={profile.currency}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Timezone</label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-semibold text-slate-900">Notification Channels</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 cursor-pointer transition-colors">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  Real-time Deal Stage Alerts
                </p>
                <p className="text-xs text-slate-500">
                  Notify when a high-value opportunity enters Negotiation or Closed Won.
                </p>
              </div>
              <input
                type="checkbox"
                checked={profile.emailAlerts}
                onChange={(e) => setProfile({ ...profile, emailAlerts: e.target.checked })}
                className="w-4.5 h-4.5 rounded text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 cursor-pointer transition-colors">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">Slack Integration</p>
                <p className="text-xs text-slate-500">
                  Post lead notifications into #sales-pipeline Slack room.
                </p>
              </div>
              <input
                type="checkbox"
                checked={profile.slackWebhook}
                onChange={(e) => setProfile({ ...profile, slackWebhook: e.target.checked })}
                className="w-4.5 h-4.5 rounded text-brand-600 focus:ring-brand-500"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <Button variant="primary" size="lg" icon={<Save className="w-4 h-4" />}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
