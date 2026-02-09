import { useState } from "react";
import { Plus, Check, X, MessageSquare, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  role: string;
  quantity: number;
  location: string;
  site: string;
  shift: string;
  date: string;
  status: "new" | "accepted" | "rejected";
  client: string;
  notes?: string;
}

const orders: Order[] = [
  { id: "1", role: "Warehouse Operative", quantity: 4, location: "Zone A", site: "Heathrow DC", shift: "06:00–14:00", date: "Mon 10 Feb", status: "new", client: "Clipper Logistics" },
  { id: "2", role: "Picker", quantity: 2, location: "Zone B", site: "Heathrow DC", shift: "14:00–22:00", date: "Mon 10 Feb", status: "new", client: "Clipper Logistics" },
  { id: "3", role: "Forklift Driver", quantity: 1, location: "Zone A", site: "Coventry Hub", shift: "06:00–14:00", date: "Tue 11 Feb", status: "accepted", client: "Clipper Logistics" },
  { id: "4", role: "Loader", quantity: 3, location: "Zone D", site: "Birmingham DC", shift: "14:00–22:00", date: "Mon 10 Feb", status: "rejected", client: "Clipper Logistics", notes: "Insufficient capacity for night shifts" },
];

const AgencyNewOrder = () => {
  const [filter, setFilter] = useState<"all" | "new" | "accepted" | "rejected">("all");

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);
  const newCount = orders.filter(o => o.status === "new").length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">New Orders</h1>
          <p className="text-xs text-muted-foreground">Inbound requests from clients</p>
        </div>
        {newCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <span className="text-sm font-medium text-amber-500">{newCount} new order{newCount > 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { key: "all", label: "All" },
          { key: "new", label: "New", count: newCount },
          { key: "accepted", label: "Accepted" },
          { key: "rejected", label: "Rejected" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              filter === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="ml-2 bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded text-xs">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`bg-card border rounded-lg p-4 ${
              order.status === "new" ? "border-amber-500/30 bg-amber-500/5" :
              order.status === "accepted" ? "border-green-500/30" :
              "border-destructive/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold">{order.role}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    order.status === "new" ? "bg-amber-500/20 text-amber-500" :
                    order.status === "accepted" ? "bg-green-500/20 text-green-500" :
                    "bg-destructive/20 text-destructive"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {order.quantity} worker{order.quantity > 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {order.site} • {order.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {order.shift}
                  </span>
                  <span>{order.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">From: {order.client}</p>
                
                {order.notes && (
                  <div className="mt-2 text-xs text-muted-foreground italic">
                    Note: {order.notes}
                  </div>
                )}
              </div>
              
              {order.status === "new" && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                    <MessageSquare className="w-3 h-3" />
                    Notes
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-8 text-destructive hover:text-destructive">
                    <X className="w-3 h-3" />
                    Reject
                  </Button>
                  <Button size="sm" className="gap-1 text-xs h-8">
                    <Check className="w-3 h-3" />
                    Accept
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default AgencyNewOrder;
