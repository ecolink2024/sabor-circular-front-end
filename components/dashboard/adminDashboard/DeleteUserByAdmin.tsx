import { deleteUserByAdmin } from "@/lib/actions/actions";
import { useAuth } from "@/providers/AuthProvider";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function DeleteUserByAdmin({
  userName,
  userId,
  refetch,
}: {
  userName: string | undefined;
  userId: string | undefined;
  refetch: () => void;
}) {
  const { token } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      await deleteUserByAdmin(userId, token);
      refetch();
    } catch (error) {
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Button
        w={"100%"}
        borderRadius={"8.93px"}
        bg={"red.400"}
        color={"white"}
        onClick={onOpen}
      >
        Eliminar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody>
            <Text>
              ¿Está seguro de que desea eliminar al usuario {userName}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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