import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PieChart, Pie, Sector } from "recharts";
import flagImg from "../assets/flag.jpeg";
import mapImg from "../assets/map.png";
import PieChartComponent from "../graphs/PieChartComponent";
import PieChartSimple from "../graphs/PieChartSimple";
import locationImg from "../assets/location.webp";
import backgroundImage from "../assets/backgroundMain.jpg";
import SingleHorizontalBar from "../graphs/SingleHorizontalBar";
import BigSingleHorizontalBar from "../graphs/BigSingleHorizontalBar";
import Slider from "rc-slider";

function CountryView() {
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthwiseData, setMonthwiseData] = useState([]);
  const [countryFilter, setcountryFilter] = useState({});
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [lastHovered, setLastHovered] = useState(null);
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

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    // console.log(newMonth);
  };

  const handleSliderChange = (value) => {
    setSelectedMonth(value);
    // console.log("Selected Month:", months[value]);
  };
  const handleCountryHover = (country) => {
    setHoveredCountry(country);
    setLastHovered(country);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/apis/country_search/",
        countryFilter
      );
      setCountryData(response.data);
      // console.log(countryData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data from server");
    }
  };

  const handleChange = (event) => {
    setcountryFilter({
      ...countryFilter,
      [event.target.name]: event.target.value,
    });
  };

  const sliderMarks = months.reduce((acc, month, index) => {
    acc[index] = {
      style: { borderColor: "grey", height: "5%" }, // Set the style for the vertical line
      label: <p style={{ color: "grey" }}>{month}</p>, // Set the label style
    };
    return acc;
  }, {});

  const handleClick = (country) => {
    console.log(country);

    window.localStorage.setItem("hoveredCountry", country.name);
    window.localStorage.setItem("hoveredPositive", country.positive);
    window.localStorage.setItem("hoveredNegative", country.negative);
    window.localStorage.setItem("hoveredNeutral", country.neutral);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "http://localhost:3000/country-detail";
  };

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const response = await fetch(
          "http://65.2.183.51:8000/api/country/getallCountryArticlesMonth",
          {
            method: "POST",
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

          //----------------------------------Api data updated till here------------------------------

          //-----------------------Get data for the selectedMonth -----------------------------------------

          // console.log(newData);
          // console.log(selectedMonth);
          const filteredData = newData
            .filter((item) => parseInt(item.month) === selectedMonth + 1)
            .map(({ month, ...rest }) => rest);

          // console.log(filteredData);

          //--------------------------Send this to countryData--------------------------------------
          setCountryData(filteredData);
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllCountries();
  }, [selectedMonth]);




  console.log(countryData);

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
    <div id="" style={containerStyle}>
      <Navbar />
      <div className="m-5 invisible">Hidden Text Area</div>
      <div className="flex">
        <div className="m-7  rounded-2xl border border-gray-600 w-full mt-20">
          <div className="m-5 p-5 w-full">
            <div className="flex mb-10">
              <h2 className="text-2xl font-bold mb-5">
                Countries ranked by their perception of India
              </h2>
              <div className="ml-5 w-1/2 inline-flex rounded-3xl border border-black-800 bg-white p-0 justify-between">
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
                  <button className="bg-black text-white rounded-3xl px-3 py-2 mt-3 mr-2 w-30">
                    All Time
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-2xl rounded-xl p-10">
              {countryData.map((country, index) => (
                <div className="mt-4 mb-4" key={index} onClick={() => handleClick(country)}>
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold w-20">
                      {country.countryName}
                    </h2>
                    <div className=" ">Data</div>

                    <div className=" ">
                      {country.negative === 0 &&
                      country.positive === 0 &&
                      country.neutral === 0 ? (
                        <div className="flex">
                        <div className="invisible">t Enough Data</div>
                        <div className="invisible">Not Enough Data</div>
                        <div>Not Enough Data</div>
                        <div className="invisible">Not Enough Data</div>
                        <div className="invisible">Not Enough Data</div>
                        </div>
                      ) : (
                        <BigSingleHorizontalBar
                          positiveValue={country.positive}
                          negativeValue={country.negative}
                          neutralValue={country.neutral}
                        />
                      )}
                    </div>
                    <div className="p-0 ml-20 w-auto">Map Area</div>
                  </div>
                  <hr className="border-t-1 border-black w-full" />
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

export default CountryView;
