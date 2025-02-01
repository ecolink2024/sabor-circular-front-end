import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";

export type infiniteSlider = {
  svg: string;
  tooltip: string;
  link: string | undefined;
};

export interface AuthContextType {
  token: string | null;
  user: User | null;
  userRole: string[] | undefined;
  isLoading: boolean;
  isLoggingOut: boolean;
  login: (token: string) => void;
  logout: () => void;
  refetchUserData: () => Promise<void>;
}

export type RegisterData = {
  name: string;
  email: string;
  phone: string;
  address?: string | undefined;
  IDCard: string;
  role: string[];
  code?: string;
  tupperCount?: number;
  password: string;
  confirmPassword: string;
};

export interface ValidationError {
  path: string;
  message: string;
}

export type RegisterResponse = {
  success: boolean;
  token?: string;
  message?: string;
  errors?: ValidationError[];
};

export type TransactionResponse = {
  success: boolean;
  message?: string;
  errors?: ValidationError[];
};

export interface LoginData {
  email: string;
  password: string;
}

export type User = {
  _id: string; // Identificador único del usuario
  name: string; // Nombre del usuario
  email: string; // Correo electrónico del usuario
  phone: string; // Número de teléfono del usuario
  address?: string; // Dirección del usuario
  IDCard: string; // DNI del usuario
  role: string[]; // Rol del usuario
  tupperCount: number; // Contador de 'tupper' del usuario
  tupperMount?: number;
  code?: string;
  createdAt?: string;
};

export type UpdateUser = {
  name: string | undefined;
  phone: string | undefined;
  address?: string | undefined;
  IDCard: string | undefined;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type UserResponse = {
  names: {
    name: string;
    code: string;
  }[];
};

export type TransactionData = {
  code: string;
  tupperCount: number;
  type: "withdraw" | "deposit";
};

export type UnauthorizedPack = {
  _id: string;
  createdAt?: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  tupperAmount: number;
  fileUrl: string;
};

export interface FormUserDataInfo {
  name: string;
  email: string;
  telefone: string;
  contact: string;
  message: string;
}

export const publicRoutes: string[] = [
  "/",
  "/contact",
  "/return-container",
  "/signin",
  "/login",
  "/signin/pg",
  "/signin/admin",
  "/login/recovery-password",
  "/payment/success",
  "/payment/failure",
  "/payment/pending",
];

export const dashboardUsersRoutes: Record<string, string[]> = {
  admin: ["/dashboard/admin/[id]"],
  casa: ["/dashboard/casa/[id]"],
  punto: ["/dashboard/punto/[id]"],
  gastronomico: ["/dashboard/gastronomico/[id]"],
};

export type PasswordField =
  | "currentPassword"
  | "newPassword"
  | "confirmPassword";

export type Issue = {
  path: string[];
  message: string;
};

export type PasswordFieldRegister = "newPassword" | "confirmPassword";

export type PaymentResponse = {
  preference: PreferenceResponse;
};
