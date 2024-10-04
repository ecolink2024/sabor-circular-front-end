"use client";

import { useBreakpointValue } from "@chakra-ui/react";
import DesktopCards from "./DesktopCards";
import MobileCards from "./MobileCards";

export default function CardsWorks() {
  // Usamos un valor booleano para determinar si estamos en un tamaño de desktop
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return <>{isDesktop ? <DesktopCards /> : <MobileCards />}</>;
}
