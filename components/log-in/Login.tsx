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
  IconButton,
  Image,
  Input,
  Link,
  Stack,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getUserType } from "@/lib/utils/utils";

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const { login, user, userRole } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const role = getUserType(userRole);

  useEffect(() => {
    if (user) {
      router.push(
        `/dashboard/${role === "hibrido" ? "gastronomico" : role}/${user._id}`
      );
    }
  }, [user, router, role]);

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
      px={6}
      position={"relative"}
    >
      {/* Button Redirect Index */}
      <IconButton
        bg={"#518a3e"}
        _hover={{ bg: "gray.300" }}
        borderRadius={"8.93px"}
        color={"white"}
        aria-label="redirect-index"
        icon={<FaArrowLeftLong />}
        position={"absolute"}
        onClick={() => router.push("/")}
        top={4}
        left={4}
      />

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
        maxWidth={{ base: "100%", md: "450px" }}
        width="100%"
        padding={{ base: 8, lg: 10 }}
      >
        <Heading mb={6} textAlign="center" fontSize="2xl">
          Iniciar Sesión
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Input Email  */}
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Ingrese su email"
                value={email}
                focusBorderColor="#518a3e"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* Input Password  */}
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  focusBorderColor="#518a3e"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    display={password ? "flex" : "none"}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="link"
                    color="gray.500"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Submit Button  */}
            <Button
              type="submit"
              bg={"#518a3e"}
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
                textAlign={"center"}
                isExternal
                fontSize={{ base: "12px", md: "15px" }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Center>
          </Stack>
        </form>
        <Center mt={2}>
          <Link
            href="/signin"
            style={{ color: "rgba(81, 138, 62, 0.7)" }}
            textAlign={"center"}
            fontSize={{ base: "12px", md: "15px" }}
          >
            ¿No tienes cuenta? Regístrate aquí.
          </Link>
        </Center>
      </Box>
    </Box>
  );
}
