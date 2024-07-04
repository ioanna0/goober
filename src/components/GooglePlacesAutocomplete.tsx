import React, { useRef } from "react";
import {
  useLoadScript,
  StandaloneSearchBox,
  Libraries,
} from "@react-google-maps/api";

interface GooglePlacesAutocompleteProps {
  label: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const libraries: Libraries = ["places"] as unknown as Libraries;

export default function GooglePlacesAutocomplete({
  label,
  onPlaceSelected,
}: GooglePlacesAutocompleteProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      onPlaceSelected(places[0]!);
    }
  };

  return (
    <>
      {isLoaded && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for a place"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </StandaloneSearchBox>
        </div>
      )}
      {!isLoaded && <div>Loading...</div>}
    </>
  );
}
