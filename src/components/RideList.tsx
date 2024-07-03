import { Container, Title, List, ListItem, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { api } from "~/utils/api";

export default function RideList({ userId }: { userId: number }) {
  const getRidesQuery = api.goober.getRides.useQuery({ userId });
  const cancelRideMutation = api.goober.cancelRide.useMutation();

  if (getRidesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (getRidesQuery.error) {
    return <div>Error loading rides</div>;
  }

  const rides = getRidesQuery.data;

  const handleCancelRide = async (rideId: number) => {
    if (rideId !== null) {
      try {
        await cancelRideMutation.mutateAsync({ rideId });
        showNotification({
          title: "Ride Cancelled",
          message: "Your ride has been cancelled successfully",
          color: "green",
        });
      } catch (error) {
        showNotification({
          title: "Error",
          message: "Failed to cancel ride",
          color: "red",
        });
      }
    }
  };

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
            <div>Fare: {ride.fare.toFixed(2)} USD</div>
            <div>Distance: {ride.distance.toFixed(2)} km</div>
            <div>Status: {ride.status}</div>
            {ride.status !== "CANCELLED" && (
              <Button onClick={() => handleCancelRide(ride.id)} fullWidth>
                Cancel Ride
              </Button>
            )}
          </div>
        ))}
      </List>
    </Container>
  );
}
