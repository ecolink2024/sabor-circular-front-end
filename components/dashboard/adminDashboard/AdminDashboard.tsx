'use client'
import React from "react";
import Dashboard from "../Dashboard";
import HighTable from "./HighTable";
import { Stack } from "@chakra-ui/react";
import AllUsersTable from "./AllUsersTable";

export default function AdminDashboard() {
  return (
    <Dashboard>
      <Stack w={"100%"} display={"flex"} direction={"column"} gap={10}>
        {/* High Table   */}
        <HighTable />

        {/* All Users Table */}
        <AllUsersTable />
      </Stack>
    </Dashboard>
  );
}
