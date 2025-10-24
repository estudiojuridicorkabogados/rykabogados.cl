import { StaticImageData } from "next/image";

import artimatebImage from "../../../../../public/images/clients/artimatemb.png";
import cemImage from "../../../../../public/images/clients/ceim.png";
import certigasImage from "../../../../../public/images/clients/certigas.png";
import comfrutImage from "../../../../../public/images/clients/comfrut.png";
import criteriaImage from "../../../../../public/images/clients/criteria.png";
import dukoImage from "../../../../../public/images/clients/duko.png";
import hol3Image from "../../../../../public/images/clients/hole.png";
import incosekImage from "../../../../../public/images/clients/incosek.png";
import latImage from "../../../../../public/images/clients/lat.png";
import pelomingegneriaImage from "../../../../../public/images/clients/pelomingenieria.png";
import subusImage from "../../../../../public/images/clients/subus.png";

// @TODO MISSING
// import capitalvivoImage from "../../../../../public/images/clients/capitalvivo.webp";
// import multitierraImage from "../../../../../public/images/clients/multitierra.webp";
// import mueblistaImage from "../../../../../public/images/clients/mueblista.webp";

export interface LogoItem {
  src: StaticImageData;
  alt: string;
}

export const LOGOS: LogoItem[] = [
  { src: cemImage, alt: "Cliente CEM" },
  { src: criteriaImage, alt: "Cliente Criteria" },
  { src: incosekImage, alt: "Cliente Incosek" },
  // { src: multitierraImage, alt: "Cliente Multitierra" },
  { src: subusImage, alt: "Cliente Subus" },
  { src: comfrutImage, alt: "Cliente Comfrut" },
  { src: pelomingegneriaImage, alt: "Cliente Pelo Mingenería" },
  { src: certigasImage, alt: "Cliente Certigas" },
  { src: dukoImage, alt: "Cliente Duko" },
  { src: latImage, alt: "Cliente LAT" },
  // { src: capitalvivoImage, alt: "Cliente Capital Vivo" },
  { src: artimatebImage, alt: "Cliente Artimateb" },
  // { src: mueblistaImage, alt: "Cliente Mueblista" },
  { src: hol3Image, alt: "Cliente Hol3" },
];
