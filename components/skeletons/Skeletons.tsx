import { Skeleton } from "@chakra-ui/react";

export function SkeletonUser() {
  return <Skeleton opacity={0.6} w={"48px"} h={"48px"} borderRadius={"full"} />;
}

export function SkeletonBox() {
  return (
    <Skeleton
      w={"100%"}
      maxW={"390px"}
      h={"100%"}
      minH={"400px"}
      borderRadius={"16px"}
    />
  );
}

export function SkeletonUserUpdate() {
  return (
    <Skeleton
      rounded="20px"
      boxShadow="lg"
      maxWidth={{ base: "300px", lg: "450px" }}
      width="100%"
      h={"100%"}
      minH={"600px"}
    />
  );
}
