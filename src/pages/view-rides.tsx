import Layout from "~/components/Layout";
import RideList from "../components/RideList";

export default function ViewRidesPage() {
  const userId = 1; // Dummy userId for example purposes
  return (
    <Layout>
      {" "}
      <RideList userId={userId} />{" "}
    </Layout>
  );
}
