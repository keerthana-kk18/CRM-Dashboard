import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Lead, LeadStatus } from '../types/crm';
import { Avatar } from '../components/common/Avatar';
import { Badge, getStatusBadgeVariant } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  UserCheck,
  Plus,
  Mail,
  Building,
  DollarSign,
  TrendingUp,
  Sparkles,
  Search,
} from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const { leads, updateLeadStatus, addLead } = useCRM();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);

  // New Lead Form state
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    company: '',
    source: 'Website Form',
    status: 'New' as LeadStatus,
    score: 85,
    estimatedValue: 35000,
    assignedTo: 'Jessica Wu',
    phone: '',
  });

  const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Converted', 'Lost'];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      search === '' ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email || !newLeadForm.company) return;

    addLead({
      name: newLeadForm.name,
      email: newLeadForm.email,
      company: newLeadForm.company,
      source: newLeadForm.source,
      status: newLeadForm.status,
      score: Number(newLeadForm.score) || 80,
      estimatedValue: Number(newLeadForm.estimatedValue) || 20000,
      assignedTo: newLeadForm.assignedTo,
      phone: newLeadForm.phone,
    });
    setIsNewLeadOpen(false);
    setNewLeadForm({
      name: '',
      email: '',
      company: '',
      source: 'Website Form',
      status: 'New',
      score: 85,
      estimatedValue: 35000,
      assignedTo: 'Jessica Wu',
      phone: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leads Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Capture, score, and nurture inbound prospects through your sales conversion pipeline.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsNewLeadOpen(true)}
        >
          Capture Lead
        </Button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name or company..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterStatus === 'ALL'
                ? 'bg-brand-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Leads ({leads.length})
          </button>
          {statuses.map((st) => {
            const count = leads.filter((l) => l.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filterStatus === st
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-card-hover transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <Avatar name={lead.name} size="md" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{lead.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3 text-slate-400" />
                    {lead.company}
                  </p>
                </div>
              </div>
              <Badge variant={getStatusBadgeVariant(lead.status)} size="sm" dot>
                {lead.status}
              </Badge>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lead Score:</span>
                <span
                  className={`font-mono font-bold ${
                    lead.score >= 80 ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {lead.score}/100
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Est. Opportunity:</span>
                <span className="font-mono font-semibold text-slate-900">
                  ${lead.estimatedValue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Acquisition Source:</span>
                <span className="text-slate-700 font-medium">{lead.source}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Assigned AE:</span>
                <span className="text-slate-700 font-medium">{lead.assignedTo}</span>
              </div>
            </div>

            {/* Quick status change selector */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">Update Status:</span>
              <select
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-hidden font-medium text-slate-700 cursor-pointer"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Modal */}
      <Modal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        title="Capture New Prospect Lead"
        description="Add a new lead to the CRM sales pipeline with intent score and opportunity value."
        footer={
          <>
            <Button variant="outline" size="md" onClick={() => setIsNewLeadOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleCreateLead}>
              Create Lead
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact / Prospect Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newLeadForm.name}
              onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
              placeholder="e.g. Cassandra Meyer"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={newLeadForm.email}
                onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                placeholder="cassandra@company.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newLeadForm.company}
                onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                placeholder="CloudScale Inc."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Score (1-100)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={newLeadForm.score}
                onChange={(e) => setNewLeadForm({ ...newLeadForm, score: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Deal Value ($)</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={newLeadForm.estimatedValue}
                onChange={(e) =>
                  setNewLeadForm({ ...newLeadForm, estimatedValue: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Source</label>
              <select
                value={newLeadForm.source}
                onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                <option value="Website Form">Website Form</option>
                <option value="Inbound Demo">Inbound Demo</option>
                <option value="LinkedIn InMail">LinkedIn InMail</option>
                <option value="Referral">Referral</option>
                <option value="Paid Ads">Paid Ads</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pipeline Stage</label>
              <select
                value={newLeadForm.status}
                onChange={(e) =>
                  setNewLeadForm({ ...newLeadForm, status: e.target.value as LeadStatus })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
