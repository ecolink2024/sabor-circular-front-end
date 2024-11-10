"use client";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { resetPassword } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6"; // Importa los íconos

export default function RecoveryPassword({ token }: { token: string | null }) {
  const toast = useToast();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para controlar la visibilidad de la contraseña

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden.",
        description: "Por favor, verifica que ambas contraseñas sean iguales.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, newPassword);
      toast({
        title: "Contraseña restablecida.",
        description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error al restablecer la contraseña.",
        description: "Por favor, intenta de nuevo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setNewPassword("");
      setConfirmPassword("");
      router.push("/login");
    }
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
          Restablecer Contraseña
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="newPassword" isRequired>
              <FormLabel>Nueva Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    display={newPassword ? "flex" : "none"}
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

            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme su nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    display={newPassword ? "flex" : "none"}
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
              Restablecer Contraseña
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
