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
// import backgroundImage from "../assets/background.png";
import mapImg from "../assets/map.png";
import CountryLocation from "../assets/client-location.png";
import flagImg from "../assets/flag.jpeg";
import leftArrow from "../assets/leftArrow.png";
import share from "../assets/shareButton.png";
import backgroundImage from "../assets/backgroundMain.jpg";
import usaXindia from "../assets/usaxindia.png";
import BarChartComponent from "../graphs/BarChartComponent";
import SingleHorizontalBar from "../graphs/SingleHorizontalBar";

function CountryDetails() {
  const [graphData, setGraphData] = useState([
    { name: "Positive", value: 0 },
    { name: "Negative", value: 0 },
    { name: "Neutral", value: 0 },
    { name: "test", value: 0 },
  ]);

  const newspaperData = [
    { name: "Times Gazette", articles: 150 },
    { name: "Morning Chronicle", articles: 120 },
    { name: "Evening Post", articles: 200 },
    { name: "Sunrise News", articles: 90},
    { name: "Metro Journal", articles: 180 },
    { name: "Times Gazette", articles: 150},
    { name: "Morning Chronicle", articles: 120 }
  ];

  const [countryData, setCountryData] = useState({
    name: "",
    all: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  //----------------------------IN THIS USE EFFECT GET COUNTRY NAME FROM LOCAL STORAGE AND GET DATA ACCORDINGLY-----------------------------
  useEffect(() => {
    const tempName = localStorage.getItem("hoveredCountry");
    const tempPositive = localStorage.getItem("hoveredPositive");
    const tempNegative = localStorage.getItem("hoveredNegative");
    const tempNeutral = localStorage.getItem("hoveredNeutral");

    setCountryData({
      name: tempName,
      positive: tempPositive,
      negative: tempNegative,
      neutral: tempNeutral,
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
    height: "100%",
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
      <div className="flex ">
        <div className="">
          <h1 className="font-bold text-4xl p-7 invisible">
            Country Dashboard
          </h1>

          <div className=" m-7 p-5 rounded-2xl border border-gray-600">
            <div className="">
              <div className="bg-opacity-40 bg-white flex justify-between items-center rounded-xl shadow-2xl h-12 p-2 mb-5">
                <div className="flex">
                  <div className="rounded-lg overflow-hidden  ">
                    <img
                      src={flagImg}
                      alt="Flag Image"
                      className="w-18 h-10 rounded-lg"
                    />
                  </div>

                  <div className="text-xl ml-2 ">
                    <div className="text-2xl">{countryData.name}</div>
                  </div>
                </div>

                {/* <div className="h-12 bg-gray-300 w-px ml-5 mr-50"></div> */}

                {/* <div className="text-xl ml-10 mr-50">
                  <div className="text-sm text-gray-400">Continent</div>
                  <div className="text-2xl">Asia</div>
                </div> */}

                <div className="  ">
                  <button
                    className="bg-white cursor-pointer text-white font-bold m-auto p-auto rounded-lg shadow-lg"
                    onClick={handleDownload}
                  >
                    <img
                      src={share}
                      alt="Share Button"
                      className="w-18 h-10 rounded-lg"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-opacity-20 bg-white items-center rounded-xl shadow-lg p-2 h-30">
              <div className="text-2xl">
                <p className="mx-2 mt-2 mb-4">Why USA matters to India</p>
                <div className="flex justify-between">
                  <div className="pt-5 mx-auto bg-white shadow-lg rounded-lg w-40 h-30">
                    <div className="flex justify-center">
                      <img
                        src={usaXindia}
                        alt="Relation Image"
                        className=" rounded-lg"
                      />
                    </div>
                    <div className="my-2 text-center">
                      <p className="text-gray-600 text-base">
                        This is some sample text below the image.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 mx-auto bg-white shadow-lg rounded-lg w-40 h-30">
                    <div className="flex justify-center">
                      <img
                        src={usaXindia}
                        alt="Relation Image"
                        className=" rounded-lg"
                      />
                    </div>
                    <div className="my-2 text-center">
                      <p className="text-gray-600 text-base">
                        This is some sample text below the image.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 mx-auto bg-white shadow-lg rounded-lg w-40 h-30">
                    <div className="flex justify-center">
                      <img
                        src={usaXindia}
                        alt="Relation Image"
                        className=" rounded-lg"
                      />
                    </div>
                    <div className="my-2 text-center">
                      <p className="text-gray-600 text-base">
                        This is some sample text below the image.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 mx-auto bg-white shadow-lg rounded-lg w-40 h-30">
                    <div className="flex justify-center">
                      <img
                        src={usaXindia}
                        alt="Relation Image"
                        className=" rounded-lg"
                      />
                    </div>
                    <div className="my-2 text-center">
                      <p className="text-gray-600 text-base">
                        This is some sample text below the image.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 mx-auto bg-white shadow-lg rounded-lg w-40 h-30">
                    <div className="flex justify-center">
                      <img
                        src={usaXindia}
                        alt="Relation Image"
                        className=" rounded-lg"
                      />
                    </div>
                    <div className="my-2 text-center">
                      <p className="text-gray-600 text-base">
                        This is some sample text below the image.
                      </p>
                    </div>
                  </div>

                  <div className="py-5 mx-auto bg-white shadow-lg rounded-lg w-40 h-30">
                    <div className="flex justify-center">
                      <img
                        src={usaXindia}
                        alt="Relation Image"
                        className=" rounded-lg"
                      />
                    </div>
                    <div className="my-2 text-center">
                      <p className="text-gray-600 text-base">
                        This is some sample text below the image.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="h-12 bg-gray-300 w-px ml-5 mr-50"></div> */}

              {/* <div className="text-xl ml-10 mr-50">
                  <div className="text-sm text-gray-400">Continent</div>
                  <div className="text-2xl">Asia</div>
                </div> */}
            </div>

            <div className="flex justify-between ">
              {/* 1 */}
              <div>
                <div className="bg-white items-center rounded-3xl  justify-between flex m-3">
                  <div className="pb-2 ">
                    <p className="flex justify-center text-2xl mt-5">
                      Sentiment of USA towards India
                    </p>
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

                <div>
                  <div className="p-2 m-2 flex bg-white shadow-md rounded-lg">
                    <p className="text-gray-700 ">
                      This is some sample text inside the box.
                    </p>

                    <div className="w-px h-6 bg-gray-800 mx-4"></div>
                    <p className="text-gray-700 text-base">150</p>
                  </div>
                </div>
              </div>

              {/* 2 */}

              <div className="bg-white m-auto shadow-xl rounded-3xl w-full h-1000">
                <BarChartComponent />
              </div>
            </div>

            <div className="flex">
              <div className="m-10 p-5 w-full">
                <div className=" my-1">
                  <h2 className="text-2xl font-bold mb-5  ">
                    Most Read Newspapers of USA
                  </h2>
                </div>
                <div className=" items-center min-h-screen">
                  {newspaperData.map((newspaper, index) => (
                    <div className="">
                      <div
                        key={index}
                        className="flex justify-between  p-4 mx-2 "
                      >
                        <h2 className="text-lg font-semibold">
                          {newspaper.name}
                        </h2>
                        <p>Articles: {newspaper.articles}</p>
                        <div>
                          <SingleHorizontalBar
                            positiveValue={10}
                            negativeValue={10}
                            neutralValue={10}
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CountryDetails;
