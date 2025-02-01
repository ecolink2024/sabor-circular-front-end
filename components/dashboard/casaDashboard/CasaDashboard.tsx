"use client";
import { useAuth } from "@/providers/AuthProvider";
import Dashboard from "../Dashboard";
import DefaultBox from "./defaultBox/DefaultBox";
import { isAuthorizedPack } from "@/lib/utils/utils";
import AuthorizedBox from "./authorizedBox/AuthorizedBox";

export default function CasaDashboard() {
  const { code, authorizedAt, isAuthenticated } = useAuth();
  const authorized = isAuthorizedPack(code, authorizedAt, isAuthenticated);

  return (
    <Dashboard>
      {/* Unauthorized User */}
      {!authorized.isValid && <DefaultBox />}

      {/* Authorized User */}
      {authorized.isValid && <AuthorizedBox />}
    </Dashboard>
  );
}
