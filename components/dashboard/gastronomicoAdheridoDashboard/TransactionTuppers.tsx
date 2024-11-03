import { createTransaction } from "@/lib/actions/actions";
import useSearchUserByCode from "@/lib/hooks/useSearchUserByCode";
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function TransactionTuppers({
  isLoadingUser,
  token,
  transactionType,
  url,
}: {
  isLoadingUser: boolean;
  token: string | null;
  transactionType: "deposit" | "withdraw";
  url: string;
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

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle user code selection
  const handleCodeSelect = (code: string, name: string) => {
    setUser({ code, name });
    setSearchResults([]);
  };

  // Handle transaction submission
  const handleSubmit = async () => {
    if (!user || !tupperCount || tupperCount <= 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona un usuario y una cantidad válida.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      await createTransaction(
        {
          code: user.code,
          tupperCount: tupperCount,
          type: transactionType,
        },
        token,
        url
      );

      toast({
        title: "Éxito",
        description: "Transacción creada con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setUser(null);
      setUserCode("");
      setTupperCount(undefined);
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
      >
        <Heading size={"lg"}>
          {transactionType === "deposit" ? "Ingreso Tuppers" : "Egreso Tuppers"}
        </Heading>
        <VStack w={"100%"} gap={4}>
          {!user ? (
            <>
              {/* Input for searching user code */}
              <Input
                borderRadius={"8.93px"}
                h={"40px"}
                id="user-code"
                placeholder="Codigo Usuario"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
              />
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
          <Input
            id="tupper-count"
            type="number"
            placeholder="Cantidad"
            borderRadius={"8.93px"}
            h={"40px"}
            value={tupperCount || ""}
            onChange={(e) => setTupperCount(Number(e.target.value))}
            required
          />
        </VStack>
        <Button
          type="submit"
          isLoading={isLoading}
          onClick={handleSubmit}
          bg={"rgba(81, 138, 62, 0.7)"}
          _hover={{ bg: "gray.300" }}
          borderRadius={"8.93px"}
          color={"white"}
          size="md"
          width="full"
        >
          Actualizar
        </Button>
      </Box>
    </Skeleton>
  );
}
