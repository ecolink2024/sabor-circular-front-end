"use client";
import { getUserType } from "@/lib/utils/utils";
import { useAuth } from "@/providers/AuthProvider";
import {
  Heading,
  Text,
  Flex,
  Button,
  Box,
  Stack,
  Image,
} from "@chakra-ui/react";
import { sendGAEvent } from "@next/third-parties/google";

export default function TitleAndDescription() {
  const { user, userRole } = useAuth();

  const role = getUserType(userRole);

  const redirectHowItsWorks = () => {
    document
      .getElementById("how-its-work")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Flex
      w={"100%"}
      height={{ base: "auto", lg: "calc(100vh - 80px)" }}
      gap={0}
      direction={"column"}
    >
      <Flex direction={{ base: "column", lg: "row" }} h={"100%"}>
        {/* Heading and Description */}
        <Flex
          flex={1}
          h={"100%"}
          direction={"column"}
          gap={{ base: 3, lg: 6 }}
          pl={{ base: 0, lg: 28 }}
          pt={{ base: 10, lg: 0 }}
          justify={"center"}
          align={{ base: "center", lg: "flex-start" }}
        >
          <Heading
            as={"h1"}
            fontWeight={"black"}
            fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
            color={"white"}
            textAlign={{ base: "center", lg: "start" }}
            lineHeight={{ base: "50px", lg: "80px" }}
            style={{ textWrap: "balance" }}
          >
            Disfrutá, Devolvé, Repetí
          </Heading>
          <Text
            fontSize={{ base: "md", lg: "2xl" }}
            textAlign={{ base: "center", lg: "start" }}
            mx={{ base: 10, lg: 0 }}
          >
            Recibí tu comida en envases retornables ♻️
          </Text>
          <Button
            display={
              role === "punto" ||
              role === "gastronomico" ||
              role === "admin" ||
              role === "hibrido"
                ? "flex"
                : role === "casa"
                ? user?.code === undefined ||
                  user?.code === null ||
                  user?.code === ""
                  ? "flex"
                  : "none"
                : "flex"
            }
            w={"200px"}
            borderRadius={"15px"}
            fontWeight={500}
            bg={"#344234"}
            _hover={{ bg: "#445744" }}
            color={"white"}
            h={"40px"}
            fontSize={"13px"}
            onClick={() => {
              sendGAEvent({
                event: "buttonClicked",
                value: "M023XH03J1",
              });
              redirectHowItsWorks();
            }}
          >
            ¡Más info!
          </Button>
        </Flex>

        {/* Landing Image  */}
        <Flex flex={1} h={"100%"} justify={"center"} align={"center"}>
          <Box
            bg={"white"}
            w={{ base: "320px", lg: "450px" }}
            h={{ base: "320px", lg: "450px" }}
            mt={{ base: "100px", lg: "0px" }}
            borderRadius={"full"}
            shadow={"md"}
          >
            <Image
              src="/img/landing-page.jpg"
              w={"100%"}
              h={"100%"}
              borderRadius={"full"}
              alt="landing-page-image"
            />
          </Box>
        </Flex>
      </Flex>

      {/* Divider  */}
      <Stack w={"100%"} h={"100px"} bg={"white"}>
        <Box h={"70%"} borderBottomRadius={"50px"} bg={"#febb5e"} />
      </Stack>
    </Flex>
  );
}
