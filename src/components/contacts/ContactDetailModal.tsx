import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import { Badge, getStatusBadgeVariant } from '../common/Badge';
import { Contact } from '../../types/crm';
import { Mail, Phone, Building, Briefcase, DollarSign, Calendar, Tag, Globe, Clock, CheckCircle } from 'lucide-react';

interface ContactDetailModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
}

export const ContactDetailModal: React.FC<ContactDetailModalProps> = ({
  contact,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!contact) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Profile Details"
      description="Full client portfolio, company attribution, and interaction logs."
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onClose();
              onEdit(contact);
            }}
          >
            Edit Profile
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <Avatar
            name={contact.name}
            src={contact.avatarUrl}
            size="xl"
            showStatus
            isOnline={contact.status === 'Customer'}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{contact.name}</h3>
              <Badge variant={getStatusBadgeVariant(contact.status)} dot size="sm">
                {contact.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              {contact.role} at <span className="font-semibold text-slate-800">{contact.company}</span>
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              Last active {contact.lastContacted}
            </p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
              Email Address
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="text-slate-800 hover:text-brand-600 font-medium flex items-center gap-1.5 truncate"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {contact.email}
            </a>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
              Direct Phone
            </span>
            <a
              href={`tel:${contact.phone}`}
              className="text-slate-800 hover:text-brand-600 font-medium flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {contact.phone}
            </a>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
              Deal Pipeline Value
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              ${contact.dealValue.toLocaleString()} ARR
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
              Acquisition Source
            </span>
            <span className="text-slate-800 font-medium flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {contact.source}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <span className="text-xs font-semibold text-slate-700 block mb-2">Account Tags</span>
          <div className="flex flex-wrap gap-1.5">
            {contact.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Internal Notes */}
        {contact.notes && (
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-700 block mb-1">Account Notes</span>
            <p className="text-xs text-slate-600 leading-relaxed">{contact.notes}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
