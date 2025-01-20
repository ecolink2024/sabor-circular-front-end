import { useState, useCallback } from "react";
import { getPreferenceId } from "../actions/actions";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";

export default function useMercadoPago() {
  const [preference, setPreference] = useState<PreferenceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activated, setActivated] = useState(false);

  const fetchPreferenceId = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPreferenceId([
        {
          id: Math.floor(Math.random() * 100000).toString(),
          title: "Envase Retornable",
          description:
            "Un envase retornable reutilizable que promueve la economía circular.",
          quantity: 1,
          unit_price: 9400,
          picture_url: "https://www.saborcircular.com.ar/img/landing-page.jpg",
        },
      ]);
      setPreference(response);
    } catch {
      setPreference(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
