"use client";

import { worksans } from "@/public/fonts/font";
import { Button, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export default function Contact() {
  return (
    <Stack
      w={"100%"}
      bg={"#344234"}
      display={"flex"}
      direction={"column"}
      justify={"center"}
      py={"100px"}
      align={"center"}
    >
      {/* Button Contact  */}
      <VStack w={"70%"} h={"100%"} bg={"#344234"} gap={20}>
        <Image src="/img/fondo-contact.png" w={"120px"} h={"auto"} />
        <VStack gap={3}>
          <Text fontWeight={600} color={"#ea9b42"} textTransform="uppercase">
            Contactanos
          </Text>
          <Heading
            color={"white"}
            position={"relative"}
            maxW={"900px"}
            fontWeight={900}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            className={worksans.className}
            id="how-its-work"
            textAlign={"center"}
          >
            ¿Te gustaría adherir tu local a la red de Sabor Circular?
          </Heading>
        </VStack>
        <Link passHref href={"/contact"}>
          <Button
            bg={"#ea9b42"}
            _hover={{ bg: "#EEBE88" }}
            color={"white"}
            fontWeight={500}
            borderRadius="15px"
            leftIcon={<GoArrowUpRight />}
            size={"lg"}
          >
            Dejanos tus datos
          </Button>
        </Link>
      </VStack>
    </Stack>
  );
}
