import Slide from "@/components/agency-deck/Slide";
import SlideHeader from "@/components/agency-deck/SlideHeader";
import BulletList from "@/components/agency-deck/BulletList";

const items = [
  "Less admin on payroll verification and timesheet chasing.",
  "Invoice dispute resolution overhead eliminated.",
  "Verified invoices mean faster payment and a shorter DSO.",
  "Accurate payroll reduces attrition — lower recruitment and ramp costs.",
  "Verified performance data wins new clients — without a single extra pitch.",
];

const SavingsSlide = () => (
  <Slide>
    <div className="max-w-[780px] mx-auto w-full text-left">
      <SlideHeader
        eyebrow="THE BUSINESS CASE"
        heading={"We don't cost you money.\nWe save it."}
        subline="Every problem TEMPLEDGER solves has a saving attached to it."
      />
      <BulletList items={items} />
    </div>
  </Slide>
);

export default SavingsSlide;
