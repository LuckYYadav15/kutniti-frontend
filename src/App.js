import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Page404 from "./Pages/Page404";
import CountryView from "./Pages/CountryView";
import CountryDetail from "./Pages/CountryDetail";
import NewspaperView from "./Pages/NewspaperView";
import NewspaperDetail from "./Pages/NewspaperDetail";
import About from "./Pages/About";
import Methodology from "./Pages/Methodology";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/country-view" element={<CountryView />} />
          <Route path="/country-detail" element={<CountryDetail />} />
          <Route path="/newspaper-view" element={<NewspaperView />} />
          <Route path="/newspaper-detail" element={<NewspaperDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/methodology" element={<Methodology />} />

          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
