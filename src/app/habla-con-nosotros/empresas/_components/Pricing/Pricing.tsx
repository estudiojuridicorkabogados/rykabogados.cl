import { PricingBenefits } from "./PricingBenefits";
import { PricingTable } from "./PricingTable";

export const Pricing = () => {
  return (
    <section id="prices" className="bg-[#FFF3E1] py-16 lg:py-32 text-black">
      <div className="section-container flex flex-col gap-12 lg:gap-16">
        <PricingTable />

        <PricingBenefits />
      </div>
    </section>
  );
};
