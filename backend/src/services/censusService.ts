import dotenv from "dotenv";
dotenv.config();

const fetchCensusData = async () => {
  try {
    const res = await fetch(
      `https://api.census.gov/data/2020/acs/acs5?get=B19013_001E,B01003_001E,B25001_001E&for=tract:*&in=state:06%20county:037&key=${process.env.CENSUS_API}`
    );

   

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Census data:", error);
    throw new Error("Error fetching Census data");
  }
};

export default fetchCensusData;
