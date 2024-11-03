"use client";
import { useAuth } from "@/providers/AuthProvider";
import { Stack, Center, Flex, Skeleton, Heading } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  return (
    <Stack
      as={Center}
      height={"100%"}
      minH={{ base: "calc(100vh - 70px)", lg: "calc(100vh - 90px)" }}
      p={10}
      gap={20}
    >
      <Flex w={"100%"} justify={"center"}>
        <Skeleton isLoaded={!isLoading} borderRadius={"8.93px"}>
          <Heading color={"white"} size={"2xl"}>
            {`Hola ${user?.name.split(" ")[0]}!`}
          </Heading>
        </Skeleton>
      </Flex>
      {children}
    </Stack>
  );
}
