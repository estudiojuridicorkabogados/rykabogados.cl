export interface PressItem {
  id: string;
  publication: string;
  date: string;
  description: string;
  image: string;
  className: string;
}

const pressImages = {
  press01: "/images/noticias/andacosino.webp",
  press02: "/images/noticias/bbcl.webp",
  press03: "/images/noticias/meganoticia.webp",
};

export const PRESS_ITEMS: PressItem[] = [
  {
    id: "1",
    publication: "San Carlos Online",
    date: "Diciembre 15, 2021",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sapien amet vitae justo euismod. Arcu nullam turpis.",
    image: pressImages.press01,
    className: "top-0 lg:top-[120px] left-[5px] lg:left-[30px] rotate-[351deg]",
  },
  {
    id: "2",
    publication: "BBCL",
    date: "Diciembre 15, 2021",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sapien amet vitae justo euismod. Arcu nullam turpis.",
    image: pressImages.press02,
    className: "top-[100px] lg:top-[280px] left-[35px] lg:left-[105px] rotate-[15deg]",
  },
  {
    id: "3",
    publication: "BBCL",
    date: "Diciembre 15, 2021",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sapien amet vitae justo euismod. Arcu nullam turpis.",
    image: pressImages.press03,
    className: "lg:top-[190px] -right-[10px] lg:right-0 rotate-[25deg] lg:rotate-[335deg]",
  },
];
