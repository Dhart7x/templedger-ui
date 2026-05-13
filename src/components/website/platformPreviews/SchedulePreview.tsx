import { ViewSchedule } from "@/components/presentation/demo/views/ClientSchedule";

const SchedulePreview = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Schedule</h1>
        <p className="text-xs text-muted-foreground">Week view — coverage by shift and day</p>
      </div>
      <ViewSchedule />
    </div>
  );
};

export default SchedulePreview;
