import { Users, Clock, Bell, Building2 } from "lucide-react";

const DemoSettings = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Settings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Users */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </h3>
          <div className="space-y-2">
            {[
              { name: "Sarah Mitchell", role: "Admin", email: "s.mitchell@company.com" },
              { name: "John Smith", role: "Manager", email: "j.smith@company.com" },
              { name: "Emma Watson", role: "Viewer", email: "e.watson@company.com" },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div>
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{user.role}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-sm text-primary hover:underline">+ Add User</button>
        </div>

        {/* Overtime thresholds */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Overtime Thresholds
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily limit</span>
              <span className="text-sm font-medium">10 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weekly limit</span>
              <span className="text-sm font-medium">48 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Alert before breach</span>
              <span className="text-sm font-medium">2 hours</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </h3>
          <div className="space-y-3">
            {[
              { label: "No-show alerts", enabled: true },
              { label: "Overtime threshold breaches", enabled: true },
              { label: "RTW expiry warnings", enabled: true },
              { label: "Daily summary", enabled: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{item.label}</span>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer ${item.enabled ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agencies */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Connected Agencies
          </h3>
          <div className="space-y-2">
            {["Staffline", "Pertemps", "Blue Arrow", "Hays"].map((agency, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-sm font-medium">{agency}</span>
                <span className="text-xs text-green-500">Connected</span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-sm text-primary hover:underline">+ Add Agency</button>
        </div>
      </div>
    </div>
  );
};

export default DemoSettings;
