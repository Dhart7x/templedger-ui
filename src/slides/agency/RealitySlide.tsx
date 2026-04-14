import Slide from "@/components/agency-deck/Slide";
import SlideHeader from "@/components/agency-deck/SlideHeader";
import BulletList from "@/components/agency-deck/BulletList";

const items = [
  "You find out about problems after the client does.",
  "Shift managers and HR give you conflicting instructions.",
  "No real-time view of what's happening on site.",
  "Timesheet chasing eats coordinator time every week.",
  "Payroll queries surface days after the shift.",
  "You're reactive by default — the system forces it.",
  "High performance goes unrecognized and unrewarded.",
];

const RealitySlide = () => (
  <Slide>
    <div className="max-w-[780px] mx-auto w-full text-left">
      <SlideHeader
        eyebrow="THE REALITY"
        heading={"You're always the last to know.\nFirst to get blamed."}
        subline={"The operational chaos agencies live in daily — and why it doesn't have to be this way."}
      />
      <BulletList items={items} />
    </div>
  </Slide>
);

export default RealitySlide;
