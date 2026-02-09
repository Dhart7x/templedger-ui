import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Users, AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScheduleSlot {
  id: string;
  department: string;
  location: string;
  shift: string;
  required: number;
  assigned: number;
  confirmed: number;
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  workers: { name: string; status: "confirmed" | "pending" }[];
}

const weekDays = ["Mon 3", "Tue 4", "Wed 5", "Thu 6", "Fri 7", "Sat 8", "Sun 9"];

const scheduleData: Record<string, ScheduleSlot[]> = {
  "Mon 3": [
    { 
      id: "1", 
      department: "Picking", 
      location: "Zone A", 
      shift: "06:00–14:00", 
      required: 4, 
      assigned: 4, 
      confirmed: 3, 
      confidence: 95,
      riskLevel: "low",
      workers: [
        { name: "Sarah Mitchell", status: "confirmed" },
        { name: "Maria Santos", status: "confirmed" },
        { name: "James Cooper", status: "confirmed" },
        { name: "Emma Wilson", status: "pending" },
      ]
    },
    { 
      id: "2", 
      department: "Packing", 
      location: "Zone B", 
      shift: "06:00–14:00", 
      required: 2, 
      assigned: 2, 
      confirmed: 2,
      confidence: 100,
      riskLevel: "low",
      workers: [
        { name: "Michael Brown", status: "confirmed" },
        { name: "Lisa Anderson", status: "confirmed" },
      ]
    },
    { 
      id: "3", 
      department: "Goods In", 
      location: "Zone C", 
      shift: "06:00–14:00", 
      required: 2, 
      assigned: 1, 
      confirmed: 1,
      confidence: 50,
      riskLevel: "high",
      workers: [
        { name: "David Chen", status: "confirmed" },
      ]
    },
    { 
      id: "4", 
      department: "Picking", 
      location: "Zone A", 
      shift: "14:00–22:00", 
      required: 3, 
      assigned: 3, 
      confirmed: 2,
      confidence: 85,
      riskLevel: "medium",
      workers: [
        { name: "Robert Taylor", status: "confirmed" },
        { name: "Jennifer White", status: "confirmed" },
        { name: "Anthony Green", status: "pending" },
      ]
    },
  ],
};

const AgencySchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Mon 3");
  const [viewBy, setViewBy] = useState("by-site");

  const slots = scheduleData[selectedDay] || [];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-500 bg-green-500/10";
    if (confidence >= 80) return "text-amber-500 bg-amber-500/10";
    return "text-destructive bg-destructive/10";
  };

  const getRiskBorder = (risk: "low" | "medium" | "high") => {
    if (risk === "low") return "border-l-green-500";
    if (risk === "medium") return "border-l-amber-500";
    return "border-l-destructive";
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Schedule</h1>
          <p className="text-xs text-muted-foreground">Clipper Logistics • Week of February 3–9</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={viewBy}
            onChange={(e) => setViewBy(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="by-site">By Site</option>
            <option value="by-department">By Department</option>
            <option value="by-shift">By Shift</option>
          </select>
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

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Required</span>
          </div>
          <p className="text-xl font-bold">{slots.reduce((a, s) => a + s.required, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Assigned</span>
          </div>
          <p className="text-xl font-bold text-primary">{slots.reduce((a, s) => a + s.assigned, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Confirmed</span>
          </div>
          <p className="text-xl font-bold text-green-500">{slots.reduce((a, s) => a + s.confirmed, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">At Risk</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{slots.filter(s => s.riskLevel !== "low").length}</p>
        </div>
      </div>

      {/* Schedule Slots */}
      <div className="space-y-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`bg-card border border-border border-l-4 ${getRiskBorder(slot.riskLevel)} rounded-lg p-4`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-semibold">{slot.department}</span>
                  <span className="text-xs text-muted-foreground">{slot.shift}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getConfidenceColor(slot.confidence)}`}>
                    {slot.confidence}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {slot.location}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{slot.assigned}/{slot.required}</p>
                <p className="text-xs text-muted-foreground">{slot.confirmed} confirmed</p>
              </div>
            </div>
            
            {/* Workers */}
            <div className="flex flex-wrap gap-2">
              {slot.workers.map((worker, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2 py-1 rounded ${
                    worker.status === "confirmed" 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  {worker.name}
                  {worker.status === "pending" && " (pending)"}
                </span>
              ))}
              {slot.assigned < slot.required && (
                <Button variant="outline" size="sm" className="h-6 text-xs gap-1">
                  + Assign worker
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencySchedule;
