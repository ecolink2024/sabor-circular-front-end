import { keyframes } from "@emotion/react";
import { User, ValidationError, dashboardUsersRoutes } from "../types/types";

export const scrollAnimation = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(-100%);
}
`;

export const getTokenFromPathname = (pathname: string): string | null => {
  const match = pathname.match(/\/login\/recovery-password\/(.+)/);
  return match ? match[1] : null;
};

export const isDashboardRouteAuthorized = (
  user: User | null,
  pathname: string
) => {
  if (!user || !user.role || !user._id) return false;

  return (
    dashboardUsersRoutes[user.role]?.some((route) => {
      const expectedPath = route.replace("[id]", user._id);
      return pathname === expectedPath;
    }) ?? false
  );
};

// Función para obtener el mensaje de error de un campo específico
export const getErrorMessage = (
  field: string,
  errors: ValidationError[] | undefined
) => {
  const error = errors?.find((e) => e.path === field);
  return error?.message;
};
