import { worksans } from "@/public/fonts/font";
import { Box, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";
import CardsWorks from "./cards-works/CardsWorks";

export default function HowItsWorks() {
  return (
    <Stack
      w={{ base: "100%", lg: "95%" }}
      mt={{ base: "200px", lg: "300px" }}
      borderTopRadius={"40px"}
      bg={"white"}
      position={"relative"}
      display={"flex"}
      align={"center"}
      pt={{ base: "250px", lg: "300px" }}
    >
      {/* Landing Page Image */}
      <Box
        w={"100%"}
        position={"absolute"}
        top={{ base: "-200px", lg: "-300px" }}
        left={"50%"}
        transform={"translateX(-50%)"}
        zIndex={1}
        maxW={{ base: "400px", lg: "600px" }}
      >
        <Image
          src={"/img/landing-page-image.png"}
          width={600}
          height={600}
          alt="landing-page-image"
          priority
        />
      </Box>
      {/* Title Section */}
      <Heading
        color={"#344234"}
        position={"relative"}
        fontWeight={900}
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        className={worksans.className}
      >
        ¿Cómo funciona?
      </Heading>

      {/* Cards Sections */}
      <CardsWorks />
    </Stack>
  );
}
