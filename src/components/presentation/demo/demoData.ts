// Shared demo data for all sections

export interface CreditControlDefaults {
  paymentTerms: number;
  contactEmail1: string;
  contactEmail2?: string;
  sendStatements: boolean;
  statementDay?: number;
  copyFinanceProvider: boolean;
  financeProvider?: string;
  configured: boolean;
}

export interface Client {
  id: string;
  name: string;
  agencies: number;
  status: "green" | "amber" | "red";
  creditControl?: CreditControlDefaults;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  clientId: string;
  site: string;
  status: "approved" | "override" | "exception";
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  date: string;
  clientId: string;
  clientName: string;
  weekEnding: string;
  workerId: string;
  workerName: string;
  eventType: string;
  status: "verified" | "flagged" | "overridden";
  actor: "System" | "Client Manager" | "Agency Admin";
  actorName?: string;
  referenceId: string;
  includedInAuditPack: boolean;
  resolution?: {
    by: string;
    reason: string;
    timestamp: string;
  };
  linkedEvents?: string[];
  evidence?: string[];
  // Credit control fields for invoice export events
  invoiceExport?: {
    invoiceTotal: number;
    paymentTerms: number;
    recipients: string[];
    financeProviderCopied: boolean;
    financeProvider?: string;
    exportMethod: "secure-link" | "email-attachment";
  };
}

export interface Exception {
  id: string;
  priority: "P1" | "P2" | "P3";
  clientId: string;
  clientName: string;
  weekEnding: string;
  workerId: string;
  workerName: string;
  workerRole: string;
  site: string;
  exceptionType: string;
  aging: string;
  agingHours: number;
  impact: ("Payroll" | "Invoice")[];
  status: "Open" | "In Review" | "Resolved" | "Resolved with override";
  owner: string | null;
  slaHours: number;
  blocksInvoiceReady: boolean;
  scheduledHours: number;
  clockedHours: number;
  approvedHours: number;
  resolution?: {
    method: "correction" | "override" | "escalation";
    by: string;
    timestamp: string;
    reason: string;
    correctedValue?: number;
  };
}

export interface InvoiceExportRecord {
  id: string;
  clientId: string;
  clientName: string;
  weekEnding: string;
  invoiceTotal: number;
  paymentTerms: number;
  recipients: string[];
  financeProviderCopied: boolean;
  financeProvider?: string;
  exportMethod: "secure-link" | "email-attachment";
  exportedAt: string;
  exportedBy: string;
  paymentStatus: "Sent" | "Viewed" | "Due" | "Overdue" | "Paid";
  dueDate: string;
}

export const clients: Client[] = [
  { 
    id: "1", 
    name: "DO&CO", 
    agencies: 3, 
    status: "green",
    creditControl: {
      paymentTerms: 30,
      contactEmail1: "accounts@doco.com",
      sendStatements: true,
      statementDay: 1,
      copyFinanceProvider: false,
      configured: true,
    }
  },
  { 
    id: "2", 
    name: "DHL", 
    agencies: 2, 
    status: "green",
    creditControl: {
      paymentTerms: 45,
      contactEmail1: "ap@dhl.com",
      contactEmail2: "finance@dhl.com",
      sendStatements: true,
      statementDay: 15,
      copyFinanceProvider: true,
      financeProvider: "ultimate",
      configured: true,
    }
  },
  { 
    id: "3", 
    name: "ID LOGISTICS", 
    agencies: 4, 
    status: "amber",
    creditControl: {
      paymentTerms: 30,
      contactEmail1: "invoices@idlogistics.com",
      sendStatements: false,
      copyFinanceProvider: false,
      configured: true,
    }
  },
  { 
    id: "4", 
    name: "BOMBAY HALWA", 
    agencies: 1, 
    status: "green",
    creditControl: {
      paymentTerms: 30,
      contactEmail1: "",
      sendStatements: false,
      copyFinanceProvider: false,
      configured: false,
    }
  },
  { 
    id: "5", 
    name: "DSI FOODS", 
    agencies: 2, 
    status: "red",
    creditControl: {
      paymentTerms: 14,
      contactEmail1: "payments@dsifoods.com",
      sendStatements: false,
      copyFinanceProvider: false,
      configured: true,
    }
  },
];

