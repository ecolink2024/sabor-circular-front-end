"use client";
import { infiniteSlider } from "@/lib/types/types";
import { scrollAnimation } from "@/lib/utils/utils";
import { HStack, Link } from "@chakra-ui/react";
import Image from "next/image";
interface InfiniteSliderProps {
  image: infiniteSlider[];
}

export default function InfiniteSlider({ image }: InfiniteSliderProps) {
  return (
    <HStack
      justify={"flex-start"}
      align={"center"}
      w={"100%"}
      maxW={"1100px"}
      position={"relative"}
      overflow={"hidden"}
    >
      <HStack
        as="div"
        spacing={10}
        animation={`${scrollAnimation} 30s linear infinite`}
        display={"inline-flex"}
        minW={"fit-content"}
      >
        {image.concat(image).map((logo, ix) => (
          <Link key={ix} isExternal href={logo.link} w={"200px"} h={"100px"}>
            <Image
              key={ix}
              src={logo.svg}
              width={200}
              height={100}
              alt={logo.tooltip}
              style={{ flexShrink: 0 }}
            />
          </Link>
        ))}
      </HStack>
    </HStack>
  );
}
