import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { FaEyeSlash, FaEye, FaCalendarDay } from "react-icons/fa6";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import BoxContainer from "./BoxContainer";
import AlertComponent from "./AlertComponent";
import { formatDate } from "@/lib/utils/utils";
import { SubscriptionInfo } from "@/lib/types/types";

export default function AuthorizedBox({
  pack,
}: {
  pack: SubscriptionInfo | undefined;
}) {
  const { onCopy } = useClipboard(pack?.code || "");
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  return (
    <Flex
      w={"100%"}
      justify={"space-evenly"}
      align={"center"}
      direction={{ base: "column", md: "row" }}
      gap={10}
    >
      {/* User Code */}
      <BoxContainer>
        <Box
          bg="gray.50"
          border={"1px"}
          borderColor={"gray.100"}
          borderRadius="lg"
          p={4}
        >
          <Flex justify="space-between" align={"center"}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="#518a3e"
              position={"relative"}
              top={"3px"}
            >
              {isCodeVisible ? pack?.code : "* * * * * * *"}
            </Text>

            <HStack>
              <Tooltip label={"Copiar Codigo"}>
                <IconButton
                  display={isCodeVisible ? "flex" : "none"}
                  size={"sm"}
                  onClick={onCopy}
                  aria-label="Copiar código"
                  isDisabled={!pack?.code}
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
      </BoxContainer>

      {/* User Tupper Count */}
      <BoxContainer>
        <Center
          flex={1}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          gap={8}
        >
          <Box as={Center} flex={1} flexDirection={"column"}>
            <Text
              textAlign={"center"}
              fontSize={"5xl"}
              fontWeight={900}
              color={"#518a3e"}
            >
              {pack?.tupperCount || 0}
            </Text>
            <Text fontWeight={600} textAlign={"center"}>
              Envases disponibles para usar en Locales Adheridos
            </Text>
          </Box>

          <VStack w={"100%"} gap={4}>
            <Flex
              w={"100%"}
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
                <strong>Expiracion:</strong>{" "}
                {formatDate(pack?.authorizedAt || new Date())}
              </Text>
            </Flex>

            {/* Alert Component */}
            <AlertComponent expirationDate={pack?.authorizedAt} />
          </VStack>
        </Center>
      </BoxContainer>
    </Flex>
  );
}
