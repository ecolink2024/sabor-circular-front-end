"use client";
import { worksans } from "@/public/fonts/font";
import { Center, Heading, Stack } from "@chakra-ui/react";
import CardsWorks from "./cards-works/CardsWorks";
import { useEffect } from "react";

export default function HowItsWorks() {
  useEffect(() => {
    const section = sessionStorage.getItem("scrollToSection");
    if (section === "how-its-work") {
      document
        .getElementById("how-its-work")
        ?.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollToSection");
    }
  }, []);

  return (
    <Stack
      as={Center}
      w={"100%"}
      bg={"white"}
      py={"100px"}
      display={"flex"}
      direction={"column"}
      gap={6}
    >
      {/* Title Section */}
      <Heading
        color={"#344234"}
        position={"relative"}
        maxW={"700px"}
        fontWeight={900}
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        className={worksans.className}
        id="how-its-work"
        textAlign={"center"}
      >
        Cómo funciona
      </Heading>

      {/* Cards Sections */}
      <CardsWorks />
    </Stack>
  );
}
