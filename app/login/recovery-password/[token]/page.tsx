import RecoveryPassword from "@/components/log-in/RecoveryPassword";
import React from "react";

export default function RecoveryPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return <RecoveryPassword token={params.token} />;
}
