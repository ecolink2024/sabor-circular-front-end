import { createTransaction } from "@/lib/actions/actions";
import useSearchUserByCode from "@/lib/hooks/useSearchUserByCode";
import { TransactionResponse, ValidationError } from "@/lib/types/types";
import { clearFieldError, getErrorMessage } from "@/lib/utils/utils";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  VStack,
  List,
  ListItem,
  Spinner,
  IconButton,
  useToast,
  Skeleton,
  FormControl,
  FormErrorMessage,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PiWarningCircleDuotone } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

export default function TransactionTuppers({
  isLoadingUser,
  token,
  transactionType,
  url,
  userType,
}: {
  isLoadingUser: boolean;
  token: string | null;
  transactionType: "deposit" | "withdraw";
  url: string;
  userType: string | null;
}) {
  const {
    userCode,
    setUserCode,
    searchResults,
    isSearching,
    setSearchResults,
  } = useSearchUserByCode("", token);

  const toast = useToast();

  // State for the selected user
  const [user, setUser] = useState<{ code: string; name: string } | null>(null);

  // State for the tupper count
  const [tupperCount, setTupperCount] = useState<number | undefined>(undefined);

  // State to store validation errors for the form
  const [errors, setErrors] = useState<ValidationError[] | undefined>([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle user code selection
  const handleCodeSelect = (code: string, name: string) => {
    setUser({ code, name });
    setSearchResults([]);
  };

  // Handle transaction submission
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response: TransactionResponse = await createTransaction(
        {
          code: user?.code || "",
          tupperCount: tupperCount!,
          type: transactionType,
        },
        token,
        url
      );

      if (response.success) {
        toast({
          title: "Éxito",
          description: "Transacción creada con éxito.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setErrors([]);
        setUser(null);
        setUserCode("");
        setTupperCount(undefined);
      } else {
        if (response.message !== "Error de validación") {
          toast({
            title: "Error",
            description: `${response.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
            icon: <PiWarningCircleDuotone />,
          });
        }
        setErrors(response.errors);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear la transacción.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Skeleton
      isLoaded={!isLoadingUser}
      borderRadius={"20px"}
      w={"100%"}
      maxW={"400px"}
    >
      <Box
        as={Center}
        bg={"white"}
        shadow={"md"}
        w={"100%"}
        maxW={"400px"}
        h={"100%"}
        minH={"400px"}
        borderRadius={"20px"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        p={10}
        position={"relative"}
      >
        <Heading size={"lg"} textAlign={"center"}>
          {userType === "gastronomico"
            ? transactionType === "withdraw"
              ? "REPOSICION ♻️"
              : "CLIENTE 👤"
            : transactionType === "withdraw"
            ? "CLIENTE 👤"
            : "RECOLECCION ♻️"}
        </Heading>

        <Badge
          position={"absolute"}
          top={12}
          left={"50%"}
          transform="translateX(-50%)"
          borderRadius={"4px"}
          bg={
            userType === "gastronomico" ? "rgba(81, 138, 62, 0.20)" : "#FEEBCB"
          }
          color={userType === "gastronomico" ? "#518a3e" : "#744210"}
        >
          {userType}
        </Badge>

        <VStack w={"100%"} gap={4}>
          {!user ? (
            <>
              {/* Input for searching user code */}
              <FormControl
                id="code"
                isInvalid={!!getErrorMessage("code", errors)}
              >
                <Input
                  id="code"
                  focusBorderColor="#518a3e"
                  borderRadius={"8.93px"}
                  h={"40px"}
                  placeholder="Codigo Usuario"
                  value={userCode}
                  onChange={(e) => {
                    setUserCode(e.target.value);
                    clearFieldError("code", setErrors);
                  }}
                />
                <FormErrorMessage>
                  {getErrorMessage("code", errors)}
                </FormErrorMessage>
              </FormControl>
              {isSearching && <Spinner color="rgba(81, 138, 62, 0.7)" />}

              {/* Show search results */}
              {searchResults.length > 0 && !isSearching && (
                <List spacing={1} width="100%">
                  {searchResults.map((result) => (
                    <ListItem
                      key={result.code}
                      onClick={() => handleCodeSelect(result.code, result.name)}
                      cursor="pointer"
                      bg="gray.100"
                      p={2}
                      borderRadius="md"
                      _hover={{ bg: "gray.200" }}
                    >
                      {result.name}
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          ) : (
            <Box
              as={Center}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              py={2}
              pr={2}
              pl={3}
              border={"1px"}
              h={"40px"}
              w={"100%"}
              borderRadius={"8.93px"}
              borderColor={"gray.200"}
              textAlign={"start"}
            >
              {user?.code}
              <IconButton
                size={"xs"}
                icon={<RxCross2 />}
                aria-label="change-user"
                onClick={() => {
                  setUser(null);
                  setUserCode("");
                }}
              />
            </Box>
          )}
          <FormControl
            id="tupperCount"
            isInvalid={!!getErrorMessage("tupperCount", errors)}
          >
            <Input
              id="tupperCount"
              focusBorderColor="#518a3e"
              type="number"
              placeholder="Cantidad de envases"
              borderRadius={"8.93px"}
              h={"40px"}
              value={tupperCount || ""}
              onChange={(e) => {
                setTupperCount(Number(e.target.value));
                clearFieldError("tupperCount", setErrors);
              }}
              required
            />

            <FormErrorMessage>
              {getErrorMessage("tupperCount", errors)}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Button
          type="submit"
          isLoading={isLoading}
          onClick={handleSubmit}
          bg={userType === "gastronomico" ? "#518a3e" : "#FEBB5F"}
          _hover={{ bg: "gray.300" }}
          borderRadius={"8.93px"}
          color={"white"}
          size="md"
          width="full"
        >
          Registrar
        </Button>
      </Box>
    </Skeleton>
  );
}
