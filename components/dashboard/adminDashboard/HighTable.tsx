"use client";
import {
  Box,
  Heading,
  Input,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { formatDate } from "@/lib/utils/utils";
import { usePacksRequest } from "@/lib/hooks/usePacksRequest";
import { useAuth } from "@/providers/AuthProvider";

export default function HighTable() {
  const { token } = useAuth();
  const { packs, isLoading } = usePacksRequest(token);
  const [filter, setFilter] = useState<string>("");

  const filteredPacks = packs.filter((pack) =>
    pack?.userName?.toLowerCase().includes(filter.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Skeleton isLoaded={!isLoading} w={"100%"} borderRadius={"xl"}>
      <TableContainer
        w={"100%"}
        bg={"white"}
        borderRadius={"xl"}
        shadow={"md"}
        px={6}
        overflow={"hidden"}
      >
        {/* Heading Table */}
        <Box p={0} w={"100%"} my={8}>
          <Heading textAlign={"center"} fontSize={{ base: "2xl", lg: "4xl" }}>
            SUSCRIPCIONES
          </Heading>

          <Input
            mt={6}
            w={"100%"}
            borderRadius={"8.93px"}
            fontSize={"14px"}
            placeholder="Ingrese el nombre del usuario..."
            focusBorderColor="#518a3e"
            value={filter}
            onChange={handleInputChange}
          />
        </Box>

        {/* Table */}
        <Box
          overflowX="auto"
          mb={6}
          minH={"400px"}
          maxH={"400px"}
          borderTopRadius={"8.93px"}
        >
          <Table position={"sticky"}>
            {/* Head Table  */}
            <Thead bg="gray.100">
              <Tr>
                <Th textAlign={"center"}>Nombre</Th>
                <Th textAlign={"center"}>Fecha Transacción</Th>
                <Th textAlign={"center"}>Cantidad</Th>
                <Th textAlign={"center"}>Estado</Th>
                <Th textAlign={"center"}>N° de Transacción</Th>
              </Tr>
            </Thead>

            {/* Body Table */}
            <Tbody fontSize={{ base: "xs", lg: "sm" }}>
              {filteredPacks?.length > 0 ? (
                filteredPacks?.map((pack) => (
                  <Tr key={pack?._id}>
                    {/* User Name */}
                    <Td textAlign={"center"}>{pack?.userName ?? "-"}</Td>

                    {/* Fecha Transacción */}
                    <Td textAlign={"center"}>
                      {formatDate(pack?.paymentReceiveAt) ?? "-"}
                    </Td>

                    {/* Cantidad */}
                    <Td textAlign={"center"}>{pack?.quantity ?? "-"}</Td>

                    {/* Estado */}
                    <Td textAlign={"center"}>{pack?.action ?? "-"}</Td>

                    {/* N° de Transacción */}
                    <Td textAlign={"center"}>{pack?.paymentId ?? "-"}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    No hay resultados.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </Skeleton>
  );
}
