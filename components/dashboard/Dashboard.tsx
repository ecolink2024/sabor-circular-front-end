"use client";
import { useAuth } from "@/providers/AuthProvider";
import { Stack, Center, Flex, Skeleton, Heading, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import WidgetWsp from "../home/whatsapp/WidgetWsp";

export default function Dashboard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  return (
    <Stack
      as={Center}
      height={"100%"}
      p={10}
      m={"auto"}
      gap={20}
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
          <Heading color={"white"} size={"2xl"}>
            {`Hola ${user?.name.split(" ")[0]}!`}
          </Heading>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} borderRadius={"8.93px"}>
          <Text
            display={
              user?.role === "gastronomico" || user?.role === "casa"
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
      <WidgetWsp display={user?.role === "casa"} />
    </Stack>
  );
}
