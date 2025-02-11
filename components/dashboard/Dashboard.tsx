"use client";
import { useAuth } from "@/providers/AuthProvider";
import { Stack, Center, Flex, Skeleton, Heading, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import WidgetWsp from "../home/whatsapp/WidgetWsp";
import { getUserType } from "@/lib/utils/utils";

export default function Dashboard({ children }: { children: ReactNode }) {
  const { user, isLoading, userRole } = useAuth();

  const role = getUserType(userRole);

  return (
    <Stack
      as={Center}
      height={"100%"}
      py={{ base: 20, lg: 16 }}
      px={6}
      m={"auto"}
      gap={{ base: 4, lg: 10 }}
      position={"relative"}
    >
      <Flex
        w={"100%"}
        justify={"center"}
        direction={"column"}
        align={"center"}
        gap={6}
      >
        <Skeleton isLoaded={!isLoading} borderRadius={"8.93px"}>
          <Heading color={"white"} size={"2xl"} as={"h2"}>
            {`Hola ${user?.name.split(" ")[0]}!`}
          </Heading>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} borderRadius={"8.93px"}>
          <Text
            display={
              role === "gastronomico" ||
              role === "casa" ||
              role === "admin" ||
              role === "hibrido"
                ? "none"
                : "block"
            }
            textAlign={"center"}
            fontSize={"xl"}
            fontWeight={600}
          >
            Registrá los ingresos/egresos de envases en tu establecimiento
          </Text>
        </Skeleton>
      </Flex>

      {children}

      {/* Widget Wsp */}
      <WidgetWsp display={role === "casa"} />
    </Stack>
  );
}
