"use client";
import { Center, HStack, Stack } from "@chakra-ui/react";
import LeftSection from "./LeftSection";
import CenterSection from "./CenterSection";
import RightSection from "./RightSection";
import { usePathname } from "next/navigation";
import { getTokenFromPathname } from "@/lib/utils/utils";

export default function Navbar() {
  const pathname = usePathname();
  const token = getTokenFromPathname(pathname);

  const display = [
    "/signin",
    "/signin/pg",
    "/signin/admin",
    "/login/recovery-password",
    `/login/recovery-password/${token}`,
    "/login",
  ].includes(pathname)
    ? "none"
    : "flex";

  return (
    <Stack
      as={Center}
      w={"100%"}
      display={display}
      px={{ base: 1, lg: 4 }}
      mt={pathname !== "/" ? "10px" : "0px"}
      position={pathname !== "/" ? "static" : "sticky"}
      top={"10px"}
      zIndex={"1999"}
    >
      <HStack
        w={"100%"}
        h={"70px"}
        bg={"white"}
        borderRadius={"20px"}
        justify={"space-between"}
        pl={4}
        pr={3}
        shadow={"sm"}
      >
        {/* Left Section */}
        <LeftSection />

        {/* Center Section */}
        <CenterSection />

        {/* Right section  */}
        <RightSection />
      </HStack>
    </Stack>
  );
}
