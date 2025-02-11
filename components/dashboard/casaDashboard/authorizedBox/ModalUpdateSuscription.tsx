import MercadoPagoPayment from "@/components/payment/MercadoPagoPayment";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";

const ModalUpdateSuscription = ({
  isOpen,
  onClose,
  activated,
  preference,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  activated: boolean;
  preference: PreferenceResponse | null;
  isLoading: boolean;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={"10px"}>
        <ModalHeader>Renovar Suscripcion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Display MercadoPagoPayment only after activation */}
          {activated && preference && !isLoading && (
            <MercadoPagoPayment preferenceId={preference.id!} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdateSuscription;
