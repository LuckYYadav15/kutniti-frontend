import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Styles/Staff.css";
import { Link } from "react-router-dom";
import PieChartComponent from "../graphs/PieChartComponent";
import LineChartComponent from "../graphs/LineChartComponent";
import html2canvas from "html2canvas";
import backgroundImage from "../assets/background.png";
import mapImg from "../assets/map.png";
import CountryLocation from "../assets/client-location.png";
import flagImg from "../assets/flag.jpeg";
import leftArrow from "../assets/leftArrow.png";

function CountryDetails() {
 

  const [graphData, setGraphData] = useState([
    { name: "Positive", value: 0 },
    { name: "Negative", value: 0 },
    { name: "Neutral", value: 0 },
    { name: "test", value: 0 },
  ]);

  const [countryData, setCountryData] = useState({
    name:"",
    all:0,
    positive: 0,
    negative: 0,
    neutral: 0,
});


  //----------------------------IN THIS USE EFFECT GET COUNTRY NAME FROM LOCAL STORAGE AND GET DATA ACCORDINGLY-----------------------------
  useEffect(() => {
    const tempName= localStorage.getItem("hoveredCountry");
    const tempPositive= localStorage.getItem("hoveredPositive");
    const tempNegative= localStorage.getItem("hoveredNegative");
    const tempNeutral= localStorage.getItem("hoveredNeutral");

      setCountryData({
        name: tempName,
        positive: tempPositive,
        negative: tempNegative,
        neutral: tempNeutral
  });

  
    // Note: Make sure data, setData, and oneCountry are properly defined in your component
  
  }, []);


  // useEffect(() => {
  //   const hoveredPositive = localStorage.getItem("hoveredPositive");
  //   const hoveredNegative = localStorage.getItem("hoveredNegative");
  //   const hoveredNeutral = localStorage.getItem("hoveredNeutral");

  // }, []);

  //-----------------------------------CHANGE SHARE URL TO WEBSITE HOMEPAGE-----------------------------

  const shareText = "Check out this awesome pie chart!"; // Change as needed
  const shareUrl = encodeURIComponent("http://localhost:3000/country-view"); // Get the current URL
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleDownload = async () => {
    const chartRef = document.getElementById("pie-chart"); // Get the chart element

    try {
      const canvas = await html2canvas(chartRef);
      const imageUri = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imageUri;
      link.download = "pie-chart.png";
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };


  const containerStyle = {
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover", // Adjust background sizing
    backgroundRepeat: "no-repeat", // Prevent repeating of background image
    backgroundColor: "#f2f2f2",
    width: "100vw",
    height: "150vh",
    // Add other styles as needed
  };

  const colors = [
    "bg-red-600",
    "bg-orange-400",
    "bg-yellow-300",
    "bg-green-300",
    "bg-green-600",
  ];
  const texts = ["0%", "25%", "50%", "75%", "100%"];

  return (
    <div id="pie-chart" style={containerStyle}>
      <Navbar />
      <div className="flex " >
        <div className=" my-10">
          <h1 className="font-bold text-4xl p-10 m-3">Country Dashboard</h1>

          <div className="flex justify-between">
            <button className="h-16 bg-white hover:bg-gray-400 text-blue-500 font-semibold m-2 p-2 w-18 rounded">
            <a href="/country-view">
            <img
                  src={leftArrow}
                  alt="Left Arrow"
                  className="w-15 h-auto rounded-lg"
                />
                </a>
            </button>
            <div className="cursor-pointer bg-white flex items-center justify-between rounded-3xl shadow-lg h-20">
              <div className="rounded-lg overflow-hidden ml-5 mr-5">
                <img
                  src={flagImg}
                  alt="Flag Image"
                  className="w-20 h-12 rounded-lg"
                />
              </div>

              <div className="text-xl ml-5 mr-5">
                <div className="text-sm text-gray-400">Country</div>
                <div className="text-2xl">{countryData.name}</div>
              </div>

              <div className="h-12 bg-gray-300 w-px ml-5 mr-50"></div>

              <div className="text-xl ml-10 mr-50">
                <div className="text-sm text-gray-400">Continent</div>
                <div className="text-2xl">Asia</div>
              </div>
              <div className="invisible text-xl ml-20 mr-50">
                <div className="text-sm text-gray-400">Continent</div>
                <div className="text-2xl">Asia</div>
              </div>
              <div className="invisible text-xl ml-20 mr-50">
                <div className="text-sm text-gray-400">Continent</div>
                <div className="text-2xl">Asia</div>
              </div>
              <div className="invisible text-xl ml-20 mr-50">
                <div className="text-sm text-gray-400">Continent</div>
                <div className="text-2xl">Asia</div>
              </div>
  
              <div className=" text-xl ml-20 mr-50">
                <div className="text-sm text-gray-400">Continent</div>
                <div className="text-2xl mr-5">August</div>
              </div>

            </div>

            <div className="mr-10 ">
            <ul>
              <li>{/* Share Button */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded m-1"
                onClick={handleTwitterShare}
              >
                Share on Twitter
              </button></li>


              <li>{/* Download Button */}
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded m-1"
                onClick={handleDownload}
              >
                Download Chart
              </button></li>
            </ul>
              
            </div>
          </div>

          <div className="flex justify-between ">
            {/* 1 */}
            <div>
              <div className="cursor-pointer bg-white m-10 w-80 h-130 rounded-3xl overflow-hidden shadow-lg">
                <div className=" m-5 ">
                  <div className="text-sm text-gray-400">Map</div>
                  <div className="text-2xl">Australia</div>
                </div>
                <img
                  src={mapImg}
                  alt="map image"
                  className="ml-10 w-40 rounded-lg"
                />
              </div>
              <div className="ml-10 w-80 bg-white p-0 rounded-lg">
                <div className="flex justify-between">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-1/5 h-10 ${color} text-white flex items-center justify-center`}
                    >
                      {texts[index]}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border m-auto  bg-white p-auto ">
                  {" "}
                  <p className="m-auto text-sm text-gray-400">Negative</p>{" "}
                  <p className="m-auto text-sm text-gray-400">Perception</p>{" "}
                  <p className="m-auto text-sm text-gray-400">Positive</p>{" "}
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="bg-white items-center rounded-3xl  justify-between flex m-3">
              <div className="pb-2 ">
                <PieChartComponent />
                <div className="flex">
                  <p className="text-green-500 ml-10 m-3">
                    Positive: {countryData.positive}
                  </p>
                  <p className="text-red-500 m-3">
                    Negative: {countryData.negative}
                  </p>
                  <p className="text-yellow-300 m-3">
                    Neutral: {countryData.neutral}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 */}

            <div className="bg-white m-10 rounded-3xl ">
              <img
                src={CountryLocation}
                alt="map image"
                className="w-200 rounded-lg h-auto"
              />
              <img
                src={CountryLocation}
                alt="map image"
                className="w-200 rounded-lg h-auto"
              />
            </div>
          </div>

          <div className="flex justify-between m-0 p-0">
            {/* 4 */}
            <div className="flex">
              <div className="w-100 h-50 m-10 p-10  bg-white">
                <p className="invisible">
                  Newspapers List Newspapers List Newspapers List Newspapers
                  List Newspapers ListNewspapers 
                </p>
                <div className="text-center my-1">
            <h2 className="text-4xl font-bold mb-5  ">Country's Newspapers </h2>
          </div>
              </div>
            </div>

            {/* 5 */}

            <div className="cursor-pointer bg-white m-10 w-auto m-3 p-3 rounded-3xl shadow-lg">
              <div
                id="line-chart"
                className="bg-white items-center justify-between"
              >
                <LineChartComponent />
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CountryDetails;
