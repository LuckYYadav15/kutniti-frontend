import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../assets/backgroundMain.jpg";

const AboutUs = () => {

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
     <h2>About Page</h2>
    </div>
    <Footer />
    </div>

  );
};

export default AboutUs;
