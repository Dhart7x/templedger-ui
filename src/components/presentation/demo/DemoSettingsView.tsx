import { useState } from "react";
import { Users, Building2, BookOpen, CheckCircle, Plug, FileText, Bell, Plus, Edit2, Trash2, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users, clients, sites } from "./demoData";

const tabs = [
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "clients", label: "Clients & Sites", icon: Building2 },
  { id: "rules", label: "Ledger Rules", icon: BookOpen },
  { id: "approvals", label: "Approvals", icon: CheckCircle },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "templates", label: "Audit Pack Templates", icon: FileText },
  { id: "credit", label: "Credit Control", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const roles = ["Admin", "Ops", "Finance", "Client Viewer", "Auditor"];

const permissions = [
  { name: "View ledger", admin: true, ops: true, finance: true, viewer: true, auditor: true },
  { name: "Resolve exceptions", admin: true, ops: true, finance: true, viewer: false, auditor: false },
  { name: "Approve overrides", admin: true, ops: false, finance: true, viewer: false, auditor: false },
  { name: "Export packs", admin: true, ops: true, finance: true, viewer: true, auditor: true },
  { name: "Manage users", admin: true, ops: false, finance: false, viewer: false, auditor: false },
];

const DemoSettingsView = () => {
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Users & Roles</h2>
                <p className="text-sm text-muted-foreground">Manage user access and permissions</p>
              </div>
              <Button size="sm">
                <Plus className="w-3 h-3 mr-1.5" />
                Add User
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border">
                      <td className="p-3 text-foreground font-medium">{user.name}</td>
                      <td className="p-3 text-muted-foreground">{user.email}</td>
                      <td className="p-3">
                        <Select defaultValue={user.role}>
                          <SelectTrigger className="w-32 h-7 text-xs bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {roles.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-muted rounded"><Edit2 className="w-3 h-3 text-muted-foreground" /></button>
                          <button className="p-1 hover:bg-muted rounded"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Permissions Matrix</h3>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-muted-foreground uppercase tracking-wide">
                      <th className="p-2">Permission</th>
                      <th className="p-2 text-center">Admin</th>
                      <th className="p-2 text-center">Ops</th>
                      <th className="p-2 text-center">Finance</th>
                      <th className="p-2 text-center">Viewer</th>
                      <th className="p-2 text-center">Auditor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="p-2 text-foreground">{perm.name}</td>
                        <td className="p-2 text-center">{perm.admin ? "✓" : "–"}</td>
                        <td className="p-2 text-center">{perm.ops ? "✓" : "–"}</td>
                        <td className="p-2 text-center">{perm.finance ? "✓" : "–"}</td>
                        <td className="p-2 text-center">{perm.viewer ? "✓" : "–"}</td>
                        <td className="p-2 text-center">{perm.auditor ? "✓" : "–"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "clients":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Clients & Sites</h2>
                <p className="text-sm text-muted-foreground">Manage client sites and approval SLAs</p>
              </div>
              <Button size="sm">
                <Plus className="w-3 h-3 mr-1.5" />
                Add Client
              </Button>
            </div>

            {clients.map((client) => (
              <div key={client.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between">
                  <span className="font-medium text-foreground">{client.name}</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Site
                  </Button>
                </div>
                <div className="divide-y divide-border">
                  {sites.filter((s) => s.clientId === client.id).map((site) => (
                    <div key={site.id} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-foreground">{site.name}</div>
                        <div className="text-xs text-muted-foreground">Manager: {site.manager}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-muted-foreground">SLA: {site.slaHours}h</div>
                        <button className="p-1 hover:bg-muted rounded"><Edit2 className="w-3 h-3 text-muted-foreground" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "rules":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Ledger Rules</h2>
              <p className="text-sm text-muted-foreground">Configure validation thresholds and rules</p>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Time Tolerance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Scheduled vs Clocked (±minutes)</label>
                    <Input type="number" defaultValue="15" className="mt-1 h-8 text-sm bg-background" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Grace period (minutes)</label>
                    <Input type="number" defaultValue="5" className="mt-1 h-8 text-sm bg-background" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Overtime Rules</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Weekly threshold (hours)</label>
                    <Input type="number" defaultValue="40" className="mt-1 h-8 text-sm bg-background" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Overtime multiplier</label>
                    <Input type="text" defaultValue="1.5x" className="mt-1 h-8 text-sm bg-background" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Invoice Blocking</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Open P1 exceptions block invoice-ready</span>
                    <Switch defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Open P2 exceptions block invoice-ready</span>
                    <Switch defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Overrides flag invoice as amber</span>
                    <Switch defaultChecked />
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "approvals":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Approval Settings</h2>
              <p className="text-sm text-muted-foreground">Configure who can approve hours and overrides</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Hours Approval</h3>
              <p className="text-xs text-muted-foreground mb-2">Client managers who can approve hours:</p>
              <div className="space-y-2">
                {["Sarah Mitchell", "Mark Thompson", "Emma Jones", "Raj Patel", "John Smith"].map((name) => (
                  <div key={name} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm text-foreground">{name}</span>
                    <button className="p-1 hover:bg-muted rounded"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Override Approval</h3>
              <p className="text-xs text-muted-foreground mb-2">Finance roles who can approve overrides:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-sm text-foreground">Usman Iftikhar</span>
                  <span className="text-xs text-primary">Admin</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-sm text-foreground">Finance Team</span>
                  <span className="text-xs text-primary">Finance</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Dual Approval</h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Require dual approval for overrides &gt; $500</span>
                  <Switch defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Require dual approval for P1 exceptions</span>
                  <Switch />
                </label>
              </div>
            </div>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Integrations</h2>
              <p className="text-sm text-muted-foreground">Connect external systems</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Payroll System</h3>
                <Select defaultValue="adp">
                  <SelectTrigger className="w-full h-8 text-sm bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="adp">ADP</SelectItem>
                    <SelectItem value="sage">Sage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2 text-xs text-emerald-400">● Connected</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Billing System</h3>
                <Select defaultValue="xero">
                  <SelectTrigger className="w-full h-8 text-sm bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="xero">Xero</SelectItem>
                    <SelectItem value="quickbooks">QuickBooks</SelectItem>
                    <SelectItem value="sage">Sage</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2 text-xs text-emerald-400">● Connected</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">ATS / CRM</h3>
                <Select defaultValue="bullhorn">
                  <SelectTrigger className="w-full h-8 text-sm bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="bullhorn">Bullhorn</SelectItem>
                    <SelectItem value="vincere">Vincere</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2 text-xs text-muted-foreground">○ Not connected</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Time & Attendance</h3>
                <Select defaultValue="native">
                  <SelectTrigger className="w-full h-8 text-sm bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="native">Temp Ledger Native</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2 text-xs text-emerald-400">● Active</div>
              </div>
            </div>
          </div>
        );

      case "templates":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Audit Pack Templates</h2>
              <p className="text-sm text-muted-foreground">Configure default sections and branding</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Default Sections</h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Ledger timeline</span>
                  <Switch defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Exception notes</span>
                  <Switch defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Approval signatures</span>
                  <Switch defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Evidence attachments</span>
                  <Switch defaultChecked />
                </label>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Secure Link Settings</h3>
              <div>
                <label className="text-xs text-muted-foreground">Link expiry (days)</label>
                <Input type="number" defaultValue="30" className="mt-1 h-8 text-sm bg-background w-32" />
              </div>
            </div>
          </div>
        );

      case "credit":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Credit Control</h2>
              <p className="text-sm text-muted-foreground">Configure credit control defaults and permissions</p>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Global Defaults</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Default payment terms</label>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-full mt-1 h-8 text-sm bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="45">45 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Default statement day</label>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-full mt-1 h-8 text-sm bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="1">1st of month</SelectItem>
                        <SelectItem value="15">15th of month</SelectItem>
                        <SelectItem value="last">Last day of month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Send monthly statements by default</span>
                    <Switch />
                  </label>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Invoice Finance Providers</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm text-foreground">Triumph Business Capital</span>
                    <button className="p-1 hover:bg-muted rounded"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm text-foreground">Bibby Financial Services</span>
                    <button className="p-1 hover:bg-muted rounded"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm text-foreground">Riviera Finance</span>
                    <button className="p-1 hover:bg-muted rounded"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm text-foreground">Porter Capital Group</span>
                    <button className="p-1 hover:bg-muted rounded"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Plus className="w-3 h-3 mr-1.5" />
                    Add Provider
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Export Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Default export method</label>
                    <Select defaultValue="secure-link">
                      <SelectTrigger className="w-full mt-1 h-8 text-sm bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="secure-link">Secure Link</SelectItem>
                        <SelectItem value="email-attachment">Email Attachment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Link expiry (days)</label>
                    <Select defaultValue="14">
                      <SelectTrigger className="w-full mt-1 h-8 text-sm bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Permissions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <div className="text-sm text-foreground">Edit credit control settings</div>
                      <div className="text-xs text-muted-foreground">Admin, Finance</div>
                    </div>
                    <button className="p-1 hover:bg-muted rounded"><Edit2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <div className="text-sm text-foreground">Export invoices</div>
                      <div className="text-xs text-muted-foreground">Admin, Finance, Ops</div>
                    </div>
                    <button className="p-1 hover:bg-muted rounded"><Edit2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <div className="text-sm text-foreground">Copy finance providers</div>
                      <div className="text-xs text-muted-foreground">Admin, Finance</div>
                    </div>
                    <button className="p-1 hover:bg-muted rounded"><Edit2 className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Configure alerts and reminders</p>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Exception Alerts</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">SLA breach reminders</span>
                    <Switch defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">P1 exception immediate alerts</span>
                    <Switch defaultChecked />
                  </label>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Approval Reminders</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Client manager approval reminders</span>
                    <Switch defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Weekly invoice-ready notification</span>
                    <Switch defaultChecked />
                  </label>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Credit Control Alerts</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Payment overdue reminders</span>
                    <Switch defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Statement sent confirmation</span>
                    <Switch />
                  </label>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Digest Emails</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Daily exception summary</span>
                    <Switch />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Weekly status report</span>
                    <Switch defaultChecked />
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Tabs Sidebar */}
      <div className="w-48 border-r border-border bg-card p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left",
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default DemoSettingsView;
