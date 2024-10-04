import React from "react";
import TitleAndDescription from "./title-description/TitleAndDescription";
import HowItsWorks from "./how-its-works/HowItsWorks";
import { VStack } from "@chakra-ui/react";
import AttachedPremises from "./attached-premises/AttachedPremises";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";

export default function Home() {
  return (
    <VStack gap={0}>
      <TitleAndDescription />
      <HowItsWorks />
      <AttachedPremises />
      <Contact />
      <Footer />
    </VStack>
  );
}
