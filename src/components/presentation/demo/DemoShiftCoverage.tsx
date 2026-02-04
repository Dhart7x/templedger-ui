import { useState } from "react";
import { Calendar, Users, Building2, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { allocations, Allocation } from "./agencyDemoData";
import { Badge } from "@/components/ui/badge";

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
      case "filled": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "partial": return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "unfilled": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "filled": return "border-emerald-500/30 bg-emerald-500/5";
      case "partial": return "border-amber-500/30 bg-amber-500/5";
      case "unfilled": return "border-destructive/30 bg-destructive/5";
      default: return "border-border";
    }
  };

  // Calculate totals
  const totalRequested = filteredAllocations.reduce((sum, a) => sum + a.requestedHeadcount, 0);
  const totalAssigned = filteredAllocations.reduce((sum, a) => sum + a.assignedWorkers.length, 0);
  const coveragePercent = totalRequested > 0 ? Math.round((totalAssigned / totalRequested) * 100) : 0;

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Shift Coverage</h2>
          <p className="text-sm text-muted-foreground">Agency allocations and worker assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-card border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            {dates.map(date => (
              <option key={date} value={date}>{date === "all" ? "All Days" : date}</option>
            ))}
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-card border border-border rounded-md px-3 py-1.5 text-sm text-foreground"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === "all" ? "All Departments" : dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Coverage Summary */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-2xl font-bold text-foreground">{totalRequested}</div>
          <div className="text-xs text-muted-foreground">Headcount Requested</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-2xl font-bold text-emerald-400">{totalAssigned}</div>
          <div className="text-xs text-muted-foreground">Workers Assigned</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-2xl font-bold text-amber-400">{totalRequested - totalAssigned}</div>
          <div className="text-xs text-muted-foreground">Remaining Gap</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className={`text-2xl font-bold ${coveragePercent >= 90 ? "text-emerald-400" : coveragePercent >= 70 ? "text-amber-400" : "text-destructive"}`}>
            {coveragePercent}%
          </div>
          <div className="text-xs text-muted-foreground">Coverage Rate</div>
        </div>
      </div>

      {/* Allocations by Date and Department */}
      <div className="space-y-6">
        {Object.entries(groupedByDate).map(([date, departments]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              {date}
            </div>

            {Object.entries(departments).map(([dept, allocs]) => (
              <div key={dept} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{dept}</span>
                </div>

                <div className="divide-y divide-border">
                  {allocs.map((alloc) => (
                    <div 
                      key={alloc.id} 
                      className={`p-3 flex items-center justify-between ${getStatusBg(alloc.status)}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
                          <Clock className="w-3.5 h-3.5" />
                          {alloc.shift}
                        </div>
                        <div className="text-sm text-foreground">{alloc.role}</div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Agency */}
                        <Badge variant="outline" className="text-xs">
                          {alloc.agencyName}
                        </Badge>

                        {/* Workers */}
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {alloc.assignedWorkers.length}/{alloc.requestedHeadcount}
                          </span>
                        </div>

                        {/* Worker Names (if any) */}
                        {alloc.assignedWorkers.length > 0 && (
                          <div className="flex -space-x-2">
                            {alloc.assignedWorkers.slice(0, 3).map((worker, idx) => (
                              <div 
                                key={worker.workerId}
                                className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-medium text-primary"
                                title={worker.workerName}
                              >
                                {worker.workerName.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                            {alloc.assignedWorkers.length > 3 && (
                              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground">
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