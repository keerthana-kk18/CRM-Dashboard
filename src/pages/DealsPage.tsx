import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Deal, DealStage } from '../types/crm';
import { Briefcase, Plus, DollarSign, Calendar, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge, getStatusBadgeVariant } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

const STAGES: DealStage[] = ['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export const DealsPage: React.FC = () => {
  const { deals, updateDealStage, addDeal } = useCRM();
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);

  const [dealForm, setDealForm] = useState({
    title: '',
    company: '',
    contactName: '',
    value: 50000,
    stage: 'Discovery' as DealStage,
    probability: 50,
    closingDate: '2026-12-15',
    owner: 'Jessica Wu',
  });

  const totalValue = deals.reduce((acc, d) => acc + d.value, 0);
  const wonValue = deals.filter((d) => d.stage === 'Won').reduce((acc, d) => acc + d.value, 0);

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealForm.title || !dealForm.company) return;

    addDeal({
      title: dealForm.title,
      company: dealForm.company,
      contactName: dealForm.contactName,
      value: Number(dealForm.value) || 10000,
      stage: dealForm.stage,
      probability: Number(dealForm.probability) || 50,
      closingDate: dealForm.closingDate,
      owner: dealForm.owner,
    });
    setIsAddDealOpen(false);
    setDealForm({
      title: '',
      company: '',
      contactName: '',
      value: 50000,
      stage: 'Discovery',
      probability: 50,
      closingDate: '2026-12-15',
      owner: 'Jessica Wu',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sales Deals Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track deal stages, win probabilities, and pipeline values across active sales cycles.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddDealOpen(true)}
        >
          New Deal
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Active Pipeline Value</p>
          <p className="text-xl font-bold text-slate-900 font-mono mt-1">
            ${totalValue.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Closed Won ARR</p>
          <p className="text-xl font-bold text-emerald-600 font-mono mt-1">
            ${wonValue.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Total Tracked Deals</p>
          <p className="text-xl font-bold text-slate-900 font-mono mt-1">{deals.length} deals</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Average Deal Size</p>
          <p className="text-xl font-bold text-brand-600 font-mono mt-1">
            ${Math.round(totalValue / (deals.length || 1)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Kanban Stage Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((acc, d) => acc + d.value, 0);

          return (
            <div
              key={stage}
              className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/70 space-y-3 min-h-[380px]"
            >
              {/* Stage Header */}
              <div className="pb-2 border-b border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {stage}
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-slate-500 mt-0.5">
                    ${(stageTotal / 1000).toFixed(0)}k
                  </p>
                </div>
                <span className="w-5 h-5 rounded-full bg-white text-slate-600 text-xs font-bold flex items-center justify-center border border-slate-200 shadow-2xs">
                  {stageDeals.length}
                </span>
              </div>

              {/* Deal Cards */}
              <div className="space-y-2.5">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-2.5 group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {deal.title}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {deal.company}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                      <span className="font-mono font-bold text-slate-900">
                        ${deal.value.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {deal.probability}% win
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span className="truncate max-w-[90px]">{deal.contactName}</span>
                      <span className="font-mono text-slate-400">{deal.closingDate}</span>
                    </div>

                    {/* Stage Transition Selector */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                      <span className="text-[10px] text-slate-400">Move:</span>
                      <select
                        value={deal.stage}
                        onChange={(e) => updateDealStage(deal.id, e.target.value as DealStage)}
                        className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-700 focus:outline-hidden"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      <Modal
        isOpen={isAddDealOpen}
        onClose={() => setIsAddDealOpen(false)}
        title="Create New Sales Pipeline Deal"
        description="Add a deal opportunity with projected value, stage, and primary account contact."
        footer={
          <>
            <Button variant="outline" size="md" onClick={() => setIsAddDealOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleCreateDeal}>
              Create Deal
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateDeal} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deal Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={dealForm.title}
              onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
              placeholder="e.g. Enterprise Security Module Expansion"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Account <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={dealForm.company}
                onChange={(e) => setDealForm({ ...dealForm, company: e.target.value })}
                placeholder="TechCorp Solutions"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Contact</label>
              <input
                type="text"
                value={dealForm.contactName}
                onChange={(e) => setDealForm({ ...dealForm, contactName: e.target.value })}
                placeholder="Sarah Jenkins"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deal Value ($)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={dealForm.value}
                onChange={(e) => setDealForm({ ...dealForm, value: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pipeline Stage</label>
              <select
                value={dealForm.stage}
                onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value as DealStage })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Win Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={dealForm.probability}
                onChange={(e) =>
                  setDealForm({ ...dealForm, probability: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Close Date</label>
              <input
                type="date"
                value={dealForm.closingDate}
                onChange={(e) => setDealForm({ ...dealForm, closingDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
