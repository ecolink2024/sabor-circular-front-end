import {
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ImAttachment } from "react-icons/im";
import { CldImage } from "next-cloudinary";

export default function ButtonViewImage({ fileUrl }: { fileUrl: string }) {
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"15px"}>
          <ModalHeader>Comprobante</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} as={Center} position="relative" minH="250px">
            {isLoading && (
              <Spinner size="xl" position="absolute" color="#344234" />
            )}
            <CldImage
              src={fileUrl}
              alt="comprobante"
              width={400}
              height={250}
              style={{ maxHeight: "400px" }}
              onLoad={handleImageLoad}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
