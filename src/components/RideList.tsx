import {
  Container,
  Title,
  List,
  Paper,
  Button,
  Loader,
  Notification,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { api } from "~/utils/api";

export default function RideList({ userId }: { userId: number }) {
  const getRidesQuery = api.goober.getRides.useQuery({ userId });
  const cancelRideMutation = api.goober.cancelRide.useMutation();

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

  if (getRidesQuery.isLoading) {
    return (
      <Container className="flex min-h-screen items-center justify-center">
        <Loader size="xl" variant="dots" />
      </Container>
    );
  }

  if (getRidesQuery.error) {
    return (
      <Container className="flex min-h-screen items-center justify-center">
        <Notification color="red" title="Error">
          Error loading rides
        </Notification>
      </Container>
    );
  }

  const rides = getRidesQuery.data;

  return (
    <Container className="mx-auto max-w-3xl rounded-md bg-white p-8 shadow-xl">
      <Title order={3} mb={10} className="text-center text-indigo-600">
        Your Rides
      </Title>
      <List className="space-y-4">
        {rides?.map((ride) => (
          <Paper
            key={ride.id}
            shadow="sm"
            p="md"
            withBorder
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="mb-2 font-bold text-gray-700">
              {ride.pickup} to {ride.dropoff}
            </div>
            <div className="text-gray-600">
              Fare: ${ride.fare.toFixed(2)} USD
            </div>
            <div className="text-gray-600">
              Distance: {ride.distance.toFixed(2)} km
            </div>
            <div className="text-gray-600">Status: {ride.status}</div>
            {ride.status !== "CANCELLED" && (
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                onClick={() => handleCancelRide(ride.id)}
                fullWidth
                className="mt-4"
              >
                Cancel Ride
              </Button>
            )}
          </Paper>
        ))}
      </List>
    </Container>
  );
}
