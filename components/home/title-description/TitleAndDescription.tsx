"use client";
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

export default function TitleAndDescription() {
  const { user } = useAuth();

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
          gap={6}
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
            lineHeight={"80px"}
          >
            Disfrutá,
            <br />
            Devolvé, Repetí
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
              user?.role === "punto" ||
              user?.role === "gastronomico" ||
              user?.role === "admin"
                ? "flex"
                : user?.role === "casa"
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
            onClick={redirectHowItsWorks}
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
