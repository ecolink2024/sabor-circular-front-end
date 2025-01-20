"use client";
import React from "react";
import DefaultBox from "./DefaultBox";
import useUserPacks from "@/lib/hooks/useUserPacks";
import Dashboard from "../Dashboard";

export default function CasaDashboard({ id }: { id: string }) {
  const {} = useUserPacks(id);

  return (
    <Dashboard>
      <DefaultBox />
      {/* <AuthorizedBox /> */}
    </Dashboard>
  );
}
