"use client";
import { PasswordField, UpdateUser, ValidationError } from "@/lib/types/types";
import { useAuth } from "@/providers/AuthProvider";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { updateUser } from "@/lib/actions/actions";
import DeleteUser from "./DeleteUser";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { clearFieldError, getErrorMessage } from "@/lib/utils/utils";

export default function Profile() {
  const toast = useToast();

  // State to manage the loading state during the update process
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  // State to store validation errors for the form fields (e.g., password, phone, etc.)
  const [errors, setErrors] = useState<ValidationError[] | undefined>([]);

  // State to manage the visibility of the password fields (current, new, and confirm passwords)
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Custom hook to access user authentication data (e.g., user info, token, etc.)
  const {
    user,
    isLoading: isLoadingUser,
    refetchUserData,
    token,
    logout,
  } = useAuth();

  // State to hold the form data being submitted for the user update (e.g., name, phone, passwords, etc.)
  const [formData, setFormData] = useState<UpdateUser>({
    name: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // useEffect hook to update formData whenever the `user` state changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // Function to handle form input changes and update the respective form field in `formData`
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission (e.g., updating user profile)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingUpdate(true);

    try {
      const response = await updateUser(formData, token);

      if (response.success) {
        await refetchUserData();

        toast({
          title: "Perfil actualizado.",
          description: "La información de tu perfil ha sido actualizada.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // If there was an error (response.success is false), check for a validation error message
        if (response.message && response.message !== "Errores de validación") {
          toast({
            title: "Error al actualizar perfil",
            description: response.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }

        // Handle validation errors (if any)
        if (response.errors && response.errors.length > 0) {
          setErrors(response.errors);
        } else {
          setErrors([]);
        }
      }
    } catch (error) {
      toast({
        title: "Error de red.",
        description:
          "No se pudo conectar al servidor. Por favor, inténtalo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  // Function to toggle the visibility of the password fields (current, new, confirm)
  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
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
      <Skeleton
        isLoaded={!isLoadingUser}
        rounded={"20px"}
        w={"100%"}
        maxWidth={{ base: "300px", lg: "450px" }}
      >
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
              {/* Input Name */}
              <FormControl
                id="name"
                isInvalid={!!getErrorMessage("name", errors)}
                isRequired
              >
                <FormLabel>Nombre Completo</FormLabel>
                <Input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={formData.name}
                  onChange={(e) => {
                    handleInputChange(e);
                    clearFieldError("name", setErrors);
                  }}
                />
                <FormErrorMessage>
                  {getErrorMessage("name", errors)}
                </FormErrorMessage>
              </FormControl>

              {/* Input Phone */}
              <FormControl
                id="phone"
                isInvalid={!!getErrorMessage("phone", errors)}
                isRequired
              >
                <FormLabel>Teléfono</FormLabel>
                <Input
                  type="tel"
                  placeholder="Ingresa tu número de teléfono"
                  value={formData.phone}
                  onChange={(e) => {
                    handleInputChange(e);
                    clearFieldError("phone", setErrors);
                  }}
                />
                <FormErrorMessage>
                  {getErrorMessage("phone", errors)}
                </FormErrorMessage>
              </FormControl>

              {/* Input Address */}
              <FormControl
                id="address"
                isInvalid={!!getErrorMessage("address", errors)}
                isRequired
              >
                <FormLabel>Dirección</FormLabel>
                <Input
                  type="text"
                  placeholder="Ingresa tu dirección"
                  value={formData.address}
                  onChange={(e) => {
                    handleInputChange(e);
                    clearFieldError("address", setErrors);
                  }}
                />
                <FormErrorMessage>
                  {getErrorMessage("address", errors)}
                </FormErrorMessage>
              </FormControl>

              {/* Input Current Password */}
              <FormControl id="currentPassword">
                <FormLabel>Contraseña Actual</FormLabel>
                <InputGroup>
                  <Input
                    type={
                      passwordVisibility.currentPassword ? "text" : "password"
                    }
                    placeholder="Ingresa tu contraseña actual"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                  <InputRightElement>
                    <IconButton
                      display={formData.currentPassword ? "flex" : "none"}
                      aria-label={
                        passwordVisibility.currentPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      icon={
                        passwordVisibility.currentPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )
                      }
                      onClick={() =>
                        togglePasswordVisibility("currentPassword")
                      }
                      variant="link"
                      color="gray.500"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Input New Password */}
              <FormControl id="newPassword">
                <FormLabel>Nueva Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={passwordVisibility.newPassword ? "text" : "password"}
                    placeholder="Ingresa tu nueva contraseña"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                  <InputRightElement>
                    <IconButton
                      display={formData.newPassword ? "flex" : "none"}
                      aria-label={
                        passwordVisibility.newPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      icon={
                        passwordVisibility.newPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )
                      }
                      onClick={() => togglePasswordVisibility("newPassword")}
                      variant="link"
                      color="gray.500"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Input Confirm Password */}
              <FormControl
                id="confirmPassword"
                isInvalid={!!getErrorMessage("newPassword", errors)}
              >
                <FormLabel>Confirmar Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={
                      passwordVisibility.confirmPassword ? "text" : "password"
                    }
                    placeholder="Confirma tu nueva contraseña"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      handleInputChange(e);
                      clearFieldError("newPassword", setErrors);
                    }}
                  />
                  <InputRightElement>
                    <IconButton
                      display={formData.confirmPassword ? "flex" : "none"}
                      aria-label={
                        passwordVisibility.confirmPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      icon={
                        passwordVisibility.confirmPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )
                      }
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      variant="link"
                      color="gray.500"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {getErrorMessage("newPassword", errors)}
                </FormErrorMessage>
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
      </Skeleton>
    </Stack>
  );
}
