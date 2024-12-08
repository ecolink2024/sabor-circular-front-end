import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CompraPackButton from "./CompraPackButton";

export default function DefaultBox({
  refetch,
}: {
  refetch: () => Promise<void>;
}) {
  return (
    <Box
      as={Center}
      w={"100%"}
      maxW={"390px"}
      h={"100%"}
      minH={"400px"}
      bg="white"
      shadow={"md"}
      borderRadius={"20px"}
      border={"1.5px solid"}
      borderColor={"gray.100"}
      p={10}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
    >
      <VStack>
        <Text
          fontWeight={"extrabold"}
          textAlign={"center"}
          color={"#518a3e"}
          fontSize={"23px"}
          display="inline"
        >
          Suscribite por{" "}
          <Text
            textDecoration="line-through"
            fontSize={"23px"}
            display="inline"
          >
            $23.500
          </Text>
        </Text>

        <Text
          fontSize={"40px"}
          display="inline"
          color={"#518a3e"}
          fontWeight={"extrabold"}
        >
          $9400
        </Text>
      </VStack>

      <Text fontWeight={"bold"} fontSize={"13px"} textAlign={"center"}>
        Un único pago que te habilita un (1) envase retornable para que uses
        ilimitadamente hasta febrero de 2025
      </Text>
      <CompraPackButton refetch={refetch} />
    </Box>
  );
}
