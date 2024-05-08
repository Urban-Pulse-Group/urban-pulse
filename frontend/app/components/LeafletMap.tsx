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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatNumber(number: number) {
  return number.toLocaleString("en-US");
}

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
  const [censusData, setCensusData] = useState<any>(null);
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

  const handleCensusDataReceived = (data: any) => {
    setCensusData(data);
  };

  return loading ? (
    <div>Loading Map...</div>
  ) : (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4 flex flex-col">
        {/* Census Information */}
        <h2 className="text-xl font-bold mb-4">Census Information</h2>
        {censusData && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <p>Median Income:</p>
              <p>{formatCurrency(parseFloat(censusData.data[1][0]))}</p>
            </div>
            <div>
              <p>Population:</p>
              <p>{formatNumber(parseFloat(censusData.data[1][1]))}</p>
            </div>
          </div>
        )}
      </div>
      {/* Map Container */}
      <div className="w-3/4">
        <MapContainer
          center={userLocation ?? [51.505, -0.09]}
          zoom={13}
          style={{ height: "100vh" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeocoderControlComponent
            onLocationSearch={setSearchedLocation}
            onCensusDataReceived={handleCensusDataReceived}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default LeafletMap;
