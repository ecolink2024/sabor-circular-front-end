import {
  FormUserDataInfo,
  LoginData,
  RegisterData,
  Response,
  TransactionData,
  UnauthorizedPack,
  UpdateUser,
  User,
  UserPacks,
  UserResponse,
} from "../types/types";

const BASE_URL = "http://localhost:3000";

export const registerUser = async (data: RegisterData): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
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
        message: errorMessage.message || "Error en el registro",
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

export const loginUser = async (data: LoginData): Promise<Response> => {
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

export const fetchUserPacks = async ({
  userId,
  userToken,
}: {
  userId: string;
  userToken: string;
}): Promise<UserPacks[] | null> => {
  const token = `Bearer ${userToken}`;

  try {
    const response = await fetch(`${BASE_URL}/auth/packs/${userId}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error: ${response.statusText}. Detalles: ${errorMessage}`
      );
    }

    const data: UserPacks[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return null;
  }
};

export const submitPack = async (
  userId: string,
  tupperAmount: number,
  file: Blob | File,
  token: string | null
) => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("tupperAmount", tupperAmount.toString());
  if (file) {
    formData.append("file", file);
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/pack`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar el pack:", error);
    throw error;
  }
};

export const updateUser = async (
  data: UpdateUser,
  usertToken: string | null
) => {
  const response = await fetch(`${BASE_URL}/auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usertToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Error al actualizar el perfil");
  }

  return response.json();
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
): Promise<void> => {
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
      throw new Error("Error en la creación de la transacción");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUnauthorizedPacks = async (
  token: string | null
): Promise<UnauthorizedPack[]> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/packs/unauthorized`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los packs no autorizados");
    }

    const data: UnauthorizedPack[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const authorizePack = async (packId: string, token: string | null) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/pack/${packId}/authorize`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al autorizar el pack");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud de autorización:", error);
    throw error;
  }
};

export const getUsersData = async (token: string | null) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/usersData`, {
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
