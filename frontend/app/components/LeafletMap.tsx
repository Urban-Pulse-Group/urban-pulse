import React, { useRef, useEffect, useState } from "react";
import Leaflet, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  data: any;
}

// function formatCurrency(amount: number) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// }

// function formatNumber(number: number) {
//   return number.toLocaleString("en-US");
// }

const Map: React.FC<MapProps> = ({ data }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  // const [censusData, setCensusData] = useState<CensusDataType[] | null>(null);

  useEffect(() => {
    initializeMap();
  }, []);

  

  const initializeMap = () => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = Leaflet.map(mapContainerRef.current);

      // Geolocation API to get the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13);
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Made a default view incase user's location cannot be found.
          map.setView([34.0522, -118.2437], 13);
        }
      );

      mapRef.current = map;

      Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Fetch census data from backend when map initializes
      fetchCensusData();
    }
  };

  const fetchCensusData = async () => {
    try {
      const res = await fetch("http://localhost:4040/api/census");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data)
      // processData(data);
    } catch (error) {
      console.error("Error fetching Census data:", error);
    }
  };

  // const processData = async (censusData: any) => {
  //   if (censusData && mapRef.current) {
  //     for (const dataRow of censusData) {
  //       if (Array.isArray(dataRow) && dataRow.length >= 6) {
  //         const [
  //           medianIncome,
  //           population,
  //           totalHousingUnits,
  //           state,
  //           county,
  //           tract,
  //         ] = dataRow;
  //         // console.log("state:", state, "medianIncome:", medianIncome, "population:", population, "tract:", tract, "county:", county);
  //         const coordinates = await getCoordinatesFromGoogleMaps(
  //           state,
  //           county,
  //           tract,
  //           "Los Angeles"
  //         );
  //         // console.log("coordinates:", coordinates, "state:", state, "county:", county, "tract:", tract)
  //         if (coordinates) {
  //           const [latitude, longitude] = coordinates;
  //           const popupContent = `
  //             <span class="text-black">Median Income:  ${formatCurrency(
  //               parseFloat(medianIncome)
  //             )} </span> <br/>
  //             <span class="text-black">Population: ${formatNumber(
  //               parseFloat(population)
  //             )} </span> <br/>
  //             <span class="text-black">Housing Units: ${formatNumber(
  //               parseFloat(totalHousingUnits)
  //             )} </span>
  //           `;
  //           const marker = Leaflet.marker([latitude, longitude]).addTo(
  //             mapRef.current!
  //           );
  //           marker.bindPopup(popupContent);
  //         } else {
  //           console.error("Error getting coordinates for:", dataRow);
  //         }
  //       } else {
  //         console.error("Invalid data row format:", dataRow);
  //       }
  //     }
  //     mapRef.current.invalidateSize();
  //   }
  // };

  // const getCoordinatesFromGoogleMaps = async (
  //   state: string,
  //   county: string,
  //   tract: string,
  //   countyname: string
  // ): Promise<LatLngTuple | null> => {
  //   try {
  //     const address = `${tract}, ${county}, ${state}, ${countyname}`;
  //     const apiKey = "AIzaSyA9qDYH6zol0NVt_YQO3r-AZvbmWhDQHXw";
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${apiKey}`;

  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error("Geocoding API Error");
  //     }

  //     const data = await response.json();
  //     // console.log("Geocoding API Response:", data);
  //     if (data.results.length > 0) {
  //       const { lat, lng } = data.results[0].geometry.location;
  //       return [lat, lng] as LatLngTuple;
  //     } else {
  //       throw new Error("No results found from Google Maps Geocoding API");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error getting coordinates from Google Maps Geocoding API: ",
  //       error
  //     );
  //     return null;
  //   }
  // };

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default Map;
