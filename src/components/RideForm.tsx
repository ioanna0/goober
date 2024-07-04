/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState, useCallback } from "react";
import { Blockquote, Button, Container, Paper, Title } from "@mantine/core";
import { api } from "~/utils/api";
import { showNotification } from "@mantine/notifications";
import { calculateFare } from "~/utils/goober-utils";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import RouteMap from "./RouteMap";

export default function RideForm({
  getRidesQuery,
  riderId,
}: {
  getRidesQuery: any;
  riderId: number;
}) {
  const [state, setState] = useState({
    pickup: "",
    dropoff: "",
    pickupLat: undefined as number | undefined,
    pickupLng: undefined as number | undefined,
    dropoffLat: undefined as number | undefined,
    dropoffLng: undefined as number | undefined,
    fare: undefined as number | undefined,
    distance: undefined as { text: string; value: number } | undefined,
    duration: undefined as { text: string; value: number } | undefined,
    message: null as string | null,
    showFareAndMap: false,
  });

  const requestRideMutation = api.goober.requestRide.useMutation();

  useEffect(() => {
    if (state.distance && state.duration) {
      const calculatedFare = calculateFare(
        state.distance.value,
        state.duration.value,
      );
      setState((prevState) => ({
        ...prevState,
        fare: calculatedFare,
        message: `Your ride will be <i>${state.distance!.text}</i> long, will take ${state.duration!.text}, and will cost <b>${calculatedFare} USD</b>.`,
      }));
    }
  }, [state.distance, state.duration]);

  const handleCalculateFare = useCallback(() => {
    if (
      !state.pickup ||
      !state.dropoff ||
      state.pickupLat === undefined ||
      state.pickupLng === undefined ||
      state.dropoffLat === undefined ||
      state.dropoffLng === undefined
    ) {
      showNotification({
        title: "Error",
        message: "Please enter pickup and dropoff locations",
        color: "red",
      });
      return;
    }
    setState((prevState) => ({ ...prevState, showFareAndMap: true }));
  }, [state]);

  const handleRequestRide = useCallback(async () => {
    try {
      await requestRideMutation.mutateAsync({
        pickup: state.pickup,
        dropoff: state.dropoff,
        fare: state.fare ?? 0,
        riderId,
        pickupLat: state.pickupLat ?? 0,
        pickupLng: state.pickupLng ?? 0,
        dropoffLat: state.dropoffLat ?? 0,
        dropoffLng: state.dropoffLng ?? 0,
        distance: state.distance ? Math.floor(state.distance.value / 1000) : 0,
      });
      getRidesQuery.refetch();
      showNotification({
        title: "Ride Requested",
        message: "Your ride has been requested successfully",
        color: "green",
      });
      setState({
        pickup: "",
        dropoff: "",
        pickupLat: undefined,
        pickupLng: undefined,
        dropoffLat: undefined,
        dropoffLng: undefined,
        fare: undefined,
        distance: undefined,
        duration: undefined,
        message: null,
        showFareAndMap: false,
      });
    } catch (error) {
      setState((prevState) => ({ ...prevState, message: null }));
      showNotification({
        title: "Error",
        message: "Failed to request ride",
        color: "red",
      });
    }
  }, [state, riderId, getRidesQuery, requestRideMutation]);

  const handlePlaceSelected = useCallback(
    (
      place: google.maps.places.PlaceResult,
      locationType: "pickup" | "dropoff",
    ) => {
      const address = place.formatted_address ?? "";
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      setState((prevState) => ({
        ...prevState,
        [locationType]: address,
        [`${locationType}Lat`]: lat,
        [`${locationType}Lng`]: lng,
      }));
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
          onPlaceSelected={(place) => handlePlaceSelected(place, "pickup")}
        />
        <GooglePlacesAutocomplete
          label="Dropoff Location"
          onPlaceSelected={(place) => handlePlaceSelected(place, "dropoff")}
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
        {state.showFareAndMap && (
          <div className="my-10">
            <Title order={6} mb="lg">
              Step 2. Review Fare and Route
            </Title>
            {state.message && (
              <Blockquote mt="lg" color="indigo" cite="– Goober Ride Service">
                <span dangerouslySetInnerHTML={{ __html: state.message }} />
              </Blockquote>
            )}
            <RouteMap
              pickup={{ lat: state.pickupLat!, lng: state.pickupLng! }}
              dropoff={{ lat: state.dropoffLat!, lng: state.dropoffLng! }}
              setDistance={(distance) =>
                setState((prevState) => ({ ...prevState, distance }))
              }
              setDuration={(duration) =>
                setState((prevState) => ({ ...prevState, duration }))
              }
            />
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
/* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
