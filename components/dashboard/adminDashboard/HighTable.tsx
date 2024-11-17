"use client";
import { useUnauthorizedPacks } from "@/lib/hooks/useUnauthorizedPacks";
import { UnauthorizedPack } from "@/lib/types/types";
import { useAuth } from "@/providers/AuthProvider";
import {
  Button,
  Heading,
  Input,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonViewImage from "./ButtonViewImage";
import { authorizePack } from "@/lib/actions/actions";

export default function HighTable() {
  const toast = useToast();
  const { token } = useAuth();
  const { packs, isLoading, refetch } = useUnauthorizedPacks(token);
  const [filter, setFilter] = useState<string>("");
  const [isAuthorizing, setIsAuthorizing] = useState<{
    [key: string]: boolean;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleAuthorize = async (packId: string) => {
    setIsAuthorizing((prev) => ({ ...prev, [packId]: true }));
    try {
      await authorizePack(packId, token);
      refetch();

      toast({
        title: "Pack autorizado",
        description: "El pack ha sido autorizado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al autorizar el pack.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsAuthorizing((prev) => ({ ...prev, [packId]: false }));
    }
  };

  const filteredPacks = packs?.filter((pack: UnauthorizedPack) =>
    pack?.userId?.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Skeleton isLoaded={!isLoading} borderRadius={"20px"} w={"100%"}>
      <VStack
        w={"100%"}
        gap={10}
        p={10}
        borderRadius={"20px"}
        bg={"white"}
        shadow={"md"}
      >
        <Heading size={"xl"}>SOLICITUD DE PACKS</Heading>
        {/* Input para filtrar por email */}
        <Input
          id="search-packs"
          w={"100%"}
          placeholder="Ingrese el email..."
          value={filter}
          onChange={handleInputChange}
        />

        {/* Table High */}
        <TableContainer w={"100vw"} h={"450px"}>
          <Table display={"block"} variant={"simple"}>
            {/* Head Table  */}
            <Thead
              style={{ tableLayout: "fixed" }}
              display={"table"}
              w={"100%"}
              minW={"900px"}
            >
              <Tr>
                <Th>Nombre</Th>
                <Th>Fecha Solicitud</Th>
                <Th textAlign={"center"}>Cantidad de Tuppers</Th>
                <Th textAlign={"center"}>Comprobante</Th>
                <Th>Validar Comprobante</Th>
              </Tr>
            </Thead>
            {/* Body Table  */}
            <Tbody
              display={"block"}
              w={"100%"}
              minW={"900px"}
              h={"calc(450px - 40px)"}
              overflowY={"scroll"}
            >
              {filteredPacks?.map((pack: UnauthorizedPack, index) => (
                <Tr
                  key={index}
                  w={"100%"}
                  lineHeight={"17.71px"}
                  display={"table"}
                  sx={{
                    tableLayout: "fixed",
                  }}
                  fontSize={"xs"}
                >
                  {/* Nombre */}
                  <Td>{pack.userId?.name}</Td>

                  {/* Fecha Solicitud */}
                  <Td textAlign={"center"}>
                    <Tooltip label={pack?.createdAt}>
                      <Text
                        isTruncated
                        maxWidth={"13ch"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {pack?.createdAt}
                      </Text>
                    </Tooltip>
                  </Td>

                  {/* Cantidad de Tuppers */}
                  <Td textAlign={"center"}>{pack?.tupperAmount}</Td>

                  {/* Comprobante */}
                  <Td textAlign={"center"}>
                    <ButtonViewImage fileUrl={pack?.fileUrl} />
                  </Td>

                  {/* Botón para "Alta" */}
                  <Td>
                    <Button
                      w={"100%"}
                      borderRadius={"8.93px"}
                      bg={"#344234"}
                      color={"white"}
                      onClick={() => handleAuthorize(pack._id)}
                      isLoading={isAuthorizing[pack._id]}
                    >
                      Alta
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Skeleton>
  );
}
