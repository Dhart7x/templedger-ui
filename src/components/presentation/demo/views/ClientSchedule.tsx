import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Users, TrendingUp, Plus, Building2, Clock, Sparkles, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ScheduleWorker {
  id: string;
  name: string;
  agency: string;
  status: "confirmed" | "pending" | "at-risk";
}

interface ShiftData {
  type: "early" | "late" | "night";
  label: string;
  time: string;
  required: number;
  workers: ScheduleWorker[];
  confidence: number;
}

interface DepartmentData {
  name: string;
  shifts: ShiftData[];
}

interface SiteData {
  name: string;
  departments: DepartmentData[];
}

const weekDays = ["Mon 3", "Tue 4", "Wed 5", "Thu 6", "Fri 7", "Sat 8", "Sun 9"];

// Full schedule data structure
const scheduleData: Record<string, SiteData[]> = {
  "Mon 3": [
    {
      name: "Heathrow DC",
      departments: [
        {
          name: "Warehouse",
          shifts: [
            { type: "early", label: "Early", time: "06:00–14:00", required: 12, workers: [
              { id: "w1", name: "Marcus Johnson", agency: "Staffline", status: "confirmed" },
              { id: "w2", name: "Sarah Williams", agency: "Staffline", status: "confirmed" },
              { id: "w3", name: "James Cooper", agency: "Pertemps", status: "confirmed" },
              { id: "w4", name: "Lisa Anderson", agency: "Pertemps", status: "confirmed" },
              { id: "w5", name: "Daniel Kim", agency: "Staffline", status: "confirmed" },
              { id: "w6", name: "Fatima Ali", agency: "Pertemps", status: "confirmed" },
              { id: "w7", name: "Robert Taylor", agency: "Blue Arrow", status: "confirmed" },
              { id: "w8", name: "Elena Rodriguez", agency: "Blue Arrow", status: "pending" },
              { id: "w9", name: "Ahmed Hassan", agency: "Staffline", status: "confirmed" },
              { id: "w10", name: "Priya Patel", agency: "Pertemps", status: "confirmed" },
              { id: "w11", name: "Kevin Wright", agency: "Staffline", status: "confirmed" },
              { id: "w12", name: "Sophie Turner", agency: "Blue Arrow", status: "at-risk" },
            ], confidence: 92 },
            { type: "late", label: "Late", time: "14:00–22:00", required: 10, workers: [
              { id: "w13", name: "Tom Hardy", agency: "Staffline", status: "confirmed" },
              { id: "w14", name: "Emma Wilson", agency: "Pertemps", status: "confirmed" },
              { id: "w15", name: "Michael Brown", agency: "Blue Arrow", status: "confirmed" },
              { id: "w16", name: "Rachel Green", agency: "Staffline", status: "confirmed" },
              { id: "w17", name: "Nathan Brooks", agency: "Pertemps", status: "confirmed" },
              { id: "w18", name: "Olivia Parker", agency: "Pertemps", status: "confirmed" },
              { id: "w19", name: "Chris Evans", agency: "Blue Arrow", status: "pending" },
              { id: "w20", name: "Jessica Lee", agency: "Staffline", status: "confirmed" },
              { id: "w21", name: "Angela Martinez", agency: "Pertemps", status: "confirmed" },
              { id: "w22", name: "David Chen", agency: "Staffline", status: "confirmed" },
            ], confidence: 100 },
            { type: "night", label: "Night", time: "22:00–06:00", required: 6, workers: [
              { id: "w23", name: "John Patel", agency: "Staffline", status: "confirmed" },
              { id: "w24", name: "Maria Santos", agency: "Pertemps", status: "confirmed" },
              { id: "w25", name: "Lucy Brown", agency: "Blue Arrow", status: "confirmed" },
              { id: "w26", name: "Ahmed Khan", agency: "Staffline", status: "confirmed" },
            ], confidence: 67 },
          ],
        },
        {
          name: "Picking",
          shifts: [
            { type: "early", label: "Early", time: "06:00–14:00", required: 8, workers: [
              { id: "p1", name: "Taylor Reed", agency: "Staffline", status: "confirmed" },
              { id: "p2", name: "Jordan Blake", agency: "Pertemps", status: "confirmed" },
              { id: "p3", name: "Casey Morgan", agency: "Blue Arrow", status: "confirmed" },
              { id: "p4", name: "Sam Roberts", agency: "Staffline", status: "confirmed" },
              { id: "p5", name: "Drew Campbell", agency: "Pertemps", status: "pending" },
              { id: "p6", name: "Pat Sullivan", agency: "Blue Arrow", status: "confirmed" },
              { id: "p7", name: "Lee Thompson", agency: "Staffline", status: "confirmed" },
            ], confidence: 88 },
            { type: "late", label: "Late", time: "14:00–22:00", required: 6, workers: [
              { id: "p8", name: "Quinn Davis", agency: "Pertemps", status: "confirmed" },
              { id: "p9", name: "Alex Foster", agency: "Blue Arrow", status: "confirmed" },
              { id: "p10", name: "Maya Singh", agency: "Staffline", status: "confirmed" },
              { id: "p11", name: "Ryan Hughes", agency: "Pertemps", status: "confirmed" },
              { id: "p12", name: "Morgan Chen", agency: "Blue Arrow", status: "confirmed" },
              { id: "p13", name: "Jamie Scott", agency: "Staffline", status: "confirmed" },
            ], confidence: 100 },
          ],
        },
        {
          name: "Loading",
          shifts: [
            { type: "early", label: "Early", time: "06:00–14:00", required: 6, workers: [
              { id: "l1", name: "Tomasz Nowak", agency: "Staffline", status: "at-risk" },
              { id: "l2", name: "James Wilson", agency: "Blue Arrow", status: "at-risk" },
              { id: "l3", name: "Mike Stevens", agency: "Pertemps", status: "confirmed" },
              { id: "l4", name: "Chris Wright", agency: "Staffline", status: "confirmed" },
            ], confidence: 67 },
          ],
        },
      ],
    },
    {
      name: "Coventry Hub",
      departments: [
        {
          name: "Warehouse",
          shifts: [
            { type: "early", label: "Early", time: "06:00–14:00", required: 8, workers: [
              { id: "c1", name: "Peter Parker", agency: "Staffline", status: "confirmed" },
              { id: "c2", name: "Bruce Wayne", agency: "Pertemps", status: "confirmed" },
              { id: "c3", name: "Clark Kent", agency: "Blue Arrow", status: "confirmed" },
              { id: "c4", name: "Diana Prince", agency: "Staffline", status: "confirmed" },
              { id: "c5", name: "Barry Allen", agency: "Pertemps", status: "confirmed" },
              { id: "c6", name: "Hal Jordan", agency: "Blue Arrow", status: "confirmed" },
              { id: "c7", name: "Arthur Curry", agency: "Staffline", status: "pending" },
              { id: "c8", name: "Victor Stone", agency: "Pertemps", status: "confirmed" },
            ], confidence: 100 },
            { type: "late", label: "Late", time: "14:00–22:00", required: 6, workers: [
              { id: "c9", name: "Oliver Queen", agency: "Blue Arrow", status: "confirmed" },
              { id: "c10", name: "Dinah Lance", agency: "Staffline", status: "confirmed" },
              { id: "c11", name: "John Constantine", agency: "Pertemps", status: "confirmed" },
              { id: "c12", name: "Zatanna Zatara", agency: "Blue Arrow", status: "confirmed" },
              { id: "c13", name: "Kara Zor-El", agency: "Staffline", status: "confirmed" },
              { id: "c14", name: "J'onn J'onzz", agency: "Pertemps", status: "confirmed" },
            ], confidence: 100 },
          ],
        },
      ],
    },
  ],
  "Tue 4": [
    {
      name: "Heathrow DC",
      departments: [
        {
          name: "Warehouse",
          shifts: [
            { type: "early", label: "Early", time: "06:00–14:00", required: 12, workers: [
              { id: "t1", name: "Marcus Johnson", agency: "Staffline", status: "confirmed" },
              { id: "t2", name: "Sarah Williams", agency: "Staffline", status: "confirmed" },
              { id: "t3", name: "James Cooper", agency: "Pertemps", status: "confirmed" },
              { id: "t4", name: "Lisa Anderson", agency: "Pertemps", status: "confirmed" },
              { id: "t5", name: "Daniel Kim", agency: "Staffline", status: "confirmed" },
              { id: "t6", name: "Fatima Ali", agency: "Pertemps", status: "confirmed" },
              { id: "t7", name: "Robert Taylor", agency: "Blue Arrow", status: "confirmed" },
              { id: "t8", name: "Elena Rodriguez", agency: "Blue Arrow", status: "confirmed" },
              { id: "t9", name: "Ahmed Hassan", agency: "Staffline", status: "confirmed" },
              { id: "t10", name: "Priya Patel", agency: "Pertemps", status: "pending" },
              { id: "t11", name: "Kevin Wright", agency: "Staffline", status: "confirmed" },
            ], confidence: 92 },
          ],
        },
      ],
    },
  ],
};

