import AdminDashboard from "@/components/dashboard/adminDashboard/AdminDashboard";
import CasaDashboard from "@/components/dashboard/casaDashboard/CasaDashboard";
import GastronomicoAdheridoDashboard from "@/components/dashboard/gastronomicoAdheridoDashboard/GastronomicoAdheridoDashboard";
import PuntoCircularDashboard from "@/components/dashboard/puntoCircularDashboard/PuntoCircularDashboard";

export default async function Dashboard({
  params,
}: {
  params: { userType: string | undefined };
}) {
  const userType = params?.userType;


  const renderDashboard = () => {
    switch (userType) {
      case "casa":
        return <CasaDashboard />;
      case "admin":
        return <AdminDashboard />;
      case "punto":
        return <PuntoCircularDashboard />;
      case "gastronomico":
        return <GastronomicoAdheridoDashboard />;
      default:
        return (
          <div>No se encontró el dashboard para este tipo de usuario.</div>
        );
    }
  };

  return <div>{renderDashboard()}</div>;
}
