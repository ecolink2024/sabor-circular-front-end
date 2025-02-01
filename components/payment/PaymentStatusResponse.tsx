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
  const { user, userRole } = useAuth();
  const [countdown, setCountdown] = useState<number>(
    status === "pending" ? 10 : 5
  );

  const role = getUserType(userRole);

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          if (user) {
            // router.push(
            //   `/dashboard/${role === "hibrido" ? "gastronomico" : role}/${
            //     user._id
            //   }`
            // );
          } else {
            router.push("/");
          }
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, user, role, router]);

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
