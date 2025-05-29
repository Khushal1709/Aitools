import React, { useState, useEffect, useContext } from "react";
import { PiFileCssLight } from "react-icons/pi";
import { FaBoxArchive } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
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

const Cssboxshadowgenerator = ({ id = "CSS Box Shadow Generator" }) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [shape, setShape] = useState("box");
  const [hOffset, setHOffset] = useState(3);
  const [vOffset, setVOffset] = useState(3);
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(3);
  const [inset, setInset] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxColor, setBoxColor] = useState("#474bff");
  const [shadowColor, setShadowColor] = useState("#dddddd");

  // Define fixed shape sizes to fit inside preview
  const shapeStyles = {
    box: "rounded-md w-20 h-20 sm:w-24 sm:h-24",
    circle: "rounded-full w-20 h-20 sm:w-24 sm:h-24",
    header: "rounded-md w-28 h-8 sm:w-32 sm:h-10",
  };

  const shadowValue = `${inset ? "inset " : ""}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}`;

  const cssCode = `
-webkit-box-shadow: ${shadowValue};
-moz-box-shadow: ${shadowValue};
box-shadow: ${shadowValue};
`.trim();

  const handleReset = () => {
    setHOffset(3);
    setVOffset(3);
    setBlur(10);
    setSpread(3);
    setInset(false);
    setBgColor("#ffffff");
    setBoxColor("#474bff");
    setShadowColor("#dddddd");
    setShape("box");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode.trim());
    alert("CSS copied to clipboard!");
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
    <div className="w-full max-w-4xl mx-auto mt-6 px-4 sm:px-6 md:px-8">
      <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl">
        {/* Header */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl text-indigo-400">
              <FaBoxArchive />
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center">
              CSS&nbsp;Box&nbsp;Shadow&nbsp;Generator
            </span>
          </div>
          <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 md:mt-5 lg:justify-end lg:gap-2">
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center justify-center px-4 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition w-full sm:w-auto min-w-[120px]"
            >
              <FiShare2 className="mr-2" size={18} />
              Share
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition w-full sm:w-auto min-w-[120px]"
              onClick={() => setOpen(true)}
            >
              <FiAlertCircle className="text-indigo-600 text-base" />
              Report Bug
            </button>
            <button
              onClick={onFavoriteToggle}
              className={`flex items-center justify-center px-4 py-2 rounded-xl border text-sm cursor-pointer border-indigo-600 ${
                isFavorite
                  ? "bg-indigo-100 border-indigo-600 text-indigo-700"
                  : "bg-indigo-50 border-indigo-300 text-indigo-600"
              } hover:bg-indigo-100 transition w-full sm:w-auto min-w-[120px]`}
            >
              {isFavorite ? (
                <>
                  <FaCheck className="inline-block mr-1" size={12} /> Added
                </>
              ) : (
                <>
                  <FaRegStar className="inline-block mr-1" size={12} /> Add to Favorites
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Popup */}
        {shareOpen && (
          <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center px-4 py-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md">
              <div className="flex flex-col sm:flex-row justify-between mb-4 bg-indigo-50 p-1 rounded-xl gap-2">
                <button
                  onClick={() => setActiveTab("tool")}
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm ${
                    activeTab === "tool"
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  ⚙️ Share Tool
                </button>
                <button
                  onClick={() => setActiveTab("home")}
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm ${
                    activeTab === "home"
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  🏠 Share 10015
                </button>
              </div>
              <div className="text-center border border-gray-200 rounded-xl p-4 sm:p-6">
                <p className="text-sm mb-1 text-gray-500">You are currently sharing:</p>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-600">
                  {activeTab === "tool" ? "Google Fonts Pair Finder" : "10015 Tools"}
                </h2>
                <div className="flex justify-center mb-4 sm:mb-6">
                  <MdShare className="text-indigo-500 text-5xl sm:text-6xl" />
                </div>
                <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                  {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy].map((Icon, i) => (
                    <button
                      key={i}
                      className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-indigo-600 transition"
                    >
                      <Icon size={20} />
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="absolute top-3 right-3 text-gray-600 text-lg cursor-pointer"
                onClick={() => setShareOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Bug Report Popup */}
        {open && (
          <div className="fixed inset-0 bg-black/30 z-40 flex justify-center items-center px-4 py-6">
            <div className="bg-white w-full max-w-md p-4 sm:p-6 rounded-2xl shadow-lg relative">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Bug Report</h2>
              <p className="text-sm mb-4">
                <strong>Tool:</strong> Lorem Ipsum Generator
              </p>
              <label className="text-sm mb-1 block" htmlFor="bugDescription">
                Please describe the issue.
              </label>
              <textarea
                id="bugDescription"
                className="w-full p-3 border border-blue-300 rounded-xl text-sm sm:text-base h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                placeholder="Description*"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] rounded-lg hover:opacity-90 transition"
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
                  className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] rounded-lg hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Shape & Preview */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {["Box", "Circle", "Header"].map((type) => (
                <label key={type.toLowerCase()} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={type.toLowerCase()}
                    checked={shape === type.toLowerCase()}
                    onChange={(e) => setShape(e.target.value)}
                    className="h-5 w-5"
                  />
                  <span className="text-sm sm:text-base">{type}</span>
                </label>
              ))}
            </div>

            {/* Preview Area */}
            <div
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: bgColor,
                transition: "background 0.2s",
              }}
            >
              <div
                className={`${shapeStyles[shape]}`}
                style={{
                  backgroundColor: boxColor,
                  boxShadow: shadowValue,
                  transition: "all 0.2s",
                }}
              ></div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm sm:text-base">Horizontal Offset: {hOffset}px</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={hOffset}
                onChange={(e) => setHOffset(+e.target.value)}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base">Vertical Offset: {vOffset}px</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={vOffset}
                onChange={(e) => setVOffset(+e.target.value)}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base">Blur: {blur}px</label>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(+e.target.value)}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base">Spread: {spread}px</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(+e.target.value)}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Color & Inset */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm sm:text-base">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 sm:h-12 p-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base">Box Color</label>
              <input
                type="color"
                value={boxColor}
                onChange={(e) => setBoxColor(e.target.value)}
                className="w-full h-10 sm:h-12 p-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base">Shadow Color</label>
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-full h-10 sm:h-12 p-1 rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
                className="h-5 w-5"
              />
              <label className="text-sm sm:text-base">Inset</label>
            </div>
          </div>
        </div>

        {/* CSS Output */}
        <div className="border border-gray-200 bg-gray-100 p-4 rounded mt-6 font-mono text-xs sm:text-sm whitespace-pre-wrap overflow-x-auto">
          <h1 className="text-sm sm:text-base font-semibold mb-2">CSS</h1>
          {cssCode}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button
            onClick={handleReset}
            className="w-full sm:w-40 px-6 py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
          >
            Reset
          </button>
          <button
            onClick={handleCopy}
            className="w-full sm:w-40 px-6 py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
          >
            Copy
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Range input styling for consistency */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
        input[type="range"]::-ms-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }
        /* Ensure text doesn't overflow */
        pre {
          overflow-wrap: break-word;
          word-break: break-word;
        }
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .w-full {
            width: 100% !important;
          }
          .max-w-5xl {
            max-width: 100% !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .md\\:grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
          .sm\\:flex-row {
            flex-direction: column !important;
          }
          .sm\\:w-auto {
            width: 100% !important;
          }
          .sm\\:w-40 {
            width: 100% !important;
            max-width: 180px;
          }
          .w-32 {
            width: 7rem !important;
          }
          .h-32 {
            height: 7rem !important;
          }
          .sm\\:w-24 {
            width: 5rem !important;
          }
          .sm\\:h-24 {
            height: 5rem !important;
          }
          .w-20 {
            width: 5rem !important;
          }
          .h-20 {
            height: 5rem !important;
          }
          .sm\\:w-32 {
            width: 7rem !important;
          }
          .sm\\:h-10 {
            height: 2rem !important;
          }
          .w-28 {
            width: 6rem !important;
          }
          .h-8 {
            height: 1.75rem !important;
          }
          .text-lg {
            font-size: 1rem !important;
          }
          .text-xl {
            font-size: 1.125rem !important;
          }
          .text-2xl {
            font-size: 1.25rem !important;
          }
          .text-3xl {
            font-size: 1.5rem !important;
          }
          .text-4xl {
            font-size: 1.75rem !important;
          }
          .text-5xl {
            font-size: 2rem !important;
          }
          .text-6xl {
            font-size: 2.25rem !important;
          }
          .mb-6 {
            margin-bottom: 1.5rem !important;
          }
          .gap-6 {
            gap: 1.5rem !important;
          }
          .gap-4 {
            gap: 1rem !important;
          }
          .gap-3 {
            gap: 0.75rem !important;
          }
          .gap-2 {
            gap: 0.5rem !important;
          }
          .p-4 {
            padding: 0.75rem !important;
          }
          .p-6 {
            padding: 1rem !important;
          }
          .px-4 {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          .py-6 {
            padding-top: 1.25rem !important;
            padding-bottom: 1.25rem !important;
          }
          .px-6 {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
          .py-2 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }
          .text-sm {
            font-size: 0.875rem !important;
          }
          .text-base {
            font-size: 1rem !important;
          }
          .min-w-\\[120px\\] {
            min-width: 100% !important;
            max-width: 180px;
          }
          .h-10 {
            height: 2.25rem !important;
          }
          .sm\\:h-12 {
            height: 2.25rem !important;
          }
          .h-5 {
            height: 1.25rem !important;
          }
          .w-5 {
            width: 1.25rem !important;
          }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1rem !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .max-w-5xl {
            max-width: 90% !important;
          }
          .md\\:grid-cols-3 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .md\\:grid-cols-3 > div:last-child {
            grid-column: span 2;
          }
          .text-sm {
            font-size: 0.9rem !important;
          }
          .text-base {
            font-size: 1rem !important;
          }
          .gap-4 {
            gap: 1.25rem !important;
          }
          .gap-3 {
            gap: 0.875rem !important;
          }
        }
      `}</style>
    </div>
      <Comment />
      </>
  );
};

export default Cssboxshadowgenerator;