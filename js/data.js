const courses = ["Product Design Lab", "Growth Marketing", "Data Storytelling", "Leadership in Practice", "Creative Coding", "Customer Discovery"];

export const seedData = {
  profile: { name: "Jordan Miller", email: "jordan@openlearn.studio", role: "Workspace administrator", timezone: "Pacific Time (PT)" },
  contacts: [
    { id: "c-101", name: "Amara Okafor", email: "amara@northstar.edu", phone: "+1 415 555 0119", organization: "Northstar Learning", role: "Program Director", category: "Partner", status: "Active", updated: "2025-11-18" },
    { id: "c-102", name: "Theo Martin", email: "theo.martin@email.com", phone: "+1 212 555 0168", organization: "Independent", role: "Prospective learner", category: "Learner", status: "Prospect", updated: "2025-11-17" },
    { id: "c-103", name: "Priya Nair", email: "priya@formandfield.com", phone: "+44 20 7946 0221", organization: "Form & Field", role: "Talent Lead", category: "Partner", status: "Active", updated: "2025-11-16" },
    { id: "c-104", name: "Mateo Alvarez", email: "mateo.alvarez@email.com", phone: "+1 512 555 0142", organization: "Independent", role: "Alumni, cohort 04", category: "Alumni", status: "Active", updated: "2025-11-14" },
    { id: "c-105", name: "Hana Suzuki", email: "hana@atelier.co", phone: "+81 3 5555 0187", organization: "Atelier Co.", role: "Learning Manager", category: "Partner", status: "Active", updated: "2025-11-13" },
    { id: "c-106", name: "Elliot James", email: "elliot.j@email.com", phone: "+1 206 555 0106", organization: "Independent", role: "Prospective learner", category: "Learner", status: "Prospect", updated: "2025-11-12" },
    { id: "c-107", name: "Zara Khan", email: "zara@brightworks.io", phone: "+1 312 555 0193", organization: "Brightworks", role: "People Partner", category: "Partner", status: "Active", updated: "2025-11-11" },
    { id: "c-108", name: "Noah Williams", email: "noah.w@email.com", phone: "+1 617 555 0128", organization: "Independent", role: "Alumni, cohort 02", category: "Alumni", status: "Active", updated: "2025-11-10" },
    { id: "c-109", name: "Lina Moreau", email: "lina@atelier.co", phone: "+33 1 5555 0157", organization: "Atelier Co.", role: "Program Coordinator", category: "Partner", status: "Active", updated: "2025-11-09" },
    { id: "c-110", name: "Jules Carter", email: "jules.carter@email.com", phone: "+1 503 555 0171", organization: "Independent", role: "Prospective learner", category: "Learner", status: "Inactive", updated: "2025-11-08" },
    { id: "c-111", name: "Sofia Reyes", email: "sofia@kindred.org", phone: "+1 305 555 0124", organization: "Kindred Foundation", role: "Community Lead", category: "Partner", status: "Active", updated: "2025-11-07" }
  ],
  leads: [
    { id: "l-201", name: "Theo Martin", email: "theo.martin@email.com", phone: "+1 212 555 0168", course: courses[0], source: "Webinar", owner: "Maya Chen", status: "Qualified", priority: "High", followUp: "2025-11-20" },
    { id: "l-202", name: "Elliot James", email: "elliot.j@email.com", phone: "+1 206 555 0106", course: courses[2], source: "Referral", owner: "Ari Patel", status: "Contacted", priority: "Medium", followUp: "2025-11-21" },
    { id: "l-203", name: "Jules Carter", email: "jules.carter@email.com", phone: "+1 503 555 0171", course: courses[1], source: "Organic", owner: "Maya Chen", status: "New", priority: "Low", followUp: "2025-11-24" },
    { id: "l-204", name: "Camila Torres", email: "camila.t@email.com", phone: "+1 650 555 0110", course: courses[3], source: "Partner", owner: "Noah Price", status: "Qualified", priority: "High", followUp: "2025-11-19" },
    { id: "l-205", name: "Iris Bennett", email: "iris.b@email.com", phone: "+1 206 555 0177", course: courses[4], source: "Social", owner: "Ari Patel", status: "Proposal", priority: "Medium", followUp: "2025-11-25" },
    { id: "l-206", name: "Omar Haddad", email: "omar.h@email.com", phone: "+1 312 555 0118", course: courses[5], source: "Referral", owner: "Maya Chen", status: "Contacted", priority: "Medium", followUp: "2025-11-22" },
    { id: "l-207", name: "Grace Park", email: "grace.park@email.com", phone: "+1 415 555 0143", course: courses[0], source: "Webinar", owner: "Noah Price", status: "New", priority: "Low", followUp: "2025-11-26" },
    { id: "l-208", name: "Rafael Costa", email: "rafael.c@email.com", phone: "+55 11 5555 0194", course: courses[2], source: "Organic", owner: "Ari Patel", status: "Qualified", priority: "High", followUp: "2025-11-19" },
    { id: "l-209", name: "Mila Fischer", email: "mila.f@email.com", phone: "+49 30 5555 0176", course: courses[1], source: "Partner", owner: "Noah Price", status: "Contacted", priority: "Low", followUp: "2025-11-27" }
  ],
  students: [
    { id: "s-301", name: "Mateo Alvarez", email: "mateo.alvarez@email.com", phone: "+1 512 555 0142", course: courses[0], enrolled: "2025-09-10", progress: 82, payment: "Paid", status: "Learning" },
    { id: "s-302", name: "Nia Robinson", email: "nia.r@email.com", phone: "+1 415 555 0122", course: courses[2], enrolled: "2025-10-02", progress: 46, payment: "Paid", status: "Learning" },
    { id: "s-303", name: "Noah Williams", email: "noah.w@email.com", phone: "+1 617 555 0128", course: courses[3], enrolled: "2025-08-21", progress: 100, payment: "Paid", status: "Completed" },
    { id: "s-304", name: "Zara Khan", email: "zara@brightworks.io", phone: "+1 312 555 0193", course: courses[5], enrolled: "2025-10-14", progress: 28, payment: "Pending", status: "Learning" },
    { id: "s-305", name: "Ethan Brooks", email: "ethan.b@email.com", phone: "+1 503 555 0164", course: courses[4], enrolled: "2025-10-18", progress: 19, payment: "Paid", status: "Learning" },
    { id: "s-306", name: "Priyanka Shah", email: "priyanka.s@email.com", phone: "+1 415 555 0178", course: courses[1], enrolled: "2025-09-17", progress: 67, payment: "Paid", status: "Learning" },
    { id: "s-307", name: "Leo Nguyen", email: "leo.n@email.com", phone: "+1 212 555 0184", course: courses[0], enrolled: "2025-08-05", progress: 100, payment: "Paid", status: "Completed" },
    { id: "s-308", name: "Ada Johnson", email: "ada.j@email.com", phone: "+1 310 555 0191", course: courses[2], enrolled: "2025-10-26", progress: 12, payment: "Overdue", status: "At risk" },
    { id: "s-309", name: "Camila Torres", email: "camila.t@email.com", phone: "+1 650 555 0110", course: courses[3], enrolled: "2025-11-01", progress: 8, payment: "Paid", status: "Learning" }
  ],
  courses: [
    { id: "cr-401", name: courses[0], description: "Build a portfolio-ready product experience from first sketch to final handoff.", category: "Design", trainer: "Mina Park", enrolled: 48, duration: "8 weeks", status: "Open", art: "plum", symbol: "✳" },
    { id: "cr-402", name: courses[1], description: "Find your audience, sharpen your story and make growth measurable.", category: "Marketing", trainer: "Nico Reyes", enrolled: 36, duration: "6 weeks", status: "Open", art: "peach", symbol: "↗" },
    { id: "cr-403", name: courses[2], description: "Turn complex information into a story people can see and use.", category: "Data", trainer: "Ari Patel", enrolled: 62, duration: "5 weeks", status: "Open", art: "sage", symbol: "◌" },
    { id: "cr-404", name: courses[3], description: "A practical, people-first toolkit for leading through change.", category: "Leadership", trainer: "Maya Chen", enrolled: 27, duration: "7 weeks", status: "Waitlist", art: "gold", symbol: "⌁" },
    { id: "cr-405", name: courses[4], description: "Make the web your canvas with playful, expressive code.", category: "Technology", trainer: "Jo Ellis", enrolled: 41, duration: "9 weeks", status: "Open", art: "blue", symbol: "⌘" },
    { id: "cr-406", name: courses[5], description: "Ask better questions, test assumptions and learn by making.", category: "Strategy", trainer: "Sofia Reyes", enrolled: 19, duration: "4 weeks", status: "Draft", art: "rose", symbol: "?" }
  ],
  enquiries: [
    { id: "e-501", name: "Avery Patel", email: "avery.p@email.com", phone: "+1 408 555 0133", course: courses[0], source: "Open house", owner: "Maya Chen", date: "2025-11-18", status: "New", followUp: "2025-11-20" },
    { id: "e-502", name: "Omar Haddad", email: "omar.h@email.com", phone: "+1 312 555 0118", course: courses[5], source: "Website", owner: "Ari Patel", date: "2025-11-17", status: "Follow-up", followUp: "2025-11-19" },
    { id: "e-503", name: "Grace Park", email: "grace.park@email.com", phone: "+1 415 555 0143", course: courses[0], source: "Referral", owner: "Maya Chen", date: "2025-11-16", status: "Contacted", followUp: "2025-11-21" },
    { id: "e-504", name: "Rafael Costa", email: "rafael.c@email.com", phone: "+55 11 5555 0194", course: courses[2], source: "Webinar", owner: "Noah Price", date: "2025-11-15", status: "Qualified", followUp: "2025-11-22" },
    { id: "e-505", name: "Mila Fischer", email: "mila.f@email.com", phone: "+49 30 5555 0176", course: courses[1], source: "Website", owner: "Ari Patel", date: "2025-11-14", status: "New", followUp: "2025-11-22" },
    { id: "e-506", name: "Camila Torres", email: "camila.t@email.com", phone: "+1 650 555 0110", course: courses[3], source: "Partner", owner: "Maya Chen", date: "2025-11-12", status: "Qualified", followUp: "2025-11-19" },
    { id: "e-507", name: "Iris Bennett", email: "iris.b@email.com", phone: "+1 206 555 0177", course: courses[4], source: "Social", owner: "Noah Price", date: "2025-11-11", status: "Contacted", followUp: "2025-11-25" }
  ],
  admissions: [
    { id: "a-601", student: "Leo Nguyen", email: "leo.n@email.com", course: courses[0], date: "2025-11-18", amount: 1290, payment: "Paid", status: "Enrolled" },
    { id: "a-602", student: "Camila Torres", email: "camila.t@email.com", course: courses[3], date: "2025-11-17", amount: 1680, payment: "Deposit paid", status: "Documents" },
    { id: "a-603", student: "Ada Johnson", email: "ada.j@email.com", course: courses[2], date: "2025-11-16", amount: 980, payment: "Pending", status: "Review" },
    { id: "a-604", student: "Ethan Brooks", email: "ethan.b@email.com", course: courses[4], date: "2025-11-14", amount: 1490, payment: "Paid", status: "Enrolled" },
    { id: "a-605", student: "Mila Fischer", email: "mila.f@email.com", course: courses[1], date: "2025-11-12", amount: 890, payment: "Pending", status: "Review" },
    { id: "a-606", student: "Omar Haddad", email: "omar.h@email.com", course: courses[5], date: "2025-11-10", amount: 740, payment: "Deposit paid", status: "Documents" }
  ],
  tasks: [
    { id: "t-701", title: "Send portfolio review notes", owner: "Maya Chen", due: "2025-11-19", priority: "High", done: false, related: "Mateo Alvarez" },
    { id: "t-702", title: "Welcome the new cohort", owner: "Ari Patel", due: "2025-11-19", priority: "Medium", done: false, related: "Product Design Lab" },
    { id: "t-703", title: "Call Avery about course fit", owner: "Maya Chen", due: "2025-11-20", priority: "High", done: false, related: "Avery Patel" },
    { id: "t-704", title: "Review admission documents", owner: "Noah Price", due: "2025-11-20", priority: "Medium", done: false, related: "Camila Torres" },
    { id: "t-705", title: "Share alumni showcase", owner: "Sofia Reyes", due: "2025-11-21", priority: "Low", done: true, related: "Alumni network" },
    { id: "t-706", title: "Publish November newsletter", owner: "Ari Patel", due: "2025-11-22", priority: "Low", done: false, related: "Community" }
  ],
  activities: [
    { person: "Mateo Alvarez", detail: "completed a lesson in Product Design Lab", time: "8 min ago", kind: "student" },
    { person: "Avery Patel", detail: "asked about the next design cohort", time: "34 min ago", kind: "enquiry" },
    { person: "Camila Torres", detail: "submitted admission documents", time: "1 hour ago", kind: "admission" },
    { person: "Mina Park", detail: "published a new course resource", time: "3 hours ago", kind: "course" }
  ],
  notifications: [
    { id: "n-1", title: "New enquiry from Avery Patel", detail: "Product Design Lab · 8 min ago", unread: true },
    { id: "n-2", title: "Two admissions need a review", detail: "Admissions · 34 min ago", unread: true },
    { id: "n-3", title: "Cohort 07 is almost full", detail: "Product Design Lab · 2 hours ago", unread: true }
  ],
  preferences: { darkMode: false, emailUpdates: true, followUpReminders: true, compactSidebar: false }
};

