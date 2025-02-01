import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";

export default function Failure({ countdown }: { countdown: number }) {
  return (
    <>
      <VStack gap={3}>
        <Box
          as={Center}
          w={"80px"}
          h={"80px"}
          borderRadius={"full"}
          bg={"white"}
          shadow={"md"}
          border={"1px solid"}
          borderColor={"gray.100"}
        >
          <Icon as={FaXmark} fontSize={30} color={"red.400"} />
        </Box>

        <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight="bold">
          Pago rechazado
        </Text>
      </VStack>

      <Text fontSize={"sm"}>
        Lo sentimos, hubo un problema con tu pago. Por favor, intenta
        nuevamente.
      </Text>

      <VStack gap={3}>
        <Text fontSize={"xs"}>Volviendo al inicio en</Text>

        <CircularProgress
          value={(countdown / 5) * 100}
          size="80px"
          color="red.400"
        >
          <CircularProgressLabel
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"red.400"}
          >
            {countdown}s
          </CircularProgressLabel>
        </CircularProgress>
      </VStack>
    </>
  );
}
