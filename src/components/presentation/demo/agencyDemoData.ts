// Agency Demo Data - Hand-written mock data for the Agency View

export interface AgencyWorker {
  id: string;
  name: string;
  agencyId: "AG001" | "AG002" | "AG003";
  status: "active" | "deployed" | "blocked";
  department: string;
  location: string;
  currentShift: string | null;
  executionStatus: "on-track" | "at-risk" | "blocked";
  registeredDate: string;
  complianceStatus: "verified" | "pending" | "expired";
}

export interface AgencyDocument {
  id: string;
  workerId: string;
  name: string;
  type: "contract" | "compliance" | "registration" | "client-required";
  status: "verified" | "pending" | "expired";
  uploadedDate: string;
  expiryDate: string | null;
}

export interface AgencyDeployment {
  id: string;
  workerId: string;
  workerName: string;
  department: string;
  location: string;
  shiftStart: string;
  shiftEnd: string;
  status: "on-site" | "scheduled" | "completed";
  attendanceStatus: "clocked-in" | "clocked-out" | "pending" | "no-show";
}

export interface AgencyIssue {
  id: string;
  workerId: string;
  workerName: string;
  failedStep: string;
  reason: string;
  requiredAction: string;
  severity: "critical" | "warning";
  createdAt: string;
}

export interface Allocation {
  id: string;
  department: string;
  location: string;
  role: string;
  date: string;
  shift: string;
  requestedHeadcount: number;
  assignedWorkers: { workerId: string; workerName: string; status: "confirmed" | "pending" }[];
  status: "filled" | "partial" | "unfilled";
  agencyId?: string;
  agencyName?: string;
}

// ────────────────────────────────────────
// AGENCY WORKERS — 30 total (10 per agency)
// ────────────────────────────────────────

