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
    title: "Activá tu adhesión",
    icon: FaUserPlus,
    description:
      "Un único pago por 6 meses que te habilita dos envases retornables y descuentos exclusivos.",
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

export const faq = [
  {
    question: "¿Cómo me sumo a la comunidad?",
    answer:
      "Regístrate en nuestra web y realiza el pago de la adhesión por MercadoPago. ¡Listo! Ya puedes empezar a usar los envases.",
  },
  {
    question: "¿Qué incluye la adhesión?",
    answer:
      "Dos envases retornables y el sistema de sanitización para que siempre estén listos para usar.",
  },
  {
    question: "¿Cuánto dura la adhesión y cómo se renueva?",
    answer:
      "Dura 6 meses y no se renueva automáticamente. Te avisaremos cuando esté por vencer para que puedas renovarla.",
  },
  {
    question: "¿Cómo obtengo mi envase?",
    answer:
      "Luego de activar tu adhesión, se activan tus envases en el sistema. Los retiras con tu primer pedido en cualquier local adherido.",
  },
  {
    question: "¿Cómo pido en envases retornables?",
    answer:
      "Pide en los locales adheridos como siempre y avísales que quieres recibir tu comida en envases de Sabor Circular con tu código de usuario.",
  },
  {
    question: "¿Cómo devuelvo el envase?",
    answer:
      "Lleva el envase a la misma pizzería o a cualquier punto de retorno. Una vez devuelto, se te habilitará en el sistema para que lo uses otra vez.",
  },
  {
    question: "¿Es obligatorio devolver el envase?",
    answer:
      "Sí. Para seguir usando el servicio, es necesario que devuelvas el envase.",
  },
  {
    question: "¿Qué pasa cuando el envase llega al final de su vida útil?",
    answer:
      "Después de aproximadamente 150 usos, lo reciclamos para mantener el proceso verdaderamente circular.",
  },
  {
    question: "¿Los envases están limpios y seguros?",
    answer:
      "Sí. Pasan por un proceso de sanitización gastronómica en la asociación civil Las Omas, garantizando higiene y seguridad.",
  },
  {
    question: "¿Qué pasa si daño un envase?",
    answer:
      "Si el envase se daña y no puede reutilizarse, se te aplicará una multa.",
  },
  {
    question: "¿Qué pasa si no devuelvo el envase?",
    answer: "Se aplicará una penalización económica.",
  },
];
