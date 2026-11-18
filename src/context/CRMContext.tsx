import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Contact,
  Lead,
  Company,
  Deal,
  Task,
  Activity,
  LeadStatus,
  DealStage,
} from '../types/crm';
import {
  INITIAL_CONTACTS,
  INITIAL_LEADS,
  INITIAL_COMPANIES,
  INITIAL_DEALS,
  INITIAL_TASKS,
  INITIAL_ACTIVITIES,
} from '../data/mockData';

interface CRMContextType {
  contacts: Contact[];
  leads: Lead[];
  companies: Company[];
  deals: Deal[];
  tasks: Task[];
  activities: Activity[];
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  // Contact CRUD
  addContact: (contact: Omit<Contact, 'id' | 'lastContacted'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  // Lead Actions
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  // Deal Actions
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  updateDealStage: (id: string, stage: DealStage) => void;
  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  // Stats
  metrics: {
    totalContacts: { count: number; display: string; change: number; isPositive: boolean };
    totalLeads: { count: number; display: string; change: number; isPositive: boolean };
    totalDeals: { count: number; display: string; change: number; isPositive: boolean };
    totalRevenue: { count: number; display: string; change: number; isPositive: boolean };
  };
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONTACTS: 'nexus_crm_contacts',
  LEADS: 'nexus_crm_leads',
  COMPANIES: 'nexus_crm_companies',
  DEALS: 'nexus_crm_deals',
  TASKS: 'nexus_crm_tasks',
  ACTIVITIES: 'nexus_crm_activities',
};

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
      return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
    } catch {
      return INITIAL_COMPANIES;
    }
  });

  const [deals, setDeals] = useState<Deal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEALS);
      return saved ? JSON.parse(saved) : INITIAL_DEALS;
    } catch {
      return INITIAL_DEALS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  const [globalSearch, setGlobalSearch] = useState('');

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  // Contact CRUD
  const addContact = (contactData: Omit<Contact, 'id' | 'lastContacted'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `cnt-${Date.now()}`,
      lastContacted: 'Just now',
    };
    setContacts(prev => [newContact, ...prev]);

    // Record activity
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'lead',
      title: `Added Contact: ${newContact.name}`,
      description: `Created new contact profile for ${newContact.company} (${newContact.role}).`,
      user: { name: 'Admin User' },
      contactOrCompany: newContact.company,
      timestamp: 'Just now',
      amount: newContact.dealValue,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const updateContact = (id: string, updatedFields: Partial<Contact>) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteContact = (id: string) => {
    const contactToDelete = contacts.find(c => c.id === id);
    setContacts(prev => prev.filter(c => c.id !== id));

    if (contactToDelete) {
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'note',
        title: `Removed Contact: ${contactToDelete.name}`,
        description: `Deleted contact record from ${contactToDelete.company}.`,
        user: { name: 'Admin User' },
        timestamp: 'Just now',
      };
      setActivities(prev => [newActivity, ...prev]);
    }
  };

  // Lead actions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `ld-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [newLead, ...prev]);

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'lead',
      title: `New Lead: ${newLead.name}`,
      description: `Sourced via ${newLead.source} with score ${newLead.score}/100.`,
      user: { name: 'Marketing System' },
      contactOrCompany: newLead.company,
      timestamp: 'Just now',
      amount: newLead.estimatedValue,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, status } : l))
    );
  };

  // Deal actions
  const addDeal = (dealData: Omit<Deal, 'id'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `dl-${Date.now()}`,
    };
    setDeals(prev => [newDeal, ...prev]);

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'deal',
      title: `Pipeline Deal Created: ${newDeal.title}`,
      description: `Valued at $${newDeal.value.toLocaleString()} in ${newDeal.stage} stage.`,
      user: { name: newDeal.owner },
      contactOrCompany: newDeal.company,
      timestamp: 'Just now',
      amount: newDeal.value,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const updateDealStage = (id: string, stage: DealStage) => {
    setDeals(prev =>
      prev.map(d => (d.id === id ? { ...d, stage } : d))
    );
  };

  // Task actions
  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: `tsk-${Date.now()}`,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Dynamic statistics
  const totalContactsCount = 1830 + contacts.length;
  const totalLeadsCount = 422 + leads.length;
  const totalDealsCount = 87 + deals.length;
  const revenueTotal = deals
    .filter(d => d.stage === 'Won')
    .reduce((acc, curr) => acc + curr.value, 0) || 142850;

  const metrics = {
    totalContacts: {
      count: totalContactsCount,
      display: totalContactsCount.toLocaleString(),
      change: 12.5,
      isPositive: true,
    },
    totalLeads: {
      count: totalLeadsCount,
      display: totalLeadsCount.toLocaleString(),
      change: 8.2,
      isPositive: true,
    },
    totalDeals: {
      count: totalDealsCount,
      display: totalDealsCount.toLocaleString(),
      change: 23.1,
      isPositive: true,
    },
    totalRevenue: {
      count: revenueTotal,
      display: `$${revenueTotal.toLocaleString()}`,
      change: 18.4,
      isPositive: true,
    },
  };

  return (
    <CRMContext.Provider
      value={{
        contacts,
        leads,
        companies,
        deals,
        tasks,
        activities,
        globalSearch,
        setGlobalSearch,
        addContact,
        updateContact,
        deleteContact,
        addLead,
        updateLeadStatus,
        addDeal,
        updateDealStage,
        addTask,
        toggleTask,
        metrics,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
