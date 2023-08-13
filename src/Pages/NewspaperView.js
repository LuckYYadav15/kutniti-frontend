
import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../Styles/Staff.css";

function NewspaperView() {
  const [newspaperFilter, setNewspaperFilter] = useState({});
  const [hoveredNewspaper, setHoveredNewspaper] = useState(null);

  const [newspaperData, setNewspaperData] = useState([
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Australia', code: 'AU' },
  ]);

  const handleNewspaperHover = (country) => {
    setHoveredNewspaper(country);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/apis/country_search/', newspaperFilter);
      setNewspaperData(response.data);
      // console.log(countryData);
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data from server');
    }
  };

  const handleChange = (event) => {
    setNewspaperFilter({ ...newspaperFilter, [event.target.name]: event.target.value });
  };


  const handleClick = (cid) => {
    window.localStorage.setItem("selectedcountryId", cid);
    window.dispatchEvent(new Event("storage")); 
    window.location.href = "http://localhost:3000/newspaper-detail";
};


return (
  <div className='bg-cover '>
      <Navbar />
      <div className="flex h-screen">
  <div className="w-1/2 bg-gray-200 p-4 overflow-y-auto">
    <div className="flex flex-wrap gap-4">
      {newspaperData.map((country) => (
        <div
          key={country.code}
          className="cursor-pointer w-1/4 p-4 bg-gray-200 rounded shadow-md"
          onClick={() => handleClick(country.code)}
          onMouseEnter={() => handleNewspaperHover(country)}
          onMouseLeave={() => setHoveredNewspaper(null)}
        >
          <div className="rounded bg-gray-200">
            <div className="text-lg">{country.code}</div>
            <div className="text-xl font-bold">{country.name}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div className="w-1/2 bg-gray-100 p-4">
    {hoveredNewspaper && (
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Country Details</h2>
        <div>
          <h3 className="text-lg font-bold">Country Code</h3>
          <p className="text-lg">{hoveredNewspaper.code}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Country Name</h3>
          <p className="text-lg">{hoveredNewspaper.name}</p>
        </div>
      </div>
    )}
  </div>
</div>

  <Footer />
    </div>
);



  // return (
  //       <ul className="">
  //         {countryData?.map((node) => {
  //           return (
  //             <li className='m-5 p-5 hover:cursor-pointer' key={node.pnumber} onClick={() => handleClick(node.pnumber)}>
  //   <div
  //     className={`rounded-2xl bg-white bg-opacity-20 p-10 flex space-x-20`}
  //     style={{backdropFilter: 'blur(10px)'}}>
  //      <div className="  text-2xl">{node.pnumber}</div>
  //      <div className="  text-2xl">{node.ptype}</div>
  //      <div className="  text-2xl">{node.rent}</div>
  //      <div className="  text-2xl">{node.address}</div>
  //      <div className="  text-2xl">Rooms: {node.rooms}</div>
  //      {/* <div className="  text-2xl">Is Available: {node.isavailable}</div> */}
  //               </div>
  //             </li>
  //           );
  //         })}
  //       </ul>
  // );
}

export default NewspaperView;
