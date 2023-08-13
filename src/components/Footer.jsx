import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 bg-gray-600 p-4 text-white">
      <div>
        <h1 className="w-full text-3xl font-bold">Kutniti Watch</h1>
        <p className="py-4">
          By taking an intermediate role between owners who wish to rent out
          their furnished property and clients of DreamHome who require to rent
          furnished property for a fixed period.
        </p>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-400">Solutions</h6>
          <ul>
            <li className="py-2 text-sm">Analytics</li>
            <li className="py-2 text-sm">Marketing</li>
            <li className="py-2 text-sm">Commerce</li>
            <li className="py-2 text-sm">Insights</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Social Media</h6>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaLinkedin size={30} />
          </div>
        </div>
        <div>
        <h6 className="font-medium text-gray-400">Join a Newsletter</h6>
          <input
            className="p-3 flex w-full rounded-md text-black"
            type="email"
            placeholder="Enter Email"
          />
          <button className="bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
