import React, { useState, useRef, useEffect,useContext } from "react";
import { HexColorPicker } from "react-colorful";
 import { PiFileCssLight } from "react-icons/pi";
import { TbBackground } from "react-icons/tb";
 import { FiShare2 } from "react-icons/fi";
 import { FiAlertCircle } from 'react-icons/fi';
 import {
  FaCheck,
  FaRegCopy,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
  FaRegStar,
} from "react-icons/fa6";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

const patternTypes = [
  {
    label: "Checks",
    value: "checks",
    icon: (
      <span className="inline-block w-5 h-5 bg-[repeating-conic-gradient(#000_0%_25%,#fff_0%_50%)] bg-[length:12px_12px] rounded"></span>
    ),
  },
  {
    label: "Grid",
    value: "grid",
    icon: (
      <span className="inline-block w-5 h-5 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[length:12px_12px] rounded"></span>
    ),
  },
  {
    label: "Dot",
    value: "dot",
    icon: (
      <span className="inline-block w-5 h-5 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[length:12px_12px] rounded"></span>
    ),
  },
  {
    label: "Cross Dots",
    value: "crossdots",
    icon: (
      <span className="inline-block w-5 h-5 bg-[radial-gradient(#000_1.5px,transparent_1.5px),radial-gradient(#000_1.5px,transparent_1.5px)] bg-[position:0_0,6px_6px] bg-[length:12px_12px] rounded"></span>
    ),
  },
  {
    label: "Vertical Lines",
    value: "vlines",
    icon: (
      <span className="inline-block w-5 h-5 bg-[repeating-linear-gradient(to_right,#000_0_2px,transparent_2px_6px)] bg-[length:8px_8px] rounded"></span>
    ),
  },
  {
    label: "Horizontal Lines",
    value: "hlines",
    icon: (
      <span className="inline-block w-5 h-5 bg-[repeating-linear-gradient(to_bottom,#000_0_2px,transparent_2px_6px)] bg-[length:8px_8px] rounded"></span>
    ),
  },
  {
    label: "Diagonal Lines",
    value: "dlines",
    icon: (
      <span className="inline-block w-5 h-5 bg-[repeating-linear-gradient(45deg,#000_0_2px,transparent_2px_8px)] bg-[length:10px_10px] rounded"></span>
    ),
  },
];

const defaultPatternColor = "#474bff";
const defaultBgColor = "#47d3ff";
const defaultPatternSize = 32;

// Generate CSS for the selected pattern
function getPatternCSS(type, patternColor, bgColor, patternSize) {
  switch (type) {
    case "checks":
      return `
background-image: repeating-conic-gradient(${patternColor} 0% 25%, ${bgColor} 0% 50%);
background-position: 0 0, ${patternSize}px ${patternSize}px;
background-size: ${patternSize * 2}px ${patternSize * 2}px;
background-color: ${bgColor};`.trim();
    case "grid":
      return `
background-image: linear-gradient(to right, ${patternColor} 1px, transparent 1px), linear-gradient(to bottom, ${patternColor} 1px, transparent 1px);
background-size: ${patternSize}px ${patternSize}px;
background-color: ${bgColor};`.trim();
    case "dot":
      return `
background-image: radial-gradient(${patternColor} 1.5px, transparent 1.5px);
background-size: ${patternSize}px ${patternSize}px;
background-color: ${bgColor};`.trim();
    case "crossdots":
      return `
background-image: radial-gradient(${patternColor} 1.5px, transparent 1.5px), radial-gradient(${patternColor} 1.5px, transparent 1.5px);
background-position: 0 0, ${patternSize / 2}px ${patternSize / 2}px;
background-size: ${patternSize}px ${patternSize}px;
background-color: ${bgColor};`.trim();
    case "vlines":
      return `
background-image: repeating-linear-gradient(to right, ${patternColor} 0 2px, transparent 2px ${patternSize}px);
background-size: ${patternSize}px ${patternSize}px;
background-color: ${bgColor};`.trim();
    case "hlines":
      return `
background-image: repeating-linear-gradient(to bottom, ${patternColor} 0 2px, transparent 2px ${patternSize}px);
background-size: ${patternSize}px ${patternSize}px;
background-color: ${bgColor};`.trim();
    case "dlines":
      return `
background-image: repeating-linear-gradient(45deg, ${patternColor} 0 2px, transparent 2px ${patternSize}px);
background-size: ${patternSize}px ${patternSize}px;
background-color: ${bgColor};`.trim();
    default:
      return "";
  }
}

