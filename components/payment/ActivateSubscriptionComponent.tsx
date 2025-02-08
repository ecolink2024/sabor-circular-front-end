"use client";
import { Center } from "@chakra-ui/react";
import DefaultBox from "../dashboard/casaDashboard/defaultBox/DefaultBox";
import FaqsComponent from "../fqs/FaqsComponent";

export default function ActivateSubscriptionComponent() {
  return (
    <Center flexDirection={"column"} p={{ base: 10, lg: 20 }} gap={6}>
      {/* Default Box Redirect to Login */}
      <DefaultBox
        duration={6}
        price={10500}
        oldPrice={23500}
        isActivateSubscriptionPage
      />

      {/* Faqs */}
      <FaqsComponent />
    </Center>
  );
}
