import { Skeleton } from "@chakra-ui/react";

export function SkeletonBox() {
  return (
    <Skeleton
      w={"100%"}
      maxW={"md"}
      h={"100%"}
      minH={"md"}
      borderRadius={"lg"}
    />
  );
}