export const agencyWorkers: AgencyWorker[] = [
  // AG001 – Staffmark (5 deployed, 3 active, 2 blocked)
  { id: "AW001", name: "Trevor Pugh", agencyId: "AG001", status: "deployed", department: "Warehouse Operative", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-08-12", complianceStatus: "verified" },
  { id: "AW002", name: "Nina Kowalski", agencyId: "AG001", status: "deployed", department: "MHE", location: "Zone B", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-01-18", complianceStatus: "verified" },
  { id: "AW003", name: "Andre Williams", agencyId: "AG001", status: "deployed", department: "Picker", location: "Zone C", currentShift: "14:00–22:00", executionStatus: "at-risk", registeredDate: "2024-03-05", complianceStatus: "verified" },
  { id: "AW004", name: "Beth Langley", agencyId: "AG001", status: "deployed", department: "Warehouse Operative", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-11-22", complianceStatus: "verified" },
  { id: "AW005", name: "Karl Nilsson", agencyId: "AG001", status: "deployed", department: "Loader", location: "Zone D", currentShift: "14:00–22:00", executionStatus: "on-track", registeredDate: "2024-02-10", complianceStatus: "verified" },
  { id: "AW006", name: "Donna Pryce", agencyId: "AG001", status: "active", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2024-04-15", complianceStatus: "verified" },
  { id: "AW007", name: "Ibrahim Yusuf", agencyId: "AG001", status: "active", department: "Warehouse Operative", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2024-05-20", complianceStatus: "verified" },
  { id: "AW008", name: "Rachael Cope", agencyId: "AG001", status: "active", department: "MHE", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2024-06-01", complianceStatus: "verified" },
  { id: "AW009", name: "Steve Barlow", agencyId: "AG001", status: "blocked", department: "Warehouse Operative", location: "Zone A", currentShift: null, executionStatus: "blocked", registeredDate: "2023-09-14", complianceStatus: "expired" },
  { id: "AW010", name: "Jenny Kildare", agencyId: "AG001", status: "blocked", department: "Loader", location: "Zone D", currentShift: null, executionStatus: "blocked", registeredDate: "2023-07-30", complianceStatus: "expired" },

  // AG002 – Elite Staffing (5 deployed, 3 active, 2 blocked)
  { id: "AW011", name: "Victor Andrade", agencyId: "AG002", status: "deployed", department: "MHE", location: "Zone B", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-10-08", complianceStatus: "verified" },
  { id: "AW012", name: "Grace Nkemelu", agencyId: "AG002", status: "deployed", department: "Warehouse Operative", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-01-25", complianceStatus: "verified" },
  { id: "AW013", name: "Sean Doherty", agencyId: "AG002", status: "deployed", department: "Picker", location: "Zone C", currentShift: "14:00–22:00", executionStatus: "at-risk", registeredDate: "2024-02-14", complianceStatus: "verified" },
  { id: "AW014", name: "Tanya Krol", agencyId: "AG002", status: "deployed", department: "Warehouse Operative", location: "Zone D", currentShift: "22:00–06:00", executionStatus: "on-track", registeredDate: "2023-12-18", complianceStatus: "verified" },
  { id: "AW015", name: "Brendan Hales", agencyId: "AG002", status: "deployed", department: "Loader", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-03-22", complianceStatus: "verified" },
  { id: "AW016", name: "Maisie O'Brien", agencyId: "AG002", status: "active", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2024-05-10", complianceStatus: "verified" },
  { id: "AW017", name: "Kwame Asante", agencyId: "AG002", status: "active", department: "Warehouse Operative", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2024-06-18", complianceStatus: "verified" },
  { id: "AW018", name: "Laura Fenton", agencyId: "AG002", status: "active", department: "MHE", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2024-07-02", complianceStatus: "verified" },
  { id: "AW019", name: "Derek Slade", agencyId: "AG002", status: "blocked", department: "Warehouse Operative", location: "Zone D", currentShift: null, executionStatus: "blocked", registeredDate: "2023-08-28", complianceStatus: "expired" },
  { id: "AW020", name: "Petra Novak", agencyId: "AG002", status: "blocked", department: "Loader", location: "Zone B", currentShift: null, executionStatus: "blocked", registeredDate: "2023-06-15", complianceStatus: "expired" },

  // AG003 – Elwood Staffing (5 deployed, 3 active, 2 blocked)
  { id: "AW021", name: "Damien Cross", agencyId: "AG003", status: "deployed", department: "Warehouse Operative", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-09-30", complianceStatus: "verified" },
  { id: "AW022", name: "Aisha Begum", agencyId: "AG003", status: "deployed", department: "Picker", location: "Zone C", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-02-08", complianceStatus: "verified" },
  { id: "AW023", name: "Colin Burrows", agencyId: "AG003", status: "deployed", department: "MHE", location: "Zone B", currentShift: "14:00–22:00", executionStatus: "at-risk", registeredDate: "2024-01-12", complianceStatus: "verified" },
  { id: "AW024", name: "Elise Morrow", agencyId: "AG003", status: "deployed", department: "Loader", location: "Zone D", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-11-05", complianceStatus: "verified" },
  { id: "AW025", name: "Ray Kapoor", agencyId: "AG003", status: "deployed", department: "Warehouse Operative", location: "Zone A", currentShift: "22:00–06:00", executionStatus: "on-track", registeredDate: "2024-04-01", complianceStatus: "verified" },
  { id: "AW026", name: "Heather Todd", agencyId: "AG003", status: "active", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2024-05-28", complianceStatus: "verified" },
  { id: "AW027", name: "Jerome Baptiste", agencyId: "AG003", status: "active", department: "Warehouse Operative", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2024-06-14", complianceStatus: "verified" },
  { id: "AW028", name: "Sally Kerr", agencyId: "AG003", status: "active", department: "MHE", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2024-07-10", complianceStatus: "verified" },
  { id: "AW029", name: "Malcolm Stead", agencyId: "AG003", status: "blocked", department: "Warehouse Operative", location: "Zone D", currentShift: null, executionStatus: "blocked", registeredDate: "2023-10-20", complianceStatus: "expired" },
  { id: "AW030", name: "Wanda Obi", agencyId: "AG003", status: "blocked", department: "MHE", location: "Zone B", currentShift: null, executionStatus: "blocked", registeredDate: "2023-05-18", complianceStatus: "expired" },
];

// ────────────────────────────────────────
// AGENCY DOCUMENTS — 2-4 per worker
// ────────────────────────────────────────

export const agencyDocuments: AgencyDocument[] = [
  // Staffmark workers
  { id: "D001", workerId: "AW001", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-08-12", expiryDate: null },
  { id: "D002", workerId: "AW001", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-08-12", expiryDate: "2025-08-12" },
  { id: "D003", workerId: "AW001", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-08-15", expiryDate: "2025-08-15" },
  { id: "D004", workerId: "AW002", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-01-18", expiryDate: null },
  { id: "D005", workerId: "AW002", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-01-18", expiryDate: "2026-01-18" },
  { id: "D006", workerId: "AW002", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-01-20", expiryDate: "2025-07-20" },
  { id: "D007", workerId: "AW003", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-03-05", expiryDate: null },
  { id: "D008", workerId: "AW003", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-03-05", expiryDate: "2026-03-05" },
  { id: "D009", workerId: "AW004", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-11-22", expiryDate: null },
  { id: "D010", workerId: "AW004", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-11-22", expiryDate: "2025-11-22" },
  { id: "D011", workerId: "AW004", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-11-25", expiryDate: "2025-11-25" },
  { id: "D012", workerId: "AW005", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-02-10", expiryDate: null },
  { id: "D013", workerId: "AW005", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-02-10", expiryDate: "2026-02-10" },
  { id: "D014", workerId: "AW006", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-04-15", expiryDate: null },
  { id: "D015", workerId: "AW006", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-04-15", expiryDate: "2026-04-15" },
  { id: "D016", workerId: "AW007", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-05-20", expiryDate: null },
  { id: "D017", workerId: "AW007", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-05-20", expiryDate: "2026-05-20" },
  { id: "D018", workerId: "AW007", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2024-05-22", expiryDate: "2026-05-22" },
  { id: "D019", workerId: "AW008", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-06-01", expiryDate: null },
  { id: "D020", workerId: "AW008", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-06-01", expiryDate: "2026-06-01" },
  { id: "D021", workerId: "AW008", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-06-03", expiryDate: "2025-12-03" },
  // Blocked – Staffmark
  { id: "D022", workerId: "AW009", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-09-14", expiryDate: null },
  { id: "D023", workerId: "AW009", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-09-14", expiryDate: "2025-01-14" },
  { id: "D024", workerId: "AW009", name: "Health & Safety Cert", type: "client-required", status: "expired", uploadedDate: "2023-09-16", expiryDate: "2024-09-16" },
  { id: "D025", workerId: "AW010", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-07-30", expiryDate: null },
  { id: "D026", workerId: "AW010", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-07-30", expiryDate: "2024-07-30" },

  // Elite Staffing workers
  { id: "D027", workerId: "AW011", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-10-08", expiryDate: null },
  { id: "D028", workerId: "AW011", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-10-08", expiryDate: "2025-10-08" },
  { id: "D029", workerId: "AW011", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2023-10-10", expiryDate: "2025-04-10" },
  { id: "D030", workerId: "AW012", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-01-25", expiryDate: null },
  { id: "D031", workerId: "AW012", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-01-25", expiryDate: "2026-01-25" },
  { id: "D032", workerId: "AW012", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2024-01-28", expiryDate: "2026-01-28" },
  { id: "D033", workerId: "AW013", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-02-14", expiryDate: null },
  { id: "D034", workerId: "AW013", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-02-14", expiryDate: "2026-02-14" },
  { id: "D035", workerId: "AW014", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-12-18", expiryDate: null },
  { id: "D036", workerId: "AW014", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-12-18", expiryDate: "2025-12-18" },
  { id: "D037", workerId: "AW014", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-12-20", expiryDate: "2025-12-20" },
  { id: "D038", workerId: "AW015", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-03-22", expiryDate: null },
  { id: "D039", workerId: "AW015", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-03-22", expiryDate: "2026-03-22" },
  { id: "D040", workerId: "AW016", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-05-10", expiryDate: null },
  { id: "D041", workerId: "AW016", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-05-10", expiryDate: "2026-05-10" },
  { id: "D042", workerId: "AW017", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-06-18", expiryDate: null },
  { id: "D043", workerId: "AW017", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-06-18", expiryDate: "2026-06-18" },
  { id: "D044", workerId: "AW018", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-07-02", expiryDate: null },
  { id: "D045", workerId: "AW018", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-07-02", expiryDate: "2026-07-02" },
  { id: "D046", workerId: "AW018", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-07-05", expiryDate: "2026-01-05" },
  // Blocked – Elite Staffing
  { id: "D047", workerId: "AW019", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-08-28", expiryDate: null },
  { id: "D048", workerId: "AW019", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-08-28", expiryDate: "2024-12-28" },
  { id: "D049", workerId: "AW019", name: "Health & Safety Cert", type: "client-required", status: "expired", uploadedDate: "2023-08-30", expiryDate: "2024-08-30" },
  { id: "D050", workerId: "AW020", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-06-15", expiryDate: null },
  { id: "D051", workerId: "AW020", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-06-15", expiryDate: "2024-06-15" },

  // Elwood Staffing workers
  { id: "D052", workerId: "AW021", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-09-30", expiryDate: null },
  { id: "D053", workerId: "AW021", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-09-30", expiryDate: "2025-09-30" },
  { id: "D054", workerId: "AW021", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-10-02", expiryDate: "2025-10-02" },
  { id: "D055", workerId: "AW022", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-02-08", expiryDate: null },
  { id: "D056", workerId: "AW022", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-02-08", expiryDate: "2026-02-08" },
  { id: "D057", workerId: "AW023", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-01-12", expiryDate: null },
  { id: "D058", workerId: "AW023", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-01-12", expiryDate: "2026-01-12" },
  { id: "D059", workerId: "AW023", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-01-15", expiryDate: "2025-07-15" },
  { id: "D060", workerId: "AW024", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-11-05", expiryDate: null },
  { id: "D061", workerId: "AW024", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-11-05", expiryDate: "2025-11-05" },
  { id: "D062", workerId: "AW025", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-04-01", expiryDate: null },
  { id: "D063", workerId: "AW025", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-04-01", expiryDate: "2026-04-01" },
  { id: "D064", workerId: "AW025", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2024-04-03", expiryDate: "2026-04-03" },
  { id: "D065", workerId: "AW026", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-05-28", expiryDate: null },
  { id: "D066", workerId: "AW026", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-05-28", expiryDate: "2026-05-28" },
  { id: "D067", workerId: "AW027", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-06-14", expiryDate: null },
  { id: "D068", workerId: "AW027", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-06-14", expiryDate: "2026-06-14" },
  { id: "D069", workerId: "AW028", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-07-10", expiryDate: null },
  { id: "D070", workerId: "AW028", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-07-10", expiryDate: "2026-07-10" },
  { id: "D071", workerId: "AW028", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-07-12", expiryDate: "2026-01-12" },
  // Blocked – Elwood Staffing
  { id: "D072", workerId: "AW029", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-10-20", expiryDate: null },
  { id: "D073", workerId: "AW029", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-10-20", expiryDate: "2025-02-20" },
  { id: "D074", workerId: "AW030", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-05-18", expiryDate: null },
  { id: "D075", workerId: "AW030", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-05-18", expiryDate: "2024-05-18" },
  { id: "D076", workerId: "AW030", name: "MHE License", type: "client-required", status: "expired", uploadedDate: "2023-05-20", expiryDate: "2024-11-20" },
];

// ────────────────────────────────────────
// AGENCY DEPLOYMENTS — 15 total (5 per agency)
// ────────────────────────────────────────

export const agencyDeployments: AgencyDeployment[] = [
  // Staffmark
  { id: "DEP001", workerId: "AW001", workerName: "Trevor Pugh", department: "Warehouse Operative", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP002", workerId: "AW002", workerName: "Nina Kowalski", department: "MHE", location: "Zone B", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP003", workerId: "AW003", workerName: "Andre Williams", department: "Picker", location: "Zone C", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP004", workerId: "AW004", workerName: "Beth Langley", department: "Warehouse Operative", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP005", workerId: "AW005", workerName: "Karl Nilsson", department: "Loader", location: "Zone D", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },

  // Elite Staffing
  { id: "DEP006", workerId: "AW011", workerName: "Victor Andrade", department: "MHE", location: "Zone B", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP007", workerId: "AW012", workerName: "Grace Nkemelu", department: "Warehouse Operative", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP008", workerId: "AW013", workerName: "Sean Doherty", department: "Picker", location: "Zone C", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP009", workerId: "AW014", workerName: "Tanya Krol", department: "Warehouse Operative", location: "Zone D", shiftStart: "22:00", shiftEnd: "06:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP010", workerId: "AW015", workerName: "Brendan Hales", department: "Loader", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "completed", attendanceStatus: "clocked-out" },

  // Elwood Staffing
  { id: "DEP011", workerId: "AW021", workerName: "Damien Cross", department: "Warehouse Operative", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP012", workerId: "AW022", workerName: "Aisha Begum", department: "Picker", location: "Zone C", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP013", workerId: "AW023", workerName: "Colin Burrows", department: "MHE", location: "Zone B", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP014", workerId: "AW024", workerName: "Elise Morrow", department: "Loader", location: "Zone D", shiftStart: "06:00", shiftEnd: "14:00", status: "completed", attendanceStatus: "clocked-out" },
  { id: "DEP015", workerId: "AW025", workerName: "Ray Kapoor", department: "Warehouse Operative", location: "Zone A", shiftStart: "22:00", shiftEnd: "06:00", status: "scheduled", attendanceStatus: "pending" },
];

// ────────────────────────────────────────
// AGENCY ISSUES — 2-3 per agency
// ────────────────────────────────────────

export const agencyIssues: AgencyIssue[] = [
  // Staffmark
  { id: "ISS001", workerId: "AW009", workerName: "Steve Barlow", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2025-01-14" },
  { id: "ISS002", workerId: "AW010", workerName: "Jenny Kildare", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2024-07-30" },
  { id: "ISS003", workerId: "AW003", workerName: "Andre Williams", failedStep: "Attendance", reason: "Late clock-in (18 mins)", requiredAction: "Review and approve exception", severity: "warning", createdAt: "2026-04-10" },

  // Elite Staffing
  { id: "ISS004", workerId: "AW019", workerName: "Derek Slade", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2024-12-28" },
  { id: "ISS005", workerId: "AW020", workerName: "Petra Novak", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2024-06-15" },
  { id: "ISS006", workerId: "AW013", workerName: "Sean Doherty", failedStep: "Attendance", reason: "Late clock-in (9 mins)", requiredAction: "Review and approve exception", severity: "warning", createdAt: "2026-04-09" },

  // Elwood Staffing
  { id: "ISS007", workerId: "AW029", workerName: "Malcolm Stead", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2025-02-20" },
  { id: "ISS008", workerId: "AW030", workerName: "Wanda Obi", failedStep: "Compliance", reason: "I9 Verification and MHE License expired", requiredAction: "Upload valid I9 Verification and renew MHE License", severity: "critical", createdAt: "2024-05-18" },
  { id: "ISS009", workerId: "AW023", workerName: "Colin Burrows", failedStep: "Attendance", reason: "Late clock-in (14 mins)", requiredAction: "Review and approve exception", severity: "warning", createdAt: "2026-04-08" },
];

// ────────────────────────────────────────
// AGENCY STATS
// ────────────────────────────────────────

export const agencyStats = {
  deployedNow: 15,
  totalActive: 24,
  blocked: 6,
  upcomingShifts: 7,
  openIssues: 9,
  criticalIssues: 6,
  atRiskPayroll: 3,
  atRiskBilling: 3,
  registrationsThisWeek: 12,
  registrationsThisMonth: 38,
};

// ────────────────────────────────────────
// ALLOCATIONS — 12 entries across all 3 agencies
// ────────────────────────────────────────

export const allocations: Allocation[] = [
  // Monday – Staffmark
  { id: "ALLOC001", department: "Warehouse Operative", location: "Zone A", role: "Warehouse Operative", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 4, assignedWorkers: [{ workerId: "AW001", workerName: "Trevor Pugh", status: "confirmed" }, { workerId: "AW004", workerName: "Beth Langley", status: "confirmed" }], status: "partial", agencyId: "AG001", agencyName: "Staffmark" },
  { id: "ALLOC002", department: "Picker", location: "Zone C", role: "Picker", date: "Mon 3 Feb", shift: "14:00–22:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW003", workerName: "Andre Williams", status: "confirmed" }, { workerId: "AW006", workerName: "Donna Pryce", status: "pending" }], status: "partial", agencyId: "AG001", agencyName: "Staffmark" },
  { id: "ALLOC003", department: "Loader", location: "Zone D", role: "Loader", date: "Mon 3 Feb", shift: "14:00–22:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW005", workerName: "Karl Nilsson", status: "confirmed" }], status: "partial", agencyId: "AG001", agencyName: "Staffmark" },
  { id: "ALLOC004", department: "MHE", location: "Zone B", role: "MHE Operative", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW002", workerName: "Nina Kowalski", status: "confirmed" }, { workerId: "AW008", workerName: "Rachael Cope", status: "confirmed" }], status: "filled", agencyId: "AG001", agencyName: "Staffmark" },

  // Monday – Elite Staffing
  { id: "ALLOC005", department: "Warehouse Operative", location: "Zone A", role: "Warehouse Operative", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW012", workerName: "Grace Nkemelu", status: "confirmed" }, { workerId: "AW015", workerName: "Brendan Hales", status: "confirmed" }, { workerId: "AW017", workerName: "Kwame Asante", status: "pending" }], status: "filled", agencyId: "AG002", agencyName: "Elite Staffing" },
  { id: "ALLOC006", department: "MHE", location: "Zone B", role: "MHE Operative", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW011", workerName: "Victor Andrade", status: "confirmed" }], status: "partial", agencyId: "AG002", agencyName: "Elite Staffing" },
  { id: "ALLOC007", department: "Warehouse Operative", location: "Zone D", role: "Warehouse Operative", date: "Mon 3 Feb", shift: "22:00–06:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW014", workerName: "Tanya Krol", status: "confirmed" }], status: "partial", agencyId: "AG002", agencyName: "Elite Staffing" },

  // Tuesday – Elite Staffing
  { id: "ALLOC008", department: "Picker", location: "Zone C", role: "Picker", date: "Tue 4 Feb", shift: "14:00–22:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW013", workerName: "Sean Doherty", status: "confirmed" }, { workerId: "AW016", workerName: "Maisie O'Brien", status: "confirmed" }], status: "partial", agencyId: "AG002", agencyName: "Elite Staffing" },

  // Monday – Elwood Staffing
  { id: "ALLOC009", department: "Warehouse Operative", location: "Zone A", role: "Warehouse Operative", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW021", workerName: "Damien Cross", status: "confirmed" }, { workerId: "AW027", workerName: "Jerome Baptiste", status: "pending" }], status: "partial", agencyId: "AG003", agencyName: "Elwood Staffing" },
  { id: "ALLOC010", department: "Picker", location: "Zone C", role: "Picker", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW022", workerName: "Aisha Begum", status: "confirmed" }, { workerId: "AW026", workerName: "Heather Todd", status: "confirmed" }], status: "filled", agencyId: "AG003", agencyName: "Elwood Staffing" },
  { id: "ALLOC011", department: "MHE", location: "Zone B", role: "MHE Operative", date: "Tue 4 Feb", shift: "14:00–22:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW023", workerName: "Colin Burrows", status: "confirmed" }], status: "partial", agencyId: "AG003", agencyName: "Elwood Staffing" },

  // Wednesday – Elwood Staffing
  { id: "ALLOC012", department: "Warehouse Operative", location: "Zone A", role: "Warehouse Operative", date: "Wed 5 Feb", shift: "06:00–14:00", requestedHeadcount: 4, assignedWorkers: [], status: "unfilled", agencyId: "AG003", agencyName: "Elwood Staffing" },
];
