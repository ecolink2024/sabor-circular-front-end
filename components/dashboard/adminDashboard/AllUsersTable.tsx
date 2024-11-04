import { useUsersData } from "@/lib/hooks/useUsersData";
import { User } from "@/lib/types/types";
import { useAuth } from "@/providers/AuthProvider";
import {
  Skeleton,
  VStack,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import DeleteUserByAdmin from "./DeleteUserByAdmin";

export default function AllUsersTable() {
  const { token } = useAuth();
  const { isLoading, users, refetch } = useUsersData(token);
  const [filter, setFilter] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredUser = users?.filter((user: User) =>
    user.email?.toLowerCase().includes(filter.toLowerCase())
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
        <Heading size={"xl"}>USUARIOS</Heading>
        {/* Input para filtrar por email */}
        <Input
          w={"100%"}
          placeholder="Ingrese el email..."
          value={filter}
          onChange={handleInputChange}
        />
        {/* Table High */}
        <TableContainer w={"100%"} h={"450px"} overflowY={"hidden"}>
          <Table display={"block"} variant={"simple"}>
            {/* Head Table  */}
            <Thead
              style={{ tableLayout: "fixed" }}
              display={"table"}
              w={"100%"}
            >
              <Tr>
                <Th>Nombre</Th>
                <Th>Codigo</Th>
                <Th textAlign={"center"}>Tipo de Usuario</Th>
                <Th>Fecha de alta</Th>
                <Th textAlign={"center"}>
                  Cantidad de <br /> Tuppers
                </Th>
                <Th>Email</Th>
                <Th>Telefono</Th>
                <Th>Eliminar usuario</Th>
              </Tr>
            </Thead>
            {/* Body Table  */}
            <Tbody
              display={"block"}
              w={"100%"}
              h={"calc(450px - 40px)"}
              overflowY={"scroll"}
            >
              {filteredUser?.map((user) => (
                <Tr
                  key={user._id}
                  w={"100%"}
                  lineHeight={"17.71px"}
                  display={"table"}
                  sx={{
                    tableLayout: "fixed",
                  }}
                  fontSize={"xs"}
                >
                  <Td>
                    <Tooltip label={user.name}>
                      <Text
                        isTruncated
                        maxWidth={"13ch"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {user.name}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td textAlign={user.code ? "start" : "center"}>
                    {user.code || "__"}
                  </Td>
                  <Td textAlign={"center"}>{user.role}</Td>
                  <Td textAlign={"center"}>
                    <Tooltip label={user.createdAt}>
                      <Text
                        isTruncated
                        maxWidth={"13ch"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {user.createdAt}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td textAlign={"center"}>{user.tupperCount}</Td>
                  <Td>
                    <Tooltip label={user.email}>
                      <Text
                        isTruncated
                        maxWidth={"13ch"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {user.email}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td textAlign={"center"}>{user.phone}</Td>
                  <Td>
                    <DeleteUserByAdmin
                      userName={user.name}
                      userId={user._id}
                      refetch={refetch}
                    />
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
