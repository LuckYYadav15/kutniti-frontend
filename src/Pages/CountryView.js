import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PieChart, Pie, Sector } from "recharts";
import flagImg from "../assets/flag.jpeg";
import mapImg from "../assets/map.png";
import PieChartComponent from "../graphs/PieChartComponent";
import PieChartSimple from "../graphs/PieChartSimple";
import locationImg from "../assets/location.webp";


function CountryView() {
  const [countryFilter, setcountryFilter] = useState({});
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [lastHovered, setLastHovered] = useState(null);
  const [countryData, setCountryData] = useState([
    { name: "France", code: "FR", positive: 8, negative: 28, neutral: 3 },
    { name: "Australia", code: "AU", positive: 18, negative: 5, neutral: 9 },
    { name: "China", code: "CN", positive: 34, negative: 117, neutral: 7 },
    { name: "United States", code: "US", positive: 23, negative: 258, neutral: 6 },
    { name: "Singapore", code: "SP", positive: 89, negative: 28, neutral: 43 },
    { name: "Canada", code: "CA", positive: 58, negative: 68, neutral: 35 },
    { name: "Brazil", code: "BR", positive: 58, negative: 28, neutral: 3 },
    { name: "Japan", code: "JP", positive: 58, negative: 28, neutral: 6 },
    { name: "Nigeria", code: "NG", positive: 8, negative: 28, neutral: 33 },
    { name: "Pakistan", code: "PK", positive: 1, negative: 98, neutral: 2 },
    { name: "Russia", code: "RU", positive: 108, negative: 78, neutral: 37 },
    { name: "UAE", code: "AE", positive: 98, negative: 78, neutral: 32 },
  ]);
  

  const handleCountryHover = (country) => {
    setHoveredCountry(country);
    setLastHovered(country);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/apis/country_search/",
        countryFilter
      );
      setCountryData(response.data);
      // console.log(countryData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data from server");
    }
  };

  const handleChange = (event) => {
    setcountryFilter({
      ...countryFilter,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (country) => {
    
    console.log(country);
    
    window.localStorage.setItem("hoveredCountry", country.name);
    window.localStorage.setItem("hoveredPositive", country.positive);
    window.localStorage.setItem("hoveredNegative", country.negative);
    window.localStorage.setItem("hoveredNeutral", country.neutral);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "http://localhost:3000/country-detail";
  };




  return (
    <div className="bg-sky-500/[.12] backdrop-filter min-h-screen">
      <Navbar />
      <h1 className="text-3xl text-center py-10">Country Sentiment Analysis</h1>
      <div className="flex flex-wrap justify-center">
        <ul className="">
          {countryData?.map((country) => (
            <li
              className="cursor-pointer"
              key={country.code}
              onClick={() => handleClick(country)}
            >
              <div className="cursor-pointer bg-white flex space-x-5 items-center justify-between  m-5 p-5  rounded-3xl shadow-lg ">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={flagImg}
                    alt={country.name}
                    className="w-20 h-12 rounded-lg"
                  />
                </div>

                <div className="text-xl">
                  <div className="text-sm text-gray-400">Country</div>
                  <div className="text-2xl">{country.name}</div>
                </div>

                <div className="text-xl">
                  <div className="text-sm text-gray-400">Continent</div>
                  <div className="text-2xl">Asia</div>
                </div>

                <div className="text-2xl">{country.positive}</div>
                <div className="text-2xl">{country.negative}</div>
              </div>

              <div className=" flex">
                <div className="cursor-pointer bg-white w-80 h-64 p-0 m-10 rounded-3xl overflow-hidden shadow-lg">
                  <div className=" m-5 ">
                    <div className="text-sm text-gray-400">Map</div>
                    <div className="text-2xl">Australia</div>
                  </div>
                  <img
                    src={mapImg}
                    alt={country.name}
                    className="ml-10 w-40 rounded-lg"
                  />
                </div>

                <div className="cursor-pointer bg-white relative w-100 h-64 m-10 rounded-3xl overflow-hidden shadow-lg">
                  <p className="absolute top-10 left-10 text-sm text-gray-400 ">
                    Perception of India
                  </p>
                  <div className="cursor-pointer flex">
                  
                    <PieChartSimple/>
                    <div>
                      <ul className="absolute top-10 right-20 text-gray-500">
                        <li>
                          <p className="m-5">Positive: </p>
                        </li>
                        <li>
                          <p className="m-5">Negative: </p>
                        </li>
                        <li>
                          <p className="m-5">Neutral: </p>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

              <div className="cursor-pointer h-60 p-0 m-5 mb-20 rounded-lg overflow-hidden shadow-lg relative" style={{ backgroundImage: `url(${locationImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="absolute top-5 left-5">
    <div className="text-sm text-gray-800">Location</div>
  </div>
</div>


            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default CountryView;
