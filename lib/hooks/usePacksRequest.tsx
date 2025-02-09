import { useEffect, useState, useCallback } from "react";
import { GetAllMoneyTransaction } from "../types/types";
import { getAllMoneyTransactions } from "../actions/actions";

export const usePacksRequest = (token: string | null) => {
  const [packs, setPacks] = useState<GetAllMoneyTransaction[]>([]);
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
      setError(null);

      const data: GetAllMoneyTransaction[] = await getAllMoneyTransactions(
        token
      );

      console.log(data);
      setPacks(data);
    } catch (err) {
      setError("No se pudo obtener la información");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { packs, setPacks, isLoading, error, refetch };
};
