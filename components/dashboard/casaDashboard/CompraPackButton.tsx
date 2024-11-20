import { submitPack } from "@/lib/actions/actions";
import useFileHandler from "@/lib/hooks/useFileHandler";
import { useAuth } from "@/providers/AuthProvider";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Icon,
  Text,
  VStack,
  Box,
  IconButton,
  useToast,
  useClipboard,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export default function CompraPackButton({
  refetch,
}: {
  refetch: () => Promise<void>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { token, user } = useAuth();
  const { onChangeFile, onDragOver, onDrop, fileName, file, onDeleteFile } =
    useFileHandler();

  // Estado para manejar la carga
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPack = async () => {
    const tupperAmount = 1;

    if (!user?._id) {
      toast({
        title: "Error",
        description: "El ID del usuario no existe.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (!file) {
      toast({
        title: "Error",
        description: "No se ha cargado ningún archivo.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      await submitPack(user._id, tupperAmount, file, token);
      toast({
        title: "Éxito",
        description: "Pack enviado exitosamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      refetch();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al enviar el pack.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { onCopy: onCopyAlias } = useClipboard("saborcircular.mp");

  const handleCopy = () => {
    onCopyAlias();
    toast({
      title: "Copiado",
      description: "Alias copiado al portapapeles",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        borderRadius={"8.93px"}
        fontWeight={500}
        bg={"#518a3e"}
        _hover={{ bg: "gray.300" }}
        color={"white"}
        onClick={onOpen}
      >
        Suscribirme
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"sm"}>
        <ModalOverlay backdropFilter="blur(10px)" />

        <ModalContent borderRadius={"20px"} p={0} mx={{ base: 10, lg: 0 }}>
          <ModalBody
            p={10}
            display={"flex"}
            flexDirection={"column"}
            gap={10}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Box
              as="label"
              border={"1px"}
              w={"100%"}
              borderRadius={"8.93px"}
              borderColor={"gray.100"}
              color={"gray.400"}
              px={4}
              py={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={file ? "space-between" : "flex-start"}
              gap={4}
              cursor="pointer"
            >
              <Icon as={FiUploadCloud} fontSize={20} />
              <Text
                fontSize={"16px"}
                textAlign={"center"}
                isTruncated
                maxW={"18ch"}
              >
                {fileName || `Cargar comprobante`}
              </Text>
              <input
                type="file"
                hidden
                onChange={onChangeFile}
                accept=".jpg,.jpeg,.pdf,.png"
              />
              <IconButton
                borderRadius={"8.93px"}
                icon={<RxCross2 />}
                fontSize={10}
                onClick={(event) => {
                  event.stopPropagation();
                  onDeleteFile();
                }}
                aria-label="delete-file"
                size={"xs"}
                display={file ? "flex" : "none"}
              />
            </Box>

            <VStack>
              <Text fontSize={"14px"} color={"#B3B3B3"} textAlign={"center"}>
                Datos cuenta bancaria
              </Text>
              <HStack>
                <Text fontSize={"14px"} color={"#B3B3B3"}>
                  ALIAS: saborcircular.mp
                </Text>
                <IconButton
                  aria-label="Copiar Alias"
                  icon={<MdContentCopy />}
                  size="xs"
                  onClick={() => handleCopy()}
                />
              </HStack>
              <Text fontSize={"14px"} color={"#B3B3B3"}>
                NOMBRE: EcoLink SAS
              </Text>
            </VStack>
            <Button
              borderRadius={"8.93px"}
              fontWeight={500}
              bg={"#518a3e"}
              _hover={{ bg: "gray.300" }}
              color={"white"}
              isDisabled={!user?._id || !file}
              isLoading={isLoading}
              onClick={handleSendPack}
            >
              Enviar comprobante
            </Button>
            <Text fontSize={"12px"} color={"#B3B3B3"} textAlign={"center"}>
              Una vez validada la suscripción, te llegará un correo de
              confirmación. ¡Chequeá tu casilla!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
