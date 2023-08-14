import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mx-auto py-8 px-4 md:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-600 p-4 text-white">
    <div className="md:col-span-2 lg:col-span-3">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Kutniti Watch</h1>
      <p className="text-sm md:text-base mb-6">
        By taking an intermediate role between owners who wish to rent out their furnished property and clients of DreamHome who require to rent furnished property for a fixed period.
      </p>
    </div>
    <div className="mt-4 md:mt-0">
      <h6 className="font-medium text-gray-400">Solutions</h6>
      <ul className="text-sm md:text-base">
        <li className="py-1">Analytics</li>
        <li className="py-1">Marketing</li>
        <li className="py-1">Commerce</li>
        <li className="py-1">Insights</li>
      </ul>
    </div>
    <div className="mt-4 md:mt-0">
      <h6 className="font-medium text-gray-400">Social Media</h6>
      <div className="flex justify-start md:justify-between items-center mt-2">
        <FaFacebookSquare size={24} className="mr-2" />
        <FaInstagram size={24} className="mr-2" />
        <FaTwitterSquare size={24} className="mr-2" />
        <FaLinkedin size={24} />
      </div>
    </div>
    <div className="mt-4 md:mt-0">
      <h6 className="font-medium text-gray-400">Join a Newsletter</h6>
      <input
        className="p-2 md:p-3 w-full rounded-md text-black mt-2"
        type="email"
        placeholder="Enter Email"
      />
      <button className="bg-[#00df9a] text-black rounded-md font-medium w-full md:w-[200px] mt-2 md:mt-4 px-4 md:px-6 py-2 md:py-3">
        Notify Me
      </button>
    </div>
  </div>
  
  );
};

export default Footer;
