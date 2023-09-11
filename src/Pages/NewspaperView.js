import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/backgroundMain.jpg";
import BigSingleHorizontalBar from "../graphs/BigSingleHorizontalBar";
import MicroPieChart from "../graphs/MicroPieChart";
import { useMediaQuery } from "react-responsive";
import Slider from "rc-slider";
import { BarLoader } from "react-spinners";

function NewspaperView() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthwiseData, setMonthwiseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [newspaperData, setNewspaperData] = useState([]);

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

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });
  const [allNewspaperData, setAllNewspaperData] = useState([]);

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

  const handleClick = (newspaper) => {
    const aggregatedData = {};

    // Iterate through the monthwiseData array and accumulate data for each newspaper
    monthwiseData.forEach((data) => {
      const { newspaper_name, positive, negative, neutral, country, logo } = data;

      if (!aggregatedData[newspaper_name]) {
        aggregatedData[newspaper_name] = {
          newspaper_name,
          positive,
          negative,
          neutral,
          country,
          logo,
        };
      } else {
        aggregatedData[newspaper_name].positive += positive;
        aggregatedData[newspaper_name].negative += negative;
        aggregatedData[newspaper_name].neutral += neutral;
      }
    });

    // Convert the aggregatedData object back to an array of objects
    const resultArray = Object.values(aggregatedData);

    const foundNewspaper = resultArray.find(
      (item) => item.newspaper_name === newspaper.newspaper_name
    );

    window.localStorage.setItem("hoveredNewspaper", newspaper.newspaper_name);
    window.localStorage.setItem(
      "hoveredNewspaperPositive",
      foundNewspaper.positive
    );
    window.localStorage.setItem(
      "hoveredNewspaperNegative",
      foundNewspaper.negative
    );
    window.localStorage.setItem(
      "hoveredNewspaperNeutral",
      foundNewspaper.neutral
    );
    window.localStorage.setItem(
      "hoveredNewspaperCountry",
      foundNewspaper.country
    );
    window.localStorage.setItem(
      "hoveredNewspaperLogo",
      foundNewspaper.logo
    );

    window.dispatchEvent(new Event("storage"));
    window.location.href = "/newspaper-detail";
  };

  useEffect(() => {
    const filteredMonthlyData = monthwiseData.filter(
      (item) => item.month === selectedMonth + 1
    );

    setNewspaperData(filteredMonthlyData);
  }, [selectedMonth]);

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

    async function fetchNewspapers() {
      try {
        const response = await fetch(
          "https://kutniti-server.onrender.com/api/newspaper/getAllNewspapers"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const newArrayOfObjects = data.flatMap((newspaper) =>
          Object.entries(newspaper.articles).map(([month, stats]) => ({
            newspaper_id: newspaper.newspaper_id,
            newspaper_name: newspaper.newspaper_name,
            link: newspaper.link,
            country: newspaper.country,
            logo: newspaper.logo,
            month: monthToNumber(month), // Convert month to number (e.g., "June" to 6)
            positive: stats.Positive || 0, // Set to 0 if not present
            negative: stats.Negative || 0, // Set to 0 if not present
            neutral: stats.Neutral || 0, // Set to 0 if not present
          }))
        );

        function monthToNumber(month) {
          // Map month names to numbers
          const monthMap = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12,
          };

          return monthMap[month] || 0; // Default to 0 if month is not found
        }

        //---------Now make objects for remaining months with 0s in positive neg and neu---

        const monthlyData = [];

        // Iterate over each object in the original array
        newArrayOfObjects.forEach((item) => {
          // Iterate over 12 months
          for (let month = 1; month <= 12; month++) {
            // Check if the month already exists in the original data
            const existingMonthData = newArrayOfObjects.find(
              (x) => x.newspaper_id === item.newspaper_id && x.month === month
            );

            if (existingMonthData) {
              // If the month exists, push the existing data
              monthlyData.push(existingMonthData);
            } else {
              // If the month does not exist, create a new object with zeros
              monthlyData.push({
                ...item,
                month: month,
                positive: 0,
                negative: 0,
                neutral: 0,
              });
            }
          }
        });
        //----------------------------sTORE ALL MONTHS DATA IN monthwiseData------------------------------------
        // Remove duplicates
        const uniqueMonthlyData = monthlyData.filter((item, index, self) => {
          // Find the index of the first occurrence of the current item
          const firstIndex = self.findIndex(
            (otherItem) =>
              otherItem.newspaper_name === item.newspaper_name &&
              otherItem.month === item.month
          );

          // Keep the current item only if its index is the same as the first index found
          return index === firstIndex;
        });

        setMonthwiseData(uniqueMonthlyData);
        //---------------------------------uSE selected month to filter and store in newspaperData------------
        const filteredMonthlyData = uniqueMonthlyData.filter(
          (item) => item.month === selectedMonth + 1
        );

        setNewspaperData(filteredMonthlyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchNewspapers();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  useEffect(() => {
    const mergedArray = newspaperData
      .map((dataItem) => {
        const matchingCountry = allFlags.find(
          (countryItem) => countryItem.countryName === dataItem.country
        );

        if (matchingCountry) {
          return {
            country: dataItem.country,
            flagLogo: matchingCountry.flagLogo,
            positive: dataItem.positive,
            negative: dataItem.negative,
            neutral: dataItem.neutral,
            newspaper_name: dataItem.newspaper_name,
            newspaper_id: dataItem.newspaper_id,
            link: dataItem.link,
            logo: dataItem.logo,
            month: dataItem.month,
          };
        }

        return null; // If no match found
      })
      .filter((item) => item !== null);

    // console.log(mergedArray);

    setAllNewspaperData(mergedArray);
  }, [newspaperData, allFlags]);

  const allTimeData = () => {
    const aggregatedData = {};

    // Iterate through the monthwiseData array and accumulate data for each country
    monthwiseData.forEach((data) => {
      const { newspaper_name, positive, negative, neutral, logo, country } =
        data;

      if (!aggregatedData[newspaper_name]) {
        aggregatedData[newspaper_name] = {
          newspaper_name,
          positive,
          negative,
          neutral,
          logo,
          country,
        };
      } else {
        aggregatedData[newspaper_name].positive += positive;
        aggregatedData[newspaper_name].negative += negative;
        aggregatedData[newspaper_name].neutral += neutral;
      }
    });

    // Convert the aggregatedData object back to an array of objects
    const resultArray = Object.values(aggregatedData);

    setNewspaperData(resultArray);
  };

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

  return (
    <div id="" style={containerStyle} className="font-custom">
      <Navbar />
      {isLaptop && (
        <div>
          <div className="m-5 invisible">Hidden Text Area</div>
          <div className="flex">
            <div className="m-7  rounded-2xl border border-gray-600 w-full mt-20">
              <div className="m-5 p-5 w-full">
                <div className="flex mb-10">
                  <h2 className="text-xl font-bold mb-5 mt-5">
                    Newspapers ranked by their perception of India
                  </h2>
                  <div className="ml-5 w-1/2 inline-flex rounded-2xl shadow-2xl border border-black-800 bg-white p-0 justify-between">
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
                <div className="bg-white bg-opacity-30 shadow-2xl rounded-xl p-10">
                  <div className="flex mb-4 justify-between">
                    <div className="text-md font-bold ml-5 w-1/5">
                      Newspaper
                    </div>
                    <div className="text-lg font-bold">Country</div>
                    <div className="text-md font-bold ml-5">
                      Articles Published
                    </div>

                    <div className="flex w-1/2">
                      <div className="text-md font-bold ml-5">
                        Perception
                      </div>
                      <div className="flex">
                        <div className="w-4 h-4 mt-1 bg-green-500 ml-3 rounded-sm"></div>
                        <div className="ml-2 text-sm">Positive</div>
                        <div className="w-4 h-4 mt-1 bg-red-500 ml-3 rounded-sm"></div>
                        <div className="ml-2 text-sm">Negative</div>

                        <div className="w-4 h-4 mt-1 bg-yellow-300 ml-3  rounded-sm"></div>
                        <div className="ml-2 text-sm">Neutral</div>
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
                      {allNewspaperData.map((newspaper, index) => (
                        <div
                          className="mt-4 mb-4 hover:cursor-pointer"
                          key={index}
                          onClick={() => handleClick(newspaper)}
                        >
                          <div className="flex justify-between">
                            <div className="flex w-1/5">
                              <div className="mb-3 ml-3 mr-2 overflow-hidden">
                                {newspaper.logo && (
                                  <img
                                    src={newspaper.logo}
                                    alt="Logo"
                                    className="w-12"
                                  />
                                )}
                              </div>
                              <h2 className="text-md font-semibold">
                                {newspaper.newspaper_name}
                              </h2>
                            </div>

                            <div className="flex w-15">
                              <div className="mb-3 mr-2 overflow-hidden">
                                {newspaper.flagLogo && (
                                  <img
                                    src={newspaper.flagLogo}
                                    alt="Flag"
                                    className="w-12"
                                  />
                                )}
                              </div>
                              <h2 className="text-md font-semibold">
                                {newspaper.country}
                              </h2>
                            </div>

                            <div className=" ">
                              {newspaper.positive +
                                newspaper.negative +
                                newspaper.neutral}
                            </div>

                            <div className=" w-1/2">
                              {newspaper.negative === 0 &&
                              newspaper.positive === 0 &&
                              newspaper.neutral === 0 ? (
                                <div className="flex">
                                  <div className="invisible">t Enough Data</div>
                                  {/* <div className="invisible">Not Enough Data</div> */}
                                  <div>Not Enough Data</div>
                                </div>
                              ) : (
                                <BigSingleHorizontalBar
                                  positiveValue={newspaper.positive}
                                  negativeValue={newspaper.negative}
                                  neutralValue={newspaper.neutral}
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
                Newspapers ranked by their perception of India
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
                <div>Newspaper</div>
                <div>Positive</div>
                <div>Negative</div>
                <div className="mr-2">Neutral</div>
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
                  {allNewspaperData.map((newspaper, index) => (
                    <div className="" onClick={() => handleClick(newspaper)}>
                      <div key={index} className="grid grid-cols-4  gap-4">
                        {newspaper.logo && (
                          <img
                            src={newspaper.logo}
                            alt="Logo"
                            className="w-20 h-10 mt-1"
                          />
                        )}
                        {/* <h2 className=" mt-3">{newspaper.newspaper_name}</h2>
                         */}

                        <div className="flex ">
                          <p className="text-sm mt-3">{newspaper.positive}</p>
                          <MicroPieChart
                            hoveredPositive={newspaper.positive}
                            hoveredNegative={
                              newspaper.positive +
                              newspaper.negative +
                              newspaper.neutral
                            }
                            fillType="positive"
                          />
                        </div>

                        <div className="flex ">
                          <p className="text-sm mt-3">{newspaper.negative}</p>
                          <MicroPieChart
                            hoveredPositive={newspaper.negative}
                            hoveredNegative={
                              newspaper.positive +
                              newspaper.negative +
                              newspaper.neutral
                            }
                            fillType="negative"
                          />
                        </div>

                        <div className="flex ">
                          <p className="text-sm mt-3">{newspaper.neutral}</p>
                          <MicroPieChart
                            hoveredPositive={newspaper.neutral}
                            hoveredNegative={
                              newspaper.positive +
                              newspaper.negative +
                              newspaper.neutral
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

export default NewspaperView;
