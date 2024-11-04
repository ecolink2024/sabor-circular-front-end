"use client";
import { useAuth } from "@/providers/AuthProvider";
import { Flex, HStack, Icon, Stack, Link, VStack } from "@chakra-ui/react";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  const { user } = useAuth();

  const hrefTapercito = user
    ? user.role === "casa"
      ? `/dashboard/casa/${user._id}`
      : `/dashboard/admin/${user._id}`
    : "login";

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
          <Link fontSize={"2xl"} fontWeight={900} color={"white"} href="/">
            SABOR CIRCULAR
          </Link>
          <HStack gap={4}>
            <Link href="https://instagram.com" isExternal>
              <Icon as={RiInstagramFill} fontSize={50} color="white" />
            </Link>
            <Link href="https://wa.me/" isExternal>
              <Icon as={IoLogoWhatsapp} fontSize={50} color="white" />
            </Link>
          </HStack>
        </Flex>
        <VStack
          color={"white"}
          align={"flex-start"}
          fontSize={"20px"}
          mt={{ base: "30px", lg: "70px" }}
          spacing={2}
        >
          <Link
            href={hrefTapercito}
            display={
              user?.role === "punto" || user?.role === "gastronomico"
                ? "none"
                : "block"
            }
          >
            Empezá a usar #Tapercito
          </Link>
          <Link href="/return-container">Puntos de Recepción</Link>
          <Link href="#how-its-work">Como funciona?</Link>
          <Link
            display={
              user?.role === "casa" ||
              user?.role === "punto" ||
              user?.role === "gastronomico"
                ? "none"
                : "block"
            }
            href="/contact"
          >
            Quiero ser local adherido
          </Link>
        </VStack>
      </Flex>
    </Stack>
  );
}
