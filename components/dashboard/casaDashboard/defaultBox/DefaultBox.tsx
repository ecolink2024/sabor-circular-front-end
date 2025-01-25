import MercadoPagoPayment from "@/components/mercado-pago-payment/MercadoPagoPayment";
import useMercadoPago from "@/lib/hooks/useMercadoPago";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaCalendarDay } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";

export default function DefaultBox() {
  const { preference, isLoading, activated, handleActivate } = useMercadoPago();

  return (
    <Box
      w={"100%"}
      h={"100%"}
      maxW="md"
      minH={"md"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mx="auto"
      bg={"white"}
      shadow="lg"
      _hover={{ shadow: "xl" }}
      borderRadius="12px"
      overflow="hidden"
      position={"relative"}
    >
      {/* Logo Sabor Circular */}
      <Box
        position="absolute"
        top={8}
        right={8}
        w={"140px"}
        h={"140px"}
        bg="gray.50"
        border={"1px"}
        borderColor={"gray.100"}
        borderRadius="full"
        transform="translate(50%, -50%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={1}
      >
        <Image
          src="/img/fondo-contact.png"
          w={"80px"}
          h={"auto"}
          alt="payment-tupper"
        />
      </Box>
      <Box w={"100%"} p={6} position="relative">
        {/* Heading  */}
        <Heading
          as="h2"
          size="md"
          color="#344234"
          mb={4}
          position={"relative"}
          zIndex={2}
        >
          Suscripción Semestral
        </Heading>

        <Stack spacing={4}>
          {/* Price */}
          <Box
            bg="gray.100"
            borderRadius="lg"
            p={4}
            shadow="inner"
            position={"relative"}
            zIndex={2}
          >
            <Text fontSize="16px" fontWeight="semibold" color="#518a3e" mb={2}>
              Precio especial
            </Text>
            <Flex justify="space-between" align={"center"}>
              <Text fontSize="2xl" fontWeight="extrabold" color="#518a3e">
                $9400
              </Text>
              <Text
                fontSize="lg"
                fontWeight="medium"
                color="gray.500"
                textDecoration="line-through"
              >
                $23.500
              </Text>
            </Flex>
          </Box>

          {/* Product Description */}
          <Flex
            align="start"
            bg="gray.50"
            borderRadius="lg"
            p={3}
            justify="flex-start"
            gap={3}
            border={"1px"}
            borderColor={"gray.100"}
          >
            <Icon as={TbRefresh} fontSize={20} color="#344234" mt={1} />
            <Text fontSize="sm" color="#344234">
              <strong>2 envase retornable</strong> para usar las veces que
              quieras durante 6 meses
            </Text>
          </Flex>

          {/* Product Duration  */}
          <Flex
            align="center"
            bg="gray.50"
            borderRadius="lg"
            p={3}
            justify="flex-start"
            gap={3}
            border={"1px"}
            borderColor={"gray.100"}
          >
            <Icon as={FaCalendarDay} fontSize={18} color="#344234" />
            <Text fontSize="sm" color="#344234">
              <strong>Duración:</strong> 6 meses
            </Text>
          </Flex>
        </Stack>

        {/* Button to activate subscription */}
        <Button
          display={!isLoading && preference ? "none" : "flex"}
          width="full"
          mt={6}
          bg="#518a3e"
          _hover={{ bg: "#518a3e" }}
          color="white"
          isLoading={isLoading}
          onClick={handleActivate}
        >
          Activar Suscripción
        </Button>

        {/* Display MercadoPagoPayment only after activation */}
        {activated && preference && !isLoading && (
          <MercadoPagoPayment preferenceId={preference.id!} />
        )}

        <Text fontSize="xs" color="#344234" mt={4} textAlign="center">
          ¡Ahorra $14.100 con esta oferta especial!
        </Text>
      </Box>
    </Box>
  );
}
