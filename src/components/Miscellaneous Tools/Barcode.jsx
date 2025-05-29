import React, { useState, useRef,useContext,useEffect } from "react";
import Barcode from "react-barcode";
import { saveAs } from "file-saver";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
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
import { ImBarcode } from "react-icons/im";
import Comment from "../Text tools/Comment";
import { FiAlertCircle } from 'react-icons/fi';
import { FiShare2 } from "react-icons/fi";
import { FavoritesContext } from "../../Context/FavoriteContext";

const BarcodeGenerator = ({id="Bar Code Generator"}) => {
      const { updateFavorites } = useContext(FavoritesContext);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [barcodeFormat, setBarcodeFormat] = useState("CODE128");
  const [lineWidth, setLineWidth] = useState(2);
  const [lineHeight, setLineHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [generatedBarcode, setGeneratedBarcode] = useState("");
  const barcodeRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleGenerate = () => {
    if (barcodeValue.trim() === "") {
      alert("Please enter a value for the barcode");
      return;
    }
    setGeneratedBarcode(barcodeValue);
  };

  const handleReset = () => {
    setBarcodeValue("");
    setGeneratedBarcode("");
  };

  const handleDownload = () => {
    if (!barcodeRef.current) return;
    const svg = barcodeRef.current.firstChild;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = svg.width.baseVal.value;
    canvas.height = svg.height.baseVal.value;
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        saveAs(blob, `barcode-${barcodeValue}.png`);
      });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6 mt-2 sm:mt-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400 mt-3">
            <ImBarcode />
          </span>
          <h1 className="text-xl sm:text-2xl md:text-lg font-bold text-gray-900 mt-3">
            Bar&nbsp;Code&nbsp;Generator
          </h1>
        </div>
        <div className="flex flex-col w-full sm:w-auto md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
            onClick={() => setOpen(true)}
          >
            <FiAlertCircle className="text-indigo-600 text-base" />
            Report Bug
          </button>
          <button
            onClick={onFavoriteToggle}
            className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer ${isFavorite
              ? "bg-indigo-100 border-indigo-600 text-indigo-700"
              : "bg-indigo-50 border-indigo-500 text-indigo-600"
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
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center px-2">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl max-w-xs sm:max-w-md w-full relative">
            <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("tool")}
                className={`w-1/2 px-2 py-2 rounded-xl font-semibold text-sm ${activeTab === "tool"
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  }`}
              >
                ⚙️ Share Tool
              </button>
              <button
                onClick={() => setActiveTab("home")}
                className={`w-1/2 px-2 py-2 rounded-xl font-semibold text-sm ${activeTab === "home"
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  }`}
              >
                🏠 Share 10015
              </button>
            </div>
            <div className="text-center border border-gray-300 rounded-xl p-4 sm:p-6">
              <p className="text-sm mb-1 text-gray-500">
                You are currently sharing:
              </p>
              <h2 className="text-lg sm:text-xl font-semibold mb-5 text-gray-600">
                {activeTab === "tool"
                  ? "Google Fonts Pair Finder"
                  : "10015 Tools"}
              </h2>
              <div className="flex justify-center mb-6">
                <MdShare className="text-indigo-500 text-5xl sm:text-7xl" />
              </div>
              <div className="flex justify-center gap-3 sm:gap-4">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy].map(
                  (Icon, i) => (
                    <button
                      key={i}
                      className="text-white bg-indigo-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                    >
                      <Icon />
                    </button>
                  )
                )}
              </div>
            </div>
            <button
              className="absolute top-2 right-4 text-gray-600 text-lg cursor-pointer"
              onClick={() => setShareOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bug Report Popup */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-20 flex justify-center items-center px-2">
          <div className="bg-white w-full max-w-xs sm:max-w-md p-4 sm:p-6 rounded-2xl shadow-lg relative">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Bug Report</h2>
            <p className="text-sm mb-4">
              <strong>Tool:</strong> Lorem Ipsum Generator
            </p>
            <label className="text-sm mb-1 block" htmlFor="bugDescription">
              Please describe the issue.
            </label>
            <textarea
              id="bugDescription"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl text-base h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Description*"
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
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

      {/* Form & Barcode */}
      <div className="mt-6 sm:mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Barcode Value</label>
            <input
              type="text"
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 outline-none text-base"
              placeholder="Enter value for barcode"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Barcode Format</label>
            <select
              value={barcodeFormat}
              onChange={(e) => setBarcodeFormat(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 outline-none text-base"
            >
              <option value="CODE128">Code 128</option>
              <option value="CODE39">Code 39</option>
              <option value="EAN13">EAN-13</option>
              <option value="EAN8">EAN-8</option>
              <option value="UPC">UPC</option>
              <option value="CODE128A">Code 128 A</option>
              <option value="CODE128B">Code 128 B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Barcode Line Width: {lineWidth}px
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Barcode Line Height: {lineHeight}px
            </label>
            <input
              type="range"
              min="20"
              max="200"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseInt(e.target.value))}
              className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div className="flex items-center">
            <input
              id="display-value"
              type="checkbox"
              checked={displayValue}
              onChange={(e) => setDisplayValue(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="display-value" className="ml-2 block text-sm text-gray-700">
              Display Value
            </label>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-2 sm:mt-0">
            <button
              onClick={handleReset}
              className="py-2 px-4 rounded-md text-lg text-black border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] cursor-pointer flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset
            </button>
            <button
              onClick={handleGenerate}
              className="py-2 px-4 rounded-md text-lg text-black border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] cursor-pointer flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Generate
            </button>
          </div>
        </div>

        {/* Barcode Preview */}
        {generatedBarcode && (
          <div className="mt-8">
            <div className="flex justify-center p-2 sm:p-4 bg-gray-50 rounded-md overflow-x-auto" ref={barcodeRef}>
              <Barcode
                value={generatedBarcode}
                format={barcodeFormat}
                width={lineWidth}
                height={lineHeight}
                displayValue={displayValue}
                // Responsive SVG: allow barcode to shrink on small screens
                svgStyle={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleDownload}
                className="py-2 px-4 rounded-md text-lg text-black border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
      <Comment />
      </>
  );
};

export default BarcodeGenerator;
