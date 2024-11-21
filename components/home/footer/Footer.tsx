"use client";
import { useAuth } from "@/providers/AuthProvider";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
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
      w={"100%"}
      display={"flex"}
      direction={"column"}
      position={"relative"}
      bg={"white"}
      gap={{ base: 1, lg: 16 }}
    >
      {/* Divider  */}
      <Stack w={"100%"} h={"100px"} bg={"white"}>
        <Box h={"70%"} borderBottomRadius={"50px"} bg={"#344234"} />
      </Stack>

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={6}
        align={{ base: "center", lg: "flex-start" }}
      >
        <Flex
          gap={3}
          direction={{ base: "row", lg: "column" }}
          px={{ base: 6, lg: 10 }}
        >
          <Link href="/">
            <Image
              src={"/svg/logo-sabor-circular-register.svg"}
              alt="logo"
              width={"200px"}
              height={"auto"}
            />
          </Link>
          <HStack gap={4} position={"relative"} top={"5px"}>
            <Link href="https://www.instagram.com/saborcircular" isExternal>
              <Icon as={RiInstagramFill} fontSize={30} color="#344234" />
            </Link>
            <Link href="https://wa.me/" isExternal display={"none"}>
              <Icon as={IoLogoWhatsapp} fontSize={30} color="#344234" />
            </Link>
          </HStack>
        </Flex>

        <VStack
          color={"#344234"}
          align={{ base: "center", lg: "flex-start" }}
          fontSize={"17px"}
          spacing={2}
          mt={{ base: "10px", lg: "20px" }}
          px={{ base: 6, lg: 10 }}
          gap={6}
        >
          <Link
            href={hrefTapercito}
            display={
              user?.role === "punto" ||
              user?.role === "gastronomico" ||
              user?.role === "admin"
                ? "none"
                : user?.role === "casa"
                ? user?.code === undefined ||
                  user?.code === null ||
                  user?.code === ""
                  ? "block"
                  : "none"
                : "flex"
            }
          >
            -¡Quiero sumarme!
          </Link>
          <Link href="/return-container">-Puntos de Recepción</Link>
          <Link href="#how-its-work">-Como funciona?</Link>
          <Link href="/contact">-Quiero ser local adherido</Link>
        </VStack>
      </Flex>

      <Center py={6} flexDirection={"column"} px={10}>
        <Image
          src="/img/line-sabor-circular.png"
          w={"350px"}
          alt="line-sabor-circular"
        />
        <Text fontSize="sm" textAlign={"center"}>
          © {new Date().getFullYear()} SaborCircular. Todos los derechos
          reservados.
        </Text>
      </Center>
    </Stack>
  );
}
