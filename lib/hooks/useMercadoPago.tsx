import { useState, useCallback } from "react";
import { getPreferenceId } from "../actions/actions";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { useAuth } from "@/providers/AuthProvider";

export default function useMercadoPago() {
  const { user } = useAuth();
  const [preference, setPreference] = useState<PreferenceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activated, setActivated] = useState(false);

  const fetchPreferenceId = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPreferenceId(
        [
          {
            id: user?._id || "",
            title: "Envase Retornable",
            description: "Envase Retornable Sabor Circular",
            quantity: 2,
            unit_price: 100,
            picture_url:
              "https://www.saborcircular.com.ar/img/landing-page.jpg",
          },
        ],
        user?._id
      );
      setPreference(response);
    } catch {
      setPreference(null);
    } finally {
      setIsLoading(false);
    }
  }, [user?._id]);

  const handleActivate = () => {
    setActivated(true);
    fetchPreferenceId();
  };

  return {
    preference,
    isLoading,
    activated,
    handleActivate,
    refetch: fetchPreferenceId,
  };
}
