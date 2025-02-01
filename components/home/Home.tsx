import React from "react";
import TitleAndDescription from "./title-description/TitleAndDescription";
import { VStack } from "@chakra-ui/react";
import HowItsWorks from "./how-its-works/HowItsWorks";
import AttachedPremises from "./attached-premises/AttachedPremises";
import Contact from "./contact/Contact";
import Accompany from "./accompany/Accompany";
import Footer from "./footer/Footer";
import WidgetWsp from "./whatsapp/WidgetWsp";

export default function Home() {
  return (
    <VStack gap={0} position={"relative"} top={"10px"} h={"100%"}>
      {/* Title, Description and Image  */}
      <TitleAndDescription />

      {/* How its Works Cards  */}
      <HowItsWorks />

      {/* Attached Premises Carrousel */}
      <AttachedPremises />

      {/* Redeirect Contact Form */}
      <Contact />

      {/* Accompany Premises Carrousel */}
      <Accompany />

      {/* Footer  */}
      <Footer />

      {/* Widget Wsp */}
      <WidgetWsp display />
    </VStack>
  );
}
