"use client";
import { infiniteSlider } from "@/lib/types/types";
import { scrollAnimation } from "@/lib/utils/utils";
import { HStack, Link, Image } from "@chakra-ui/react";

interface InfiniteSliderProps {
  images: infiniteSlider[];
  repetitions?: number;
}

export default function InfiniteSlider({
  images,
  repetitions = 10,
}: InfiniteSliderProps) {
  return (
    <HStack
      justify="flex-start"
      align="center"
      w="100%"
      maxW="1350px"
      position="relative"
      overflow="hidden"
      mt="100px"
    >
      <HStack
        as="div"
        spacing={14}
        animation={`${scrollAnimation} 300s linear infinite`}
        display="inline-flex"
        minW="fit-content"
      >
        {Array.from({ length: repetitions })
          .flatMap(() => images)
          .map((logo, ix) => (
            <Link
              key={ix}
              isExternal
              href={logo.link || "#"}
              w="200px"
              display="inline-block"
              py={4}
            >
              <Image
                src={logo.svg}
                boxSize="180px"
                objectFit="contain"
                alt={logo.tooltip || "Image"}
              />
            </Link>
          ))}
      </HStack>
    </HStack>
  );
}
