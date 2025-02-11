import {
  VStack,
  Center,
  Text,
  Box,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

export default function Pending({ countdown }: { countdown: number }) {
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
          <Spinner
            borderWidth={6}
            speed="0.65s"
            size={"xl"}
            color="yellow.400"
            emptyColor="gray.100"
          />
        </Box>

        <Text fontSize={"xl"} fontWeight="bold">
          Procesando pago...
        </Text>
      </VStack>

      <VStack color={"gray.600"} fontWeight={"semibold"}>
        <Text fontSize={"sm"}>
          Estamos verificando tu pago. Por favor, espera un momento.
        </Text>

        <Text fontSize={"xs"}>Esto puede tardar unos minutos.</Text>
      </VStack>

      <VStack gap={3}>
        <Text fontSize={"xs"}>Actualizando estado en</Text>

        <CircularProgress
          value={(countdown / 10) * 100}
          size="80px"
          color="yellow.400"
        >
          <CircularProgressLabel
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"yellow.400"}
          >
            {countdown}
          </CircularProgressLabel>
        </CircularProgress>
      </VStack>
    </>
  );
}