export const workers: Worker[] = [
  { id: "w1", name: "John Patel", role: "Warehouse Operative", clientId: "1", site: "Heathrow", status: "approved" },
  { id: "w2", name: "Maria Santos", role: "Picker", clientId: "1", site: "Heathrow", status: "approved" },
  { id: "w3", name: "Ahmed Khan", role: "Forklift Driver", clientId: "2", site: "Coventry Hub", status: "override" },
  { id: "w4", name: "Lucy Brown", role: "Team Lead", clientId: "3", site: "Birmingham DC", status: "approved" },
  { id: "w5", name: "Tomasz Nowak", role: "Warehouse Operative", clientId: "5", site: "Leeds", status: "exception" },
  { id: "w6", name: "Priya Sharma", role: "Quality Controller", clientId: "4", site: "Leicester", status: "approved" },
  { id: "w7", name: "James Wilson", role: "Loader", clientId: "2", site: "Coventry Hub", status: "approved" },
  { id: "w8", name: "Fatima Ali", role: "Packer", clientId: "3", site: "Birmingham DC", status: "override" },
];

export const weekOptions = [
  { value: "2026-04-07", label: "Week ending 07 Apr 2026" },
  { value: "2026-04-14", label: "Week ending 14 Apr 2026" },
  { value: "2026-04-21", label: "Week ending 21 Apr 2026" },
];

export const auditEvents: AuditEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-04-05 09:15:22",
    date: "05 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    eventType: "Clock-in captured",
    status: "verified",
    actor: "System",
    referenceId: "TL-2026-04-001234",
    includedInAuditPack: true,
    evidence: ["Timesheet snapshot", "GPS verification"],
  },
  {
    id: "evt-002",
    timestamp: "2026-04-05 17:45:11",
    date: "05 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    eventType: "Clock-out captured",
    status: "verified",
    actor: "System",
    referenceId: "TL-2026-04-001235",
    includedInAuditPack: true,
  },
  {
    id: "evt-003",
    timestamp: "2026-04-06 10:15:00",
    date: "06 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    eventType: "Hours approved",
    status: "verified",
    actor: "Client Manager",
    actorName: "Sarah Mitchell",
    referenceId: "TL-2026-04-001236",
    includedInAuditPack: true,
  },
  {
    id: "evt-004",
    timestamp: "2026-04-06 10:18:33",
    date: "06 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    eventType: "Rate validated",
    status: "flagged",
    actor: "System",
    referenceId: "TL-2026-04-001237",
    includedInAuditPack: true,
  },
  {
    id: "evt-005",
    timestamp: "2026-04-06 11:45:00",
    date: "06 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    eventType: "Exception resolved",
    status: "overridden",
    actor: "Agency Admin",
    actorName: "Usman Iftikhar",
    referenceId: "TL-2026-04-001238",
    includedInAuditPack: true,
    resolution: {
      by: "Usman Iftikhar",
      reason: "Overtime rate corrected per contract clause 4.2",
      timestamp: "2026-04-06 11:45:00",
    },
  },
  {
    id: "evt-006",
    timestamp: "2026-04-07 09:00:00",
    date: "07 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    eventType: "Payroll approved",
    status: "verified",
    actor: "System",
    referenceId: "TL-2026-04-001239",
    includedInAuditPack: true,
  },
  {
    id: "evt-007",
    timestamp: "2026-04-07 09:05:00",
    date: "07 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    eventType: "Invoice approved",
    status: "verified",
    actor: "System",
    referenceId: "TL-2026-04-001240",
    includedInAuditPack: true,
  },
  {
    id: "evt-008",
    timestamp: "2026-04-05 08:00:00",
    date: "05 Apr 2026",
    clientId: "1",
    clientName: "DO&CO",
    weekEnding: "2026-04-07",
    workerId: "w1",
    workerName: "John Patel",
    eventType: "Clock-in captured",
    status: "verified",
    actor: "System",
    referenceId: "TL-2026-04-001241",
    includedInAuditPack: true,
  },
  {
    id: "evt-009",
    timestamp: "2026-04-06 14:30:00",
    date: "06 Apr 2026",
    clientId: "5",
    clientName: "DSI FOODS",
    weekEnding: "2026-04-07",
    workerId: "w5",
    workerName: "Tomasz Nowak",
    eventType: "Hours approved",
    status: "flagged",
    actor: "System",
    referenceId: "TL-2026-04-001242",
    includedInAuditPack: false,
  },
  {
    id: "evt-010",
    timestamp: "2026-04-06 09:00:00",
    date: "06 Apr 2026",
    clientId: "3",
    clientName: "ID LOGISTICS",
    weekEnding: "2026-04-07",
    workerId: "w8",
    workerName: "Fatima Ali",
    eventType: "Rate validated",
    status: "overridden",
    actor: "Agency Admin",
    actorName: "Usman Iftikhar",
    referenceId: "TL-2026-04-001243",
    includedInAuditPack: true,
    resolution: {
      by: "Usman Iftikhar",
      reason: "Bank holiday rate applied retrospectively",
      timestamp: "2026-04-06 09:00:00",
    },
  },
  // Invoice export event for DHL with finance provider copied
  {
    id: "evt-011",
    timestamp: "2026-04-07 14:30:00",
    date: "07 Apr 2026",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "",
    workerName: "All Workers",
    eventType: "Invoice exported",
    status: "verified",
    actor: "Agency Admin",
    actorName: "Usman Iftikhar",
    referenceId: "TL-2026-04-001244",
    includedInAuditPack: true,
    invoiceExport: {
      invoiceTotal: 12450,
      paymentTerms: 45,
      recipients: ["ap@dhl.com", "finance@dhl.com"],
      financeProviderCopied: true,
      financeProvider: "Ultimate Finance",
      exportMethod: "secure-link",
    },
  },
  // Invoice export event for DO&CO without finance provider
  {
    id: "evt-012",
    timestamp: "2026-04-07 15:00:00",
    date: "07 Apr 2026",
    clientId: "1",
    clientName: "DO&CO",
    weekEnding: "2026-04-07",
    workerId: "",
    workerName: "All Workers",
    eventType: "Invoice exported",
    status: "verified",
    actor: "Agency Admin",
    actorName: "Usman Iftikhar",
    referenceId: "TL-2026-04-001245",
    includedInAuditPack: true,
    invoiceExport: {
      invoiceTotal: 8920,
      paymentTerms: 30,
      recipients: ["accounts@doco.com"],
      financeProviderCopied: false,
      exportMethod: "secure-link",
    },
  },
];

