import { useState } from "react";
import { UserCheck, Clock, TrendingUp, Star, Building2, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
}

const candidates: TempPermCandidate[] = [
  { id: "1", name: "Maria Santos", agency: "Pertemps", site: "Heathrow DC", department: "Picking", role: "Senior Picker", timeServed: 18, attendance: 100, punctuality: 98, departments: ["Picking", "Packing", "Quality"], rating: 4.9, eligible: true },
  { id: "2", name: "John Patel", agency: "Staffline", site: "Heathrow DC", department: "Warehouse", role: "Operative", timeServed: 14, attendance: 98, punctuality: 95, departments: ["Warehouse", "Loading"], rating: 4.7, eligible: true },
  { id: "3", name: "Lucy Brown", agency: "Staffline", site: "Coventry Hub", department: "Warehouse", role: "Team Lead", timeServed: 24, attendance: 97, punctuality: 96, departments: ["Warehouse", "Picking", "Loading"], rating: 4.8, eligible: true },
  { id: "4", name: "Ahmed Khan", agency: "Blue Arrow", site: "Heathrow DC", department: "Warehouse", role: "Forklift", timeServed: 12, attendance: 95, punctuality: 91, departments: ["Warehouse"], rating: 4.5, eligible: true },
  { id: "5", name: "Priya Sharma", agency: "Pertemps", site: "Heathrow DC", department: "Quality", role: "QC", timeServed: 10, attendance: 100, punctuality: 100, departments: ["Quality", "Packing"], rating: 5.0, eligible: true },
  { id: "6", name: "Tomasz Nowak", agency: "Staffline", site: "Heathrow DC", department: "Loading", role: "Loader", timeServed: 6, attendance: 85, punctuality: 80, departments: ["Loading"], rating: 3.5, eligible: false },
];

const ClientTempPerm = () => {
  const [siteFilter, setSiteFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<TempPermCandidate | null>(null);

  const eligibleCount = candidates.filter(c => c.eligible).length;

  const getSortedCandidates = () => {
    return [...candidates]
      .filter(c => c.eligible)
      .sort((a, b) => {
        // Sort by: time served, then attendance, then multi-skill
        const scoreA = a.timeServed * 2 + a.attendance + a.departments.length * 5;
        const scoreB = b.timeServed * 2 + b.attendance + b.departments.length * 5;
        return scoreB - scoreA;
      });
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
            <option value="heathrow">Heathrow DC</option>
            <option value="coventry">Coventry Hub</option>
            <option value="birmingham">Birmingham DC</option>
          </select>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Departments</option>
            <option value="warehouse">Warehouse</option>
            <option value="picking">Picking</option>
            <option value="loading">Loading</option>
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
          <p className="text-xl font-bold">14 mo</p>
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
            <span className="text-xs text-muted-foreground">Top Rated</span>
          </div>
          <p className="text-xl font-bold">3</p>
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
              onClick={() => setSelectedCandidate(candidate)}
              className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
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
                  <p className="text-xs text-muted-foreground">{candidate.role} • {candidate.site} • {candidate.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-bold">{candidate.timeServed}mo</p>
                  <p className="text-xs text-muted-foreground">Time Served</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-green-500">{candidate.attendance}%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{candidate.departments.length}</p>
                  <p className="text-xs text-muted-foreground">Depts</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
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
                  <h2 className="text-lg font-semibold">{selectedCandidate.name}</h2>
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
                <p className="text-xs text-muted-foreground">Agency</p>
                <p className="text-lg font-bold">{selectedCandidate.agency}</p>
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
              <Button>Initiate Conversion</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTempPerm;
