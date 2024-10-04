import { HStack } from "@chakra-ui/react";
import LeftSection from "./LeftSection";
import CenterSection from "./CenterSection";
import RightSection from "./RightSection";

export default function Navbar() {
  return (
    <HStack
      bg={"#FEBB5E"}
      w={"100%"}
      justify={"space-between"}
      h={"80px"}
      px={4}
      shadow={"md"}
      // position={'fixed'}
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
