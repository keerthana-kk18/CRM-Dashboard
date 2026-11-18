import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Company, CompanyTier } from '../types/crm';
import { Building2, Plus, ExternalLink, Users, Briefcase, MapPin, Search } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const CompaniesPage: React.FC = () => {
  const { companies } = useCRM();
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [companyList, setCompanyList] = useState<Company[]>(companies);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    employees: '500+',
    annualRevenue: '$50M',
    tier: 'Enterprise' as CompanyTier,
    location: '',
    website: '',
  });

  const filtered = companyList.filter((cmp) => {
    const matchesSearch =
      search === '' ||
      cmp.name.toLowerCase().includes(search.toLowerCase()) ||
      cmp.industry.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'ALL' || cmp.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.industry) return;

    const created: Company = {
      ...newCompany,
      id: `cmp-${Date.now()}`,
      contactsCount: 1,
      activeDealsCount: 1,
    };
    setCompanyList([created, ...companyList]);
    setIsAddOpen(false);
    setNewCompany({
      name: '',
      industry: '',
      employees: '500+',
      annualRevenue: '$50M',
      tier: 'Enterprise',
      location: '',
      website: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Enterprise Accounts & Companies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your B2B enterprise customer accounts, organizations, and contract portfolios.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddOpen(true)}
        >
          Add Company
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or industry..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
          <span className="text-slate-500 mr-1">Tier:</span>
          {['ALL', 'Enterprise', 'Mid-Market', 'Startup'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1 rounded-lg transition-all ${
                tierFilter === tier
                  ? 'bg-brand-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center font-bold text-slate-700 text-lg">
                  {company.name.slice(0, 2).toUpperCase()}
                </div>
                <Badge
                  variant={
                    company.tier === 'Enterprise'
                      ? 'purple'
                      : company.tier === 'Mid-Market'
                      ? 'info'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {company.tier}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-900">{company.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{company.industry}</p>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{company.location}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Annual Revenue:</span>
                <span className="font-semibold text-slate-900 font-mono">
                  {company.annualRevenue}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Headcount:</span>
                <span className="font-medium text-slate-700">{company.employees}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Active Contacts:</span>
                <span className="font-semibold text-brand-600 font-mono">
                  {company.contactsCount} contacts
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Active Deals:</span>
                <span className="font-semibold text-emerald-600 font-mono">
                  {company.activeDealsCount} in pipeline
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
              >
                {company.website}
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[11px] text-slate-400 font-mono">ID: {company.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Company Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Enterprise Company Account"
        description="Register an account organization into your CRM database."
        footer={
          <>
            <Button variant="outline" size="md" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleAddCompany}>
              Add Company
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddCompany} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              required
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              placeholder="e.g. Acme Cloud Corp"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Industry</label>
              <input
                type="text"
                required
                value={newCompany.industry}
                onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                placeholder="Software / SaaS"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Tier</label>
              <select
                value={newCompany.tier}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, tier: e.target.value as CompanyTier })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="Startup">Startup</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Revenue</label>
              <input
                type="text"
                value={newCompany.annualRevenue}
                onChange={(e) => setNewCompany({ ...newCompany, annualRevenue: e.target.value })}
                placeholder="$50M"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters</label>
              <input
                type="text"
                value={newCompany.location}
                onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL</label>
            <input
              type="text"
              value={newCompany.website}
              onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
              placeholder="acmecloud.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
