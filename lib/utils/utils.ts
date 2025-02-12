import { keyframes } from "@emotion/react";
import {
  SubscriptionInfo,
  User,
  ValidationError,
  dashboardUsersRoutes,
} from "../types/types";
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
      return router.push(`/dashboard/${userRole}/${user._id}`);
    } else {
      return router.push(`/activate-subscription`);
    }
  }
  // validación para la tercera tarjeta (tupper)
  else if (card === "3") {
    handleTupperClick();
  }
  // validación para la cuarta tarjeta (return-container)
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

export const redirectAttachedPremises = (
  pathname: string,
  router: AppRouterInstance
) => {
  if (pathname === "/") {
    document
      .getElementById("locales-adheridos")
      ?.scrollIntoView({ behavior: "smooth" });
  } else {
    sessionStorage.setItem("scrollToSection", "locales-adheridos");
    router.push("/");
  }
};

export const redirectHowItsWorks = (
  pathname: string,
  router: AppRouterInstance
) => {
  if (pathname === "/") {
    document
      .getElementById("how-its-work")
      ?.scrollIntoView({ behavior: "smooth" });
  } else {
    sessionStorage.setItem("scrollToSection", "how-its-work");
    router.push("/");
  }
};

export function isAuthorizedPack(
  isAuthenticated: boolean,
  pack: SubscriptionInfo | undefined
): { isValid: boolean } {
  if (!isAuthenticated) {
    return { isValid: false };
  }

  if (
    !pack ||
    Object.keys(pack).length === 0 ||
    pack.code === undefined ||
    pack.code === null
  ) {
    return { isValid: false };
  }

  return { isValid: true };
}

//Utils Dates
export const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return null;

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj?.getTime())) {
    return null;
  }

  return dateObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const calculateExpirationDate = (
  date: Date | null | undefined,
  expirationMonthNumbers: number
): Date | null => {
  if (!date || isNaN(date?.getTime())) return null;

  const expirationDate = new Date(date);
  expirationDate.setMonth(expirationDate.getMonth() + expirationMonthNumbers);
  return expirationDate;
};

export const isExpiringOrExpired = (
  date: Date | null | undefined
): { isExpired: boolean; isExpiringSoon: boolean } => {
  if (!date || isNaN(date?.getTime()))
    return { isExpired: false, isExpiringSoon: false };

  const currentDate = new Date();

  const expirationDate = new Date(date);
  expirationDate.setMonth(expirationDate.getMonth() + 6);

  const warningDate = new Date(expirationDate);
  warningDate.setDate(expirationDate.getDate() - 15);

  const isExpired = currentDate >= expirationDate;
  const isExpiringSoon = currentDate >= warningDate && !isExpired;

  return { isExpired, isExpiringSoon };
};
