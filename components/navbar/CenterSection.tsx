import {
  getUserType,
  redirectAttachedPremises,
  redirectHowItsWorks,
} from "@/lib/utils/utils";
import { useAuth } from "@/providers/AuthProvider";
import { Box, Stack, Image, Link as Text } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

export default function CenterSection() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, userRole } = useAuth();

  const role = getUserType(userRole);

  const hrefTapercito =
    user && role === "casa"
      ? `/dashboard/casa/${user._id}`
      : "/activate-subscription";

  return (
    <Stack display={"flex"} align={"center"} flex={3} position={"relative"}>
      {/* Logo */}
      <Box
        w={"100%"}
        h={"100%"}
        maxW={"140px"}
        maxH={"40px"}
        display={{ base: "block", lg: "none" }}
        onClick={() => router.push("/")}
      >
        <Image
          display={{ base: "block", lg: "none" }}
          src="/svg/logo-sabor-circular-nav.svg"
          alt="logo-sabor-circular"
        />
      </Box>

      {/* Menu Links en desktop */}
      <Stack
        direction="row"
        spacing={6}
        display={{ base: "none", lg: "flex" }}
        position={"relative"}
      >
        {/* Quiero sumarme */}
        <Text
          display={
            role === "punto" ||
            role === "gastronomico" ||
            role === "admin" ||
            role === "hibrido"
              ? "none"
              : "block"
          }
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          cursor={"pointer"}
          _hover={{ color: "#383838", textDecoration: "none" }}
          onClick={() => router.push(hrefTapercito)}
        >
          ¡Quiero sumarme!
        </Text>
        {/* Puntos de Retorno  */}
        <Text
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          cursor={"pointer"}
          onClick={() => router.push("/return-container")}
        >
          Puntos de retorno
        </Text>
        {/* Quiero Sumarme */}
        <Text
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          onClick={() => redirectHowItsWorks(pathname, router)}
          cursor="pointer"
        >
          ¿Cómo funciona?
        </Text>

        {/* Locales Adheridos */}
        <Text
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          cursor={"pointer"}
          _hover={{ color: "#383838", textDecoration: "none" }}
          onClick={() => redirectAttachedPremises(pathname, router)}
        >
          Locales adheridos
        </Text>

        {/* Quiero Ser Local Adherido */}
        <Text
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          cursor={"pointer"}
          onClick={() => router.push("/contact")}
        >
          Quiero ser local Adherido
        </Text>
      </Stack>
    </Stack>
  );
}
