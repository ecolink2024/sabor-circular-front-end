"use client";
import { calculateAlertDate, formatDate } from "@/lib/utils/utils";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

function AlertComponent({
  expirationDate,
}: {
  expirationDate: Date | null | undefined;
}) {
  const currentDate = new Date();

  const alertDate = calculateAlertDate(expirationDate);

  const shouldShowAlert =
    alertDate &&
    expirationDate &&
    currentDate >= alertDate &&
    currentDate < expirationDate;

  return (
    <Alert
      display={shouldShowAlert ? "flex" : "none"}
      status="error"
      variant="subtle"
      bg="red.100"
      border="1px"
      borderColor="red.300"
      borderRadius="lg"
      p={"10px"}
    >
      <AlertIcon color="red.500" w={"15px"} h={"15px"} />
      <div>
        <AlertTitle
          color="red.800"
          fontWeight="semibold"
          fontSize={"15px"}
          lineHeight={1}
        >
          Información de Vencimiento
        </AlertTitle>
        <AlertDescription
          color="red.700"
          fontSize={"13px"}
          lineHeight={"0.8px"}
        >
          {`Tu suscripción vencerá pronto el ${formatDate(expirationDate)}`}
        </AlertDescription>
      </div>
    </Alert>
  );
}

export default AlertComponent;
