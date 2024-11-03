import React from "react";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/lib/types/types";

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  // Verificar si la ruta es pública
  const isPublicRoute = publicRoutes.includes(pathname);

  // Si la ruta es pública, permite el acceso
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Si la ruta no es pública, puedes agregar la lógica para redirigir o mostrar un mensaje
  return <>{children}</>;
};

export default ProtectedRouteWrapper;
