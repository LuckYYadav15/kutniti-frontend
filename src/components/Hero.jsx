import React from "react";
import Typed from "react-typed";
import { useState, useEffect } from "react";
import WorldMap from "react-svg-worldmap";
import ReactDOM from "react-dom";
import MonthPicker from "react-simple-month-picker";
import MonthPickerInput from "react-month-picker-input";
import PieChartComponent from "../graphs/PieChartComponent";
import flagImg from "../assets/flag.jpeg";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useMediaQuery } from "react-responsive";
import VerticalColors from "../assets/vertical-percent.png";
import HorizontalColors from "../assets/horizontalColors.png";
import SmallPieChart from "../graphs/SmallPieChart";
import MicroPieChart from "../graphs/MicroPieChart";
import HorizontalBar from "../graphs/HorizontalBar";
import BarChartComponent from "../graphs/BarChartComponent";
import SingleHorizontalBar from "../graphs/SingleHorizontalBar";


const Hero = () => {
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

  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [oneCountry, setOneCountry] = useState([]);

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    // console.log(newMonth);
  };

  const handleSliderChange = (value) => {
    setSelectedMonth(value);
    console.log("Selected Month:", months[value]);
  };

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // SAMPLE DATA FOR COUNTRY

  const [countryData, setCountryData] = useState({
    Code: "",
    Value: "",
    Name: "",
  });

  const [clickedData, setClickedData] = useState({
    all: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  const [modal, setModal] = useState(false);

  const [tempData, setTempData] = useState([]);

  const [negativeCountry, setNegativeCountry] = useState([]);

  //-----------GET THE NO. NEGATIVE ARTICLES BY EACH COUNTRY CALCULATE THEIR RANKS BASED ON THAT AND UPDATE THE DATA ARRAY--------------------------------

  // const [isDataReady, setIsDataReady] = useState(false);

  const [data, setData] = useState([
    {
      country: "fr",
      continent: "Europe",
      value: 1,
      name: "France",
      code: "FR",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // france
    {
      country: "au",
      continent: "Australia",
      value: 2,
      name: "Australia",
      code: "AU",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // australia
    {
      country: "cn",
      continent: "Asia",
      value: 3,
      name: "China",
      code: "CN",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // china
    {
      country: "us",
      continent: "North America",
      value: 4,
      name: "United States",
      code: "US",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // united states
    {
      country: "sp",
      continent: "Asia",
      value: 5,
      name: "Singapore",
      code: "SP",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // singapore
    {
      country: "ca",
      continent: "North America",
      value: 6,
      name: "Canada",
      code: "CA",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // canada
    {
      country: "br",
      continent: "South America",
      value: 7,
      name: "Brazil",
      code: "BR",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // brazil
    {
      country: "jp",
      continent: "Asia",
      value: 8,
      name: "Japan",
      code: "JP",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // japan
    {
      country: "ng",
      continent: "Africa",
      value: 9,
      name: "Nigeria",
      code: "NG",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // nigeria
    {
      country: "pk",
      continent: "Asia",
      value: 10,
      name: "Pakistan",
      code: "PK",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // pakistan
    {
      country: "ru",
      continent: "Asia",
      value: 11,
      name: "Russia",
      code: "RU",
      positive: 10,
      negative: 10,
      neutral: 10,
    }, // russia
    {
      country: "ae",
      continent: "Asia",
      value: 12,
      name: "UAE",
      code: "AE",
      positive: 10,
      negative: 10,
      neutral: 10,
    }, // uae
  ]);

  const [selectedColor, setSelectedColor] = useState(0);
  

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const response = await fetch(
          "http://65.2.183.51:8000/api/country/getallCountryArticles",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const getData = await response.json();
          setTempData(getData);

          // Create negativeCountry array
          const negativeCountries = getData
            .filter((item) => item.type === "Negative")
            .map((item) => ({
              countryName:
                item.countryName === "USA" ? "United States" : item.countryName,
              negativeArticles: item.Articles,
            }));

          setNegativeCountry(negativeCountries);

          // Sort negativeCountry array by negativeArticles in descending order
          negativeCountries.sort(
            (a, b) => b.negativeArticles - a.negativeArticles
          );

          // Assign ranks to countries
          negativeCountries.forEach((country, index) => {
            country.rank = index + 1;
          });

          const tempUpdatedData = data.map((item) => {
            const matchingCountry = negativeCountries.find(
              (country) => country.countryName === item.name
            );
            if (matchingCountry) {
              return { ...item, value: matchingCountry.rank };
            }
            return item;
          });
          setData(tempUpdatedData);
          // setIsDataReady(true);
          console.log(data);
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllCountries();
  }, []);

  const clickAction = async (countryDetails) => {
    let countryName;
    try {
      if (countryDetails.countryName == "United States") {
        countryName = "USA";
      } else {
        countryName = countryDetails.countryName;
      }

      const fetchArticle = async () => {
        try {
          const response = await fetch(
            "http://65.2.183.51:8000/api/country/getaCountryArticle",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ countryName }),
            }
          );

          if (response.ok) {
            const getData = await response.json();
            return getData;
          } else {
            throw new Error("API call failed");
          }
        } catch (error) {
          throw error;
        }
      };

      const oneCountry = await fetchArticle();
      // console.log(oneCountry)

      oneCountry.forEach((country) => {
        if (country.type === "All") {
          setClickedData((prevData) => ({
            ...prevData,
            all: country.Articles,
          }));
        } else if (country.type === "Positive") {
          setClickedData((prevData) => ({
            ...prevData,
            positive: country.Articles,
          }));
        } else if (country.type === "Negative") {
          setClickedData((prevData) => ({
            ...prevData,
            negative: country.Articles,
          }));
        } else if (country.type === "Neutral") {
          setClickedData((prevData) => ({
            ...prevData,
            neutral: country.Articles,
          }));
        }
      });

      // console.log(oneCountry[0].Articles);
      // console.log(countryDetails);

      const sortByType = () => {
        oneCountry.sort((a, b) => {
          if (a.type < b.type) return -1;
          if (a.type > b.type) return 1;
          return 0;
        });
      };
      sortByType();
      if (oneCountry.length >= 4) {
        window.localStorage.setItem("hoveredPositive", oneCountry[3].Articles);
        window.localStorage.setItem("hoveredNegative", oneCountry[1].Articles);
        window.localStorage.setItem("hoveredNeutral", oneCountry[2].Articles);
        window.dispatchEvent(new Event("storage"));
      } else {
        window.localStorage.setItem("hoveredPositive", 10);
        window.localStorage.setItem("hoveredNegative", 10);
        window.localStorage.setItem("hoveredNeutral", 10);
        window.dispatchEvent(new Event("storage"));
      }

      const foundCountry = data.find(
        (item) => item.name === countryDetails.countryName
      );

      if (foundCountry) {
        setCountryData({
          Code: countryDetails.countryCode,
          continent: foundCountry.continent,
          positive: oneCountry[3].Articles,
          negative: oneCountry[1].Articles,
          neutral: oneCountry[2].Articles,
          Value: oneCountry[0].Articles,
          Name: countryDetails.countryName,
        });
      } else {
        setCountryData({
          Code: countryDetails.countryCode,
          continent: countryDetails.continent,
          positive: clickedData.positive || 0,
          negative: clickedData.negative || 0,
          neutral: clickedData.neutral || 0,
          Value: clickedData.all || 0,
          Name: countryDetails.countryName,
        });
      }

      setModal(!modal);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleChange = (maskedValue, selectedYear, selectedMonth) => {
    // console.log(maskedValue, selectedYear, selectedMonth);
  };

  const getStyle = ({
    countryValue,
    countryCode,
    minValue,
    maxValue,
    color,
    countrySize,
  }) => {
    let fillColor = "rgb(166, 162, 162)"; // Default color
    
    if ((countryValue >= 1 && countryValue <= 3) && (selectedColor==0 || selectedColor==1) ) {
      fillColor = "rgb(217, 22, 22)"; // Red
    } else if ((countryValue >= 4 && countryValue <= 5) && (selectedColor==0 || selectedColor==2) ){
      fillColor = "rgb(255, 153, 51)"; // Orange
    } else if ((countryValue >= 6 && countryValue <= 7)&& (selectedColor==0 || selectedColor==3) ) {
      fillColor = "rgb(235, 231, 9)"; // Yellow
    } else if ((countryValue >= 8 && countryValue <= 10)&& (selectedColor==0 || selectedColor==4) ) {
      fillColor = "rgb(102, 255, 51)"; // Green
    } else if ((countryValue >= 11 && countryValue <= 13)&& (selectedColor==0 || selectedColor==5) ) {
      fillColor = "rgb(51, 204, 51)"; // Dark Green
    }

    return {
      fill: fillColor,
      // fillOpacity: countryValue
      //   ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
      //   : 0,
      stroke: "Black",
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: "pointer",
      // filter: `brightness(${1 + countrySize / 100})`, // Adjust the brightness based on countrySize
    };
  };

  const colors = [
    "bg-red-600",
    "bg-orange-400",
    "bg-yellow-300",
    "bg-green-300",
    "bg-green-600",
  ];
  const texts = ["0%", "25%", "50%", "75%", "100%"];

  const changeToRed =()=>{
    setSelectedColor(1);
  }

  const changeToOrange =()=>{
    setSelectedColor(2);
  }
  const changeToYellow =()=>{
    setSelectedColor(3);
  }
  const changeToLightGreen =()=>{
    setSelectedColor(4);
  }
  const changeToGreen =()=>{
    setSelectedColor(5);
  }

  return (
    <div className="mb-10 md:mb-20 lg:mb-32 w-full">
      <h1 className="text-2xl md:text-4xl text-center pt-8 md:pt-16 lg:pt-32">
        Discover the perception of{" "}
        <span className="text-purple-500">India </span>
        in the world
      </h1>

      {/* DISPLAYING THE INTERACTIVE WORLD MAP WITH POPUP */}
      <div className="parent-div overflow-hidden flex flex-col md:flex-row mt-4 md:mt-8 lg:mt-16 lg:mb-20">
        <div className="bg-white shadow-2xl p-5 rounded-2xl relative child-div w-full mx-auto md:ml-10 lg:ml-20 md:w-3/5 lg:w-2/3">
          {!isLaptop && (
            <div className="absolute top-8 left-0 ml-2 bg-white p-0 rounded-lg ">
              <img src={VerticalColors} alt="flagImg" className="h-40 w-3" />
            </div>
          )}

          <WorldMap
            className="world-map "
            color="gray"
            // title="Top 10 Populous Countries"
            value-suffix="people"
            size="xl"
            data={data}
            onClickFunction={clickAction}
            styleFunction={getStyle}
          />
        </div>

        {!isMobile && (
          <div className=" rounded-lg mx-auto md:mr-10 lg:ml-5 lg:mr-5 mt-4 md:mt-0 md:w-2/5 lg:w-1/2">
            <div className=" m-auto ml-38 p-4  w-2/8 pl-2">
              <div className="bg-white rounded-lg shadow-lg p-5 cursor-pointer bg-white flex space-x-5 items-center">
                <div className="rounded-lg pl-10 overflow-hidden">
                  <img
                    src={flagImg}
                    alt="flagImg"
                    className="w-20 h-12 rounded-lg"
                  />
                </div>

                <div className="text-xl ">
                  <div className="text-sm text-gray-400">Country</div>
                  <div className="text-2xl">{countryData.Name}</div>
                </div>

                <div className="h-8 bg-gray-300 w-px m-2"></div>

                <div className="text-xl ">
                  <div className="text-sm text-gray-400">Continent</div>
                  <div className="text-2xl">{countryData.continent}</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg">
                <div className="cursor-pointer  flex  items-center  m-2 p-2">
                  <div className="text-xl">
                    <div className="text-1xl">Articles published in march</div>
                  </div>
                  <div className="h-8 bg-gray-300 w-px m-2"></div>
                  <div className="text-xl">
                    <div className="text-2xl">{countryData.Value}</div>
                  </div>
                </div>

                <div className="pb-4">
                  <PieChartComponent />
                  <div className="flex">
                    {countryData.positive && (
                      <p className="text-green-500 m-auto ">
                        Positive: {countryData.positive}
                      </p>
                    )}
                    {countryData.negative && (
                      <p className="text-red-500 m-auto ">
                        Negative: {countryData.negative}
                      </p>
                    )}
                    {countryData.neutral && (
                      <p className="text-blue-500 m-auto ">
                        Neutral: {countryData.neutral}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="flex ml-10">
        <div className="text-center">
        <button
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-5 rounded-bl-2xl rounded-tl-2xl"
          onClick={changeToRed}
        >
          0%
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-5 "
          onClick={changeToOrange}
        >
          25%
        </button>
        <button
          className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-1 px-5 "
          onClick={changeToYellow}
        >
          50%
        </button>
        <button
          className="bg-green-300 hover:bg-green-500 text-white font-bold py-1 px-5 "
          onClick={changeToLightGreen}
        >
          75%
        </button>
        <button
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-5 rounded-br-2xl rounded-tr-2xl"
          onClick={changeToGreen}
        >
          100%
        </button>
      </div>

          <div className="flex justify-between w-1/2 rounded-full shadow-2xl bg-white mx-5 p-0">
            <div className=" mx-2 pb-7 pt-3 px-5  w-2/3">
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
      )}

      {/* <MonthPicker onChange={(date)=>{console.log(date);}} /> */}
      {/* <div className="flex items-center justify-center h-full">
        <MonthPickerInput
          year={2018}
          month={8}
          onChange={(maskedValue, selectedYear, selectedMonth) => {
            console.log(maskedValue, selectedYear, selectedMonth);
          }}
          className="bg-gray-200 px-4 py-2 rounded-md text-gray-800 cursor-pointer"
        />
      </div> */}
      {!isLaptop && (
        <div>
        <div className="flex">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-3 flex h-auto my-2">
              <div className="rounded-lg overflow-hidden mr-3 ">
                <img src={flagImg} alt="flagImg" className="h-10 rounded-lg" />
              </div>

              <div className="text-2xl">{countryData.Name}</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-3 flex h-12 my-2">
              <div className="text-1xl">Articles published in march</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-3 flex h-12 my-2">
              <div className="">
                <span className="m-1" style={{ color: "#17fc03" }}>
                  Positive
                </span>
                <span className="m-1" style={{ color: "#ff2b47" }}>
                  Negative
                </span>
                <span className="m-1" style={{ color: "#f5f247" }}>
                  Neutral
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-2xl m-auto">
            <SmallPieChart />
          </div>
        </div>
<div className="mx-5">
        <button className="w-full m-auto  bg-black text-white py-2 px-4 rounded-lg">
      See More
    </button>
    </div>

        </div>
      )}


      
 {/* ADD DIFF Micro charts here */}
{/* 
<div className="flex">
<MicroPieChart
  hoveredPositive={3}
  hoveredNegative={40}
/>

<MicroPieChart
  hoveredPositive={30}
  hoveredNegative={40}
/>

<MicroPieChart
  hoveredPositive={10}
  hoveredNegative={40}
/>
<MicroPieChart
  hoveredPositive={40}
  hoveredNegative={10}
/>
<MicroPieChart
  hoveredPositive={50}
  hoveredNegative={10}
/>
</div>
<HorizontalBar/>
<BarChartComponent/>

<SingleHorizontalBar
  positiveValue={5}
  negativeValue={10}
  neutralValue={8}
/> 
*/}

    </div>
  );
};

export default Hero;
