import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../assets/backgroundMain.jpg";
import SingleHorizontalBar from "../graphs/SingleHorizontalBar";
import Slider from "rc-slider";


function NewspaperView() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [newspaperData, setNewspaperData] = useState([
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


  const handleSliderChange = (value) => {
    setSelectedMonth(value);
    console.log("Selected Month:", months[value]);
  };




  const handleClick = (newspaper) => {
    
    console.log(newspaper);
    
    window.localStorage.setItem("hoveredNewspaper", newspaper.name);
    window.localStorage.setItem("hoveredPositive", newspaper.positive);
    window.localStorage.setItem("hoveredNegative", newspaper.negative);
    window.localStorage.setItem("hoveredNeutral", newspaper.neutral);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "http://localhost:3000/newspaper-detail";
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
<div id="pie-chart" style={containerStyle} className="w-full font-custom">
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
          {newspaperData.map((newspaper, index) => (
            <div key={index} onClick={() => handleClick(newspaper)}>
              <div className="flex justify-between p-4 mx-2">
                <h2 className="text-lg font-semibold">
                  {newspaper.name}
                </h2>
                <p>{newspaper.code}</p>
                <div>
                  <SingleHorizontalBar
                    positiveValue={newspaper.positive}
                    negativeValue={newspaper.negative}
                    neutralValue={newspaper.neutral}
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

export default NewspaperView;
