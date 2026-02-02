import { Check, FileText, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import type { Client } from "./DemoClientsView";

interface DemoAuditModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

const workers = [
  { name: "John Patel", status: "Approved" },
  { name: "Maria Santos", status: "Approved" },
  { name: "Ahmed Khan", status: "Approved with override" },
  { name: "Lucy Brown", status: "Approved" },
];

const DemoAuditModal = ({ open, onClose, client }: DemoAuditModalProps) => {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <FileText className="w-5 h-5 text-primary" />
            Send Audit Pack
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Client</div>
            <div className="text-sm font-medium text-foreground">{client.name}</div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Week</div>
            <div className="text-sm text-foreground">Week ending 21 Apr 2026</div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Included Workers</div>
            <div className="bg-muted/30 rounded-lg p-2 space-y-1">
              {workers.map((worker) => (
                <div key={worker.name} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{worker.name}</span>
                  <span className="text-xs text-muted-foreground">{worker.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Include in Pack</div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox defaultChecked />
                <span className="text-foreground">Full event sequence</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox defaultChecked />
                <span className="text-foreground">Exception explanations</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox defaultChecked />
                <span className="text-foreground">Approval signatures</span>
              </label>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Link2 className="w-3 h-3" />
              <span>Client will receive a secure, read-only audit link</span>
            </div>
            <Button className="w-full" onClick={onClose}>
              <Check className="w-4 h-4 mr-2" />
              Send Secure Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoAuditModal;
