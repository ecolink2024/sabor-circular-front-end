import { Center, Spinner } from "@chakra-ui/react";

export default function loading() {
  return (
    <Center h={"100vh"}>
      <Spinner size={"xl"} color="#518a3e" />
    </Center>
  );
}
