import React, { useState } from 'react';
import { Contact } from '../../types/crm';
import { Avatar } from '../common/Avatar';
import { Badge, getStatusBadgeVariant } from '../common/Badge';
import {
  Edit3,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Building,
  MoreVertical,
} from 'lucide-react';

interface ContactTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onViewDetails?: (contact: Contact) => void;
}

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pagination calculation
  const totalPages = Math.ceil(contacts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContacts = contacts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <Building className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No contacts found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
          No records matched your search query or active filter. Try adjusting your search keywords
          or clearing your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table container with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
              <th className="py-3.5 px-4 sm:px-6">Contact Profile</th>
              <th className="py-3.5 px-4">Company & Title</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Pipeline Value</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Contact Info</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Last Active</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentContacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                onClick={() => onViewDetails?.(contact)}
              >
                {/* Contact Name & Email */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={contact.name}
                      src={contact.avatarUrl}
                      size="md"
                      showStatus
                      isOnline={contact.status === 'Customer'}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                        {contact.name}
                      </p>
                      <p className="text-slate-400 text-xs truncate flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 shrink-0" />
                        {contact.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Company & Role */}
                <td className="py-3.5 px-4">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 truncate">{contact.company}</p>
                    <p className="text-slate-500 text-xs truncate">{contact.role}</p>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <Badge variant={getStatusBadgeVariant(contact.status)} dot size="sm">
                    {contact.status}
                  </Badge>
                </td>

                {/* Deal Value */}
                <td className="py-3.5 px-4">
                  <span className="font-semibold font-mono text-slate-900">
                    ${contact.dealValue.toLocaleString()}
                  </span>
                  <span className="block text-[11px] text-slate-400">ARR</span>
                </td>

                {/* Phone & Source */}
                <td className="py-3.5 px-4 hidden md:table-cell">
                  <div className="text-xs text-slate-600">
                    <p className="flex items-center gap-1 text-slate-700">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      {contact.phone}
                    </p>
                    <span className="text-[11px] text-slate-400">via {contact.source}</span>
                  </div>
                </td>

                {/* Last Contacted */}
                <td className="py-3.5 px-4 hidden lg:table-cell">
                  <span className="text-xs text-slate-600 font-mono">
                    {contact.lastContacted}
                  </span>
                </td>

                {/* Action Buttons */}
                <td
                  className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(contact)}
                      className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Edit Contact"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(contact)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-800">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-slate-800">
            {Math.min(startIndex + itemsPerPage, contacts.length)}
          </span>{' '}
          of <span className="font-semibold text-slate-800">{contacts.length}</span> results
        </div>

        {/* Page controls */}
        <div className="flex items-center gap-1 self-center sm:self-auto">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                currentPage === page
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
