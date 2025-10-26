import { FacebookIcon } from "@/components/icons/Facebook";
import { InstagramIcon } from "@/components/icons/Instagram";
import { LinkedinIcon } from "@/components/icons/Linkedin";
import { URLS } from "@/lib/utils/constants";

export const Contacts = () => {
  return (
    <div className="flex-1 flex flex-col gap-12 lg:h-full lg:justify-end text-white lg:mt-18">
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
      </div>

      <div className="flex gap-3 items-center">
        <a
          href={URLS.instagram()}
          target="_blank"
          className="bg-white size-6 lg:size-8 rounded-full flex items-center justify-center"
          rel="noreferrer"
        >
          <InstagramIcon className="size-4 lg:size-5 fill-[#252525]" />
        </a>
        <a href={URLS.facebook()} target="_blank" rel="noreferrer">
          <FacebookIcon className="size-6 lg:size-8 fill-white" />
        </a>
        <a href={URLS.linkedin()} target="_blank" rel="noreferrer">
          <LinkedinIcon className="size-6 lg:size-8 fill-white" />
        </a>
      </div>

      <div className="flex flex-col lg:max-w-[320px]">
        <span className="font-bold">Visítanos</span>
        <span>Antonio Bellet 143, oficina 609, Providencia</span>
        <div className="mt-4">
          <div className="w-full h-80 rounded-lg overflow-hidden ring-1 ring-white/10">
            <iframe
              title="Mapa de R&K Abogados"
              src="https://www.google.com/maps?q=Antonio%20Bellet%20143%2C%20Providencia%2C%20Chile&hl=es&z=16&output=embed"
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
