"use client";
import Dashboard from "../Dashboard";
import DefaultBox from "./defaultBox/DefaultBox";
import useUserPacks from "@/lib/hooks/useUserPacks";

export default function CasaDashboard({ id }: { id: string }) {
  const {} = useUserPacks();
  console.log(id);
  return (
    <Dashboard>
      <DefaultBox />
      {/* <AuthorizedBox /> */}
    </Dashboard>
  );
}
