export type infiniteSlider = {
  svg: string;
  tooltip: string;
  link: string;
};

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refetchUserData: () => Promise<void>;
}

export type RegisterData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  code?: string;
  tupperCount?: number;
  password: string;
};

export type Response = {
  success: boolean;
  token?: string;
  message?: string;
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
  address: string; // Dirección del usuario
  role: string; // Rol del usuario
  tupperCount: number; // Contador de 'tupper' del usuario
  tupperMount?: number;
  code?: string;
  createdAt?: string;
};

export type UpdateUser = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type UserPacks = {
  _id: string;
  userId: string;
  code: string;
  tupperAmount: number;
  authorizedAt: string;
  fileUrl: string;
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
  "/login/recovery-password",
  "/signin/pg",
  "/signin/admin",
];

export const dashboardUsersRoutes: Record<string, string[]> = {
  admin: ["/dashboard/admin/[id]"],
  casa: ["/dashboard/casa/[id]"],
  punto: ["/dashboard/punto/[id]"],
  gastronomico: ["/dashboard/gastronomico/[id]"],
};
