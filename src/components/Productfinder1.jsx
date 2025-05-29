import React, { useState } from "react";
import { Star } from "lucide-react";
import search from "../image/search.svg";
import explore from "../image/explore.svg";
import finder from "../image/finder.svg";
import firefox from "../image/firefox.svg";
import Getleaf from "../image/Getleaf.svg";
import Support from "./Support";
import finderp from "../image/finderp.svg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ston from "../image/ston.svg";
import { Link } from "react-router-dom";
import Oval2 from "../image/Oval2.svg";
import chrome from "../image/chrome.svg";
import leaf1 from "../image/leaf1.svg";

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
    <>
      <div className="relative">
        <div
          className="absolute inset-0 w-140 left-280 top-[-50px] hidden lg:block md:left-150 lg:left-115 xl:left-230 2xl:left-280 "
          style={{ zIndex: 1 }}
        >
          <img
            src={ston || "/placeholder.svg"}
            alt="Background Shape"
            className="w-full h-auto object-cover"
          />
        </div>

        <section className="w-full relative">
          <Navbar />
          {/* Leaf Background */}
          <img
               src={leaf1 || "/placeholder.svg"}
               alt="leav"
               className="top-15 absolute hidden lg:block"
             />
          <div className="absolute hidden lg:block left-80 top-0 bottom-120 inset-0 overflow-hidden z-0 lg:left-0 2xl:right-100 ">
            <img
              src={Oval2 || "/placeholder.svg"}
              alt="Background"
              className="w-150 h-auto object-cover "
            />
          </div>
          <div className="max-w-7xl mx-auto">
            {/* Main Blur Container */}
            <div
              className={`${
                showAuthModal ? "blur-sm pointer-events-none select-none" : ""
              }`}
            >
              <div className="py-12 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">
                <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0 px-7">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    Product Finder
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg">
                    Find Exactly What You Need <br /> Your Shortcut to the Right
                    Choice
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                    <div className="relative inline-flex items-center">
                      <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap">
                        EXPLORE TOOL
                      </button>
                      <img
                        src={explore}
                        alt="Arrow Icon"
                        className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </div>
                    <div className="relative inline-flex items-center">
                      <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap">
                        PRODUCT FINDER
                      </button>
                      <img
                        src={finder}
                        alt="Finder Icon"
                        className="absolute -top-1 -right-2 w-5 h-5 sm:w-6 sm:h-6 hover:scale-150 transition-transform"
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 max-w-md mx-auto lg:mx-0">
                    <div className="flex flex-col items-center space-y-3">
                      <Link to="/Signup">
                        <button className="bg-gray-100 px-8 py-2 rounded-full text-gray-600 font-semibold shadow-md whitespace-nowrap cursor-pointer">
                          LOGIN / REGISTER
                        </button>
                      </Link>
                      <Link to="/Login">
                        <button className="text-red-600 font-semibold cursor-pointer hover:underline select-none">
                          SIGN IN
                        </button>
                      </Link>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2 max-w-xs mx-auto sm:mx-0">
                        Get the extension and access all tools with just one
                        click
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

                <div className="flex-1 flex justify-center max-w-md w-full">
                  <img
                    src={search}
                    alt="Illustration"
                    className="hidden lg:block w-full max-w-xs sm:max-w-sm md:max-w-md"
                  />
                </div>
              </div>

              {/* <!-- Tailwind CSS Product Card Example --> */}
              <div class="max-w-7xl mx-auto">
                {/* <!-- Top Bar --> */}
                <div class="flex justify-between items-center bg-[#e3effc] rounded-full px-6 py-3">
                  <span class="text-[#23233c] font-medium">
                    Product→Productivity→Cleansnap
                  </span>
                  <a
                    href="#"
                    class="text-[#23233c] font-medium hover:underline"
                  >
                    Boost
                  </a>
                </div>
                {/* <!-- Card --> */}
                <div class="bg-white rounded-3xl shadow p-6 md:p-10">
                  {/* <!-- Image --> */}
                  <div class="overflow-hidden rounded-2xl mb-5">
                    <img
                      src={finderp}
                      alt="CleanSnap"
                      className="hidden md:block w-full h-150 object-cover object-center"
                    />
                  </div>
                  {/* <!-- Title and Boosted by --> */}
                  <div class="mb-2">
                    <h2 class="text-2xl font-bold text-[#23233c]">CleanSnap</h2>
                    <span class="text-gray-500 text-sm">boosted by</span>
                  </div>
                  {/* <!-- Description --> */}
                  <div class="text-[#888888] text-base leading-relaxed space-y-4 mb-6">
                    <p>
                      Discover a growing, hand-curated collection of 2100+
                      highly useful tools and resources all in one place.
                      Webcurate is a hand-curated directory that showcases daily
                      a hand-curated selection of highly useful tools and
                      resources for various use cases, including business,
                      marketing, website development, content creation,
                      productivity, design, and job-related needs.
                    </p>
                    <p>
                      The platform currently features over 2100 tools and
                      products in over 200 categories and serves as a
                      comprehensive resource for users seeking high-quality,
                      useful products and tools.
                    </p>
                    <p>
                      It has features like dark theme support, multi-language
                      support, a bookmarking option, and a clean, well-designed
                      user interface. The platform is designed to make it easier
                      for users to discover new and helpful online tools by
                      offering detailed descriptions and features for each item
                      listed.
                    </p>
                    <p>
                      The platform was created and is updated by Hossein Yazdi,
                      who has a passion for exploring and sharing online tools
                      that can make tasks easier and more efficient.
                    </p>
                  </div>
                  {/* <!-- Visit Button --> */}
                  <div class="flex justify-end">
                    <a
                      href="#"
                      class="bg-[#0a1330] text-white rounded-full px-8 py-2 text-lg font-medium flex items-center gap-2 hover:bg-[#23233c] transition"
                    >
                      Visit
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- Product Bento --> */}
              <div className="bg-[#f6f7fb] rounded-3xl p-8 max-w-7xl mx-auto mt-5 mb-5">
                <h2 className="text-xl font-extrabold text-[#23233c] mb-6">
                  Product Bento
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Pricing */}
                  <div className="bg-white rounded-xl p-5">
                    <div className="font-bold text-[#23233c] mb-1">Pricing</div>
                    <div className="text-[#23233c] text-sm">Free</div>
                  </div>
                  {/* Categories */}
                  <div className="bg-white rounded-xl p-5">
                    <div className="font-bold text-[#23233c] mb-1">
                      Categories
                    </div>
                    <div className="text-[#23233c] text-sm">Productivity</div>
                    <div className="text-[#23233c] text-sm">Business</div>
                  </div>
                  {/* Tags */}
                  <div className="bg-white rounded-xl p-5">
                    <div className="font-bold text-[#23233c] mb-1">Tags</div>
                    <div className="text-[#23233c] text-sm mb-2">Free</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#f6f7fb] text-[#888] text-xs px-3 py-1 rounded-full">
                        # Event
                      </span>
                      <span className="bg-[#f6f7fb] text-[#888] text-xs px-3 py-1 rounded-full">
                        # Event
                      </span>
                      <span className="bg-[#f6f7fb] text-[#888] text-xs px-3 py-1 rounded-full">
                        # Event
                      </span>
                    </div>
                  </div>
                  {/* Social Media & Links */}
                  <div className="bg-white rounded-xl p-5 flex flex-col justify-center">
                    <div className="font-bold text-[#23233c] mb-2">
                      Social Media & Links
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        aria-label="Facebook"
                        className="text-[#23233c] bg-[#f6f7fb] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#e0e1e5]"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12.073C22 6.477 17.523 2 12 2S2 6.477 2 12.073c0 5.021 3.657 9.175 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.242 0-1.631.771-1.631 1.562v1.874h2.773l-.443 2.89h-2.33v6.987C18.343 21.248 22 17.094 22 12.073z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-label="Twitter"
                        className="text-[#23233c] bg-[#f6f7fb] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#e0e1e5]"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.27 4.27 0 0 0 1.88-2.36 8.59 8.59 0 0 1-2.72 1.04 4.24 4.24 0 0 0-7.23 3.87A12.04 12.04 0 0 1 3.16 4.87a4.24 4.24 0 0 0 1.31 5.66c-.7-.02-1.36-.21-1.94-.53v.05a4.24 4.24 0 0 0 3.4 4.16c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.25 4.25 0 0 0 3.96 2.95A8.5 8.5 0 0 1 2 19.54a12.07 12.07 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.7 8.7 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-label="LinkedIn"
                        className="text-[#23233c] bg-[#f6f7fb] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#e0e1e5]"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.75 1.75-1.75s1.76.78 1.76 1.75c0 .97-.79 1.76-1.76 1.76zm13.5 10.29h-3v-4.5c0-1.07-.02-2.44-1.49-2.44-1.5 0-1.73 1.17-1.73 2.36v4.58h-3v-9h2.88v1.23h.04c.4-.76 1.37-1.56 2.82-1.56 3.02 0 3.58 1.99 3.58 4.58v4.75z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  {/* People */}
                  <div className="bg-white rounded-xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#e0e1e5] rounded-full"></div>
                    <div>
                      <div className="text-[#23233c] font-medium">
                        Hossein Yazdi
                      </div>
                      <div className="text-[#888888] text-sm">Founder</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Support />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductFinderHero;
