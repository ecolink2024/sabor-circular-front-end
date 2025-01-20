import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  useClipboard,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import ContainerBox from "./ContainerBox";
import { MdContentCopy, MdInfo } from "react-icons/md";
import { FaCalendarDay, FaEye, FaEyeSlash } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { redirectAttachedPremises } from "@/lib/utils/utils";
import { usePathname, useRouter } from "next/navigation";
import { PiPackageLight } from "react-icons/pi";

export default function AuthorizedBox() {
  const dni = "41483764";
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isCodeVisible, setIsCodeVisible] = useState(false);

  // Usamos useClipboard para manejar la copia
  const { onCopy } = useClipboard(dni);

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  return (
    <Flex w={"100%"} direction={{ base: "column", lg: "row" }} gap={10}>
      {/* User Code Box */}
      <ContainerBox>
        <Heading
          as="h2"
          size="md"
          color="#344234"
          mb={4}
          position={"relative"}
          zIndex={2}
        >
          Tu código único de usuario
        </Heading>

        <Box
          bg="gray.100"
          borderRadius="lg"
          p={4}
          shadow="inner"
          position={"relative"}
          zIndex={2}
        >
          <Text fontSize="15px" fontWeight="semibold" color="#518a3e" mb={2}>
            Código de usuario
          </Text>
          <Flex justify="space-between" align={"center"}>
            <Text fontSize="2xl" fontWeight="bold" color="#518a3e">
              {isCodeVisible ? dni : "* * * * * * *"}
            </Text>

            <HStack>
              <Tooltip label={"Copiar Codigo"}>
                <IconButton
                  display={isCodeVisible ? "flex" : "none"}
                  size={"sm"}
                  onClick={onCopy}
                  aria-label="Copiar código"
                  isDisabled={!dni}
                  icon={<MdContentCopy color="#518a3e" />}
                  borderRadius={"6px"}
                />
              </Tooltip>
              <Icon
                cursor={"pointer"}
                as={isCodeVisible ? FaEye : FaEyeSlash}
                size={"sm"}
                color={"#518a3e"}
                onClick={toggleCodeVisibility}
              />
            </HStack>
          </Flex>
        </Box>

        <Flex
          align="start"
          bg="gray.50"
          borderRadius="lg"
          p={3}
          justify="flex-start"
          gap={3}
          border={"1px"}
          borderColor={"gray.100"}
          mt={4}
        >
          <Icon as={TbRefresh} fontSize={20} color="#344234" mt={1} />
          <Text fontSize="sm" color="#344234">
            <strong>Usa este código</strong> para identificarte en los locales
            adheridos
          </Text>
        </Flex>

        <Box
          borderRadius="lg"
          p={4}
          borderWidth={1}
          borderColor={"#ea9b42"}
          mt={4}
          bg={"#FDF7EE"}
        >
          <Flex align="start" gap={3}>
            <Icon as={MdInfo} w={5} h={5} color="#ea9b42" mt={1} />
            <div>
              <Text fontSize="sm" fontWeight="semibold" color="#ea9b42" mb={1}>
                ¿Cómo usar tu código?
              </Text>
              <UnorderedList fontSize="xs" color="#ea9b42" spacing={1} pl={2}>
                <ListItem>Muestra este código al hacer un pedido</ListItem>
                <ListItem>Úsalo para recoger y devolver envases</ListItem>
              </UnorderedList>
            </div>
          </Flex>
        </Box>
      </ContainerBox>

      {/* Available Tupper Box  */}
      <ContainerBox>
        <Heading
          as="h2"
          size="md"
          color="#344234"
          mb={4}
          position={"relative"}
          zIndex={2}
        >
          Envases Disponibles
        </Heading>

        <Box
          bg="gray.100"
          borderRadius="lg"
          p={4}
          shadow="inner"
          position={"relative"}
          zIndex={2}
        >
          <Text fontSize="15px" fontWeight="semibold" color="#518a3e" mb={2}>
            Envases para usar
          </Text>
          <Text fontSize="2xl" fontWeight="extrabold" color="#518a3e">
            {user?.tupperCount}
          </Text>
        </Box>

        <Flex
          align="center"
          bg="gray.50"
          borderRadius="lg"
          p={3}
          justify="flex-start"
          gap={3}
          border={"1px"}
          borderColor={"gray.100"}
          mt={4}
        >
          <Icon as={FaCalendarDay} fontSize={18} color="#344234" />
          <Text fontSize="sm" color="#344234">
            <strong>Expiracion:</strong> 11/12/2025
          </Text>
        </Flex>

        <Box
          mt={3}
          bg={"#E9F6E5"}
          borderRadius="lg"
          p={4}
          borderWidth={1}
          borderColor="#518a3e"
        >
          <Flex align="start" gap={3}>
            <Icon as={PiPackageLight} w={5} h={5} color="#518a3e" mt={1} />
            <div>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="green.700"
                mb={1}
              >
                Sobre tus envases
              </Text>
              <UnorderedList fontSize="xs" color="#518a3e" spacing={1}>
                <ListItem>Puedes usarlos las veces que quieras</ListItem>
                <ListItem>
                  Devuélvelos limpios en cualquier local adherido
                </ListItem>
              </UnorderedList>
            </div>
          </Flex>
          <Box textAlign="center" mt={4}>
            <Text
              fontSize="xs"
              fontWeight={"semibold"}
              color="#518a3e"
              _hover={{ textDecoration: "underline" }}
              _focus={{ outline: "none", ring: 2, ringColor: "#518a3e" }}
              display="inline-flex"
              alignItems="center"
              px={2}
              py={1}
              cursor={"pointer"}
              onClick={() => redirectAttachedPremises(pathname, router)}
            >
              Ver locales adheridos
              <Icon as={IoArrowForwardCircleOutline} fontSize={16} ml={1} />
            </Text>
          </Box>
        </Box>

        <Text fontSize="xs" color="#344234" textAlign="center" mt={2}>
          Tus envases se actualizarán automáticamente cuando realices una
          devolución
        </Text>
      </ContainerBox>
    </Flex>
  );
}
