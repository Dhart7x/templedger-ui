import { useState } from "react";
import { Calendar, Users, Building2, Clock, CheckCircle, AlertTriangle, XCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { allocations, Allocation } from "./agencyDemoData";

const DemoShiftCoverage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const dates = ["all", ...Array.from(new Set(allocations.map(a => a.date)))];
  const departments = ["all", ...Array.from(new Set(allocations.map(a => a.department)))];

  const filteredAllocations = allocations.filter(a => {
    const dateMatch = selectedDate === "all" || a.date === selectedDate;
    const deptMatch = selectedDepartment === "all" || a.department === selectedDepartment;
    return dateMatch && deptMatch;
  });

  // Group by date then by department
  const groupedByDate = filteredAllocations.reduce((acc, alloc) => {
    if (!acc[alloc.date]) acc[alloc.date] = {};
    if (!acc[alloc.date][alloc.department]) acc[alloc.date][alloc.department] = [];
    acc[alloc.date][alloc.department].push(alloc);
    return acc;
  }, {} as Record<string, Record<string, Allocation[]>>);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "filled": return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
      case "partial": return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case "unfilled": return <XCircle className="w-3.5 h-3.5 text-destructive" />;
      default: return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "filled": return "border-emerald-500/20 bg-emerald-500/5";
      case "partial": return "border-amber-500/20 bg-amber-500/5";
      case "unfilled": return "border-destructive/20 bg-destructive/5";
      default: return "border-border";
    }
  };

  // Calculate totals
  const totalRequested = filteredAllocations.reduce((sum, a) => sum + a.requestedHeadcount, 0);
  const totalAssigned = filteredAllocations.reduce((sum, a) => sum + a.assignedWorkers.length, 0);
  const coveragePercent = totalRequested > 0 ? Math.round((totalAssigned / totalRequested) * 100) : 0;

  return (
    <div className="p-4 md:p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Bookings</h1>
          <p className="text-xs text-muted-foreground">Demand control — create, assign, track</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            New Booking
          </button>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-card border border-border rounded-md px-3 py-1.5 text-xs text-foreground"
          >
            {dates.map(date => (
              <option key={date} value={date}>{date === "all" ? "All Days" : date}</option>
            ))}
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-card border border-border rounded-md px-3 py-1.5 text-xs text-foreground"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === "all" ? "All Depts" : dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Coverage Summary */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-xl font-bold text-foreground">{totalRequested}</div>
          <div className="text-[10px] text-muted-foreground">Headcount Requested</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-xl font-bold text-emerald-500">{totalAssigned}</div>
          <div className="text-[10px] text-muted-foreground">Workers Assigned</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-xl font-bold text-amber-500">{totalRequested - totalAssigned}</div>
          <div className="text-[10px] text-muted-foreground">Remaining Gap</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className={cn(
            "text-xl font-bold",
            coveragePercent >= 90 ? "text-emerald-500" : coveragePercent >= 70 ? "text-amber-500" : "text-destructive"
          )}>
            {coveragePercent}%
          </div>
          <div className="text-[10px] text-muted-foreground">Coverage Rate</div>
        </div>
      </div>

      {/* Allocations by Date and Department */}
      <div className="space-y-5">
        {Object.entries(groupedByDate).map(([date, departments]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              {date}
            </div>

            {Object.entries(departments).map(([dept, allocs]) => (
              <div key={dept} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-3 py-2 border-b border-border bg-[hsl(217,33%,10%)] flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">{dept}</span>
                </div>

                <div className="divide-y divide-border">
                  {allocs.map((alloc) => (
                    <div 
                      key={alloc.id} 
                      className={cn("p-3 flex items-center justify-between", getStatusBg(alloc.status))}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-[90px]">
                          <Clock className="w-3 h-3" />
                          {alloc.shift}
                        </div>
                        <div className="text-xs text-foreground">{alloc.role}</div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(217,33%,15%)] text-muted-foreground">
                          {alloc.agencyName}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Workers */}
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs font-medium text-foreground">
                            {alloc.assignedWorkers.length}/{alloc.requestedHeadcount}
                          </span>
                        </div>

                        {/* Worker Avatars */}
                        {alloc.assignedWorkers.length > 0 && (
                          <div className="flex -space-x-1.5">
                            {alloc.assignedWorkers.slice(0, 3).map((worker) => (
                              <div 
                                key={worker.workerId}
                                className="w-5 h-5 rounded-full bg-primary/20 border border-background flex items-center justify-center text-[8px] font-medium text-primary"
                                title={worker.workerName}
                              >
                                {worker.workerName.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                            {alloc.assignedWorkers.length > 3 && (
                              <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center text-[8px] font-medium text-muted-foreground">
                                +{alloc.assignedWorkers.length - 3}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Status */}
                        {getStatusIcon(alloc.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoShiftCoverage;
