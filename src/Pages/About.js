import React from 'react';
import WorldMap from "react-svg-worldmap";

const AboutUs = () => {

  let data = [
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
  ];



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
     <WorldMap
          className="world-map"
          color="red"
          // title="Top 10 Populous Countries"
          value-suffix="people"
          size="xl"
          data={data}
          // onClickFunction={clickAction}
          // styleFunction={getStyle}
        />
      {/* <div className="bg-white p-10 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700">
          Welcome to our company! We are dedicated to providing top-notch products and services to our customers.
        </p>
        <p className="mt-4 text-gray-700">
          Our team is passionate about innovation and customer satisfaction. We strive to make a positive impact on the world.
        </p>
      </div> */}
    </div>
  );
};

export default AboutUs;
