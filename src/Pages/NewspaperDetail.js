import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/Staff.css";
import PieChartComponent from "../graphs/PieChartComponent";
import html2canvas from "html2canvas";
// import backgroundImage from "../assets/background.png";

// import NewspaperDsipoCard from "../components/NewspaperDsipoCard"
// import NewspaperEcoCard from "../components/NewspaperEcoCard"

import share from "../assets/shareButton.png";
import cardImage from "../assets/sampleCardImage.png";
import backgroundImage from "../assets/backgroundMain.jpg";

import BarChartComponent from "../graphs/BarChartComponent";
import BigSingleHorizontalBar from "../graphs/BigSingleHorizontalBar";
import { useMediaQuery } from "react-responsive";
import SmallPieChart from "../graphs/SmallPieChart";
import MicroPieChart from "../graphs/MicroPieChart";
import NewspaperCountryCard from "../components/NewspaperCountryCard";

// import bricsImg from "../assets/newspaperStats/brics.png";
// import fiveEyesImg from "../assets/newspaperStats/fiveEyes.png";
// import nuclearImg from "../assets/newspaperStats/nuclear.png";
// import qsdImg from "../assets/newspaperStats/qsd.png";
// import unscImg from "../assets/newspaperStats/unsc.png";
// import borDispImg from "../assets/newspaperStats/borDisp.png";
// import NewspaperImportCard from "../components/NewspaperImportCard";
// import NewspaperExportCard from "../components/NewspaperExportCard";
// import NewspaperDefenseCard from "../components/NewspaperDefenseCard";
// import NewspaperTourismCard from "../components/NewspaperTourismCard";

