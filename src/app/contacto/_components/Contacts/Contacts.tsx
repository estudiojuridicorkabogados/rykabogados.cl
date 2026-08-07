import { FacebookIcon } from "@/components/icons/Facebook";
import { InstagramIcon } from "@/components/icons/Instagram";
import { LinkedinIcon } from "@/components/icons/Linkedin";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { ADDRESS, URLS } from "@/lib/utils/constants";

export const Contacts = () => {
  return (
    <div className="flex flex-1 flex-col gap-12 text-white lg:mt-18 lg:h-full lg:justify-end">
      <div className="flex flex-col">
        <span className="font-bold">Hablemos</span>
        <span>
          Tel <a href="tel:+56223644258">+56 2 2364 4258</a> -{" "}
          <a href="tel:+56986395780">+56 9 8639 5780</a>
        </span>
        <a
          className="hover:text-accent transition-colors duration-300"
          href="mailto:contacto@rkabogados.cl"
        >
          contacto@rkabogados.cl
        </a>

        <WhatsappLink className="mt-4 w-full" />
      </div>

      <div className="flex items-center gap-3">
        <a
          href={URLS.instagram()}
          target="_blank"
          className="flex size-6 items-center justify-center rounded-full bg-white lg:size-8"
          rel="noreferrer"
        >
          <InstagramIcon className="size-4 fill-[#252525] lg:size-5" />
        </a>
        <a href={URLS.facebook()} target="_blank" rel="noreferrer">
          <FacebookIcon className="size-6 fill-white lg:size-8" />
        </a>
        <a href={URLS.linkedin()} target="_blank" rel="noreferrer">
          <LinkedinIcon className="size-6 fill-white lg:size-8" />
        </a>
      </div>

      <div className="flex flex-col lg:max-w-[320px]">
        <span className="font-bold">Visítanos</span>
        <span>{ADDRESS}</span>
        <div className="mt-4">
          <div className="h-80 w-full overflow-hidden rounded-lg ring-1 ring-white/10">
            <iframe
              title="Mapa de R&K Abogados"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12869.047217216124!2d-70.616248092201!3d-33.42410825489978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf2e7e389f73%3A0xf1054aa24a0ccefb!2sPadre%20Mariano%2082%2C%20oficina%20704%2C%207500026%20Providencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1sen!2sus!4v1763499315761!5m2!1sen!2sus"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
