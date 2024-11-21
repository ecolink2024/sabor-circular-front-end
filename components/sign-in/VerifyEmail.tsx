"use client";
import { verifyEmail } from "@/lib/actions/actions";
import { Box, Button, Center, Image, Text, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail({ token }: { token: string | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then((result) => {
          setMessage(result.message);
          setLoading(false);
        })
        .catch((error) => {
          setMessage(error);
          setLoading(false);
        });
    }
  }, [token]);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <Center w="100%" h="100vh" p={4}>
      <Skeleton isLoaded={!loading} borderRadius={"20px"}>
        <Box
          w="100%"
          maxW="500px"
          py={6}
          px={8}
          borderRadius="20px"
          boxShadow="lg"
          bg="white"
          textAlign="center"
          border="1px solid #e2e8f0"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={6}
        >
          <Image
            src="/img/fondo-contact.png"
            w={"80px"}
            h={"auto"}
            alt="verify-email"
          />

          <Text fontSize={{ base: "md", sm: "lg" }} mb={4} fontWeight={600}>
            {message || "¡Tu correo electrónico ha sido verificado con éxito!"}
          </Text>
          <Button
            onClick={handleLoginRedirect}
            type="button"
            bg={"rgba(81, 138, 62, 0.7)"}
            _hover={{ bg: "gray.300" }}
            borderRadius={"8.93px"}
            color={"white"}
            width="full"
            size={{ base: "md", sm: "lg" }}
          >
            Ir a Iniciar sesión
          </Button>
        </Box>
      </Skeleton>
    </Center>
  );
}
