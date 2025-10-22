import { FacebookIcon } from "@/components/icons/Facebook";
import { InstagramIcon } from "@/components/icons/Instagram";
import { LinkedinIcon } from "@/components/icons/Linkedin";
import { URLS } from "@/lib/utils/constants";

export const Contacts = () => {
  return (
    <div className="flex-1 flex flex-col gap-12 lg:h-full lg:justify-end text-white lg:mt-18">
      <div className="flex flex-col lg:max-w-[320px]">
        <span className="font-bold">Visita nosotros</span>
        <span>
          Antonio Bellet 143, oficina 609, Providencia
          <br />
          Isidora Goyenechea 3000, piso 23, Las Condes
        </span>
      </div>

      <div className="flex flex-col">
        <span className="font-bold">Habla con nosotros</span>
        <span>
          Tel <a href="tel:+56223644258">2 23644258</a> -{" "}
          <a href="tel:+56986395780">9 86395780</a>
        </span>
        <a className="hover:text-accent transition-colors duration-300" href="mailto:contacto@rkabogados.cl">
          contacto@rkabogados.cl
        </a>
      </div>

      <div className="flex gap-3 items-center">
        <a
          href={URLS.instagram()}
          target="_blank"
          className="bg-white size-6 lg:size-8 rounded-full flex items-center justify-center"
        >
          <InstagramIcon className="size-4 lg:size-5 fill-[#252525]" />
        </a>
        <a href={URLS.facebook()} target="_blank">
          <FacebookIcon className="size-6 lg:size-8 fill-white" />
        </a>
        <a href={URLS.linkedin()} target="_blank">
          <LinkedinIcon className="size-6 lg:size-8 fill-white" />
        </a>
      </div>
    </div>
  );
};
