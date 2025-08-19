import { ContactForm } from "./_components/ContactForm/ContactForm";
import { Contacts } from "./_components/Contacts/Contacts";

export default function Contacto() {
  return (
    <div className="bg-[#252525] w-full px-6 lg:px-0 lg:h-[calc(100dvh-100px)]">
      <div className="lg:min-w-6xl lg:max-w-6xl lg:mx-auto h-full flex flex-col lg:flex-row gap-16 lg:gap-36 lg:justify-center lg:items-center py-20">
        <ContactForm />

        <Contacts />
      </div>
    </div>
  );
}
