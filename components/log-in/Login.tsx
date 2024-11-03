"use client";
import { loginUser } from "@/lib/actions/actions";
import { useAuth } from "@/providers/AuthProvider";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await loginUser({ email, password });

    if (response.success && response.token) {
      login(response.token);
      toast({
        title: "Inicio de sesión exitoso.",
        description: "Te has autenticado correctamente.",
        status: "success",
        duration: 500,
        isClosable: true,
      });
      router.push("/");
    } else {
      toast({
        title: "Error en el inicio de sesión.",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
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
        <Heading mb={6} textAlign="center" fontSize="2xl">
          Iniciar Sesión
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Iniciar Sesión
            </Button>
            <Center mt={2}>
              <Link
                href="/login/recovery-password"
                style={{ color: "rgba(81, 138, 62, 0.7)" }}
                isExternal
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Center>
          </Stack>
        </form>
        <Center mt={2}>
          <Link href="/signin" style={{ color: "rgba(81, 138, 62, 0.7)" }}>
            ¿No tienes cuenta? Regístrate aquí.
          </Link>
        </Center>
      </Box>
    </Box>
  );
}
