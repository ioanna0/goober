import { useState } from "react";
import { Button, NumberInput, Container, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { api } from "~/utils/api";

export default function CancelRidePage() {
  const [rideId, setRideId] = useState<number | null>(null);
  const cancelRideMutation = api.goober.cancelRide.useMutation();

  const handleCancelRide = async () => {
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
    <Container className="mx-auto max-w-md rounded-md bg-white p-6 shadow-md">
      <Title order={2} className="mb-4 text-center">
        Cancel a Ride
      </Title>
      <NumberInput
        label="Ride ID"
        value={rideId}
        onChange={(value) => setRideId(value)}
        className="mb-4 rounded-md border border-gray-300 p-2"
      />
      <Button onClick={handleCancelRide} fullWidth>
        Cancel Ride
      </Button>
    </Container>
  );
}
