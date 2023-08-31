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
import { Tooltip } from "antd";
import "rc-slider/assets/index.css"; // Import the default CSS for the Slider component
import "rc-tooltip/assets/bootstrap.css"; // Import the default CSS for the Slider tooltip
import share from "../assets/shareButton.png";
import html2canvas from "html2canvas";
import arrowLeft from "../assets/Arrow 2.png";
import arrowRight from "../assets/Arrow 1.png";
import negative from "../assets/NEGATIVE.png";
import perception from "../assets/Perception.png";
import positive from "../assets/POSITIVE.png";

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

  const handleSliderChange = (value) => {
    setSelectedMonth(value);

    // console.log("Selected Month:", months[value]);
  };
  // console.log(selectedMonth);

  // SAMPLE DATA FOR COUNTRY

  const [countryData, setCountryData] = useState({});

  const [clickedData, setClickedData] = useState({
    all: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  const [modal, setModal] = useState(false);

  //-----------GET THE NO. NEGATIVE ARTICLES BY EACH COUNTRY CALCULATE THEIR RANKS BASED ON THAT AND UPDATE THE DATA ARRAY--------------------------------

  // const [isDataReady, setIsDataReady] = useState(false);

  const [monthwiseData, setMonthwiseData] = useState([]);
  const [data, setData] = useState([
    {
      country: "fr",
      value: 1,
      name: "France",
      code: "FR",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // france
    {
      country: "au",
      value: 2,
      name: "Australia",
      code: "AU",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // australia
    {
      country: "cn",
      value: 3,
      name: "China",
      code: "CN",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // china
    {
      country: "us",
      value: 4,
      name: "United States",
      code: "US",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // united states
    {
      country: "sp",
      value: 5,
      name: "Singapore",
      code: "SP",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // singapore
    {
      country: "ca",
      value: 6,
      name: "Canada",
      code: "CA",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // canada
    {
      country: "jp",
      value: 8,
      name: "Japan",
      code: "JP",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // japan
    {
      country: "ng",
      value: 9,
      name: "Nigeria",
      code: "NG",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // nigeria
    {
      country: "pk",
      value: 10,
      name: "Pakistan",
      code: "PK",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // pakistan
    {
      country: "ru",
      value: 11,
      name: "Russia",
      code: "RU",
      positive: 10,
      negative: 10,
      neutral: 10,
    }, // russia
    {
      country: "ae",
      value: 12,
      name: "UAE",
      code: "AE",
      positive: 10,
      negative: 10,
      neutral: 10,
    }, // uae
  ]);

  const [selectedColor, setSelectedColor] = useState(0);
  const [allFlags, setAllFlags] = useState([]);
  const [flagObjectSelected, setFlagObjectSelected] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });

  useEffect(() => {
    const fetchAllFlags = async () => {
      try {
        const response = await fetch(
          "http://65.2.183.51:8000/api/country/getallCountryArticleNumber",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const getData = await response.json();

          const uniqueCountries = [];
          const countryNames = {};

          getData.forEach((item) => {
            const { countryName, flagLogo } = item;
            if (!countryNames[countryName]) {
              countryNames[countryName] = true;
              uniqueCountries.push({ countryName, flagLogo });
            }
          });

          // console.log(uniqueCountries);

          setAllFlags(uniqueCountries);
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllFlags();

    const fetchAllCountries = async () => {
      try {
        const response = await fetch(
          "http://65.2.183.51:8000/api/country/getallCountryArticlesMonth",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const getData = await response.json();

          const transformedData = [];

          getData.forEach((dataObj) => {
            dataObj.pubDates.forEach((dateStr) => {
              const date = new Date(dateStr);
              const month = date.getMonth() + 1; // Months are 0-based, so we add 1
              const yearMonth = `${date.getFullYear()}-${month}`;

              const existingEntry = transformedData.find(
                (entry) =>
                  entry.countryName === dataObj.country &&
                  entry.type === dataObj.type &&
                  entry.month === yearMonth
              );
              if (existingEntry) {
                existingEntry.numArticles++;
              } else {
                transformedData.push({
                  countryName: dataObj.country,
                  type: dataObj.type,
                  month: yearMonth,
                  numArticles: 1,
                });
              }
            });
          });

          // console.log(transformedData);

          const combinedData = [];

          transformedData.forEach((dataObj) => {
            const { countryName, month, type, numArticles } = dataObj;

            let existingEntry = combinedData.find(
              (entry) =>
                entry.countryName === countryName && entry.month === month
            );

            if (!existingEntry) {
              existingEntry = {
                countryName,
                month,
                positive: 0,
                negative: 0,
                neutral: 0,
              };
              combinedData.push(existingEntry);
            }

            if (type === "Positive") {
              existingEntry.positive += numArticles;
            } else if (type === "Negative") {
              existingEntry.negative += numArticles;
            } else if (type === "Neutral") {
              existingEntry.neutral += numArticles;
            }
          });

          // console.log(combinedData);

          const generateNewData = (data) => {
            const newData = [];

            const countries = [
              ...new Set(data.map((item) => item.countryName)),
            ];
            const months = Array.from({ length: 12 }, (_, i) => i + 1);

            countries.forEach((country) => {
              months.forEach((month) => {
                const formattedMonth = String(month);
                const existingData = data.find(
                  (item) =>
                    item.countryName === country &&
                    item.month.includes(formattedMonth)
                );

                if (existingData) {
                  newData.push({
                    countryName: country,
                    month: formattedMonth,
                    positive: existingData.positive,
                    negative: existingData.negative,
                    neutral: existingData.neutral,
                  });
                } else {
                  newData.push({
                    countryName: country,
                    month: formattedMonth,
                    positive: 0,
                    negative: 0,
                    neutral: 0,
                  });
                }
              });
            });

            return newData;
          };

          const newData = generateNewData(combinedData);

          setMonthwiseData(newData);

          //-----------------------Get data for the selectedMonth -----------------------------------------

          // console.log(newData);
          // console.log(selectedMonth);
          const filteredData = newData
            .filter((item) => parseInt(item.month) === selectedMonth + 1)
            .map(({ month, ...rest }) => rest);

          //--------------------Sort the countries on value of negative and provide a rank attribute to all----------------------------------------------------
          const rankedData = filteredData
            .slice() // Create a copy of the filteredData array
            .sort((a, b) => b.negative - a.negative)
            .map((item, index) => ({ ...item, value: index + 1 }));

          // console.log(rankedData);
          //----------------------Traverse through data to update values--------------------------

          const newArray = data.map((item) => {
            const matchingRank = rankedData.find(
              (rankItem) =>
                rankItem.countryName === item.name ||
                (rankItem.countryName === "USA" &&
                  item.name === "United States")
            );

            if (matchingRank) {
              return {
                ...item,
                positive: matchingRank.positive,
                negative: matchingRank.negative,
                neutral: matchingRank.neutral,
                value: matchingRank.value,
              };
            }

            return item;
          });

          // console.log(newArray);
          setData(newArray);
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllCountries();
  }, []);

  //--------------------Updating the worldwide data as the slider changes the month-------------------------------------
  useEffect(() => {
    const filteredData = monthwiseData
      .filter((item) => parseInt(item.month) === selectedMonth + 1)
      .map(({ month, ...rest }) => rest);

    console.log(filteredData);
    const rankedData = filteredData
      .slice() // Create a copy of the filteredData array
      .sort((a, b) => b.negative - a.negative)
      .map((item, index) => ({ ...item, value: index + 1 }));

    const newArray = data.map((item) => {
      const matchingRank = rankedData.find(
        (rankItem) =>
          rankItem.countryName === item.name ||
          (rankItem.countryName === "USA" && item.name === "United States")
      );

      if (matchingRank) {
        return {
          ...item,
          positive: matchingRank.positive,
          negative: matchingRank.negative,
          neutral: matchingRank.neutral,
          value: matchingRank.value,
        };
      }

      return item;
    });

    // console.log(newArray);

    setData(newArray);

    // const selectedCountryObject = newArray.find((item) => item.name === countryData.countryName);

    // if (selectedCountryObject) {
    //   selectedCountryPositive = selectedCountryObject.positive;
    //   selectedCountryNegative = selectedCountryObject.negative;
    //   selectedCountryNeutral = selectedCountryObject.neutral;
    //   selectedCountryName = selectedCountryObject.name;
    // }

    // setCountryData({

    //     });
  }, [selectedMonth]);

  // useEffect(() => {
  //   let selectedCountryPositive = 0;
  //   let selectedCountryNegative = 0;
  //   let selectedCountryNeutral = 0;
  //   let selectedCountryName;

  //   const fetchTempData = async () => {
  //     const selectedCountryObject = await data.find(
  //       (item) => item.name === countryData.countryName
  //     );

  //     if (selectedCountryObject) {
  //       console.log(selectedCountryObject);
  //       setCountryData({
  //         positive: selectedCountryObject.positive,
  //         negative: selectedCountryObject.negative,
  //         neutral: selectedCountryObject.neutral,
  //         Name: selectedCountryObject.name,
  //       });
  //     }
  //   };

  //   fetchTempData();
  // }, [selectedMonth]);

  useEffect(() => {
    // Call the clickAction function whenever selectedMonth changes
    const customObject = {
      countryName: countryData.Name,
    };

    clickAction(customObject);
  }, [data]);

  const allTimeData = () => {
    // Create an object to store the accumulated data for each country
    const aggregatedData = {};

    // Iterate through the monthwiseData array and accumulate data for each country
    monthwiseData.forEach((data) => {
      const { countryName, positive, negative, neutral } = data;

      if (!aggregatedData[countryName]) {
        aggregatedData[countryName] = {
          countryName,
          positive,
          negative,
          neutral,
        };
      } else {
        aggregatedData[countryName].positive += positive;
        aggregatedData[countryName].negative += negative;
        aggregatedData[countryName].neutral += neutral;
      }
    });

    // Convert the aggregatedData object back to an array of objects
    const resultArray = Object.values(aggregatedData);

    //--------------------Sort the countries on value of negative and provide a rank attribute to all----------------------------------------------------
    const rankedData = resultArray
      .slice() // Create a copy of the filteredData array
      .sort((a, b) => b.negative - a.negative)
      .map((item, index) => ({ ...item, value: index + 1 }));

    // console.log(rankedData);
    //----------------------Traverse through data to update values--------------------------

    const newArray = data.map((item) => {
      const matchingRank = rankedData.find(
        (rankItem) =>
          rankItem.countryName === item.name ||
          (rankItem.countryName === "USA" && item.name === "United States")
      );

      if (matchingRank) {
        return {
          ...item,
          positive: matchingRank.positive,
          negative: matchingRank.negative,
          neutral: matchingRank.neutral,
          value: matchingRank.value,
        };
      }

      return item;
    });

    setData(newArray);
  };

  const clickAction = async (countryDetails) => {
    // console.log(countryDetails);
    // console.log(data);
    if (countryDetails.countryName === "United States") {
      countryDetails.countryName = "USA";
    }
    let countryName;
    try {
      // console.log(countryDetails);
      //---------------------------------For FLAG-------------------------------
      const matchedCountry = allFlags.find(
        (country) => country.countryName === countryDetails.countryName
      );
      setFlagObjectSelected(matchedCountry);

      if (countryDetails.countryName === "USA") {
        countryDetails.countryName = "United States";
      }

      //----------------------------------For Other Data--------------------------------
      const foundCountry = data.find(
        (item) => item.name === countryDetails.countryName
      );
      // console.log(foundCountry);

      window.localStorage.setItem("hoveredPositive", foundCountry.positive);
      window.localStorage.setItem("hoveredNegative", foundCountry.negative);
      window.localStorage.setItem("hoveredNeutral", foundCountry.neutral);
      window.dispatchEvent(new Event("storage"));

      if (foundCountry) {
        setCountryData({
          positive: foundCountry.positive,
          negative: foundCountry.negative,
          neutral: foundCountry.neutral,
          Name: countryDetails.countryName,
        });
      } else {
        setCountryData({
          positive: clickedData.positive || 0,
          negative: clickedData.negative || 0,
          neutral: clickedData.neutral || 0,
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

  const sliderMarks = months.reduce((acc, month, index) => {
    acc[index] = {
      style: { borderColor: "grey", height: "5%" }, // Set the style for the vertical line
      label: <p style={{ color: "grey", fontSize: "10px" }}>{month}</p>, // Set the label style
    };
    return acc;
  }, {});

  const markStyle = {
    backgroundColor: "black", // Set the color of the marker lines
    width: 1, // Set the width of the marker lines
    height: 8, // Set the height of the marker lines
    marginTop: -3, // Adjust the position of the marker lines
  };
  const marksStyles = {
    color: "white", // Set the color of the marks (dots) to white
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

    if (
      countryValue >= 1 &&
      countryValue <= 3 &&
      (selectedColor == 0 || selectedColor == 1)
    ) {
      fillColor = "rgb(217, 22, 22)"; // Red
    } else if (
      countryValue >= 4 &&
      countryValue <= 5 &&
      (selectedColor == 0 || selectedColor == 2)
    ) {
      fillColor = "rgb(255, 153, 51)"; // Orange
    } else if (
      countryValue >= 6 &&
      countryValue <= 7 &&
      (selectedColor == 0 || selectedColor == 3)
    ) {
      fillColor = "rgb(235, 231, 9)"; // Yellow
    } else if (
      countryValue >= 8 &&
      countryValue <= 10 &&
      (selectedColor == 0 || selectedColor == 4)
    ) {
      fillColor = "rgb(102, 255, 51)"; // Green
    } else if (
      countryValue >= 11 &&
      countryValue <= 13 &&
      (selectedColor == 0 || selectedColor == 5)
    ) {
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

  const handleDownload = async () => {
    const chartRef = document.getElementById("worldmap"); // Get the chart element

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

  const texts = ["0%", "25%", "50%", "75%", "100%"];

  const changeToRed = () => {
    setSelectedColor(1);
  };

  const changeToOrange = () => {
    setSelectedColor(2);
  };
  const changeToYellow = () => {
    setSelectedColor(3);
  };
  const changeToLightGreen = () => {
    setSelectedColor(4);
  };
  const changeToGreen = () => {
    setSelectedColor(5);
  };

  const sendToDetails = (countryData) => {
    if (countryData.Name === "United States") countryData.Name = "USA";

    window.localStorage.setItem("hoveredCountry", countryData.Name);
    window.localStorage.setItem("hoveredPositive", countryData.positive);
    window.localStorage.setItem("hoveredNegative", countryData.negative);
    window.localStorage.setItem("hoveredNeutral", countryData.neutral);
    window.dispatchEvent(new Event("storage"));

    // console.log(countryData.Name);
    window.location.href = "http://localhost:3000/country-detail";
  };

  const mapStyle = {
    transform: window.innerWidth < 500 ? "scale(1.5)" : "scale(1)", // Apply zoom
    width: window.innerWidth < 500 ? "150%" : "100%", // Adjust width
    height: "auto", // Allow the height to adjust based on the aspect ratio
  };

  // const imageUrl = "https://kutniti-country.s3.ap-south-1.amazonaws.com/flags/Brazil.png";

  return (
    <div className="mb-10 md:mb-20 lg:mb-32 w-full">
      <h1 className="text-2xl invisible lg:ml-5">Adding sample spacing</h1>
      {!isMobile && (
        <h1 className="text-3xl  lg:ml-5 lg:mt-20 font-bold">
          What is the perception of{" "}
          <span className="text-blue-500">India </span>
          in the world ?
        </h1>
      )}

      {!isLaptop && (
        <h1 className="mt-20 ml-5 mr-5 text-xl font-bold">
          What is the perception of{" "}
          <span className="text-blue-500">India </span>
          in the world
        </h1>
      )}

      {/* DISPLAYING THE INTERACTIVE WORLD MAP WITH POPUP */}
      <div className=" relative parent-div overflow-hidden flex justify-between flex-col md:flex-row mt-4 md:mt-8 lg:mt-10 lg:mb-20 ">
        <div
          id="worldmap"
          className="absolute inset-0 flex justify-center items-center bg-white shadow-2xl rounded-2xl relative child-div w-full  md:ml-5 lg:ml-5 md:w-3/5 lg:w-2/3"
        >
          {!isLaptop && (
            <div className="absolute top-4 left-0 ml-2 bg-white p-0 rounded-lg ">
              <div className="text-center flex flex-col ">
                <button
                  className="bg-red-600 hover:bg-red-800 text-white transform -rotate-90 my-2 px-1 rounded-br-2xl rounded-tr-2xl"
                  onClick={changeToRed}
                >
                  <div className="text-xs">0%</div>
                </button>
                <button
                  className="bg-orange-400 hover:bg-orange-600 text-white my-2 px-1 transform -rotate-90   "
                  onClick={changeToOrange}
                >
                  <div className="text-xs">25%</div>
                </button>
                <button
                  className="bg-yellow-300 hover:bg-yellow-500 text-white my-2 px-1 transform -rotate-90  "
                  onClick={changeToYellow}
                >
                  <div className="text-xs">50%</div>
                </button>
                <button
                  className="bg-green-300 hover:bg-green-500 text-white my-2 px-1 transform -rotate-90"
                  onClick={changeToLightGreen}
                >
                  <div className="text-xs">75%</div>
                </button>
                <button
                  className="bg-green-600 hover:bg-green-800 text-white my-2 px-1  rounded-tl-2xl rounded-bl-2xl transform -rotate-90"
                  onClick={changeToGreen}
                >
                  <div className="text-xs">100%</div>
                </button>
              </div>
            </div>
          )}

          <div className="world-map-container ">
            <div className="absolute top-4 right-4 ml-2 bg-white p-0 rounded-lg ">
              <div className="text-center flex flex-col ">
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

            <WorldMap
              className="world-map"
              color="gray"
              // title="Top 10 Populous Countries"
              value-suffix="people"
              size="xl"
              data={data}
              onClickFunction={clickAction}
              styleFunction={getStyle}
              style={mapStyle} // Apply inline styles
            />
          </div>
          {/* 
          <WorldMap
            className="world-map "
            color="gray"
            // title="Top 10 Populous Countries"
            value-suffix="people"
            size="xl"
            data={data}
            onClickFunction={clickAction}
            styleFunction={getStyle}
          /> */}
        </div>

        {!isMobile && (
          <div className="bg-white rounded-2xl shadow-2xl  md:mr-10  lg:mr-5 mt-4 md:mt-0 md:w-2/5 lg:w-1/4">
            <div className=" m-auto p-4 pl-2">
              <div className=" p-5 cursor-pointer flex space-x-6 items-center">
                <div className=" overflow-hidden">
                  {flagObjectSelected && (
                    <img
                      src={flagObjectSelected.flagLogo}
                      alt="Country Flag"
                      className="w-20 rounded-lg"
                    />
                  )}
                </div>

                <div className="flex justify-center items-center ">
                  <div className="text-3xl">{countryData.Name}</div>
                </div>

                {/* <div className="h-8 bg-gray-300 w-px m-2"></div> */}

                {/* <div className="text-xl ">
                  <div className="text-sm text-gray-400">Continent</div>
                  <div className="text-2xl">{countryData.continent}</div>
                </div> */}
              </div>

              <div className="w-full bg-gray-300 h-px m-2"></div>
              <div className=" ">
                <div className="cursor-pointer  flex  items-center m-0 p-1">
                  <div className="text-xl">
                    {months[selectedMonth] ? (
                      <div className="">
                        Articles published in {months[selectedMonth]}
                      </div>
                    ) : null}
                  </div>
                  <div className="h-12 bg-gray-300 w-px m-2"></div>
                  <div className="flex ">
                    {(countryData.positive ||
                      countryData.negative ||
                      countryData.neutral) && (
                      <div className="text-xl">
                        {countryData.positive +
                          countryData.negative +
                          countryData.neutral}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pb-4">
                  {/* {!countryData.positive &&
                    !countryData.negative &&
                    !countryData.neutral && (
                      <div className="my-10 mx-5 text-2xl text-gray-600">
                        Click on the Country to update the Chart
                      </div>
                    )} */}

                  {countryData.positive +
                  countryData.negative +
                  countryData.neutral ? (
                    <PieChartComponent
                      hoveredPositive={countryData.positive}
                      hoveredNegative={countryData.negative}
                      hoveredNeutral={countryData.neutral}
                    />
                  ) : null}

                  <div className="flex ">
                    {countryData.positive ? (
                      <p className="text-green-500 m-auto ">
                        Positive: {countryData.positive}
                      </p>
                    ) : null}

                    {countryData.negative ? (
                      <p className="text-red-500 m-auto ">
                        Negative: {countryData.negative}
                      </p>
                    ) : null}

                    {countryData.neutral ? (
                      <p className="text-blue-500 m-auto ">
                        Neutral: {countryData.neutral}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="flex w-full justify-between">
          <div className="ml-5 w-2/3 inline-flex rounded-3xl border border-black-800 bg-white p-0 justify-between">
            <div className=" pb-7 pt-3 px-5 w-5/6">
              <div className="ml-2 mt-2">
                <Slider
                  min={0}
                  max={11}
                  marks={sliderMarks}
                  step={1}
                  value={selectedMonth}
                  onChange={handleSliderChange}
                  railStyle={{ backgroundColor: "black" }}
                  trackStyle={{ backgroundColor: "black" }}
                  handleStyle={{
                    borderColor: "black",

                    width: 20,
                    height: 10,
                    marginTop: -2,
                    borderRadius: 4,
                    backgroundColor: "black",
                    border: "2px solid black",
                  }}
                />
              </div>
            </div>
            <div>
              <button
                onClick={allTimeData}
                className="bg-black text-white rounded-full px-3 py-2 mt-2 mr-8"
              >
                All Time
              </button>
            </div>
          </div>

          <div className="text-center mr-8">
            <div>
              <button
                className="bg-red-600 hover:bg-red-800 text-white font-bold px-4 rounded-bl-2xl rounded-tl-2xl"
                onClick={changeToRed}
              >
                0%
              </button>
              <button
                className="bg-orange-400 hover:bg-orange-600 text-white font-bold  px-3 "
                onClick={changeToOrange}
              >
                25%
              </button>
              <button
                className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold px-3 "
                onClick={changeToYellow}
              >
                50%
              </button>
              <button
                className="bg-green-300 hover:bg-green-500 text-white font-bold px-3 "
                onClick={changeToLightGreen}
              >
                75%
              </button>
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold  px-4 rounded-br-2xl rounded-tr-2xl"
                onClick={changeToGreen}
              >
                100%
              </button>
            </div>

            <div className="flex justify-between">
              <img
                src={arrowLeft}
                alt=""
                className=""
              />
              <img
                src={negative}
                alt=""
                className=""
              />
              <img
                src={perception}
                alt=""
                className=""
              />
              <img
                src={positive}
                alt=""
                className=""
              />
              <img
                src={arrowRight}
                alt=""
                className=""
              />
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
                  {flagObjectSelected && (
                    <img
                      src={flagObjectSelected.flagLogo}
                      alt="Country Flag"
                      className="h-10 rounded-lg"
                    />
                  )}
                </div>

                <div className="text-2xl">{countryData.Name}</div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-3 flex h-12 my-2">
                <div className="text-1xl">
                  Articles published in {months[selectedMonth]}
                </div>
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
              <SmallPieChart
                hoveredPositive={countryData.positive}
                hoveredNegative={countryData.negative}
                hoveredNeutral={countryData.neutral}
              />
            </div>
          </div>
          <div className="mx-5">
            {countryData.Name && (
              <button
                onClick={() => sendToDetails(countryData)}
                className="w-full m-auto  bg-black text-white py-2 px-4 rounded-lg"
              >
                More About {countryData.Name}
              </button>
            )}
          </div>

          {/* <div className="w-[340px] mt-5 lg:w-[500px]">
                <div className="bg-white m-auto shadow-xl rounded-3xl w-100 overflow-x-auto">
                <div className=" pb-7 pt-3 px-5 w-5/6">
              <div className="ml-2 mt-2"> */}

          <div className="ml-1 mr-2 w-full inline-flex rounded-2xl border border-black-800 bg-white p-0 justify-between">
            <div className="  px-2 pt-2 w-full overflow-x-scroll">
              <div className=" w-500">
                <div
                  className=" w-full max-w-full overflow-x-scroll"
                  style={{ maxWidth: "370px" }}
                >
                  <Slider
                    min={0}
                    max={11}
                    marks={sliderMarks}
                    step={1}
                    value={selectedMonth}
                    onChange={handleSliderChange}
                    railStyle={{ backgroundColor: "black" }}
                    trackStyle={{ backgroundColor: "black" }}
                    handleStyle={{
                      borderColor: "black",
                      width: 20,
                      height: 10,
                      marginTop: -2,
                      borderRadius: 4,
                      backgroundColor: "black",
                      border: "2px solid black",
                    }}
                  />
                  <div className="invisible">{selectedMonth}</div>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={allTimeData}
                className="bg-black text-white rounded-3xl p-1 mt-2 mr-3 w-20"
              >
                All Time
              </button>
            </div>
          </div>
          {/* </div>
            </div>
                </div>
              </div> */}
        </div>
      )}
    </div>
  );
};

export default Hero;
