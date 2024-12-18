import { keyframes } from "@emotion/react";
import { User, ValidationError, dashboardUsersRoutes } from "../types/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const scrollAnimation = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(-100%);
}
`;

export const getTokenFromPathname = (
  pathname: string,
  type: "recovery-password" | "verify-email"
): string | null => {
  const routePattern =
    type === "recovery-password"
      ? "login/recovery-password"
      : "signin/verify-email";

  const match = pathname.match(new RegExp(`/${routePattern}/(.+)`));

  return match ? match[1] : null;
};

export const isDashboardRouteAuthorized = (
  user: User | null,
  userRole: string,
  pathname: string
): boolean => {
  if (!user || !userRole || !user._id) return false;

  return (
    dashboardUsersRoutes[
      userRole === "hibrido" ? "gastronomico" : userRole
    ]?.some((route) => {
      const expectedPath = route.replace("[id]", user._id);

      const routeRegex = new RegExp(`^${expectedPath}$`);

      return routeRegex.test(pathname);
    }) || false
  );
};

export const getErrorMessage = (
  field: string,
  errors: ValidationError[] | undefined
) => {
  const error = errors?.find((e) => e.path === field);
  return error?.message;
};

export const clearFieldError = (
  field: string,
  setErrors: React.Dispatch<React.SetStateAction<ValidationError[] | undefined>>
) => {
  setErrors((prevErrors) =>
    prevErrors?.filter((error) => error.path !== field)
  );
};

const handleTupperClick = () => {
  const section = document.getElementById("locales-adheridos");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export const redirectCard = (
  card: string,
  router: AppRouterInstance,
  user: User | null,
  userRole: string
) => {
  // validación para la primera y segunda tarjeta (usuario)
  if (card === "1" || card === "2") {
    if (user) {
      if (userRole === "casa") {
        return router.push(`/dashboard/casa/${user._id}`);
      } else {
        return router.push(`/`);
      }
    } else {
      return router.push(`/login`);
    }
  }
  // validación para la tercera tarjeta (tupper)
  else if (card === "3") {
    handleTupperClick();
  }
  // validación para la tercera tarjeta (return-container)
  else {
    return router.push(`/return-container`);
  }
};

export function getUserType(users: string[] | undefined): string {
  const uniqueUsers = Array.from(new Set(users)).sort();
  const key = uniqueUsers.join(",");

  switch (key) {
    case "gastronomico,punto":
      return "hibrido";
    case "admin":
      return "admin";
    case "casa":
      return "casa";
    case "gastronomico":
      return "gastronomico";
    case "punto":
      return "punto";
    default:
      return "unknown";
  }
}
