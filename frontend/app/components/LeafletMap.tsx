import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import GeocoderControlComponent from "./GeocoderControl";
import { PropagateLoader } from "react-spinners";
import { FaPeopleGroup, FaMoneyBillTrendUp } from "react-icons/fa6";
import { Separator } from "./Separator";
import { RiNumbersFill } from "react-icons/ri";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatNumber(number: number) {
  return number.toLocaleString("en-US");
}

const LeafletMap: React.FC = () => {
  const MAPBOX_STYLE_URL =
    "mapbox://styles/bramos005/clwf4e24101so01p9d7i2e4d0";
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiYnJhbW9zMDA1IiwiYSI6ImNscGh2OTZyeTA2YW8yaW81c2czMTdoa20ifQ.I5K5CPPcls3jRqHareXSkQ";

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

  const totalPopulation = censusData ? parseFloat(censusData.data[1][1]) : 0;
  const malePopulation = censusData ? parseFloat(censusData.data[1][2]) : 0;
  const femalePopulation = censusData ? parseFloat(censusData.data[1][3]) : 0;
  const malePercentage = ((malePopulation / totalPopulation) * 100).toFixed(2);
  const femalePercentage = ((femalePopulation / totalPopulation) * 100).toFixed(
    2
  );

  const chartData = censusData
    ? [
        {
          name: "Population",
          Male: parseFloat(malePercentage),
          Female: parseFloat(femalePercentage),
        },
      ]
    : [];

  return loading ? (
    <div className="flex justify-center  items-center h-screen flex-col">
      <p className="text-red-600 font-bold flex justify-center flex-col ml-7 mb-2">
        LOADING MAP...
      </p>
      <PropagateLoader
        color="hsla(360, 67%, 53%, 1)"
        cssOverride={{}}
        loading
        size={15}
        speedMultiplier={1}
      />
    </div>
  ) : (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-6/12 px-8 bg-white p-2 flex flex-col overflow-y-auto max-h-[calc(100vh-0rem)]">
        {/* Census Information */}
        <h1 className="text-xl font-extrabold mb-4 text-[#71717A]">
          Census Information
        </h1>
        {censusData ? (
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex items-center">
              <div className="flex gap-10 flex-col">
                <h1 className="font-extrabold text-gray-800 text-4xl">
                  Income and Poverty
                </h1>
                <div className="flex items-center">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center">
                      <FaMoneyBillTrendUp className="mr-1" />
                      <p className="font-bold text-xl">Income & Earnings</p>
                    </div>
                    <div className="">
                      <p className="font-extrabold text-gray-800">
                        {formatCurrency(parseFloat(censusData.data[1][0]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Median Household Income in {searchedLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="bg-red-700 mt-5" />
            <div className="flex items-center">
              <div className="flex gap-10 flex-col">
                <h1 className="font-extrabold text-gray-800 text-4xl">
                  Populations and People
                </h1>
                <div className="flex items-center flex-col gap-8">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center">
                      <FaPeopleGroup className="mr-1" />
                      <p className="font-bold text-xl">Population in Cities</p>
                    </div>
                    <div className="">
                      <p className="font-extrabold text-gray-800">
                        {formatNumber(parseFloat(censusData.data[1][1]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Total Population in {searchedLocation}
                      </span>
                    </div>
                    <div className="">
                      <p className="font-extrabold text-gray-800">
                        {formatNumber(parseFloat(censusData.data[1][2]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Total Male Population in {searchedLocation}
                      </span>
                    </div>
                    <div className="">
                      <p className="font-extrabold text-gray-800">
                        {formatNumber(parseFloat(censusData.data[1][3]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Total Female Population in {searchedLocation}
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 50, // Adjusted left margin
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="Male" fill="#B9D2E7">
                          <LabelList
                            dataKey="Male"
                            position="insideRight"
                            formatter={(value) => `${value}%`}
                          />
                        </Bar>
                        <Bar dataKey="Female" fill="#FFC0CB">
                          <LabelList
                            dataKey="Female"
                            position="insideRight"
                            formatter={(value) => `${value}%`}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center">
                      <RiNumbersFill className="mr-1" />
                      <p className="font-bold text-xl">Age in Cities</p>
                    </div>
                    <div className="">
                      <p className="font-extrabold text-gray-800">
                        {formatNumber(parseFloat(censusData.data[1][4]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Median Age for Males in {searchedLocation}
                      </span>
                    </div>
                    <div className="">
                      <p className="font-extrabold text-gray-800">
                        {formatNumber(parseFloat(censusData.data[1][5]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Median Age for Females in {searchedLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "Enter a city to view its census data."
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
            url={`https://api.mapbox.com/styles/v1/bramos005/clwf4e24101so01p9d7i2e4d0/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`}
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
