import { Box, Center, Text, keyframes } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import React from "react";

// Animación de pulso suave
const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

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
      shadow={"md"}
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
        color={"gray.600"}
      >
        Estamos validando tu suscripción. Recibirás un correo cuando se te
        habiliten los envases.
      </Text>
      <Center
        as={FiMail}
        size="56px"
        color="#518a3e"
        animation={`${pulse} 1.5s infinite`}
      />
    </Box>
  );
}
