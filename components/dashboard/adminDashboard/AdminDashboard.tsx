"use client";
import Dashboard from "../Dashboard";
import { VStack } from "@chakra-ui/react";
import AllUsersTable from "./AllUsersTable";
import HighTable from "./HighTable";

export default function AdminDashboard() {
  return (
    <Dashboard>
      <VStack w={"100%"} gap={10}>
        {/* All Users Table */}
        <AllUsersTable />

        {/* High Table   */}
        <HighTable />
      </VStack>
    </Dashboard>
  );
}
