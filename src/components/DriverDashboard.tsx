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
    <Container>
      <Title>Ride Requests</Title>
      <List>
        {requests.map((request: any) => (
          <ListItem key={request.id}>
            {request.pickup} to {request.dropoff} - {request.fare} USD
            <Button onClick={() => handleAcceptRequest(request.id)} ml="md">
              Accept
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
