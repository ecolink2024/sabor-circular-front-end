import { HStack } from "@chakra-ui/react";
import LeftSection from "./LeftSection";
import CenterSection from "./CenterSection";
import RightSection from "./RightSection";

export default function Navbar() {
  return (
    <HStack
      w={"100%"}
      justify={"space-between"}
      h={{ base: "70px", lg: "90px" }}
      px={6}
      bg={"white"}
      shadow={"md"}
    >
      {/* left section  */}
      <LeftSection />
      {/* center section */}
      <CenterSection />
      {/* right section  */}
      <RightSection />
    </HStack>
  );
}
