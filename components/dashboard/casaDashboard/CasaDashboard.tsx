"use client";
import { Text } from "@chakra-ui/react";
import React from "react";
import DefaultBox from "./DefaultBox";
import { SkeletonBox } from "@/components/skeletons/Skeletons";
import useUserPacks from "@/lib/hooks/useUserPacks";
import ValidationBox from "./ValidationBox";
import Dashboard from "../Dashboard";
import AuthorizedBox from "./AuthorizedBox";

export default function CasaDashboard({ id }: { id: string }) {
  const { data, isLoading, refetch } = useUserPacks(id);

  return (
    <Dashboard>
      {isLoading ? (
        <SkeletonBox />
      ) : Array.isArray(data) && data.length === 0 ? (
        <DefaultBox refetch={refetch} />
      ) : data && data[0].authorizedAt !== null ? (
        <AuthorizedBox data={data} />
      ) : (
        <ValidationBox />
      )}

      <Text
        textAlign={"center"}
        fontWeight={700}
        fontSize={"20px"}
        display={Array.isArray(data) && data.length === 0 ? "block" : "none"}
      >
        Próximamente más envases disponibles por usuario
      </Text>
    </Dashboard>
  );
}
