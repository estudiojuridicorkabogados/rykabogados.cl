import { CompanyBenefits } from "./CompanyBenefits";
import { ServicesGrid } from "./ServicesGrid";

export const Services = () => {
  return (
    <section className="bg-gray-60 z-20 py-16 text-black lg:py-32">
      <div className="section-container flex flex-col gap-12">
        <ServicesGrid />

        <CompanyBenefits />
      </div>
    </section>
  );
};
