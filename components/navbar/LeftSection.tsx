"use client";
import { useAuth } from "@/providers/AuthProvider";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBasketShopping, FaShop } from "react-icons/fa6";
import { MdGroups, MdInfo, MdOutlineMenu } from "react-icons/md";
import { RiRecycleFill } from "react-icons/ri";

export default function LeftSection() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const hrefTapercito = user
    ? user.role === "casa"
      ? `/dashboard/casa/${user._id}`
      : `/dashboard/admin/${user._id}`
    : "/login";

  const handleRedirect = (href: string) => {
    router.push(href);
  };

  const redirectHowItsWorks = () => {
    if (pathname === "/") {
      document
        .getElementById("how-its-work")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollToSection", "how-its-work");
      router.push("/");
    }
  };

  const redirectAttachedPremises = () => {
    if (pathname === "/") {
      document
        .getElementById("locales-adheridos")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollToSection", "locales-adheridos");
      router.push("/");
    }
  };

  return (
    <Stack
      display={"flex"}
      direction={"column"}
      flex={1}
      justify={"flex-start"}
    >
      {/* Logo  */}
      <Link href={"/"} passHref>
        <Box
          w={"100%"}
          h={"100%"}
          maxW={"140px"}
          maxH={"40px"}
          display={{ base: "none", lg: "block" }}
        >
          <Image
            src="/svg/logo-sabor-circular-nav.svg"
            alt="logo-sabor-circular"
            w={180}
          />
        </Box>
      </Link>

      {/* Menu mobile  */}
      <Menu>
        <MenuButton
          as={IconButton}
          w={"40px"}
          icon={<MdOutlineMenu fontSize={28} color={"#344234"} />}
          aria-label="-menu-icon-button"
          display={{ base: "flex", lg: "none" }}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          borderRadius={"8.93px"}
          variant={"unstyled"}
          position={"relative"}
          top={-1}
        >
          Actions
        </MenuButton>
        <MenuList
          borderRadius={"14px"}
          borderTopLeftRadius={"none"}
          display={{ base: "block", lg: "none" }}
          position={"relative"}
          left={2}
          bottom={3}
        >
          {/* ¡Quiero sumarme! */}
          <MenuItem
            icon={<FaBasketShopping color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
            display={
              user?.role === "punto" ||
              user?.role === "gastronomico" ||
              user?.role === "admin"
                ? "none"
                : user?.role === "casa"
                ? user?.code === undefined ||
                  user?.code === null ||
                  user?.code === ""
                  ? "block"
                  : "none"
                : "none"
            }
            onClick={() => handleRedirect(hrefTapercito)}
          >
            ¡Quiero sumarme!
          </MenuItem>

          {/* Puntos de retorno */}
          <MenuItem
            icon={<RiRecycleFill color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
            onClick={() => handleRedirect("/return-container")}
          >
            Puntos de retorno
          </MenuItem>

          {/* ¿Cómo funciona?  */}
          <MenuItem
            icon={<MdInfo color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
            onClick={redirectHowItsWorks}
          >
            <Link href={"/"}>¿Cómo funciona? </Link>
          </MenuItem>

          {/* Locales adheridos */}
          <MenuItem
            icon={<FaShop color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
            onClick={redirectAttachedPremises}
          >
            <Link href={"/"}>Locales adheridos</Link>
          </MenuItem>

          {/* Quiero ser local adherido */}
          <MenuItem
            icon={<MdGroups color="#ea9b42" fontSize={18} />}
            _hover={{ bg: "#fee1a5", color: "#ea9b42" }}
            onClick={() => handleRedirect("/contact")}
          >
            <Link href={"/"}>Quiero ser local adherido</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}
