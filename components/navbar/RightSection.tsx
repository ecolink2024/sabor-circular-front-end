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
import { useAuth } from "@/providers/AuthProvider";
import { FaUserCog } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { PiUserList } from "react-icons/pi";
import { getUserType } from "@/lib/utils/utils";
import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";

export default function RightSection() {
  const router = useRouter();
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
        <Skeleton isLoaded={!isLoading} borderRadius={"12px"}>
          <Button
            borderRadius={"12px"}
            fontWeight={500}
            bg={"#518a3e"}
            _hover={{ bg: "gray.300" }}
            color={"white"}
            h={"37px"}
            fontSize={"13px"}
            onClick={() => router.push("/login")}
          >
            Iniciar Sesión
          </Button>
        </Skeleton>

        {/* Registrarse */}

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
            onClick={() => {
              router.push("/signin"),
                sendGAEvent({
                  event: "buttonClicked",
                  value: "M023XH03J1",
                });
            }}
          >
            Registrarse
          </Button>
        </Skeleton>
      </HStack>

      {/* Versión móvil si no está autenticado */}
      <HStack display={token ? "none" : { base: "flex", lg: "none" }}>
        <Skeleton isLoaded={!isLoading} borderRadius={"10px"}>
          <IconButton
            icon={<FaHouseUser />}
            aria-label="iniciar-sesion-button"
            borderRadius={"10px"}
            bg={"#518a3e"}
            _hover={{ bg: "gray.300" }}
            color={"white"}
            onClick={() => router.push("/login")}
          />
        </Skeleton>

        <Skeleton isLoaded={!isLoading} borderRadius={"10px"}>
          <IconButton
            icon={<FaUserPlus />}
            aria-label="registrarse-button"
            borderRadius={"10px"}
            fontWeight={500}
            bg={"#ea9b42"}
            _hover={{ bg: "gray.300" }}
            color={"white"}
            onClick={() => {
              router.push("/signin"),
                sendGAEvent({
                  event: "buttonClicked",
                  value: "M023XH03J1",
                });
            }}
          />
        </Skeleton>
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

          <MenuList position={"relative"} bottom={1} zIndex={999}>
            <MenuGroup title="Perfil">
              <MenuItem
                icon={<MdDashboardCustomize color="#ea9b42" />}
                onClick={() =>
                  router.push(
                    `/dashboard/${role === "hibrido" ? "gastronomico" : role}/${
                      user?._id
                    }`
                  )
                }
              >
                Mi cuenta
              </MenuItem>

              <MenuItem
                icon={<FaUserCog color="#ea9b42" />}
                onClick={() => router.push("/perfil")}
              >
                Datos cuenta
              </MenuItem>
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
