"use client";
import { calculateAlertDate, formatDate } from "@/lib/utils/utils";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ModalUpdateSuscription from "./ModalUpdateSuscription";
import useMercadoPago from "@/lib/hooks/useMercadoPago";

function AlertComponent({
  expirationDate,
}: {
  expirationDate: Date | null | undefined;
}) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { handleActivate, isLoading, preference, activated } = useMercadoPago();

  const currentDate = new Date();
  const alertDate = calculateAlertDate(expirationDate);

  const isExpired =
    expirationDate && new Date(currentDate) >= new Date(expirationDate);

  const shouldShowAlert =
    alertDate && expirationDate && (currentDate > alertDate || isExpired);

  useEffect(() => {
    if (activated && preference && !isLoading) {
      onOpen();
    }
  }, [activated, preference, isLoading, onOpen]);

  return (
    <>
      <Alert
        display={shouldShowAlert ? "flex" : "none"}
        status="error"
        variant="subtle"
        bg="red.100"
        border="1px"
        borderColor="red.300"
        borderRadius="lg"
        p={"10px"}
        position={"relative"}
      >
        <AlertIcon color="red.500" w={"15px"} h={"15px"} />
        {/* Alert Messagge  */}
        <div>
          <AlertTitle
            color="red.800"
            fontWeight="semibold"
            fontSize={{ base: "14px", lg: "15px" }}
            lineHeight={1}
          >
            {isExpired ? "Suscripción Expirada" : "Información de Vencimiento"}
          </AlertTitle>
          <AlertDescription
            color="red.700"
            fontSize={{ base: "11px", lg: "13px" }}
          >
            {isExpired
              ? `Tu suscripción expiró el ${formatDate(expirationDate)}.`
              : `Tu suscripción vencerá pronto el ${formatDate(
                  expirationDate
                )}`}
          </AlertDescription>

          {/* Button Update Suscription */}
          <Button
            variant={"outline"}
            w={"100%"}
            size={{ base: "xs", lg: "sm" }}
            bg={"red.500"}
            color={"white"}
            isLoading={isLoading}
            onClick={handleActivate}
          >
            Renovar Suscripcion
          </Button>
        </div>
      </Alert>

      {/* Modal Update Suscription  */}
      <ModalUpdateSuscription
        isOpen={isOpen}
        onClose={onClose}
        activated={activated}
        preference={preference}
        isLoading={isLoading}
      />
    </>
  );
}

export default AlertComponent;
