import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { publicRoutes, roleBasedRoutes } from "@/lib/types/types";
import { usePathname, useRouter } from "next/navigation";

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth(); // Obtiene el usuario y el estado de carga
  const router = useRouter(); // Hook de router para la redirección
  const currentPath = usePathname(); // Obtiene la ruta actual

  useEffect(() => {
    if (isLoading) return; // Si todavía se está cargando, no hace nada

    // Permitir acceso a rutas públicas
    if (publicRoutes.includes(currentPath)) {
      return;
    }

    // Comprobar si el rol del usuario permite el acceso a la ruta actual
    const allowedRoles =
      roleBasedRoutes.find((route) =>
        new RegExp(
          `^${route.path.replace(/\[id\]/, user?._id || "\\w+")}$`
        ).test(currentPath)
      )?.roles || [];

    // Redirigir a la página de inicio si el rol del usuario no está autorizado
    if (user && !allowedRoles.includes(user.role)) {
      router.push("/"); // Redirigir a la página principal
    }
  }, [user, isLoading, currentPath, router]);

  // Condiciones para renderizar
  const isLoadingComplete = !isLoading; // Carga completa
  const isUserAvailable = user !== null; // El usuario está disponible
  const isRoleAllowed =
    isUserAvailable &&
    roleBasedRoutes.some(
      (route) =>
        new RegExp(
          `^${route.path.replace(/\[id\]/, user?._id || "\\w+")}$`
        ).test(currentPath) && route.roles.includes(user.role)
    );

  // Renderizar el contenido protegido si se cumplen todas las condiciones
  if (isLoadingComplete && isUserAvailable && isRoleAllowed) {
    return <>{children}</>; // Renderiza los hijos si está autorizado
  }

  // Si no se cumplen las condiciones, renderiza null
  return null;
};

export default ProtectedRouteWrapper;
