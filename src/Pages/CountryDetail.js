import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/Staff.css";
import PieChartComponent from "../graphs/PieChartComponent";
import html2canvas from "html2canvas";
// import backgroundImage from "../assets/background.png";

import CountryDsipoCard from "../components/CountryDsipoCard";
import CountryEcoCard from "../components/CountryEcoCard";

import share from "../assets/shareButton.png";
import backgroundImage from "../assets/backgroundMain.jpg";

import BarChartComponent from "../graphs/BarChartComponent";
import BigSingleHorizontalBar from "../graphs/BigSingleHorizontalBar";
import { useMediaQuery } from "react-responsive";
import SmallPieChart from "../graphs/SmallPieChart";
import MicroPieChart from "../graphs/MicroPieChart";

import bricsImg from "../assets/countryStats/brics.png";
import fiveEyesImg from "../assets/countryStats/fiveEyes.png";
import nuclearImg from "../assets/countryStats/nuclear.png";
import qsdImg from "../assets/countryStats/qsd.png";
import unscImg from "../assets/countryStats/unsc.png";
import borDispImg from "../assets/countryStats/borDisp.png";
import CountryImportCard from "../components/CountryImportCard";
import CountryExportCard from "../components/CountryExportCard";
import CountryDefenseCard from "../components/CountryDefenseCard";
import CountryTourismCard from "../components/CountryTourismCard";

