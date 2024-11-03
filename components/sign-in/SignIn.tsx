"use client";
import { registerUser } from "@/lib/actions/actions";
import { RegisterData, Response } from "@/lib/types/types";
import {
  useToast,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Image,
  Center,
  Select,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn({
  registrationType = "casa",
}: {
  registrationType: "admin" | "casa" | "pg";
}) {
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    role:
      registrationType === "casa"
        ? "casa"
        : registrationType === "admin"
        ? "admin"
        : "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    // Si el registro es 'pg', el rol se puede cambiar
    if (registrationType === "pg" && id === "role") {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    } else {
      // Para 'admin' o 'casa', no se cambia el rol desde el input
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response: Response = await registerUser(formData);

    if (response.success) {
      toast({
        title: "Registro exitoso.",
        description: "Te has registrado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        role:
          registrationType === "casa"
            ? "casa"
            : registrationType === "admin"
            ? "admin"
            : "",
        password: "",
      });

      router.push("/login");
    } else {
      toast({
        title: "Error en el registro.",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      gap={10}
      py={10}
    >
      <Image
        src={"/svg/logo-sabor-circular-register.svg"}
        alt="logo"
        width={"300px"}
        height={"auto"}
      />
      <Box
        bg="white"
        p={6}
        rounded="20px"
        boxShadow="lg"
        maxWidth={{ base: "300px", md: "450px" }}
        width="100%"
        padding={{ base: 8, lg: 10 }}
      >
        <Heading mb={6} textAlign="center" fontSize="xl" fontWeight={900}>
          Regístrate
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Nombre Completo</FormLabel>
              <Input
                type="text"
                placeholder="Ingresa tu nombre"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Teléfono</FormLabel>
              <Input
                type="tel"
                placeholder="Ingresa tu número de teléfono"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input
                type="text"
                placeholder="Ingresa tu dirección"
                value={formData.address}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Mostrar el desplegable según el tipo de registro */}
            {registrationType === "pg" && (
              <FormControl id="role" isRequired>
                <FormLabel>Rol</FormLabel>
                <Select
                  placeholder="Selecciona un rol"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="punto">Punto</option>
                  <option value="gastronomico">Gastronómico</option>
                </Select>
              </FormControl>
            )}

            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleInputChange}
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
            >
              Regístrate
            </Button>
          </Stack>
        </form>

        <Center mt={4}>
          <Link
            href="/login"
            style={{ textDecoration: "none", color: "rgba(81, 138, 62, 0.7)" }}
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </Center>
      </Box>
    </Box>
  );
}
