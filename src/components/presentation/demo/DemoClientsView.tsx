import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { clients, type Client } from "./demoData";

interface DemoClientsViewProps {
  onSelectClient: (client: Client) => void;
}

const statusConfig = {
  green: { label: "All approved", className: "bg-emerald-500/20 text-emerald-400" },
  amber: { label: "Exceptions resolved", className: "bg-amber-500/20 text-amber-400" },
  red: { label: "Outstanding exceptions", className: "bg-red-500/20 text-red-400" },
};

const DemoClientsView = ({ onSelectClient }: DemoClientsViewProps) => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Clients</h1>
        <p className="text-sm text-muted-foreground">Select a client to review weekly audit status</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr,120px,180px,40px] gap-4 px-4 py-3 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Client</span>
          <span>Agencies</span>
          <span>Week Status</span>
          <span></span>
        </div>
        {clients.map((client) => (
          <button
            key={client.id}
            onClick={() => onSelectClient(client)}
            className="w-full grid grid-cols-[1fr,120px,180px,40px] gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors text-left items-center"
          >
            <span className="font-medium text-foreground">{client.name}</span>
            <span className="text-sm text-muted-foreground">{client.agencies} active</span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-1 rounded text-xs font-medium w-fit",
                statusConfig[client.status].className
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full mr-2",
                  client.status === "green" && "bg-emerald-400",
                  client.status === "amber" && "bg-amber-400",
                  client.status === "red" && "bg-red-400"
                )}
              />
              {statusConfig[client.status].label}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoClientsView;
