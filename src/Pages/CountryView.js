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
import backgroundImage from "../assets/backgroundMain.jpg";
import SingleHorizontalBar from "../graphs/SingleHorizontalBar";
import Slider from "rc-slider";


function CountryView() {

  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
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

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    // console.log(newMonth);
  };

  const handleSliderChange = (value) => {
    setSelectedMonth(value);
    console.log("Selected Month:", months[value]);
  };
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

  const containerStyle = {
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover", // Adjust background sizing
    backgroundRepeat: "no-repeat", // Prevent repeating of background image
    backgroundColor: "#f2f2f2",
    width: "100vw",
    height: "100%",
    // Add other styles as needed
  };




  return (
<div id="pie-chart" style={containerStyle}>
  <Navbar />
  <div className="m-5 invisible">
    Hidden Text Area
  </div>
  <div className="flex">
    <div className="m-7 p-5 rounded-2xl border border-gray-600 w-full mt-20">
      <div className="m-5 p-5 w-full">
      <div className="flex mb-10">
        <h2 className="text-2xl font-bold mb-5">
          Countries ranked by their perception of India
        </h2>
        <div className="flex justify-between w-1/2 rounded-full shadow-2xl bg-white ml-5 mr-2 px-3">
            <div className=" mx-2 pb-7 pt-3   w-3/4">
              <div className="">
                <Slider
                  min={0}
                  max={11}
                  marks={months.reduce((acc, month, index) => {
                    acc[index] = month;
                    return acc;
                  }, {})}
                  step={1}
                  value={selectedMonth}
                  onChange={handleSliderChange}
                />
              </div>
            </div>

            <div>
              <button className="bg-black text-white rounded-full px-3 py-2 mx-3 mt-2">
                All Time
              </button>
            </div>
          </div>
        </div>
        <div className="min-h-screen">
          {countryData.map((country, index) => (
            <div key={index} onClick={() => handleClick(country)}>
              <div className="flex justify-between p-4 mx-2">
                <h2 className="text-lg font-semibold">
                  {country.name}
                </h2>
                <p>{country.code}</p>
                <div>
                  <SingleHorizontalBar
                    positiveValue={country.positive}
                    negativeValue={country.negative}
                    neutralValue={country.neutral}
                  />
                </div>
              </div>
              <hr className="border-t-2 border-black w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>

  );
}

export default CountryView;
