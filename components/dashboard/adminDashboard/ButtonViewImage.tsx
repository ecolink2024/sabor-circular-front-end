import {
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Center,
  Spinner,
  ModalBody,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ImAttachment } from "react-icons/im";
import CldImage from "./CldImage";

export default function ButtonViewImage({
  fileUrl,
}: {
  fileUrl?: string | undefined;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Icon
        as={ImAttachment}
        onClick={onOpen}
        cursor={"pointer"}
        fontSize={20}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius={0}
          p={0}
          maxWidth="100%"
          maxHeight="100vh"
          bg="transparent"
          boxShadow="none"
        >
          {/* Botón de Cerrar */}
          <ModalCloseButton
            position="absolute"
            top={4}
            right={4}
            color="white"
            bg={"black"}
            borderRadius={"8.93px"}
            zIndex={1}
          />

          <ModalBody as={Center} position="relative">
            {isLoading && (
              <Spinner size="xl" position="absolute" color="#344234" />
            )}
            <CldImage
              src={fileUrl!}
              alt={`comprante ${fileUrl!}`}
              width={1200}
              height={1200}
              style={{
                maxHeight: "90vh",
                objectFit: "contain",
              }}
              onLoad={handleImageLoad}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
