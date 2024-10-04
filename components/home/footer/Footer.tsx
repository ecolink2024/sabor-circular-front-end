"use client";
import { Flex, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <Stack
      w={{ base: "100%", lg: "95%" }}
      pt={"200px"}
      pb={"100px"}
      bg={"#344234"}
      px={10}
    >
      <Flex gap={16} direction={{ base: "column", lg: "row" }}>
        <Flex
          gap={10}
          align={"flex-start"}
          direction={{ base: "row", lg: "column" }}
        >
          <Text fontSize={"2xl"} fontWeight={900} color={"white"}>
            SABOR CIRCULAR
          </Text>
          <HStack gap={4}>
            <Icon as={RiInstagramFill} fontSize={50} color="white" />
            <Icon as={IoLogoWhatsapp} fontSize={50} color="white" />
          </HStack>
        </Flex>
        <VStack
          color={"white"}
          align={"flex-start"}
          fontSize={"20px"}
          mt={{ base: "30px", lg: "70px" }}
        >
          <Text>Suscribite y empezá a usar #Tapercito</Text>
          <Text>Puntos de Recepción</Text>
          <Text>Quiero ser local adherido</Text>
          <Text>Como funciona?</Text>
        </VStack>
      </Flex>
    </Stack>
  );
}
