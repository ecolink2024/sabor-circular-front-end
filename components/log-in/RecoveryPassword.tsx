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
} from "@chakra-ui/react";
import { resetPassword } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";

export default function RecoveryPassword({ token }: { token: string | null }) {
  const toast = useToast();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
              <Input
                type="password"
                placeholder="Ingrese su nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="Confirme su nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Restablecer Contraseña
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
