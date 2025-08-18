import Link from "next/link";

import { FacebookIcon } from "@/components/icons/Facebook";
import { LinkedinIcon } from "@/components/icons/Linkedin";
import { URLS } from "@/utils/constants";

import { ContactForm } from "./_components/ContactForm/ContactForm";

export default function Contacto() {
  return (
    <div className="bg-[#252525] w-full h-[calc(100dvh-100px)]">
      <div className="min-w-6xl max-w-6xl mx-auto h-full flex gap-36 justify-center items-center lg:py-20">
        <div className="flex-1 flex flex-col justify-end h-full">
          <ContactForm />
        </div>

        <div className="flex-1 flex flex-col gap-12 h-full justify-end">
          <div className="flex flex-col max-w-[320px]">
            <span className="font-bold">Visita nosotros</span>
            <span>
              Isidora Goyenechea 3000, piso 23, <br /> Las Condes, Santiago
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Habla con nosotros</span>
            <span>Tel 2 23644258</span>
            <Link
              href="mailto:estudio.juridico@ryoasociados.cl"
              target="_blank"
            >
              estudio.juridico@ryoasociados.cl
            </Link>
          </div>

          <div className="flex gap-2 items-center">
            <Link href={URLS.instagram()} target="_blank">
              <FacebookIcon width={30} height={30} />
            </Link>
            <Link href={URLS.linkedin()} target="_blank">
              <LinkedinIcon width={30} height={30} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
