import React from "react";
import { useState, useEffect } from "react";
import WorldMap from "react-svg-worldmap";
import PieChartComponent from "../graphs/PieChartComponent";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useMediaQuery } from "react-responsive";
import SmallPieChart from "../graphs/SmallPieChart";
import "rc-slider/assets/index.css"; // Import the default CSS for the Slider component
import "rc-tooltip/assets/bootstrap.css"; // Import the default CSS for the Slider tooltip
import share from "../assets/shareButton.png";
import html2canvas from "html2canvas";
import arrowLeft from "../assets/Arrow 2.svg";
import arrowRight from "../assets/Arrow 1.svg";

import {
  CircleLoader,
} from "react-spinners";

const Hero = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isLoading, setIsLoading] = useState(false);
  const [isAllTime, setIsAllTime] = useState(true);

  const handleSliderChange = (value) => {
    setIsAllTime(false);
    setSelectedMonth(value);
  };

  // SAMPLE DATA FOR COUNTRY

  const [countryData, setCountryData] = useState({});

  const [clickedData, setClickedData] = useState({
    all: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });


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
      country: "br",
      value: 7,
      name: "Brazil",
      code: "BR",
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
    {
      country: "gb",
      value: 13,
      name: "United Kingdom",
      code: "UK",
      positive: 0,
      negative: 0,
      neutral: 0,
    }, // united states
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
          "https://kutniti-server.onrender.com/api/country/getallCountryArticleNumber",
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
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://kutniti-server.onrender.com/api/country/getallCountryArticlesMonth",
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

          const part1Data = combinedData.map((data) => {
            const monthParts = data.month.split("-");
            const monthNumber = parseInt(monthParts[1], 10);

            return {
              countryName: data.countryName,
              month: monthNumber, // Use the numeric month
              positive: data.positive,
              negative: data.negative,
              neutral: data.neutral,
            };
          });

          function createTemplateObject(countryName, month) {
            return {
              countryName,
              month,
              positive: 0,
              negative: 0,
              neutral: 0,
            };
          }
          const countryDataMap = {};

          // Initialize the countryDataMap with the template objects
          part1Data.forEach((data) => {
            if (!countryDataMap[data.countryName]) {
              countryDataMap[data.countryName] = [];
            }
            countryDataMap[data.countryName][data.month - 1] = data;
          });

          // Generate the complete set of data for each country
          const finalData = [];
          for (const countryName in countryDataMap) {
            const countryData = countryDataMap[countryName];

            for (let month = 1; month <= 12; month++) {
              if (!countryData[month - 1]) {
                // If the month data doesn't exist, create a template object
                const templateObject = createTemplateObject(countryName, month);
                finalData.push(templateObject);
              } else {
                finalData.push(countryData[month - 1]);
              }
            }
          }


          setMonthwiseData(finalData);
          //-----------------------Get data for the selectedMonth -----------------------------------------

          const filteredData = finalData
            .filter((item) => parseInt(item.month) === selectedMonth + 1)
            .map(({ month, ...rest }) => rest);

          //--------------------Sort the countries on value of negative and provide a rank attribute to all----------------------------------------------------
          const rankedData = filteredData
            .slice() // Create a copy of the filteredData array
            .sort((a, b) => b.negative - a.negative)
            .map((item, index) => ({ ...item, value: index + 1 }));

          //----------------------Traverse through data to update values--------------------------

          const newArray = data.map((item) => {
            const matchingRank = rankedData.find(
              (rankItem) =>
                rankItem.countryName === item.name ||
                (rankItem.countryName === "USA" &&
                  item.name === "United States") ||
                (rankItem.countryName === "UK" &&
                  item.name === "United Kingdom")
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

          // ----------------UPDATING ACC TO ALL TIME BUTTON ----------------

          const aggregatedData = {};

          // Iterate through the monthwiseData array and accumulate data for each country
          finalData.forEach((data) => {
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
          const rankeddData = resultArray
            .slice() // Create a copy of the filteredData array
            .sort((a, b) => b.negative - a.negative)
            .map((item, index) => ({ ...item, value: index + 1 }));

          //----------------------Traverse through data to update values--------------------------

          const newwArray = data.map((item) => {
            const matchingRank = rankeddData.find(
              (rankItem) =>
                rankItem.countryName === item.name ||
                (rankItem.countryName === "USA" &&
                  item.name === "United States") ||
                (rankItem.countryName === "UK" &&
                  item.name === "United Kingdom")
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
          setIsLoading(false);
          setData(newwArray);
        } else {
          setIsLoading(false);
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllCountries();

    clickAction({ countryName: "United States" });
  }, []);

  //--------------------Updating the worldwide data as the slider changes the month-------------------------------------
  useEffect(() => {
    const filteredData = monthwiseData
      .filter((item) => parseInt(item.month) === selectedMonth + 1)
      .map(({ month, ...rest }) => rest);

    const rankedData = filteredData
      .slice() // Create a copy of the filteredData array
      .sort((a, b) => b.negative - a.negative)
      .map((item, index) => ({ ...item, value: index + 1 }));

    const newArray = data.map((item) => {
      const matchingRank = rankedData.find(
        (rankItem) =>
          rankItem.countryName === item.name ||
          (rankItem.countryName === "USA" && item.name === "United States") ||
          (rankItem.countryName === "UK" && item.name === "United Kingdom")
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

  }, [selectedMonth]);



  useEffect(() => {
    const customObject = {
      countryName: countryData.Name || "United States",
    };

    clickAction(customObject);
  }, [data]);

  const allTimeData = () => {
    setIsAllTime(true);
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

    //----------------------Traverse through data to update values--------------------------

    const newArray = data.map((item) => {
      const matchingRank = rankedData.find(
        (rankItem) =>
          rankItem.countryName === item.name ||
          (rankItem.countryName === "USA" && item.name === "United States") ||
          (rankItem.countryName === "UK" && item.name === "United Kingdom")
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

  const getLocalizedText = () =>{
// Using empty function to prevent countryname and value from hovering
  }

  const clickAction = async (countryDetails) => {
    if (countryDetails.countryName === "United States") {
      countryDetails.countryName = "USA";
    }
    if (countryDetails.countryName === "United Kingdom") {
      countryDetails.countryName = "UK";
    }
    let countryName;
    try {
      //---------------------------------For FLAG-------------------------------
      const matchedCountry = allFlags.find(
        (country) => country.countryName === countryDetails.countryName
      );
      setFlagObjectSelected(matchedCountry);

      if (countryDetails.countryName === "USA") {
        countryDetails.countryName = "United States";
      }

      if (countryDetails.countryName === "UK") {
        countryDetails.countryName = "United Kingdom";
      }

      //----------------------------------For Other Data--------------------------------
      const foundCountry = data.find(
        (item) => item.name === countryDetails.countryName
      );

      if (foundCountry) {
        window.localStorage.setItem("hoveredPositive", foundCountry.positive);
        window.localStorage.setItem("hoveredNegative", foundCountry.negative);
        window.localStorage.setItem("hoveredNeutral", foundCountry.neutral);
        window.dispatchEvent(new Event("storage"));

        setCountryData({
          positive: foundCountry.positive || 0,
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

    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };


  const sliderMarks = months.reduce((acc, month, index) => {
    acc[index] = {
      style: { borderColor: "grey", height: "5%" }, // Set the style for the vertical line
      label: <p style={{ color: "grey", fontSize: "10px" }}>{month}</p>, // Set the label style
    };
    return acc;
  }, {});

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
      (selectedColor === 0 || selectedColor === 1)
    ) {
      fillColor = "rgba(255, 0, 0, 1)"; // Red
    } else if (
      countryValue >= 4 &&
      countryValue <= 5 &&
      (selectedColor === 0 || selectedColor === 2)
    ) {
      fillColor = "rgba(255, 193, 0, 1)"; // Orange
    } else if (
      countryValue >= 6 &&
      countryValue <= 7 &&
      (selectedColor === 0 || selectedColor === 3)
    ) {
      fillColor = "rgba(255, 255, 0, 1)"; // Yellow
    } else if (
      countryValue >= 8 &&
      countryValue <= 10 &&
      (selectedColor === 0 || selectedColor === 4)
    ) {
      fillColor = "rgba(214, 255, 0, 1)"; // Green
    } else if (
      countryValue >= 11 &&
      countryValue <= 13 &&
      (selectedColor === 0 || selectedColor === 5)
    ) {
      fillColor = "rgba(4, 206, 0, 1)"; // Dark Green
    }

    return {
      fill: fillColor,
      // fillOpacity: countryValue
      //   ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
      //   : 0,
      // fillOpacity: 0, // Set the fill opacity to 0.5 for transparency
      // transform: "scale(1.2)",
      stroke: "Black",
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: "pointer",
      // filter: `brightness(${1 + countrySize / 100})`, // Adjust the brightness based on countrySize
    };
  };

  const handleDownload = async () => {
    const chartRef = document.getElementById("capture"); // Get the chart element

    try {
      const canvas = await html2canvas(chartRef);
      const imageUri = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imageUri;
      link.download = "capture.png";
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

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
    if (countryData.Name === "United Kingdom") countryData.Name = "UK";

    window.localStorage.setItem("hoveredCountry", countryData.Name);
    window.localStorage.setItem("hoveredPositive", countryData.positive);
    window.localStorage.setItem("hoveredNegative", countryData.negative);
    window.localStorage.setItem("hoveredNeutral", countryData.neutral);
    window.dispatchEvent(new Event("storage"));

    window.location.href = "/country-detail";
  };


  return (
    <div className="mb-auto w-full ">
      <h1 className="text-2xl invisible lg:ml-5">Adding sample spacing</h1>
      <div id="capture">
      {isLaptop && (
        <h1 className="font-custom font-bold text-3xl lg:ml-10 lg:mt-20 ">
          What is the perception of{" "}
          <span className="text-blue-500">India </span>
          in the world ?
        </h1>
      )}
      
        {isMobile && (
          <h1 className="font-custom mt-20 ml-5 mr-5 text-xl font-bold">
            What is the perception of{" "}
            <span className="text-blue-500">India </span>
            in the world
          </h1>
        )}

        {/* DISPLAYING THE INTERACTIVE WORLD MAP WITH POPUP */}
        <div className=" relative parent-div overflow-hidden flex justify-between flex-col md:flex-row mt-4 md:mt-8 lg:mt-5 lg:mb-5 pb-5 pt-5">
          <div
            id="worldmap"
            className="border backdrop-blur-[3px] border-gray-300 bg-opacity-0 absolute inset-0 flex justify-center items-center shadow-lg rounded-2xl relative child-div w-full  md:ml-5 lg:ml-10 md:w-3/5 lg:w-2/3"
          >
            {isMobile && (
              <div className="absolute top-10 left-0 ml-2 bg-opacity-0 p-0 rounded-lg ">
                <div className="text-center flex flex-col ">
                  <button
                    className="bg-custom-red hover:bg-red-800 transform -rotate-90 my-2 px-1 rounded-br-2xl rounded-tr-2xl"
                    onClick={changeToRed}
                  >
                    <div className="text-xs font-thin">0%</div>
                  </button>

                  <button
                    className="bg-custom-orange hover:bg-orange-600  my-2 px-1 transform -rotate-90   "
                    onClick={changeToOrange}
                  >
                    <div className="text-xs font-thin">25%</div>
                  </button>
                  <button
                    className="bg-custom-yellow hover:bg-yellow-500 my-2 px-1 transform -rotate-90  "
                    onClick={changeToYellow}
                  >
                    <div className="text-xs font-thin">50%</div>
                  </button>
                  <button
                    className="bg-custom-yellowishGreen hover:bg-green-500 my-2 px-1 transform -rotate-90"
                    onClick={changeToLightGreen}
                  >
                    <div className="text-xs font-thin">75%</div>
                  </button>

                  <button
                    className="bg-custom-green hover:bg-green-800 my-2 px-1  rounded-tl-2xl rounded-bl-2xl transform -rotate-90"
                    onClick={changeToGreen}
                  >
                    <div className="text-xs font-thin">100%</div>
                  </button>
                </div>
              </div>
            )}

            <div className="world-map-container ">
              <div className="absolute top-4 right-4 ml-2 bg-white p-0 rounded-lg">
                <div className="text-center flex flex-col">
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
                size={isMobile ? "responsive" : 700}
                data={data}
                onClickFunction={clickAction}
                styleFunction={getStyle}
                backgroundColor="transparent"
                tooltipTextFunction={getLocalizedText}
              />
            </div>
          </div>

          {isLaptop && (
            <div className="border backdrop-blur-[3px] border-gray-300  bg-opacity-0 rounded-2xl shadow-lg  md:mr-10  lg:mr-10 mt-4 md:mt-0 md:w-2/5 lg:w-1/4">
              <div className=" m-auto pr-4 pt-4 pl-2">
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

                  <div className="font-custom flex justify-center items-center ">
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
                  {isLoading && (
                    <div
                      style={{
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: "2",
                      }}
                    >
                      <div className="spinner-container mt-10">
                        <CircleLoader color="#3af2d7" size={80} />
                      </div>
                    </div>
                  )}
                  {!isLoading && (
                    <div className="pb-2">
                      {countryData.positive +
                      countryData.negative +
                      countryData.neutral ? (
                        <div className="flex justify-center">
                          <PieChartComponent
                            hoveredPositive={countryData.positive}
                            hoveredNegative={countryData.negative}
                            hoveredNeutral={countryData.neutral}
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="flex text-gray-600 ml-10 my-20">
                            Click on a country to study
                          </div>

                          <div className="invisible flex text-gray-600 ml-10 my-20">
                            Click on a country to study
                          </div>

                          <div className="invisible flex text-gray-600 ml-10 my-3">
                            Click on a country to study
                          </div>
                        </div>
                      )}

                      <div className="flex ">
                        {countryData.positive ? (
                          <p className="font-custom text-green-500 text-sm m-auto ">
                            Positive: {countryData.positive}
                          </p>
                        ) : null}

                        {countryData.negative ? (
                          <p className="font-custom text-red-500 text-sm m-auto ">
                            Negative: {countryData.negative}
                          </p>
                        ) : null}

                        {countryData.neutral ? (
                          <p className="font-custom text-blue-500 text-sm m-auto ">
                            Neutral: {countryData.neutral}
                          </p>
                        ) : null}
                      </div>

                      <div className="font-custom mx-2 mt-3">
                        {countryData.positive +
                        countryData.negative +
                        countryData.neutral ? (
                          <button
                            onClick={() => sendToDetails(countryData)}
                            className="w-full m-auto  bg-black text-white flex items-center justify-center p-2 rounded-lg"
                          >
                            More About {countryData.Name}
                          </button>
                        ) : null}
                      </div>

                      {!isAllTime && (
                        <div className="flex items-center justify-around text-12">
                          <div className="">
                            {months[selectedMonth] ? (
                              <div className="font-custom ">
                                Articles published in {months[selectedMonth]}
                              </div>
                            ) : null}
                          </div>

                          <div className="font-custom h-12 bg-gray-300 w-px mx-2 mt-2 "></div>
                          <div className="flex ">
                            {(countryData.positive ||
                              countryData.negative ||
                              countryData.neutral) && (
                              <div className="">
                                {countryData.positive +
                                  countryData.negative +
                                  countryData.neutral}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isLaptop && (
        <div className="ml-2 mr-2 font-custom flex w-[99%] justify-around lg:mb-5 ">
          <div className="w-1/4 bg-opacity-0 backdrop-blur-[2px] pt-2 pb-1 border border-gray-300 rounded-2xl shadow-2xl text-center pl-2 pr-2">
            <div>
              <button
                className="bg-custom-red hover:bg-red-800 text-xs px-4 h-6 font-thin rounded-bl-2xl rounded-tl-2xl"
                onClick={changeToRed}
              >
                0%
              </button>
              <button
                className="bg-custom-orange hover:bg-orange-600 h-6 font-thin text-xs  px-4 "
                onClick={changeToOrange}
              >
                25%
              </button>
              <button
                className="bg-custom-yellow hover:bg-yellow-500 h-6 font-thin text-xs px-4 "
                onClick={changeToYellow}
              >
                50%
              </button>
              <button
                className="bg-custom-yellowishGreen hover:bg-green-500 h-6 font-thin text-xs px-4 "
                onClick={changeToLightGreen}
              >
                75%
              </button>
              <button
                className="bg-custom-green hover:bg-green-800 h-6 font-thin text-xs px-4 rounded-br-2xl rounded-tr-2xl"
                onClick={changeToGreen}
              >
                100%
              </button>
            </div>

            <div className="flex justify-between ml-2 mr-2 mt-2">
              <img src={arrowLeft} alt="" className="" />
              <p className="text-xs">Negative</p>
              <p className="text-xs">Perception</p>
              <p className="text-xs">Positive</p>
              <img src={arrowRight} alt="" className="" />
            </div>
          </div>

          <div className="border-gray-300 bg-opacity-0 w-2/3 inline-flex rounded-2xl border border-black-800 backdrop-blur-[3px] p-0 justify-around">
            <div className=" pb-7 pt-3 px-2 w-5/6">
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
            <div className="flex items-center justify-center">
              <button
                onClick={allTimeData}
                className="font-custom bg-black text-white rounded-full px-3 py-2"
              >
                All Time
              </button>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="">
          <div className="flex">
            <div className="ml-2 w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-2 flex h-auto my-2 ">
                <div className="rounded-lg overflow-hidden mr-3 ">
                  {flagObjectSelected && (
                    <img
                      src={flagObjectSelected.flagLogo}
                      alt="Country Flag"
                      className="h-10 rounded-lg"
                    />
                  )}
                </div>

                <div className="text-2xl font-custom font-bold">
                  {countryData.Name}
                </div>
              </div>

              <div className="font-custom bg-white rounded-lg shadow-lg p-3 flex h-12 my-2">
                {!isAllTime && (
                  <div className="text-xs">
                    Articles published in {months[selectedMonth]} :{" "}
                    {countryData.positive +
                      countryData.negative +
                      countryData.neutral}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-3 flex h-9 my-1 mb-2">
                <div className="font-custom text-xs">
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
          <div className="font-custom mx-5 mb-3">
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

          <div className="font-custom ml-1 mr-2 mb-5 w-full inline-flex rounded-2xl border border-black-800 bg-white p-0 justify-between">
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
        </div>
      )}
    </div>
  );
};

export default Hero;
