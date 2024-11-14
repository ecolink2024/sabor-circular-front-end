import { Skeleton } from "@chakra-ui/react";

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
