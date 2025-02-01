import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MercadoPagoPayment = ({ preferenceId }: { preferenceId: string }) => {
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
      locale: "es-AR",
    });
  }, []);
  
  return (
    <div>
      <Wallet initialization={{ preferenceId: preferenceId }} />
    </div>
  );
};

export default MercadoPagoPayment;
