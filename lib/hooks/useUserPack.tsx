import { useState, useEffect } from "react";
import { SubscriptionInfo } from "../types/types";
import { userUpdateSubscription } from "../actions/actions";
import { useAuth } from "@/providers/AuthProvider";

export default function useUserPack(userId: string | null) {
  const { token } = useAuth();
  const [pack, setPack] = useState<SubscriptionInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPacks = async () => {
      try {
        const data = await userUpdateSubscription(userId!, token!);
        setPack(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPacks();
  }, [userId, token]);

  return { pack, isLoading, error };
}
