import { ContactForm } from "./_components/ContactForm/ContactForm";
import { Contacts } from "./_components/Contacts/Contacts";

export default function Contacto() {
  return (
    <>
      <div className="bg-[#252525] w-full px-6 lg:px-0 lg:min-h-[calc(100dvh-100px)] py-16 lg:py-24">
        <div className="lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl lg:mx-auto h-full flex flex-col lg:flex-row gap-16 lg:gap-36 lg:justify-center lg:items-start">
          <ContactForm />

          <Contacts />
        </div>
      </div>

      <style>
        {`     
          .grecaptcha-badge {
            visibility: visible;
            bottom: 90px !important;
            z-index: 40;
          }`
        }
      </style>
    </>
  );
}
