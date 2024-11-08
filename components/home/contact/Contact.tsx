"use client";
import { worksans } from "@/public/fonts/font";
import { Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { GoArrowUpRight } from "react-icons/go";
import Accompany from "../accompany/Accompany";
import Link from "next/link";

export default function Contact() {
  return (
    <Stack
      w={{ base: "100%", lg: "95%" }}
      bg={"white"}
      display={"flex"}
      direction={"column"}
    >
      {/* Button Contact  */}
      <VStack
        w={"100%"}
        h={"100%"}
        mt={"100px"}
        bg={"#344234"}
        borderTopRadius={"40px"}
        pt={{ base: "100px", lg: "150px" }}
        gap={{ base: "150px", lg: "300px" }}
      >
        <VStack gap={10} px={10}>
          <Heading
            color={"white"}
            position={"relative"}
            fontWeight={900}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            className={worksans.className}
          >
            Contáctanos
          </Heading>
          <Text color={"white"} textAlign={"center"}>
            ¿Te gustaría adherir tu local a la red de Sabor Circular?
          </Text>
          <Link passHref href={"/contact"}>
            <Button
              bg={"#ea9b42"}
              color={"white"}
              fontWeight={600}
              borderRadius="10px"
              leftIcon={<GoArrowUpRight />}
              size={"lg"}
            >
              Dejanos tus datos
            </Button>
          </Link>
        </VStack>
        {/* Section Accompany */}
        <Accompany />
      </VStack>
    </Stack>
  );
}
