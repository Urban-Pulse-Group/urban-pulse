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

  const handleCensusDataReceived = (data: any) => {
    setCensusData(data);
  };

  const totalPopulation = censusData ? censusData.data[1][1]: 0;
  const malePopulation = censusData ? parseFloat(censusData.data[1][2]) : 0;
  const femalePopulation = censusData ? parseFloat(censusData.data[1][3]) : 0;
  const malePercentage = ((malePopulation / totalPopulation) * 100).toFixed(2);
  const femalePercentage = ((femalePopulation / totalPopulation) * 100).toFixed(
    2
  );

  const whitePop = censusData ? parseFloat(censusData.data[1][6]) : 0;
  const blackPop = censusData ? parseFloat(censusData.data[1][7]) : 0;
  const americanIndianPop = censusData ? parseFloat(censusData.data[1][8]) : 0;
  const asianPop = censusData ? parseFloat(censusData.data[1][9]) : 0;
  const pacificPop = censusData ? parseFloat(censusData.data[1][10]) : 0;
  const otherPop = censusData ? parseFloat(censusData.data[1][11]) : 0;

  const whitePercentage = ((whitePop / totalPopulation) * 100).toFixed(2);
  const blackPercentage = ((blackPop / totalPopulation) * 100).toFixed(2);
  const americanIndianPercentage = ((americanIndianPop / totalPopulation) * 100).toFixed(2);
  const asianPercentage = ((asianPop / totalPopulation) * 100).toFixed(2);
  const pacificPercentage = ((pacificPop / totalPopulation) * 100).toFixed(2);
  const otherPercentage = ((otherPop / totalPopulation) * 100).toFixed(2);

  const chartData = censusData
    ? [
        {
          name: "Population",
          Male: parseFloat(malePercentage),
          Female: parseFloat(femalePercentage),
        },
      ]
    : [];

  const raceChartData = censusData
    ? [
        { name: "White", value: whitePercentage },
        { name: "Black", value: blackPercentage },
        { name: "Native American", value: americanIndianPercentage },
        { name: "Asian", value: asianPercentage },
        { name: "Pacific Islander", value: pacificPercentage },
        { name: "Other", value: otherPercentage },
      ]
    : [];
    const educationData = censusData
    ? [
        { name: "High School", value: (parseFloat(censusData.data[1][12])) },
        { name: "Bachelor's Degree", value: (parseFloat(censusData.data[1][13]))},
        { name: "Graduate Degree", value: (parseFloat(censusData.data[1][14])) },
      ]
    : [];

  const employmentData = censusData
    ? [
        { name: "Employed", value: (parseFloat(censusData.data[1][15]) / totalPopulation * 100).toFixed(2) },
        { name: "Unemployed", value: (parseFloat(censusData.data[1][16]) / totalPopulation * 100).toFixed(2) },
      ]
    : [];

  const housingData = censusData
    ? [
        { name: "Median Home Value", value: formatCurrency(parseFloat(censusData.data[1][17])) },
        { name: "Median Rent", value: formatCurrency(parseFloat(censusData.data[1][20])) },
        { name: "Vacant Units", value: formatNumber(parseFloat(censusData.data[1][19])) },
      ]
    : [];

  const healthInsuranceData = censusData
    ? [
        { name: "With Insurance", value: (parseFloat(censusData.data[1][21]) / totalPopulation * 100).toFixed(2) },
        { name: "Without Insurance", value: (parseFloat(censusData.data[1][22]) / totalPopulation * 100).toFixed(2) },
      ]
    : [];

  const povertyData = censusData
    ? [
        { name: "Below Poverty Level", value: (parseFloat(censusData.data[1][24]) / totalPopulation * 100).toFixed(2) },
      ]
    : [];

  const commutingData = censusData
    ? [
        { name: "Drive Alone", value: (parseFloat(censusData.data[1][27]) / totalPopulation * 100).toFixed(2) },
        { name: "Public Transportation", value: (parseFloat(censusData.data[1][28]) / totalPopulation * 100).toFixed(2) },
      ]
    : [];

  const foreignBornData = censusData
    ? [
        { name: "Foreign Born", value: (parseFloat(censusData.data[1][30]) / totalPopulation * 100).toFixed(2) },
      ]
    : [];
  
      return loading ? (
        <div className="flex justify-center items-center h-screen flex-col">
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
        <div className="flex overflow-hidden max-h-[92.5vh]">
          {/* Sidebar */}
          <div className="w-6/12 px-8 bg-white p-2 flex flex-col overflow-y-auto max-h-full">
            {/* Census Information */}
            <h1 className="text-xl font-extrabold mb-4 text-[#71717A]">
              Census Information
            </h1>
            {censusData ? (
              <div className="flex flex-col gap-5 mt-5">
                <div className="flex flex-col">
                  <h1 className="font-extrabold text-gray-800 text-4xl">
                    Income and Poverty
                  </h1>
                  <div className="flex flex-col gap-5 mt-2">
                    <div className="flex items-center">
                      <FaMoneyBillTrendUp className="mr-1" />
                      <p className="font-bold text-xl">Income & Earnings</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-800">
                        {formatCurrency(parseFloat(censusData.data[1][0]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Median Household Income in {searchedLocation}
                      </span>
                    </div>
                  </div>
                </div>
                <Separator className="bg-red-700 mt-5" />
                <div className="flex flex-col">
                  <h1 className="font-extrabold text-gray-800 text-4xl">
                    Populations and People
                  </h1>
                  <div className="flex flex-col gap-5 mt-2">
                    <div className="flex items-center">
                      <FaPeopleGroup className="mr-1" />
                      <p className="font-bold text-xl">Population in Cities</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-800">
                        {formatNumber(parseFloat(censusData.data[1][1]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Total Population in {searchedLocation}
                      </span>
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-800">
                        {formatNumber(parseFloat(censusData.data[1][2]))}
                      </p>
                      <span className="text-sm text-gray-500">
                        Total Male Population in {searchedLocation}
                      </span>
                    </div>
                    <div>
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
                          left: 50,
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
                </div>
                <Separator className="bg-red-700 mt-5" />
                <div className="flex flex-col">
                  <h1 className="font-extrabold text-gray-800 text-4xl">
                    Racial Demographics
                  </h1>
                  <div className="flex flex-col gap-5 mt-2">
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col gap-5">
                        <p className="font-extrabold text-gray-800">
                          White: {whitePercentage}%
                        </p>
                        <p className="font-extrabold text-gray-800">
                          Black: {blackPercentage}%
                        </p>
                        <p className="font-extrabold text-gray-800">
                          Native American: {americanIndianPercentage}%
                        </p>
                        <p className="font-extrabold text-gray-800">
                          Asian: {asianPercentage}%
                        </p>
                        <p className="font-extrabold text-gray-800">
                          Pacific Islander: {pacificPercentage}%
                        </p>
                        <p className="font-extrabold text-gray-800">
                          Other: {otherPercentage}%
                        </p>
                      </div>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          layout="vertical"
                          data={raceChartData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 70,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <Separator className="bg-red-700 mt-5" />
                <div className="flex flex-col">
                  <h1 className="font-extrabold text-gray-800 text-4xl">
                    Education Levels
                  </h1>
                  <div className="flex flex-col gap-5 mt-2">
                    <div className="flex flex-col gap-5">
                      <p className="font-extrabold text-gray-800">
                        High School: {educationData[0]?.value}
                      </p>
                      <p className="font-extrabold text-gray-800">
                        Bachelor's Degree: {educationData[1]?.value}
                      </p>
                      <p className="font-extrabold text-gray-800">
                        Graduate Degree: {educationData[2]?.value}
                      </p>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        layout="vertical"
                        data={educationData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 70,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
    
               
                  
                  
           
              
                
              
         
                
                <Separator className="bg-red-700 mt-5" />
                <div className="flex flex-col">
                  <h1 className="font-extrabold text-gray-800 text-4xl">
                    Commuting to Work
                  </h1>
                  <div className="flex flex-col gap-5 mt-2">
                    <div className="flex flex-col gap-5">
                      <p className="font-extrabold text-gray-800">
                        Drive Alone: {commutingData[0]?.value}%
                      </p>
                      <p className="font-extrabold text-gray-800">
                        Public Transportation: {commutingData[1]?.value}%
                      </p>
                    </div>
                  </div>
                </div>
                  <Separator className="bg-red-700 mt-5" />
                  <div className="flex flex-col">
                  <h1 className="font-extrabold text-gray-800 text-4xl">
                   Housing Costs
                  </h1>
                  <div className="flex flex-col pb-20 gap-5 mt-2">
                    <div className="flex flex-col gap-5">
                      <p className="font-extrabold text-gray-800">
                        Median Rent {housingData[1].value}
                      </p>
                   
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