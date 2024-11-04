import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { publicRoutes } from "@/lib/types/types";
import { useAuth } from "./AuthProvider";
import { isDashboardRouteAuthorized } from "@/lib/utils/utils";

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const isPublicRoute = publicRoutes.includes(pathname);
  const hasAccess = isPublicRoute || isDashboardRouteAuthorized(user, pathname);

  useEffect(() => {
    if (!hasAccess) {
      alert("Acceso denegado");
      router.push("/");
    }
  }, [hasAccess, router]);

  return hasAccess ? <>{children}</> : null;
};

export default ProtectedRouteWrapper;
