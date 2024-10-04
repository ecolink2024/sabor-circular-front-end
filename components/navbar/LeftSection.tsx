import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import { MdGroups, MdInfo, MdOutlineMenu } from "react-icons/md";
import { RiRecycleFill } from "react-icons/ri";

export default function LeftSection() {
  return (
    <Stack>
      {/* Logo  */}
      <Text
        fontSize={"lg"}
        fontWeight={900}
        color={"#344234"}
        display={{ base: "none", lg: "block" }}
      >
        SABOR CIRCULAR
      </Text>

      {/* Menu mobile  */}
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<MdOutlineMenu fontSize={28} color={"#344234"} />}
          aria-label="-menu-icon-button"
          display={{ base: "flex", lg: "none" }}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          borderRadius={"8.93px"}
          variant={"unstyled"}
        >
          Actions
        </MenuButton>
        <MenuList
          borderRadius={"14px"}
          borderTopLeftRadius={"none"}
          display={{ base: "block", md: "none" }}
        >
          {/* Ordena tu comida */}
          <MenuItem
            icon={<FaBasketShopping color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
          >
            <Link href={"/"}>Ordena tu comida</Link>
          </MenuItem>

          {/* Retorna tu envase */}
          <MenuItem
            icon={<RiRecycleFill color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
          >
            <Link href={"/"}>Retorna tu envase</Link>
          </MenuItem>

          {/* Cómo funciona */}
          <MenuItem
            icon={<MdInfo color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
          >
            <Link href={"/"}>Cómo funciona</Link>
          </MenuItem>

          {/* Quiero ser local adherido */}
          <MenuItem
            icon={<MdGroups color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
          >
            <Link href={"/"}>Quiero ser local adherido</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}
