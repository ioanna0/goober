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
    <Container>
      <Title>Your Rides</Title>
      <List>
        {rides?.map((ride) => (
          <ListItem key={ride.id}>
            {ride.pickup} to {ride.dropoff} - {ride.status}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
