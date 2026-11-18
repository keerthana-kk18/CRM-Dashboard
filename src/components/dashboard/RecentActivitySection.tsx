import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  PhoneCall,
  Mail,
  Calendar,
  Briefcase,
  UserPlus,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Badge, getStatusBadgeVariant } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Link } from 'react-router-dom';

type ActivityTab = 'interactions' | 'leads' | 'deals';

export const RecentActivitySection: React.FC = () => {
  const { activities, leads, deals } = useCRM();
  const [activeTab, setActiveTab] = useState<ActivityTab>('interactions');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <PhoneCall className="w-4 h-4 text-blue-600" />;
      case 'email':
        return <Mail className="w-4 h-4 text-purple-600" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'deal':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'lead':
        return <UserPlus className="w-4 h-4 text-cyan-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const getActivityBadgeBg = (type: string) => {
    switch (type) {
      case 'call':
        return 'bg-blue-50 border-blue-200/60';
      case 'email':
        return 'bg-purple-50 border-purple-200/60';
      case 'meeting':
        return 'bg-amber-50 border-amber-200/60';
      case 'deal':
        return 'bg-emerald-50 border-emerald-200/60';
      case 'lead':
        return 'bg-cyan-50 border-cyan-200/60';
      default:
        return 'bg-slate-50 border-slate-200/60';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header with Navigation Tabs */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Recent CRM Activities
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit log of customer engagements, pipeline deals & leads
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('interactions')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'interactions'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Customer Interactions</span>
            <span className="text-[10px] bg-slate-200/60 text-slate-600 px-1.5 py-0.2 rounded-full font-mono">
              {activities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Recently Added Leads</span>
            <span className="text-[10px] bg-slate-200/60 text-slate-600 px-1.5 py-0.2 rounded-full font-mono">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deals')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'deals'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Recent Deals</span>
            <span className="text-[10px] bg-slate-200/60 text-slate-600 px-1.5 py-0.2 rounded-full font-mono">
              {deals.length}
            </span>
          </button>
        </div>
      </div>

      {/* Content Feed */}
      <div className="divide-y divide-slate-100">
        {/* Tab 1: Customer Interactions */}
        {activeTab === 'interactions' && (
          <div className="divide-y divide-slate-100">
            {activities.slice(0, 6).map((activity) => (
              <div
                key={activity.id}
                className="p-4 sm:px-5 hover:bg-slate-50/70 transition-colors flex items-start gap-3.5 group"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${getActivityBadgeBg(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">By {activity.user.name}</span>
                    {activity.contactOrCompany && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                          {activity.contactOrCompany}
                        </span>
                      </>
                    )}
                    {activity.amount && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="font-semibold text-emerald-600 font-mono">
                          +${activity.amount.toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Recently Added Leads */}
        {activeTab === 'leads' && (
          <div className="divide-y divide-slate-100">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="p-4 sm:px-5 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Avatar name={lead.name} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900 truncate">{lead.name}</p>
                      <Badge variant={getStatusBadgeVariant(lead.status)} size="sm" dot>
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {lead.company} • Sourced via {lead.source}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Lead Score
                    </span>
                    <span
                      className={`text-xs font-bold font-mono ${
                        lead.score >= 80 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {lead.score}/100
                    </span>
                  </div>

                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Est. Value
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      ${lead.estimatedValue.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    to="/leads"
                    className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                    title="View Lead Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Recent Deals */}
        {activeTab === 'deals' && (
          <div className="divide-y divide-slate-100">
            {deals.slice(0, 5).map((deal) => (
              <div
                key={deal.id}
                className="p-4 sm:px-5 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <Briefcase className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{deal.title}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {deal.company} • Primary: {deal.contactName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div className="hidden sm:block">
                    <Badge variant={getStatusBadgeVariant(deal.stage)} size="sm" dot>
                      {deal.stage}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Deal Value
                    </span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      ${deal.value.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    to="/deals"
                    className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                    title="Open Deals Pipeline"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing latest activity updates across all accounts</span>
        <Link
          to={activeTab === 'leads' ? '/leads' : activeTab === 'deals' ? '/deals' : '/contacts'}
          className="text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1 group"
        >
          View all in {activeTab === 'leads' ? 'Leads' : activeTab === 'deals' ? 'Deals' : 'Contacts'}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};
