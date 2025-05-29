import React, { useState } from "react";
import { Star } from "lucide-react";
import search from "../image/search.svg";
import explore from "../image/explore.svg";
import finder from "../image/finder.svg";
import firefox from "../image/firefox.svg";
import Getleaf from "../image/Getleaf.svg";
import Support from "./Support";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ston from "../image/ston.svg";
import chrome from "../image/chrome.svg";
import Oval2 from "../image/Oval2.svg";
import { Link } from "react-router-dom";

const ProductFinderHero = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAuthenticated = false; // Replace with actual auth logic

  const handleProductClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    alert(`Submitting for ${"Unknown Product"} with `);
  };

  return (
    <section className="w-full relative">
      <Navbar />
             <div className="absolute hidden lg:block left-80 top-0 bottom-120 inset-0 overflow-hidden z-0 lg:left-0 2xl:right-100 ">
          <img
            src={Oval2 || "/placeholder.svg"}
            alt="Background"
            className="w-150 h-auto object-cover "
          />
        </div>
      <div
        className="absolute inset-0 w-140 left-280 top-[-50px] hidden lg:block md:left-150 lg:left-115 xl:left-230 2xl:left-280 "
        style={{ zIndex: -1 }}
      >
        <img
          src={ston || "/placeholder.svg"}
          alt="Background Shape"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Leaf Background */}
      <img
        src={Getleaf}
        alt="Leaf Background"
        className="absolute left-0 top-0 w-48 md:w-64 lg:w-80 opacity-5 z-0 hidden lg:block"
      />
      <div className="max-w-7xl mx-auto">
        {/* Main Blur Container */}
        <div
          className={`${
            showAuthModal ? "blur-sm pointer-events-none select-none" : ""
          }`}
        >
          <div className="py-12 px-4 relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Product Finder
              </h1>
              <p className="text-gray-600 text-lg">
                Find Exactly What You Need <br /> Your Shortcut to the Right
                Choice
              </p>

              {/* Buttons */}
               <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                               <div className="relative inline-flex items-center">
                                 <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap">
                                   EXPLORE TOOL
                                 </button>
                                 <img
                                   src={explore || "/placeholder.svg"}
                                   alt="Arrow Icon"
                                   className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                                 />
                               </div>
                               <div className="relative inline-flex items-center">
                                 <Link to ="/Productfinder"><button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap cursor-pointer">
                                   PRODUCT FINDER
                                 </button></Link>
                                 <img
                                   src={finder || "/placeholder.svg"}
                                   alt="Finder Icon"
                                   className="absolute -top-1 -right-2 w-5 h-5 sm:w-6 sm:h-6 hover:scale-150 transition-transform"
                                 />
                               </div>
                             </div>
             
              {/* Login/Register + Extension */}
              <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 mt-10">
                {/* Login/Register Section */}
                <div className="flex flex-col items-center space-y-3">
                  <button className="bg-gray-100 px-8 py-2 rounded-full text-gray-600 font-semibold shadow-md">
                    LOGIN / REGISTER
                  </button>
                  <div className="text-red-600 font-semibold cursor-pointer hover:underline">
                    SIGN IN
                  </div>
                </div>

                {/* Extension Info */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    Get the extension and access all tools with just one click
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gray-300" />
                    <a
                      href="https://chrome.google.com/webstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <img
                        src={chrome || "/placeholder.svg"}
                        alt="Chrome"
                        className="w-6 h-6"
                      />
                    </a>
                    <a
                      href="https://chrome.google.com/webstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <img
                        src={firefox || "/placeholder.svg"}
                        alt="Firefox"
                        className="w-6 h-6"
                      />
                    </a>
                    <div className="h-px w-12 bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 mt-10 lg:mt-0 flex justify-center">
              <img
                src={search}
                alt="Illustration"
                className="w-full max-w-md hidden lg:block"
              />
            </div>
          </div>
          <div class="bg-[#f8f8fb] rounded-3xl p-8 max-w-7xl mx-auto mb-5 shadow-lg">
            <h2 class="text-2xl font-bold text-[#23233c] mb-6 ">
              Submit your product
            </h2>
            <div class="bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
              <div class="flex-1 w-full">
                <label
                  class="block text-base font-medium text-[#23233c] mb-1 bg-white"
                  for="product-url"
                >
                  1. Please enter the webpage of your product*
                </label>
                <input
                  id="product-url"
                  type="url"
                  placeholder="URL of your Product"
                  class="mt-2 w-full bg-transparent text-[#888888] placeholder-[#bdbdbd] border-none focus:ring-0 focus:outline-none text-base"
                />
              </div>
              <button
                type="submit"
                class="bg-[#0a1330] text-white font-medium rounded-full px-8 py-2 transition hover:bg-[#23233c]"
              >
                Submit
              </button>
            </div>
            <p class="text-[#888888] text-sm mt-4">
              *Your site data will be fetched and used to fill out the
              submission form. Please review the fields.
            </p>
          </div>
        </div>
        <Support />
      </div>
      <Footer />
    </section>
  );
};

export default ProductFinderHero;