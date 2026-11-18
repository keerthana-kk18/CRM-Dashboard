import React from 'react';
import { Search, Filter, ArrowUpDown, X, UserPlus } from 'lucide-react';
import { ContactStatus } from '../../types/crm';
import { Button } from '../common/Button';

interface ContactFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalFiltered: number;
  totalCount: number;
  onReset: () => void;
  onAddContact: () => void;
}

export const ContactFilters: React.FC<ContactFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  totalFiltered,
  totalCount,
  onReset,
  onAddContact,
}) => {
  const isFiltered = searchQuery !== '' || statusFilter !== 'ALL' || sortBy !== 'name-asc';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, company, or role..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800 placeholder-slate-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls & Add Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Select */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Customer">Customer</option>
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="name-asc">Name (A - Z)</option>
              <option value="name-desc">Name (Z - A)</option>
              <option value="deal-high">Deal Value: High to Low</option>
              <option value="deal-low">Deal Value: Low to High</option>
            </select>
          </div>

          {/* Reset Filters Pill */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              Reset
            </button>
          )}

          {/* Add Contact Button */}
          <Button
            variant="primary"
            size="md"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={onAddContact}
          >
            Add Contact
          </Button>
        </div>
      </div>

      {/* Filter status meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div>
          Showing <span className="font-semibold text-slate-800">{totalFiltered}</span> of{' '}
          <span className="font-semibold text-slate-800">{totalCount}</span> total contacts
        </div>
        {statusFilter !== 'ALL' && (
          <span className="text-[11px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
            Filtered by: {statusFilter}
          </span>
        )}
      </div>
    </div>
  );
};
