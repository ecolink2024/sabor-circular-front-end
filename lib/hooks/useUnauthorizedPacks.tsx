import { useEffect, useState, useCallback } from "react";
import { UnauthorizedPack } from "@/lib/types/types";
import { fetchUnauthorizedPacks } from "@/lib/actions/actions";

export const useUnauthorizedPacks = (token: string | null) => {
  const [packs, setPacks] = useState<UnauthorizedPack[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);

    try {
      const data = await fetchUnauthorizedPacks(token);
      setPacks(data);
      setError(null);
    } catch (err) {
      setError("No se pudo obtener la información");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { packs, isLoading, error, refetch };
};
