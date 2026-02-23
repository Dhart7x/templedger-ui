// Standby Workers Data - 40+ workers with full profiles

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

 const departments = ["Warehouse Operative", "MHE"];
 const shifts = ["Morning (06:00-14:00)", "Afternoon (14:00-22:00)", "Night (22:00-06:00)"];
 const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

 const firstNames = [
  "James", "Emma", "Oliver", "Sophia", "William", "Isabella", "Henry", "Mia", "Alexander", "Charlotte",
  "Michael", "Amelia", "Benjamin", "Harper", "Daniel", "Evelyn", "Matthew", "Abigail", "Joseph", "Emily",
  "David", "Madison", "Andrew", "Elizabeth", "Christopher", "Sofia", "Joshua", "Avery", "Ethan", "Ella",
  "Ryan", "Scarlett", "Nicholas", "Grace", "Tyler", "Chloe", "Brandon", "Victoria", "Justin", "Riley",
  "Kevin", "Aria", "Aaron", "Lily", "Jason", "Aubrey"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera"
];

 const generateWorker = (index: number): StandbyWorker => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index * 7) % lastNames.length];
  const bestDept = departments[index % departments.length];
  const isLive = index < 8;
  const distanceMiles = Math.round((Math.random() * 12 + 0.5) * 10) / 10;
  
  return {
    id: `SW${String(index + 1).padStart(3, "0")}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    phone: `07${String(Math.floor(Math.random() * 900000000 + 100000000)).substring(0, 9)}`,
    address: `${Math.floor(Math.random() * 200) + 1} ${["Oak", "Maple", "Cedar", "Pine", "Elm", "Birch"][index % 6]} Street`,
    postcode: `CV${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    dateOfBirth: `${1980 + Math.floor(Math.random() * 25)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    nationalInsurance: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String(Math.floor(Math.random() * 900000) + 100000)}${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
    bankDetails: {
      sortCode: `${String(Math.floor(Math.random() * 90) + 10)}-${String(Math.floor(Math.random() * 90) + 10)}-${String(Math.floor(Math.random() * 90) + 10)}`,
      accountNumber: String(Math.floor(Math.random() * 90000000) + 10000000),
      bankName: ["Barclays", "HSBC", "Lloyds", "NatWest", "Santander"][index % 5],
    },
    emergencyContact: {
      name: `${firstNames[(index + 10) % firstNames.length]} ${lastName}`,
      relationship: ["Spouse", "Parent", "Sibling", "Partner", "Friend"][index % 5],
      phone: `07${String(Math.floor(Math.random() * 900000000 + 100000000)).substring(0, 9)}`,
    },
    registeredDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    lastWorked: isLive ? "Today" : index < 20 ? `${Math.floor(Math.random() * 14) + 1} days ago` : null,
    status: isLive ? "live" : "standby",
    bestMatchDepartment: bestDept,
    departments: [bestDept, departments[(index + 1) % departments.length]].filter((v, i, a) => a.indexOf(v) === i),
    preferences: {
      preferredShifts: [shifts[index % shifts.length], shifts[(index + 1) % shifts.length]].filter((v, i, a) => a.indexOf(v) === i),
      maxHoursPerWeek: [24, 32, 40, 48][index % 4],
      availableDays: days.slice(0, 5 + (index % 3)),
      noticePeriod: ["Same day", "24 hours", "48 hours", "1 week"][index % 4],
      transportMode: (["car", "public", "bicycle", "walking"] as const)[index % 4],
    },
    distance: {
      miles: distanceMiles,
      carTime: `${Math.round(distanceMiles * 2.5)} mins`,
      publicTransportTime: `${Math.round(distanceMiles * 6)} mins`,
    },
    compliance: {
      rightToWork: {
        status: index % 15 === 0 ? "expired" : index % 10 === 0 ? "pending" : "verified",
        expiry: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      },
      healthAndSafety: {
        status: index % 12 === 0 ? "expired" : "verified",
        expiry: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      },
      contract: { status: index % 8 === 0 ? "pending" : "signed" },
      dbs: {
        status: index % 5 === 0 ? "verified" : "not-required",
        expiry: index % 5 === 0 ? `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-15` : null,
      },
    },
    experience: [
      { role: bestDept, years: Math.floor(Math.random() * 5) + 1 },
      ...(index % 3 === 0 ? [{ role: departments[(index + 1) % departments.length], years: Math.floor(Math.random() * 3) + 1 }] : []),
    ],
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    completedShifts: Math.floor(Math.random() * 150) + 10,
    punctualityScore: Math.round((85 + Math.random() * 15) * 10) / 10,
  };
 };

 // Generate 45 workers
 export const standbyWorkers: StandbyWorker[] = Array.from({ length: 45 }, (_, i) => generateWorker(i));

 export const liveWorkers = standbyWorkers.filter(w => w.status === "live");
 export const standbyOnlyWorkers = standbyWorkers.filter(w => w.status === "standby");
