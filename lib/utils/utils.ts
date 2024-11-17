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

export const getTokenFromPathname = (
  pathname: string,
  type: "recovery-password" | "verify-email"
): string | null => {
  // Generamos la expresión regular dependiendo del tipo de ruta que queremos buscar
  const routePattern =
    type === "recovery-password"
      ? "login/recovery-password"
      : "signin/verify-email";

  // Creamos la expresión regular para la ruta seleccionada
  const match = pathname.match(new RegExp(`/${routePattern}/(.+)`));

  return match ? match[1] : null; // match[1] es el token
};

export const isDashboardRouteAuthorized = (
  user: User | null,
  pathname: string
): boolean => {
  // Verifica si el usuario está autenticado y si tiene un rol y un id
  if (!user || !user.role || !user._id) return false;

  // Recorre las rutas disponibles para el rol del usuario
  return (
    dashboardUsersRoutes[user.role]?.some((route) => {
      // Reemplaza '[id]' por el ID del usuario en la ruta
      const expectedPath = route.replace("[id]", user._id);

      // Si la ruta contiene parámetros dinámicos, validamos con una expresión regular
      const routeRegex = new RegExp(`^${expectedPath}$`);

      // Verificamos si la ruta coincide con la ruta actual
      return routeRegex.test(pathname);
    }) || false // Retorna falso si no coincide ninguna ruta
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

export const clearFieldError = (
  field: string,
  setErrors: React.Dispatch<React.SetStateAction<ValidationError[] | undefined>>
) => {
  setErrors((prevErrors) =>
    prevErrors?.filter((error) => error.path !== field)
  );
};
