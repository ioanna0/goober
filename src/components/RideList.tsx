import { Container, Title, List, ListItem } from "@mantine/core";
import { api } from "~/utils/api";

export default function RideList({ userId }: { userId: number }) {
  const getRidesQuery = api.goober.getRides.useQuery({ userId });

  if (getRidesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (getRidesQuery.error) {
    return <div>Error loading rides</div>;
  }

  const rides = getRidesQuery.data;

  return (
    <Container className="rounded-md bg-white p-6 shadow-md">
      <Title order={2} className="mb-4 text-center">
        Your Rides
      </Title>
      <List className="space-y-4">
        {rides?.map((ride) => (
          <div key={ride.id} className="rounded-md border p-4 shadow-sm">
            <div className="mb-2 font-bold">
              {ride.pickup} to {ride.dropoff}
            </div>
            <div>Status: {ride.status}</div>
          </div>
        ))}
      </List>
    </Container>
  );
}
