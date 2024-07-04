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
import { Ride } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function DriverDashboard({ driverId }: { driverId: number }) {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [requests, setRequests] = useState<Ride[]>([]);

  const getRequestsQuery = api.driver.getRequests.useQuery(
    { driverId },
    {
      enabled: !currentRide,
      refetchInterval: 5000, // Poll every 5 seconds
    },
  );

  useEffect(() => {
    if (getRequestsQuery.isSuccess && getRequestsQuery.data) {
      const currentRide = getRequestsQuery.data.find(
        (ride: Ride) =>
          ride.status === "ACCEPTED" && ride.driverId === driverId,
      );
      setCurrentRide(currentRide ?? null);

      setRequests(getRequestsQuery.data);
    }
  }, [getRequestsQuery.isSuccess, getRequestsQuery.data]);

  const acceptRequestMutation = api.driver.acceptRequest.useMutation({
    onSuccess: (ride) => {
      setCurrentRide(ride);
      setRequests([]);
      showNotification({
        title: "Request Accepted",
        message: "You have accepted the ride request",
        color: "green",
      });
    },
    onError: (error) => {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  const completeRideMutation = api.driver.completeRide.useMutation({
    onSuccess: () => {
      setCurrentRide(null);
      showNotification({
        title: "Ride Completed",
        message: "You have completed the ride",
        color: "green",
      });
      getRequestsQuery.refetch().catch(console.error);
    },
    onError: (error) => {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  const handleAcceptRequest = (rideId: number) => {
    acceptRequestMutation.mutate({ rideId, driverId });
  };

  const handleCompleteRide = () => {
    if (currentRide) {
      completeRideMutation.mutate({ rideId: currentRide.id, driverId });
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
      {currentRide ? (
        <div>
          <Title order={3} className="text-center text-indigo-600">
            Current Ride
          </Title>
          <div className="mb-4 rounded-md border p-4 shadow-sm">
            <div className="mb-2 font-bold">
              {currentRide.pickup} to {currentRide.dropoff}
            </div>
            <div>Fare: {currentRide.fare} USD</div>
            <Button
              onClick={handleCompleteRide}
              className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              Complete Ride
            </Button>
          </div>
        </div>
      ) : (
        <List className="space-y-4">
          {requests.length === 0 && (
            <Notification color="gray" title="No ride requests">
              There are no ride requests at the moment
            </Notification>
          )}
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
      )}
    </Container>
  );
}
