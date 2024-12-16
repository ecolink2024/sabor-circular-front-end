"use client";
import { useAuth } from "@/providers/AuthProvider";
import { Flex } from "@chakra-ui/react";
import React from "react";
import TransactionTuppers from "./TransactionTuppers";
import Dashboard from "../Dashboard";
import { getUserType } from "@/lib/utils/utils";

export default function GastronomicoAdheridoDashboard() {
  const { isLoading: isLoadingUser, token, userRole } = useAuth();

  return (
    <Dashboard>
      {/* Gastronomico Cards */}
      <Flex
        w={"100%"}
        align={"center"}
        justify={"space-evenly"}
        direction={{ base: "column", lg: "row" }}
        gap={10}
      >
        {/* Ingreso Tuppers */}
        <TransactionTuppers
          token={token}
          transactionType="withdraw"
          isLoadingUser={isLoadingUser}
          url={"gastronomicoCreateTransaction"}
          userType={"gastronomico"}
        />

        {/* Egreso Tuppers */}
        <TransactionTuppers
          token={token}
          transactionType="deposit"
          isLoadingUser={isLoadingUser}
          url={"gastronomicoCreateTransaction"}
          userType={"gastronomico"}
        />
      </Flex>

      {/* Punto Cards */}
      <Flex
        w={"100%"}
        align={"center"}
        justify={"space-evenly"}
        direction={{ base: "column", lg: "row" }}
        gap={10}
        display={getUserType(userRole) === "hibrido" ? "flex" : "none"}
      >
        {/* Ingreso Tuppers */}
        <TransactionTuppers
          token={token}
          transactionType="withdraw"
          isLoadingUser={isLoadingUser}
          url={"puntoCreateTransaction"}
          userType={"punto circular"}
        />

        {/* Egreso Tuppers  */}
        <TransactionTuppers
          token={token}
          transactionType="deposit"
          isLoadingUser={isLoadingUser}
          url={"puntoCreateTransaction"}
          userType={"punto circular"}
        />
      </Flex>
    </Dashboard>
  );
}
