import { worksans } from "@/public/fonts/font";
import { Heading, VStack } from "@chakra-ui/react";
import InfiniteSlider from "../attached-premises/InfiniteSlider";
import { accompany } from "@/lib/data/data";

export default function Accompany() {
  return (
    <VStack gap={20}>
      <Heading
        color={"white"}
        position={"relative"}
        fontWeight={900}
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        className={worksans.className}
      >
        Acompañan
      </Heading>

      <InfiniteSlider image={accompany} />
      <InfiniteSlider image={accompany} />
    </VStack>
  );
}
