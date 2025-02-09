"use client";
import useUserPack from "@/lib/hooks/useUserPack";
import Dashboard from "../Dashboard";
import { useAuth } from "@/providers/AuthProvider";
import { isAuthorizedPack } from "@/lib/utils/utils";
import DefaultBox from "./defaultBox/DefaultBox";
import AuthorizedBox from "./authorizedBox/AuthorizedBox";

export default function CasaDashboard() {
  const { user, isAuthenticated } = useAuth();

  const { pack } = useUserPack(user?._id);
  const authorized = isAuthorizedPack(isAuthenticated, pack);

  return (
    <Dashboard>
      {/* Unauthorized User */}
      {!authorized.isValid && (
        <DefaultBox price={10500} oldPrice={23500} duration={6} />
      )}

      {/* Authorized User */}
      {authorized.isValid && <AuthorizedBox pack={pack} />}
    </Dashboard>
  );
}
