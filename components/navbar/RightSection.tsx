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
  Skeleton,
} from "@chakra-ui/react";
import { FaHouseUser, FaUserPlus } from "react-icons/fa6";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { FaUserCog } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { PiUserList } from "react-icons/pi";
import { getUserType } from "@/lib/utils/utils";
// import { sendGAEvent } from "@next/third-parties/google";

export default function RightSection() {
  const { token, logout, user, isLoading, userRole } = useAuth();

  const role = getUserType(userRole);

  const handleLogout = () => {
    logout();
  };

  return (
    <HStack flex={1} justify={"flex-end"}>
      {/* Si el usuario no está autenticado */}
      <HStack display={token ? "none" : { base: "none", lg: "flex" }}>
        {/* Iniciar Sesión */}
        <Link href="/login" passHref>
          <Skeleton isLoaded={!isLoading} borderRadius={"12px"}>
            <Button
              borderRadius={"12px"}
              fontWeight={500}
              bg={"#518a3e"}
              _hover={{ bg: "gray.300" }}
              color={"white"}
              h={"37px"}
              fontSize={"13px"}
            >
              Iniciar Sesión
            </Button>
          </Skeleton>
        </Link>

        {/* Registrarse */}
        <Link href="/signin" passHref>
          <Skeleton isLoaded={!isLoading} borderRadius={"12px"}>
            <Button
              borderRadius={"12px"}
              fontWeight={500}
              bg={"#ea9b42"}
              _hover={{ bg: "gray.300" }}
              color={"white"}
              leftIcon={<FaUserPlus />}
              h={"37px"}
              fontSize={"13px"}
              // onClick={() =>
              //   sendGAEvent({
              //     event: "buttonClicked",
              //     value: process.env.NEXT_PUBLIC_GA_ID,
              //   })
              // }
            >
              Registrarse
            </Button>
          </Skeleton>
        </Link>
      </HStack>

      {/* Versión móvil si no está autenticado */}
      <HStack display={token ? "none" : { base: "flex", lg: "none" }}>
        <Link href="/login" passHref>
          <Skeleton isLoaded={!isLoading} borderRadius={"10px"}>
            <IconButton
              icon={<FaHouseUser />}
              aria-label="iniciar-sesion-button"
              borderRadius={"10px"}
              bg={"#518a3e"}
              _hover={{ bg: "gray.300" }}
              color={"white"}
            />
          </Skeleton>
        </Link>

        <Link href="/signin" passHref>
          <Skeleton isLoaded={!isLoading} borderRadius={"10px"}>
            <IconButton
              icon={<FaUserPlus />}
              aria-label="registrarse-button"
              borderRadius={"10px"}
              fontWeight={500}
              bg={"#ea9b42"}
              _hover={{ bg: "gray.300" }}
              color={"white"}
              // onClick={() =>
              //   sendGAEvent({
              //     event: "buttonClicked",
              //     value: process.env.NEXT_PUBLIC_GA_ID,
              //   })
              // }
            />
          </Skeleton>
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
            <Skeleton isLoaded={!isLoading} borderRadius={"full"}>
              <Avatar bg="#febb5e" icon={<PiUserList fontSize="1.5rem" />} />
            </Skeleton>
          </MenuButton>

          <MenuList position={"relative"} bottom={1}>
            <MenuGroup title="Perfil">
              <Link
                href={`/dashboard/${
                  role === "hibrido" ? "gastronomico" : role
                }/${user?._id}`}
                passHref
              >
                <MenuItem icon={<MdDashboardCustomize color="#ea9b42" />}>
                  Mi cuenta
                </MenuItem>
              </Link>
              <Link href={`/perfil`} passHref>
                <MenuItem icon={<FaUserCog color="#ea9b42" />}>
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
