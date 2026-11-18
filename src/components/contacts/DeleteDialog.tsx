import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle } from 'lucide-react';
import { Contact } from '../../types/crm';

interface DeleteDialogProps {
  isOpen: boolean;
  contact: Contact | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  contact,
  onClose,
  onConfirm,
}) => {
  if (!contact) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Contact Record"
      maxWidth="md"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="md" onClick={onConfirm}>
            Yes, Delete Contact
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/60">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-sm">
          <p className="font-semibold text-slate-900">
            Are you sure you want to delete {contact.name}?
          </p>
          <p className="text-slate-500 mt-1 text-xs leading-relaxed">
            This will permanently remove the contact profile for{' '}
            <span className="font-semibold text-slate-800">{contact.company}</span> and log the
            removal in your CRM audit trail. This action cannot be reversed.
          </p>
        </div>
      </div>
    </Modal>
  );
};