export const exceptions: Exception[] = [
  {
    id: "exc-001",
    priority: "P1",
    clientId: "5",
    clientName: "DSI FOODS",
    weekEnding: "2026-04-07",
    workerId: "w5",
    workerName: "Tomasz Nowak",
    workerRole: "Warehouse Operative",
    site: "Leeds",
    exceptionType: "Hours mismatch",
    aging: "18h",
    agingHours: 18,
    impact: ["Payroll", "Invoice"],
    status: "Open",
    owner: null,
    slaHours: 6,
    blocksInvoiceReady: true,
    scheduledHours: 40,
    clockedHours: 44,
    approvedHours: 40,
  },
  {
    id: "exc-002",
    priority: "P2",
    clientId: "2",
    clientName: "DHL",
    weekEnding: "2026-04-07",
    workerId: "w3",
    workerName: "Ahmed Khan",
    workerRole: "Forklift Driver",
    site: "Coventry Hub",
    exceptionType: "Rate validation failed",
    aging: "Resolved",
    agingHours: 0,
    impact: ["Payroll", "Invoice"],
    status: "Resolved with override",
    owner: "Usman Iftikhar",
    slaHours: 0,
    blocksInvoiceReady: false,
    scheduledHours: 40,
    clockedHours: 42,
    approvedHours: 42,
    resolution: {
      method: "override",
      by: "Usman Iftikhar",
      timestamp: "2026-04-06 11:45:00",
      reason: "Overtime rate corrected per contract clause 4.2",
    },
  },
  {
    id: "exc-003",
    priority: "P3",
    clientId: "3",
    clientName: "ID LOGISTICS",
    weekEnding: "2026-04-07",
    workerId: "w8",
    workerName: "Fatima Ali",
    workerRole: "Packer",
    site: "Birmingham DC",
    exceptionType: "Bank holiday rate query",
    aging: "Resolved",
    agingHours: 0,
    impact: ["Invoice"],
    status: "Resolved with override",
    owner: "Usman Iftikhar",
    slaHours: 0,
    blocksInvoiceReady: false,
    scheduledHours: 32,
    clockedHours: 32,
    approvedHours: 32,
    resolution: {
      method: "override",
      by: "Usman Iftikhar",
      timestamp: "2026-04-06 09:00:00",
      reason: "Bank holiday rate applied retrospectively",
    },
  },
  {
    id: "exc-004",
    priority: "P2",
    clientId: "1",
    clientName: "DO&CO",
    weekEnding: "2026-04-14",
    workerId: "w2",
    workerName: "Maria Santos",
    workerRole: "Picker",
    site: "Heathrow",
    exceptionType: "Missing clock-out",
    aging: "4h",
    agingHours: 4,
    impact: ["Payroll"],
    status: "In Review",
    owner: "Finance Team",
    slaHours: 12,
    blocksInvoiceReady: false,
    scheduledHours: 40,
    clockedHours: 38,
    approvedHours: 0,
  },
];

