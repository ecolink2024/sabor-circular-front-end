import { useAuth } from "@/providers/AuthProvider";
import { Box, Stack, Image, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function CenterSection() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const hrefTapercito = user
    ? user.role === "casa"
      ? `/dashboard/casa/${user._id}`
      : `/dashboard/admin/${user._id}`
    : "/login";

  const redirectHowItsWorks = () => {
    if (pathname === "/") {
      document
        .getElementById("how-its-work")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollToSection", "how-its-work");
      router.push("/");
    }
  };

  return (
    <Stack display={"flex"} align={"center"} flex={2} position={"relative"}>
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
            user?.role === "punto" ||
            user?.role === "gastronomico" ||
            user?.role === "admin"
              ? "none"
              : "block"
          }
          fontSize="13px"
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href={hrefTapercito}
        >
          Empeza a usar #Tapercito
        </ChakraLink>

        <ChakraLink
          fontSize="13px"
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href="/return-container"
        >
          Puntos de Recepción
        </ChakraLink>

        <ChakraLink
          fontSize="13px"
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          onClick={redirectHowItsWorks}
          cursor="pointer"
        >
          Cómo funciona
        </ChakraLink>

        <ChakraLink
          fontSize="13px"
          color="#171E30"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href="/contact"
        >
          Quiero ser local adherido
        </ChakraLink>
      </Stack>
    </Stack>
  );
}
