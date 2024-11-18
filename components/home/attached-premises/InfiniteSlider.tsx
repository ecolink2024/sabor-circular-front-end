"use client";
import { infiniteSlider } from "@/lib/types/types";
import { scrollAnimation } from "@/lib/utils/utils";
import { Box, HStack, Link, Image } from "@chakra-ui/react";
interface InfiniteSliderProps {
  image: infiniteSlider[];
  isBorder?: boolean;
}

export default function InfiniteSlider({
  image,
  isBorder,
}: InfiniteSliderProps) {
  return (
    <HStack
      justify={"flex-start"}
      align={"center"}
      w={"100%"}
      maxW={"1350px"}
      position={"relative"}
      overflow={"hidden"}
      mt={"100px"}
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
              border={isBorder ? "1px solid" : "none"}
              borderColor={"gray.100"}
              borderRadius={"20px"}
              px={8}
              py={3}
            >
              <Link
                isExternal
                cursor={isBorder ? "pointer" : "default"}
                href={isBorder ? logo.link : null}
                w={"200px"}
                display="inline-block"
                py={4}
              >
                <Image
                  src={logo.svg}
                  width={200}
                  height={"auto"}
                  maxH={"150px"}
                  alt={logo.tooltip}
                  style={{
                    flexShrink: 0,
                    objectFit: "contain",
                  }}
                  borderRadius={"20px"}
                />
              </Link>
            </Box>
          ))}
      </HStack>
    </HStack>
  );
}