export const reportData = {
  invoiceReadiness: {
    currentWeekPercent: 87,
    disputesCount: 3,
    creditNotesValue: 1250,
    weeklyTrend: [
      { week: "W13", percent: 92, disputes: 1 },
      { week: "W14", percent: 88, disputes: 2 },
      { week: "W15", percent: 87, disputes: 3 },
    ],
  },
  payrollIntegrity: {
    payQueryVolume: 12,
    overrideCount: 5,
    lateApprovals: 8,
  },
  agencyPerformance: {
    fillReliability: 94,
    avgApprovalSpeed: "4.2h",
    exceptionRatePerSite: 2.3,
  },
  processThroughput: {
    shiftToApproval: "18h",
    approvalToPayroll: "6h",
    payrollToInvoice: "2h",
  },
  creditControl: {
    avgDaysToPay: 32,
    invoiceDisputesCount: 3,
    creditNotesCount: 2,
    creditNotesValue: 1250,
    invoicesWithFinanceProvider: 67,
    clientBreakdown: [
      { clientId: "1", clientName: "DO&CO", terms: 30, statementsOn: true, financeProviderCopied: false, lastExport: "2026-04-07" },
      { clientId: "2", clientName: "DHL", terms: 45, statementsOn: true, financeProviderCopied: true, lastExport: "2026-04-07" },
      { clientId: "3", clientName: "ID LOGISTICS", terms: 30, statementsOn: false, financeProviderCopied: false, lastExport: "2026-04-01" },
      { clientId: "4", clientName: "BOMBAY HALWA", terms: 30, statementsOn: false, financeProviderCopied: false, lastExport: null },
      { clientId: "5", clientName: "DSI FOODS", terms: 14, statementsOn: false, financeProviderCopied: false, lastExport: "2026-03-28" },
    ],
  },
};

export const users = [
  { id: "u1", name: "Usman Iftikhar", email: "usman@agency.com", role: "Admin" },
  { id: "u2", name: "Sarah Mitchell", email: "sarah@client.com", role: "Client Viewer" },
  { id: "u3", name: "Finance Team", email: "finance@agency.com", role: "Finance" },
  { id: "u4", name: "James Roberts", email: "james@agency.com", role: "Ops" },
];

export const sites = [
  { id: "s1", clientId: "1", name: "Heathrow", manager: "Sarah Mitchell", slaHours: 24 },
  { id: "s2", clientId: "2", name: "Coventry Hub", manager: "Mark Thompson", slaHours: 24 },
  { id: "s3", clientId: "3", name: "Birmingham DC", manager: "Emma Jones", slaHours: 48 },
  { id: "s4", clientId: "4", name: "Leicester", manager: "Raj Patel", slaHours: 24 },
  { id: "s5", clientId: "5", name: "Leeds", manager: "John Smith", slaHours: 24 },
];
