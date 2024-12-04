import { infiniteSlider } from "../types/types";
import { FaRecycle, FaShop, FaUserPlus } from "react-icons/fa6";

export const cardsWorks = [
  {
    id: "1",
    title: "Regístrate en la Plataforma",
    icon: FaUserPlus,
    description: "Creá tu usuario y sumate a la comunidad de Sabor Circular",
    button: "¡Quiero sumarme!",
  },
  {
    id: "2",
    title: "Activá tu suscripción",
    icon: FaUserPlus,
    description:
      " Un único pago ($9400) que te habilita un envase retornable y descuentos exclusivos",
    button: "¡Quiero sumarme!",
  },
  {
    id: "3",
    title: "Hacé tu pedido en Locales Adheridos",
    icon: FaShop,
    description:
      "Encargá con tu código único de usuario y recibí el pedido en un envase retornable",
    button: "Ver Locales adheridos",
  },
  {
    id: "4",
    title: "Devolvé el envase y repetí",
    icon: FaRecycle,
    description:
      "Acercá el envase a un Punto de Retorno para su sanitización y reintroducción al circuito. ¡Repetí!",
    button: "Ver Puntos",
  },
];

export const attachedPremises: infiniteSlider[] = [
  {
    svg: "/img/risata-logo.png",
    tooltip: "logo 219",
    link: "https://www.instagram.com/pizzarisata/?hl=es",
  },
  {
    svg: "/img/leopoldo-logo.png",
    tooltip: "logo 220",
    link: undefined,
  },
  {
    svg: "/img/risata-logo.png",
    tooltip: "logo 286",
    link: "https://www.instagram.com/pizzarisata/?hl=es",
  },
  {
    svg: "/img/leopoldo-logo.png",
    tooltip: "logo 297",
    link: undefined,
  },
  {
    svg: "/img/risata-logo.png",
    tooltip: "logo 311",
    link: "https://www.instagram.com/pizzarisata/?hl=es",
  },
  {
    svg: "/img/leopoldo-logo.png",
    tooltip: "logo 317",
    link: undefined,
  },
];

export const accompany: infiniteSlider[] = [
  {
    svg: "/img/ecolink-logo.png",
    tooltip: "logo 1",
    link: "",
  },
  {
    svg: "/img/las-omas-logo.png",
    tooltip: "logo 2",
    link: "",
  },
  {
    svg: "/img/bp-icon.png",
    tooltip: "logo 3",
    link: "",
  },
  {
    svg: "/img/bloomberg-logo.png",
    tooltip: "logo 4",
    link: "",
  },
  {
    svg: "/img/corlab-logo.png",
    tooltip: "logo 5",
    link: "",
  },
  {
    svg: "/img/secre-logo.png",
    tooltip: "logo 6",
    link: "",
  },
  {
    svg: "/img/secre-ambiente-logo.png",
    tooltip: "logo 7",
    link: "",
  },
  {
    svg: "/img/muni-logo.png",
    tooltip: "logo 8",
    link: "",
  },
  {
    svg: "/svg/symbio-net-logo.svg",
    tooltip: "logo 9",
    link: "",
  },
];
