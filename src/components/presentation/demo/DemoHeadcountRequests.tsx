import { useState } from "react";
import { Plus, CheckCircle, Clock, AlertTriangle, Users, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeadcountDetailModal from "./HeadcountDetailModal";

interface HeadcountRequest {
  id: string;
  department: string;
  site: string;
  shift: string;
  date: string;
  required: number;
  fulfilled: number;
  agencies: { name: string; assigned: number; confirmed: number }[];
  status: "fulfilled" | "partial" | "pending" | "unfilled";
}

const requests: HeadcountRequest[] = [
  {
    id: "1",
    department: "Warehouse",
    site: "Heathrow DC",
    shift: "Morning (06:00 - 14:00)",
    date: "Tomorrow",
    required: 25,
    fulfilled: 25,
    agencies: [
      { name: "Workforce Direct", assigned: 15, confirmed: 15 },
      { name: "Blue Arrow", assigned: 10, confirmed: 10 },
    ],
    status: "fulfilled",
  },
  {
    id: "2",
    department: "Loading",
    site: "Heathrow DC",
    shift: "Morning (06:00 - 14:00)",
    date: "Tomorrow",
    required: 10,
    fulfilled: 8,
    agencies: [
      { name: "Blue Arrow", assigned: 6, confirmed: 5 },
      { name: "Workforce Direct", assigned: 4, confirmed: 3 },
    ],
    status: "partial",
  },
  {
    id: "3",
    department: "Picking",
    site: "Heathrow DC",
    shift: "Afternoon (14:00 - 22:00)",
    date: "Tomorrow",
    required: 15,
    fulfilled: 12,
    agencies: [
      { name: "Pertemps", assigned: 10, confirmed: 8 },
      { name: "Workforce Direct", assigned: 5, confirmed: 4 },
    ],
    status: "partial",
  },
  {
    id: "4",
    department: "Warehouse",
    site: "Birmingham DC",
    shift: "Morning (06:00 - 14:00)",
    date: "Tomorrow",
    required: 18,
    fulfilled: 0,
    agencies: [
      { name: "Workforce Direct", assigned: 18, confirmed: 0 },
    ],
    status: "pending",
  },
  {
    id: "5",
    department: "Quality",
    site: "Heathrow DC",
    shift: "Morning (06:00 - 14:00)",
    date: "Wed 29 Jan",
    required: 5,
    fulfilled: 5,
    agencies: [
      { name: "Pertemps", assigned: 5, confirmed: 5 },
    ],
    status: "fulfilled",
  },
  {
    id: "6",
    department: "Packing",
    site: "Coventry Hub",
    shift: "Night (22:00 - 06:00)",
    date: "Wed 29 Jan",
    required: 8,
    fulfilled: 0,
    agencies: [],
    status: "unfilled",
  },
];

const DemoHeadcountRequests = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<HeadcountRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const statusConfig = {
    fulfilled: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Fulfilled" },
    partial: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", label: "Partial" },
    pending: { icon: Clock, color: "text-primary", bg: "bg-primary/10", label: "Pending" },
    unfilled: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "Unfilled" },
  };

  const summary = {
    total: requests.reduce((acc, r) => acc + r.required, 0),
    fulfilled: requests.reduce((acc, r) => acc + r.fulfilled, 0),
    requests: requests.length,
    fulfilledRequests: requests.filter(r => r.status === "fulfilled").length,
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Headcount Requests</h2>
          <p className="text-sm text-muted-foreground">Set requirements and assign agencies</p>
        </div>
        <Button 
          onClick={() => setShowNewRequest(!showNewRequest)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total Required</span>
          </div>
          <p className="text-2xl font-bold">{summary.total}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Confirmed</span>
          </div>
          <p className="text-2xl font-bold text-green-500">{summary.fulfilled}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Requests</span>
          </div>
          <p className="text-2xl font-bold">{summary.requests}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Fully Staffed</span>
          </div>
          <p className="text-2xl font-bold">{summary.fulfilledRequests}/{summary.requests}</p>
        </div>
      </div>

      {/* New request form placeholder */}
      {showNewRequest && (
        <div className="bg-card border border-primary/30 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">New Headcount Request</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Department</label>
              <select className="w-full bg-background border border-border rounded px-3 py-2 text-sm">
                <option>Warehouse</option>
                <option>Loading</option>
                <option>Picking</option>
                <option>Packing</option>
                <option>Quality</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Site</label>
              <select className="w-full bg-background border border-border rounded px-3 py-2 text-sm">
                <option>Heathrow DC</option>
                <option>Birmingham DC</option>
                <option>Coventry Hub</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Shift</label>
              <select className="w-full bg-background border border-border rounded px-3 py-2 text-sm">
                <option>Morning (06:00 - 14:00)</option>
                <option>Afternoon (14:00 - 22:00)</option>
                <option>Night (22:00 - 06:00)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Headcount</label>
              <input type="number" className="w-full bg-background border border-border rounded px-3 py-2 text-sm" placeholder="10" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-muted-foreground block mb-1">Assign Agencies</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 bg-muted px-3 py-2 rounded cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Workforce Direct</span>
              </label>
              <label className="flex items-center gap-2 bg-muted px-3 py-2 rounded cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Pertemps</span>
              </label>
              <label className="flex items-center gap-2 bg-muted px-3 py-2 rounded cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Blue Arrow</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Submit Request</Button>
            <Button size="sm" variant="outline" onClick={() => setShowNewRequest(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Requests list */}
      <div className="space-y-4">
        {requests.map((request) => {
          const config = statusConfig[request.status];
          const StatusIcon = config.icon;
          
          return (
            <div
              key={request.id}
              onClick={() => {
                setSelectedRequest(request);
                setShowDetailModal(true);
              }}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                    <StatusIcon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{request.department} <span className="text-xs text-primary ml-1">View workers →</span></h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      <span>{request.site}</span>
                      <span>•</span>
                      <span>{request.shift}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{request.date}</p>
                  <div className="flex items-center gap-1">
                    <span className={`text-lg font-bold ${config.color}`}>{request.fulfilled}</span>
                    <span className="text-muted-foreground">/ {request.required}</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      request.status === "fulfilled" ? "bg-green-500" :
                      request.status === "partial" ? "bg-amber-500" :
                      request.status === "pending" ? "bg-primary" :
                      "bg-destructive"
                    }`}
                    style={{ width: `${(request.fulfilled / request.required) * 100}%` }}
                  />
                </div>
              </div>

              {/* Agencies */}
              {request.agencies.length > 0 ? (
                <div className="flex items-center gap-2">
                  {request.agencies.map((agency) => (
                    <div 
                      key={agency.name}
                      className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded text-sm"
                    >
                      <span>{agency.name}</span>
                      <span className={`font-medium ${
                        agency.confirmed === agency.assigned ? "text-green-500" : "text-amber-500"
                      }`}>
                        {agency.confirmed}/{agency.assigned}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No agencies assigned</p>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Headcount Detail Modal */}
      <HeadcountDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
      />
    </div>
  );
};

export default DemoHeadcountRequests;
