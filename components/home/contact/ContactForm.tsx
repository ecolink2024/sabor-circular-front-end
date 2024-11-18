"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FormUserDataInfo } from "@/lib/types/types";
import { submitFormUserInfo } from "@/lib/actions/actions";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

export default function ContactForm() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormUserDataInfo>({
    name: "",
    email: "",
    telefone: "",
    contact: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await submitFormUserInfo(formData);
      toast({
        title: "Mensaje enviado.",
        description: "Tu mensaje ha sido enviado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        name: "",
        email: "",
        telefone: "",
        contact: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: "Hubo un problema al enviar tu mensaje.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center
      w={"100%"}
      gap={10}
      flexDirection={"column"}
      p={{ base: 6, md: 20 }}
    >
      {/* Button Redirect Index */}
      <IconButton
        as={Link}
        bg={"#518a3e"}
        _hover={{ bg: "gray.300" }}
        borderRadius={"8.93px"}
        color={"white"}
        aria-label="redirect-index"
        icon={<FaArrowLeftLong />}
        href="/"
        position={"absolute"}
        top={4}
        left={4}
      />

      <Box
        border={"8px solid white"}
        w={"100%"}
        maxW={"1100px"}
        borderRadius={"20px"}
        display={"flex"}
        shadow={"md"}
        mt={{ base: 16, lg: 0 }}
      >
        {/* Left Section  */}
        <Box
          display={{ base: "none", md: "flex" }}
          flex={2}
          borderLeftRadius={"16px"}
        >
          <Image
            src="/svg/background-contact-form.svg"
            alt="background-contact"
            objectFit="cover"
            height="100%"
            width="100%"
            borderLeftRadius={"10px"}
          />
        </Box>

        {/* Right Section  */}
        <Box
          display={"flex"}
          flex={3}
          bg={"white"}
          flexDirection={"column"}
          p={{ base: 6, md: 10 }}
          gap={8}
        >
          <VStack
            alignItems={{ base: "center", md: "flex-start" }}
            gap={{ base: 3, md: 6 }}
          >
            {/* Logo Sabor Circular  */}
            <Link href={"/"} passHref>
              <Box w={"100%"} h={"100%"} maxW={"140px"} maxH={"40px"}>
                <Image
                  src="/svg/logo-sabor-circular-register.svg"
                  alt="logo-sabor-circular"
                  w={180}
                />
              </Box>
            </Link>

            {/* Heading  */}
            <Heading
              color={"black"}
              size={{ base: "lg", md: "xl" }}
              fontWeight={800}
            >
              Contactanos
            </Heading>

            {/* Description  */}
            <Text
              fontSize={{ base: "12px", md: "15px" }}
              textAlign={{ base: "center", md: "start" }}
            >
              ¿Tienes alguna pregunta? Completa el formulario y te responderemos
              pronto.
            </Text>
          </VStack>

          <VStack w={"100%"}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex gap={4} direction={{ base: "column", md: "row" }}>
                {/* Input Nombre y Apellido  */}
                <FormControl isRequired w={"100%"}>
                  <FormLabel htmlFor="fullName" fontSize={"14px"}>
                    Nombre y Apellido
                  </FormLabel>
                  <Input
                    w={"100%"}
                    id="fullName"
                    name="name"
                    value={formData.name}
                    fontSize={"13px"}
                    focusBorderColor="#518a3e"
                    onChange={handleChange}
                    placeholder="Nombre y Apellido"
                  />
                </FormControl>

                {/* Input Correo Electronico */}
                <FormControl isRequired>
                  <FormLabel htmlFor="email" fontSize={"14px"}>
                    Correo Electrónico
                  </FormLabel>
                  <Input
                    w={"100%"}
                    id="email"
                    name="email"
                    type="email"
                    fontSize={"13px"}
                    value={formData.email}
                    focusBorderColor="#518a3e"
                    onChange={handleChange}
                    placeholder="Correo Electrónico"
                  />
                </FormControl>
              </Flex>

              {/* Input Contact Phone */}
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="telefone" fontSize={"14px"}>
                  Teléfono de contacto
                </FormLabel>
                <Input
                  w={"100%"}
                  id="telefone"
                  name="telefone"
                  fontSize={"13px"}
                  value={formData.telefone}
                  focusBorderColor="#518a3e"
                  onChange={handleChange}
                  placeholder="Teléfono de contacto"
                />
              </FormControl>

              {/* Input Shop Name  */}
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="businessName" fontSize={"14px"}>
                  Nombre de tu local
                </FormLabel>
                <Input
                  w={"100%"}
                  id="businessName"
                  name="contact"
                  fontSize={"13px"}
                  value={formData.contact}
                  focusBorderColor="#518a3e"
                  onChange={handleChange}
                  placeholder="Nombre de tu local"
                />
              </FormControl>

              {/* Input Message  */}
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="message" fontSize={"14px"}>
                  Mensaje
                </FormLabel>
                <Textarea
                  w={"100%"}
                  id="message"
                  name="message"
                  fontSize={"13px"}
                  focusBorderColor="#518a3e"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí"
                  size="sm"
                />
              </FormControl>

              {/* Submit Button */}
              <Button
                mt={6}
                w={"100%"}
                type="submit"
                bg={"#518a3e"}
                _hover={{ bg: "gray.300" }}
                borderRadius={"8.93px"}
                color={"white"}
                size="md"
                width="full"
                isLoading={isLoading}
                loadingText="Enviando..."
              >
                Enviar Mensaje
              </Button>
            </form>
          </VStack>
        </Box>
      </Box>
    </Center>
  );
}
