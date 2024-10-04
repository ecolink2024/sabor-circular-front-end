import { Link, Stack, Text } from "@chakra-ui/react";

export default function CenterSection() {
  return (
    <Stack>
      {/* Logo  */}
      <Text
        fontSize="xl"
        fontWeight={900}
        color={"#344234"}
        display={{ base: "flex", lg: "none" }}
        textAlign={"center"}
        position={"relative"}
        left={4}
      >
        SABOR CIRCULAR
      </Text>

      {/* Menu Links en desktop */}
      <Stack direction="row" spacing={6} display={{ base: "none", lg: "flex" }}>
        <Link
          fontSize="sm"
          color="white"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#ea9b42", textDecoration: "none" }}
        >
          Ordena tu comida
        </Link>
        <Link
          fontSize="sm"
          color="white"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#ea9b42", textDecoration: "none" }}
        >
          Retorna tu envase
        </Link>
        <Link
          fontSize="sm"
          color="white"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#ea9b42", textDecoration: "none" }}
        >
          Como funciona
        </Link>
        <Link
          fontSize="sm"
          color="white"
          textDecoration="none"
          fontWeight={500}
          _hover={{ color: "#ea9b42", textDecoration: "none" }}
        >
          Quiero ser local adherido
        </Link>
      </Stack>
    </Stack>
  );
}
