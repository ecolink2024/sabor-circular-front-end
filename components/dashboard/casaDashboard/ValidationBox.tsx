import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";

export default function ValidationBox() {
  return (
    <Box
      as={Center}
      bg={"white"}
      w={"100%"}
      maxW={"390px"}
      h={"100%"}
      minH={"400px"}
      borderRadius="16px"
      borderTop="2px solid #518a3e"
      borderX="2px solid #518a3e"
      borderBottom="6px solid #518a3e"
      p={{ base: 6, lg: 10 }}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
    >
      <Text
        fontWeight={"extrabold"}
        fontSize={{ base: "18px", lg: "23px" }}
        textAlign={"center"}
        color={"#518a3e"}
      >
        ¡Muchas gracias por sumarte a la revolución de Sabor Circular!
      </Text>
      <Text
        fontWeight={"bold"}
        fontSize={{ base: "10px", lg: "13px" }}
        textAlign={"center"}
      >
        Estamos validando tu suscripción, te llegará un correo cuando se te
        habiliten los envases.
      </Text>
    </Box>
  );
}
