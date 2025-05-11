import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import Testing from "./Pages/testing";
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#030014]">
        <AnimatePresence mode="wait">
          {showWelcome && (
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          )}
        </AnimatePresence>

        {!showWelcome && (
          <>
            <Navbar />
            <AnimatedBackground />
            <Routes>
              <Route path="/" element={
                <>
                  <Home />
                  <About />
                  <Portofolio />
                  <ContactPage />
                </>
              } />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/testing" element={<Testing />} />
            </Routes>
            <footer>
              <center>
                <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
                <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                  © 2025{" "}
                  <a href="https://flowbite.com/" className="hover:underline">
                    ABC™
                  </a>
                  . All Rights Reserved.
                </span>
              </center>
            </footer>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;