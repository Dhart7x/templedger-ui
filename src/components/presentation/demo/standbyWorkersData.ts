// Standby Workers Data - 60 hand-written unique workers

export interface StandbyWorker {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  dateOfBirth: string;
  nationalInsurance: string;
  bankDetails: { sortCode: string; accountNumber: string; bankName: string };
  emergencyContact: { name: string; relationship: string; phone: string };
  registeredDate: string;
  lastWorked: string | null;
  status: "standby" | "live";
  registrationStatus: "live" | "standby" | "new-registered";
  agencyId: "AG001" | "AG002" | "AG003";
  bestMatchDepartment: string;
  departments: string[];
  preferences: {
    preferredShifts: string[];
    maxHoursPerWeek: number;
    availableDays: string[];
    noticePeriod: string;
    transportMode: "car" | "public" | "bicycle" | "walking";
  };
  distance: {
    miles: number;
    carTime: string;
    publicTransportTime: string;
  };
  compliance: {
    rightToWork: { status: "verified" | "pending" | "expired"; expiry: string };
    healthAndSafety: { status: "verified" | "pending" | "expired"; expiry: string };
    contract: { status: "signed" | "pending" };
    dbs: { status: "verified" | "pending" | "not-required"; expiry: string | null };
  };
  experience: { role: string; years: number }[];
  rating: number;
  completedShifts: number;
  punctualityScore: number;
}

// ────────────────────────────────────────
// LIVE WORKERS — 18 total (6 per agency)
// ────────────────────────────────────────

