 import { createContext, useContext, useState, ReactNode } from "react";
 
 export interface WorkerAction {
   id: string;
   workerId: string;
   workerName: string;
   type: "approve" | "reject" | "request-info";
   message?: string;
   timestamp: string;
   status: "pending" | "acknowledged";
   fromView: "labour-user" | "agency";
 }
 
 export interface LedgerNotification {
   id: string;
   type: "action" | "status-change" | "allocation";
   message: string;
   timestamp: string;
   read: boolean;
   targetView: "labour-user" | "agency" | "both";
 }
 
 interface SharedLedgerState {
   // Cross-view notifications
   notifications: LedgerNotification[];
   addNotification: (notification: Omit<LedgerNotification, "id" | "timestamp">) => void;
   markNotificationRead: (id: string) => void;
 
   // Worker actions (approvals, rejections, info requests)
   workerActions: WorkerAction[];
   addWorkerAction: (action: Omit<WorkerAction, "id" | "timestamp" | "status">) => void;
   acknowledgeAction: (id: string) => void;
 
   // Shared worker statuses (mirrored across views)
   workerStatuses: Record<string, { status: string; executionStatus: string; lastUpdated: string }>;
   updateWorkerStatus: (workerId: string, status: string, executionStatus: string) => void;
 
   // Live sync indicator
   lastSyncTime: string;
 }
 
 const DemoContext = createContext<SharedLedgerState | null>(null);
 
 export const useDemoContext = () => {
   const context = useContext(DemoContext);
   if (!context) {
     throw new Error("useDemoContext must be used within DemoProvider");
   }
   return context;
 };
 
 export const DemoProvider = ({ children }: { children: ReactNode }) => {
   const [notifications, setNotifications] = useState<LedgerNotification[]>([]);
   const [workerActions, setWorkerActions] = useState<WorkerAction[]>([]);
   const [workerStatuses, setWorkerStatuses] = useState<Record<string, { status: string; executionStatus: string; lastUpdated: string }>>({});
   const [lastSyncTime, setLastSyncTime] = useState(new Date().toISOString());
 
   const addNotification = (notification: Omit<LedgerNotification, "id" | "timestamp">) => {
     const newNotification: LedgerNotification = {
       ...notification,
       id: `notif-${Date.now()}`,
       timestamp: new Date().toISOString(),
     };
     setNotifications((prev) => [newNotification, ...prev]);
     setLastSyncTime(new Date().toISOString());
   };
 
   const markNotificationRead = (id: string) => {
     setNotifications((prev) =>
       prev.map((n) => (n.id === id ? { ...n, read: true } : n))
     );
   };
 
   const addWorkerAction = (action: Omit<WorkerAction, "id" | "timestamp" | "status">) => {
     const newAction: WorkerAction = {
       ...action,
       id: `action-${Date.now()}`,
       timestamp: new Date().toISOString(),
       status: "pending",
     };
     setWorkerActions((prev) => [newAction, ...prev]);
     
     // Also add a notification for the other view
     const targetView = action.fromView === "labour-user" ? "agency" : "labour-user";
     addNotification({
       type: "action",
       message: `${action.type === "approve" ? "Approved" : action.type === "reject" ? "Rejected" : "Info requested for"} ${action.workerName}`,
       read: false,
       targetView,
     });
     
     setLastSyncTime(new Date().toISOString());
   };
 
   const acknowledgeAction = (id: string) => {
     setWorkerActions((prev) =>
       prev.map((a) => (a.id === id ? { ...a, status: "acknowledged" } : a))
     );
     setLastSyncTime(new Date().toISOString());
   };
 
   const updateWorkerStatus = (workerId: string, status: string, executionStatus: string) => {
     setWorkerStatuses((prev) => ({
       ...prev,
       [workerId]: { status, executionStatus, lastUpdated: new Date().toISOString() },
     }));
     setLastSyncTime(new Date().toISOString());
   };
 
   return (
     <DemoContext.Provider
       value={{
         notifications,
         addNotification,
         markNotificationRead,
         workerActions,
         addWorkerAction,
         acknowledgeAction,
         workerStatuses,
         updateWorkerStatus,
         lastSyncTime,
       }}
     >
       {children}
     </DemoContext.Provider>
   );
 };