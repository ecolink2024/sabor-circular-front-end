import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

export default function Success({ countdown }: { countdown: number }) {
  return (
    <>
      <VStack gap={3}>
        <Box
          as={Center}
          w={"80px"}
          h={"80px"}
          borderRadius={"full"}
          bg={"white"}
          shadow={"sm"}
        >
          <Icon as={FaCheck} fontSize={30} color={"green.400"} />
        </Box>

        <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight="bold">
          ¡Pago exitoso!
        </Text>
      </VStack>

      <VStack color={"gray.600"} fontWeight={"semibold"}>
        <Text fontSize={"sm"}>
          Recibirás un correo con el comprobante de tu pago.
        </Text>

        <HStack>
          <Icon as={MdOutlineEmail} />
          <Text fontSize={"xs"}>Revisa tu correo electrónico</Text>
        </HStack>
      </VStack>

      <VStack gap={3}>
        <Text fontSize={"xs"}>
          Te redirigiremos a la sección de tu tupper en
        </Text>

        <CircularProgress
          value={(countdown / 5) * 100}
          size={"80px"}
          color="green.400"
        >
          <CircularProgressLabel
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"green.400"}
          >
            {countdown}
          </CircularProgressLabel>
        </CircularProgress>
      </VStack>
    </>
  );
}
