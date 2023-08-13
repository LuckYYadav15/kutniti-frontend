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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


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
    console.log('Selected Month:', months[value]);
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
    all:0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  

  const [modal, setModal] = useState(false);

  const [tempData, setTempData] = useState([ ]);

  const [negativeCountry, setNegativeCountry] = useState([]);



//-----------GET THE NO. NEGATIVE ARTICLES BY EACH COUNTRY CALCULATE THEIR RANKS BASED ON THAT AND UPDATE THE DATA ARRAY--------------------------------


  const [isDataReady, setIsDataReady] = useState(false);

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

const [updatedData, setUpdatedData] = ([]);




  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const response = await fetch('http://65.2.183.51:8000/api/country/getallCountryArticles', {
          method: 'GET',
        });
  
        if (response.ok) {
          const getData = await response.json();
          setTempData(getData);
  
          // Create negativeCountry array
          const negativeCountries = getData
            .filter(item => item.type === 'Negative')
            .map(item => ({
              countryName: item.countryName === 'USA' ? 'United States' : item.countryName,
              negativeArticles: item.Articles
            }));
  
          setNegativeCountry(negativeCountries);

           // Sort negativeCountry array by negativeArticles in descending order
        negativeCountries.sort((a, b) => b.negativeArticles - a.negativeArticles);
            
        // Assign ranks to countries
        negativeCountries.forEach((country, index) => {
          country.rank = index + 1;
        });
        
        

        
        const tempUpdatedData = data.map(item => {
          const matchingCountry = negativeCountries.find(country => country.countryName === item.name);
          if (matchingCountry) {
            return { ...item, value: matchingCountry.rank };
          }
          return item;
        }); 
//------------------------- WORKS TILL HERE JUST NEED TO SEND RANKS TO DATA----------------
       
        setData(tempUpdatedData);
        setIsDataReady(true);
        console.log(data);
        
  
        } else {
          console.error('API call failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchAllCountries();
  }, []);
  


  const clickAction = async (countryDetails) => {

let countryName;  
    try {
      if(countryDetails.countryName=="United States"){
         countryName = 'USA'; 
      }else{
         countryName = countryDetails.countryName; 
      }
       
      const fetchArticle = async () => {
        try {
          const response = await fetch('http://65.2.183.51:8000/api/country/getaCountryArticle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ countryName })
          });
          
          if (response.ok) {
            const getData = await response.json();
            return getData;
          } else {
            throw new Error('API call failed');
          }
        } catch (error) {
          throw error;
        }
      };
      
      const oneCountry = await fetchArticle();
      // console.log(oneCountry)
      
      oneCountry.forEach(country => {
        if (country.type === 'All') {
          setClickedData(prevData => ({
            ...prevData,
            all: country.Articles,
          }));
        } else if (country.type === 'Positive') {
          setClickedData(prevData => ({
            ...prevData,
            positive: country.Articles,
          }));
        }else if (country.type === 'Negative') {
          setClickedData(prevData => ({
            ...prevData,
            negative: country.Articles,
          }));
        }
        else if (country.type === 'Neutral') {
          setClickedData(prevData => ({
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
      if(oneCountry.length >= 4) {
        window.localStorage.setItem("hoveredPositive", oneCountry[3].Articles);
      window.localStorage.setItem("hoveredNegative", oneCountry[1].Articles);
      window.localStorage.setItem("hoveredNeutral", oneCountry[2].Articles);
      window.dispatchEvent(new Event("storage"));
      }else{
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
          positive: clickedData.positive|| 0,
          negative: clickedData.negative || 0,
          neutral: clickedData.neutral|| 0,
          Value: clickedData.all || 0,
          Name: countryDetails.countryName,
        });
      }
  
      setModal(!modal);
    } catch (error) {
      console.error('Error:', error);
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
    let fillColor = 'rgb(166, 162, 162)'; // Default color
  
    if (countryValue >= 1 && countryValue <= 3) {
      fillColor = 'rgb(217, 22, 22)'; // Red
    } else if (countryValue >= 4 && countryValue <= 5) {
      fillColor = 'rgb(255, 153, 51)'; // Orange
    } else if (countryValue >= 6 && countryValue <= 7) {
      fillColor = 'rgb(235, 231, 9)'; // Yellow
    } else if (countryValue >= 8 && countryValue <= 10) {
      fillColor = 'rgb(102, 255, 51)'; // Green
    } else if (countryValue >= 11 && countryValue <= 13) {
      fillColor = 'rgb(51, 204, 51)'; // Dark Green
    }
  
    return {
      fill: fillColor,
      // fillOpacity: countryValue
      //   ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
      //   : 0,
      stroke: 'Black',
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: 'pointer',
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

  return (
    <div className="mb-40">
      <h1 className="text-3xl text-center pt-32 m-0 p-0">
  Discover the perception of{" "}
  <div className="m-0 p-0" style={{ color: "rgb(121, 0, 255)", display: "inline-block" }}>
    India
  </div>{" "}
  in the world
</h1>

      {/* DISPLAYING THE INTERACTIVE WORLD MAP WITH POPUP */}
      <div className="ml-20 flex m-2 mt-5 mb-20">
        {isDataReady && (<WorldMap
          className="world-map"
          color="gray"
          // title="Top 10 Populous Countries"
          value-suffix="people"
          size="xl"
          data={data}
          onClickFunction={clickAction}
          styleFunction={getStyle}
        />)}

        <div className="bg-white m-auto ml-38 p-4 rounded shadow-md w-2/8 pl-2">
          <div className="cursor-pointer bg-white flex space-x-5 items-center  m-2  rounded-3xl ">
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

          <div className="cursor-pointer bg-white flex  items-center  m-2 p-2  rounded-3xl ">
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
      {/*  
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )} */}
      {/* DISPLAYING LIST OF MONTHS */}
      <div className="flex">
        <div className="ml-10 w-1/4 bg-white p-0 rounded-lg">
          <div className="flex justify-between">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-1/5 h-10 ${color} text-white flex items-center justify-center`}
              >
                {texts[index]}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border m-auto  bg-white p-auto ">
            {" "}
            <p className="m-auto text-sm text-gray-400">Negative</p>{" "}
            <p className="m-auto text-sm text-gray-400">Perception</p>{" "}
            <p className="m-auto text-sm text-gray-400">Positive</p>{" "}
          </div>
        </div>

        <div className="m-auto flex items-center justify-center w-2/3">
          <div className="flex items-center">
            <button
              className="px-1 py-1 bg-gray-200 text-gray-800 rounded-md mr-1"
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            {months.map((month, index) => (
              <button
                key={month}
                className={`border border-black  px-2 py-1 rounded-md ${
                  selectedMonth === index
                    ? "bg-blue-500 text-white"
                    : "bg-white-200 text-black"
                } mr-1`}
                onClick={() => handleMonthChange(index)}
              >
                {month} {selectedYear}
              </button>
            ))}
            <button
              className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md ml-1"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-100 p-4">
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
    </div>
  );
};

export default Hero;
