import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// ============= TYPES =============

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
  type: "action" | "status-change" | "allocation" | "booking" | "exception" | "temp-perm";
  message: string;
  title?: string;
  timestamp: string;
  read: boolean;
  targetView: "labour-user" | "agency" | "both";
  contextType?: "booking" | "worker" | "exception" | "schedule";
  contextId?: string;
  workerName?: string;
  agency?: string;
  site?: string;
  fromAgency?: boolean;
}

export interface Booking {
  id: string;
  role: string;
  quantity: number;
  location: string;
  site: string;
  shift: string;
  date: string;
  status: "pending" | "accepted" | "rejected" | "info-requested";
  suggestedAgency?: string;
  agency?: string;
  clientNotes?: string;
  agencyNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkerAllocation {
  id: string;
  workerId: string;
  workerName: string;
  site: string;
  department: string;
  shift: string;
  date: string;
  allocatedAt: string;
  status: "scheduled" | "active" | "completed";
}

export interface ExceptionResolution {
  exceptionId: string;
  workerId: string;
  workerName: string;
  department: string;
  resolutionType: "on-the-way" | "replaced" | "acknowledged";
  etaMinutes?: number;
  replacementWorkerId?: string;
  replacementWorkerName?: string;
  replacementEtaMinutes?: number;
  agencyNote?: string;
  timestamp: string;
  acknowledged: boolean;
  clientResponse?: "accepted" | "request-replacement";
}

export type ExceptionType = 
  | "no-show" 
  | "late" 
  | "overtime" 
  | "clocked-in-not-out" 
  | "rtw-expired" 
  | "traffic-alert";

export interface LiveException {
  id: string;
  workerId: string;
  workerName: string;
  type: ExceptionType;
  site: string;
  department: string;
  agency: string;
  shift: string;
  lateMinutes?: number;
  overtimeMinutes?: number;
  clockInTime?: string;
  rtwExpiryDate?: string;
  trafficSeverity?: "moderate" | "severe";
  affectedWorkers?: number;
  timestamp: string;
  status: "open" | "resolving" | "resolved";
  resolution?: ExceptionResolution;
}

// ============= CONTEXT INTERFACE =============

interface SharedLedgerState {
  notifications: LedgerNotification[];
  addNotification: (notification: Omit<LedgerNotification, "id" | "timestamp">) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  workerActions: WorkerAction[];
  addWorkerAction: (action: Omit<WorkerAction, "id" | "timestamp" | "status">) => void;
  acknowledgeAction: (id: string) => void;
  workerStatuses: Record<string, { status: string; executionStatus: string; lastUpdated: string }>;
  updateWorkerStatus: (workerId: string, status: string, executionStatus: string) => void;
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">) => void;
  updateBookingStatus: (bookingId: string, status: Booking["status"], notes?: string) => void;
  allocations: WorkerAllocation[];
  allocateWorker: (allocation: Omit<WorkerAllocation, "id" | "allocatedAt" | "status">) => void;
  exceptions: LiveException[];
  addException: (exception: Omit<LiveException, "id" | "timestamp" | "status">) => void;
  updateExceptionStatus: (exceptionId: string, status: LiveException["status"], resolution?: ExceptionResolution) => void;
  respondToException: (exceptionId: string, response: "accepted" | "request-replacement") => void;
  lastSyncTime: string;
}

// ============= INITIAL DATA =============

const initialBookings: Booking[] = [
  {
    id: "booking-1",
    role: "Warehouse Operative",
    quantity: 4,
    location: "Zone A",
    site: "Baltimore, MD",
    shift: "06:00–14:00",
    date: "Mon 10 Feb",
    status: "pending",
    suggestedAgency: "Staffline",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "booking-2",
    role: "MHE Operative",
    quantity: 2,
    location: "Zone B",
    site: "Baltimore, MD",
    shift: "14:00–22:00",
    date: "Mon 10 Feb",
    status: "pending",
    suggestedAgency: "KPI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "booking-3",
    role: "MHE Operative",
    quantity: 1,
    location: "Zone A",
    site: "Las Vegas, NV",
    shift: "06:00–14:00",
    date: "Tue 11 Feb",
    status: "accepted",
    agency: "The Results People",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialExceptions: LiveException[] = [
  {
    id: "exc-1",
    workerId: "w-james",
    workerName: "James Wilson",
    type: "no-show",
    site: "Dallas Fort-Worth, TX",
    department: "MHE",
    agency: "The Results People",
    shift: "06:00–14:00",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-2",
    workerId: "w-mike",
    workerName: "Mike Stevens",
    type: "no-show",
    site: "Baltimore, MD",
    department: "Warehouse Operative",
    agency: "KPI",
    shift: "06:00–14:00",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-5",
    workerId: "w-kevin",
    workerName: "Kevin Morris",
    type: "no-show",
    site: "Baltimore, MD",
    department: "Warehouse Operative",
    agency: "The Results People",
    shift: "06:00–14:00",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-8",
    workerId: "w-lisa",
    workerName: "Lisa Chen",
    type: "no-show",
    site: "Dallas Fort-Worth, TX",
    department: "Warehouse Operative",
    agency: "KPI",
    shift: "06:00–14:00",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-10",
    workerId: "w-marcus",
    workerName: "Marcus Taylor",
    type: "no-show",
    site: "Las Vegas, NV",
    department: "Warehouse Operative",
    agency: "Staffline",
    shift: "06:00–14:00",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-3",
    workerId: "w-tomasz",
    workerName: "Tomasz Nowak",
    type: "late",
    site: "Baltimore, MD",
    department: "MHE",
    agency: "Staffline",
    shift: "06:00–14:00",
    lateMinutes: 45,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-4",
    workerId: "w-rachel",
    workerName: "Rachel Adams",
    type: "late",
    site: "Las Vegas, NV",
    department: "Warehouse Operative",
    agency: "KPI",
    shift: "06:00–14:00",
    lateMinutes: 32,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-6",
    workerId: "w-sarah",
    workerName: "Sarah Bennett",
    type: "late",
    site: "Dallas Fort-Worth, TX",
    department: "Warehouse Operative",
    agency: "Staffline",
    shift: "06:00–14:00",
    lateMinutes: 25,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-7",
    workerId: "w-david",
    workerName: "David Thompson",
    type: "late",
    site: "Las Vegas, NV",
    department: "MHE",
    agency: "The Results People",
    shift: "06:00–14:00",
    lateMinutes: 18,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-9",
    workerId: "w-mark",
    workerName: "Mark Edwards",
    type: "late",
    site: "Baltimore, MD",
    department: "Warehouse Operative",
    agency: "Staffline",
    shift: "06:00–14:00",
    lateMinutes: 42,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-11",
    workerId: "w-priya",
    workerName: "Priya Sharma",
    type: "overtime",
    site: "Baltimore, MD",
    department: "Warehouse Operative",
    agency: "Staffline",
    shift: "06:00–14:00",
    overtimeMinutes: 45,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-12",
    workerId: "w-robert",
    workerName: "Robert Garcia",
    type: "overtime",
    site: "Dallas Fort-Worth, TX",
    department: "Warehouse Operative",
    agency: "KPI",
    shift: "06:00–14:00",
    overtimeMinutes: 90,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-13",
    workerId: "w-emma",
    workerName: "Emma Richardson",
    type: "clocked-in-not-out",
    site: "Las Vegas, NV",
    department: "Warehouse Operative",
    agency: "The Results People",
    shift: "22:00–06:00",
    clockInTime: "22:02",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-14",
    workerId: "w-ahmed",
    workerName: "Ahmed Hassan",
    type: "clocked-in-not-out",
    site: "Baltimore, MD",
    department: "Warehouse Operative",
    agency: "Staffline",
    shift: "14:00–22:00",
    clockInTime: "14:05",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-15",
    workerId: "w-andrei",
    workerName: "Andrei Petrov",
    type: "rtw-expired",
    site: "Dallas Fort-Worth, TX",
    department: "Warehouse Operative",
    agency: "KPI",
    shift: "06:00–14:00",
    rtwExpiryDate: "2026-02-01",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-16",
    workerId: "w-fatima",
    workerName: "Fatima Al-Rashid",
    type: "rtw-expired",
    site: "Baltimore, MD",
    department: "Warehouse Operative",
    agency: "The Results People",
    shift: "06:00–14:00",
    rtwExpiryDate: "2026-02-05",
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-17",
    workerId: "traffic-vault",
    workerName: "M62 Junction 6",
    type: "traffic-alert",
    site: "Baltimore, MD",
    department: "All",
    agency: "All",
    shift: "06:00–14:00",
    trafficSeverity: "severe",
    affectedWorkers: 12,
    timestamp: new Date().toISOString(),
    status: "open",
  },
  {
    id: "exc-18",
    workerId: "traffic-cube",
    workerName: "A556 Northwich Road",
    type: "traffic-alert",
    site: "Las Vegas, NV",
    department: "All",
    agency: "All",
    shift: "06:00–14:00",
    trafficSeverity: "moderate",
    affectedWorkers: 6,
    timestamp: new Date().toISOString(),
    status: "open",
  },
];

// ============= CONTEXT =============

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
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [allocations, setAllocations] = useState<WorkerAllocation[]>([]);
  const [exceptions, setExceptions] = useState<LiveException[]>(initialExceptions);

  const addNotification = useCallback((notification: Omit<LedgerNotification, "id" | "timestamp">) => {
    const newNotification: LedgerNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setLastSyncTime(new Date().toISOString());
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addWorkerAction = useCallback((action: Omit<WorkerAction, "id" | "timestamp" | "status">) => {
    const newAction: WorkerAction = {
      ...action,
      id: `action-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "pending",
    };
    setWorkerActions((prev) => [newAction, ...prev]);
    
    const targetView = action.fromView === "labour-user" ? "agency" : "labour-user";
    addNotification({
      type: "action",
      message: `${action.type === "approve" ? "Approved" : action.type === "reject" ? "Rejected" : "Info requested for"} ${action.workerName}`,
      read: false,
      targetView,
      contextType: "worker",
      contextId: action.workerId,
    });
    
    setLastSyncTime(new Date().toISOString());
  }, [addNotification]);

  const acknowledgeAction = useCallback((id: string) => {
    setWorkerActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "acknowledged" } : a))
    );
    setLastSyncTime(new Date().toISOString());
  }, []);

  const updateWorkerStatus = useCallback((workerId: string, status: string, executionStatus: string) => {
    setWorkerStatuses((prev) => ({
      ...prev,
      [workerId]: { status, executionStatus, lastUpdated: new Date().toISOString() },
    }));
    setLastSyncTime(new Date().toISOString());
  }, []);

  const createBooking = useCallback((booking: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    
    addNotification({
      type: "booking",
      title: "New Booking Request",
      message: `${booking.quantity}x ${booking.role} at ${booking.site} - ${booking.location} (${booking.shift})`,
      read: false,
      targetView: "agency",
      contextType: "booking",
    });
    
    setLastSyncTime(new Date().toISOString());
  }, [addNotification]);

  const updateBookingStatus = useCallback((bookingId: string, status: Booking["status"], notes?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const updated = { ...b, status, updatedAt: new Date().toISOString() };
          if (notes) {
            if (status === "info-requested") {
              updated.agencyNotes = notes;
            } else {
              updated.agencyNotes = notes;
            }
          }
          if (status === "accepted") {
            updated.agency = "Staffline";
          }
          return updated;
        }
        return b;
      })
    );

    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      addNotification({
        type: "booking",
        title: `Booking ${status === "accepted" ? "Accepted" : status === "rejected" ? "Rejected" : "Info Requested"}`,
        message: `${booking.role} at ${booking.site} has been ${status}${notes ? `: ${notes}` : ""}`,
        read: false,
        targetView: "labour-user",
        contextType: "booking",
        contextId: bookingId,
        fromAgency: true,
      });
    }
    
    setLastSyncTime(new Date().toISOString());
  }, [bookings, addNotification]);

  const allocateWorker = useCallback((allocation: Omit<WorkerAllocation, "id" | "allocatedAt" | "status">) => {
    const newAllocation: WorkerAllocation = {
      ...allocation,
      id: `alloc-${Date.now()}`,
      allocatedAt: new Date().toISOString(),
      status: "scheduled",
    };
    setAllocations((prev) => [...prev, newAllocation]);
    
    addNotification({
      type: "allocation",
      title: "Worker Allocated",
      message: `${allocation.workerName} allocated to ${allocation.department} at ${allocation.site} (${allocation.shift})`,
      read: false,
      targetView: "labour-user",
      contextType: "worker",
      workerName: allocation.workerName,
      site: allocation.site,
      fromAgency: true,
    });
    
    setLastSyncTime(new Date().toISOString());
  }, [addNotification]);

  const addException = useCallback((exception: Omit<LiveException, "id" | "timestamp" | "status">) => {
    const newException: LiveException = {
      ...exception,
      id: `exc-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "open",
    };
    setExceptions((prev) => [newException, ...prev]);
    
    addNotification({
      type: "exception",
      title: `Exception: ${exception.type}`,
      message: `${exception.workerName} - ${exception.type} at ${exception.site}`,
      read: false,
      targetView: "both",
      contextType: "exception",
    });
    
    setLastSyncTime(new Date().toISOString());
  }, [addNotification]);

  const updateExceptionStatus = useCallback((exceptionId: string, status: LiveException["status"], resolution?: ExceptionResolution) => {
    setExceptions((prev) =>
      prev.map((e) => {
        if (e.id === exceptionId) {
          return { ...e, status, resolution: resolution || e.resolution };
        }
        return e;
      })
    );

    if (resolution) {
      const exception = exceptions.find(e => e.id === exceptionId);
      if (exception) {
        const message = resolution.resolutionType === "on-the-way"
          ? `${exception.workerName} is on the way — ETA ${resolution.etaMinutes} mins`
          : resolution.resolutionType === "replaced"
          ? `Replacement ${resolution.replacementWorkerName} dispatched for ${exception.workerName} — ETA ${resolution.replacementEtaMinutes} mins`
          : `Exception for ${exception.workerName} acknowledged`;

        addNotification({
          type: "exception",
          title: "Agency Response",
          message,
          read: false,
          targetView: "labour-user",
          contextType: "exception",
          contextId: exceptionId,
          workerName: exception.workerName,
          agency: exception.agency,
          site: exception.site,
          fromAgency: true,
        });
      }
    }
    
    setLastSyncTime(new Date().toISOString());
  }, [exceptions, addNotification]);

  const respondToException = useCallback((exceptionId: string, response: "accepted" | "request-replacement") => {
    setExceptions((prev) =>
      prev.map((e) => {
        if (e.id === exceptionId && e.resolution) {
          return {
            ...e,
            resolution: {
              ...e.resolution,
              clientResponse: response,
              acknowledged: response === "accepted",
            },
          };
        }
        return e;
      })
    );

    const exception = exceptions.find(e => e.id === exceptionId);
    if (exception) {
      addNotification({
        type: "exception",
        title: response === "accepted" ? "Resolution Accepted" : "Replacement Requested",
        message: response === "accepted"
          ? `Client accepted resolution for ${exception.workerName}`
          : `Client requesting replacement for ${exception.workerName}`,
        read: false,
        targetView: "agency",
        contextType: "exception",
        contextId: exceptionId,
        workerName: exception.workerName,
        site: exception.site,
      });
    }
    
    setLastSyncTime(new Date().toISOString());
  }, [exceptions, addNotification]);

  const value: SharedLedgerState = {
    notifications,
    addNotification,
    markNotificationRead,
    clearNotifications,
    workerActions,
    addWorkerAction,
    acknowledgeAction,
    workerStatuses,
    updateWorkerStatus,
    bookings,
    createBooking,
    updateBookingStatus,
    allocations,
    allocateWorker,
    exceptions,
    addException,
    updateExceptionStatus,
    respondToException,
    lastSyncTime,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};
