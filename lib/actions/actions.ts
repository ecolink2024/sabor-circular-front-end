import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import {
  FormUserDataInfo,
  Issue,
  LoginData,
  GetAllMoneyTransaction,
  PaymentResponse,
  RegisterData,
  RegisterResponse,
  SubscriptionInfo,
  SubscriptionResponse,
  TransactionData,
  TransactionResponse,
  UpdateUser,
  User,
  UserResponse,
} from "../types/types";
import { Items } from "mercadopago/dist/clients/commonTypes";

const BASE_URL = process.env.BASE_URL;

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      if (errorResponse.error && errorResponse.error.issues) {
        const formattedErrors = errorResponse.error.issues.map(
          (issue: Issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })
        );

        return {
          success: false,
          message: "Errores de validación",
          errors: formattedErrors,
        };
      }

      return {
        success: false,
        message: errorResponse.message,
        errors: [],
      };
    }

    const result = await response.json();
    return { success: true, token: result.token };
  } catch (error) {
    return {
      success: false,
      message: "Error en la solicitud: " + (error as Error).message,
    };
  }
};

export const verifyEmail = async (
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verify-email/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      return {
        success: false,
        message:
          errorResponse.message || "Hubo un problema al verificar el email.",
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "Correo verificado exitosamente.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error en la solicitud: " + (error as Error).message,
    };
  }
};

export const loginUser = async (data: LoginData): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      return {
        success: false,
        message: errorMessage.message || "Error en el inicio de sesión",
      };
    }

    const result = await response.json();
    return { success: true, token: result.token };
  } catch (error) {
    return {
      success: false,
      message: "Error en la solicitud: " + (error as Error).message,
    };
  }
};

export const fetchUserData = async ({
  userToken,
}: {
  userToken: string;
}): Promise<User | null> => {
  const token = `Bearer ${userToken}`;

  try {
    const response = await fetch(`${BASE_URL}/auth/userdata`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: User = await response.json();

    return data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};

export const updateUser = async (
  data: UpdateUser,
  userToken: string | null
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      // Si el error tiene una propiedad "issues", procesamos esos errores
      if (errorResponse.error && errorResponse.error.issues) {
        const formattedErrors = errorResponse.error.issues.map(
          (issue: Issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })
        );

        return {
          success: false,
          message: "Errores de validación",
          errors: formattedErrors,
        };
      }

      // Si no tiene "issues", se asume que es un error genérico
      return {
        success: false,
        message: errorResponse.message,
        errors: [],
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: "Perfil actualizado con éxito.",
      ...result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error de solicitud: " + (error as Error).message,
      errors: [],
    };
  }
};

export const searchUserByCodeAPI = async (
  code: string,
  token: string | null
): Promise<UserResponse> => {
  const response = await fetch(
    `${BASE_URL}/auth/searchUserByCode?code=${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al buscar el usuario");
  }

  const data = await response.json();
  return data as UserResponse;
};

export const createTransaction = async (
  transactionData: TransactionData,
  token: string | null,
  url: string
): Promise<TransactionResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      if (errorResponse.errors) {
        const formattedErrors = errorResponse.errors.map(
          (error: { path: string[]; message: string }) => ({
            path: error.path.join("."),
            message: error.message,
          })
        );

        return {
          success: false,
          message: "Error de validación",
          errors: formattedErrors,
        };
      }
      // Si hay algún otro tipo de error, retornamos el mensaje de error general
      return {
        success: false,
        message: errorResponse.message,
        errors: [],
      };
    }

    // Si la transacción se creó correctamente
    return {
      success: true,
      message: "Transacción creada correctamente",
    };
  } catch (error) {
    // En caso de error durante el proceso de la solicitud
    return {
      success: false,
      message:
        "Error en la creación de la transacción: " + (error as Error).message,
    };
  }
};

export const getUsersAndPackData = async (token: string | null) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/getUserAndPackData`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de los usuarios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud de datos de usuarios:", error);
    throw error;
  }
};

export const deleteUserByAdmin = async (
  userId: string,
  token: string | null
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/deletedByAdmin/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    throw error;
  }
};

export const deleteOwnAccount = async (token: string | null) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/deleteOwnAccount`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la cuenta propia");
    }

    return { success: true, message: "Cuenta eliminada correctamente" };
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    throw error;
  }
};

export const submitFormUserInfo = async (
  formUserDataInfo: FormUserDataInfo
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/submitFormUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formUserDataInfo),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el formulario");
    }

    return { success: true, message: "Formulario enviado correctamente" };
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    throw error;
  }
};

export const resetPasswordEmail = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/resetPasswordEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(
        "Error al enviar el correo de restablecimiento de contraseña"
      );
    }

    return {
      success: true,
      message: "Correo de restablecimiento enviado correctamente",
    };
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    throw error;
  }
};

export const resetPassword = async (
  token: string | null,
  newPassword: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      throw new Error("Error al restablecer la contraseña");
    }

    return {
      success: true,
      message: "Contraseña restablecida correctamente",
    };
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    throw error;
  }
};

export const getPreferenceId = async (
  items: Items[],
  userId: string | null
): Promise<PreferenceResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/generatePaymentLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, userId }),
    });

    if (!response.ok) {
      throw new Error("Error al obtener el preferenceId");
    }

    const responseData: PaymentResponse = await response.json();

    console.log(responseData.preference);
    return responseData.preference;
  } catch (error) {
    console.error("Error al obtener el preferenceId:", error);
    throw error;
  }
};

export const getAllMoneyTransactions = async (): Promise<
  GetAllMoneyTransaction[]
> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/getAllMoneyTransactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las transacciones de dinero");
    }

    const responseData: GetAllMoneyTransaction[] = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error al obtener las transacciones de dinero:", error);
    throw error;
  }
};

export const userUpdateSubscription = async (
  userId: string,
  token: string
): Promise<SubscriptionInfo> => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/UserUpdateSubscription/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error actualizando la suscripción");
    }

    const data: SubscriptionResponse = await response.json();
    return data.subscriptionInfo;
  } catch (error) {
    console.error("Error en userUpdateSubscription:", error);
    throw error;
  }
};
