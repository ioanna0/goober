import { Container, Title, List, ListItem, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { api } from "~/utils/api";

export default function DriverDashboard({ driverId }: { driverId: number }) {
  const getRequestsQuery = api.driver.getRequests.useQuery({ driverId });
  const acceptRequestMutation = api.driver.acceptRequest.useMutation();

  const handleAcceptRequest = async (rideId: number) => {
    try {
      await acceptRequestMutation.mutateAsync({ rideId, driverId });
      showNotification({
        title: "Request Accepted",
        message: "You have accepted the ride request",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to accept ride request",
        color: "red",
      });
    }
  };

  if (getRequestsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (getRequestsQuery.error) {
    return <div>Error loading ride requests</div>;
  }

  const requests = getRequestsQuery.data;

  return (
    <Container className="rounded-md bg-white p-6 shadow-md">
      <Title order={2} className="mb-4 text-center">
        Ride Requests
      </Title>
      <List className="space-y-4">
        {requests?.map((request) => (
          <div key={request.id} className="rounded-md border p-4 shadow-sm">
            <div className="mb-2 font-bold">
              {request.pickup} to {request.dropoff}
            </div>
            <div>Fare: {request.fare} USD</div>
            <Button
              onClick={() => handleAcceptRequest(request.id)}
              className="mt-2"
            >
              Accept
            </Button>
          </div>
        ))}
      </List>
    </Container>
  );
}
