// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import Contact from "./Contact";
import "./App.css";
import "./output.css";
import About from "./About";
import App from "./App";

function App2() {
  return (
    <>
      <div className="min-h-screen justify-between">
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Hero />} /> {/* Home page route */}{" "}
          {/* Contact Us route */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App2;
