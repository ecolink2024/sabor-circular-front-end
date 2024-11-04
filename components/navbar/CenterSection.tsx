import { useAuth } from "@/providers/AuthProvider";
import { Box, Stack, Image, Link } from "@chakra-ui/react";

export default function CenterSection() {
  const { user } = useAuth();

  const hrefTapercito = user
    ? user.role === "casa"
      ? `/dashboard/casa/${user._id}`
      : `/dashboard/admin/${user._id}`
    : "login";

  return (
    <Stack position={"relative"} right={user ? "60px" : "0px"}>
      {/* Logo  */}
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
      <Stack direction="row" spacing={6} display={{ base: "none", lg: "flex" }}>
        <Link
          display={
            user?.role === "punto" ||
            user?.role === "gastronomico" ||
            user?.role === "admin"
              ? "none"
              : "block"
          }
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href={hrefTapercito}
        >
          Empeza a usar #Tapercito
        </Link>

        <Link
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href="/return-container"
        >
          Puntos de Recepción
        </Link>

        <Link
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href="#how-its-work"
        >
          Como funciona
        </Link>
        <Link
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
          href="/contact"
        >
          Quiero ser local adherido
        </Link>
      </Stack>
    </Stack>
  );
}
