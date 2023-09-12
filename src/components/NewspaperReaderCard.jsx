import React from "react";

const NewspaperReaderCard = ({ firstValue }) => {
  return (
    <div className="bg-opacity-0 backdrop-blur-[2px] w-40 h-30 rounded-lg shadow-2xl border p-2 pt-1">
        <div className=" text-2xl text-center font-bold mb-2 mt-3">{firstValue}</div>
      <div className="flex text-center justify-center mb-2 text-sm">Monthly Readers</div>
    </div>
  );
};

export default NewspaperReaderCard;
