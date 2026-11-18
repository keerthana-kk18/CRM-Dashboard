import { alignSeedRecordDates, seedData } from "./data.js";

const STORAGE_KEY = "open-learn-suite-workspace-v1";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function loadWorkspace() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const initial = clone(seedData);
      const legacyContacts = localStorage.getItem("northstar-crm-contacts-v1");
      if (legacyContacts) {
        const parsedContacts = JSON.parse(legacyContacts);
        if (Array.isArray(parsedContacts)) {
          initial.contacts = parsedContacts.filter(contact => contact && contact.email).map(contact => ({
            id: contact.id,
            name: contact.name || [contact.firstName, contact.lastName].filter(Boolean).join(" "),
            email: contact.email,
            phone: contact.phone || "",
            organization: contact.company || "Independent",
            role: contact.role || "",
            category: contact.status === "Lead" ? "Learner" : "Partner",
            status: contact.status === "Lead" ? "Prospect" : contact.status === "Inactive" ? "Inactive" : "Active",
            updated: new Date().toISOString().slice(0, 10)
          }));
        }
      }
      return initial;
    }
    const parsed = JSON.parse(saved);
    const workspace = Object.fromEntries(Object.entries(seedData).map(([key, fallback]) => [
      key,
      key === "preferences" || key === "profile" ? { ...fallback, ...(parsed[key] || {}) } : Array.isArray(parsed[key]) ? parsed[key] : clone(fallback)
    ]));
    alignSeedRecordDates(workspace);
    return workspace;
  } catch (error) {
    console.error("Could not read the Open Learn Suite workspace.", error);
    return clone(seedData);
  }
}

export function saveWorkspace(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Could not persist the Open Learn Suite workspace.", error);
    return false;
  }
}