const agencies = ["Staffline", "Pertemps", "Blue Arrow", "Elite Personnel"];
const rationales = [
  "has {count} trained temps on standby within 3 miles of site",
  "best availability with {count} workers ready now",
  "highest reliability (98%) for this role",
];

const ClientSchedule = () => {
  const { bookings, createBooking } = useDemoContext();
  const [selectedDay, setSelectedDay] = useState("Mon 3");
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [expandedSites, setExpandedSites] = useState<string[]>(["Heathrow DC", "Coventry Hub"]);
  const [expandedDepts, setExpandedDepts] = useState<string[]>(["Warehouse", "Picking", "Loading"]);
  const [expandedShifts, setExpandedShifts] = useState<string[]>([]);
  const [showAddShift, setShowAddShift] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);
  const [allocationResult, setAllocationResult] = useState<{ agency: string; rationale: string } | null>(null);
  const [newShift, setNewShift] = useState({
    site: "Heathrow DC",
    department: "Warehouse",
    shiftType: "early",
    quantity: 1,
    role: "Warehouse Operative",
  });

  const sites = scheduleData[selectedDay] || [];

  const toggleSite = (siteName: string) => {
    setExpandedSites(prev => 
      prev.includes(siteName) ? prev.filter(s => s !== siteName) : [...prev, siteName]
    );
  };

  const toggleDept = (deptKey: string) => {
    setExpandedDepts(prev => 
      prev.includes(deptKey) ? prev.filter(d => d !== deptKey) : [...prev, deptKey]
    );
  };

  const toggleShift = (shiftKey: string) => {
    setExpandedShifts(prev => 
      prev.includes(shiftKey) ? prev.filter(s => s !== shiftKey) : [...prev, shiftKey]
    );
  };

  const getTotalRequired = () => sites.reduce((acc, site) => 
    acc + site.departments.reduce((dAcc, dept) => 
      dAcc + dept.shifts.reduce((sAcc, shift) => sAcc + shift.required, 0), 0), 0);

  const getTotalFilled = () => sites.reduce((acc, site) => 
    acc + site.departments.reduce((dAcc, dept) => 
      dAcc + dept.shifts.reduce((sAcc, shift) => sAcc + shift.workers.length, 0), 0), 0);

  const getAtRiskCount = () => sites.reduce((acc, site) => 
    acc + site.departments.reduce((dAcc, dept) => 
      dAcc + dept.shifts.filter(shift => shift.confidence < 90).length, 0), 0);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-500";
    if (confidence >= 85) return "text-amber-500";
    return "text-destructive";
  };

  const getShiftBorderColor = (confidence: number) => {
    if (confidence >= 95) return "border-l-green-500";
    if (confidence >= 85) return "border-l-amber-500";
    return "border-l-destructive";
  };

  const runIntelligentAllocation = () => {
    setIsAllocating(true);
    setAllocationResult(null);
    setTimeout(() => {
      const randomAgency = agencies[Math.floor(Math.random() * agencies.length)];
      const randomRationale = rationales[Math.floor(Math.random() * rationales.length)]
        .replace("{count}", String(Math.floor(Math.random() * 12) + 5));
      setAllocationResult({ agency: randomAgency, rationale: randomRationale });
      setIsAllocating(false);
    }, 3000);
  };

  const handleAddShift = () => {
    const shiftTime = newShift.shiftType === "early" ? "06:00–14:00" : 
                      newShift.shiftType === "late" ? "14:00–22:00" : "22:00–06:00";
    createBooking({
      role: newShift.role,
      quantity: newShift.quantity,
      location: "Zone A",
      site: newShift.site,
      shift: shiftTime,
      date: selectedDay.includes("Mon") ? "Mon 10 Feb" : "Tue 11 Feb",
      suggestedAgency: allocationResult?.agency,
    });
    setShowAddShift(false);
    setAllocationResult(null);
    setNewShift({ site: "Heathrow DC", department: "Warehouse", shiftType: "early", quantity: 1, role: "Warehouse Operative" });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Schedule</h1>
          <p className="text-xs text-muted-foreground">Week of February 3–9, 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAddShift(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Shift
          </Button>
          <div className="flex items-center bg-card border border-border rounded">
            {["day", "week", "month"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as typeof timeRange)}
                className={`px-3 py-1.5 text-xs capitalize ${
                  timeRange === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1 flex gap-1">
          {weekDays.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                selectedDay === day
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Required</span>
          </div>
          <p className="text-xl font-bold">{getTotalRequired()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Filled</span>
          </div>
          <p className="text-xl font-bold text-green-500">{getTotalFilled()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Fill Rate</span>
          </div>
          <p className="text-xl font-bold text-primary">
            {getTotalRequired() > 0 ? Math.round((getTotalFilled() / getTotalRequired()) * 100) : 0}%
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">At Risk</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{getAtRiskCount()}</p>
        </div>
      </div>

      {/* Collapsible Schedule */}
      <div className="space-y-3">
        {sites.map((site) => (
          <Collapsible 
            key={site.name} 
            open={expandedSites.includes(site.name)}
            onOpenChange={() => toggleSite(site.name)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">{site.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {site.departments.length} departments
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {site.departments.reduce((acc, d) => acc + d.shifts.reduce((s, shift) => s + shift.workers.length, 0), 0)} /
                      {site.departments.reduce((acc, d) => acc + d.shifts.reduce((s, shift) => s + shift.required, 0), 0)}
                    </span>
                  </div>
                  {expandedSites.includes(site.name) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-4 mt-2 space-y-2">
                {site.departments.map((dept) => {
                  const deptKey = `${site.name}-${dept.name}`;
                  return (
                    <Collapsible 
                      key={deptKey}
                      open={expandedDepts.includes(dept.name)}
                      onOpenChange={() => toggleDept(dept.name)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{dept.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {dept.shifts.length} shifts
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <span>
                                {dept.shifts.reduce((acc, s) => acc + s.workers.length, 0)} /
                                {dept.shifts.reduce((acc, s) => acc + s.required, 0)}
                              </span>
                            </div>
                            {expandedDepts.includes(dept.name) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-4 mt-2 space-y-2">
                          {dept.shifts.map((shift) => {
                            const shiftKey = `${deptKey}-${shift.type}`;
                            return (
                              <Collapsible 
                                key={shiftKey}
                                open={expandedShifts.includes(shiftKey)}
                                onOpenChange={() => toggleShift(shiftKey)}
                              >
                                <CollapsibleTrigger className="w-full">
                                  <div className={`flex items-center justify-between p-3 bg-card border border-border border-l-4 ${getShiftBorderColor(shift.confidence)} rounded-lg hover:bg-muted/30 transition-colors`}>
                                    <div className="flex items-center gap-3">
                                      <Clock className="w-4 h-4 text-muted-foreground" />
                                      <span className="font-medium">{shift.label}</span>
                                      <span className="text-xs text-muted-foreground">{shift.time}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className={shift.workers.length >= shift.required ? "text-green-500" : "text-amber-500"}>
                                          {shift.workers.length}/{shift.required}
                                        </span>
                                      </div>
                                      <span className={`text-xs px-2 py-0.5 rounded ${
                                        shift.confidence >= 95 ? "bg-green-500/10 text-green-500" :
                                        shift.confidence >= 85 ? "bg-amber-500/10 text-amber-500" :
                                        "bg-destructive/10 text-destructive"
                                      }`}>
                                        {shift.confidence}%
                                      </span>
                                      {expandedShifts.includes(shiftKey) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                  </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="ml-4 mt-2 p-3 bg-background border border-border rounded-lg">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                      {shift.workers.map((worker) => (
                                        <div 
                                          key={worker.id}
                                          className={`p-2 rounded border ${
                                            worker.status === "confirmed" ? "bg-green-500/5 border-green-500/30" :
                                            worker.status === "pending" ? "bg-amber-500/5 border-amber-500/30" :
                                            "bg-destructive/5 border-destructive/30"
                                          }`}
                                        >
                                          <p className="text-sm font-medium">{worker.name}</p>
                                          <p className="text-xs text-muted-foreground">{worker.agency}</p>
                                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                            worker.status === "confirmed" ? "bg-green-500/20 text-green-500" :
                                            worker.status === "pending" ? "bg-amber-500/20 text-amber-500" :
                                            "bg-destructive/20 text-destructive"
                                          }`}>
                                            {worker.status}
                                          </span>
                                        </div>
                                      ))}
                                      {shift.workers.length < shift.required && (
                                        <div className="p-2 rounded border border-dashed border-border flex items-center justify-center text-muted-foreground">
                                          <span className="text-xs">+{shift.required - shift.workers.length} needed</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {sites.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No schedule data for this day</p>
        </div>
      )}

      {/* Add Shift Modal */}
      {showAddShift && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Add to Schedule</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Site</label>
                <select 
                  value={newShift.site}
                  onChange={(e) => setNewShift({ ...newShift, site: e.target.value })}
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                  disabled={isAllocating}
                >
                  <option>Heathrow DC</option>
                  <option>Coventry Hub</option>
                  <option>Birmingham DC</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Department</label>
                  <select 
                    value={newShift.department}
                    onChange={(e) => setNewShift({ ...newShift, department: e.target.value })}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                    disabled={isAllocating}
                  >
                    <option>Warehouse</option>
                    <option>Picking</option>
                    <option>Packing</option>
                    <option>Loading</option>
                    <option>Quality</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Shift</label>
                  <select 
                    value={newShift.shiftType}
                    onChange={(e) => setNewShift({ ...newShift, shiftType: e.target.value })}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                    disabled={isAllocating}
                  >
                    <option value="early">Early (06:00–14:00)</option>
                    <option value="late">Late (14:00–22:00)</option>
                    <option value="night">Night (22:00–06:00)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Role</label>
                  <select 
                    value={newShift.role}
                    onChange={(e) => setNewShift({ ...newShift, role: e.target.value })}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                    disabled={isAllocating}
                  >
                    <option>Warehouse Operative</option>
                    <option>Picker</option>
                    <option>Packer</option>
                    <option>Forklift Driver</option>
                    <option>Loader</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Quantity</label>
                  <input 
                    type="number" 
                    value={newShift.quantity}
                    onChange={(e) => setNewShift({ ...newShift, quantity: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                    disabled={isAllocating}
                  />
                </div>
              </div>

              {/* Allocation section */}
              <div className="pt-2 space-y-3">
                {!isAllocating && !allocationResult && (
                  <div className="flex gap-2">
                    <button
                      onClick={runIntelligentAllocation}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border bg-primary/10 border-primary text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium text-sm">Intelligent Allocation</span>
                    </button>
                  </div>
                )}

                {isAllocating && (
                  <div className="w-full flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-lg bg-primary/5 border border-primary/30">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <div className="text-center">
                      <p className="font-medium text-primary">Finding best agency...</p>
                      <p className="text-xs text-muted-foreground mt-1">Analyzing availability & reliability</p>
                    </div>
                  </div>
                )}

                {allocationResult && (
                  <div className="w-full p-4 rounded-lg bg-green-500/5 border border-green-500/30 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Recommended</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold">{allocationResult.agency}</p>
                        <p className="text-xs text-muted-foreground">{allocationResult.rationale}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => { setShowAddShift(false); setAllocationResult(null); }} disabled={isAllocating}>Cancel</Button>
              <Button onClick={handleAddShift} className="gap-2" disabled={isAllocating}>
                <Plus className="w-4 h-4" />
                Add to Schedule
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSchedule;
