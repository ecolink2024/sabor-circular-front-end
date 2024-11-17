import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { publicRoutes } from "@/lib/types/types";
import {
  getTokenFromPathname,
  isDashboardRouteAuthorized,
} from "@/lib/utils/utils";
import { useAuth } from "./AuthProvider";
import { useToast } from "@chakra-ui/react";

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isLoading, isLoggingOut } = useAuth();

  // Verificar si la ruta está en las rutas públicas
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    getTokenFromPathname(pathname, "recovery-password") !== null ||
    getTokenFromPathname(pathname, "verify-email") !== null;

  // Verificar si es la ruta '/perfil'
  const isProfileRoute = pathname === "/perfil";

  // Verificar si la ruta es del dashboard
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Validación de acceso a las rutas del dashboard
  const isDashboardAuthorized =
    isDashboardRoute && user && !isDashboardRouteAuthorized(user, pathname);

  useEffect(() => {
    // Si aún estamos cargando los datos, no hacemos nada
    if (isLoading) return;

    // Si es una ruta pública, no hacemos nada, ya que el acceso está permitido
    if (isPublicRoute) return;

    // Si no hay token y la ruta es de perfil, redirigir al login
    if (isProfileRoute && !token) {
      router.push("/login");
      if (!isLoggingOut) {
        toast({
          title: "No autenticado",
          description: "Necesitas iniciar sesión para acceder a tu perfil.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }

    // Si no hay token y la ruta es de dashboard, redirigir al login
    if (isDashboardRoute && !token) {
      router.push("/login");
      if (!isLoggingOut) {
        toast({
          title: "No autenticado",
          description: "Necesitas iniciar sesión para acceder al dashboard.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }

    // Si el usuario no tiene acceso al dashboard redirigir al index
    if (isDashboardAuthorized) {
      toast({
        title: "Acceso no autorizado",
        description: "No tienes permiso para acceder a esta dashboard.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      router.push("/");
    }

    // Si el usuario no está autenticado y la ruta no es pública, redirigir al login
    if (!user && !isPublicRoute) {
      toast({
        title: "No autenticado",
        description: "Necesitas iniciar sesión para continuar.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      router.push("/login");
    }
  }, [
    user,
    token,
    pathname,
    isPublicRoute,
    isProfileRoute,
    isDashboardRoute,
    isDashboardAuthorized,
    isLoading,
    router,
    toast,
  ]);

  return <>{children}</>;
};

export default ProtectedRouteWrapper;
