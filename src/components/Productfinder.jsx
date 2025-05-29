import React, { useState, useEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import {
  FaLayerGroup,
  FaCog,
  FaCode,
  FaLightbulb,
  FaBullhorn,
  FaBriefcase,
  FaMoneyBillWave,
  FaRobot,
  FaComments,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import search from "../image/search.svg";
import explore from "../image/explore.svg";
import finder from "../image/finder.svg";
import firefox from "../image/firefox.svg";
import Getleaf from "../image/Getleaf.svg";
import productback from "../image/productback.svg";
import Text from "../image/Text.svg";
import folder from "../image/folder.svg";
import cloud2 from "../image/cloud2.svg";
import cloud1 from "../image/cloud1.svg";
import Product1 from "../image/Product1.svg";
import Support from "./Support";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ston from "../image/ston.svg";
import Oval2 from "../image/Oval2.svg";
import chrome from "../image/chrome.svg";
import leaf1 from "../image/leaf1.svg";

const ProductFinderHero = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags, setActiveTags] = useState([]);
  const scrollRef = useRef(null);

  const categoryTagMap = {
    all: [
      "All",
      "Tags",
      "AI Prompting",
      "Accounting",
      "Code Editor",
      "Documentation",
      "E-Commerce",
      "Conversion",
      "Coloring",
      "Blogging",
      "Bootstrap",
      "Automation",
    ],
    productivity: ["Calendar", "Task Manager", "Note Taking", "Automation"],
    development: [
      "Code Editor",
      "Documentation",
      "Database",
      "Version Control",
    ],
    design: ["Coloring", "Background", "Animation", "UX Tools"],
    marketing: ["Email Marketing", "Affiliation", "Conversion", "SEO"],
    business: ["Accounting", "CRM", "Project Management"],
    finance: ["Budgeting", "Crypto", "Investment"],
    ai: ["AI Prompting", "Chatbot", "Automation", "Image Generation"],
    social: ["Facebook", "Instagram", "Content Planner"],
    lifestyle: ["Health", "Fitness", "Productivity"],
  };

  const categoryDataMap = {
    all: Array(6).fill({
      title: "CleanSnap",
      description:
        "Transforms screenshots into watermark-free, professional images.",
      tags: ["#Kevin", "#AI", "#Tool"],
      price: "Free",
      date: "20 June",
      time: "1 Min Read",
      image: Product1,
    }),
    productivity: [
      {
        title: "TaskFlow",
        description: "Manage your daily tasks seamlessly.",
        tags: ["#Productivity", "#Tasks"],
        price: "Free",
        date: "2 May",
        time: "2 Min Read",
        image: Product1,
      },
    ],
    development: [
      {
        title: "CodeSmith",
        description: "A fast, AI-based code editor.",
        tags: ["#Code", "#DevTools"],
        price: "$10/mo",
        date: "5 Apr",
        time: "3 Min Read",
        image: Product1,
      },
    ],
    design: [
      {
        title: "ColorWave",
        description: "Generate and manage color palettes.",
        tags: ["#Design", "#Color"],
        price: "Free",
        date: "12 Mar",
        time: "1 Min Read",
        image: Product1,
      },
    ],
    marketing: [
      {
        title: "MailBoost",
        description: "Boost your campaigns with smart targeting.",
        tags: ["#Email", "#Marketing"],
        price: "Free Trial",
        date: "8 Feb",
        time: "2 Min Read",
        image: Product1,
      },
    ],
    business: [
      {
        title: "BizSuite",
        description: "Manage CRM, invoices and teams.",
        tags: ["#CRM", "#Business"],
        price: "$25/mo",
        date: "1 Jan",
        time: "3 Min Read",
        image: Product1,
      },
    ],
    finance: [
      {
        title: "FinTrack",
        description: "Track expenses and plan budgets.",
        tags: ["#Finance", "#Budgeting"],
        price: "Free",
        date: "9 May",
        time: "2 Min Read",
        image: Product1,
      },
    ],
    ai: [
      {
        title: "Promptify",
        description: "Generate high-quality AI prompts.",
        tags: ["#AI", "#Prompt"],
        price: "Free",
        date: "10 May",
        time: "2 Min Read",
        image: Product1,
      },
    ],
    social: [
      {
        title: "PlanPost",
        description: "Schedule and plan content.",
        tags: ["#Social", "#Planner"],
        price: "Free",
        date: "22 Apr",
        time: "1 Min Read",
        image: Product1,
      },
    ],
    lifestyle: [
      {
        title: "FitLife",
        description: "Track workouts and nutrition.",
        tags: ["#Fitness", "#Health"],
        price: "Free",
        date: "15 Apr",
        time: "2 Min Read",
        image: Product1,
      },
    ],
  };

  useEffect(() => {
    setActiveTags(categoryTagMap[activeCategory] || []);
  }, [activeCategory]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const speed = 2;
    const scroll = () => {
      if (!scrollContainer) return;
      scrollAmount += speed;
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
      scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
    };
    const interval = setInterval(scroll, 100);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: "all", label: "ALL", icon: <FaLayerGroup /> },
    { id: "productivity", label: "Productivity", icon: <FaCog /> },
    { id: "development", label: "Development", icon: <FaCode /> },
    { id: "design", label: "Design", icon: <FaLightbulb /> },
    { id: "marketing", label: "Marketing", icon: <FaBullhorn /> },
    { id: "business", label: "Business", icon: <FaBriefcase /> },
    { id: "finance", label: "Finance", icon: <FaMoneyBillWave /> },
    { id: "ai", label: "AI Product", icon: <FaRobot /> },
    { id: "social", label: "Social Media", icon: <FaComments /> },
    { id: "lifestyle", label: "Lifestyle", icon: <FaHeart /> },
  ];

  const cards = categoryDataMap[activeCategory] || [];

  return (
    <>
      <div className="relative">
        {/* Pink background that covers navbar */}
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

        <section className="w-full relative bg-white">
          <Navbar />
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
          <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 relative">
            <div className="py-12 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">
              <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Product Finder
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">
                  Find Exactly What You Need <br /> Your Shortcut to the Right
                  Choice
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                  <div className="relative inline-flex items-center">
                   <Link
                  to="/"
                  state={{ scrollTo: 'featured-tools' }}
                  className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap cursor-pointer inline-block text-center"
                >
                  EXPLORE TOOL
                </Link>
                    <img
                      src={explore}
                      alt="Arrow Icon"
                      className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="relative inline-flex items-center">
                    <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap cursor-pointer">
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

                  <div className="text-center ">
                    <p className="text-sm text-gray-500 mb-2 max-w-xs mx-auto sm:mx-0">
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

              <div className="flex-1 flex justify-center max-w-md w-full">
                <img
                  src={search}
                  alt="Illustration"
                  className="hidden lg:block w-full max-w-xs sm:max-w-sm md:max-w-md"
                />
              </div>
            </div>

            {/* Category Buttons */}
            <div className="bg-white relative z-10 rounded-lg">
              <div
                className="text-center py-2 bg-white bg-no-repeat bg-center bg-contain mb-10"
                style={{ backgroundImage: `url(${productback})` }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1440]">
                  Product Categories
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  "Find the Right Tool for Every Task"
                </p>
                <div
                  ref={scrollRef}
                  className="mt-6 px-4 overflow-x-hidden whitespace-nowrap scrollbar-hide"
                  aria-label="Product categories"
                >
                  <div className=" inline-flex gap-4 min-w-max ">
                    {categories.map((cat) => {
                      const isActive = cat.id === activeCategory;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                            isActive
                              ? "bg-blue-200 text-[#0D1440]"
                              : "bg-gray-100 text-gray-600 hover:bg-blue-100"
                          }`}
                          aria-pressed={isActive}
                        >
                          <div
                            className={`text-lg p-2 rounded-full ${
                              isActive
                                ? "bg-[#0D1440] text-white"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {cat.icon}
                          </div>
                          <span className="text-sm font-medium">
                            {cat.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="w-full">
            <div
              className="relative py-12 px-4 text-center bg-[#cbdcf6] bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${Text})` }}
            >
              <img
                src={cloud2}
                alt="Cloud"
                className="hidden sm:block md:left-117 lg:left-149 xl:left-200 2xl:left-260 absolute top-15 right-180 w-30 opacity-80"
              />
              <img
                src={Text}
                alt="Folder"
                className="hidden sm:block md:left-50 lg:left-80 xl:left-130 2xl:left-190 absolute bottom-50 left-194 w-20 top-10 opacity-10 "
              />
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 flex justify-center items-center gap-2 relative z-10">
                  <div className="relative w-16 h-16">
                    <img
                      src={folder}
                      alt="icon"
                      className="hidden sm:block md:right-6 w-full h-full"
                    />
                    <img
                      src={cloud1}
                      alt="cloud"
                      className="hidden sm:block md:left-6 absolute top-7 -left-2 w-15 h-15 opacity-90"
                    />
                  </div>
                  <div className="justify-center items-center mr-15">
                    <p>
                      Product <br /> Categories
                    </p>
                  </div>
                </h2>
                <p className="text-gray-700 mt-2">
                  Digitize your documents and save time with this smart and
                  reliable tool.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {activeTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-5 py-3 rounded-full text-sm font-medium border bg-[#070742] text-white"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Link to="/Productfinder1">
            {/* Product Cards */}
            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white shadow rounded-[24px] overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-48 object-cover"
                      />
                      <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-gray-600 hover:text-black">
                        <FiExternalLink size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h2 className="font-bold text-lg text-gray-900">
                        {card.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-1">boosted by</p>
                      <p className="text-sm text-gray-600 mb-3">
                        {card.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {card.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between pt-2 pt-3">
                        <span className="font-medium text-black">
                          {card.price}
                        </span>
                        <span className="text-gray-700">
                          {card.date} / {card.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No products found in this category.
                </p>
              )}
            </div>
          </Link>
        </section>
      </div>
      <div className="max-w-7xl mx-auto p-2">
        <Support />
      </div>
      <Footer />
    </>
  );
};

export default ProductFinderHero;
