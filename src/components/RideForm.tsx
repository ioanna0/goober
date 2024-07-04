import { useEffect, useState, useCallback } from "react";
import { Blockquote, Button, Container, Paper, Title } from "@mantine/core";
import { api } from "~/utils/api";
import { showNotification } from "@mantine/notifications";
import { calculateFare } from "~/utils/goober-utils";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import RouteMap from "./RouteMap";

export default function RideForm() {
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [pickupLat, setPickupLat] = useState<number>();
  const [pickupLng, setPickupLng] = useState<number>();
  const [dropoffLat, setDropoffLat] = useState<number>();
  const [dropoffLng, setDropoffLng] = useState<number>();
  const [fare, setFare] = useState<number>();
  const [distance, setDistance] = useState<{ text: string; value: number }>();
  const [duration, setDuration] = useState<{ text: string; value: number }>();
  const [message, setMessage] = useState<string | null>(null);
  const [showFareAndMap, setShowFareAndMap] = useState<boolean>(false);
  const riderId = 1; // Dummy riderId for example purposes
  const requestRideMutation = api.goober.requestRide.useMutation();

  useEffect(() => {
    if (distance && duration) {
      const calculatedFare = calculateFare(distance.value, duration.value);
      setFare(calculatedFare);
      setMessage(
        `Your ride will be <i>${distance.text}</i> long, will take ${duration.text}, and will cost <b>${calculatedFare} USD</b>.`,
      );
    }
  }, [distance, duration]);

  const handleCalculateFare = useCallback(() => {
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
    setShowFareAndMap(true);
  }, [pickup, dropoff, pickupLat, pickupLng, dropoffLat, dropoffLng]);

  const handleRequestRide = useCallback(async () => {
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
        distance: distance ? Math.floor(distance?.value / 1000) : 0,
      });
      showNotification({
        title: "Ride Requested",
        message: "Your ride has been requested successfully",
        color: "green",
      });
    } catch (error) {
      setMessage(null);
      showNotification({
        title: "Error",
        message: "Failed to request ride",
        color: "red",
      });
    }
  }, [
    pickup,
    dropoff,
    fare,
    riderId,
    pickupLat,
    pickupLng,
    dropoffLat,
    dropoffLng,
    distance,
    requestRideMutation,
  ]);

  const handlePlaceSelected = useCallback(
    (
      place: google.maps.places.PlaceResult,
      setLocation: (location: string) => void,
      setLat: (lat: number | undefined) => void,
      setLng: (lng: number | undefined) => void,
    ) => {
      const address = place.formatted_address ?? "";
      setLocation(address);
      setLat(place.geometry?.location?.lat());
      setLng(place.geometry?.location?.lng());
    },
    [],
  );

  return (
    <Container size="xs" px="xs">
      <Paper shadow="xl" p="lg" radius="md">
        <Title order={3} mb="lg">
          Request a Ride
        </Title>
        <Title order={6} mb="lg">
          Step 1. Enter Pickup and Dropoff Locations
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
        <Button
          onClick={handleCalculateFare}
          fullWidth
          mt="md"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
        >
          Calculate Fare
        </Button>
        {showFareAndMap && (
          <div className="my-10">
            <Title order={6} mb="lg">
              Step 2. Review Fare and Route
            </Title>
            <RouteMap
              pickup={{ lat: pickupLat!, lng: pickupLng! }}
              dropoff={{ lat: dropoffLat!, lng: dropoffLng! }}
              setDistance={setDistance}
              setDuration={setDuration}
            />

            {message && (
              <Blockquote mt="lg" color="indigo" cite="– Goober Ride Service">
                <span dangerouslySetInnerHTML={{ __html: message }} />
              </Blockquote>
            )}
            <Button
              onClick={handleRequestRide}
              fullWidth
              mt="md"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              Request Ride
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
}
