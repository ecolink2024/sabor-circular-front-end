"use client";
import {
  calculateExpirationDate,
  formatDate,
  isExpiringOrExpired,
} from "@/lib/utils/utils";
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
  subscriptionDate,
}: {
  subscriptionDate: Date | null | undefined;
}) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { handleActivate, isLoading, preference, activated } = useMercadoPago();

  //show alert
  const { isExpired, isExpiringSoon } = isExpiringOrExpired(subscriptionDate);

  //expired date
  const expirationDate = subscriptionDate;

  useEffect(() => {
    if (activated && preference && !isLoading) {
      onOpen();
    }
  }, [activated, preference, isLoading, onOpen]);

  return (
    <>
      <Alert
        display={isExpired || isExpiringSoon ? "flex" : "none"}
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
            {isExpiringSoon
              ? "Información de Vencimiento"
              : "Suscripción Expirada"}
          </AlertTitle>
          <AlertDescription
            color="red.700"
            fontSize={{ base: "11px", lg: "13px" }}
          >
            {isExpiringSoon
              ? `Tu suscripción vencerá pronto el ${formatDate(expirationDate)}`
              : `Tu suscripción expiró el ${formatDate(expirationDate)}.`}
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
