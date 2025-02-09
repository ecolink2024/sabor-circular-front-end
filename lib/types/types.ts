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
  isAuthenticated: boolean;
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
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  IDCard: string;
  role: string[];
  code: string;
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
  "/activate-subscription",
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

export type GetAllMoneyTransaction = {
  _id: string;
  paymentId: string;
  userId: string;
  userName: string;
  quantity: string;
  paymentReceiveAt: string;
  action: string;
};

export type SubscriptionInfo = {
  _id: string;
  deletedAt: string | null;
  userId: string;
  code: string;
  tupperCount: number;
  status: string;
  authorizedAt: Date | null | undefined;
};

export type SubscriptionResponse = {
  subscriptionInfo: SubscriptionInfo;
};

export type UserAndPack = {
  userId: string;
  name: string;
  role: string[];
  email: string;
  phone: string;
  pack: {
    code: string;
    authorizedAt: string;
    tupperAmount: number;
  };
};
