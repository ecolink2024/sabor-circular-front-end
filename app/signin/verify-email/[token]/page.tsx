import VerifyEmail from "@/components/sign-in/VerifyEmail";
import React from "react";

export default function verifyEmail({ params }: { params: { token: string } }) {
  return <VerifyEmail token={params?.token} />;
}
