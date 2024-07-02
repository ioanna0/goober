import { useState } from "react";
import {
  Button,
  TextInput,
  Container,
  Title,
  NumberInput,
} from "@mantine/core";
import { api } from "~/utils/api";

import { showNotification } from "@mantine/notifications";

export default function RideForm() {
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [fare, setFare] = useState<number>(0);
  const riderId = 1; // Dummy riderId for example purposes
  const requestRideMutation = api.goober.requestRide.useMutation();

  const handleRequestRide = async () => {
    try {
      await requestRideMutation.mutateAsync({
        pickup,
        dropoff,
        fare,
        riderId,
      });
      showNotification({
        title: "Ride Requested",
        message: "Your ride has been requested successfully",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to request ride",
        color: "red",
      });
    }
  };

  return (
    <Container>
      <Title>Request a Ride</Title>
      <TextInput
        label="Pickup Location"
        value={pickup}
        onChange={(event) => setPickup(event.currentTarget.value)}
      />
      <TextInput
        label="Dropoff Location"
        value={dropoff}
        onChange={(event) => setDropoff(event.currentTarget.value)}
      />
      <NumberInput
        label="Fare"
        value={fare}
        onChange={(value) => setFare(value ? Number : 0)}
      />
      <Button onClick={handleRequestRide} mt="md">
        Request Ride
      </Button>
    </Container>
  );
}
