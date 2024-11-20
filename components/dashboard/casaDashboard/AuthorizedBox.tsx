import { UserPacks } from "@/lib/types/types";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { MdContentCopy } from "react-icons/md";

export default function AuthorizedBox({ data }: { data: UserPacks[] | null }) {
  const { user } = useAuth();
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  // Usamos useClipboard para manejar la copia
  const { onCopy } = useClipboard(data && data[0]?.code ? data[0].code : "");

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  return (
    <>
      <Flex
        w={"100%"}
        justify={"space-evenly"}
        align={"center"}
        direction={{ base: "column", md: "row" }}
        gap={10}
      >
        <Box
          bg={"white"}
          w={"100%"}
          maxW={"390px"}
          h={"100%"}
          minH={"400px"}
          borderRadius="16px"
          borderTop="2px solid #518a3e"
          borderX="2px solid #518a3e"
          borderBottom="6px solid #518a3e"
          display={"flex"}
          flexDirection={"column"}
        >
          <HStack
            borderBottom={"2px solid #518a3e"}
            cursor="pointer"
            py={3}
            px={2}
            justifyContent={"center"}
            align={"center"}
            gap={3}
          >
            <Tooltip label={"Copiar Codigo"}>
              <IconButton
                display={isCodeVisible ? "flex" : "none"}
                size={"xs"}
                onClick={onCopy}
                aria-label="Copiar código"
                isDisabled={!data || !data[0]?.code}
                icon={<MdContentCopy color="#518a3e" />}
                borderRadius={"6px"}
              />
            </Tooltip>
            <Text fontSize={"2xl"} color={"#518a3e"}>
              {isCodeVisible ? data && data[0].code : "* * * * * * * * *"}
            </Text>
            <Icon
              as={isCodeVisible ? FaEye : FaEyeSlash}
              fontSize={20}
              color={"#518a3e"}
              onClick={toggleCodeVisibility}
            />
          </HStack>

          <Flex flex={1} justify={"center"} align={"center"}>
            <Text
              textAlign={"center"}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight={900}
              color={"#518a3e"}
            >
              Tu código único de <br />
              usuario
            </Text>
          </Flex>
        </Box>

        <Box
          as={Center}
          bg={"white"}
          w={"100%"}
          maxW={"390px"}
          h={"100%"}
          minH={"400px"}
          borderRadius="16px"
          borderTop="2px solid #518a3e"
          borderX="2px solid #518a3e"
          borderBottom="6px solid #518a3e"
          p={{ base: 6, lg: 10 }}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={3}
        >
          <Text
            textAlign={"center"}
            fontSize={"5xl"}
            fontWeight={900}
            color={"#518a3e"}
          >
            {user?.tupperCount}
          </Text>
          <Text fontWeight={600} textAlign={"center"}>
            Envases disponibles para usar en Locales Adheridos
          </Text>
        </Box>
      </Flex>
      <Text
        display={"none"}
        textAlign={"center"}
        fontWeight={600}
        fontSize={{ base: "lg", md: "xl" }}
      >
        Disponible hasta febrero 2025
      </Text>
    </>
  );
}
