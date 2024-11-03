import { useState, useEffect, useCallback } from "react";
import { getUsersData } from "../actions/actions";
import { User } from "../types/types";

export const useUsersData = (token: string | null) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) {
      setError("Token no disponible");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const userData = await getUsersData(token);
      setUsers(userData);
      setIsLoading(false);
    } catch (err) {
      setError("Error al obtener los datos de los usuarios");
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { users, isLoading, error, refetch: fetchData };
};