// Generate background style object for the preview
function getBGStyle(type, patternColor, bgColor, patternSize) {
  return {
    backgroundImage: getPatternCSS(type, patternColor, bgColor, patternSize)
      .match(/background-image:[^;]+/g)?.[0]
      ?.split(": ")[1],
    backgroundSize: getPatternCSS(type, patternColor, bgColor, patternSize)
      .match(/background-size:[^;]+/g)?.[0]
      ?.split(": ")[1],
    backgroundColor: bgColor,
    backgroundPosition: getPatternCSS(type, patternColor, bgColor, patternSize).includes(
      "background-position"
    )
      ? getPatternCSS(type, patternColor, bgColor, patternSize)
          .match(/background-position:[^;]+/g)?.[0]
          ?.split(": ")[1]
      : undefined,
  };
}

// Generate random hex color
function randomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

export default function PatternGenerator({id="CSS Background Pattern"}) {
    const { updateFavorites } = useContext(FavoritesContext);
  const [patternType, setPatternType] = useState("checks");
  const [patternColor, setPatternColor] = useState(defaultPatternColor);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [patternSize, setPatternSize] = useState(defaultPatternSize);
  const [copied, setCopied] = useState(false);
  const [showPatternPicker, setShowPatternPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const patternPickerRef = useRef(null);
  const bgPickerRef = useRef(null);

  // Handle clicks outside color pickers to close them
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        patternPickerRef.current &&
        !patternPickerRef.current.contains(event.target)
      ) {
        setShowPatternPicker(false);
      }
      if (
        bgPickerRef.current &&
        !bgPickerRef.current.contains(event.target)
      ) {
        setShowBgPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShuffle = () => {
    setPatternColor(randomHexColor());
    setBgColor(randomHexColor());
  };

  const handleReset = () => {
    setPatternType("checks");
    setPatternColor(defaultPatternColor);
    setBgColor(defaultBgColor);
    setPatternSize(defaultPatternSize);
    setShowPatternPicker(false);
    setShowBgPicker(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      getPatternCSS(patternType, patternColor, bgColor, patternSize)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
   const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
   const onFavoriteToggle = () => {
        const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
        let newFavorites;
    
        if (favorites.includes(id)) {
          newFavorites = favorites.filter((favId) => favId !== id);
          setIsFavorite(false);
        } else {
          newFavorites = [...favorites, id];
          setIsFavorite(true);
        }
    
        localStorage.setItem("FavoriteTools", JSON.stringify(newFavorites));
        updateFavorites();
      };
    
      useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
        setIsFavorite(favorites.includes(id));
      }, [id]);

  return (
    <>
      {/* Custom styles for responsive color picker and range input */}
      <style>
        {`
          .color-picker-container {
            position: absolute;
            z-index: 10;
            margin-top: 0.5rem;
          }
          @media (max-width: 640px) {
            .color-picker-container {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              margin-top: 0;
            }
          }
          input[type="range"] {
            -webkit-appearance: none;
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            outline: none;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            background: #4b5e7e;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.2s;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            background: #3b4a6b;
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #4b5e7e;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.2s;
          }
          input[type="range"]::-moz-range-thumb:hover {
            background: #3b4a6b;
          }
          pre {
            max-height: 200px;
            overflow-x: auto;
            overflow-y: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto mt-7 p-2">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <TbBackground />

          </span>
          <span className="text-base font-bold text-gray-900 md:text-sm lg:text-2xl sm:text-lg">
            CSS&nbsp;Background&nbsp;Pattern&nbsp;Generator
          </span>
        </div>
        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
            onClick={() => setOpen(true)}
          >
            <FiAlertCircle className="text-indigo-600 text-base" />
            Report Bug
          </button>
          <button
            onClick={onFavoriteToggle}
            className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer border-indigo-600 ${isFavorite
              ? "bg-indigo-100 border-indigo-600 text-indigo-700"
              : "bg-indigo-50 border-indigo-300 text-indigo-600"
              }`}
          >
            {isFavorite ? (
              <>
                <FaCheck className="inline-block mr-1" size={12} /> Added
              </>
            ) : (
              <>
                <FaRegStar className="inline-block mr-1" size={12} /> Add to
                Favorites
              </>
            )}
          </button>
        </div>
      </div>
      {/* Share Popup */}
      {shareOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
            <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("tool")}
                className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "tool"
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  }`}
              >
                ⚙️ Share Tool
              </button>
              <button
                onClick={() => setActiveTab("home")}
                className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "home"
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  }`}
              >
                🏠 Share 10015
              </button>
            </div>
            <div className="text-center border border-gray-300 rounded-xl p-6">
              <p className="text-sm mb-1 text-gray-500">
                You are currently sharing:
              </p>
              <h2 className="text-xl font-semibold mb-5 text-gray-600">
                {activeTab === "tool"
                  ? "Google Fonts Pair Finder"
                  : "10015 Tools"}
              </h2>
              <div className="flex justify-center mb-6">
                <MdShare className="text-indigo-500 text-7xl" />
              </div>
              <div className="flex justify-center gap-4">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy].map(
                  (Icon, i) => (
                    <button
                      key={i}
                      className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                      <Icon />
                    </button>
                  )
                )}
              </div>
            </div>
            <button
              className="absolute top-0 h-2 w-2 right-4 text-gray-600 text-lg cursor-pointer"
              onClick={() => setShareOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bug Report Popup */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 flex justify-center items-center">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
            <h2 className="text-xl font-bold mb-2">Bug Report</h2>
            <p className="text-sm mb-4">
              <strong>Tool:</strong> Lorem Ipsum Generator
            </p>
            <label className="text-sm mb-1 block" htmlFor="bugDescription">
              Please describe the issue.
            </label>
            <textarea
              id="bugDescription"
              className="w-full p-3 border border-blue-300 rounded-xl text-base h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Description*"
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!bugDescription.trim()) {
                    alert("Please enter a description.");
                    return;
                  }
                  console.log("Bug description submitted:", bugDescription);
                  setOpen(false);
                  setBugDescription("");
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-5xl">
       
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* Pattern Preview */}
            <div
              className="w-full md:w-80 h-64 sm:h-80 rounded overflow-hidden border shadow-sm"
              style={getBGStyle(patternType, patternColor, bgColor, patternSize)}
            />
            <div className="flex-1 flex flex-col gap-4">
              {/* Pattern Type Selector */}
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">
                  Pattern Type
                </label>
                <select
                  className="border border-gray-200 rounded outline-none px-3 py-2 w-full text-sm sm:text-base"
                  value={patternType}
                  onChange={(e) => setPatternType(e.target.value)}
                >
                  {patternTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Pickers */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Pattern Color Picker */}
                <div className="relative w-full">
                  <label className="block font-medium mb-1 text-sm sm:text-base">
                    Pattern Color
                  </label>
                  <div
                    className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-white cursor-pointer shadow-sm"
                    onClick={() => {
                      setShowPatternPicker(!showPatternPicker);
                      setShowBgPicker(false);
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: patternColor }}
                    />
                    <span className="text-xs sm:text-sm font-mono">
                      {patternColor}
                    </span>
                  </div>
                  {showPatternPicker && (
                    <div className="color-picker-container" ref={patternPickerRef}>
                      <HexColorPicker
                        color={patternColor}
                        onChange={setPatternColor}
                      />
                    </div>
                  )}
                </div>

                {/* Background Color Picker */}
                <div className="relative w-full">
                  <label className="block font-medium mb-1 text-sm sm:text-base">
                    Background Color
                  </label>
                  <div
                    className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-white cursor-pointer shadow-sm"
                    onClick={() => {
                      setShowBgPicker(!showBgPicker);
                      setShowPatternPicker(false);
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: bgColor }}
                    />
                    <span className="text-xs sm:text-sm font-mono">
                      {bgColor}
                    </span>
                  </div>
                  {showBgPicker && (
                    <div className="color-picker-container" ref={bgPickerRef}>
                      <HexColorPicker color={bgColor} onChange={setBgColor} />
                    </div>
                  )}
                </div>
              </div>

              {/* Pattern Size Slider */}
              <div>
                <label className="block font-medium text-sm sm:text-base">
                  Pattern Size: {patternSize}px
                </label>
                <input
                  type="range"
                  min="8"
                  max="96"
                  value={patternSize}
                  onChange={(e) => setPatternSize(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={handleShuffle}
                  className="px-4 py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm sm:text-base min-w-[120px]"
                >
                  Shuffle Colors
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm sm:text-base min-w-[120px]"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* CSS Output */}
          <div className="mt-6 bg-gray-100 p-4 rounded relative">
            <span className="text-xs text-gray-400">CSS</span>
            <pre className="text-xs sm:text-sm mt-1">
              {getPatternCSS(patternType, patternColor, bgColor, patternSize)}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 px-3 py-1 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-xs sm:text-sm"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
        <Comment/>
    </>
  );
}