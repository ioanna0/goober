import RideList from "~/components/RideList";
import RideForm from "../components/RideForm";

export default function RiderPage() {
  return (
    <>
      <RideForm />
      <RideList userId={1} />
    </>
  );
}
