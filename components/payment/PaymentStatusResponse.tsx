"use client";
import { useEffect, useState } from "react";
import { Box, Container, Image } from "@chakra-ui/react";
import { useAuth } from "@/providers/AuthProvider";
import { getUserType } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import Success from "./Success";
import Failure from "./Failure";
import Pending from "./Pending";

export default function PaymentStatusResponse({ status }: { status: string }) {
  const router = useRouter();
  const { userRole, user, refetchUserData } = useAuth();
  const role = getUserType(userRole);

  const [countdown, setCountdown] = useState<number>(
    status === "pending" ? 10 : 5
  );

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, user, role, router, refetchUserData]);

  useEffect(() => {
    if (countdown === 1) {
      const updateDataAndRedirect = async () => {
        refetchUserData();

        router.push(
          `/dashboard/${role === "hibrido" ? "gastronomico" : role}/${
            user?._id
          }`
        );
      };

      updateDataAndRedirect();
    }
  }, [countdown, refetchUserData, router, role, user?._id]);

  return (
    <Container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minW={"100%"}
      h={"100vh"}
    >
      <Box
        w="full"
        maxW="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderWidth={1}
        p={{ base: 4, lg: 8 }}
        borderRadius="xl"
        boxShadow="md"
        mx="auto"
        bg={"white"}
        borderColor={
          status === "success"
            ? "green.200"
            : status === "failure"
            ? "red.300"
            : "yellow.400"
        }
        position={"relative"}
        gap={8}
      >
        {/* Sabor Circular Logo */}
        <Box position={"absolute"} top={6} right={6}>
          <Image
            alt="payment-status-logo"
            src="/img/fondo-contact.png"
            w={"100%"}
            h={"auto"}
            maxW={{ base: "50px", lg: "70px" }}
          />
        </Box>

        {/* Success  */}
        {status === "success" && <Success countdown={countdown} />}

        {/* Failure */}
        {status === "failure" && <Failure countdown={countdown} />}

        {/* Pending */}
        {status === "pending" && <Pending countdown={countdown} />}
      </Box>
    </Container>
  );
}
