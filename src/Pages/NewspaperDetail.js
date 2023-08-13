import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../Styles/Staff.css";
import { Link } from "react-router-dom";

function CountryDetails() {
  const [newspaperData, setnewspaperData] = useState({});
  const [newspaperId, setnewspaperId] = useState(null);

  useEffect(() => {
    const storednewspaperId = localStorage.getItem("selectednewspaperId");
    if (storednewspaperId) {
        setnewspaperId(storednewspaperId);
    }
  }, []);

  useEffect(() => {
    console.log("newspaper ID:", newspaperId);

    if (newspaperId) {
      const apiUrl = `http://localhost:8000/apis/newspaper_detail/${newspaperId}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setnewspaperData(response.data);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to fetch branch data");
        });
    }
  }, [newspaperId]);
console.log(newspaperData);

return (
    <div className='bg-cover '>
      <Navbar />
      <div className='flex justify-center'>
        <div className='ml-10 px-10 my-10 py-10 bg-white bg-opacity-10 rounded-3xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6' style={{
          backdropFilter: 'blur(10px)',
        }}>
          <div className="text-center my-5">
            <h1 className="text-4xl font-bold mb-5  ">Selected Newspaper Details</h1>
            <div>
                  <div 
                  className={`m-5 rounded-2xl bg-white bg-opacity-20 p-5 flex space-x-10`}
                  style={{backdropFilter: 'blur(10px)'}}> 
                  <div className="  text-2xl">newspaper Number: {newspaperData.pnumber}</div>
                  </div>

                  <div 
                  className={` m-5 rounded-2xl bg-white bg-opacity-20 p-5 flex space-x-10`}
                  style={{backdropFilter: 'blur(10px)'}}>
                  <div className="  text-2xl">newspaper Type: {newspaperData.ptype}</div>
                  </div>

                  <div 
                  className={` m-5 rounded-2xl bg-white bg-opacity-20 p-5 flex space-x-10`}
                  style={{backdropFilter: 'blur(10px)'}}>
                  <div className="  text-2xl">newspaper Address: {newspaperData.paddress}</div>
                  </div>

                  <div 
                  className={` m-5 rounded-2xl bg-white bg-opacity-20 p-5 flex space-x-10`}
                  style={{backdropFilter: 'blur(10px)'}}>
                  <div className="  text-2xl">newspaper Rent: {newspaperData.rent}</div>
                  </div>
                </div>
       

          </div>
          <div className="text-center my-5">
            <h2 className="text-4xl font-bold mb-5  ">Client Details</h2>
            </div>
          <ul className="">
            {newspaperData.clients && newspaperData.clients.map((client) => (
              <li className='m-5 px-5' key={client.cnumber} >
                <div
                  className={`rounded-2xl bg-white bg-opacity-20 p-2 flex space-x-20`}
                  style={{backdropFilter: 'blur(10px)'}}>
                  <div className="  text-lg mx-10">{client.cnumber}</div>
                  <div className="  text-lg mx-10">{client.cname}</div>
                  <div className="  text-lg mx-10">{client.comment}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CountryDetails;
