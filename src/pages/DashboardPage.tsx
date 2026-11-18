import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { LeadsConversionChart } from '../components/dashboard/LeadsConversionChart';
import { SalesPerformanceChart } from '../components/dashboard/SalesPerformanceChart';
import { RecentActivitySection } from '../components/dashboard/RecentActivitySection';
import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';

interface OutletContextType {
  openAddContactModal: () => void;
}

export const DashboardPage: React.FC = () => {
  const { metrics, contacts, deals } = useCRM();
  const navigate = useNavigate();
  const { openAddContactModal } = useOutletContext<OutletContextType>();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30D' | '90D' | 'YTD'>('30D');

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-800 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold flex items-center gap-1 border border-brand-500/30">
              <Sparkles className="w-3 h-3" />
              Executive Dashboard
            </span>
            <span className="text-slate-400 text-xs font-mono">Q4 Fiscal 2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome back, Jessica
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Pipeline velocity is tracking <span className="text-emerald-400 font-semibold">+18.4% ahead</span>{' '}
            of monthly targets. You have 3 deals ready for contract signoff today.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <Button
            variant="outline"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={() => {
              alert('Exporting executive CRM summary report (PDF/CSV)...');
            }}
            className="bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700"
          >
            Export Report
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<Users className="w-4 h-4" />}
            onClick={openAddContactModal}
          >
            Add Contact
          </Button>
        </div>
      </div>

      {/* 2. Dashboard Overview: 4 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Contacts"
          value={metrics.totalContacts.display}
          change={metrics.totalContacts.change}
          isPositive={metrics.totalContacts.isPositive}
          icon={<Users className="w-6 h-6" />}
          iconColor="text-blue-600"
          iconBg="bg-blue-50 border border-blue-200/50"
          subtitle={`${contacts.length} active in CRM`}
          onClick={() => navigate('/contacts')}
        />

        <StatCard
          title="Total Leads"
          value={metrics.totalLeads.display}
          change={metrics.totalLeads.change}
          isPositive={metrics.totalLeads.isPositive}
          icon={<UserCheck className="w-6 h-6" />}
          iconColor="text-purple-600"
          iconBg="bg-purple-50 border border-purple-200/50"
          subtitle="94% qualification rate"
          onClick={() => navigate('/leads')}
        />

        <StatCard
          title="Total Deals"
          value={metrics.totalDeals.display}
          change={metrics.totalDeals.change}
          isPositive={metrics.totalDeals.isPositive}
          icon={<Briefcase className="w-6 h-6" />}
          iconColor="text-amber-600"
          iconBg="bg-amber-50 border border-amber-200/50"
          subtitle={`${deals.filter(d => d.stage === 'Won').length} won this quarter`}
          onClick={() => navigate('/deals')}
        />

        <StatCard
          title="Total Revenue"
          value={metrics.totalRevenue.display}
          change={metrics.totalRevenue.change}
          isPositive={metrics.totalRevenue.isPositive}
          icon={<DollarSign className="w-6 h-6" />}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 border border-emerald-200/50"
          subtitle="Billed ARR"
          onClick={() => navigate('/reports')}
        />
      </div>

      {/* 3. Analytics Section: Charts */}
      {/* Row 1: Monthly Revenue Chart (65%) & Sales Pipeline Distribution (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <SalesPerformanceChart />
        </div>
      </div>

      {/* Row 2: Leads Conversion Channel BarChart */}
      <div>
        <LeadsConversionChart />
      </div>

      {/* 4. Recent Activities: Interactions, Leads, Deals */}
      <div>
        <RecentActivitySection />
      </div>
    </div>
  );
};
