"use client";
import React from "react";
import DefaultBox from "./defaultBox/DefaultBox";
import useUserPacks from "@/lib/hooks/useUserPacks";
import Dashboard from "../Dashboard";
// import AuthorizedBox from "./authorizedBox/AuthorizedBox";

export default function CasaDashboard({ id }: { id: string }) {
  const {} = useUserPacks(id);

  return (
    <Dashboard>
      <DefaultBox />
    </Dashboard>
  );
}

{
  /* <AuthorizedBox /> */
}
