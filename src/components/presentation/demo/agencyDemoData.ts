// Agency Demo Data - Hand-written mock data for the Agency View

export interface AgencyWorker {
  id: string;
  name: string;
  agencyId: "AG001" | "AG002" | "AG003";
  status: "active" | "deployed" | "blocked" | "new-registered";
  department: string;
  location: string;
  currentShift: string | null;
  executionStatus: "on-track" | "at-risk" | "blocked";
  registeredDate: string;
  complianceStatus: "verified" | "pending" | "expired";
  distanceMiles: number;
  etaMinutes: number;
  hourlyRate: number;
  completedShifts: number;
  punctualityScore: number;
  rating: number;
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
  agencyId: "AG001" | "AG002" | "AG003";
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
// AGENCY WORKERS — 45 total (15 per agency)
// Per agency: 6 deployed, 4 active, 3 new-registered, 2 blocked
// ────────────────────────────────────────

export const agencyWorkers: AgencyWorker[] = [
  // ═══ AG001 – Workforce Direct ═══
  // Deployed (6)
  { id: "AW001", name: "Yuki Tanaka", agencyId: "AG001", status: "deployed", department: "Inbound Warehouse", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-08-12", complianceStatus: "verified", distanceMiles: 2.4, etaMinutes: 10, hourlyRate: 13.00, completedShifts: 186, punctualityScore: 96, rating: 4.7 },
  { id: "AW002", name: "Rico Fernandez", agencyId: "AG001", status: "deployed", department: "MHE", location: "Zone B", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-01-18", complianceStatus: "verified", distanceMiles: 3.8, etaMinutes: 15, hourlyRate: 14.50, completedShifts: 142, punctualityScore: 94, rating: 4.6 },
  { id: "AW003", name: "Fatima Al-Hassan", agencyId: "AG001", status: "deployed", department: "Picker", location: "Zone C", currentShift: "14:00–22:00", executionStatus: "at-risk", registeredDate: "2024-03-05", complianceStatus: "verified", distanceMiles: 5.1, etaMinutes: 20, hourlyRate: 12.50, completedShifts: 98, punctualityScore: 78, rating: 3.8 },
  { id: "AW004", name: "Emma Johansson", agencyId: "AG001", status: "deployed", department: "Loader", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-11-22", complianceStatus: "verified", distanceMiles: 1.6, etaMinutes: 5, hourlyRate: 12.80, completedShifts: 210, punctualityScore: 97, rating: 4.9 },
  { id: "AW005", name: "Fatima Al-Hassan", agencyId: "AG001", status: "deployed", department: "Forklift", location: "Zone D", currentShift: "14:00–22:00", executionStatus: "on-track", registeredDate: "2024-02-10", complianceStatus: "verified", distanceMiles: 4.2, etaMinutes: 15, hourlyRate: 14.00, completedShifts: 118, punctualityScore: 93, rating: 4.5 },
  { id: "AW006", name: "Emma Johansson", agencyId: "AG001", status: "deployed", department: "Inbound Warehouse", location: "Zone B", currentShift: "22:00–06:00", executionStatus: "on-track", registeredDate: "2024-04-15", complianceStatus: "verified", distanceMiles: 3.0, etaMinutes: 10, hourlyRate: 13.20, completedShifts: 74, punctualityScore: 91, rating: 4.3 },
  // Active (4)
  { id: "AW007", name: "Marcus Webb", agencyId: "AG001", status: "active", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2024-05-20", complianceStatus: "verified", distanceMiles: 6.5, etaMinutes: 25, hourlyRate: 12.00, completedShifts: 56, punctualityScore: 88, rating: 4.1 },
  { id: "AW008", name: "Fatima Al-Hassan", agencyId: "AG001", status: "active", department: "MHE", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2024-06-01", complianceStatus: "verified", distanceMiles: 2.8, etaMinutes: 10, hourlyRate: 14.20, completedShifts: 48, punctualityScore: 92, rating: 4.4 },
  { id: "AW009", name: "Tom Brady", agencyId: "AG001", status: "active", department: "Inbound Warehouse", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2024-07-15", complianceStatus: "verified", distanceMiles: 1.9, etaMinutes: 10, hourlyRate: 12.50, completedShifts: 32, punctualityScore: 90, rating: 4.2 },
  { id: "AW010", name: "Marcus Webb", agencyId: "AG001", status: "active", department: "Loader", location: "Zone D", currentShift: null, executionStatus: "on-track", registeredDate: "2024-08-10", complianceStatus: "verified", distanceMiles: 7.2, etaMinutes: 30, hourlyRate: 12.60, completedShifts: 22, punctualityScore: 85, rating: 3.9 },
  // New Registered (3)
  { id: "AW011", name: "Tom Brady", agencyId: "AG001", status: "new-registered", department: "Inbound Warehouse", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2026-03-28", complianceStatus: "verified", distanceMiles: 3.4, etaMinutes: 15, hourlyRate: 12.00, completedShifts: 0, punctualityScore: 0, rating: 0 },
  { id: "AW012", name: "Ana Pereira", agencyId: "AG001", status: "new-registered", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2026-04-02", complianceStatus: "pending", distanceMiles: 4.8, etaMinutes: 20, hourlyRate: 12.00, completedShifts: 0, punctualityScore: 0, rating: 0 },
  { id: "AW013", name: "Ana Pereira", agencyId: "AG001", status: "new-registered", department: "MHE", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2026-04-08", complianceStatus: "pending", distanceMiles: 5.6, etaMinutes: 20, hourlyRate: 14.00, completedShifts: 0, punctualityScore: 0, rating: 0 },
  // Blocked (2)
  { id: "AW014", name: "Rico Fernandez", agencyId: "AG001", status: "blocked", department: "Inbound Warehouse", location: "Zone A", currentShift: null, executionStatus: "blocked", registeredDate: "2023-09-14", complianceStatus: "expired", distanceMiles: 2.1, etaMinutes: 10, hourlyRate: 12.50, completedShifts: 180, punctualityScore: 82, rating: 3.6 },
  { id: "AW015", name: "Aisha Nwosu", agencyId: "AG001", status: "blocked", department: "Forklift", location: "Zone D", currentShift: null, executionStatus: "blocked", registeredDate: "2023-07-30", complianceStatus: "expired", distanceMiles: 8.0, etaMinutes: 30, hourlyRate: 14.00, completedShifts: 220, punctualityScore: 71, rating: 3.4 },

  // ═══ AG002 – Pinnacle Staffing ═══
  // Deployed (6)
  { id: "AW016", name: "Aisha Nwosu", agencyId: "AG002", status: "deployed", department: "MHE", location: "Zone B", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-10-08", complianceStatus: "verified", distanceMiles: 1.8, etaMinutes: 5, hourlyRate: 15.00, completedShifts: 194, punctualityScore: 98, rating: 4.9 },
  { id: "AW017", name: "Daniel Reeves", agencyId: "AG002", status: "deployed", department: "Inbound Warehouse", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-01-25", complianceStatus: "verified", distanceMiles: 2.6, etaMinutes: 10, hourlyRate: 13.50, completedShifts: 148, punctualityScore: 96, rating: 4.8 },
  { id: "AW018", name: "Leon Kowalski", agencyId: "AG002", status: "deployed", department: "Picker", location: "Zone C", currentShift: "14:00–22:00", executionStatus: "at-risk", registeredDate: "2024-02-14", complianceStatus: "verified", distanceMiles: 4.0, etaMinutes: 15, hourlyRate: 13.00, completedShifts: 112, punctualityScore: 81, rating: 3.9 },
  { id: "AW019", name: "Sarah Mitchell", agencyId: "AG002", status: "deployed", department: "Loader", location: "Zone D", currentShift: "22:00–06:00", executionStatus: "on-track", registeredDate: "2023-12-18", complianceStatus: "verified", distanceMiles: 3.2, etaMinutes: 15, hourlyRate: 13.80, completedShifts: 162, punctualityScore: 95, rating: 4.7 },
  { id: "AW020", name: "Sarah Mitchell", agencyId: "AG002", status: "deployed", department: "Inbound Warehouse", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-03-22", complianceStatus: "verified", distanceMiles: 1.2, etaMinutes: 5, hourlyRate: 13.50, completedShifts: 104, punctualityScore: 97, rating: 4.8 },
  { id: "AW021", name: "Chris Donnelly", agencyId: "AG002", status: "deployed", department: "Forklift", location: "Zone B", currentShift: "14:00–22:00", executionStatus: "on-track", registeredDate: "2024-04-10", complianceStatus: "verified", distanceMiles: 2.0, etaMinutes: 10, hourlyRate: 15.50, completedShifts: 88, punctualityScore: 94, rating: 4.6 },
  // Active (4)
  { id: "AW022", name: "Maisie O'Brien", agencyId: "AG002", status: "active", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2024-05-10", complianceStatus: "verified", distanceMiles: 3.6, etaMinutes: 15, hourlyRate: 13.00, completedShifts: 64, punctualityScore: 93, rating: 4.5 },
  { id: "AW023", name: "Aisha Nwosu", agencyId: "AG002", status: "active", department: "Inbound Warehouse", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2024-06-18", complianceStatus: "verified", distanceMiles: 2.4, etaMinutes: 10, hourlyRate: 13.50, completedShifts: 42, punctualityScore: 91, rating: 4.3 },
  { id: "AW024", name: "James Okafor", agencyId: "AG002", status: "active", department: "MHE", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2024-07-02", complianceStatus: "verified", distanceMiles: 1.5, etaMinutes: 5, hourlyRate: 15.00, completedShifts: 36, punctualityScore: 95, rating: 4.6 },
  { id: "AW025", name: "Aisha Nwosu", agencyId: "AG002", status: "active", department: "Loader", location: "Zone D", currentShift: null, executionStatus: "on-track", registeredDate: "2024-08-05", complianceStatus: "verified", distanceMiles: 5.4, etaMinutes: 20, hourlyRate: 13.80, completedShifts: 28, punctualityScore: 89, rating: 4.2 },
  // New Registered (3)
  { id: "AW026", name: "Sarah Mitchell", agencyId: "AG002", status: "new-registered", department: "Inbound Warehouse", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2026-03-25", complianceStatus: "verified", distanceMiles: 2.2, etaMinutes: 10, hourlyRate: 13.00, completedShifts: 0, punctualityScore: 0, rating: 0 },
  { id: "AW027", name: "Fatima Al-Hassan", agencyId: "AG002", status: "new-registered", department: "Forklift", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2026-04-05", complianceStatus: "pending", distanceMiles: 3.0, etaMinutes: 10, hourlyRate: 15.00, completedShifts: 0, punctualityScore: 0, rating: 0 },
  { id: "AW028", name: "Diane Foster", agencyId: "AG002", status: "new-registered", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2026-04-10", complianceStatus: "pending", distanceMiles: 4.6, etaMinutes: 20, hourlyRate: 13.00, completedShifts: 0, punctualityScore: 0, rating: 0 },
  // Blocked (2)
  { id: "AW029", name: "Chris Donnelly", agencyId: "AG002", status: "blocked", department: "Inbound Warehouse", location: "Zone D", currentShift: null, executionStatus: "blocked", registeredDate: "2023-08-28", complianceStatus: "expired", distanceMiles: 6.8, etaMinutes: 25, hourlyRate: 13.50, completedShifts: 198, punctualityScore: 76, rating: 3.5 },
  { id: "AW030", name: "Priya Sharma", agencyId: "AG002", status: "blocked", department: "MHE", location: "Zone B", currentShift: null, executionStatus: "blocked", registeredDate: "2023-06-15", complianceStatus: "expired", distanceMiles: 9.2, etaMinutes: 35, hourlyRate: 15.00, completedShifts: 216, punctualityScore: 73, rating: 3.4 },

  // ═══ AG003 – Meridian Recruitment ═══
  // Deployed (6)
  { id: "AW031", name: "Sarah Mitchell", agencyId: "AG003", status: "deployed", department: "Inbound Warehouse", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-09-30", complianceStatus: "verified", distanceMiles: 4.6, etaMinutes: 20, hourlyRate: 12.00, completedShifts: 172, punctualityScore: 90, rating: 4.3 },
  { id: "AW032", name: "Tom Brady", agencyId: "AG003", status: "deployed", department: "Picker", location: "Zone C", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-02-08", complianceStatus: "verified", distanceMiles: 6.0, etaMinutes: 25, hourlyRate: 11.80, completedShifts: 108, punctualityScore: 87, rating: 4.1 },
  { id: "AW033", name: "Emma Johansson", agencyId: "AG003", status: "deployed", department: "MHE", location: "Zone B", currentShift: "14:00–22:00", executionStatus: "at-risk", registeredDate: "2024-01-12", complianceStatus: "verified", distanceMiles: 5.4, etaMinutes: 20, hourlyRate: 13.50, completedShifts: 130, punctualityScore: 79, rating: 3.7 },
  { id: "AW034", name: "James Okafor", agencyId: "AG003", status: "deployed", department: "Loader", location: "Zone D", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2023-11-05", complianceStatus: "verified", distanceMiles: 7.8, etaMinutes: 30, hourlyRate: 12.20, completedShifts: 158, punctualityScore: 88, rating: 4.0 },
  { id: "AW035", name: "Emma Johansson", agencyId: "AG003", status: "deployed", department: "Inbound Warehouse", location: "Zone A", currentShift: "22:00–06:00", executionStatus: "on-track", registeredDate: "2024-04-01", complianceStatus: "verified", distanceMiles: 3.6, etaMinutes: 15, hourlyRate: 12.00, completedShifts: 62, punctualityScore: 86, rating: 4.0 },
  { id: "AW036", name: "Aisha Nwosu", agencyId: "AG003", status: "deployed", department: "Forklift", location: "Zone D", currentShift: "14:00–22:00", executionStatus: "on-track", registeredDate: "2024-03-18", complianceStatus: "verified", distanceMiles: 8.4, etaMinutes: 35, hourlyRate: 13.20, completedShifts: 78, punctualityScore: 84, rating: 3.8 },
  // Active (4)
  { id: "AW037", name: "Sarah Mitchell", agencyId: "AG003", status: "active", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2024-05-28", complianceStatus: "verified", distanceMiles: 5.0, etaMinutes: 20, hourlyRate: 11.50, completedShifts: 44, punctualityScore: 83, rating: 3.9 },
  { id: "AW038", name: "James Okafor", agencyId: "AG003", status: "active", department: "Inbound Warehouse", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2024-06-14", complianceStatus: "verified", distanceMiles: 6.8, etaMinutes: 25, hourlyRate: 12.00, completedShifts: 36, punctualityScore: 85, rating: 4.0 },
  { id: "AW039", name: "Diane Foster", agencyId: "AG003", status: "active", department: "MHE", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2024-07-10", complianceStatus: "verified", distanceMiles: 4.2, etaMinutes: 15, hourlyRate: 13.50, completedShifts: 28, punctualityScore: 81, rating: 3.8 },
  { id: "AW040", name: "Leon Kowalski", agencyId: "AG003", status: "active", department: "Loader", location: "Zone D", currentShift: null, executionStatus: "on-track", registeredDate: "2024-08-22", complianceStatus: "verified", distanceMiles: 10.2, etaMinutes: 40, hourlyRate: 12.00, completedShifts: 18, punctualityScore: 80, rating: 3.7 },
  // New Registered (3)
  { id: "AW041", name: "Aisha Nwosu", agencyId: "AG003", status: "new-registered", department: "Inbound Warehouse", location: "Zone A", currentShift: null, executionStatus: "on-track", registeredDate: "2026-03-22", complianceStatus: "verified", distanceMiles: 3.2, etaMinutes: 15, hourlyRate: 11.50, completedShifts: 0, punctualityScore: 0, rating: 0 },
  { id: "AW042", name: "Marcus Webb", agencyId: "AG003", status: "new-registered", department: "MHE", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2026-04-01", complianceStatus: "pending", distanceMiles: 7.0, etaMinutes: 30, hourlyRate: 13.00, completedShifts: 0, punctualityScore: 0, rating: 0 },
  { id: "AW043", name: "Daniel Reeves", agencyId: "AG003", status: "new-registered", department: "Picker", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2026-04-09", complianceStatus: "pending", distanceMiles: 5.8, etaMinutes: 25, hourlyRate: 11.50, completedShifts: 0, punctualityScore: 0, rating: 0 },
  // Blocked (2)
  { id: "AW044", name: "Yuki Tanaka", agencyId: "AG003", status: "blocked", department: "Inbound Warehouse", location: "Zone D", currentShift: null, executionStatus: "blocked", registeredDate: "2023-10-20", complianceStatus: "expired", distanceMiles: 11.0, etaMinutes: 45, hourlyRate: 12.00, completedShifts: 200, punctualityScore: 74, rating: 3.5 },
  { id: "AW045", name: "Ana Pereira", agencyId: "AG003", status: "blocked", department: "MHE", location: "Zone B", currentShift: null, executionStatus: "blocked", registeredDate: "2023-05-18", complianceStatus: "expired", distanceMiles: 9.6, etaMinutes: 40, hourlyRate: 13.50, completedShifts: 190, punctualityScore: 72, rating: 3.4 },
];

// ────────────────────────────────────────
// AGENCY DOCUMENTS — 2-4 per worker (45 workers = ~130 docs)
// ────────────────────────────────────────

export const agencyDocuments: AgencyDocument[] = [
  // ═══ AG001 Workforce Direct ═══
  // AW001 – Yuki Tanaka (deployed)
  { id: "D001", workerId: "AW001", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-08-12", expiryDate: null },
  { id: "D002", workerId: "AW001", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-08-12", expiryDate: "2025-08-12" },
  { id: "D003", workerId: "AW001", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-08-15", expiryDate: "2025-08-15" },
  // AW002 – Rico Fernandez (deployed)
  { id: "D004", workerId: "AW002", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-01-18", expiryDate: null },
  { id: "D005", workerId: "AW002", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-01-18", expiryDate: "2026-01-18" },
  { id: "D006", workerId: "AW002", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-01-20", expiryDate: "2025-07-20" },
  // AW003 – Fatima Al-Hassan (deployed)
  { id: "D007", workerId: "AW003", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-03-05", expiryDate: null },
  { id: "D008", workerId: "AW003", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-03-05", expiryDate: "2026-03-05" },
  // AW004 – Emma Johansson (deployed)
  { id: "D009", workerId: "AW004", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-11-22", expiryDate: null },
  { id: "D010", workerId: "AW004", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-11-22", expiryDate: "2025-11-22" },
  { id: "D011", workerId: "AW004", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-11-25", expiryDate: "2025-11-25" },
  // AW005 – Fatima Al-Hassan (deployed)
  { id: "D012", workerId: "AW005", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-02-10", expiryDate: null },
  { id: "D013", workerId: "AW005", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-02-10", expiryDate: "2026-02-10" },
  { id: "D014", workerId: "AW005", name: "Forklift Cert", type: "client-required", status: "verified", uploadedDate: "2024-02-12", expiryDate: "2026-02-12" },
  // AW006 – Emma Johansson (deployed)
  { id: "D015", workerId: "AW006", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-04-15", expiryDate: null },
  { id: "D016", workerId: "AW006", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-04-15", expiryDate: "2026-04-15" },
  // AW007 – Marcus Webb (active)
  { id: "D017", workerId: "AW007", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-05-20", expiryDate: null },
  { id: "D018", workerId: "AW007", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-05-20", expiryDate: "2026-05-20" },
  { id: "D019", workerId: "AW007", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2024-05-22", expiryDate: "2026-05-22" },
  // AW008 – Fatima Al-Hassan (active)
  { id: "D020", workerId: "AW008", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-06-01", expiryDate: null },
  { id: "D021", workerId: "AW008", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-06-01", expiryDate: "2026-06-01" },
  { id: "D022", workerId: "AW008", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-06-03", expiryDate: "2025-12-03" },
  // AW009 – Tom Brady (active)
  { id: "D023", workerId: "AW009", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-07-15", expiryDate: null },
  { id: "D024", workerId: "AW009", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-07-15", expiryDate: "2026-07-15" },
  // AW010 – Marcus Webb (active)
  { id: "D025", workerId: "AW010", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-08-10", expiryDate: null },
  { id: "D026", workerId: "AW010", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-08-10", expiryDate: "2026-08-10" },
  // AW011 – Tom Brady (new-registered)
  { id: "D027", workerId: "AW011", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2026-03-28", expiryDate: null },
  { id: "D028", workerId: "AW011", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2026-03-28", expiryDate: "2028-03-28" },
  // AW012 – Ana Pereira (new-registered)
  { id: "D029", workerId: "AW012", name: "Employment Contract", type: "contract", status: "pending", uploadedDate: "2026-04-02", expiryDate: null },
  { id: "D030", workerId: "AW012", name: "I9 Verification", type: "compliance", status: "pending", uploadedDate: "2026-04-02", expiryDate: "2028-04-02" },
  // AW013 – Ana Pereira (new-registered)
  { id: "D031", workerId: "AW013", name: "Employment Contract", type: "contract", status: "pending", uploadedDate: "2026-04-08", expiryDate: null },
  { id: "D032", workerId: "AW013", name: "MHE License", type: "client-required", status: "pending", uploadedDate: "2026-04-08", expiryDate: "2028-04-08" },
  // AW014 – Rico Fernandez (blocked)
  { id: "D033", workerId: "AW014", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-09-14", expiryDate: null },
  { id: "D034", workerId: "AW014", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-09-14", expiryDate: "2025-01-14" },
  { id: "D035", workerId: "AW014", name: "Health & Safety Cert", type: "client-required", status: "expired", uploadedDate: "2023-09-16", expiryDate: "2024-09-16" },
  // AW015 – Aisha Nwosu (blocked)
  { id: "D036", workerId: "AW015", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-07-30", expiryDate: null },
  { id: "D037", workerId: "AW015", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-07-30", expiryDate: "2024-07-30" },
  { id: "D038", workerId: "AW015", name: "Forklift Cert", type: "client-required", status: "expired", uploadedDate: "2023-08-01", expiryDate: "2024-08-01" },

  // ═══ AG002 Pinnacle Staffing ═══
  // AW016 – Aisha Nwosu (deployed)
  { id: "D039", workerId: "AW016", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-10-08", expiryDate: null },
  { id: "D040", workerId: "AW016", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-10-08", expiryDate: "2025-10-08" },
  { id: "D041", workerId: "AW016", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2023-10-10", expiryDate: "2025-04-10" },
  // AW017 – Daniel Reeves (deployed)
  { id: "D042", workerId: "AW017", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-01-25", expiryDate: null },
  { id: "D043", workerId: "AW017", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-01-25", expiryDate: "2026-01-25" },
  { id: "D044", workerId: "AW017", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2024-01-28", expiryDate: "2026-01-28" },
  // AW018 – Leon Kowalski (deployed)
  { id: "D045", workerId: "AW018", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-02-14", expiryDate: null },
  { id: "D046", workerId: "AW018", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-02-14", expiryDate: "2026-02-14" },
  // AW019 – Sarah Mitchell (deployed)
  { id: "D047", workerId: "AW019", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-12-18", expiryDate: null },
  { id: "D048", workerId: "AW019", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-12-18", expiryDate: "2025-12-18" },
  { id: "D049", workerId: "AW019", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-12-20", expiryDate: "2025-12-20" },
  // AW020 – Sarah Mitchell (deployed)
  { id: "D050", workerId: "AW020", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-03-22", expiryDate: null },
  { id: "D051", workerId: "AW020", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-03-22", expiryDate: "2026-03-22" },
  // AW021 – Chris Donnelly (deployed)
  { id: "D052", workerId: "AW021", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-04-10", expiryDate: null },
  { id: "D053", workerId: "AW021", name: "Forklift Cert", type: "client-required", status: "verified", uploadedDate: "2024-04-12", expiryDate: "2026-04-12" },
  { id: "D054", workerId: "AW021", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-04-10", expiryDate: "2026-04-10" },
  // AW022 – Maisie O'Brien (active)
  { id: "D055", workerId: "AW022", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-05-10", expiryDate: null },
  { id: "D056", workerId: "AW022", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-05-10", expiryDate: "2026-05-10" },
  // AW023 – Aisha Nwosu (active)
  { id: "D057", workerId: "AW023", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-06-18", expiryDate: null },
  { id: "D058", workerId: "AW023", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-06-18", expiryDate: "2026-06-18" },
  // AW024 – James Okafor (active)
  { id: "D059", workerId: "AW024", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-07-02", expiryDate: null },
  { id: "D060", workerId: "AW024", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-07-02", expiryDate: "2026-07-02" },
  { id: "D061", workerId: "AW024", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-07-05", expiryDate: "2026-01-05" },
  // AW025 – Aisha Nwosu (active)
  { id: "D062", workerId: "AW025", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-08-05", expiryDate: null },
  { id: "D063", workerId: "AW025", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-08-05", expiryDate: "2026-08-05" },
  // AW026 – Sarah Mitchell (new-registered)
  { id: "D064", workerId: "AW026", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2026-03-25", expiryDate: null },
  { id: "D065", workerId: "AW026", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2026-03-25", expiryDate: "2028-03-25" },
  // AW027 – Fatima Al-Hassan (new-registered)
  { id: "D066", workerId: "AW027", name: "Employment Contract", type: "contract", status: "pending", uploadedDate: "2026-04-05", expiryDate: null },
  { id: "D067", workerId: "AW027", name: "Forklift Cert", type: "client-required", status: "pending", uploadedDate: "2026-04-05", expiryDate: "2028-04-05" },
  // AW028 – Diane Foster (new-registered)
  { id: "D068", workerId: "AW028", name: "Employment Contract", type: "contract", status: "pending", uploadedDate: "2026-04-10", expiryDate: null },
  { id: "D069", workerId: "AW028", name: "I9 Verification", type: "compliance", status: "pending", uploadedDate: "2026-04-10", expiryDate: "2028-04-10" },
  // AW029 – Chris Donnelly (blocked)
  { id: "D070", workerId: "AW029", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-08-28", expiryDate: null },
  { id: "D071", workerId: "AW029", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-08-28", expiryDate: "2024-12-28" },
  { id: "D072", workerId: "AW029", name: "Health & Safety Cert", type: "client-required", status: "expired", uploadedDate: "2023-08-30", expiryDate: "2024-08-30" },
  // AW030 – Priya Sharma (blocked)
  { id: "D073", workerId: "AW030", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-06-15", expiryDate: null },
  { id: "D074", workerId: "AW030", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-06-15", expiryDate: "2024-06-15" },
  { id: "D075", workerId: "AW030", name: "MHE License", type: "client-required", status: "expired", uploadedDate: "2023-06-18", expiryDate: "2024-12-18" },

  // ═══ AG003 Meridian Recruitment ═══
  // AW031 – Sarah Mitchell (deployed)
  { id: "D076", workerId: "AW031", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-09-30", expiryDate: null },
  { id: "D077", workerId: "AW031", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-09-30", expiryDate: "2025-09-30" },
  { id: "D078", workerId: "AW031", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2023-10-02", expiryDate: "2025-10-02" },
  // AW032 – Tom Brady (deployed)
  { id: "D079", workerId: "AW032", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-02-08", expiryDate: null },
  { id: "D080", workerId: "AW032", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-02-08", expiryDate: "2026-02-08" },
  // AW033 – Emma Johansson (deployed)
  { id: "D081", workerId: "AW033", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-01-12", expiryDate: null },
  { id: "D082", workerId: "AW033", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-01-12", expiryDate: "2026-01-12" },
  { id: "D083", workerId: "AW033", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-01-15", expiryDate: "2025-07-15" },
  // AW034 – James Okafor (deployed)
  { id: "D084", workerId: "AW034", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-11-05", expiryDate: null },
  { id: "D085", workerId: "AW034", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2023-11-05", expiryDate: "2025-11-05" },
  // AW035 – Emma Johansson (deployed)
  { id: "D086", workerId: "AW035", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-04-01", expiryDate: null },
  { id: "D087", workerId: "AW035", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-04-01", expiryDate: "2026-04-01" },
  { id: "D088", workerId: "AW035", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2024-04-03", expiryDate: "2026-04-03" },
  // AW036 – Aisha Nwosu (deployed)
  { id: "D089", workerId: "AW036", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-03-18", expiryDate: null },
  { id: "D090", workerId: "AW036", name: "Forklift Cert", type: "client-required", status: "verified", uploadedDate: "2024-03-20", expiryDate: "2026-03-20" },
  { id: "D091", workerId: "AW036", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-03-18", expiryDate: "2026-03-18" },
  // AW037 – Sarah Mitchell (active)
  { id: "D092", workerId: "AW037", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-05-28", expiryDate: null },
  { id: "D093", workerId: "AW037", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-05-28", expiryDate: "2026-05-28" },
  // AW038 – James Okafor (active)
  { id: "D094", workerId: "AW038", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-06-14", expiryDate: null },
  { id: "D095", workerId: "AW038", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-06-14", expiryDate: "2026-06-14" },
  // AW039 – Diane Foster (active)
  { id: "D096", workerId: "AW039", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-07-10", expiryDate: null },
  { id: "D097", workerId: "AW039", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-07-10", expiryDate: "2026-07-10" },
  { id: "D098", workerId: "AW039", name: "MHE License", type: "client-required", status: "verified", uploadedDate: "2024-07-12", expiryDate: "2026-01-12" },
  // AW040 – Leon Kowalski (active)
  { id: "D099", workerId: "AW040", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-08-22", expiryDate: null },
  { id: "D100", workerId: "AW040", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2024-08-22", expiryDate: "2026-08-22" },
  // AW041 – Aisha Nwosu (new-registered)
  { id: "D101", workerId: "AW041", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2026-03-22", expiryDate: null },
  { id: "D102", workerId: "AW041", name: "I9 Verification", type: "compliance", status: "verified", uploadedDate: "2026-03-22", expiryDate: "2028-03-22" },
  // AW042 – Marcus Webb (new-registered)
  { id: "D103", workerId: "AW042", name: "Employment Contract", type: "contract", status: "pending", uploadedDate: "2026-04-01", expiryDate: null },
  { id: "D104", workerId: "AW042", name: "MHE License", type: "client-required", status: "pending", uploadedDate: "2026-04-01", expiryDate: "2028-04-01" },
  // AW043 – Daniel Reeves (new-registered)
  { id: "D105", workerId: "AW043", name: "Employment Contract", type: "contract", status: "pending", uploadedDate: "2026-04-09", expiryDate: null },
  { id: "D106", workerId: "AW043", name: "I9 Verification", type: "compliance", status: "pending", uploadedDate: "2026-04-09", expiryDate: "2028-04-09" },
  // AW044 – Yuki Tanaka (blocked)
  { id: "D107", workerId: "AW044", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-10-20", expiryDate: null },
  { id: "D108", workerId: "AW044", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-10-20", expiryDate: "2025-02-20" },
  // AW045 – Ana Pereira (blocked)
  { id: "D109", workerId: "AW045", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-05-18", expiryDate: null },
  { id: "D110", workerId: "AW045", name: "I9 Verification", type: "compliance", status: "expired", uploadedDate: "2023-05-18", expiryDate: "2024-05-18" },
  { id: "D111", workerId: "AW045", name: "MHE License", type: "client-required", status: "expired", uploadedDate: "2023-05-20", expiryDate: "2024-11-20" },
];

// ────────────────────────────────────────
// AGENCY ISSUES — 3-4 per agency (11 total)
// ────────────────────────────────────────

export const agencyIssues: AgencyIssue[] = [
  // Workforce Direct (4)
  { id: "ISS001", workerId: "AW014", workerName: "Rico Fernandez", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2025-01-14", agencyId: "AG001" },
  { id: "ISS002", workerId: "AW015", workerName: "Aisha Nwosu", failedStep: "Compliance", reason: "I9 Verification and Forklift Cert expired", requiredAction: "Upload valid I9 and renew Forklift certification", severity: "critical", createdAt: "2024-07-30", agencyId: "AG001" },
  { id: "ISS003", workerId: "AW003", workerName: "Fatima Al-Hassan", failedStep: "Attendance", reason: "Late clock-in (18 mins)", requiredAction: "Review and approve exception", severity: "warning", createdAt: "2026-04-10", agencyId: "AG001" },
  { id: "ISS004", workerId: "AW012", workerName: "Ana Pereira", failedStep: "Registration", reason: "Pending compliance documents", requiredAction: "Complete I9 verification", severity: "warning", createdAt: "2026-04-03", agencyId: "AG001" },

  // Pinnacle Staffing (3)
  { id: "ISS005", workerId: "AW029", workerName: "Chris Donnelly", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2024-12-28", agencyId: "AG002" },
  { id: "ISS006", workerId: "AW030", workerName: "Priya Sharma", failedStep: "Compliance", reason: "I9 Verification and MHE License expired", requiredAction: "Upload valid I9 and renew MHE License", severity: "critical", createdAt: "2024-06-15", agencyId: "AG002" },
  { id: "ISS007", workerId: "AW018", workerName: "Leon Kowalski", failedStep: "Attendance", reason: "Late clock-in (9 mins)", requiredAction: "Review and approve exception", severity: "warning", createdAt: "2026-04-09", agencyId: "AG002" },

  // Meridian Recruitment (4)
  { id: "ISS008", workerId: "AW044", workerName: "Yuki Tanaka", failedStep: "Compliance", reason: "I9 Verification expired", requiredAction: "Upload valid I9 Verification document", severity: "critical", createdAt: "2025-02-20", agencyId: "AG003" },
  { id: "ISS009", workerId: "AW045", workerName: "Ana Pereira", failedStep: "Compliance", reason: "I9 Verification and MHE License expired", requiredAction: "Upload valid I9 and renew MHE License", severity: "critical", createdAt: "2024-05-18", agencyId: "AG003" },
  { id: "ISS010", workerId: "AW033", workerName: "Emma Johansson", failedStep: "Attendance", reason: "Late clock-in (14 mins)", requiredAction: "Review and approve exception", severity: "warning", createdAt: "2026-04-08", agencyId: "AG003" },
  { id: "ISS011", workerId: "AW034", workerName: "James Okafor", failedStep: "Attendance", reason: "Missed clock-out", requiredAction: "Confirm end time and update record", severity: "warning", createdAt: "2026-04-11", agencyId: "AG003" },
];

// ────────────────────────────────────────
// AGENCY DEPLOYMENTS — 18 total (6 per agency, one per deployed worker)
// ────────────────────────────────────────

export const agencyDeployments: AgencyDeployment[] = [
  // Workforce Direct (6)
  { id: "DEP001", workerId: "AW001", workerName: "Yuki Tanaka", department: "Inbound Warehouse", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP002", workerId: "AW002", workerName: "Rico Fernandez", department: "MHE", location: "Zone B", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP003", workerId: "AW003", workerName: "Fatima Al-Hassan", department: "Picker", location: "Zone C", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP004", workerId: "AW004", workerName: "Emma Johansson", department: "Loader", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP005", workerId: "AW005", workerName: "Fatima Al-Hassan", department: "Forklift", location: "Zone D", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP006", workerId: "AW006", workerName: "Emma Johansson", department: "Inbound Warehouse", location: "Zone B", shiftStart: "22:00", shiftEnd: "06:00", status: "completed", attendanceStatus: "clocked-out" },

  // Pinnacle Staffing (6)
  { id: "DEP007", workerId: "AW016", workerName: "Aisha Nwosu", department: "MHE", location: "Zone B", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP008", workerId: "AW017", workerName: "Daniel Reeves", department: "Inbound Warehouse", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP009", workerId: "AW018", workerName: "Leon Kowalski", department: "Picker", location: "Zone C", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP010", workerId: "AW019", workerName: "Sarah Mitchell", department: "Loader", location: "Zone D", shiftStart: "22:00", shiftEnd: "06:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP011", workerId: "AW020", workerName: "Sarah Mitchell", department: "Inbound Warehouse", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "completed", attendanceStatus: "clocked-out" },
  { id: "DEP012", workerId: "AW021", workerName: "Chris Donnelly", department: "Forklift", location: "Zone B", shiftStart: "14:00", shiftEnd: "22:00", status: "on-site", attendanceStatus: "clocked-in" },

  // Meridian Recruitment (6)
  { id: "DEP013", workerId: "AW031", workerName: "Sarah Mitchell", department: "Inbound Warehouse", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP014", workerId: "AW032", workerName: "Tom Brady", department: "Picker", location: "Zone C", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP015", workerId: "AW033", workerName: "Emma Johansson", department: "MHE", location: "Zone B", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP016", workerId: "AW034", workerName: "James Okafor", department: "Loader", location: "Zone D", shiftStart: "06:00", shiftEnd: "14:00", status: "completed", attendanceStatus: "clocked-out" },
  { id: "DEP017", workerId: "AW035", workerName: "Emma Johansson", department: "Inbound Warehouse", location: "Zone A", shiftStart: "22:00", shiftEnd: "06:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP018", workerId: "AW036", workerName: "Aisha Nwosu", department: "Forklift", location: "Zone D", shiftStart: "14:00", shiftEnd: "22:00", status: "on-site", attendanceStatus: "clocked-in" },
];

// ────────────────────────────────────────
// AGENCY STATS — Per-agency record
// Derived from the worker data above
// ────────────────────────────────────────

// AG001 Workforce Direct: 6 deployed, 4 active, 3 new-reg, 2 blocked
// avgHourlyRate deployed+active: (13.00+14.50+12.50+12.80+14.00+13.20+12.00+14.20+12.50+12.60)/10 = 13.13
// avgEtaMinutes all 15: (10+15+20+5+15+10+25+10+10+30+15+20+20+10+30)/15 = 17.7 -> 18
// punctuality deployed+active (excl new/blocked): (96+94+78+97+93+91+88+92+90+85)/10 = 90.4
// issues: ISS001-ISS004 = 4

// AG002 Elite: 6 deployed, 4 active, 3 new-reg, 2 blocked
// avgHourlyRate: (15.00+13.50+13.00+13.80+13.50+15.50+13.00+13.50+15.00+13.80)/10 = 13.96
// avgEtaMinutes: (5+10+15+15+5+10+15+10+5+20+10+10+20+25+35)/15 = 14.3 -> 14
// punctuality: (98+96+81+95+97+94+93+91+95+89)/10 = 92.9
// issues: ISS005-ISS007 = 3

// AG003 Elwood: 6 deployed, 4 active, 3 new-reg, 2 blocked
// avgHourlyRate: (12.00+11.80+13.50+12.20+12.00+13.20+11.50+12.00+13.50+12.00)/10 = 12.37
// avgEtaMinutes: (20+25+20+30+15+35+20+25+15+40+15+30+25+45+40)/15 = 26.7 -> 27
// punctuality: (90+87+79+88+86+84+83+85+81+80)/10 = 84.3
// issues: ISS008-ISS011 = 4

export const agencyStats: Record<string, {
  deployedNow: number;
  upcomingShifts: number;
  openIssues: number;
  weeklyHours: number;
  fillRate: number;
  avgResponseMinutes: number;
  avgEtaMinutes: number;
  avgHourlyRate: number;
  attendancePct: number;
  punctualityPct: number;
  attritionPct: number;
  newRegistrationsThisWeek: number;
  activeWorkers: number;
  standbyWorkers: number;
}> = {
  AG001: {
    deployedNow: 6,
    upcomingShifts: 10,
    openIssues: 4,
    weeklyHours: 240,
    fillRate: 91,
    avgResponseMinutes: 14,
    avgEtaMinutes: 18,
    avgHourlyRate: 13.13,
    attendancePct: 91.2,
    punctualityPct: 90.4,
    attritionPct: 9.2,
    newRegistrationsThisWeek: 3,
    activeWorkers: 4,
    standbyWorkers: 4,
  },
  AG002: {
    deployedNow: 6,
    upcomingShifts: 10,
    openIssues: 3,
    weeklyHours: 240,
    fillRate: 96,
    avgResponseMinutes: 8,
    avgEtaMinutes: 14,
    avgHourlyRate: 13.96,
    attendancePct: 93.8,
    punctualityPct: 92.9,
    attritionPct: 5.1,
    newRegistrationsThisWeek: 3,
    activeWorkers: 4,
    standbyWorkers: 4,
  },
  AG003: {
    deployedNow: 6,
    upcomingShifts: 10,
    openIssues: 4,
    weeklyHours: 240,
    fillRate: 84,
    avgResponseMinutes: 22,
    avgEtaMinutes: 27,
    avgHourlyRate: 12.37,
    attendancePct: 85.6,
    punctualityPct: 84.3,
    attritionPct: 13.8,
    newRegistrationsThisWeek: 3,
    activeWorkers: 4,
    standbyWorkers: 4,
  },
};

// ────────────────────────────────────────
// ALLOCATIONS — 12 entries across all 3 agencies
// ────────────────────────────────────────

export const allocations: Allocation[] = [
  // Monday – Workforce Direct
  { id: "ALLOC001", department: "Inbound Warehouse", location: "Zone A", role: "Inbound Warehouse", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 4, assignedWorkers: [{ workerId: "AW001", workerName: "Yuki Tanaka", status: "confirmed" }, { workerId: "AW004", workerName: "Emma Johansson", status: "confirmed" }], status: "partial", agencyId: "AG001", agencyName: "Workforce Direct" },
  { id: "ALLOC002", department: "Picker", location: "Zone C", role: "Picker", date: "Mon 3 Feb", shift: "14:00–22:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW003", workerName: "Fatima Al-Hassan", status: "confirmed" }, { workerId: "AW007", workerName: "Marcus Webb", status: "pending" }], status: "partial", agencyId: "AG001", agencyName: "Workforce Direct" },
  { id: "ALLOC003", department: "Forklift", location: "Zone D", role: "MHE Operations", date: "Mon 3 Feb", shift: "14:00–22:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW005", workerName: "Fatima Al-Hassan", status: "confirmed" }], status: "partial", agencyId: "AG001", agencyName: "Workforce Direct" },
  { id: "ALLOC004", department: "MHE", location: "Zone B", role: "MHE Operations", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW002", workerName: "Rico Fernandez", status: "confirmed" }, { workerId: "AW008", workerName: "Fatima Al-Hassan", status: "confirmed" }], status: "filled", agencyId: "AG001", agencyName: "Workforce Direct" },

  // Monday – Pinnacle Staffing
  { id: "ALLOC005", department: "Inbound Warehouse", location: "Zone A", role: "Inbound Warehouse", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW017", workerName: "Daniel Reeves", status: "confirmed" }, { workerId: "AW020", workerName: "Sarah Mitchell", status: "confirmed" }, { workerId: "AW023", workerName: "Aisha Nwosu", status: "pending" }], status: "filled", agencyId: "AG002", agencyName: "Pinnacle Staffing" },
  { id: "ALLOC006", department: "MHE", location: "Zone B", role: "MHE Operations", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW016", workerName: "Aisha Nwosu", status: "confirmed" }], status: "partial", agencyId: "AG002", agencyName: "Pinnacle Staffing" },
  { id: "ALLOC007", department: "Loader", location: "Zone D", role: "Loader", date: "Mon 3 Feb", shift: "22:00–06:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW019", workerName: "Sarah Mitchell", status: "confirmed" }], status: "partial", agencyId: "AG002", agencyName: "Pinnacle Staffing" },

  // Tuesday – Pinnacle Staffing
  { id: "ALLOC008", department: "Picker", location: "Zone C", role: "Picker", date: "Tue 4 Feb", shift: "14:00–22:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW018", workerName: "Leon Kowalski", status: "confirmed" }, { workerId: "AW022", workerName: "Maisie O'Brien", status: "confirmed" }], status: "partial", agencyId: "AG002", agencyName: "Pinnacle Staffing" },

  // Monday – Meridian Recruitment
  { id: "ALLOC009", department: "Inbound Warehouse", location: "Zone A", role: "Inbound Warehouse", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "AW031", workerName: "Sarah Mitchell", status: "confirmed" }, { workerId: "AW038", workerName: "James Okafor", status: "pending" }], status: "partial", agencyId: "AG003", agencyName: "Meridian Recruitment" },
  { id: "ALLOC010", department: "Picker", location: "Zone C", role: "Picker", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW032", workerName: "Tom Brady", status: "confirmed" }, { workerId: "AW037", workerName: "Sarah Mitchell", status: "confirmed" }], status: "filled", agencyId: "AG003", agencyName: "Meridian Recruitment" },
  { id: "ALLOC011", department: "MHE", location: "Zone B", role: "MHE Operations", date: "Tue 4 Feb", shift: "14:00–22:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "AW033", workerName: "Emma Johansson", status: "confirmed" }], status: "partial", agencyId: "AG003", agencyName: "Meridian Recruitment" },

  // Wednesday – Meridian Recruitment
  { id: "ALLOC012", department: "Inbound Warehouse", location: "Zone A", role: "Inbound Warehouse", date: "Wed 5 Feb", shift: "06:00–14:00", requestedHeadcount: 4, assignedWorkers: [], status: "unfilled", agencyId: "AG003", agencyName: "Meridian Recruitment" },
];
