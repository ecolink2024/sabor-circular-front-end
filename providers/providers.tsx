"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./AuthProvider";
import ProtectedRouteWrapper from "./ProtectedRouteWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <AuthProvider>
          <ProtectedRouteWrapper>
          {children}
          </ProtectedRouteWrapper>
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
