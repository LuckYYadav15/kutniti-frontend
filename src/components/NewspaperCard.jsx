// src/Card.js

import React from 'react';

const Card = ({ image, title, content, date, borderColor }) => {
  return (
    <div className={`border-l-4 ${borderColor} p-4 flex`}>
      <div className="mr-4">
        {/* <img src={process.env.PUBLIC_URL + '/images/' + image} alt={title} className="w-24 h-24 object-cover" /> */}
        <img src={ '../assets/' + image} alt={title} className="w-24 h-24 object-cover" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{content}</p>
        <p className="text-gray-400 mt-2">{date}</p>
      </div>
    </div>
  );
};

export default Card;
