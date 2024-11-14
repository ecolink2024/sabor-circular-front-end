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
import { useRouter } from "next/navigation";

export default function TitleAndDescription() {
  const { user } = useAuth();
  const router = useRouter();

  const hrefTapercito = user
    ? user.role === "casa"
      ? `/dashboard/casa/${user._id}`
      : `/dashboard/admin/${user._id}`
    : "/login";

  return (
    <Flex w={"100%"} height="calc(100vh - 80px)" gap={0} direction={"column"}>
      <Flex direction={{ base: "column", lg: "row" }} h={"100%"}>
        {/* Heading and Description */}
        <Flex
          flex={1}
          h={"100%"}
          direction={"column"}
          gap={6}
          pl={{ base: 0, lg: 28 }}
          justify={"center"}
          align={{ base: "center", lg: "flex-start" }}
        >
          <Heading
            fontWeight={"black"}
            fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
            color={"white"}
            textAlign={{ base: "center", lg: "start" }}
            lineHeight={"80px"}
          >
            Disfrutá
            <br /> devolvé y repetí
          </Heading>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            textAlign={{ base: "center", lg: "start" }}
            mx={{ base: 10, lg: 0 }}
          >
            Ahora take away y delivery de tu comida preferida en envases
            reutilizables zero waste
          </Text>
          <Button
            display={
              user?.role === "punto" ||
              user?.role === "gastronomico" ||
              user?.role === "admin"
                ? "none"
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
            onClick={() => router.push(hrefTapercito)}
          >
            Empeza a usar #Tapercito
          </Button>
        </Flex>

        <Flex flex={1} h={"100%"} justify={"center"} align={"center"}>
          <Box
            bg={"white"}
            w={{ base: "350px", lg: "450px" }}
            h={{ base: "350px", lg: "450px" }}
            borderRadius={"full"}
            shadow={"md"}
          >
            <Image
              src="/img/landing-page.png"
              w={"100%"}
              h={"100%"}
              borderRadius={"full"}
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
