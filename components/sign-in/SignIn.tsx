"use client";
import { registerUser } from "@/lib/actions/actions";
import {
  PasswordFieldRegister,
  RegisterData,
  RegisterResponse,
  ValidationError,
} from "@/lib/types/types";
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
  IconButton,
  Link,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { FaArrowLeftLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { clearFieldError, getErrorMessage } from "@/lib/utils/utils";

export default function SignIn({
  registrationType = "casa",
}: {
  registrationType: "admin" | "casa" | "pg";
}) {
  // Chakra UI toast for displaying success or error messages
  const toast = useToast();

  // State to store the registration form data
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
    confirmPassword: "",
  });

  // Boolean state to control the visibility of the loading spinner
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State to manage the visibility of the password fields (current, new, and confirm passwords)
  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // State to store validation errors for the form
  const [errors, setErrors] = useState<ValidationError[] | undefined>([]);

  /**
   * Function to update `formData` values when the user types in the form fields.
   * If the registration type is 'pg', allows the user to select a role; otherwise, the role remains static.
   *
   * @param e - The change event from the input and select elements in the form
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    // If the registration type is 'pg', allow the role to be changed
    if (registrationType === "pg" && id === "role") {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    } else {
      // For 'admin' or 'casa', the role cannot be changed from the input
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  /**
   * Function to handle form submission for registration.
   * Sends `formData` to the server to register the user.
   *
   * @param e - The form submission event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response: RegisterResponse = await registerUser(formData);

      if (response.success) {
        toast({
          title: "Registro exitoso.",
          description:
            "Te has registrado correctamente. Por favor, revisa tu correo para verificar tu cuenta.",
          status: "success",
          duration: null,
          isClosable: true,
        });
        setFormData((prevData) => ({
          ...prevData,
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          confirmPassword: "",
        }));
      } else {
        setErrors(response.errors);
      }
    } catch (error) {
      toast({
        title: "Network error.",
        description: "Could not connect to the server. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle the visibility of the password fields (current, new, confirm)
  const togglePasswordVisibility = (field: PasswordFieldRegister) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      gap={10}
      py={10}
      position={"relative"}
    >
      {/* Button Redirect Index */}
      <IconButton
        as={Link}
        bg={"rgba(81, 138, 62, 0.7)"}
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
          Registrate
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Input Name  */}
            <FormControl
              id="name"
              isInvalid={!!getErrorMessage("name", errors)}
            >
              <FormLabel>
                {registrationType === "pg"
                  ? `Nombre de tu Local`
                  : `Nombre Completo`}{" "}
              </FormLabel>
              <Input
                type="text"
                placeholder={
                  registrationType === "pg"
                    ? `Ingresa el nombre de tu local`
                    : `Ingresa tu nombre`
                }
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

            {/* Input Email  */}
            <FormControl
              id="email"
              isInvalid={!!getErrorMessage("email", errors)}
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={(e) => {
                  handleInputChange(e);
                  clearFieldError("email", setErrors);
                }}
              />
              <FormErrorMessage>
                {getErrorMessage("email", errors)}
              </FormErrorMessage>
            </FormControl>

            {/* Input Phone */}
            <FormControl
              id="phone"
              isInvalid={!!getErrorMessage("phone", errors)}
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

            {/* Select Role  */}
            {registrationType === "pg" && (
              <FormControl
                id="role"
                isRequired
                isInvalid={!!getErrorMessage("role", errors)}
              >
                <FormLabel>Rol</FormLabel>
                <Select
                  placeholder="Selecciona un rol"
                  value={formData.role}
                  onChange={(e) => {
                    handleInputChange(e);
                    clearFieldError("role", setErrors);
                  }}
                >
                  <option value="punto">Punto</option>
                  <option value="gastronomico">Gastronómico</option>
                </Select>
                <FormErrorMessage>
                  {getErrorMessage("role", errors)}
                </FormErrorMessage>
              </FormControl>
            )}

            {/* Input Password  */}
            <FormControl
              id="password"
              isInvalid={!!getErrorMessage("password", errors)}
            >
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }));
                    clearFieldError("password", setErrors);
                  }}
                />
                <InputRightElement>
                  <IconButton
                    display={formData.password ? "flex" : "none"}
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
              <FormErrorMessage>
                {getErrorMessage("password", errors)}
              </FormErrorMessage>
            </FormControl>

            {/* Input Confirm Password  */}
            <FormControl
              id="confirmPassword"
              isInvalid={!!getErrorMessage("confirmPassword", errors)}
            >
              <FormLabel>Confirmar Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  placeholder="Confirme su contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      confirmPassword: e.target.value,
                    }));
                    clearFieldError("confirmPassword", setErrors);
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
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    variant="link"
                    color="gray.500"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {getErrorMessage("confirmPassword", errors)}
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
              isLoading={isLoading}
            >
              Registrarse
            </Button>
          </Stack>
        </form>

        {/* Redirect Login  */}
        <Center mt={4}>
          <Link
            href="/login"
            style={{ textDecoration: "none", color: "rgba(81, 138, 62, 0.7)" }}
            textAlign={"center"}
            fontSize={{ base: "12px", md: "15px" }}
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </Center>
      </Box>
    </Box>
  );
}
