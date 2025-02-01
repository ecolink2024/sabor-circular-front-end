import PaymentStatusResponse from "@/components/payment/PaymentStatusResponse";

export default function Status({ params }: { params: { status: string } }) {
  return <PaymentStatusResponse status={params.status} />;
}
