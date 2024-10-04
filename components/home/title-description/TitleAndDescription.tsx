import { VStack, Heading, Text } from "@chakra-ui/react";

export default function TitleAndDescription() {
  return (
    <VStack
      gap={{ base: 4, md: 6, lg: 10 }}
      mt={{ base: "60px", md: "80px", lg: "100px" }}
      px={2}
    >
      <Heading
        fontWeight={"black"}
        fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}
        color={"white"}
        textAlign={"center"}
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
      >
        Disfrutá, devolvé, repetí
      </Heading>
      <Text
        fontSize={{ base: "sm", md: "md", lg: "xl" }}
        textAlign={"center"}
        maxW={{ base: "400px", md: "500px", lg: "600px" }}
      >
        Ahora take away y delivery de tu comida preferida en envases
        reutilizables que devolvés en diferentes puntos de la ciudad
      </Text>
    </VStack>
  );
}
