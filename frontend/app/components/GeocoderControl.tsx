import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import GeocoderControl from "leaflet-control-geocoder";
import L from "leaflet";
import fuzzysearch from "fuzzysearch";

interface GeocoderControlProps {
  onLocationSearch: (location: string) => void; // Callback function to handle location search
  onCensusDataReceived: (data: any) => void;
}

const GeocoderControlComponent: React.FC<GeocoderControlProps> = ({
  onLocationSearch,
  onCensusDataReceived,
}) => {
  const map = useMap();
  useEffect(() => {
    const geocoder = new GeocoderControl({
      defaultMarkGeocode: true,
      collapsed: false,
      position: "topright",
      geocoder: L.Control.Geocoder.nominatim(), // ignore the property error here
      reverseGeocoding: true, // same here, ignore
      collapsedWidth: 250,
      placeholder: "Search for a location...",
      errorMessage: "Nothing found.",
      suggestMinLength: 3,
      suggestTimeout: 250,
      showResultIcons: true,
      showResultMarkers: false,
      expand: "click",
      queryMinLength: 3,
      type: "search",
    });
  
    geocoder.addTo(map);
  
    geocoder.on("markgeocode", async (e) => {
      const { center } = e.geocode;
      map.setView(center, map.getZoom());
      onLocationSearch(e.geocode.name);
  
      // Preprocess the input to extract the relevant part for matching
      const input = e.geocode.name.toLowerCase().split(",")[0].trim();
      console.log("Input for fuzzy search:", input);
  
      // Check local storage for cached data
      const cachedData = localStorage.getItem(`censusData-${input}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        console.log("Using cached data:", parsedData);
        onCensusDataReceived(parsedData);
        return;
      }
  
      // Fetch data from Census API
      try {
        const response = await fetch(
          `https://api.census.gov/data/2019/acs/acs1?get=NAME,B01001_001E&for=place:*&in=state:*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const data = await response.json();
  
        // Perform a fuzzy search on the array of arrays to match CENSUS API data
        const matchedLocation = data.find((location) =>
          fuzzysearch(input, location[0].toLowerCase())
        );
  
        console.log(matchedLocation);
  
        if (matchedLocation) {
          const [, , stateCode, placeCode] = matchedLocation;
          const encodedLocation = encodeURIComponent(
            `${stateCode},${placeCode}`
          );
          console.log("Matched location:", matchedLocation);
          console.log("Encoded location sent to backend:", encodedLocation);
  
          // Make API call to fetch Census data based on the matched place and state
          try {
            const censusResponse = await fetch(
              `http://localhost:4040/api/census/census-data?state=${stateCode}&place=${placeCode}`
            );
            if (!censusResponse.ok) {
              throw new Error("Failed to fetch data from backend");
            }
            const censusData = await censusResponse.json();
            onCensusDataReceived(censusData);
            console.log(censusData);
  
            // Cache the fetched data
            localStorage.setItem(`censusData-${input}`, JSON.stringify(censusData));
          } catch (error) {
            console.error("Error fetching Census data:", error);
          }
        } else {
          console.log("Location not found in API data");
          onCensusDataReceived(null);
        }
      } catch (error) {
        console.error("Error fetching data from Census API:", error);
      }
    });
  
    return () => {
      map.removeControl(geocoder);
    };
  }, [map, onLocationSearch, onCensusDataReceived]);
  
  return null;}

export default GeocoderControlComponent;
