import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { FaHouseUser, FaUserPlus } from "react-icons/fa6";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { AiOutlineUser } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { SkeletonUser } from "../skeletons/Skeletons";

export default function RightSection() {
  const { token, logout, user, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <SkeletonUser />;
  }

  return (
    <HStack>
      {/* Si el usuario no está autenticado */}
      <HStack display={token ? "none" : { base: "none", lg: "flex" }}>
        {/* Iniciar Sesión */}
        <Link href="/login" passHref>
          <Button
            borderRadius={"8.93px"}
            fontWeight={500}
            bg={"#518a3e"}
            _hover={{ bg: "gray.300" }}
            color={"white"}
          >
            Iniciar Sesión
          </Button>
        </Link>

        {/* Registrarse */}
        <Link href="/signin" passHref>
          <Button
            borderRadius={"8.93px"}
            fontWeight={500}
            bg={"#ea9b42"}
            _hover={{ bg: "gray.300" }}
            color={"white"}
            leftIcon={<FaUserPlus />}
          >
            Registrarse
          </Button>
        </Link>
      </HStack>

      {/* Versión móvil si no está autenticado */}
      <HStack display={token ? "none" : { base: "flex", lg: "none" }}>
        <Link href="/login" passHref>
          <Tooltip label="Iniciar Sesión" hasArrow borderRadius={"4px"}>
            <IconButton
              icon={<FaHouseUser />}
              aria-label="iniciar-sesion-button"
              borderRadius={"8.93px"}
              bg={"#518a3e"}
              _hover={{ bg: "gray.300" }}
              color={"white"}
            />
          </Tooltip>
        </Link>

        <Link href="/signin" passHref>
          <Tooltip label="Registrarse" hasArrow>
            <IconButton
              icon={<FaUserPlus />}
              aria-label="registrarse-button"
              borderRadius={"8.93px"}
              fontWeight={500}
              bg={"#ea9b42"}
              _hover={{ bg: "gray.300" }}
              color={"white"}
            />
          </Tooltip>
        </Link>
      </HStack>

      {/* Mostrar solo si está autenticado */}
      <Flex display={token ? "flex" : "none"}>
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
          >
            <Avatar
              size="md"
              bg="#febb5e"
              icon={<AiOutlineUser fontSize="1.5rem" />}
            />
          </MenuButton>

          <MenuList>
            <MenuGroup title="Perfil">
              <Link href={`/dashboard/${user?.role}/${user?._id}`} passHref>
                <MenuItem icon={<FaUserCog color="#ea9b42" />}>
                  Mi cuenta
                </MenuItem>
              </Link>
              <Link href={`/perfil`} passHref>
                <MenuItem icon={<MdDashboardCustomize color="#ea9b42" />}>
                  Datos cuenta
                </MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="">
              <MenuItem
                icon={<BiSolidLogOutCircle color="#ea9b42" />}
                onClick={handleLogout}
              >
                Cerrar sesión
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
}
