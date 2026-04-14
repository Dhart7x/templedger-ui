import Slide from "@/components/agency-deck/Slide";
import SlideHeader from "@/components/agency-deck/SlideHeader";
import BulletList from "@/components/agency-deck/BulletList";

const items = [
  "Payroll disputes cost time you don't bill for.",
  "Invoice reconciliation is overhead with no return.",
  "Accurate payroll reduces attrition — inaccurate payroll drives it.",
  "Slow approvals delay invoicing and extend your DSO.",
  "Coordinator time is wasted chasing what a system should automate.",
  "Without verified data, your performance case is your word against theirs.",
];

const CostSlide = () => (
  <Slide>
    <div className="max-w-[780px] mx-auto w-full text-left">
      <SlideHeader
        eyebrow="THE COST"
        heading={"The cost of operating\nin the dark."}
        subline={"Every inefficiency has a price. Here is what the current model costs your business every week."}
      />
      <BulletList items={items} />
    </div>
  </Slide>
);

export default CostSlide;
