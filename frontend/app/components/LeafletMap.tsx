import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import GeocoderControlComponent from "./GeocoderControl";

/*

IGNORE TOP CODE FOR NOW 

*/

// function formatCurrency(amount: number) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// }

// function formatNumber(number: number) {
//   return number.toLocaleString("en-US");
// }

//   const processData = async (censusData: any) => {
//     if (censusData && mapRef.current) {
//       for (const dataRow of censusData) {
//         if (Array.isArray(dataRow) && dataRow.length >= 6) {
//           const [
//             medianIncome,
//             population,
//             totalHousingUnits,
//             state,
//             county,
//             tract,
//           ] = dataRow;
//           // console.log("state:", state, "medianIncome:", medianIncome, "population:", population, "tract:", tract, "county:", county);
//           const coordinates = await getCoordinatesFromGoogleMaps(
//             state,
//             county,
//             tract,
//             "La Jolla, California"
//           );
//           // console.log("coordinates:", coordinates, "state:", state, "county:", county, "tract:", tract)
//           if (coordinates) {
//             const [latitude, longitude] = coordinates;

//             const popupContent = `
//               <span class="text-black">Median Income:  ${formatCurrency(
//                 parseFloat(medianIncome)
//               )} </span> <br/>
//               <span class="text-black">Population: ${formatNumber(
//                 parseFloat(population)
//               )} </span> <br/>
//               <span class="text-black">Housing Units: ${formatNumber(
//                 parseFloat(totalHousingUnits)
//               )} </span>
//             `;
//             const marker = Leaflet.marker([latitude, longitude]).addTo(
//               mapRef.current!
//             );
//             marker.bindPopup(popupContent);
//           } else {
//             console.error("Error getting coordinates for:", dataRow);
//           }
//         } else {
//           console.error("Invalid data row format:", dataRow);
//         }
//       }
//       mapRef.current.invalidateSize();
//     }
//   };

const LeafletMap: React.FC = () => {
  const [searchedLocation, setSearchedLocation] = useState("");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  console.log(searchedLocation);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <MapContainer
      center={userLocation ?? [51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeocoderControlComponent onLocationSearch={setSearchedLocation} />
    </MapContainer>
  );
};

export default LeafletMap;
