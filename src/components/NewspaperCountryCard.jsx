import React from "react";

const NewspaperCountryCard = ({ firstValue, secondValue }) => {
  return (
    <div className="bg-opacity-0 backdrop-blur-[2px] w-40  rounded-lg shadow-2xl border p-2 pt-1">
      <div className="mt-1 flex justify-center rounded-lg items-center">
        <img src={firstValue} alt="Relation Image" className=" h-10 ml-1" />
      </div>
      <div className="mt-1 flex text-center justify-center text-black text-md">{secondValue}</div>
    </div>
  );
};

export default NewspaperCountryCard;
