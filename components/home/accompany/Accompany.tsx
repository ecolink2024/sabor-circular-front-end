import { worksans } from "@/public/fonts/font";
import { Heading, VStack } from "@chakra-ui/react";
import InfiniteSlider from "../attached-premises/InfiniteSlider";
import { accompany } from "@/lib/data/data";

export default function Accompany() {
  return (
    <VStack py={"150px"} bg={"#344234"} w={"100%"}>
      <Heading
        color={"white"}
        position={"relative"}
        fontWeight={900}
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        className={worksans.className}
      >
        Acompañan
      </Heading>

      <InfiniteSlider image={accompany} />
    </VStack>
  );
}
