import { useState, useEffect, useCallback } from "react";
import { getUsersAndPackData } from "../actions/actions";
import { UserAndPack } from "../types/types";

export const useUsersAndPackData = (token: string | null) => {
  const [users, setUsers] = useState<UserAndPack[] | null>(null);
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
      const userAndPackData: UserAndPack[] = await getUsersAndPackData(token);
      setUsers(userAndPackData);
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
