import {
  getUserType,
  redirectAttachedPremises,
  redirectHowItsWorks,
} from "@/lib/utils/utils";
import { useAuth } from "@/providers/AuthProvider";
import { Box, Stack, Image, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function CenterSection() {
  const { user, userRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const role = getUserType(userRole);

  const hrefTapercito = user
    ? role === "casa"
      ? `/dashboard/casa/${user._id}`
      : `/dashboard/admin/${user._id}`
    : "/login";

  return (
    <Stack display={"flex"} align={"center"} flex={3} position={"relative"}>
      {/* Logo */}
      <Link href={"/"}>
        <Box
          w={"100%"}
          h={"100%"}
          maxW={"140px"}
          maxH={"40px"}
          display={{ base: "block", lg: "none" }}
        >
          <Image
            src="/svg/logo-sabor-circular-nav.svg"
            alt="logo-sabor-circular"
          />
        </Box>
      </Link>

      {/* Menu Links en desktop */}
      <Stack
        direction="row"
        spacing={6}
        display={{ base: "none", lg: "flex" }}
        position={"relative"}
        bottom={1}
      >
        <ChakraLink
          display={
            role === "punto" ||
            role === "gastronomico" ||
            role === "admin" ||
            role === "hibrido"
              ? "none"
              : role === "casa"
              ? user?.code === undefined ||
                user?.code === null ||
                user?.code === ""
                ? "block"
                : "none"
              : "block"
          }
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href={hrefTapercito}
        >
          ¡Quiero sumarme!
        </ChakraLink>

        <ChakraLink
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href="/return-container"
        >
          Puntos de retorno
        </ChakraLink>

        <ChakraLink
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
        </ChakraLink>

        <ChakraLink
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          onClick={() => redirectAttachedPremises(pathname, router)}
        >
          Locales adheridos
        </ChakraLink>

        <ChakraLink
          fontSize="13px"
          textAlign={"center"}
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href="/contact"
        >
          Quiero ser local Adherido
        </ChakraLink>
      </Stack>
    </Stack>
  );
}
