import { worksans } from "@/public/fonts/font";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import InfiniteSlider from "./InfiniteSlider";
import { attachedPremises } from "@/lib/data/data";

export default function AttachedPremises() {
  return (
    <Stack
      w={{ base: "100%", lg: "95%" }}
      bg={"white"}
      pt={"100px"}
      display={"flex"}
      align={"center"}
      overflow={"hidden"}
    >
      <Heading
        color={"#344234"}
        position={"relative"}
        fontWeight={900}
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        className={worksans.className}
      >
        Locales Adheridos
      </Heading>

      <VStack gap={20} my={"100px"}>
        <InfiniteSlider image={attachedPremises} />
        <InfiniteSlider image={attachedPremises} />
      </VStack>
    </Stack>
  );
}
