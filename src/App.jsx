import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import Achievement from "./Pages/Achievement";
import ContactPage from "./Pages/Contact";
import WelcomeScreen from "./Pages/WelcomeScreen";
import Testing from "./Pages/testing";
import ProjectDetails from "./Pages/ProjectDetails";
import { AnimatePresence } from 'framer-motion';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Smooth scroll function for manual scrolling between sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Add scroll event listener for auto-scrolling between sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'achievement', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            window.history.pushState({}, '', `#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-[#030014] overflow-auto">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          {showWelcome && (
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          )}
        </AnimatePresence>

        {!showWelcome && (
          <>
            <Navbar scrollToSection={scrollToSection} />
            <AnimatedBackground />
            <Routes>
              <Route path="/" element={
                <>
                  <div id="home"><Home /></div>
                  <div id="about"><About /></div>
                  <div id="portfolio"><Portofolio /></div>
                  <div id="achievement"><Achievement /></div>
                  <div id="contact"><ContactPage /></div>
                </>
              } />
              <Route path="/project/:id" element={
                <div className="min-h-screen">
                  <ProjectDetails />
                </div>
              } />
              <Route path="/testing" element={<Testing />} />
            </Routes>
            <footer>
              <center>
                <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
                <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                  2025{" "}
                  <span className="font-medium text-gray-400">
                    Manoj™
                  </span>
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