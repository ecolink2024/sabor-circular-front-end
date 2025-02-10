"use client";
import { useUsersAndPackData } from "@/lib/hooks/useUsersAndPackData";
import { UserAndPack } from "@/lib/types/types";
import { useAuth } from "@/providers/AuthProvider";
import {
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Tooltip,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import DeleteUserByAdmin from "./DeleteUserByAdmin";
import { formatDate, isExpiringOrExpired } from "@/lib/utils/utils";

export default function AllUsersTable() {
  const { token } = useAuth();
  const { users, refetch, isLoading } = useUsersAndPackData(token);
  const [filter, setFilter] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users?.filter((user: UserAndPack) =>
    user.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Skeleton isLoaded={!isLoading} w={"100%"} borderRadius={"xl"}>
      <TableContainer
        px={6}
        w={"100%"}
        bg={"white"}
        shadow={"md"}
        borderRadius={"xl"}
        overflow={"hidden"}
      >
        {/* Heading Table */}
        <Box p={0} w={"100%"} my={8}>
          <Heading textAlign={"center"} fontSize={{ base: "2xl", lg: "4xl" }}>
            LISTADO DE USUARIOS
          </Heading>

          <Input
            mt={6}
            w={"100%"}
            fontSize={"14px"}
            borderRadius={"8.93px"}
            placeholder="Buscar por email..."
            focusBorderColor="#518a3e"
            value={filter}
            onChange={handleInputChange}
          />
        </Box>

        <Box
          overflowX="auto"
          borderTopRadius={"8.93px"}
          mb={6}
          minH={"400px"}
          maxH={"400px"}
        >
          <Table position={"sticky"}>
            {/* Head Table  */}
            <Thead bg="gray.100">
              <Tr>
                <Th>Nombre</Th>
                <Th>Código</Th>
                <Th>Tipo de Usuario</Th>
                <Th>Fecha de Suscripción</Th>
                <Th>Cantidad de Tuppers</Th>
                <Th>Email</Th>
                <Th>Teléfono</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>

            {/* Body Table */}
            <Tbody fontSize={{ base: "xs", lg: "sm" }}>
              {filteredUsers && filteredUsers?.length > 0 ? (
                filteredUsers.map((user) => (
                  <Tr key={user?.userId}>
                    {/* Nombre */}
                    <Td>{user?.name ?? "-"}</Td>

                    {/* Código de Usuario */}
                    <Td textAlign={user?.pack?.code ? "start" : "center"}>
                      {user?.pack?.code || "-"}
                    </Td>

                    {/* Tipo de Usuario */}
                    <Td textAlign={"center"}>{user?.role ?? "-"}</Td>

                    {/* Fecha de Suscripcion */}
                    <Td
                      textAlign={"center"}
                      color={
                        user?.role?.includes("casa") &&
                        isExpiringOrExpired(user.pack.authorizedAt)
                          ? "red.500"
                          : "inherit"
                      }
                    >
                      {formatDate(user.pack.authorizedAt) ?? "-"}
                    </Td>

                    {/* Cantidad de Tuppers */}
                    <Td textAlign={"center"}>
                      {user?.pack?.tupperMount ?? "-"}
                    </Td>

                    {/* Email */}
                    <Tooltip
                      label={user?.email ?? "-"}
                      placement="top"
                      top={"20px"}
                      borderRadius={"4px"}
                    >
                      <Td
                        isTruncated
                        maxWidth="13ch"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {user?.email ?? "-"}
                      </Td>
                    </Tooltip>

                    {/* Teléfono */}
                    <Td>{user?.phone ?? "-"}</Td>

                    {/* Botón de Eliminar */}
                    <Td>
                      <DeleteUserByAdmin
                        userName={user?.name}
                        userId={user?.userId}
                        refetch={refetch}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    No hay usuarios disponibles.
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
