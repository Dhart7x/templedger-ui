import { useState } from "react";
import { Calendar, Users, MapPin, Clock, CheckCircle, AlertCircle, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { allocations, agencyWorkers, Allocation } from "./agencyDemoData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DemoAgencyAllocations = () => {
  const [expandedAllocation, setExpandedAllocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("all");

  // Filter allocations for this agency only (Swift Staffing)
  const agencyAllocations = allocations.filter(a => a.agencyId === "AG001");
  
  const dates = ["all", ...Array.from(new Set(agencyAllocations.map(a => a.date)))];
  
  const filteredAllocations = selectedDate === "all" 
    ? agencyAllocations 
    : agencyAllocations.filter(a => a.date === selectedDate);

  // Group by date
  const groupedByDate = filteredAllocations.reduce((acc, alloc) => {
    if (!acc[alloc.date]) acc[alloc.date] = [];
    acc[alloc.date].push(alloc);
    return acc;
  }, {} as Record<string, Allocation[]>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "filled": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "partial": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "unfilled": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const availableWorkers = agencyWorkers.filter(w => w.status === "active" && w.executionStatus !== "blocked");

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Allocations</h2>
          <p className="text-sm text-muted-foreground">Headcount requests from Acme Logistics</p>
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
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-2xl font-bold text-foreground">{agencyAllocations.length}</div>
          <div className="text-xs text-muted-foreground">Total Allocations</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-2xl font-bold text-emerald-400">{agencyAllocations.filter(a => a.status === "filled").length}</div>
          <div className="text-xs text-muted-foreground">Fully Filled</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-2xl font-bold text-amber-400">{agencyAllocations.filter(a => a.status !== "filled").length}</div>
          <div className="text-xs text-muted-foreground">Need Workers</div>
        </div>
      </div>

      {/* Allocations by Date */}
      <div className="space-y-4">
        {Object.entries(groupedByDate).map(([date, allocs]) => (
          <div key={date} className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              {date}
            </div>
            
            <div className="space-y-2">
              {allocs.map((alloc) => {
                const isExpanded = expandedAllocation === alloc.id;
                const filledCount = alloc.assignedWorkers.length;
                const remaining = alloc.requestedHeadcount - filledCount;
                
                return (
                  <div key={alloc.id} className="bg-card border border-border rounded-lg overflow-hidden">
                    {/* Allocation Header */}
                    <button
                      onClick={() => setExpandedAllocation(isExpanded ? null : alloc.id)}
                      className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium text-foreground">{alloc.department}</span>
                          <span className="text-xs text-muted-foreground">{alloc.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {alloc.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {alloc.shift}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{filledCount}/{alloc.requestedHeadcount}</span>
                        </div>
                        <Badge variant="outline" className={getStatusColor(alloc.status)}>
                          {alloc.status === "filled" ? "Filled" : alloc.status === "partial" ? "Partial" : "Unfilled"}
                        </Badge>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-border p-3 bg-muted/20">
                        {/* Assigned Workers */}
                        {alloc.assignedWorkers.length > 0 && (
                          <div className="mb-3">
                            <div className="text-xs font-medium text-muted-foreground mb-2">Assigned Workers</div>
                            <div className="space-y-1">
                              {alloc.assignedWorkers.map((worker) => (
                                <div key={worker.workerId} className="flex items-center justify-between bg-card border border-border rounded px-3 py-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                                      {worker.workerName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="text-sm text-foreground">{worker.workerName}</span>
                                  </div>
                                  {worker.status === "confirmed" ? (
                                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                                      <CheckCircle className="w-3 h-3" />
                                      Confirmed
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-xs text-amber-400">
                                      <AlertCircle className="w-3 h-3" />
                                      Pending
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Remaining Slots */}
                        {remaining > 0 && (
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2">
                              {remaining} {remaining === 1 ? "slot" : "slots"} remaining
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {availableWorkers.slice(0, 3).map((worker) => (
                                <Button
                                  key={worker.id}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs gap-1"
                                >
                                  <Plus className="w-3 h-3" />
                                  {worker.name}
                                </Button>
                              ))}
                              {availableWorkers.length > 3 && (
                                <Button variant="ghost" size="sm" className="text-xs text-primary">
                                  +{availableWorkers.length - 3} more
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoAgencyAllocations;