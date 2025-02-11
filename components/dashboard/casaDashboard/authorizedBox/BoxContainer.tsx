import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function BoxContainer({ children }: { children: ReactNode }) {
  return (
    <Box
      bg={"white"}
      w={"100%"}
      h={"100%"}
      maxW="md"
      minH={"md"}
      borderRadius="12px"
      display={"flex"}
      flexDirection={"column"}
      shadow={"lg"}
      p={6}
    >
      {children}
    </Box>
  );
}
