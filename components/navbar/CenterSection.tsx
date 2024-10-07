import { Box, Link, Stack, Image } from "@chakra-ui/react";

export default function CenterSection() {
  return (
    <Stack>
      {/* Logo  */}
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

      {/* Menu Links en desktop */}
      <Stack direction="row" spacing={6} display={{ base: "none", lg: "flex" }}>
        <Link
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
        >
          Empeza a usar #Tapercito
        </Link>
        <Link
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
        >
          Puntos de Recepción
        </Link>
        <Link
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
        >
          Como funciona
        </Link>
        <Link
          fontSize="sm"
          color="#757575"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#383838", textDecoration: "none" }}
        >
          Quiero ser local adherido
        </Link>
      </Stack>
    </Stack>
  );
}
