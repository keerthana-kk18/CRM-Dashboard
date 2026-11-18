export type ContactStatus = 'Customer' | 'Lead' | 'Prospect' | 'Inactive';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: ContactStatus;
  dealValue: number;
  avatarUrl?: string;
  lastContacted: string;
  tags: string[];
  notes?: string;
  source: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Converted' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  status: LeadStatus;
  score: number;
  estimatedValue: number;
  assignedTo: string;
  createdAt: string;
  phone?: string;
}

export type CompanyTier = 'Enterprise' | 'Mid-Market' | 'Startup';

export interface Company {
  id: string;
  name: string;
  industry: string;
  employees: string;
  annualRevenue: string;
  contactsCount: number;
  activeDealsCount: number;
  tier: CompanyTier;
  location: string;
  website: string;
}

export type DealStage = 'Discovery' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

export interface Deal {
  id: string;
  title: string;
  company: string;
  contactName: string;
  value: number;
  stage: DealStage;
  probability: number;
  closingDate: string;
  owner: string;
}

export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskCategory = 'Call' | 'Meeting' | 'Email' | 'Follow-up' | 'Review';

export interface Task {
  id: string;
  title: string;
  due: string;
  priority: TaskPriority;
  category: TaskCategory;
  completed: boolean;
  relatedTo: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'deal' | 'lead' | 'note';
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  contactOrCompany?: string;
  timestamp: string;
  amount?: number;
}

export interface DashboardMetric {
  title: string;
  value: string;
  rawNumber: number;
  change: number;
  isPositive: boolean;
  timeframe: string;
  icon: string;
  description: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
  lastYear: number;
}

export interface LeadConversionDataPoint {
  channel: string;
  leads: number;
  conversions: number;
  rate: number;
}

export interface StageDistributionDataPoint {
  name: string;
  value: number;
  amount: number;
  color: string;
}
