import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/backgroundMain.jpg";
import updown from "../assets/updownarrow.svg";
import BigSingleHorizontalBar from "../graphs/BigSingleHorizontalBar";
import MicroPieChart from "../graphs/MicroPieChart";
import { useMediaQuery } from "react-responsive";
import Slider from "rc-slider";
import { BarLoader } from "react-spinners";

function CountryView() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthwiseData, setMonthwiseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [countryData, setCountryData] = useState([
    { countryName: "France", positive: 0, negative: 0, neutral: 0 },
    { countryName: "Australia", positive: 0, negative: 0, neutral: 0 },
    { countryName: "China", positive: 0, negative: 0, neutral: 0 },
    { countryName: "USA", positive: 0, negative: 0, neutral: 0 },
    { countryName: "Singapore", positive: 0, negative: 0, neutral: 0 },
    { countryName: "Canada", positive: 0, negative: 0, neutral: 0 },
    { countryName: "Japan", positive: 0, negative: 0, neutral: 0 },
    { countryName: "Nigeria", positive: 0, negative: 0, neutral: 0 },
    { countryName: "Pakistan", positive: 0, negative: 0, neutral: 0 },
    { countryName: "Russia", positive: 0, negative: 0, neutral: 0 },
    { countryName: "UAE", positive: 0, negative: 0, neutral: 0 },
  ]);

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
  const [allFlags, setAllFlags] = useState([]);
  const [allCountryData, setAllCountryData] = useState([]);

  const [clickCount, setClickCount] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });

  const handleSliderChange = (value) => {
    setSelectedMonth(value);
    // console.log("Selected Month:", months[value]);
  };

  const sliderMarks = months.reduce((acc, month, index) => {
    acc[index] = {
      style: { borderColor: "grey", height: "5%" }, // Set the style for the vertical line
      label: <p style={{ color: "grey" }}>{month}</p>, // Set the label style
    };
    return acc;
  }, {});

  const handleClick = (country) => {
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

    const foundCountry = resultArray.find(
      (item) => item.countryName === country.countryName
    );

    window.localStorage.setItem("hoveredCountry", country.countryName);
    window.localStorage.setItem("hoveredPositive", foundCountry.positive);
    window.localStorage.setItem("hoveredNegative", foundCountry.negative);
    window.localStorage.setItem("hoveredNeutral", foundCountry.neutral);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/country-detail";
  };

  useEffect(() => {
    const fetchAllFlags = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://kutniti-server.onrender.com/api/country/getallCountryArticleNumber",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const getData = await response.json();
          setIsLoading(false);
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
        setIsLoading(false);
        console.error("Error:", error);
      }
    };

    fetchAllFlags();

    const fetchAllCountries = async () => {
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

   
          const part1Data = combinedData.map((data) => {
            const monthParts = data.month.split('-');
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
         

          //----------------------------------Api data updated till here------------------------------

          //-----------------------Get data for the selectedMonth -----------------------------------------

   
          const filteredData = finalData
            .filter((item) => parseInt(item.month) === selectedMonth + 1)
            .map(({ month, ...rest }) => rest);

      

          //--------------------------Send this to countryData--------------------------------------
    
          // setCountryData(filteredData);

          setCountryData(filteredData);
          // Updating countryData with flagLogos from allFlags and filteredData

          // console.log(allFlags);

          //  console.log(mergedArray);
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllCountries();
  }, [selectedMonth]);

  // console.log(allFlags);

  // console.log(allFlags);

  useEffect(() => {
    const mergedArray = countryData
      .map((dataItem) => {
        const matchingCountry = allFlags.find(
          (countryItem) => countryItem.countryName === dataItem.countryName
        );

        if (matchingCountry) {
          return {
            countryName: dataItem.countryName,
            flagLogo: matchingCountry.flagLogo,
            positive: dataItem.positive,
            negative: dataItem.negative,
            neutral: dataItem.neutral,
          };
        }

        return null; // If no match found
      })
      .filter((item) => item !== null);

    console.log(mergedArray);

    setAllCountryData(mergedArray);
  }, [countryData, allFlags]);

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

    setCountryData(resultArray);
  };

  // console.log(countryData);

  const containerStyle = {
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover", // Adjust background sizing
    backgroundRepeat: "no-repeat", // Prevent repeating of background image
    backgroundColor: "#f2f2f2",
    width: "98vw",
    height: "100%",
    // Add other styles as needed
  };

  const sortAlphabetically = () => {
    setClickCount(!clickCount);

    let sortedData;
    if(clickCount){
       sortedData = [...allCountryData].sort((a, b) => {
        return a.countryName.localeCompare(b.countryName);
      });
    }else{
       sortedData = [...allCountryData].sort((a, b) => {
        return b.countryName.localeCompare(a.countryName);
      });
    }
    

    setAllCountryData(sortedData);
  };

  const sortDataByTotal = () => {
    const sortedData = [...allCountryData].sort((a, b) => {
      const totalA = a.positive + a.negative + a.neutral;
      const totalB = b.positive + b.negative + b.neutral;
      return totalB - totalA; // Sort in descending order
    });
    setAllCountryData(sortedData);
  };

  const sortDataByPositive = () => {
    const sortedData = [...allCountryData].sort((a, b) => {
      const totalA = a.positive;
      const totalB = b.positive;
      return totalB - totalA; // Sort in descending order
    });
    setAllCountryData(sortedData);
  };

  const sortDataByNegative = () => {
    const sortedData = [...allCountryData].sort((a, b) => {
      const totalA = a.negative;
      const totalB = b.negative;
      return totalB - totalA; // Sort in descending order
    });

    setAllCountryData(sortedData);
  };

  const sortDataByNeutral = () => {
    const sortedData = [...allCountryData].sort((a, b) => {
      const totalA = a.neutral;
      const totalB = b.neutral;
      return totalB - totalA; // Sort in descending order
    });
    setAllCountryData(sortedData);
  };

  return (
    <div id="" style={containerStyle} className="font-custom">
      <Navbar />
      {isLaptop && (
        <div>
          <div className="m-5 invisible">Hidden Text Area</div>
          <div className="flex">
            <div className="m-7  rounded-2xl border border-gray-600 w-full mt-20">
              <div className="m-5 p-5 w-full">
                <div className="flex mb-10 mr-5 ml-5 justify-between">
                  <h2 className="text-[25px]  w-1/2 font-bold mb-5 mt-5">
                    Countries ranked by their perception of India
                  </h2>
                  <div className="max-h-20 w-1/2 inline-flex rounded-2xl shadow-2xl border border-black-800 backdrop-blur-[3px] bg-opacity-0 p-0 justify-between">
                    <div className="pb-7 pt-3 px-5 w-5/6">
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
                        className="bg-black text-white text-sm rounded-3xl px-3 py-2  mr-2 w-30"
                      >
                        All Time
                      </button>
                    </div>
                  </div>
                </div>

                <div className=" bg-opacity-0 backdrop-blur-[3px] shadow-2xl rounded-xl p-10">
                  <div className="flex mb-4 justify-between">
                  
                      <div className="flex w-1/5 ">
                        <div className="font-semibold ">
                          Country
                        </div>
                        <img onClick={sortAlphabetically} src={updown} alt="" className="ml-2 cursor-pointer" />
                      </div>

                     {/* <div className="invisible">
                      aaaaaaaaaaaaaa
                     </div> */}

                      <div className="flex w-1/6 justify-center items-center">
                      
                        <h2
                          className=" font-semibold "
                        >
                          Articles Published
                        </h2>
                        <img onClick={sortDataByTotal} src={updown} alt="" className="ml-2 cursor-pointer" />
                      </div>

                   

                    <div className="flex w-1/2 pl-7">
                      <div className=" font-semibold ">Perception</div>
                      <div
                        onClick={sortDataByPositive}
                        className="cursor-pointer w-5 h-5 mt-1 bg-green-500 rounded-sm ml-5"
                      ></div>
                      <div
                        onClick={sortDataByPositive}
                        className="cursor-pointer ml-3 font-semibold"
                      >
                        Positive
                      </div>

                      <div
                        onClick={sortDataByNegative}
                        className="cursor-pointer w-5 h-5 mt-1 bg-red-500 ml-7 rounded-sm"
                      ></div>
                      <div
                        onClick={sortDataByNegative}
                        className="cursor-pointer ml-3 font-semibold"
                      >
                        Negative
                      </div>

                      <div
                        onClick={sortDataByNeutral}
                        className=" cursor-pointer w-5 h-5 mt-1 bg-yellow-300 ml-7 rounded-sm"
                      ></div>
                      <div
                        onClick={sortDataByNeutral}
                        className="cursor-pointer ml-3 font-semibold"
                      >
                        Neutral
                      </div>
                    </div>
                  </div>

                  <hr className="border-t-1 border-black w-full" />

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
                        <BarLoader color="black" width={200} />
                      </div>
                    </div>
                  )}
                  {!isLoading && (
                    <div>
                      {allCountryData.map((country, index) => (
                        <div
                          className="mt-4 mb-4 hover:cursor-pointer"
                          key={index}
                          onClick={() => handleClick(country)}
                        >
                          <div className="flex justify-between transform hover:scale-105 hover:m-2 hover:shadow-2xl  hover:rounded-lg hover:p-2 hover:transition-transform transition hover:duration-500 ">
                            <div className="flex w-1/5">
                              <div className="mb-3 rounded-lg overflow-hidden">
                                {country.flagLogo && (
                                  <img
                                    src={country.flagLogo}
                                    alt="Country Flag"
                                    className="h-10"
                                  />
                                )}
                              </div>

                              <h2 className="text-lg ml-5 font-semibold">
                                {country.countryName}
                              </h2>
                            </div>

                            <div className="w-1/6 flex justify-center items-center">
                              {country.positive +
                                country.negative +
                                country.neutral}
                            </div>

                            <div className=" w-1/2 ">
                              {country.negative === 0 &&
                              country.positive === 0 &&
                              country.neutral === 0 ? (
                                <div className="flex">
                                  <div className="invisible">t Enough Data</div>
                                  {/* <div className="invisible">Not Enough Data</div> */}
                                  <div>Not Enough Data</div>
                                </div>
                              ) : (
                                <BigSingleHorizontalBar
                                  key={country.countryName}
                                  positiveValue={country.positive}
                                  negativeValue={country.negative}
                                  neutralValue={country.neutral}
                                />
                              )}
                            </div>
                            {/* <div className="p-0 ml-20 w-auto ">Map Area</div> */}
                          </div>
                          <hr className="border-t-1 border-black w-full" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div>
          <div className="my-8 invisible">Hidden Text Area</div>
          <div className="m-1 mt-5 p-1 w-full">
            <div className=" my-1">
              <h2 className="text-xl text-gray-600 font-bold mb-5">
                Countries ranked by their perception of India
              </h2>
            </div>

            <div className="ml-1 mr-2 mb-5 w-full inline-flex rounded-2xl border border-black-800 bg-white p-0 justify-between">
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

            <div className=" items-center min-h-screen">
              <div className="flex justify-between">
                <div onClick={sortAlphabetically}>Country</div>
                <div onClick={sortDataByPositive}>Positive</div>
                <div onClick={sortDataByNegative}>Negative</div>
                <div onClick={sortDataByNeutral} className="mr-2">
                  Neutral
                </div>
              </div>
              <hr className="border-t-1 mt-3 mb-3 border-black w-full" />

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
                    <BarLoader color="black" width={100} />
                  </div>
                </div>
              )}
              {!isLoading && (
                <div>
                  {allCountryData.map((country, index) => (
                    <div className="" onClick={() => handleClick(country)}>
                      <div key={index} className="grid grid-cols-5  gap-4">
                        {country.flagLogo && (
                          <img
                            src={country.flagLogo}
                            alt="Country Flag"
                            className="w-20 h-10 mt-1"
                          />
                        )}
                        <h2 className=" mt-3">{country.countryName}</h2>
                        <div className="flex ">
                          <p className="text-sm mt-3">{country.positive}</p>
                          <MicroPieChart
                            key={country.countryName}
                            hoveredPositive={country.positive}
                            hoveredNegative={
                              country.positive +
                              country.negative +
                              country.neutral
                            }
                            fillType="positive"
                          />
                        </div>

                        <div className="flex ">
                          <p className="text-sm mt-3">{country.negative}</p>
                          <MicroPieChart
                            key={country.countryName}
                            hoveredPositive={country.negative}
                            hoveredNegative={
                              country.positive +
                              country.negative +
                              country.neutral
                            }
                            fillType="negative"
                          />
                        </div>

                        <div className="flex ">
                          <p className="text-sm mt-3">{country.neutral}</p>
                          <MicroPieChart
                            key={country.countryName}
                            hoveredPositive={country.neutral}
                            hoveredNegative={
                              country.positive +
                              country.negative +
                              country.neutral
                            }
                            fillType="neutral"
                          />
                        </div>
                      </div>
                      <hr className="border-t-1 mt-3 mb-3 border-black w-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryView;
