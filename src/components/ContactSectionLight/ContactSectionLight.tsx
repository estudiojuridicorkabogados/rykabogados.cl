import { ContactButton } from "./ContactButton";

// py-16

export const ContactSectionLight = () => {
  return (
    <section className="relative py-32 flex items-center justify-center bg-[#F7F6F6]">
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="w-full lg:w-1/2 flex">
          <h3 className="text-3xl lg:text-5xl text-black">
            Agenda una llamada de evaluación gratis
          </h3>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4 text-black">
          <span className="uppercase text-sm font-bold tracking-[2px]">
            Tienes Preguntas?
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold">Contáctanos</h2>

          <p className="mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            vitae a delectus voluptatem sapiente, dolore quo quidem deleniti
            fugiat, ipsam aliquid
          </p>

          <ContactButton />
        </div>
      </div>
    </section>
  );
};
