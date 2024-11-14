import { Box, Center, Text } from "@chakra-ui/react";
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
      bg="linear-gradient(90deg, rgb(250, 250, 243) 0%, rgba(250, 250, 243, 0) 100%)"
      borderRadius={"20px"}
      border={"1.5px solid"}
      borderColor={"gray.100"}
      p={10}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
    >
      <Text
        fontWeight={"extrabold"}
        fontSize={"23px"}
        textAlign={"center"}
        color={"#518a3e"}
      >
        Suscribite por $15000
      </Text>
      <Text fontWeight={"bold"} fontSize={"13px"} textAlign={"center"}>
        Se te habilitarán 2 (dos) envases reutilizables para usar cuando desees
      </Text>
      <CompraPackButton refetch={refetch} />
    </Box>
  );
}
