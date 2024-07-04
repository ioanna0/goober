import React, { useEffect, useRef, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Libraries,
} from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "500px",
};

interface MapComponentProps {
  pickup: { lat: number; lng: number };
  dropoff: { lat: number; lng: number };
  setDistance: (distance: { text: string; value: number }) => void;
  setDuration: (duration: { text: string; value: number }) => void;
}

const RouteMap = ({
  pickup,
  dropoff,
  setDistance,
  setDuration,
}: MapComponentProps) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null,
  );
  const distanceMatrixServiceRef =
    useRef<google.maps.DistanceMatrixService | null>(null);
  const prevPickup = useRef<{ lat: number; lng: number } | null>(null);
  const prevDropoff = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!directionsServiceRef.current) {
      directionsServiceRef.current = new google.maps.DirectionsService();
    }
    if (!distanceMatrixServiceRef.current) {
      distanceMatrixServiceRef.current =
        new google.maps.DistanceMatrixService();
    }

    const calculateDrivingTime = (
      origin: { lat: number; lng: number },
      destination: { lat: number; lng: number },
    ) => {
      distanceMatrixServiceRef
        .current!.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === google.maps.DistanceMatrixStatus.OK) {
              const element = response?.rows[0]?.elements[0];
              if (
                element?.status === google.maps.DistanceMatrixElementStatus.OK
              ) {
                setDistance(element.distance);
                setDuration(element.duration);
              } else {
                console.error("Error:", element?.status);
              }
            } else {
              console.error("Error:", status);
            }
          },
        )
        .catch(console.error);
    };

    const fetchDirections = () => {
      directionsServiceRef
        .current!.route(
          {
            origin: pickup,
            destination: dropoff,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
              calculateDrivingTime(pickup, dropoff);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          },
        )
        .catch(console.error);
    };

    if (
      !prevPickup.current ||
      !prevDropoff.current ||
      prevPickup.current.lat !== pickup.lat ||
      prevPickup.current.lng !== pickup.lng ||
      prevDropoff.current.lat !== dropoff.lat ||
      prevDropoff.current.lng !== dropoff.lng
    ) {
      prevPickup.current = pickup;
      prevDropoff.current = dropoff;
      console.log("Fetching directions...");
      fetchDirections();
    }
  }, [pickup, dropoff, setDistance, setDuration]);

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={pickup} zoom={8}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RouteMap;
