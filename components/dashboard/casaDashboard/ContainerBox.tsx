import { Box, Image } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const ContainerBox = ({ children }: { children: ReactNode }) => {
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
        {children}
      </Box>
    </Box>
  );
};

export default ContainerBox;
