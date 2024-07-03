import { useState } from "react";
import { Alert, Button, TextInput, Title } from "@mantine/core";
import { api } from "~/utils/api";
import axios from "axios";

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
  const [message, setMessage] = useState<string | null>(null);
  const riderId = 1; // Dummy riderId for example purposes
  const requestRideMutation = api.goober.requestRide.useMutation();

  const handleRequestRide = async () => {
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
    const distance = getDistanceFromLatLonInKm(
      pickupLat,
      pickupLng,
      dropoffLat,
      dropoffLng,
    );
    const calculatedFare = calculateFare(distance);
    const fare = calculatedFare;
    try {
      await requestRideMutation.mutateAsync({
        pickup,
        dropoff,
        fare,
        riderId,
        pickupLat,
        pickupLng,
        dropoffLat,
        dropoffLng,
        distance,
      });
      showNotification({
        title: "Ride Requested",
        message: "Your ride has been requested successfully",
        color: "green",
      });
      setMessage(
        `Your ride will be ${distance.toFixed(2)} KM distance long and it will cost you ${fare.toFixed(2)} USD.`,
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
    <>
      <div className="mx-auto max-w-md rounded-md border border-gray-200 bg-white p-6 shadow-md">
        <Title order={2} className="mb-4 text-center">
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
        <Button
          onClick={handleRequestRide}
          fullWidth
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Request Ride
        </Button>
      </div>
      {message && (
        <Alert variant="light" color="green" title="Ride Information">
          {message}
        </Alert>
      )}
    </>
  );
}
