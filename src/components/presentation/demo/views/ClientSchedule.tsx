import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Users, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShiftSlot {
  id: string;
  department: string;
  shift: string;
  required: number;
  filled: number;
  confidence: number;
  agencies: { name: string; workers: number }[];
  riskLevel: "low" | "medium" | "high";
  suggestion?: string;
}

const weekDays = ["Mon 3", "Tue 4", "Wed 5", "Thu 6", "Fri 7", "Sat 8", "Sun 9"];

const scheduleData: Record<string, ShiftSlot[]> = {
  "Mon 3": [
    { id: "1", department: "Warehouse", shift: "06:00–14:00", required: 12, filled: 12, confidence: 100, agencies: [{ name: "Staffline", workers: 8 }, { name: "Pertemps", workers: 4 }], riskLevel: "low" },
    { id: "2", department: "Picking", shift: "06:00–14:00", required: 8, filled: 7, confidence: 88, agencies: [{ name: "Staffline", workers: 5 }, { name: "Blue Arrow", workers: 2 }], riskLevel: "medium", suggestion: "Recommend +1 worker" },
    { id: "3", department: "Loading", shift: "06:00–14:00", required: 6, filled: 4, confidence: 67, agencies: [{ name: "Pertemps", workers: 4 }], riskLevel: "high", suggestion: "Recommend +2 workers" },
    { id: "4", department: "Warehouse", shift: "14:00–22:00", required: 10, filled: 10, confidence: 100, agencies: [{ name: "Staffline", workers: 6 }, { name: "Pertemps", workers: 4 }], riskLevel: "low" },
    { id: "5", department: "Picking", shift: "14:00–22:00", required: 6, filled: 6, confidence: 100, agencies: [{ name: "Blue Arrow", workers: 6 }], riskLevel: "low" },
  ],
  "Tue 4": [
    { id: "6", department: "Warehouse", shift: "06:00–14:00", required: 12, filled: 11, confidence: 92, agencies: [{ name: "Staffline", workers: 7 }, { name: "Pertemps", workers: 4 }], riskLevel: "medium" },
    { id: "7", department: "Picking", shift: "06:00–14:00", required: 8, filled: 8, confidence: 100, agencies: [{ name: "Staffline", workers: 5 }, { name: "Blue Arrow", workers: 3 }], riskLevel: "low" },
    { id: "8", department: "Loading", shift: "06:00–14:00", required: 6, filled: 6, confidence: 100, agencies: [{ name: "Pertemps", workers: 6 }], riskLevel: "low" },
  ],
};

const viewOptions = ["By Site", "By Department", "By Agency", "By Shift"];

const ClientSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Mon 3");
  const [viewBy, setViewBy] = useState("By Department");
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");

  const slots = scheduleData[selectedDay] || [];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-500 bg-green-500/10";
    if (confidence >= 85) return "text-amber-500 bg-amber-500/10";
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
          <p className="text-xs text-muted-foreground">Week of February 3–9, 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={viewBy}
            onChange={(e) => setViewBy(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            {viewOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
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
            <span className="text-xs text-muted-foreground">Total Required</span>
          </div>
          <p className="text-xl font-bold">{slots.reduce((a, s) => a + s.required, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Filled</span>
          </div>
          <p className="text-xl font-bold text-green-500">{slots.reduce((a, s) => a + s.filled, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Avg Confidence</span>
          </div>
          <p className="text-xl font-bold text-primary">
            {Math.round(slots.reduce((a, s) => a + s.confidence, 0) / (slots.length || 1))}%
          </p>
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
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold">{slot.department}</span>
                  <span className="text-xs text-muted-foreground">{slot.shift}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getConfidenceColor(slot.confidence)}`}>
                    {slot.confidence}% confidence
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {slot.filled}/{slot.required} filled
                  </span>
                  {slot.agencies.map((agency) => (
                    <span key={agency.name} className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {agency.name}: {agency.workers}
                    </span>
                  ))}
                </div>
              </div>
              {slot.suggestion && (
                <div className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {slot.suggestion}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSchedule;
