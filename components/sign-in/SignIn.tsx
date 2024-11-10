"use client";
import { registerUser } from "@/lib/actions/actions";
import {
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
import { useRouter } from "next/navigation";
import { FaArrowLeftLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { getErrorMessage } from "@/lib/utils/utils";

export default function SignIn({
  registrationType = "casa",
}: {
  registrationType: "admin" | "casa" | "pg";
}) {
  // Chakra UI toast for displaying success or error messages
  const toast = useToast();

  // Next.js router for navigating between pages
  const router = useRouter();

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
  });

  // Boolean state to control the visibility of the loading spinner
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Boolean state to toggle password visibility in the input field
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
          title: "Registration successful.",
          description: "You have registered successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        router.push("/login");
      } else {
        // If there was an error in registration, check if a specific message was returned
        if (response.message === "El correo o telf ya está registrado.") {
          // Display specific error message in a toast if present
          toast({
            title: "Registration Error",
            description: response.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

        // Set validation errors to be displayed alongside form fields, if any
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
          Regístrate
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
                />
                <InputRightElement>
                  <IconButton
                    display={formData.password ? "flex" : "none"}
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
              <FormErrorMessage>
                {getErrorMessage("password", errors)}
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
              Regístrate
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
