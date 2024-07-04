import { Ride } from "@prisma/client";
import { useState, useEffect } from "react";
import Layout from "~/components/Layout";
import RideList from "~/components/RideList";
import { api } from "~/utils/api";
import RideForm from "../components/RideForm";
import { useRouter } from "next/router";

export default function RiderPage() {
  const router = useRouter();
  const riderId = router.query.rider ? Number(router.query.rider as string) : 1;
  const [rides, setRides] = useState<Ride[]>([]);
  const getRidesQuery = api.goober.getRides.useQuery(
    { userId: riderId },
    {
      refetchInterval: 5000, // Poll every 5 seconds
    },
  );

  useEffect(() => {
    if (getRidesQuery.data) {
      setRides(getRidesQuery.data);
    }
  }, [getRidesQuery.data]);

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-4">
          <RideForm getRidesQuery={getRidesQuery} riderId={riderId} />
        </div>
        <div className="flex-1 p-4">
          <RideList getRidesQuery={getRidesQuery} rides={rides} />
        </div>
      </div>
    </Layout>
  );
}
