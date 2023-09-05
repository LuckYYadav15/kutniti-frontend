import React from 'react';

const MySvgComponent = ({ stroke }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.51666 2.36667L3.02499 5.86667C2.27499 6.45 1.66666 7.69167 1.66666 8.63334V14.8083C1.66666 16.7417 3.24166 18.325 5.17499 18.325H14.825C16.7583 18.325 18.3333 16.7417 18.3333 14.8167V8.75C18.3333 7.74167 17.6583 6.45 16.8333 5.875L11.6833 2.26667C10.5167 1.45 8.64166 1.49167 7.51666 2.36667Z"
      stroke={stroke} // Use the stroke prop as the stroke attribute
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14.9917V12.4917"
      stroke={stroke} // Use the stroke prop as the stroke attribute
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MySvgComponent;
