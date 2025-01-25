"use client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

function AlertComponent({ date }: { date: string }) {
  return (
    <Alert
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
          {`Tu suscripción vencera pronto ${date}`}
        </AlertDescription>
      </div>
    </Alert>
  );
}

export default AlertComponent;
