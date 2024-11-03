"use client";
import { UpdateUser } from "@/lib/types/types";
import { useAuth } from "@/providers/AuthProvider";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SkeletonUserUpdate } from "../skeletons/Skeletons";
import { updateUser } from "@/lib/actions/actions";
import DeleteUser from "./DeleteUser";

export default function Profile() {
  const {
    user,
    isLoading: isLoadingUser,
    refetchUserData,
    token,
    logout,
  } = useAuth();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const toast = useToast();

  const [formData, setFormData] = useState<UpdateUser>({
    name: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingUpdate(true);

    try {
      await updateUser(formData, token);

      await refetchUserData();

      toast({
        title: "Perfil actualizado.",
        description: "La información de tu perfil ha sido actualizada.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast({
        title: "Error.",
        description: "Hubo un problema al actualizar tu perfil.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  return (
    <Stack
      as={Center}
      height={"100%"}
      minH={{ base: "calc(100vh - 70px)", lg: "calc(100vh - 90px)" }}
      p={10}
      gap={10}
    >
      <Heading>Datos cuenta</Heading>
      {isLoadingUser ? (
        <SkeletonUserUpdate />
      ) : (
        <Box
          bg="white"
          p={6}
          rounded="20px"
          boxShadow="lg"
          maxWidth={{ base: "300px", lg: "450px" }}
          width="100%"
          padding={{ base: 8, lg: 10 }}
        >
          <Heading mb={6} textAlign="center" fontSize="xl" fontWeight={900}>
            Datos de mi cuenta
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
              <FormControl id="currentPassword">
                <FormLabel>Contraseña Actual</FormLabel>
                <Input
                  type="password"
                  placeholder="Ingresa tu contraseña actual"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="newPassword">
                <FormLabel>Nueva Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirmar Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </FormControl>

              {/* Submit Button  */}
              <Button
                type="submit"
                bg={"rgba(81, 138, 62, 0.7)"}
                _hover={{ bg: "gray.300" }}
                borderRadius={"8.93px"}
                color={"white"}
                size="md"
                width="full"
                isLoading={isLoadingUpdate}
              >
                Guardar cambios
              </Button>

              {/* Delete User Button */}
              <DeleteUser user={user} token={token} logout={logout} />
            </Stack>
          </form>
        </Box>
      )}
    </Stack>
  );
}
