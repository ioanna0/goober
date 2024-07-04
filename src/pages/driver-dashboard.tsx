import Layout from "~/components/Layout";
import DriverDashboard from "../components/DriverDashboard";
import { useRouter } from "next/router";

export default function DriverDashboardPage() {
  const router = useRouter();
  const driverId = router.query.driver
    ? Number(router.query.driver as string)
    : 1; 
  return (
    <Layout>
      <DriverDashboard driverId={driverId} />
    </Layout>
  );
}
