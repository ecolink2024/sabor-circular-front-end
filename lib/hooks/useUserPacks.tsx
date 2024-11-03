import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect, useCallback } from "react";
import { fetchUserPacks } from "../actions/actions";
import { UserPacks } from "../types/types";

export default function useUserPacks(userId: string) {
  const { token } = useAuth();
  const [data, setData] = useState<UserPacks[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token || !userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const fetchedUserPacks = await fetchUserPacks({
        userId,
        userToken: token,
      });
      setData(fetchedUserPacks);
    } catch (err) {
      setError("Error al cargar los packs del usuario.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