function NewspaperDetails() {
  const [monthwiseData, setMonthwiseData] = useState([]);
  const [dataForBar, setDataForBar] = useState([]);

  const newspaperArticles = [
    {
      image: "image-url-1.jpg",
      title: "Title 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "2023-08-25",
    },
    {
      image: "image-url-2.jpg",
      title: "Title 2",
      content:
        "Praesent commodo quam id libero maximus luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "2023-08-26",
    },
    {
      image: "image-url-1.jpg",
      title: "Title 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "2023-08-25",
    },
    {
      image: "image-url-2.jpg",
      title: "Title 2",
      content:
        "Praesent commodo quam id libero maximus luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "2023-08-26",
    },
    {
      image: "image-url-1.jpg",
      title: "Title 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "2023-08-25",
    },
    {
      image: "image-url-2.jpg",
      title: "Title 2",
      content:
        "Praesent commodo quam id libero maximus luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "2023-08-26",
    },
  ];

  const [newspaperData, setNewspaperData] = useState({
    name: "",
    all: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [flagObjectSelected, setFlagObjectSelected] = useState("");
  const [newspaperStats, setNewspaperStats] = useState([]);

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
    tempName = localStorage.getItem("hoveredNewspaper");
    const tempPositive = localStorage.getItem("hoveredNewspaperPositive");
    const tempNegative = localStorage.getItem("hoveredNewspaperNegative");
    const tempNeutral = localStorage.getItem("hoveredNewspaperNeutral");
    const tempNewsCountry = localStorage.getItem("hoveredNewspaperCountry");
    const tempNewsLogo = localStorage.getItem("hoveredNewspaperLogo");
    


    // const getStats = async () => {
    //   try {
    //     const res = await fetch(
    //       "https://sheet.best/api/sheets/4a6a3f85-83ed-4537-886d-02d28e3b5696"
    //     );
    //     const data = await res.json();
    //     setNewspaperStats(Object.keys(data).map((key) => data[key]));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getStats();

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
          if (tempNewsCountry === "United States") {
            tempNewsCountry = "USA";
          }

          const matchedCountry = uniqueCountries.find(
            (country) => country.countryName === tempNewsCountry
          );
          setFlagObjectSelected(matchedCountry);

          if (tempNewsCountry === "USA") {
            tempNewsCountry = "United States";
          }
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllFlags();

    setNewspaperData({
      name: tempName,
      positive: tempPositive,
      negative: tempNegative,
      neutral: tempNeutral,
      country: tempNewsCountry, 
      logo: tempNewsLogo
    });

    const fetchAllCountries = async () => {
      try {
        const requestData = {
          newspaperName: tempName,
        };
  
        const response = await fetch(
          "https://kutniti-server.onrender.com/api/newspaper/getAllDataForNewspaper",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );
  
        if (response.ok) {
          const responseData = await response.json();

          

          function generateMonthlyData() {
            const months = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
          
            const monthlyData = months.map((month) => {
              const monthInfo = responseData.articles[month];
          
              return {
                name: month,
                neg: (monthInfo && monthInfo.Negative) ? monthInfo.Negative : 0,
                pos: (monthInfo && monthInfo.Positive) ? monthInfo.Positive : 0,
                neu: (monthInfo && monthInfo.Neutral) ? monthInfo.Neutral : 0,
                grey: 0,
              };
            });
          
            return monthlyData;
          }

          const monthlyData = generateMonthlyData();

          const shortenedMonthlyData = monthlyData.map((month) => ({
            ...month,
            name: month.name.slice(0, 3), // Shorten the month name to the first 3 characters
          }));
         
          setDataForBar(shortenedMonthlyData);

        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllCountries();
  }, [tempName]);


  console.log(monthwiseData);

  useEffect(() => {
    //--------Map through newspaperStats looking for item.brics, item.about etc  and if tempName matches update its state-----------------------------------

    const tempContName = localStorage.getItem("hoveredNewspaper");

    newspaperStats.forEach((newspaper) => {
      if (newspaper.unsc === tempContName) {
        setUnsc(true);
      }
      if (newspaper.brics === tempContName) {
        setBrics(true);
      }
      if (newspaper.nuclear === tempContName) {
        setNuclear(true);
      }
      if (newspaper.fiveEyes === tempContName) {
        setFiveEyes(true);
      }
      if (newspaper.qsd === tempContName) {
        setQsd(true);
      }
      if (newspaper.borDisp === tempContName) {
        setBorDisp(true);
      }
    });

    // Map through newspaperStats looking for tempContName attribute in each object and extract 1st object's value as ...

    let i = 0;
    newspaperStats.forEach((item) => {
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
  }, [newspaperStats]);

  // console.log(diaspRank, ecoRank);

  // console.log(unsc, qsd, brics, fiveEyes, nuclear);

  //-----------------------------------CHANGE SHARE URL TO WEBSITE HOMEPAGE-----------------------------

  const shareText = "Check out this awesome pie chart!"; // Change as needed
  const shareUrl = encodeURIComponent("http://localhost:3000/newspaper-view"); // Get the current URL

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
  //   {
  //     name: 'JAN',
  //     neg: 40,
  //     pos: 24,
  //     neu: 14,
  //     grey: 0,
  //   },
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

  console.log(newspaperData);

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
              <div className="lg:w-full bg-opacity-0 backdrop-blur-[3px] flex justify-between items-center rounded-xl shadow-2xl p-1 mb-5">
                <div className="flex m-1">
                  <div className="rounded-lg overflow-hidden ">
                    {newspaperData.logo && (
                      <img
                        src={newspaperData.logo}
                        alt="Newspaper Logo"
                        className=" h-10 rounded-lg"
                      />
                    )}
                  </div>

                  <div className="text-xl ml-2 ">
                    <div className="text-2xl">{newspaperData.name}</div>
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

            <div className="bg-opacity-0 backdrop-blur-[3px] items-center rounded-xl shadow-lg p-2 h-30">
              <div className="text-2xl">
                <p className="mx-2 mt-2 mb-4">
                  Why {newspaperData.name} matters to India
                </p>
                <div className="flex justify-between">

                  {/* <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
                    {diaspRank !== 0 && (
                      <div className="">
                        <NewspaperDsipoCard
                          firstValue={diaspRank}
                          secondValue="Indian Dispora in the World"
                        />
                      </div>
                    )}

                    {ecoRank !== 0 && (
                      <div className="">
                        <NewspaperEcoCard
                          firstValue={ecoRank}
                          secondValue="Economic Power in the World"
                        />
                      </div>
                    )}

                    {importRank !== 0 && (
                      <div className="">
                        <NewspaperImportCard
                          firstValue={importRank}
                          secondValue="Import partner of India"
                        />
                      </div>
                    )}

                    {exportRank != 0 && (
                      <div className="">
                        <NewspaperExportCard
                          firstValue={exportRank}
                          secondValue="Export partner of India"
                        />
                      </div>
                    )}

                    {defenseRank !== 0 && (
                      <div className="">
                        <NewspaperDefenseCard
                          firstValue={defenseRank}
                          secondValue="Defence provider to India"
                        />
                      </div>
                    )}

                    {tourismRank != 0 && (
                      <div className="">
                        <NewspaperTourismCard
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
                  </div> */}
                  {flagObjectSelected && (
                    <div>
                    <NewspaperCountryCard 
                      firstValue={flagObjectSelected.flagLogo}
                      secondValue={newspaperData.country}
                    />
                    </div>
                    )}

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
                <div className="bg-opacity-0 backdrop-blur-[3px] items-center shadow-2xl rounded-2xl max-w-[500px] max-h-[400px] justify-between flex mt-3 mb-3 r-0">
                  <div className="pb-2 ">
                    <p className="flex justify-center text-2xl mt-5 ml-2 lg:ml-5 ">
                      Sentiment of {newspaperData.name} towards India
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
                            Positive: {newspaperData.positive}
                          </p>
                          <p className="text-red-500 m-3">
                            Negative: {newspaperData.negative}
                          </p>
                          <p className="text-yellow-300 m-3">
                            Neutral: {newspaperData.neutral}
                          </p>
                        </div>
                      </div>
                    )}
                    {isLaptop && (
                      <div className="ml-10 ">
                        <div className="flex justify-center">
                          <PieChartComponent
                            hoveredPositive={newspaperData.positive}
                            hoveredNegative={newspaperData.negative}
                            hoveredNeutral={newspaperData.neutral}
                          />
                        </div>
                        <div className="flex">
                          <p className="text-green-500 ml-10 m-3">
                            Positive: {newspaperData.positive}
                          </p>
                          <p className="text-red-500 m-3">
                            Negative: {newspaperData.negative}
                          </p>
                          <p className="text-yellow-300 m-3">
                            Neutral: {newspaperData.neutral}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {isMobile && (
                    <div className="p-2 m-2 flex bg-opacity-0 backdrop-blur-[3px] shadow-md rounded-lg max-w-[500px]">
                      <p className="text-gray-700 mx-4 ">
                        Articles Published by {newspaperData.name}
                      </p>

                      <div className="w-px h-6 bg-gray-800 "></div>
                      <p className="text-gray-700 text-base mx-4">
                        {parseInt(newspaperData.positive) +
                          parseInt(newspaperData.negative) +
                          parseInt(newspaperData.neutral)}
                      </p>
                    </div>
                  )}
                  {isLaptop && (
                    <div className="bg-opacity-0 p-2 mr-2 mb-2 mt-2 flex backdrop-blur-[3px] shadow-md rounded-lg max-w-[500px]">
                      <p className="text-gray-700 mx-8 ">
                        Articles Published by {newspaperData.name}
                      </p>

                      <div className="w-px h-6 bg-gray-800 mx-8"></div>
                      <p className="text-gray-700 text-base mx-8">
                        {parseInt(newspaperData.positive) +
                          parseInt(newspaperData.negative) +
                          parseInt(newspaperData.neutral)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 2 */}

              <div className="w-[340px] mt-5 lg:w-[550px]">
                <div className="backdrop-blur-[3px] bg-opacity-0 m-auto shadow-2xl rounded-3xl w-full h-1000 overflow-x-auto">
                  <BarChartComponent chartData={dataForBar} />
                </div>
              </div>
            </div>

            {isLaptop && (
              <div className="flex bg-opacity-0 backdrop-blur-[3px] shadow-2xl">
                <div className="mr-5 mb-5 mt-5 p-2 w-full">
                  <div className=" my-1">
                    <h2 className="text-xl font-bold mb-5  ">
                      Recent Articles by {newspaperData.name}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2  gap-2">
                    {newspaperArticles.map((item, index) => (
                      <div
                        key={index}
                        className={`w-auto m-2 p-3 border-2 ${
                          index % 3 === 0
                            ? "border-red-500"
                            : index % 3 === 1
                            ? "border-yellow-500"
                            : "border-green-500"
                        }`}
                      >
                        <div className="flex">
                          {/* <img src={item.image} alt={`Image ${index}`} className="w-32 h-32 object-cover float-left mr-4" /> */}
                          <img
                            src={cardImage}
                            alt="Card "
                            className="w-40 ml-2 mr-5 rounded-lg"
                          />

                          <div className="float-left">
                            <h2 className="text-lg font-bold mb-2">
                              {item.title}
                            </h2>
                            <p className="mb-2">
                              {item.content.slice(0, 100)}...
                            </p>
                            <p className="text-gray-600">{item.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isMobile && (
              <div className="flex bg-opacity-0 backdrop-blur-[3px] shadow-2xl">
                <div className=" mb-5 mt-5 p-1 w-full">
                  <div className=" my-1">
                    <h2 className="text-xl font-bold mb-5  ">
                      Recent Articles by {newspaperData.name}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1">
                    {newspaperArticles.map((item, index) => (
                      <div
                        key={index}
                        className={`w-auto m-1 p-1 border-2 ${
                          index % 3 === 0
                            ? "border-red-500"
                            : index % 3 === 1
                            ? "border-yellow-500"
                            : "border-green-500"
                        }`}
                      >
                        <div className="flex">
                          <img
                            src={cardImage}
                            alt="Card "
                            className="w-1/3 mt-2 mb-2 ml-2 mr-2 rounded-lg"
                          />

                          <div className="float-left">
                            <h2 className="text-md font-bold mb-2">
                              {item.title}
                            </h2>
                            <p className="mb-2">
                              {item.content.slice(0, 50)}...
                            </p>
                            <p className="text-gray-600 text-md">{item.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewspaperDetails;
