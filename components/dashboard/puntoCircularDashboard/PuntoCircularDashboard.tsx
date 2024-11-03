"use client";
import { Flex } from "@chakra-ui/react";
import React from "react";
import Dashboard from "../Dashboard";
import TransactionTuppers from "../gastronomicoAdheridoDashboard/TransactionTuppers";
import { useAuth } from "@/providers/AuthProvider";

export default function PuntoCircularDashboard() {
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
          url={"puntoCreateTransaction"}
        />

        {/* Egreso Tuppers */}
        <TransactionTuppers
          token={token}
          transactionType="withdraw"
          isLoadingUser={isLoadingUser}
          url={"puntoCreateTransaction"}
        />
      </Flex>
    </Dashboard>
  );
}
