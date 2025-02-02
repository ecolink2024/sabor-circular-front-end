import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import BoxContainer from "../authorizedBox/BoxContainer";

export default function PendingBox() {
  return (
    <BoxContainer>
      <Center flex={1} flexDirection={"column"} gap={8}>
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
          <Text fontSize={"sm"} textAlign={"center"}>
            Estamos verificando tu pago. Por favor, espera un momento.
          </Text>

          <Text fontSize={"xs"}>Esto puede tardar unos minutos.</Text>
        </VStack>
      </Center>
    </BoxContainer>
  );
}
