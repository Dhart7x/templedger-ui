import Slide from "@/components/agency-deck/Slide";
import SlideHeader from "@/components/agency-deck/SlideHeader";
import BulletList from "@/components/agency-deck/BulletList";

const items = [
  "Verified performance data — your competitive weapon.",
  "Payroll accuracy by default — disputes disappear.",
  "Verified invoices paid faster — DSO improves.",
  "Smart scheduling eliminates manual re-booking.",
  "Compliance managed centrally — no more document chasing.",
  "Less coordinator overhead per client account.",
  "High performers visible — temp to perm conversions increase.",
];

const BenefitsSlide = () => (
  <Slide>
    <div className="max-w-[780px] mx-auto w-full text-left">
      <SlideHeader
        eyebrow="YOUR BENEFITS"
        heading={"Built for both sides.\nFinally."}
        subline="Every feature that helps the labor user generates a direct benefit for you."
      />
      <BulletList items={items} />
    </div>
  </Slide>
);

export default BenefitsSlide;
