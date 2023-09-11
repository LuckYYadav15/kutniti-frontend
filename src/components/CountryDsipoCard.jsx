import React from "react";
import DispoImg from "../assets/countryStats/IndiasporaLogo 1.png";

const CountryDsipoCard = ({ firstValue, secondValue }) => {
  return (
    <div className="bg-opacity-0 backdrop-blur-[2px] w-30 h-20 rounded-lg shadow-2xl border p-2 pt-1">
      <div className="flex ml-8">
        <div className="text-orange-600 text-md font-bold ">#{firstValue}</div>
        <img src={DispoImg} alt="Relation Image" className="w-13 h-8 ml-1" />
      </div>

      <div className="flex text-center text-gray-600 text-sm">{secondValue}</div>
    </div>
  );
};

export default CountryDsipoCard;
