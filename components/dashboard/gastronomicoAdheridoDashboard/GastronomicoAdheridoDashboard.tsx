"use client";
import { useAuth } from "@/providers/AuthProvider";
import { Flex } from "@chakra-ui/react";
import React from "react";
import TransactionTuppers from "./TransactionTuppers";
import Dashboard from "../Dashboard";

export default function GastronomicoAdheridoDashboard() {
  const { isLoading: isLoadingUser, token } = useAuth();

  return (
    <Dashboard>
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
          transactionType="deposit"
          isLoadingUser={isLoadingUser}
          url={"gastronomicoCreateTransaction"}
        />

        {/* Egreso Tuppers */}
        <TransactionTuppers
          token={token}
          transactionType="withdraw"
          isLoadingUser={isLoadingUser}
          url={"gastronomicoCreateTransaction"}
        />
      </Flex>
    </Dashboard>
  );
}
