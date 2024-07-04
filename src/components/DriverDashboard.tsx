import {
  Container,
  Title,
  List,
  Button,
  Loader,
  Notification,
  Paper,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function DriverDashboard({ driverId }: { driverId: number }) {
  const getRequestsQuery = api.driver.getRequests.useQuery({ driverId });
  const acceptRequestMutation = api.driver.acceptRequest.useMutation();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/api/websocket");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };
    ws.onmessage = (event) => {
      const newRequest = JSON.parse(event.data);
      setRequests((prevRequests) => [...prevRequests, ...newRequest]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // return () => {
    //   ws.close();
    // };
  }, []);

  useEffect(() => {
    if (getRequestsQuery.data) {
      const uniqueRequests = getRequestsQuery.data.filter(
        (request) => !requests.some((r) => r.id === request.id),
      );
      setRequests([...requests, ...uniqueRequests]);
    }
  }, [getRequestsQuery.data]);

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
    return (
      <Container className="flex min-h-screen items-center justify-center">
        <Loader size="xl" variant="dots" />
      </Container>
    );
  }

  if (getRequestsQuery.error) {
    return (
      <Container className="flex min-h-screen items-center justify-center">
        <Notification color="red" title="Error">
          Error loading ride requests
        </Notification>
      </Container>
    );
  }

  return (
    <Container className="mx-auto max-w-3xl rounded-md bg-white shadow-xl">
      <Title order={3} mb={10} className="text-center text-indigo-600">
        Ride Requests
      </Title>
      <List className="space-y-4">
        {requests?.map((request) => (
          <Paper
            key={request.id}
            shadow="sm"
            p="md"
            withBorder
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="mb-2 font-bold text-gray-700">
              {request.pickup} to {request.dropoff}
            </div>
            <div className="text-gray-600">
              Fare: ${request.fare.toFixed(2)} USD
            </div>
            <div className="text-gray-600">
              Distance: {request.distance.toFixed(2)} km
            </div>
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              onClick={() => handleAcceptRequest(request.id)}
              className="mt-4"
              fullWidth
            >
              Accept
            </Button>
          </Paper>
        ))}
      </List>
    </Container>
  );
}
