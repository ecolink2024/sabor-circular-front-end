"use client";
import { infiniteSlider } from "@/lib/types/types";
import { scrollAnimation } from "@/lib/utils/utils";
import { Box, HStack, Link, Image } from "@chakra-ui/react";
interface InfiniteSliderProps {
  image: infiniteSlider[];
}

export default function InfiniteSliderAttch({ image }: InfiniteSliderProps) {
  return (
    <HStack
      justify={"flex-start"}
      align={"center"}
      w={"100%"}
      maxW={"1350px"}
      position={"relative"}
      overflow={"hidden"}
      mt={"100px"}
      mb={"60px"}
    >
      <HStack
        as="div"
        spacing={10}
        animation={`${scrollAnimation} 300s linear infinite`}
        display={"inline-flex"}
        minW={"fit-content"}
      >
        {new Array(10)
          .fill(image)
          .flat()
          .map((logo, ix) => (
            <Box
              key={ix}
              border={"1px solid"}
              borderColor={"gray.100"}
              borderRadius={"20px"}
              px={8}
              py={3}
            >
              <Link
                isExternal
                href={logo.link}
                w="200px"
                py={4}
                display="inline-block"
              >
                <Box
                  w="200px"
                  h="80px"
                  borderRadius="20px"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                >
                  <Image
                    src={logo.svg}
                    alt={logo.tooltip}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
              </Link>
            </Box>
          ))}
      </HStack>
    </HStack>
  );
}
