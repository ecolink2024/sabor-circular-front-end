"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FormUserDataInfo } from "@/lib/types/types";
import { submitFormUserInfo } from "@/lib/actions/actions";

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
    <Center w={"100%"} gap={10} flexDirection={"column"} p={20}>
      <Heading color={"black"} size={"2xl"} fontWeight={900}>
        Déjanos tus datos
      </Heading>
      <Box
        bg="white"
        p={6}
        rounded="20px"
        boxShadow="lg"
        maxWidth={{ base: "300px", md: "600px" }}
        minWidth={{ base: "300px", md: "500px" }}
        width="100%"
        padding={{ base: 8, lg: 10 }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="fullName">Nombre y Apellido</FormLabel>
            <Input
              id="fullName"
              name="name" // Usa 'name' en el input
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre y Apellido"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
            <Input
              id="email"
              name="email" // Usa 'name' en el input
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="telefone">Teléfono de contacto</FormLabel>
            <Input
              id="telefone"
              name="telefone" // Usa 'name' en el input
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Teléfono de contacto"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="businessName">Nombre de tu local</FormLabel>
            <Input
              id="businessName"
              name="contact" // Usa 'name' en el input
              value={formData.contact}
              onChange={handleChange}
              placeholder="Nombre de tu local"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="message">Mensaje</FormLabel>
            <Textarea
              id="message"
              name="message" // Usa 'name' en el textarea
              value={formData.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí"
              size="sm"
            />
          </FormControl>

          <Button
            type="submit"
            bg={"rgba(81, 138, 62, 0.7)"}
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
      </Box>
    </Center>
  );
}
