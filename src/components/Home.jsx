import { useRef, useEffect } from "react";
import home1 from "../image/home1.svg";
import finder from "../image/finder.svg";
import leaf2 from "../image/leaf2.svg";
import men from "../image/men.svg";
import a1 from "../image/a1.svg";
import a2 from "../image/a2.svg";
import a3 from "../image/a3.svg";
import a4 from "../image/a4.svg";
import a5 from "../image/a5.svg";
import a6 from "../image/a6.svg";
import a7 from "../image/a7.svg";
import a8 from "../image/a8.svg";
import t1 from "../image/t1.svg";
import t2 from "../image/t2.svg";
import t3 from "../image/t3.svg";
import t4 from "../image/t4.svg";
import t5 from "../image/t5.svg";
import t6 from "../image/t6.svg";
import text2 from "../image/text2.svg";
import Textool1 from "../Pages/Text tool Grid/Texttool1";
import Imagestools1 from "../Pages/Image tool Grid/Imagetool1";
import CSStool1 from "../Pages/CSS tool Grid/CSStool1";
import Navbar from "./Navbar";
import Footer from "./Footer";
import firefox from "../image/firefox.svg";
import ston from "../image/ston.svg";
import { Link } from "react-router-dom";
import chrome from "../image/chrome.svg";
import leaf1 from "../image/leaf1.svg";
import explore from "../image/explore.svg";
import Oval2 from "../image/Oval2.svg";
import Codingtool1 from "../Pages/Coding tool Grid/Codingtool1";
import Colortool1 from "../Pages/Color tool Grid/Colortool1";
import Socialmediatool1 from "../Pages/Socialmedia tool Grid/Socialmediatool1";
import Miscellaneoustool1 from "../Pages/Miscellaneous tool Grid/Miscellaneoustool1";
import tool from "../image/tool.svg";
function Home() {
  const tools = [
    {
      title: "AI Color Palette Generator",
      icon: a1,
      bgColor: "bg-[#D5C7FF]",
      link: "/AIColor",
    },
    {
      title: "Tweet Generator",
      icon: a2,
      bgColor: "bg-[#AEDFFF]",
      link: "/TweetGenerator",
    },
    {
      title: "Bionic Reading Converter",
      icon: a3,
      bgColor: "bg-[#D5C7FF]",
      link: "/BionicReading",
    },
    {
      title: "Text to Handwriting Converter",
      icon: a4,
      bgColor: "bg-[#AEDFFF]",
      link: "/Text",
    },
    {
      title: "Code to Image Converter",
      icon: a5,
      bgColor: "bg-[#D5C7FF]",
      style: "absolute -top-4 -left-4 w-10 h-10",
      link: "/CodetoImage",
    },
    {
      title: "CSS Loader Generator",
      icon: a6,
      bgColor: "bg-[#AEDFFF]",
      link: "/Cssloader",
    },
    { title: "Image Caption Generator", icon: a7, bgColor: "bg-[#D5C7FF]" },
    {
      title: "Instagram Post Generator",
      icon: a8,
      bgColor: "bg-[#AEDFFF]",
      link: "/InstagramPostGenerator",
    },
    {
      title: "CSS Glassmorphism Generator",
      icon: a7,
      bgColor: "bg-[#D5C7FF]",
      link: "/Cssglassmorphism",
    },
    {
      title: "CSS Clip Path Generator",
      icon: a8,
      bgColor: "bg-[#AEDFFF]",
      link: "/Cssclippathgenerator",
    },
    {
      title: "Tweet Generator",
      icon: a7,
      bgColor: "bg-[#D5C7FF]",
      link: "/TweetGenerator",
    },
    {
      title: "SVG Pattern Generator",
      icon: a8,
      bgColor: "bg-[#AEDFFF]",
      link: "/SVGpattern",
    },
    {
      title: "CSS Background Pattern Generator",
      icon: a7,
      bgColor: "bg-[#D5C7FF]",
      link: "/CSSbackgroundpattern",
    },
    {
      title: "Photo Censor",
      icon: a8,
      bgColor: "bg-[#AEDFFF]",
      link: "/Photocensor",
    },
    {
      title: "Twitter Ad Revenue Generator",
      icon: a8,
      bgColor: "bg-[#D5C7FF]",
      link: "/Twitteradrevenuegenerator",
    },
  ];

  const categories = [
    { name: "Text Tools", icon: t1 },
    { name: "Image Tools", icon: t2 },
    { name: "CSS Tools", icon: t3 },
    { name: "Coding Tools", icon: t3 },
    { name: "Color Tools", icon: t4 },
    { name: "Social Media Tools", icon: t5 },
    { name: "Miscellaneous Tools", icon: t6 },
  ];

  const scrollRef = useRef(null);
  const Codingtools1Ref = useRef(null);
  const Textool1Ref = useRef(null);
  const CSStools1Ref = useRef(null);
  const Imagestools1Ref = useRef(null);
  const Colortool1Ref = useRef(null);
  const Socialmedia1Ref = useRef(null);
  const MiscTools1Ref = useRef(null);
  const featuredToolsRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let scrollAmount = 0;
    const scrollStep = 1;
    const maxScrollLeft =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scrollInterval = setInterval(() => {
      if (scrollAmount >= maxScrollLeft) {
        scrollAmount = 0;
      } else {
        scrollAmount += scrollStep;
      }
      scrollContainer.scrollLeft = scrollAmount;
    }, 100);

    return () => clearInterval(scrollInterval);
  }, []);

  // Scroll to section on category click
  const handleCategoryClick = (catName) => {
    if (catName === "Coding Tools" && Codingtools1Ref.current) {
      Codingtools1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (catName === "Text Tools" && Textool1Ref.current) {
      Textool1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (catName === "CSS Tools" && CSStools1Ref.current) {
      CSStools1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (catName === "Image Tools" && Imagestools1Ref.current) {
      Imagestools1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (catName === "Color Tools" && Colortool1Ref.current) {
      Colortool1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (catName === "Social Media Tools" && Socialmedia1Ref.current) {
      Socialmedia1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (catName === "Miscellaneous Tools" && MiscTools1Ref.current) {
      MiscTools1Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToFeaturedTools = () => {
    if (featuredToolsRef.current) {
      featuredToolsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="mx-auto">
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
        <Navbar />
        <img
          src={leaf1 || "/placeholder.svg"}
          alt="leav"
          className="top-15 absolute hidden lg:block"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              All Online Tools in <br />
              "One Box"
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              No need to bookmark the tools you like separately.
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              10015.io is a "free all-in-one toolbox" solution created to ease
              your life by preventing bookmark mess.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
              <div className="relative inline-flex items-center">
                <button
                  className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap"
                  onClick={scrollToFeaturedTools}
                >
                  EXPLORE TOOL
                </button>
                <img
                  src={explore || "/placeholder.svg"}
                  alt="Arrow Icon"
                  className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                />
              </div>
              <div className="relative inline-flex items-center">
                <Link to="/Productfinder">
                  <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap cursor-pointer">
                    PRODUCT FINDER
                  </button>
                </Link>
                <img
                  src={finder || "/placeholder.svg"}
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
                  <div className="text-red-600 font-semibold cursor-pointer hover:underline select-none">
                    SIGN IN
                  </div>
                </Link>
              </div>

              <div className="text-center">
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
              src={home1 || "/placeholder.svg"}
              alt="Illustration"
              className="hidden lg:block w-full max-w-xs sm:max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#BAD9FF] relative overflow-hidden">
        <div className="absolute right-0 top-1/4 opacity-5 pointer-events-none">
          <img
            src={leaf2 || "/placeholder.svg"}
            alt=""
            className="h-auto w-auto"
          />
          <img
            src={text2 || "/placeholder.svg"}
            alt=""
            className="h-auto w-auto"
          />
        </div>
        <div className="px-4 py-10 md:py-16">
          <div
            style={{ fontFamily: "David Libre" }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#0f172a] mb-4">
              Free Image to Text <br />
              Converter
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Digitize your documents and save time with this smart and reliable
              tool.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-16 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-2xl font-semibold text-center mb-6">
              Free Image To Text Converter
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              Convert images to editable text instantly with our Free Image to
              Text Converter. Using powerful OCR (Optical Character Recognition)
              technology, this tool allows you to extract text from any image -
              including scanned documents, photos, screenshots, or handwritten
              notes - with just a few clicks. No sign-up, no fees, and no
              hassle.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={featuredToolsRef}
        className="bg-white w-full overflow-hidden py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="mb-0 lg:mb-0 w-full md:w-2/4 lg:w-1/5">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy-900">
                Featured Tools
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                Top Tools, Handpicked for You
              </p>
              <p className="text-gray-500 mt-2">
                It's professional, user-focused, and conveys trust and quality.
              </p>
            </div>

            <div className="flex-shrink-0 mb-8 lg:mb-0">
              <img
                src={men || "/placeholder.svg"}
                alt="3D Character"
                className="h-auto w-40 md:w-52 lg:w-64 max-w-xs hidden lg:block"
              />
            </div>
            <div className="w-full overflow-hidden">
              <div
                ref={scrollRef}
                className="grid grid-flow-col grid-rows-2 auto-rows-fr gap-4 overflow-x-auto scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {tools.map((tool, index) => {
                  const content = (
                    <div
                      key={index}
                      className={`${tool.bgColor} rounded-2xl min-w-[260px] max-w-xs p-4 md:p-5 flex items-center space-x-3 transition-transform hover:scale-105`}
                    >
                      <img
                        src={tool.icon || "/placeholder.svg"}
                        className="w-10 h-10"
                        alt={tool.title}
                      />
                      <p className="text-sm font-semibold text-indigo-900 text-center w-full">
                        {tool.title}
                      </p>
                    </div>
                  );

                  return tool.link ? (
                    <Link to={tool.link} key={index}>
                      {content}
                    </Link>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Categories */}
      <div className="w-full py-6 bg-white overflow-hidden relative ">
        <div className="flex items-center justify-center  rounded-lg overflow-hidden z-50 relative">
          <img
            src={tool}
            alt="Tool Background"
            className=" opacity-100 relative h-[150px] md:h-[13rem]"
          />

          <div className="absolute md:top-12 left-0 w-full h flex flex-col items-center justify-center px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2B56]">
                Tool Categories
              </h2>
              <p className="text-gray-400 mt-1 text-sm md:text-base">
                "Find the Right Tool for Every Task"
              </p>
            </div>

            <div className="overflow-hidden w-full">
              <div
                className="flex w-max  space-x-6 animate-marquee"
                style={{ animation: "marquee 20s linear infinite" }}
              >
                {[...categories, ...categories].map((cat, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center px-6 py-3 cursor-pointer rounded-[2rem] bg-[#F6F5F8]  transition-all hover:bg-blue-200  border border-gray-200 opacity-80 duration-200 min-w-[200px] md:min-w-[260px]   max-w-xs"
                    onClick={() => handleCategoryClick(cat.name)}
                  >
                    <img
                      src={cat.icon || "/placeholder.svg"}
                      className="mr-3 flex items-center justify-center w-8 h-8 rounded-full shadow"
                      alt={cat.name}
                    />
                    <span className="font-medium text-base">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
    `}
        </style>
      </div>

      {/* ALL TOOLS SECTIONS */}
      <div className="max-w-7xl mx-auto">
        <div
          ref={Textool1Ref}
          // className="transition-transform duration-700 ease-out opacity-100"
        >
          <Textool1 />
        </div>
        <div ref={Imagestools1Ref}>
          <Imagestools1 />
        </div>
        <div ref={CSStools1Ref}>
          <CSStool1 />
        </div>
        <div ref={Codingtools1Ref}>
          <Codingtool1 />
        </div>
        <div ref={Colortool1Ref}>
          <Colortool1 />
        </div>
        <div ref={Socialmedia1Ref}>
          <Socialmediatool1 />
        </div>
        <div ref={MiscTools1Ref}>
          <Miscellaneoustool1 />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

