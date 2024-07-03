import { useState } from "react";
import {
  Alert,
  Blockquote,
  Button,
  Container,
  Paper,
  Title,
} from "@mantine/core";
import { api } from "~/utils/api";
import { showNotification } from "@mantine/notifications";
import { calculateFare, getDistanceFromLatLonInKm } from "~/utils/goober-utils";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";

export default function RideForm() {
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [pickupLat, setPickupLat] = useState<number>();
  const [pickupLng, setPickupLng] = useState<number>();
  const [dropoffLat, setDropoffLat] = useState<number>();
  const [dropoffLng, setDropoffLng] = useState<number>();
  const [fare, setFare] = useState<number>();
  const [distance, setDistance] = useState<number>();
  const [message, setMessage] = useState<string | null>(null);
  const riderId = 1; // Dummy riderId for example purposes
  const requestRideMutation = api.goober.requestRide.useMutation();

  const handleCalculateFare = async () => {
    if (
      !pickup ||
      !dropoff ||
      !pickupLat ||
      !pickupLng ||
      !dropoffLat ||
      !dropoffLng
    ) {
      showNotification({
        title: "Error",
        message: "Please enter pickup and dropoff locations",
        color: "red",
      });
      return;
    }
    const distanceInKM = getDistanceFromLatLonInKm(
      pickupLat,
      pickupLng,
      dropoffLat,
      dropoffLng,
    );
    setDistance(distanceInKM);
    const calculatedFare = calculateFare(distanceInKM);
    setFare(calculatedFare);
    const distanceFormatted = distanceInKM.toFixed(2);
    const fareFormatted = calculatedFare.toFixed(2);
    setMessage(
      `Your ride will be <i>${distanceFormatted} KM</i> long and will cost <b>${fareFormatted} USD</b>.`,
    );
  };

  const handleRequestRide = async () => {
    try {
      await requestRideMutation.mutateAsync({
        pickup,
        dropoff,
        fare: fare ?? 0,
        riderId,
        pickupLat: pickupLat ?? 0,
        pickupLng: pickupLng ?? 0,
        dropoffLat: dropoffLat ?? 0,
        dropoffLng: dropoffLng ?? 0,
        distance: distance ?? 0,
      });
      showNotification({
        title: "Ride Requested",
        message: "Your ride has been requested successfully",
        color: "green",
      });
      const distanceFormatted = distance?.toFixed(2);
      const fareFormatted = fare?.toFixed(2);
      setMessage(
        `Your ride will be <i>${distanceFormatted} KM</i> long and will cost <b>${fareFormatted} USD</b>.`,
      );
    } catch (error) {
      setMessage(null);
      showNotification({
        title: "Error",
        message: "Failed to request ride",
        color: "red",
      });
    }
  };

  const handlePlaceSelected = (
    place: google.maps.places.PlaceResult,
    setLocation: (location: string) => void,
    setLat: (lat: number | undefined) => void,
    setLng: (lng: number | undefined) => void,
  ) => {
    const address = place.formatted_address ?? "";
    setLocation(address);
    setLat(place.geometry?.location?.lat());
    setLng(place.geometry?.location?.lng());
  };

  return (
    <Container size="xs" px="xs">
      <Paper shadow="xl" p="lg" radius="md">
        <Title order={2} mb="lg">
          Request a Ride
        </Title>
        <GooglePlacesAutocomplete
          label="Pickup Location"
          onPlaceSelected={(place) =>
            handlePlaceSelected(place, setPickup, setPickupLat, setPickupLng)
          }
        />
        <GooglePlacesAutocomplete
          label="Dropoff Location"
          onPlaceSelected={(place) =>
            handlePlaceSelected(place, setDropoff, setDropoffLat, setDropoffLng)
          }
        />
        {!message && (
          <Button
            onClick={handleCalculateFare}
            fullWidth
            mt="md"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Calculate Fare
          </Button>
        )}
        {message && (
          <>
            <Blockquote mt="lg" color="indigo" cite="– Goober Ride Service">
              <span dangerouslySetInnerHTML={{ __html: message }} />
            </Blockquote>
            <Button
              onClick={handleRequestRide}
              fullWidth
              mt="md"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              Request Ride
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}
