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
    <Container>
      <Title>Cancel a Ride</Title>
      <NumberInput
        label="Ride ID"
        value={rideId}
        onChange={(value) => setRideId(value)}
      />
      <Button onClick={handleCancelRide} mt="md">
        Cancel Ride
      </Button>
    </Container>
  );
}
