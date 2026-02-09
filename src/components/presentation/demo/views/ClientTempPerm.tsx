import { useState } from "react";
import { UserCheck, Clock, TrendingUp, Star, Building2, Filter, ChevronRight, MapPin, Send, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";

interface TempPermCandidate {
  id: string;
  name: string;
  agency: string;
  site: string;
  department: string;
  role: string;
  timeServed: number; // months
  attendance: number;
  punctuality: number;
  departments: string[];
  rating: number;
  eligible: boolean;
  hoursWorked: number;
}

const candidates: TempPermCandidate[] = [
  { id: "1", name: "Maria Santos", agency: "Pertemps", site: "Heathrow DC", department: "Picking", role: "Senior Picker", timeServed: 18, attendance: 100, punctuality: 98, departments: ["Picking", "Packing", "Quality"], rating: 4.9, eligible: true, hoursWorked: 2880 },
  { id: "2", name: "John Patel", agency: "Staffline", site: "Heathrow DC", department: "Warehouse", role: "Operative", timeServed: 14, attendance: 98, punctuality: 95, departments: ["Warehouse", "Loading"], rating: 4.7, eligible: true, hoursWorked: 2240 },
  { id: "3", name: "Lucy Brown", agency: "Staffline", site: "Coventry Hub", department: "Warehouse", role: "Team Lead", timeServed: 24, attendance: 97, punctuality: 96, departments: ["Warehouse", "Picking", "Loading"], rating: 4.8, eligible: true, hoursWorked: 3840 },
  { id: "4", name: "Ahmed Khan", agency: "Blue Arrow", site: "Heathrow DC", department: "Warehouse", role: "Forklift", timeServed: 12, attendance: 95, punctuality: 91, departments: ["Warehouse"], rating: 4.5, eligible: true, hoursWorked: 1920 },
  { id: "5", name: "Priya Sharma", agency: "Pertemps", site: "Heathrow DC", department: "Quality", role: "QC", timeServed: 10, attendance: 100, punctuality: 100, departments: ["Quality", "Packing"], rating: 5.0, eligible: true, hoursWorked: 1600 },
  { id: "6", name: "Marcus Johnson", agency: "Staffline", site: "Heathrow DC", department: "Loading", role: "Loader", timeServed: 16, attendance: 99, punctuality: 97, departments: ["Loading", "Warehouse"], rating: 4.9, eligible: true, hoursWorked: 2560 },
  { id: "7", name: "Fatima Ali", agency: "Pertemps", site: "Birmingham DC", department: "Packing", role: "Senior Packer", timeServed: 15, attendance: 96, punctuality: 94, departments: ["Packing", "Returns"], rating: 4.6, eligible: true, hoursWorked: 2400 },
  { id: "8", name: "Daniel Kim", agency: "Blue Arrow", site: "Heathrow DC", department: "Picking", role: "Picker", timeServed: 11, attendance: 97, punctuality: 95, departments: ["Picking", "Goods In"], rating: 4.7, eligible: true, hoursWorked: 1760 },
  { id: "9", name: "Elena Rodriguez", agency: "Staffline", site: "Coventry Hub", department: "Returns", role: "Handler", timeServed: 13, attendance: 93, punctuality: 90, departments: ["Returns", "Quality"], rating: 4.3, eligible: true, hoursWorked: 2080 },
  { id: "10", name: "Kevin Wright", agency: "Pertemps", site: "Heathrow DC", department: "Quality", role: "Senior QC", timeServed: 20, attendance: 99, punctuality: 98, departments: ["Quality", "Packing", "Returns"], rating: 4.8, eligible: true, hoursWorked: 3200 },
  { id: "11", name: "Tomasz Nowak", agency: "Staffline", site: "Heathrow DC", department: "Loading", role: "Loader", timeServed: 6, attendance: 85, punctuality: 80, departments: ["Loading"], rating: 3.5, eligible: false, hoursWorked: 960 },
  { id: "12", name: "Sophie Turner", agency: "Blue Arrow", site: "Birmingham DC", department: "Warehouse", role: "Operative", timeServed: 4, attendance: 88, punctuality: 82, departments: ["Warehouse"], rating: 3.8, eligible: false, hoursWorked: 640 },
  { id: "13", name: "James Wilson", agency: "Pertemps", site: "Coventry Hub", department: "Picking", role: "Picker", timeServed: 8, attendance: 91, punctuality: 88, departments: ["Picking"], rating: 4.0, eligible: false, hoursWorked: 1280 },
];

interface ClientTempPermProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientTempPerm = ({ onViewWorker }: ClientTempPermProps) => {
  const { addNotification } = useDemoContext();
  const [siteFilter, setSiteFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<TempPermCandidate | null>(null);
  const [conversionSent, setConversionSent] = useState<string[]>([]);

  const eligibleCount = candidates.filter(c => c.eligible).length;

  const getSortedCandidates = () => {
    return [...candidates]
      .filter(c => c.eligible)
      .filter(c => siteFilter === "all" || c.site === siteFilter)
      .filter(c => departmentFilter === "all" || c.department.toLowerCase() === departmentFilter)
      .filter(c => agencyFilter === "all" || c.agency === agencyFilter)
      .sort((a, b) => {
        // Sort by: time served, then attendance, then multi-skill
        const scoreA = a.timeServed * 2 + a.attendance + a.departments.length * 5;
        const scoreB = b.timeServed * 2 + b.attendance + b.departments.length * 5;
        return scoreB - scoreA;
      });
  };

  const handleWorkerClick = (name: string) => {
    if (onViewWorker) {
      onViewWorker(name);
    }
  };

  const handleInitiateConversion = (candidate: TempPermCandidate) => {
    // Add to agency notifications
    addNotification({
      type: "temp-perm",
      title: "Temp-to-Perm Conversion Request",
      message: `Client wishes to convert ${candidate.name} to permanent staff. Please review the request and respond.`,
      read: false,
      targetView: "agency",
      contextType: "worker",
      workerName: candidate.name,
      agency: candidate.agency,
      site: candidate.site,
      fromAgency: false,
    });
    
    setConversionSent(prev => [...prev, candidate.id]);
    setSelectedCandidate(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Temp-to-Perm</h1>
          <p className="text-xs text-muted-foreground">Workers eligible for permanent conversion</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Sites</option>
            <option value="Heathrow DC">Heathrow DC</option>
            <option value="Coventry Hub">Coventry Hub</option>
            <option value="Birmingham DC">Birmingham DC</option>
          </select>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Departments</option>
            <option value="warehouse">Warehouse</option>
            <option value="picking">Picking</option>
            <option value="packing">Packing</option>
            <option value="loading">Loading</option>
            <option value="quality">Quality</option>
            <option value="returns">Returns</option>
          </select>
          <select
            value={agencyFilter}
            onChange={(e) => setAgencyFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Agencies</option>
            <option value="Staffline">Staffline</option>
            <option value="Pertemps">Pertemps</option>
            <option value="Blue Arrow">Blue Arrow</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <UserCheck className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Eligible</span>
          </div>
          <p className="text-xl font-bold text-green-500">{eligibleCount}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Avg Time Served</span>
          </div>
          <p className="text-xl font-bold">15 mo</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Avg Attendance</span>
          </div>
          <p className="text-xl font-bold">97%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Top Rated (4.8+)</span>
          </div>
          <p className="text-xl font-bold">5</p>
        </div>
      </div>

      {/* Candidates List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-3 border-b border-border">
          <h2 className="text-sm font-semibold">Recommended Candidates</h2>
          <p className="text-xs text-muted-foreground">Sorted by time served, attendance, and multi-skill capability</p>
        </div>
        <div className="divide-y divide-border">
          {getSortedCandidates().map((candidate, idx) => (
            <div
              key={candidate.id}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <button onClick={() => handleWorkerClick(candidate.name)} className="flex items-center gap-4 text-left hover:underline">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{candidate.name}</p>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-medium">{candidate.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{candidate.role} • {candidate.agency}</p>
                </div>
              </button>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <p className="text-sm font-medium">{candidate.site}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{candidate.department}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{candidate.timeServed}mo</p>
                  <p className="text-xs text-muted-foreground">Time Served</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-green-500">{candidate.attendance}%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{candidate.hoursWorked.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{candidate.departments.length}</p>
                  <p className="text-xs text-muted-foreground">Depts</p>
                </div>
                <button
                  onClick={() => setSelectedCandidate(candidate)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleWorkerClick(selectedCandidate.name)} className="hover:underline">
                    <h2 className="text-lg font-semibold">{selectedCandidate.name}</h2>
                  </button>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{selectedCandidate.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{selectedCandidate.role}</p>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-muted-foreground hover:text-foreground text-xl">×</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Time Served</p>
                <p className="text-lg font-bold">{selectedCandidate.timeServed} months</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className="text-lg font-bold text-green-500">{selectedCandidate.attendance}%</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Punctuality</p>
                <p className="text-lg font-bold">{selectedCandidate.punctuality}%</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Total Hours</p>
                <p className="text-lg font-bold">{selectedCandidate.hoursWorked.toLocaleString()}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Agency</p>
                <p className="text-lg font-bold">{selectedCandidate.agency}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Site</p>
                <p className="text-lg font-bold">{selectedCandidate.site}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Departments Trained</p>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate.departments.map((dept) => (
                  <span key={dept} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCandidate(null)}>Close</Button>
              {conversionSent.includes(selectedCandidate.id) ? (
                <Button disabled className="gap-2 bg-green-500/20 text-green-500 hover:bg-green-500/20">
                  <Bell className="w-4 h-4" />
                  Request Sent
                </Button>
              ) : (
                <Button onClick={() => handleInitiateConversion(selectedCandidate)} className="gap-2">
                  <Send className="w-4 h-4" />
                  Initiate Conversion
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTempPerm;
