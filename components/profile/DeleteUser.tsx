import { deleteOwnAccount } from "@/lib/actions/actions";
import { User } from "@/lib/types/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast, // Importa useToast para los mensajes de notificación
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function DeleteUser({
  user,
  token,
  logout,
}: {
  user: User | null;
  token: string | null;
  logout: () => void;
}) {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (token) {
      setIsLoading(true);
      try {
        await deleteOwnAccount(token);
        toast({
          title: "Cuenta eliminada.",
          description: "Su cuenta ha sido eliminada correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error.",
          description: "Hubo un problema al eliminar la cuenta.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
        onClose();
        logout();
      }
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        display={user?.role === "casa" ? "flex" : "none"}
        colorScheme="red"
        borderRadius={"8.93px"}
        color={"white"}
        size="md"
        width="full"
      >
        Eliminar usuario
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody>
            <Text>¿Está seguro de que desea eliminar su cuenta?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"rgba(81, 138, 62, 0.7)"}
              color={"white"}
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              isLoading={isLoading}
              loadingText="Eliminando..."
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
