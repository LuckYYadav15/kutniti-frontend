import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../assets/backgroundMain.jpg";

const Methodology = () => {




  const [data, setData] = useState();

  const getData = async () => {
    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/4a6a3f85-83ed-4537-886d-02d28e3b5696"
      );
      const data = await res.json();
      setData(Object.keys(data).map((key) => data[key]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);




console.log(data);








  const containerStyle = {
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover", // Adjust background sizing
    backgroundRepeat: "no-repeat", // Prevent repeating of background image
    backgroundColor: "#f2f2f2",
    width: "100vw",
    height: "100%",
    // Add other styles as needed
  };





  
  return (
    <div id="" style={containerStyle} className="w-full font-custom">
  <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div>
    <h2 className="m-10">Methodology Page</h2>
     {data?.map((item, i) => (
        <div className="" key={i}>
        <div>{item.methodology}</div>
        </div>
      ))}
    </div>
    </div>
    
    <Footer />
    </div>

  );
};

export default Methodology;
