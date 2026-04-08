import { CompanyBenefits } from "./CompanyBenefits";
import { ServicesGrid } from "./ServicesGrid";

export const Services = () => {
  return (
    <section className="text-black bg-gray-60 py-16 lg:py-32 z-20">
      <div className="section-container flex flex-col gap-12">
        <ServicesGrid />

        <CompanyBenefits />
      </div>
    </section>
  );
};
