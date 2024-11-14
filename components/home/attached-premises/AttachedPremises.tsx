import { worksans } from "@/public/fonts/font";
import { Box, Heading, Stack } from "@chakra-ui/react";
import InfiniteSlider from "./InfiniteSlider";
import { attachedPremises } from "@/lib/data/data";

export default function AttachedPremises() {
  return (
    <Stack
      w={"100%"}
      bg={"white"}
      pt={"100px"}
      display={"flex"}
      align={"center"}
      overflow={"hidden"}
      id="locales-adheridos"
    >
      <Heading
        color={"#344234"}
        position={"relative"}
        fontWeight={900}
        fontSize={{ base: "2xl", md: "4xl", lg: "4xl" }}
        className={worksans.className}
      >
        Locales Adheridos
      </Heading>

      <InfiniteSlider isBorder image={attachedPremises} />

      {/* Divider  */}
      <Stack w={"100%"} h={"100px"} bg={"#344234"}>
        <Box h={"70%"} borderBottomRadius={"50px"} bg={"white"} />
      </Stack>
    </Stack>
  );
}
