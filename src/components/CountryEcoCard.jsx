import React from "react";
import EcoImg from "../assets/countryStats/icon _economy_.png";

const CountryEcoCard = ({ firstValue, secondValue }) => {
  return (
    <div className="bg-white w-30 h-20 rounded-lg shadow p-2 pt-1">
      <div className="flex ml-8">
        <div className="text-green-600 text-md font-bold ">#{firstValue}</div>
        <img src={EcoImg} alt="Relation Image" className="w-13 h-8 ml-1" />
      </div>

      <div className="flex text-center text-gray-600 text-sm">{secondValue}</div>
    </div>
  );
};

export default CountryEcoCard;
