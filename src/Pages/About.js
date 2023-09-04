import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/backgroundMain.jpg";

const AboutUs = () => {

  const [data, setData] = useState();
  const [firstItem, setFirstItem] = useState();
  const [secondItem, setSecondItem] = useState();
  const [thirdItem, setThirdItem] = useState();
  const [fourthItem, setFourthItem] = useState();


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



  useEffect(() => {

    let i=0;
    if(data){
      data.forEach((item) => {
        if(i==0){
          setFirstItem(item.about)
        }
        if(i==1){
          setSecondItem(item.about)
        }
        if(i==2){
          setThirdItem(item.about)
        }
        if(i==3){
          setFourthItem(item.about)
        }
  
      i++;
      });
    }
    

  }, [data]);

  




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
    <div id="" style={containerStyle}>
  <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div>
    <h2 className="m-10">About Page</h2>
    
        <div>{firstItem}</div>
        <div>{secondItem}</div>
        <div>{thirdItem}</div>
        <div>{fourthItem}</div>
   
    </div>
    </div>
    
 
    </div>

  );
};

export default AboutUs;