const sampleAnchor = Date.UTC(2025, 10, 18);
const sampleToday = new Date();
const originalSampleDates = new Map();
Object.values(seedData).filter(Array.isArray).flat().forEach(record => {
  Object.keys(record).forEach(key => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record[key])) return;
    originalSampleDates.set(`${record.id}:${key}`, record[key]);
    const sampleDate = new Date(`${record[key]}T12:00:00`);
    const offset = Math.round((Date.UTC(sampleDate.getFullYear(), sampleDate.getMonth(), sampleDate.getDate()) - sampleAnchor) / 86400000);
    const currentDate = new Date(sampleToday.getFullYear(), sampleToday.getMonth(), sampleToday.getDate() + offset);
    record[key] = [currentDate.getFullYear(), String(currentDate.getMonth() + 1).padStart(2, "0"), String(currentDate.getDate()).padStart(2, "0")].join("-");
  });
});

export function alignSeedRecordDates(workspace) {
  const seedRecords = new Map(Object.values(seedData).filter(Array.isArray).flat().map(record => [record.id, record]));
  Object.values(workspace).filter(Array.isArray).flat().forEach(record => {
    const seedRecord = seedRecords.get(record.id);
    if (!seedRecord) return;
    Object.keys(seedRecord).forEach(key => {
      if (record[key] === originalSampleDates.get(`${record.id}:${key}`)) record[key] = seedRecord[key];
    });
  });
}

