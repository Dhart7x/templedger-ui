// Agency Demo Data - Mock data for the Agency View

export interface AgencyWorker {
  id: string;
  name: string;
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

export const agencyWorkers: AgencyWorker[] = [
  { id: "W001", name: "Sarah Mitchell", status: "deployed", department: "Picking", location: "Zone A", currentShift: "06:00–14:00", executionStatus: "on-track", registeredDate: "2024-01-15", complianceStatus: "verified" },
  { id: "W002", name: "James Cooper", status: "deployed", department: "Packing", location: "Zone B", currentShift: "06:00–14:00", executionStatus: "at-risk", registeredDate: "2024-02-20", complianceStatus: "pending" },
  { id: "W003", name: "Maria Santos", status: "active", department: "Goods In", location: "Zone C", currentShift: null, executionStatus: "on-track", registeredDate: "2024-01-08", complianceStatus: "verified" },
  { id: "W004", name: "David Chen", status: "blocked", department: "Picking", location: "Zone A", currentShift: null, executionStatus: "blocked", registeredDate: "2023-11-12", complianceStatus: "expired" },
  { id: "W005", name: "Emma Wilson", status: "deployed", department: "Returns", location: "Zone D", currentShift: "14:00–22:00", executionStatus: "on-track", registeredDate: "2024-03-01", complianceStatus: "verified" },
  { id: "W006", name: "Michael Brown", status: "active", department: "Packing", location: "Zone B", currentShift: null, executionStatus: "on-track", registeredDate: "2024-02-15", complianceStatus: "verified" },
  { id: "W007", name: "Lisa Anderson", status: "deployed", department: "Goods In", location: "Zone C", currentShift: "06:00–14:00", executionStatus: "at-risk", registeredDate: "2024-01-22", complianceStatus: "verified" },
  { id: "W008", name: "Robert Taylor", status: "blocked", department: "Picking", location: "Zone A", currentShift: null, executionStatus: "blocked", registeredDate: "2023-12-05", complianceStatus: "expired" },
];

export const agencyDocuments: AgencyDocument[] = [
  { id: "D001", workerId: "W001", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-01-15", expiryDate: null },
  { id: "D002", workerId: "W001", name: "Right to Work", type: "compliance", status: "verified", uploadedDate: "2024-01-15", expiryDate: "2025-01-15" },
  { id: "D003", workerId: "W001", name: "Health & Safety Cert", type: "client-required", status: "verified", uploadedDate: "2024-01-16", expiryDate: "2025-01-16" },
  { id: "D004", workerId: "W002", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2024-02-20", expiryDate: null },
  { id: "D005", workerId: "W002", name: "Right to Work", type: "compliance", status: "pending", uploadedDate: "2024-02-20", expiryDate: "2024-02-25" },
  { id: "D006", workerId: "W004", name: "Employment Contract", type: "contract", status: "verified", uploadedDate: "2023-11-12", expiryDate: null },
  { id: "D007", workerId: "W004", name: "Right to Work", type: "compliance", status: "expired", uploadedDate: "2023-11-12", expiryDate: "2024-01-12" },
  { id: "D008", workerId: "W008", name: "Health & Safety Cert", type: "client-required", status: "expired", uploadedDate: "2023-12-05", expiryDate: "2024-01-05" },
];

export const agencyDeployments: AgencyDeployment[] = [
  { id: "DEP001", workerId: "W001", workerName: "Sarah Mitchell", department: "Picking", location: "Zone A", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP002", workerId: "W002", workerName: "James Cooper", department: "Packing", location: "Zone B", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP003", workerId: "W007", workerName: "Lisa Anderson", department: "Goods In", location: "Zone C", shiftStart: "06:00", shiftEnd: "14:00", status: "on-site", attendanceStatus: "clocked-in" },
  { id: "DEP004", workerId: "W005", workerName: "Emma Wilson", department: "Returns", location: "Zone D", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP005", workerId: "W003", workerName: "Maria Santos", department: "Goods In", location: "Zone C", shiftStart: "14:00", shiftEnd: "22:00", status: "scheduled", attendanceStatus: "pending" },
  { id: "DEP006", workerId: "W006", workerName: "Michael Brown", department: "Packing", location: "Zone B", shiftStart: "22:00", shiftEnd: "06:00", status: "scheduled", attendanceStatus: "pending" },
];

export const agencyIssues: AgencyIssue[] = [
  { id: "ISS001", workerId: "W004", workerName: "David Chen", failedStep: "Compliance", reason: "Right to Work document expired", requiredAction: "Upload valid Right to Work document", severity: "critical", createdAt: "2024-01-12" },
  { id: "ISS002", workerId: "W008", workerName: "Robert Taylor", failedStep: "Compliance", reason: "Health & Safety certification expired", requiredAction: "Complete H&S training and upload certificate", severity: "critical", createdAt: "2024-01-05" },
  { id: "ISS003", workerId: "W002", workerName: "James Cooper", failedStep: "Compliance", reason: "Right to Work pending verification", requiredAction: "Await document verification", severity: "warning", createdAt: "2024-02-22" },
  { id: "ISS004", workerId: "W007", workerName: "Lisa Anderson", failedStep: "Attendance", reason: "Late clock-in (12 mins)", requiredAction: "Review and approve exception", severity: "warning", createdAt: "2024-02-04" },
];

export const agencyStats = {
  deployedNow: 3,
  totalActive: 6,
  blocked: 2,
  upcomingShifts: 3,
  openIssues: 4,
  criticalIssues: 2,
  atRiskPayroll: 2,
  atRiskBilling: 2,
};

// Allocations given by the Labour User to agencies
export const allocations: Allocation[] = [
  // Monday
  { id: "ALLOC001", department: "Picking", location: "Zone A", role: "Picker", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 4, assignedWorkers: [{ workerId: "W001", workerName: "Sarah Mitchell", status: "confirmed" }, { workerId: "W003", workerName: "Maria Santos", status: "pending" }], status: "partial", agencyId: "AG001", agencyName: "Staffline" },
  { id: "ALLOC002", department: "Picking", location: "Zone A", role: "Picker", date: "Mon 3 Feb", shift: "14:00–22:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "W005", workerName: "Emma Wilson", status: "confirmed" }], status: "partial", agencyId: "AG001", agencyName: "Staffline" },
  { id: "ALLOC003", department: "Packing", location: "Zone B", role: "Packer", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "W002", workerName: "James Cooper", status: "confirmed" }, { workerId: "W006", workerName: "Michael Brown", status: "confirmed" }], status: "filled", agencyId: "AG001", agencyName: "Staffline" },
  { id: "ALLOC004", department: "Goods In", location: "Zone C", role: "Goods In Operative", date: "Mon 3 Feb", shift: "06:00–14:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "W007", workerName: "Lisa Anderson", status: "confirmed" }], status: "partial", agencyId: "AG001", agencyName: "Staffline" },
  // Tuesday  
  { id: "ALLOC005", department: "Picking", location: "Zone A", role: "Picker", date: "Tue 4 Feb", shift: "06:00–14:00", requestedHeadcount: 5, assignedWorkers: [], status: "unfilled", agencyId: "AG001", agencyName: "Staffline" },
  { id: "ALLOC006", department: "Packing", location: "Zone B", role: "Packer", date: "Tue 4 Feb", shift: "06:00–14:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "W002", workerName: "James Cooper", status: "pending" }], status: "partial", agencyId: "AG001", agencyName: "Staffline" },
  { id: "ALLOC007", department: "Returns", location: "Zone D", role: "Returns Handler", date: "Tue 4 Feb", shift: "14:00–22:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "W005", workerName: "Emma Wilson", status: "confirmed" }, { workerId: "W003", workerName: "Maria Santos", status: "confirmed" }], status: "filled", agencyId: "AG001", agencyName: "Staffline" },
  // Wednesday
  { id: "ALLOC008", department: "Picking", location: "Zone A", role: "Picker", date: "Wed 5 Feb", shift: "06:00–14:00", requestedHeadcount: 4, assignedWorkers: [], status: "unfilled", agencyId: "AG001", agencyName: "Staffline" },
  { id: "ALLOC009", department: "Goods In", location: "Zone C", role: "Goods In Operative", date: "Wed 5 Feb", shift: "14:00–22:00", requestedHeadcount: 2, assignedWorkers: [], status: "unfilled", agencyId: "AG001", agencyName: "Staffline" },
  // Multi-agency allocations visible to Labour User
  { id: "ALLOC010", department: "Picking", location: "Zone A", role: "Picker", date: "Mon 3 Feb", shift: "22:00–06:00", requestedHeadcount: 3, assignedWorkers: [{ workerId: "EXT001", workerName: "Alex Johnson", status: "confirmed" }, { workerId: "EXT002", workerName: "Claire Smith", status: "confirmed" }], status: "partial", agencyId: "AG002", agencyName: "Elite Personnel" },
  { id: "ALLOC011", department: "Packing", location: "Zone B", role: "Packer", date: "Tue 4 Feb", shift: "22:00–06:00", requestedHeadcount: 2, assignedWorkers: [{ workerId: "EXT003", workerName: "Tom Williams", status: "confirmed" }, { workerId: "EXT004", workerName: "Nina Patel", status: "confirmed" }], status: "filled", agencyId: "AG002", agencyName: "Elite Personnel" },
];
