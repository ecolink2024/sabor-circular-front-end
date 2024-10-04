import { Button, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { FaHouseUser, FaUserPlus } from "react-icons/fa6";

export default function RightSection() {
  return (
    <HStack>
      {/* Desktop  */}
      <HStack display={{ base: "none", lg: "flex" }}>
        {/* Iniciar Sesion */}
        <Button
          borderRadius={"8.93px"}
          fontWeight={500}
          bg={"#344234"}
          color={"white"}
        >
          Iniciar Sesion
        </Button>

        {/* Registrarse */}
        <Button
          borderRadius={"8.93px"}
          fontWeight={500}
          bg={"#ea9b42"}
          color={"white"}
          leftIcon={<FaUserPlus />}
        >
          Registrarse
        </Button>
      </HStack>

      {/* Mobile  */}
      <HStack display={{ base: "flex", lg: "none" }}>
        {/* Iniciar Sesion mobile  */}
        <Tooltip label="Iniciar Sesión" hasArrow borderRadius={"4px"}>
          <IconButton
            icon={<FaHouseUser />}
            aria-label="iniciar-sesion-button"
            borderRadius={"8.93px"}
            bg={"#344234"}
            color={"white"}
          />
        </Tooltip>

        {/* Registrarse mobile  */}
        <Tooltip label="Registrarse" hasArrow>
          <IconButton
            icon={<FaUserPlus />}
            aria-label="registrarse-button"
            borderRadius={"8.93px"}
            fontWeight={500}
            bg={"#ea9b42"}
            color={"white"}
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
}
