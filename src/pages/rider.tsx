import Layout from "~/components/Layout";
import RideList from "~/components/RideList";
import RideForm from "../components/RideForm";

export default function RiderPage() {
  return (
    <Layout>
      <RideForm />
      <RideList userId={1} />
    </Layout>
  );
}
