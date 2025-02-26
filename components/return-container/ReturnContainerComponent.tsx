import { Center, Heading, Stack, Text, VStack, Box } from "@chakra-ui/react";

export default function ReturnContainerComponent() {
  return (
    <Stack
      w={"100%"}
      h={[`calc(100vh - 70px)`, `calc(100vh - 90px)`]}
      py={10}
      px={[5, 10, 20]}
      display={"flex"}
      direction={"column"}
      gap={10}
    >
      <VStack gap={6} textAlign={"center"}>
        {/* Title */}
        <Heading
          fontWeight={900}
          fontSize={["lg", "xl", "4xl"]}
          textAlign={"center"}
          color={"#2E312F"}
        >
          Encontrá tu Punto de Retorno más cercano
        </Heading>

        {/* Description */}
        <Text fontSize={["sm", "md", "lg"]}>
          Devolvé el Envase Retornable en cualquiera de los puntos para que
          pueda seguir su proceso de sanitización y regresar al circuito
          ¡Gracias por sumarte a cambiar la cultura del descarte!
        </Text>
      </VStack>

      {/* Map Punto Circular */}
      <Center flex="1">
        {/* Map takes remaining space */}
        <Box w="100%" h="100%" borderRadius="md" overflow="hidden">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1t_QK64rVM63_Ctpux-5vlLE4ZRXVmCM&ehbc=2E312F&noprof=1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>
      </Center>
    </Stack>
  );
}