export const standbyWorkers: StandbyWorker[] = [
  // AG001 – Staffmark – LIVE
  {
    id: "SW001", name: "Marcus Reid", email: "marcus.reid@email.com", phone: "07412 339102",
    address: "14 Granby Road", postcode: "CV1 3AB", dateOfBirth: "1988-03-14",
    nationalInsurance: "JK482917B",
    bankDetails: { sortCode: "20-45-18", accountNumber: "30291847", bankName: "Barclays" },
    emergencyContact: { name: "Laura Reid", relationship: "Spouse", phone: "07700 112934" },
    registeredDate: "2024-01-10", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG001",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 3.2, carTime: "8 mins", publicTransportTime: "22 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-01-10" }, healthAndSafety: { status: "verified", expiry: "2025-11-20" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 4 }, { role: "Loader", years: 2 }],
    rating: 4.6, completedShifts: 142, punctualityScore: 96.3
  },
  {
    id: "SW002", name: "Priya Sharma", email: "priya.sharma@email.com", phone: "07551 204817",
    address: "8 Earlsdon Avenue South", postcode: "CV5 6DR", dateOfBirth: "1992-07-22",
    nationalInsurance: "NM293048A",
    bankDetails: { sortCode: "30-98-74", accountNumber: "18374620", bankName: "Lloyds" },
    emergencyContact: { name: "Vikram Sharma", relationship: "Parent", phone: "07700 445192" },
    registeredDate: "2024-02-18", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG001",
    bestMatchDepartment: "MHE", departments: ["MHE"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 5.8, carTime: "14 mins", publicTransportTime: "35 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-02-18" }, healthAndSafety: { status: "verified", expiry: "2025-08-30" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2026-02-15" } },
    experience: [{ role: "MHE", years: 3 }],
    rating: 4.8, completedShifts: 98, punctualityScore: 98.1
  },
  {
    id: "SW003", name: "Darren Hobbs", email: "darren.hobbs@email.com", phone: "07923 018374",
    address: "31 Holbrooks Lane", postcode: "CV6 4NE", dateOfBirth: "1985-11-03",
    nationalInsurance: "AB847291C",
    bankDetails: { sortCode: "09-01-28", accountNumber: "55209183", bankName: "Santander" },
    emergencyContact: { name: "Gemma Hobbs", relationship: "Spouse", phone: "07811 339204" },
    registeredDate: "2023-09-05", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG001",
    bestMatchDepartment: "Picker", departments: ["Picker", "Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 48, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 2.1, carTime: "5 mins", publicTransportTime: "15 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-09-05" }, healthAndSafety: { status: "verified", expiry: "2025-12-01" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 5 }, { role: "Warehouse Operative", years: 3 }],
    rating: 4.3, completedShifts: 167, punctualityScore: 93.7
  },
  {
    id: "SW004", name: "Fatima Al-Rashid", email: "fatima.alrashid@email.com", phone: "07384 192047",
    address: "6 Stoney Stanton Road", postcode: "CV1 4FP", dateOfBirth: "1995-02-28",
    nationalInsurance: "WR183746D",
    bankDetails: { sortCode: "40-23-19", accountNumber: "72938104", bankName: "HSBC" },
    emergencyContact: { name: "Omar Al-Rashid", relationship: "Sibling", phone: "07456 881023" },
    registeredDate: "2024-04-12", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG001",
    bestMatchDepartment: "Loader", departments: ["Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 36, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "walking" },
    distance: { miles: 0.8, carTime: "3 mins", publicTransportTime: "8 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-04-12" }, healthAndSafety: { status: "verified", expiry: "2026-01-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 2 }],
    rating: 4.5, completedShifts: 64, punctualityScore: 97.0
  },
  {
    id: "SW005", name: "Callum Jennings", email: "callum.jennings@email.com", phone: "07812 453901",
    address: "22 Binley Road", postcode: "CV3 1HB", dateOfBirth: "1990-09-17",
    nationalInsurance: "TN492831B",
    bankDetails: { sortCode: "11-04-55", accountNumber: "40182937", bankName: "NatWest" },
    emergencyContact: { name: "Sharon Jennings", relationship: "Parent", phone: "07700 993210" },
    registeredDate: "2023-11-20", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG001",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Picker", "Loader"],
    preferences: { preferredShifts: ["Night (22:00-06:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 4.5, carTime: "11 mins", publicTransportTime: "28 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-11-20" }, healthAndSafety: { status: "verified", expiry: "2025-10-01" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2026-05-01" } },
    experience: [{ role: "Warehouse Operative", years: 6 }, { role: "Picker", years: 2 }, { role: "Loader", years: 1 }],
    rating: 4.9, completedShifts: 180, punctualityScore: 99.1
  },
  {
    id: "SW006", name: "Tamsin Clarke", email: "tamsin.clarke@email.com", phone: "07293 881204",
    address: "47 Spencer Road", postcode: "CV5 6LQ", dateOfBirth: "1993-06-08",
    nationalInsurance: "HP382917C",
    bankDetails: { sortCode: "20-18-33", accountNumber: "91037482", bankName: "Barclays" },
    emergencyContact: { name: "Derek Clarke", relationship: "Parent", phone: "07834 220198" },
    registeredDate: "2024-03-01", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG001",
    bestMatchDepartment: "MHE", departments: ["MHE", "Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 6.3, carTime: "15 mins", publicTransportTime: "38 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-03-01" }, healthAndSafety: { status: "verified", expiry: "2025-09-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "MHE", years: 4 }, { role: "Warehouse Operative", years: 2 }],
    rating: 4.7, completedShifts: 87, punctualityScore: 95.4
  },

  // AG002 – Elite Staffing – LIVE
  {
    id: "SW007", name: "Liam Donovan", email: "liam.donovan@email.com", phone: "07481 330291",
    address: "3 Allesley Old Road", postcode: "CV5 8BW", dateOfBirth: "1987-04-19",
    nationalInsurance: "CE918273D",
    bankDetails: { sortCode: "30-90-12", accountNumber: "28374019", bankName: "Lloyds" },
    emergencyContact: { name: "Bridget Donovan", relationship: "Spouse", phone: "07712 483019" },
    registeredDate: "2023-10-14", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG002",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 4.1, carTime: "10 mins", publicTransportTime: "26 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-10-14" }, healthAndSafety: { status: "verified", expiry: "2025-07-20" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 7 }],
    rating: 4.4, completedShifts: 156, punctualityScore: 94.8
  },
  {
    id: "SW008", name: "Jasmine Okoye", email: "jasmine.okoye@email.com", phone: "07563 291048",
    address: "19 Far Gosford Street", postcode: "CV1 5DZ", dateOfBirth: "1996-12-05",
    nationalInsurance: "BT748291A",
    bankDetails: { sortCode: "09-06-43", accountNumber: "61829304", bankName: "Santander" },
    emergencyContact: { name: "Chidi Okoye", relationship: "Parent", phone: "07890 123847" },
    registeredDate: "2024-05-22", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG002",
    bestMatchDepartment: "Picker", departments: ["Picker", "Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 38, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 1.4, carTime: "4 mins", publicTransportTime: "12 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-05-22" }, healthAndSafety: { status: "verified", expiry: "2026-02-10" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2026-08-01" } },
    experience: [{ role: "Picker", years: 2 }, { role: "Warehouse Operative", years: 1 }],
    rating: 4.2, completedShifts: 48, punctualityScore: 91.5
  },
  {
    id: "SW009", name: "Nathan Byrne", email: "nathan.byrne@email.com", phone: "07204 938172",
    address: "55 Coundon Road", postcode: "CV6 1ET", dateOfBirth: "1983-08-30",
    nationalInsurance: "SN382019C",
    bankDetails: { sortCode: "40-11-27", accountNumber: "83019274", bankName: "HSBC" },
    emergencyContact: { name: "Claire Byrne", relationship: "Spouse", phone: "07456 301982" },
    registeredDate: "2023-07-08", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG002",
    bestMatchDepartment: "MHE", departments: ["MHE", "Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Night (22:00-06:00)"], maxHoursPerWeek: 48, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 3.7, carTime: "9 mins", publicTransportTime: "24 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-07-08" }, healthAndSafety: { status: "verified", expiry: "2025-06-15" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2025-12-01" } },
    experience: [{ role: "MHE", years: 8 }, { role: "Loader", years: 3 }],
    rating: 4.9, completedShifts: 174, punctualityScore: 98.6
  },
  {
    id: "SW010", name: "Holly Fitzpatrick", email: "holly.fitzpatrick@email.com", phone: "07739 201847",
    address: "12 Kenilworth Road", postcode: "CV4 7AH", dateOfBirth: "1991-01-14",
    nationalInsurance: "GR493820B",
    bankDetails: { sortCode: "11-22-08", accountNumber: "19384720", bankName: "Halifax" },
    emergencyContact: { name: "Sean Fitzpatrick", relationship: "Sibling", phone: "07881 394021" },
    registeredDate: "2024-01-30", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG002",
    bestMatchDepartment: "Loader", departments: ["Loader", "Picker"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 36, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "bicycle" },
    distance: { miles: 2.9, carTime: "7 mins", publicTransportTime: "18 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-01-30" }, healthAndSafety: { status: "verified", expiry: "2025-11-05" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 3 }, { role: "Picker", years: 1 }],
    rating: 4.1, completedShifts: 72, punctualityScore: 89.3
  },
  {
    id: "SW011", name: "Ravi Patel", email: "ravi.patel@email.com", phone: "07102 847301",
    address: "28 Foleshill Road", postcode: "CV1 4JH", dateOfBirth: "1989-05-26",
    nationalInsurance: "KL293847A",
    bankDetails: { sortCode: "20-30-17", accountNumber: "47291038", bankName: "Barclays" },
    emergencyContact: { name: "Anjali Patel", relationship: "Spouse", phone: "07765 482910" },
    registeredDate: "2024-06-10", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG002",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "MHE"],
    preferences: { preferredShifts: ["Night (22:00-06:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 1.9, carTime: "5 mins", publicTransportTime: "14 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-06-10" }, healthAndSafety: { status: "verified", expiry: "2026-03-20" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 5 }, { role: "MHE", years: 2 }],
    rating: 4.7, completedShifts: 53, punctualityScore: 96.8
  },
  {
    id: "SW012", name: "Zoe Chambers", email: "zoe.chambers@email.com", phone: "07629 183047",
    address: "9 Tile Hill Lane", postcode: "CV4 9DU", dateOfBirth: "1994-10-11",
    nationalInsurance: "PW847291B",
    bankDetails: { sortCode: "30-55-09", accountNumber: "58201934", bankName: "Lloyds" },
    emergencyContact: { name: "Helen Chambers", relationship: "Parent", phone: "07934 201847" },
    registeredDate: "2024-03-25", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG002",
    bestMatchDepartment: "Picker", departments: ["Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 32, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 7.2, carTime: "17 mins", publicTransportTime: "42 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-03-25" }, healthAndSafety: { status: "verified", expiry: "2025-12-18" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 3 }],
    rating: 4.4, completedShifts: 61, punctualityScore: 93.2
  },

  // AG003 – Elwood Staffing – LIVE
  {
    id: "SW013", name: "Craig Morrison", email: "craig.morrison@email.com", phone: "07345 928174",
    address: "41 Radford Road", postcode: "CV6 3BQ", dateOfBirth: "1982-12-07",
    nationalInsurance: "DM574829A",
    bankDetails: { sortCode: "09-14-33", accountNumber: "30472918", bankName: "Santander" },
    emergencyContact: { name: "Elaine Morrison", relationship: "Spouse", phone: "07812 394028" },
    registeredDate: "2023-06-15", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG003",
    bestMatchDepartment: "MHE", departments: ["MHE", "Warehouse Operative", "Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 48, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 2.4, carTime: "6 mins", publicTransportTime: "16 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-06-15" }, healthAndSafety: { status: "verified", expiry: "2025-08-01" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2026-01-15" } },
    experience: [{ role: "MHE", years: 10 }, { role: "Warehouse Operative", years: 5 }, { role: "Loader", years: 3 }],
    rating: 5.0, completedShifts: 178, punctualityScore: 99.4
  },
  {
    id: "SW014", name: "Sophie Brennan", email: "sophie.brennan@email.com", phone: "07481 029384",
    address: "16 Gulson Road", postcode: "CV1 2JG", dateOfBirth: "1997-03-19",
    nationalInsurance: "ML293018C",
    bankDetails: { sortCode: "40-28-11", accountNumber: "82019374", bankName: "HSBC" },
    emergencyContact: { name: "Patrick Brennan", relationship: "Parent", phone: "07723 491028" },
    registeredDate: "2024-07-01", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG003",
    bestMatchDepartment: "Picker", departments: ["Picker", "Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 38, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 1.1, carTime: "3 mins", publicTransportTime: "10 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-07-01" }, healthAndSafety: { status: "verified", expiry: "2026-04-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 1 }, { role: "Warehouse Operative", years: 1 }],
    rating: 4.0, completedShifts: 34, punctualityScore: 88.7
  },
  {
    id: "SW015", name: "Tyrone Ellis", email: "tyrone.ellis@email.com", phone: "07930 482019",
    address: "63 Humber Road", postcode: "CV3 1AZ", dateOfBirth: "1986-07-15",
    nationalInsurance: "RG847201D",
    bankDetails: { sortCode: "11-09-42", accountNumber: "63928401", bankName: "NatWest" },
    emergencyContact: { name: "Denise Ellis", relationship: "Parent", phone: "07654 302918" },
    registeredDate: "2023-12-01", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG003",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Night (22:00-06:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 5.0, carTime: "12 mins", publicTransportTime: "30 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-12-01" }, healthAndSafety: { status: "verified", expiry: "2025-10-10" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 8 }],
    rating: 4.6, completedShifts: 145, punctualityScore: 95.0
  },
  {
    id: "SW016", name: "Amara Diallo", email: "amara.diallo@email.com", phone: "07238 491028",
    address: "7 Primrose Hill Street", postcode: "CV5 8ES", dateOfBirth: "1998-01-22",
    nationalInsurance: "FN382910B",
    bankDetails: { sortCode: "20-67-14", accountNumber: "49201837", bankName: "Barclays" },
    emergencyContact: { name: "Ibrahim Diallo", relationship: "Sibling", phone: "07891 204837" },
    registeredDate: "2024-08-10", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG003",
    bestMatchDepartment: "Loader", departments: ["Loader", "Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 36, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "walking" },
    distance: { miles: 0.6, carTime: "2 mins", publicTransportTime: "6 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-08-10" }, healthAndSafety: { status: "verified", expiry: "2026-05-20" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 1 }],
    rating: 3.9, completedShifts: 28, punctualityScore: 87.2
  },
  {
    id: "SW017", name: "Gavin Whitehead", email: "gavin.whitehead@email.com", phone: "07102 384920",
    address: "34 Swan Lane", postcode: "CV2 4GJ", dateOfBirth: "1984-11-28",
    nationalInsurance: "YT291038C",
    bankDetails: { sortCode: "30-41-22", accountNumber: "71920384", bankName: "Lloyds" },
    emergencyContact: { name: "Karen Whitehead", relationship: "Spouse", phone: "07738 102948" },
    registeredDate: "2023-08-20", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG003",
    bestMatchDepartment: "MHE", departments: ["MHE"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 3.8, carTime: "9 mins", publicTransportTime: "25 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-08-20" }, healthAndSafety: { status: "verified", expiry: "2025-07-01" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2025-11-15" } },
    experience: [{ role: "MHE", years: 9 }],
    rating: 4.8, completedShifts: 163, punctualityScore: 97.9
  },
  {
    id: "SW018", name: "Kelsey Vaughan", email: "kelsey.vaughan@email.com", phone: "07584 210938",
    address: "52 Keresley Road", postcode: "CV6 2JN", dateOfBirth: "1993-04-02",
    nationalInsurance: "LB482910A",
    bankDetails: { sortCode: "09-33-18", accountNumber: "20384719", bankName: "Santander" },
    emergencyContact: { name: "Martin Vaughan", relationship: "Parent", phone: "07923 841029" },
    registeredDate: "2024-02-05", lastWorked: "2026-04-10", status: "live", registrationStatus: "live", agencyId: "AG003",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Picker"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 4.4, carTime: "11 mins", publicTransportTime: "27 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-02-05" }, healthAndSafety: { status: "verified", expiry: "2025-11-25" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 3 }, { role: "Picker", years: 2 }],
    rating: 4.5, completedShifts: 76, punctualityScore: 94.1
  },

  // ────────────────────────────────────────
  // STANDBY WORKERS — 27 total (9 per agency)
  // ────────────────────────────────────────

  // AG001 – Staffmark – STANDBY
  {
    id: "SW019", name: "Owen Harper", email: "owen.harper@email.com", phone: "07312 948201",
    address: "11 Spon End", postcode: "CV1 3HE", dateOfBirth: "1990-06-14",
    nationalInsurance: "QR482019A",
    bankDetails: { sortCode: "20-11-48", accountNumber: "38291047", bankName: "Barclays" },
    emergencyContact: { name: "Janet Harper", relationship: "Parent", phone: "07700 293841" },
    registeredDate: "2024-01-22", lastWorked: "2026-04-02", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "car" },
    distance: { miles: 2.8, carTime: "7 mins", publicTransportTime: "19 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-01-22" }, healthAndSafety: { status: "verified", expiry: "2025-10-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 4 }],
    rating: 4.3, completedShifts: 89, punctualityScore: 92.1
  },
  {
    id: "SW020", name: "Isla McGregor", email: "isla.mcgregor@email.com", phone: "07493 201847",
    address: "26 Hearsall Lane", postcode: "CV5 6HG", dateOfBirth: "1995-09-03",
    nationalInsurance: "WK293018D",
    bankDetails: { sortCode: "30-72-15", accountNumber: "49102837", bankName: "Lloyds" },
    emergencyContact: { name: "Fiona McGregor", relationship: "Parent", phone: "07834 192047" },
    registeredDate: "2024-04-18", lastWorked: "2026-03-28", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "Picker", departments: ["Picker", "Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 34, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 5.5, carTime: "13 mins", publicTransportTime: "33 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-04-18" }, healthAndSafety: { status: "verified", expiry: "2026-01-10" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 2 }, { role: "Warehouse Operative", years: 1 }],
    rating: 4.1, completedShifts: 45, punctualityScore: 90.4
  },
  {
    id: "SW021", name: "Toby Ashworth", email: "toby.ashworth@email.com", phone: "07182 493028",
    address: "38 Longford Road", postcode: "CV6 6DR", dateOfBirth: "1988-02-17",
    nationalInsurance: "NB482910C",
    bankDetails: { sortCode: "40-09-37", accountNumber: "58291034", bankName: "HSBC" },
    emergencyContact: { name: "Rachel Ashworth", relationship: "Spouse", phone: "07956 301928" },
    registeredDate: "2023-11-05", lastWorked: "2026-04-05", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "MHE", departments: ["MHE", "Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Night (22:00-06:00)"], maxHoursPerWeek: 48, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 4.9, carTime: "12 mins", publicTransportTime: "30 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-11-05" }, healthAndSafety: { status: "verified", expiry: "2025-09-20" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2026-03-10" } },
    experience: [{ role: "MHE", years: 6 }, { role: "Loader", years: 2 }],
    rating: 4.6, completedShifts: 112, punctualityScore: 95.7
  },
  {
    id: "SW022", name: "Chloe Parsons", email: "chloe.parsons@email.com", phone: "07629 384019",
    address: "5 Stoke Row", postcode: "CV2 4JP", dateOfBirth: "1997-12-30",
    nationalInsurance: "FT382019B",
    bankDetails: { sortCode: "11-28-03", accountNumber: "72910384", bankName: "NatWest" },
    emergencyContact: { name: "Steve Parsons", relationship: "Parent", phone: "07812 920384" },
    registeredDate: "2024-06-28", lastWorked: "2026-03-31", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "Loader", departments: ["Loader"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 30, availableDays: ["Mon","Tue","Wed","Thu"], noticePeriod: "48 hours", transportMode: "bicycle" },
    distance: { miles: 3.1, carTime: "8 mins", publicTransportTime: "20 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-06-28" }, healthAndSafety: { status: "pending", expiry: "2025-03-01" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 1 }],
    rating: 3.8, completedShifts: 22, punctualityScore: 85.3
  },
  {
    id: "SW023", name: "Daniel Frost", email: "daniel.frost@email.com", phone: "07401 293847",
    address: "17 Stoney Road", postcode: "CV1 2NT", dateOfBirth: "1986-05-11",
    nationalInsurance: "HJ293847D",
    bankDetails: { sortCode: "20-55-19", accountNumber: "18392047", bankName: "Barclays" },
    emergencyContact: { name: "Lisa Frost", relationship: "Spouse", phone: "07734 829104" },
    registeredDate: "2023-10-22", lastWorked: "2026-04-07", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 1.6, carTime: "4 mins", publicTransportTime: "12 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-10-22" }, healthAndSafety: { status: "verified", expiry: "2025-08-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 7 }, { role: "Picker", years: 3 }],
    rating: 4.7, completedShifts: 134, punctualityScore: 96.4
  },
  {
    id: "SW024", name: "Elena Kovac", email: "elena.kovac@email.com", phone: "07563 102938",
    address: "44 Walsgrave Road", postcode: "CV2 4ED", dateOfBirth: "1992-08-25",
    nationalInsurance: "TP493820A",
    bankDetails: { sortCode: "30-18-44", accountNumber: "82930147", bankName: "Lloyds" },
    emergencyContact: { name: "Mirko Kovac", relationship: "Spouse", phone: "07891 402938" },
    registeredDate: "2024-03-15", lastWorked: "2026-03-25", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "Picker", departments: ["Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 38, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 4.2, carTime: "10 mins", publicTransportTime: "26 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-03-15" }, healthAndSafety: { status: "verified", expiry: "2025-12-20" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 3 }],
    rating: 4.4, completedShifts: 58, punctualityScore: 93.8
  },
  {
    id: "SW025", name: "Bradley Nolan", email: "bradley.nolan@email.com", phone: "07234 918374",
    address: "29 Quinton Road", postcode: "CV1 2WT", dateOfBirth: "1980-03-09",
    nationalInsurance: "VG382019C",
    bankDetails: { sortCode: "09-22-51", accountNumber: "39201847", bankName: "Santander" },
    emergencyContact: { name: "Diane Nolan", relationship: "Spouse", phone: "07623 491028" },
    registeredDate: "2023-05-10", lastWorked: "2026-04-08", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "MHE", departments: ["MHE", "Warehouse Operative"],
    preferences: { preferredShifts: ["Night (22:00-06:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 2.3, carTime: "6 mins", publicTransportTime: "15 mins" },
    compliance: { rightToWork: { status: "expired", expiry: "2025-01-10" }, healthAndSafety: { status: "verified", expiry: "2025-07-20" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2025-09-15" } },
    experience: [{ role: "MHE", years: 12 }, { role: "Warehouse Operative", years: 5 }],
    rating: 4.8, completedShifts: 165, punctualityScore: 97.2
  },
  {
    id: "SW026", name: "Megan Hurst", email: "megan.hurst@email.com", phone: "07845 201938",
    address: "13 Holyhead Road", postcode: "CV5 8LT", dateOfBirth: "1999-07-18",
    nationalInsurance: "AK392018D",
    bankDetails: { sortCode: "40-33-08", accountNumber: "61829304", bankName: "HSBC" },
    emergencyContact: { name: "Paul Hurst", relationship: "Parent", phone: "07712 384920" },
    registeredDate: "2024-09-01", lastWorked: "2026-03-22", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 32, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "48 hours", transportMode: "public" },
    distance: { miles: 6.8, carTime: "16 mins", publicTransportTime: "40 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-09-01" }, healthAndSafety: { status: "verified", expiry: "2026-06-10" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 1 }],
    rating: 3.7, completedShifts: 18, punctualityScore: 83.9
  },
  {
    id: "SW027", name: "Aiden Fletcher", email: "aiden.fletcher@email.com", phone: "07190 384920",
    address: "60 Wyken Croft", postcode: "CV2 3AA", dateOfBirth: "1991-11-04",
    nationalInsurance: "RM493820B",
    bankDetails: { sortCode: "11-47-22", accountNumber: "47382910", bankName: "NatWest" },
    emergencyContact: { name: "Kathy Fletcher", relationship: "Parent", phone: "07834 201938" },
    registeredDate: "2024-02-10", lastWorked: "2026-04-01", status: "standby", registrationStatus: "standby", agencyId: "AG001",
    bestMatchDepartment: "Loader", departments: ["Loader", "Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "24 hours", transportMode: "car" },
    distance: { miles: 5.3, carTime: "13 mins", publicTransportTime: "32 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-02-10" }, healthAndSafety: { status: "verified", expiry: "2025-11-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 4 }, { role: "Warehouse Operative", years: 2 }],
    rating: 4.2, completedShifts: 67, punctualityScore: 91.6
  },

  // AG002 – Elite Staffing – STANDBY
  {
    id: "SW028", name: "Connor Walsh", email: "connor.walsh@email.com", phone: "07392 018475",
    address: "8 Barras Lane", postcode: "CV1 3BU", dateOfBirth: "1989-01-27",
    nationalInsurance: "EG493820C",
    bankDetails: { sortCode: "20-38-14", accountNumber: "59201834", bankName: "Barclays" },
    emergencyContact: { name: "Maureen Walsh", relationship: "Parent", phone: "07700 384920" },
    registeredDate: "2024-01-05", lastWorked: "2026-04-03", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 1.8, carTime: "5 mins", publicTransportTime: "13 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-01-05" }, healthAndSafety: { status: "verified", expiry: "2025-09-18" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 5 }, { role: "Loader", years: 3 }],
    rating: 4.5, completedShifts: 103, punctualityScore: 94.9
  },
  {
    id: "SW029", name: "Naomi Chen", email: "naomi.chen@email.com", phone: "07541 293018",
    address: "21 Brays Lane", postcode: "CV2 0GR", dateOfBirth: "1994-10-06",
    nationalInsurance: "UJ382910A",
    bankDetails: { sortCode: "30-44-19", accountNumber: "28391047", bankName: "Lloyds" },
    emergencyContact: { name: "Wei Chen", relationship: "Parent", phone: "07812 493028" },
    registeredDate: "2024-05-12", lastWorked: "2026-03-29", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "Picker", departments: ["Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 34, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 3.6, carTime: "9 mins", publicTransportTime: "23 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-05-12" }, healthAndSafety: { status: "verified", expiry: "2026-02-28" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 2 }],
    rating: 4.0, completedShifts: 38, punctualityScore: 89.7
  },
  {
    id: "SW030", name: "Ryan Gallagher", email: "ryan.gallagher@email.com", phone: "07283 491028",
    address: "33 Bell Green Road", postcode: "CV6 7GP", dateOfBirth: "1987-06-20",
    nationalInsurance: "CL293847B",
    bankDetails: { sortCode: "09-18-42", accountNumber: "73920184", bankName: "Santander" },
    emergencyContact: { name: "Teresa Gallagher", relationship: "Spouse", phone: "07934 201847" },
    registeredDate: "2023-09-15", lastWorked: "2026-04-06", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "MHE", departments: ["MHE", "Warehouse Operative"],
    preferences: { preferredShifts: ["Night (22:00-06:00)"], maxHoursPerWeek: 48, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 6.1, carTime: "15 mins", publicTransportTime: "37 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-09-15" }, healthAndSafety: { status: "expired", expiry: "2025-02-01" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2026-01-20" } },
    experience: [{ role: "MHE", years: 7 }, { role: "Warehouse Operative", years: 4 }],
    rating: 4.6, completedShifts: 128, punctualityScore: 95.3
  },
  {
    id: "SW031", name: "Sienna Marsh", email: "sienna.marsh@email.com", phone: "07412 839201",
    address: "15 Queen Isabel's Avenue", postcode: "CV3 5GE", dateOfBirth: "1996-04-13",
    nationalInsurance: "XP492031A",
    bankDetails: { sortCode: "40-15-28", accountNumber: "82910347", bankName: "HSBC" },
    emergencyContact: { name: "Deborah Marsh", relationship: "Parent", phone: "07623 384920" },
    registeredDate: "2024-07-20", lastWorked: "2026-03-26", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "Loader", departments: ["Loader", "Picker"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 36, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "48 hours", transportMode: "bicycle" },
    distance: { miles: 4.7, carTime: "11 mins", publicTransportTime: "29 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-07-20" }, healthAndSafety: { status: "verified", expiry: "2026-04-05" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 2 }, { role: "Picker", years: 1 }],
    rating: 3.9, completedShifts: 31, punctualityScore: 87.8
  },
  {
    id: "SW032", name: "Declan Murray", email: "declan.murray@email.com", phone: "07190 847293",
    address: "42 Daventry Road", postcode: "CV3 5HF", dateOfBirth: "1983-09-08",
    nationalInsurance: "GH293018D",
    bankDetails: { sortCode: "11-33-07", accountNumber: "49382910", bankName: "NatWest" },
    emergencyContact: { name: "Colleen Murray", relationship: "Spouse", phone: "07745 291038" },
    registeredDate: "2023-08-01", lastWorked: "2026-04-04", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 5.9, carTime: "14 mins", publicTransportTime: "36 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-08-01" }, healthAndSafety: { status: "verified", expiry: "2025-06-10" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 9 }],
    rating: 4.7, completedShifts: 147, punctualityScore: 96.1
  },
  {
    id: "SW033", name: "Lydia Grant", email: "lydia.grant@email.com", phone: "07563 920184",
    address: "2 Earlsdon Street", postcode: "CV5 6EP", dateOfBirth: "1998-11-21",
    nationalInsurance: "BN492031C",
    bankDetails: { sortCode: "20-72-33", accountNumber: "19384720", bankName: "Halifax" },
    emergencyContact: { name: "Nigel Grant", relationship: "Parent", phone: "07891 203847" },
    registeredDate: "2024-08-15", lastWorked: "2026-03-20", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "Picker", departments: ["Picker", "Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 32, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 5.2, carTime: "13 mins", publicTransportTime: "31 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-08-15" }, healthAndSafety: { status: "verified", expiry: "2026-05-01" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 1 }],
    rating: 3.6, completedShifts: 15, punctualityScore: 82.4
  },
  {
    id: "SW034", name: "Jake Thornton", email: "jake.thornton@email.com", phone: "07302 491837",
    address: "58 Alderman's Green Road", postcode: "CV2 1PP", dateOfBirth: "1985-02-14",
    nationalInsurance: "YR382910B",
    bankDetails: { sortCode: "30-09-44", accountNumber: "63829104", bankName: "Lloyds" },
    emergencyContact: { name: "Sarah Thornton", relationship: "Spouse", phone: "07712 930184" },
    registeredDate: "2023-12-10", lastWorked: "2026-04-09", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "MHE", departments: ["MHE"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 7.8, carTime: "18 mins", publicTransportTime: "45 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-12-10" }, healthAndSafety: { status: "verified", expiry: "2025-10-25" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2026-04-10" } },
    experience: [{ role: "MHE", years: 8 }],
    rating: 4.8, completedShifts: 139, punctualityScore: 97.5
  },
  {
    id: "SW035", name: "Hannah Reeves", email: "hannah.reeves@email.com", phone: "07845 302918",
    address: "10 Albany Road", postcode: "CV5 6JQ", dateOfBirth: "1993-07-29",
    nationalInsurance: "KS482019A",
    bankDetails: { sortCode: "09-44-17", accountNumber: "30291847", bankName: "Santander" },
    emergencyContact: { name: "Mark Reeves", relationship: "Sibling", phone: "07934 281047" },
    registeredDate: "2024-04-02", lastWorked: "2026-03-27", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Picker"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 38, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "walking" },
    distance: { miles: 0.9, carTime: "3 mins", publicTransportTime: "8 mins" },
    compliance: { rightToWork: { status: "pending", expiry: "2025-04-15" }, healthAndSafety: { status: "verified", expiry: "2026-01-30" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 3 }, { role: "Picker", years: 2 }],
    rating: 4.3, completedShifts: 52, punctualityScore: 92.6
  },
  {
    id: "SW036", name: "Luis Rivera", email: "luis.rivera@email.com", phone: "07412 839204",
    address: "25 Middlemarch Road", postcode: "CV6 5GN", dateOfBirth: "1990-12-01",
    nationalInsurance: "PN392018D",
    bankDetails: { sortCode: "40-22-39", accountNumber: "91038274", bankName: "HSBC" },
    emergencyContact: { name: "Maria Rivera", relationship: "Spouse", phone: "07623 910384" },
    registeredDate: "2024-02-28", lastWorked: "2026-04-02", status: "standby", registrationStatus: "standby", agencyId: "AG002",
    bestMatchDepartment: "Loader", departments: ["Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "24 hours", transportMode: "car" },
    distance: { miles: 4.0, carTime: "10 mins", publicTransportTime: "25 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-02-28" }, healthAndSafety: { status: "verified", expiry: "2025-12-05" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 4 }],
    rating: 4.4, completedShifts: 71, punctualityScore: 93.4
  },

  // AG003 – Elwood Staffing – STANDBY
  {
    id: "SW037", name: "Freya Dalton", email: "freya.dalton@email.com", phone: "07293 810294",
    address: "36 Kenilworth Street", postcode: "CV4 7AL", dateOfBirth: "1992-03-16",
    nationalInsurance: "WM493820A",
    bankDetails: { sortCode: "20-14-55", accountNumber: "38201947", bankName: "Barclays" },
    emergencyContact: { name: "Simon Dalton", relationship: "Spouse", phone: "07700 821034" },
    registeredDate: "2024-01-18", lastWorked: "2026-04-05", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "car" },
    distance: { miles: 3.4, carTime: "8 mins", publicTransportTime: "21 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-01-18" }, healthAndSafety: { status: "verified", expiry: "2025-10-10" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 4 }, { role: "Picker", years: 2 }],
    rating: 4.5, completedShifts: 84, punctualityScore: 94.7
  },
  {
    id: "SW038", name: "Patrick Doyle", email: "patrick.doyle@email.com", phone: "07581 293047",
    address: "49 Sewall Highway", postcode: "CV2 3PA", dateOfBirth: "1981-09-22",
    nationalInsurance: "JN293847C",
    bankDetails: { sortCode: "30-28-11", accountNumber: "47291038", bankName: "Lloyds" },
    emergencyContact: { name: "Mary Doyle", relationship: "Parent", phone: "07834 902184" },
    registeredDate: "2023-07-25", lastWorked: "2026-04-08", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "MHE", departments: ["MHE", "Loader", "Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Night (22:00-06:00)"], maxHoursPerWeek: 48, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 5.6, carTime: "14 mins", publicTransportTime: "34 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-07-25" }, healthAndSafety: { status: "verified", expiry: "2025-05-15" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2025-10-20" } },
    experience: [{ role: "MHE", years: 11 }, { role: "Loader", years: 5 }, { role: "Warehouse Operative", years: 3 }],
    rating: 4.9, completedShifts: 171, punctualityScore: 98.2
  },
  {
    id: "SW039", name: "Rosie Beckett", email: "rosie.beckett@email.com", phone: "07402 381920",
    address: "4 Craven Street", postcode: "CV5 8DS", dateOfBirth: "1997-06-07",
    nationalInsurance: "TH382019B",
    bankDetails: { sortCode: "09-31-27", accountNumber: "82019384", bankName: "Santander" },
    emergencyContact: { name: "Alan Beckett", relationship: "Parent", phone: "07912 384029" },
    registeredDate: "2024-06-05", lastWorked: "2026-03-30", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "Picker", departments: ["Picker"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 34, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 6.5, carTime: "16 mins", publicTransportTime: "39 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-06-05" }, healthAndSafety: { status: "verified", expiry: "2026-03-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 1 }],
    rating: 3.8, completedShifts: 24, punctualityScore: 86.1
  },
  {
    id: "SW040", name: "Sam Okafor", email: "sam.okafor@email.com", phone: "07629 102847",
    address: "18 Jenner Street", postcode: "CV6 1HW", dateOfBirth: "1988-12-19",
    nationalInsurance: "DF493820D",
    bankDetails: { sortCode: "11-55-14", accountNumber: "58392010", bankName: "NatWest" },
    emergencyContact: { name: "Grace Okafor", relationship: "Sibling", phone: "07745 392018" },
    registeredDate: "2023-11-30", lastWorked: "2026-04-07", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "Loader", departments: ["Loader", "Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 2.7, carTime: "7 mins", publicTransportTime: "18 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-11-30" }, healthAndSafety: { status: "verified", expiry: "2025-09-22" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 5 }, { role: "Warehouse Operative", years: 3 }],
    rating: 4.6, completedShifts: 118, punctualityScore: 95.5
  },
  {
    id: "SW041", name: "Victoria Lees", email: "victoria.lees@email.com", phone: "07384 920183",
    address: "23 Blackberry Lane", postcode: "CV4 9PH", dateOfBirth: "1994-01-31",
    nationalInsurance: "SM382910A",
    bankDetails: { sortCode: "20-41-08", accountNumber: "72918304", bankName: "Barclays" },
    emergencyContact: { name: "Tom Lees", relationship: "Spouse", phone: "07812 493820" },
    registeredDate: "2024-03-28", lastWorked: "2026-03-24", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 38, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 8.1, carTime: "19 mins", publicTransportTime: "48 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-03-28" }, healthAndSafety: { status: "pending", expiry: "2025-03-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 3 }],
    rating: 4.1, completedShifts: 42, punctualityScore: 90.8
  },
  {
    id: "SW042", name: "Felix Osei", email: "felix.osei@email.com", phone: "07102 483920",
    address: "57 Hipswell Highway", postcode: "CV2 5FW", dateOfBirth: "1986-08-12",
    nationalInsurance: "NR493028C",
    bankDetails: { sortCode: "30-63-22", accountNumber: "39201847", bankName: "Lloyds" },
    emergencyContact: { name: "Abena Osei", relationship: "Spouse", phone: "07934 820193" },
    registeredDate: "2023-10-05", lastWorked: "2026-04-06", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "MHE", departments: ["MHE"],
    preferences: { preferredShifts: ["Night (22:00-06:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 4.3, carTime: "10 mins", publicTransportTime: "27 mins" },
    compliance: { rightToWork: { status: "expired", expiry: "2025-02-05" }, healthAndSafety: { status: "verified", expiry: "2025-08-18" }, contract: { status: "signed" }, dbs: { status: "verified", expiry: "2025-12-10" } },
    experience: [{ role: "MHE", years: 7 }],
    rating: 4.7, completedShifts: 131, punctualityScore: 96.0
  },
  {
    id: "SW043", name: "Erin Blackwell", email: "erin.blackwell@email.com", phone: "07293 481920",
    address: "32 Broad Street", postcode: "CV6 5BB", dateOfBirth: "1991-05-09",
    nationalInsurance: "QK382019D",
    bankDetails: { sortCode: "09-17-44", accountNumber: "82930184", bankName: "Santander" },
    emergencyContact: { name: "Dave Blackwell", relationship: "Parent", phone: "07623 491820" },
    registeredDate: "2024-05-01", lastWorked: "2026-03-23", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "Picker", departments: ["Picker", "Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 36, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "48 hours", transportMode: "bicycle" },
    distance: { miles: 3.0, carTime: "7 mins", publicTransportTime: "19 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-05-01" }, healthAndSafety: { status: "verified", expiry: "2026-02-18" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 2 }, { role: "Warehouse Operative", years: 1 }],
    rating: 4.0, completedShifts: 36, punctualityScore: 88.5
  },
  {
    id: "SW044", name: "Kieran Potts", email: "kieran.potts@email.com", phone: "07481 392018",
    address: "14 Leamington Road", postcode: "CV3 6GD", dateOfBirth: "1984-04-27",
    nationalInsurance: "HB293847A",
    bankDetails: { sortCode: "40-08-33", accountNumber: "49382019", bankName: "HSBC" },
    emergencyContact: { name: "June Potts", relationship: "Parent", phone: "07834 293018" },
    registeredDate: "2023-09-18", lastWorked: "2026-04-03", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 5.4, carTime: "13 mins", publicTransportTime: "33 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2025-09-18" }, healthAndSafety: { status: "verified", expiry: "2025-07-28" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 8 }, { role: "Loader", years: 4 }],
    rating: 4.8, completedShifts: 152, punctualityScore: 97.1
  },
  {
    id: "SW045", name: "Natasha Vickers", email: "natasha.vickers@email.com", phone: "07190 293847",
    address: "40 Monk Street", postcode: "CV1 4JH", dateOfBirth: "1995-10-15",
    nationalInsurance: "WL382910B",
    bankDetails: { sortCode: "11-29-18", accountNumber: "58291034", bankName: "Halifax" },
    emergencyContact: { name: "Carl Vickers", relationship: "Sibling", phone: "07712 492038" },
    registeredDate: "2024-04-22", lastWorked: "2026-03-21", status: "standby", registrationStatus: "standby", agencyId: "AG003",
    bestMatchDepartment: "Loader", departments: ["Loader"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 32, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 1.3, carTime: "4 mins", publicTransportTime: "11 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2026-04-22" }, healthAndSafety: { status: "verified", expiry: "2026-01-28" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 2 }],
    rating: 4.2, completedShifts: 47, punctualityScore: 91.3
  },

  // ────────────────────────────────────────
  // NEW REGISTERED WORKERS — 15 total (5 per agency)
  // ────────────────────────────────────────

  // AG001 – Staffmark – NEW REGISTERED
  {
    id: "SW046", name: "Alfie Stanton", email: "alfie.stanton@email.com", phone: "07345 291038",
    address: "1 Corporation Street", postcode: "CV1 1GF", dateOfBirth: "2000-02-11",
    nationalInsurance: "MG493820C",
    bankDetails: { sortCode: "20-09-44", accountNumber: "38291047", bankName: "Barclays" },
    emergencyContact: { name: "Jackie Stanton", relationship: "Parent", phone: "07700 492038" },
    registeredDate: "2026-03-22", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG001",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 2.0, carTime: "5 mins", publicTransportTime: "14 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-22" }, healthAndSafety: { status: "pending", expiry: "2026-09-22" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW047", name: "Imogen Swift", email: "imogen.swift@email.com", phone: "07412 920183",
    address: "27 Northumberland Road", postcode: "CV5 6HQ", dateOfBirth: "1999-08-23",
    nationalInsurance: "DL293018A",
    bankDetails: { sortCode: "30-15-29", accountNumber: "72019384", bankName: "Lloyds" },
    emergencyContact: { name: "Rebecca Swift", relationship: "Parent", phone: "07812 930182" },
    registeredDate: "2026-03-28", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG001",
    bestMatchDepartment: "Picker", departments: ["Picker"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 32, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "48 hours", transportMode: "walking" },
    distance: { miles: 0.5, carTime: "2 mins", publicTransportTime: "5 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-28" }, healthAndSafety: { status: "pending", expiry: "2026-09-28" }, contract: { status: "pending" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Picker", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW048", name: "George Kimber", email: "george.kimber@email.com", phone: "07293 184920",
    address: "9 Whitley Village", postcode: "CV3 4AQ", dateOfBirth: "1998-05-30",
    nationalInsurance: "SH492019B",
    bankDetails: { sortCode: "09-28-11", accountNumber: "49102837", bankName: "Santander" },
    emergencyContact: { name: "Linda Kimber", relationship: "Parent", phone: "07934 102847" },
    registeredDate: "2026-04-01", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG001",
    bestMatchDepartment: "MHE", departments: ["MHE"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 4.6, carTime: "11 mins", publicTransportTime: "28 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-04-01" }, healthAndSafety: { status: "verified", expiry: "2026-10-01" }, contract: { status: "signed" }, dbs: { status: "pending", expiry: null } },
    experience: [{ role: "MHE", years: 2 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW049", name: "Ruby Langford", email: "ruby.langford@email.com", phone: "07581 029384",
    address: "33 Trentham Road", postcode: "CV6 2DB", dateOfBirth: "2000-11-16",
    nationalInsurance: "PK293018D",
    bankDetails: { sortCode: "40-18-07", accountNumber: "82391047", bankName: "HSBC" },
    emergencyContact: { name: "Tony Langford", relationship: "Parent", phone: "07623 821034" },
    registeredDate: "2026-04-05", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG001",
    bestMatchDepartment: "Loader", departments: ["Loader"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 30, availableDays: ["Mon","Tue","Wed","Thu"], noticePeriod: "48 hours", transportMode: "public" },
    distance: { miles: 3.9, carTime: "10 mins", publicTransportTime: "24 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-04-05" }, healthAndSafety: { status: "pending", expiry: "2026-10-05" }, contract: { status: "pending" }, dbs: { status: "not-required", expiry: null } },
    experience: [],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW050", name: "Elliot Chambers-Wells", email: "elliot.chamberswells@email.com", phone: "07102 938204",
    address: "46 Hen Lane", postcode: "CV6 4LB", dateOfBirth: "1999-03-04",
    nationalInsurance: "BG382910C",
    bankDetails: { sortCode: "11-42-19", accountNumber: "19283047", bankName: "NatWest" },
    emergencyContact: { name: "Jill Chambers", relationship: "Parent", phone: "07745 291038" },
    registeredDate: "2026-03-15", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG001",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)"], maxHoursPerWeek: 38, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "bicycle" },
    distance: { miles: 2.5, carTime: "6 mins", publicTransportTime: "17 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-15" }, healthAndSafety: { status: "verified", expiry: "2026-09-15" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },

  // AG002 – Elite Staffing – NEW REGISTERED
  {
    id: "SW051", name: "Maya Hussain", email: "maya.hussain@email.com", phone: "07345 820193",
    address: "12 St Nicholas Street", postcode: "CV1 4BZ", dateOfBirth: "2000-07-09",
    nationalInsurance: "KN493820A",
    bankDetails: { sortCode: "20-33-51", accountNumber: "38920147", bankName: "Barclays" },
    emergencyContact: { name: "Tariq Hussain", relationship: "Parent", phone: "07700 382019" },
    registeredDate: "2026-03-18", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG002",
    bestMatchDepartment: "Picker", departments: ["Picker"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 34, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "public" },
    distance: { miles: 1.2, carTime: "3 mins", publicTransportTime: "10 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-18" }, healthAndSafety: { status: "pending", expiry: "2026-09-18" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW052", name: "Tyler Manning", email: "tyler.manning@email.com", phone: "07412 293018",
    address: "20 Brookside Avenue", postcode: "CV5 8AX", dateOfBirth: "1999-01-18",
    nationalInsurance: "RJ382019B",
    bankDetails: { sortCode: "30-42-18", accountNumber: "59201847", bankName: "Lloyds" },
    emergencyContact: { name: "Carol Manning", relationship: "Parent", phone: "07834 102938" },
    registeredDate: "2026-03-25", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG002",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "24 hours", transportMode: "car" },
    distance: { miles: 5.7, carTime: "14 mins", publicTransportTime: "34 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-25" }, healthAndSafety: { status: "verified", expiry: "2026-09-25" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW053", name: "Leah Woodward", email: "leah.woodward@email.com", phone: "07293 481029",
    address: "7 Paynes Lane", postcode: "CV1 5HL", dateOfBirth: "1998-10-02",
    nationalInsurance: "FG493018C",
    bankDetails: { sortCode: "09-39-14", accountNumber: "72910384", bankName: "Santander" },
    emergencyContact: { name: "Phil Woodward", relationship: "Parent", phone: "07912 384920" },
    registeredDate: "2026-04-03", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG002",
    bestMatchDepartment: "MHE", departments: ["MHE"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 1.5, carTime: "4 mins", publicTransportTime: "12 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-04-03" }, healthAndSafety: { status: "verified", expiry: "2026-10-03" }, contract: { status: "signed" }, dbs: { status: "pending", expiry: null } },
    experience: [{ role: "MHE", years: 2 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW054", name: "Kofi Mensah", email: "kofi.mensah@email.com", phone: "07581 392018",
    address: "35 Ansty Road", postcode: "CV2 3EY", dateOfBirth: "1997-04-28",
    nationalInsurance: "WN382019A",
    bankDetails: { sortCode: "40-27-11", accountNumber: "49182037", bankName: "HSBC" },
    emergencyContact: { name: "Ama Mensah", relationship: "Sibling", phone: "07623 291038" },
    registeredDate: "2026-03-30", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG002",
    bestMatchDepartment: "Loader", departments: ["Loader", "Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Night (22:00-06:00)"], maxHoursPerWeek: 48, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 6.9, carTime: "16 mins", publicTransportTime: "41 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-30" }, healthAndSafety: { status: "pending", expiry: "2026-09-30" }, contract: { status: "pending" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Loader", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW055", name: "Charlotte Finch", email: "charlotte.finch@email.com", phone: "07190 829304",
    address: "51 Sherbourne Crescent", postcode: "CV5 8JT", dateOfBirth: "2000-12-06",
    nationalInsurance: "LP293847D",
    bankDetails: { sortCode: "11-18-33", accountNumber: "82930147", bankName: "Halifax" },
    emergencyContact: { name: "Graham Finch", relationship: "Parent", phone: "07745 820193" },
    registeredDate: "2026-04-07", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG002",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 30, availableDays: ["Mon","Tue","Wed","Thu"], noticePeriod: "48 hours", transportMode: "walking" },
    distance: { miles: 0.7, carTime: "2 mins", publicTransportTime: "7 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-04-07" }, healthAndSafety: { status: "pending", expiry: "2026-10-07" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },

  // AG003 – Elwood Staffing – NEW REGISTERED
  {
    id: "SW056", name: "Jude Patterson", email: "jude.patterson@email.com", phone: "07345 102938",
    address: "11 Beake Avenue", postcode: "CV6 3AT", dateOfBirth: "1999-06-14",
    nationalInsurance: "TS493820B",
    bankDetails: { sortCode: "20-55-07", accountNumber: "38291047", bankName: "Barclays" },
    emergencyContact: { name: "Wendy Patterson", relationship: "Parent", phone: "07700 293018" },
    registeredDate: "2026-03-20", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG003",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative", "Loader"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 40, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "car" },
    distance: { miles: 3.3, carTime: "8 mins", publicTransportTime: "21 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-20" }, healthAndSafety: { status: "verified", expiry: "2026-09-20" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW057", name: "Ava Kaur", email: "ava.kaur@email.com", phone: "07412 839102",
    address: "24 Kenpas Highway", postcode: "CV3 6BP", dateOfBirth: "2000-09-27",
    nationalInsurance: "GN382910D",
    bankDetails: { sortCode: "30-11-44", accountNumber: "59201834", bankName: "Lloyds" },
    emergencyContact: { name: "Harpreet Kaur", relationship: "Parent", phone: "07834 291028" },
    registeredDate: "2026-03-26", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG003",
    bestMatchDepartment: "Picker", departments: ["Picker"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 32, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "48 hours", transportMode: "public" },
    distance: { miles: 4.8, carTime: "12 mins", publicTransportTime: "29 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-26" }, healthAndSafety: { status: "pending", expiry: "2026-09-26" }, contract: { status: "pending" }, dbs: { status: "not-required", expiry: null } },
    experience: [],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW058", name: "Cameron Holt", email: "cameron.holt@email.com", phone: "07293 920184",
    address: "39 Widdrington Road", postcode: "CV1 4EU", dateOfBirth: "1998-02-08",
    nationalInsurance: "AJ493018A",
    bankDetails: { sortCode: "09-24-38", accountNumber: "72019384", bankName: "Santander" },
    emergencyContact: { name: "Diane Holt", relationship: "Parent", phone: "07912 493820" },
    registeredDate: "2026-04-02", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG003",
    bestMatchDepartment: "MHE", departments: ["MHE"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)", "Night (22:00-06:00)"], maxHoursPerWeek: 44, availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"], noticePeriod: "Same day", transportMode: "car" },
    distance: { miles: 1.7, carTime: "4 mins", publicTransportTime: "13 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-04-02" }, healthAndSafety: { status: "verified", expiry: "2026-10-02" }, contract: { status: "signed" }, dbs: { status: "pending", expiry: null } },
    experience: [{ role: "MHE", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW059", name: "Bethany Rowan", email: "bethany.rowan@email.com", phone: "07581 293018",
    address: "6 Kirby Corner Road", postcode: "CV4 8GD", dateOfBirth: "2000-04-19",
    nationalInsurance: "VE382910C",
    bankDetails: { sortCode: "40-33-14", accountNumber: "19283047", bankName: "HSBC" },
    emergencyContact: { name: "Neil Rowan", relationship: "Parent", phone: "07623 910284" },
    registeredDate: "2026-04-06", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG003",
    bestMatchDepartment: "Loader", departments: ["Loader"],
    preferences: { preferredShifts: ["Afternoon (14:00-22:00)"], maxHoursPerWeek: 30, availableDays: ["Mon","Tue","Wed","Thu"], noticePeriod: "48 hours", transportMode: "public" },
    distance: { miles: 7.4, carTime: "17 mins", publicTransportTime: "44 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-04-06" }, healthAndSafety: { status: "pending", expiry: "2026-10-06" }, contract: { status: "pending" }, dbs: { status: "not-required", expiry: null } },
    experience: [],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
  {
    id: "SW060", name: "Noah Griffiths", email: "noah.griffiths@email.com", phone: "07190 382019",
    address: "53 Hartington Crescent", postcode: "CV5 6EH", dateOfBirth: "1999-08-01",
    nationalInsurance: "QP493820D",
    bankDetails: { sortCode: "11-09-28", accountNumber: "49382910", bankName: "NatWest" },
    emergencyContact: { name: "Rhian Griffiths", relationship: "Parent", phone: "07745 382019" },
    registeredDate: "2026-03-12", lastWorked: null, status: "standby", registrationStatus: "new-registered", agencyId: "AG003",
    bestMatchDepartment: "Warehouse Operative", departments: ["Warehouse Operative"],
    preferences: { preferredShifts: ["Morning (06:00-14:00)"], maxHoursPerWeek: 38, availableDays: ["Mon","Tue","Wed","Thu","Fri"], noticePeriod: "24 hours", transportMode: "bicycle" },
    distance: { miles: 2.6, carTime: "6 mins", publicTransportTime: "17 mins" },
    compliance: { rightToWork: { status: "verified", expiry: "2027-03-12" }, healthAndSafety: { status: "verified", expiry: "2026-09-12" }, contract: { status: "signed" }, dbs: { status: "not-required", expiry: null } },
    experience: [{ role: "Warehouse Operative", years: 1 }],
    rating: 0, completedShifts: 0, punctualityScore: 0
  },
];

// Filtered exports
export const liveWorkers = standbyWorkers.filter(w => w.status === "live");
export const standbyOnlyWorkers = standbyWorkers.filter(w => w.status === "standby" && w.registrationStatus === "standby");
export const newRegisteredWorkers = standbyWorkers.filter(w => w.registrationStatus === "new-registered");
export const allWorkers = standbyWorkers;