function CountryDetails() {
  // const [monthwiseData, setMonthwiseData] = useState([]);
  const [dataForBar, setDataForBar] = useState([]);

  const [newspaperData, setNewspaperData] = useState([]);

  const [countryData, setCountryData] = useState({
    name: "",
    all: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [flagObjectSelected, setFlagObjectSelected] = useState("");
  const [countryStats, setCountryStats] = useState([]);

  const [brics, setBrics] = useState(false);
  const [fiveEyes, setFiveEyes] = useState(false);
  const [unsc, setUnsc] = useState(false);
  const [qsd, setQsd] = useState(false);
  const [nuclear, setNuclear] = useState(false);
  const [borDisp, setBorDisp] = useState(false);

  const [ecoRank, setEcoRank] = useState();
  const [diaspRank, setDiaspRank] = useState();
  const [importRank, setImportRank] = useState();
  const [exportRank, setExportRank] = useState();
  const [defenseRank, srtDefenseRank] = useState();
  const [tourismRank, setTourismRank] = useState();

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define the mobile breakpoint
  const isLaptop = useMediaQuery({ minWidth: 780 });

  //----------------------------IN THIS USE EFFECT GET COUNTRY NAME FROM LOCAL STORAGE AND GET DATA ACCORDINGLY-----------------------------

  let tempName;

  useEffect(() => {
    tempName = localStorage.getItem("hoveredCountry");
    const tempPositive = localStorage.getItem("hoveredPositive");
    const tempNegative = localStorage.getItem("hoveredNegative");
    const tempNeutral = localStorage.getItem("hoveredNeutral");

    const getStats = async () => {
      try {
        const res = await fetch(
          "https://sheet.best/api/sheets/4a6a3f85-83ed-4537-886d-02d28e3b5696"
        );
        const data = await res.json();
        setCountryStats(Object.keys(data).map((key) => data[key]));
      } catch (error) {
        console.log(error);
      }
    };
    getStats();

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

        const aggregatedData = {};

        uniqueMonthlyData.forEach((data) => {
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

        // ----------------------------Filter only the newspapers with country as tempName---------------------

        if (tempName === "United States") {
          tempName = "USA";
        }

        const filteredArray = resultArray.filter(
          (obj) => obj.country === tempName
        );

        if (tempName === "USA") {
          tempName = "United States";
        }

        setNewspaperData(filteredArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchNewspapers();

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

          // console.log(uniqueCountries);
          if (tempName === "United States") {
            tempName = "USA";
          }

          const matchedCountry = uniqueCountries.find(
            (country) => country.countryName === tempName
          );
          setFlagObjectSelected(matchedCountry);

          if (tempName === "USA") {
            tempName = "United States";
          }
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllFlags();

    setCountryData({
      name: tempName,
      positive: tempPositive,
      negative: tempNegative,
      neutral: tempNeutral,
    });

    const fetchAllCountries = async () => {
      try {
        const requestData = {
          countryName: tempName,
        };

        const response = await fetch(
          "https://kutniti-server.onrender.com/api/country/getoneCountryArticlesMonth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
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

          // setMonthwiseData(newData);

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

          const transformedArray = newData.map((item) => {
            const { month, positive, negative, neutral } = item;
            const name = months[Number(month) - 1]; // Adjusting for 0-based index

            return {
              name,
              pos: positive,
              neg: negative,
              neu: neutral,
              max: 0,
            };
          });

          // console.log(transformedArray);

          setDataForBar(transformedArray);

          //----------------------------------Api data updated till here------------------------------

          // console.log(newArray);
          // setData(newArray);
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllCountries();
  }, [tempName]);

  useEffect(() => {
    //--------Map through countryStats looking for item.brics, item.about etc  and if tempName matches update its state-----------------------------------

    const tempContName = localStorage.getItem("hoveredCountry");

    countryStats.forEach((country) => {
      if (country.unsc === tempContName) {
        setUnsc(true);
      }
      if (country.brics === tempContName) {
        setBrics(true);
      }
      if (country.nuclear === tempContName) {
        setNuclear(true);
      }
      if (country.fiveEyes === tempContName) {
        setFiveEyes(true);
      }
      if (country.qsd === tempContName) {
        setQsd(true);
      }
      if (country.borDisp === tempContName) {
        setBorDisp(true);
      }
    });

    // Map through countryStats looking for tempContName attribute in each object and extract 1st object's value as ...

    let i = 0;
    countryStats.forEach((item) => {
      if (i == 0) {
        setEcoRank(item[tempContName]);
      }
      if (i == 1) {
        setDiaspRank(item[tempContName]);
      }
      if (i == 2) {
        setImportRank(item[tempContName]);
      }
      if (i == 3) {
        setExportRank(item[tempContName]);
      }
      if (i == 4) {
        srtDefenseRank(item[tempContName]);
      }
      if (i == 5) {
        setTourismRank(item[tempContName]);
      }
      i++;
    });
  }, [countryStats]);

  // console.log(diaspRank, ecoRank);

  // console.log(unsc, qsd, brics, fiveEyes, nuclear);

  //-----------------------------------CHANGE SHARE URL TO WEBSITE HOMEPAGE-----------------------------

  const shareText = "Check out this awesome pie chart!"; // Change as needed
  const shareUrl = encodeURIComponent("http://localhost:3000/country-view"); // Get the current URL

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
    // Add other styles as needed
  };

  // const chartData = [
  // {
  //   name: 'JAN',
  //   neg: 40,
  //   pos: 24,
  //   neu: 14,
  //   grey: 0,
  // },
  //   {
  //     name: 'FEB',
  //     neg: 20,
  //     pos: 44,
  //     neu: 24,
  //     grey: 0,
  //   },
  //   {
  //     name: 'MAR',
  //     neg: 30,
  //     pos: 24,
  //     neu: 4,
  //     grey: 0,
  //   },
  //   {
  //     name: 'APR',
  //     neg: 50,
  //     pos: 14,
  //     neu: 24,
  //     grey: 0,
  //   },
  //   {
  //     name: 'MAY',
  //     neg: 30,
  //     pos: 34,
  //     neu: 24,
  //     grey: 0,
  //   },
  //   {
  //     name: 'JUNE',
  //     neg: 60,
  //     pos: 24,
  //     neu: 14,
  //     grey: 0,
  //   },
  //   {
  //     name: 'JULY',
  //     neg: 10,
  //     pos: 54,
  //     neu: 14,
  //     grey: 0,
  //   },
  //   {
  //     name: 'AUG',
  //     neg: 60,
  //     pos: 24,
  //     neu: 14,
  //     grey: 0,
  //   },
  //   {
  //     name: 'SEPT',
  //     neg: 0,
  //     pos: 0,
  //     neu: 0,
  //     grey: 0,
  //   },
  //   {
  //     name: 'OCT',
  //     neg: 0,
  //     pos: 0,
  //     neu: 0,
  //     grey: 0,
  //   },
  //   {
  //     name: 'NOV',
  //     neg: 0,
  //     pos: 0,
  //     neu: 0,
  //     grey: 0,
  //   },
  //   {
  //     name: 'DEC',
  //     neg: 0,
  //     pos: 0,
  //     neu: 0,
  //     grey: 0,
  //   },
  // ];

  const colors = [
    "bg-red-600",
    "bg-orange-400",
    "bg-yellow-300",
    "bg-green-300",
    "bg-green-600",
  ];
  const texts = ["0%", "25%", "50%", "75%", "100%"];

  return (
    <div style={containerStyle} className="w-full font-custom">
      <Navbar />
      <div className="flex ">
        <div className="">
          <h1 className="font-bold text-3xl p-5 invisible">
            Providing Free spacing
          </h1>

          <div className=" lg:m-7 lg:p-5 m-2 p-2 rounded-2xl border border-gray-600 ">
            <div className="">
              <div className="lg:w-full bg-opacity-40 bg-white flex justify-between items-center rounded-xl shadow-2xl p-1 mb-5">
                <div className="flex m-1">
                  <div className="rounded-lg overflow-hidden ">
                    {flagObjectSelected && (
                      <img
                        src={flagObjectSelected.flagLogo}
                        alt="Country Flag"
                        className=" h-10 rounded-lg"
                      />
                    )}
                  </div>

                  <div className="text-xl ml-2 ">
                    <div className="text-2xl">{countryData.name}</div>
                  </div>
                </div>

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

            <div className="bg-opacity-40 bg-white items-center rounded-xl shadow-lg p-2 h-30">
              <div className="text-2xl">
                <p className="mx-2 mt-2 mb-4">
                  Why {countryData.name} matters to India
                </p>
                <div className="flex justify-between">
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
                    {diaspRank !== 0 && (
                      <div className="">
                        <CountryDsipoCard
                          firstValue={diaspRank}
                          secondValue="Indian Dispora in the World"
                        />
                      </div>
                    )}

                    {ecoRank !== 0 && (
                      <div className="">
                        <CountryEcoCard
                          firstValue={ecoRank}
                          secondValue="Economic Power in the World"
                        />
                      </div>
                    )}

                    {importRank !== 0 && (
                      <div className="">
                        <CountryImportCard
                          firstValue={importRank}
                          secondValue="Import partner of India"
                        />
                      </div>
                    )}

                    {exportRank != 0 && (
                      <div className="">
                        <CountryExportCard
                          firstValue={exportRank}
                          secondValue="Export partner of India"
                        />
                      </div>
                    )}

                    {defenseRank !== 0 && (
                      <div className="">
                        <CountryDefenseCard
                          firstValue={defenseRank}
                          secondValue="Defence provider to India"
                        />
                      </div>
                    )}

                    {tourismRank != 0 && (
                      <div className="">
                        <CountryTourismCard
                          firstValue={tourismRank}
                          secondValue="Nation visiting India for tourism"
                        />
                      </div>
                    )}

                    {brics && (
                      <div className="">
                        <img
                          src={bricsImg}
                          alt="Relation "
                          className=" rounded-lg"
                        />
                      </div>
                    )}

                    {qsd && (
                      <div className="">
                        <img
                          src={qsdImg}
                          alt="Relation "
                          className=" rounded-lg"
                        />
                      </div>
                    )}

                    {unsc && (
                      <div className="">
                        <img
                          src={unscImg}
                          alt="Relation "
                          className=" rounded-lg"
                        />
                      </div>
                    )}

                    {nuclear && (
                      <div className="">
                        <img
                          src={nuclearImg}
                          alt="Relation "
                          className=" rounded-lg"
                        />
                      </div>
                    )}

                    {borDisp && (
                      <div className="">
                        <img
                          src={borDispImg}
                          alt="Relation "
                          className=" rounded-lg"
                        />
                      </div>
                    )}

                    {fiveEyes && (
                      <div className="">
                        <img
                          src={fiveEyesImg}
                          alt="Relation "
                          className=" rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="h-12 bg-gray-300 w-px ml-5 mr-50"></div> */}

              {/* <div className="text-xl ml-10 mr-50">
                  <div className="text-sm text-gray-400">Continent</div>
                  <div className="text-2xl">Asia</div>
                </div> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* 1 */}
              <div>
                <div className="bg-opacity-40 bg-white items-center shadow-2xl rounded-2xl max-w-[500px] max-h-[400px] justify-between flex mt-3 mb-3 r-0">
                  <div className="pb-2 ">
                    <p className="flex justify-center text-2xl mt-5 ml-2 lg:ml-5 ">
                      Sentiment of {countryData.name} towards India
                    </p>
                    {isMobile && (
                      <div className="flex">
                        <SmallPieChart
                          hoveredPositive={10}
                          hoveredNegative={20}
                          hoveredNeutral={5}
                        />
                        <div>
                          <p className="text-green-500 m-3">
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
                    )}
                    {isLaptop && (
                      <div className="ml-10 ">
                        <div className="flex justify-center">
                          <PieChartComponent
                            hoveredPositive={countryData.positive}
                            hoveredNegative={countryData.negative}
                            hoveredNeutral={countryData.neutral}
                          />
                        </div>
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
                    )}
                  </div>
                </div>

                <div>
                  {isMobile && (
                    <div className="p-2 m-2 flex bg-opacity-40 bg-white shadow-md rounded-lg max-w-[500px]">
                      <p className="text-gray-700 mx-4 ">
                        Articles Published by {countryData.name}
                      </p>

                      <div className="w-px h-6 bg-gray-800 "></div>
                      <p className="text-gray-700 text-base mx-4">
                        {parseInt(countryData.positive) +
                          parseInt(countryData.negative) +
                          parseInt(countryData.neutral)}
                      </p>
                    </div>
                  )}
                  {isLaptop && (
                    <div className="bg-opacity-40 p-2 mr-2 mb-2 mt-2 flex bg-white shadow-md rounded-lg max-w-[500px]">
                      <p className="text-gray-700 mx-8 ">
                        Articles Published by {countryData.name}
                      </p>

                      <div className="w-px h-6 bg-gray-800 mx-8"></div>
                      <p className="text-gray-700 text-base mx-8">
                        {parseInt(countryData.positive) +
                          parseInt(countryData.negative) +
                          parseInt(countryData.neutral)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 2 */}

              <div className="w-[340px] mt-5 lg:w-[550px]">
                <div className="bg-white bg-opacity-40 m-auto shadow-2xl rounded-3xl w-full h-1000 overflow-x-auto">
                  <BarChartComponent chartData={dataForBar} />
                </div>
              </div>
            </div>

            <div className="flex">
              {isLaptop && (
                <div className="m-10 p-5 w-full">
                  <div className=" my-1">
                    <h2 className="text-2xl font-bold mb-5  ">
                      Most Read Newspapers of {countryData.name}
                    </h2>
                  </div>

                  <div className="flex mb-4 justify-between">
                    <div className="text-md font-bold ml-5 w-1/5">
                      Newspaper
                    </div>

                    <div className="text-md font-bold ml-5">
                      Articles Published
                    </div>

                    <div className="flex w-1/2">
                      <div className="text-md font-bold ml-5">
                        Perception of
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

                  {newspaperData && (
                    <div className=" items-center">
                      {newspaperData.map((newspaper, index) => (
                        <div className="mt-4 mb-4">
                          <div key={index} className="flex justify-between">
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

                            <p>
                              {newspaper.positive +
                                newspaper.negative +
                                newspaper.neutral}
                            </p>

                            <div className="w-1/2">
                              <BigSingleHorizontalBar
                                positiveValue={newspaper.positive}
                                negativeValue={newspaper.negative}
                                neutralValue={newspaper.neutral}
                              />
                              {/* <SingleHorizontalBar
                              positiveValue={10}
                              negativeValue={10}
                              neutralValue={10}
                            /> */}
                            </div>
                          </div>
                          <hr className="border-t-2 border-black w-full" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {isMobile && (
                <div className="m-1 mt-5 p-1 w-full">
                  <div className=" my-1">
                    <h2 className="text-2xl font-bold mb-5">
                      Most Read Newspapers of {countryData.name}
                    </h2>
                  </div>
                  {newspaperData && (
                    <div className=" items-center min-h-screen">
                      {newspaperData.map((newspaper, index) => (
                        <div className="">
                          <div key={index} className="grid grid-cols-4  gap-4">

                            <div className="mb-3 ml-3 mr-2 overflow-hidden">
                              {newspaper.logo && (
                                <img
                                  src={newspaper.logo}
                                  alt="Logo"
                                  className="w-12"
                                />
                              )}
                            </div>

                            <div className="flex ">
                              <p className="text-lg mt-2">57</p>
                              <MicroPieChart
                                hoveredPositive={10}
                                hoveredNegative={30}
                                fillType="positive"
                              />
                            </div>

                            <div className="flex ">
                              <p className="text-lg mt-2">57</p>
                              <MicroPieChart
                                hoveredPositive={10}
                                hoveredNegative={30}
                                fillType="negative"
                              />
                            </div>

                            <div className="flex ">
                              <p className="text-lg mt-2">57</p>
                              <MicroPieChart
                                hoveredPositive={10}
                                hoveredNegative={30}
                                fillType="neutral"
                              />
                            </div>
                          </div>
                          <hr className="border-t-2 border-black w-full" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
