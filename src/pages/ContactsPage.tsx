import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import { ContactTable } from '../components/contacts/ContactTable';
import { ContactFilters } from '../components/contacts/ContactFilters';
import { ContactModal } from '../components/contacts/ContactModal';
import { DeleteDialog } from '../components/contacts/DeleteDialog';
import { ContactDetailModal } from '../components/contacts/ContactDetailModal';
import { Contact } from '../types/crm';
import { Users, UserCheck, DollarSign, Award, Download } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ContactsPage: React.FC = () => {
  const { contacts, addContact, updateContact, deleteContact } = useCRM();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Filter & sort logic
  const filteredContacts = useMemo(() => {
    return contacts
      .filter((contact) => {
        const matchesSearch =
          searchQuery === '' ||
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.role.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === 'ALL' || contact.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'deal-high') return b.dealValue - a.dealValue;
        if (sortBy === 'deal-low') return a.dealValue - b.dealValue;
        return 0;
      });
  }, [contacts, searchQuery, statusFilter, sortBy]);

  // Handle modal submit
  const handleModalSubmit = (contactData: Omit<Contact, 'id' | 'lastContacted'>) => {
    if (editingContact) {
      updateContact(editingContact.id, contactData);
      setEditingContact(null);
    } else {
      addContact(contactData);
      setIsAddModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingContact) {
      deleteContact(deletingContact.id);
      setDeletingContact(null);
    }
  };

  // Summary counts
  const totalCustomers = contacts.filter((c) => c.status === 'Customer').length;
  const totalLeads = contacts.filter((c) => c.status === 'Lead').length;
  const totalValue = contacts.reduce((acc, c) => acc + c.dealValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Contacts Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain high-touch relationships, track accounts, and manage your customer directory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={() => {
              const json = JSON.stringify(contacts, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'crm-contacts-export.json';
              a.click();
            }}
          >
            Export Directory
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<Users className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Contact
          </Button>
        </div>
      </div>

      {/* Mini KPI row for contacts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Directory</p>
            <p className="text-lg font-bold text-slate-900 font-mono">{contacts.length}</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Customers</p>
            <p className="text-lg font-bold text-emerald-600 font-mono">{totalCustomers}</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Leads</p>
            <p className="text-lg font-bold text-purple-600 font-mono">{totalLeads}</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Directory ARR Value</p>
            <p className="text-lg font-bold text-slate-900 font-mono">
              ${totalValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <ContactFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalFiltered={filteredContacts.length}
        totalCount={contacts.length}
        onReset={() => {
          setSearchQuery('');
          setStatusFilter('ALL');
          setSortBy('name-asc');
        }}
        onAddContact={() => setIsAddModalOpen(true)}
      />

      {/* Contacts Table */}
      <ContactTable
        contacts={filteredContacts}
        onEdit={(contact) => setEditingContact(contact)}
        onDelete={(contact) => setDeletingContact(contact)}
        onViewDetails={(contact) => setSelectedContact(contact)}
      />

      {/* Modals */}
      <ContactModal
        isOpen={isAddModalOpen || editingContact !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingContact(null);
        }}
        onSubmit={handleModalSubmit}
        contactToEdit={editingContact}
      />

      <DeleteDialog
        isOpen={deletingContact !== null}
        contact={deletingContact}
        onClose={() => setDeletingContact(null)}
        onConfirm={handleConfirmDelete}
      />

      <ContactDetailModal
        isOpen={selectedContact !== null}
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onEdit={(contact) => {
          setSelectedContact(null);
          setEditingContact(contact);
        }}
      />
    </div>
  );
};