const commonStatus = ["Active", "Prospect", "Inactive"];
export const entityConfig = {
  contacts: {
    label: "Contacts", singular: "contact", icon: "users", description: "People make the work. Keep every conversation in context.",
    filterField: "status", filterLabel: "All statuses", filters: ["Active", "Prospect", "Inactive"],
    searchFields: ["name", "email", "phone", "organization", "role"],
    fields: [
      { key: "name", label: "Full name", required: true }, { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "tel" }, { key: "organization", label: "Organization" },
      { key: "role", label: "Role / title" }, { key: "category", label: "Category", type: "select", options: ["Learner", "Partner", "Alumni", "Staff"] },
      { key: "status", label: "Status", type: "select", options: commonStatus }
    ],
    columns: [
      { key: "name", label: "Contact", type: "person", subKey: "email" }, { key: "organization", label: "Organization" },
      { key: "category", label: "Category", type: "category" }, { key: "status", label: "Status", type: "status" }, { key: "updated", label: "Last touched", type: "date" }
    ]
  },
  leads: {
    label: "Leads", singular: "lead", icon: "target", description: "Give every promising conversation a thoughtful next step.",
    filterField: "status", filterLabel: "All stages", filters: ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"],
    searchFields: ["name", "email", "course", "source", "owner"],
    fields: [
      { key: "name", label: "Full name", required: true }, { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "tel" }, { key: "course", label: "Interested course", type: "select", options: courses },
      { key: "source", label: "Source", type: "select", options: ["Website", "Referral", "Webinar", "Partner", "Social", "Organic"] },
      { key: "owner", label: "Assigned to", type: "select", options: ["Maya Chen", "Ari Patel", "Noah Price", "Sofia Reyes"] },
      { key: "status", label: "Stage", type: "select", options: ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"] },
      { key: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] }, { key: "followUp", label: "Next follow-up", type: "date" }
    ],
    columns: [
      { key: "name", label: "Lead", type: "person", subKey: "email" }, { key: "course", label: "Interested in" }, { key: "source", label: "Source" },
      { key: "priority", label: "Priority", type: "status" }, { key: "status", label: "Stage", type: "status" }, { key: "followUp", label: "Follow-up", type: "date" }
    ]
  },
  students: {
    label: "Students", singular: "student", icon: "cap", description: "See each learner’s progress, enrollment and next milestone.",
    filterField: "status", filterLabel: "All statuses", filters: ["Learning", "Completed", "At risk"],
    searchFields: ["name", "email", "course", "payment"],
    fields: [
      { key: "name", label: "Full name", required: true }, { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "tel" }, { key: "course", label: "Enrolled course", type: "select", options: courses },
      { key: "enrolled", label: "Enrollment date", type: "date" }, { key: "progress", label: "Progress (%)", type: "number", min: 0, max: 100 },
      { key: "payment", label: "Payment", type: "select", options: ["Paid", "Pending", "Overdue"] }, { key: "status", label: "Status", type: "select", options: ["Learning", "Completed", "At risk"] }
    ],
    columns: [
      { key: "name", label: "Student", type: "person", subKey: "email" }, { key: "course", label: "Course" }, { key: "progress", label: "Progress", type: "progress" },
      { key: "payment", label: "Payment", type: "status" }, { key: "status", label: "Status", type: "status" }
    ]
  },
  enquiries: {
    label: "Enquiries", singular: "enquiry", icon: "message", description: "Make every first question the start of a useful conversation.",
    filterField: "status", filterLabel: "All statuses", filters: ["New", "Follow-up", "Contacted", "Qualified", "Closed"],
    searchFields: ["name", "email", "course", "source", "owner"],
    fields: [
      { key: "name", label: "Full name", required: true }, { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "tel" }, { key: "course", label: "Interested course", type: "select", options: courses },
      { key: "source", label: "Enquiry source", type: "select", options: ["Website", "Open house", "Referral", "Webinar", "Social", "Partner"] },
      { key: "owner", label: "Assigned to", type: "select", options: ["Maya Chen", "Ari Patel", "Noah Price", "Sofia Reyes"] },
      { key: "date", label: "Enquiry date", type: "date" }, { key: "followUp", label: "Follow-up date", type: "date" },
      { key: "status", label: "Status", type: "select", options: ["New", "Follow-up", "Contacted", "Qualified", "Closed"] }
    ],
    columns: [
      { key: "name", label: "Enquirer", type: "person", subKey: "email" }, { key: "course", label: "Course" }, { key: "source", label: "Source" },
      { key: "owner", label: "Owner" }, { key: "followUp", label: "Follow-up", type: "date" }, { key: "status", label: "Status", type: "status" }
    ]
  },
  courses: {
    label: "Courses", singular: "course", icon: "book", description: "A catalog of practical learning experiences, made by people who do the work.",
    filterField: "category", filterLabel: "All categories", filters: ["Design", "Marketing", "Data", "Leadership", "Technology", "Strategy"],
    searchFields: ["name", "description", "trainer", "category"],
    fields: [
      { key: "name", label: "Course title", required: true }, { key: "category", label: "Category", type: "select", options: ["Design", "Marketing", "Data", "Leadership", "Technology", "Strategy"] },
      { key: "trainer", label: "Trainer", type: "select", options: ["Mina Park", "Nico Reyes", "Ari Patel", "Maya Chen", "Jo Ellis", "Sofia Reyes"] },
      { key: "duration", label: "Duration" }, { key: "enrolled", label: "Enrolled students", type: "number", min: 0 },
      { key: "status", label: "Status", type: "select", options: ["Open", "Waitlist", "Draft", "Archived"] }, { key: "description", label: "Description", type: "textarea", wide: true }
    ]
  },
  tasks: {
    label: "Tasks", singular: "task", icon: "check", description: "Small steps, real momentum. Keep your follow-through visible.",
    filterField: "priority", filterLabel: "All priorities", filters: ["High", "Medium", "Low"],
    searchFields: ["title", "owner", "related", "priority"],
    fields: [
      { key: "title", label: "What needs doing?", required: true }, { key: "owner", label: "Assigned to", type: "select", options: ["Maya Chen", "Ari Patel", "Noah Price", "Sofia Reyes"] },
      { key: "due", label: "Due date", type: "date" }, { key: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
      { key: "related", label: "Related to" }
    ],
    columns: [
      { key: "title", label: "Task", type: "task-title" }, { key: "owner", label: "Owner" }, { key: "related", label: "Related to" },
      { key: "due", label: "Due date", type: "date" }, { key: "priority", label: "Priority", type: "status" }
    ]
  }
};
