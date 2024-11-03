"use client";
import { HStack } from "@chakra-ui/react";
import LeftSection from "./LeftSection";
import CenterSection from "./CenterSection";
import RightSection from "./RightSection";
import { usePathname } from "next/navigation";
import { getTokenFromPathname } from "@/lib/utils/utils";

export default function Navbar() {
  const pathname = usePathname();
  const token = getTokenFromPathname(pathname);

  return (
    <HStack
      w={"100%"}
      justify={"space-between"}
      h={{ base: "70px", lg: "90px" }}
      px={6}
      bg={"white"}
      shadow={"md"}
      display={
        pathname === "/signin" ||
        pathname === "/signin/pg" ||
        pathname === "/signin/admin" ||
        pathname === "/login/recovery-password" ||
        pathname === `/login/recovery-password/${token}` ||
        pathname === "/login"
          ? "none"
          : "flex"
      }
    >
      {/* Left section  */}
      <LeftSection />
      {/* Center section */}
      <CenterSection />
      {/* Right section  */}
      <RightSection />
    </HStack>
  );
}
