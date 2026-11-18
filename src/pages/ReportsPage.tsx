import React from 'react';
import { useCRM } from '../context/CRMContext';
import { BarChart3, TrendingUp, Download, CheckCircle2, ArrowUpRight, DollarSign, Users, Award } from 'lucide-react';
import { Button } from '../components/common/Button';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { LeadsConversionChart } from '../components/dashboard/LeadsConversionChart';

export const ReportsPage: React.FC = () => {
  const { metrics, deals } = useCRM();

  const totalWon = deals.filter((d) => d.stage === 'Won').length;
  const totalClosed = deals.filter((d) => ['Won', 'Lost'].includes(d.stage)).length || 1;
  const winRate = ((totalWon / totalClosed) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Executive Analytics & Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive revenue metrics, CAC efficiency, win rates, and pipeline forecasting.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Download className="w-4 h-4" />}
          onClick={() => alert('Generating full Q4 board-deck executive PDF report...')}
        >
          Download PDF Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Deal Win Rate</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">{winRate}%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +4.2%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Closed opportunities vs lost</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Customer Acquisition Cost (CAC)</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">$1,420</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              -8.5%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Blended marketing & sales cost</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Net Revenue Retention (NRR)</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">118%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +3.0%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Expansion ARR minus churn</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Avg Sales Cycle</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">28 Days</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              -4 Days
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">First inbound touch to sign</p>
        </div>
      </div>

      {/* Embedded Charts */}
      <div className="space-y-6">
        <RevenueChart />
        <LeadsConversionChart />
      </div>
    </div>
  );
};
