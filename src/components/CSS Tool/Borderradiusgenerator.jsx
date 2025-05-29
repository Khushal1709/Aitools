import React, { useState, useRef, useEffect, useContext } from "react";
import { PiFileCssLight } from "react-icons/pi";
import { AiOutlineRadiusUpright } from "react-icons/ai";
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

const BorderRadiusGenerator = ({ id = "Border Radius Generator" }) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [corners, setCorners] = useState({
    topLeft: 25,
    topRight: 25,
    bottomRight: 25,
    bottomLeft: 25,
  });

  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [previewType, setPreviewType] = useState("Solid Color");
  const [mergeEdges, setMergeEdges] = useState(false);
  const [hideGuides, setHideGuides] = useState(false);

  const containerRef = useRef(null);
  const draggingCorner = useRef(null);

  // Function to compute border-radius value
  const getBorderRadius = () => {
    if (mergeEdges) {
      return "50% 50% 50% 50% / 50% 50% 50% 50%";
    }
    const { topLeft, topRight, bottomRight, bottomLeft } = corners;
    return `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}% / ${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
  };

  const handleCopy = () => {
    const code = `border-radius: ${getBorderRadius()};`;
    navigator.clipboard.writeText(code);
  };

  const handleReset = () => {
    setCorners({
      topLeft: 25,
      topRight: 25,
      bottomRight: 25,
      bottomLeft: 25,
    });
    setWidth(400);
    setHeight(400);
  };

  const handleMouseMove = (e) => {
    if (!draggingCorner.current || !containerRef.current) return;

    const box = document.getElementById("preview-box").getBoundingClientRect();
    const x = e.clientX - box.left;

    let percent = Math.min(Math.max(Math.round((x / box.width) * 100), 0), 50);
    if (
      draggingCorner.current === "topRight" ||
      draggingCorner.current === "bottomRight"
    ) {
      percent = 50 - percent;
    }

    setCorners((prev) => ({
      ...prev,
      [draggingCorner.current]: percent,
    }));
  };

  const handleMouseUp = () => {
    draggingCorner.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const startDrag = (corner) => {
    draggingCorner.current = corner;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getPreviewBackground = () => {
    switch (previewType) {
      case "Gradient":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "Image":
        return 'url("https://via.placeholder.com/400") center/cover no-repeat';
      case "Solid Color":
      default:
        return "#E6E7FA";
    }
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
    <div className="w-full max-w-4xl mx-auto mt-6 px-4 sm:px-5 md:px-8">
      {/* Header */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-3xl text-indigo-400 mt-4">
            <AiOutlineRadiusUpright />
          </span>
          <span className="text-lg sm:text-sm md:text-2xl font-bold text-gray-900 text-center sm:text-left mt-4">
            CSS Border Radius Generator
          </span>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 w-full sm:w-auto md:mt-3">
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

      {/* Preview Area */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div
          ref={containerRef}
          className="relative w-full flex justify-center items-center border border-gray-100 rounded overflow-hidden"
          style={{ height: "300px sm:400px" }}
        >
          <div
            id="preview-box"
            className="relative"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              borderRadius: getBorderRadius(),
              background: getPreviewBackground(),
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            {!hideGuides && !mergeEdges && (
              <>
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
                  style={{
                    left: `${corners.topLeft}%`,
                    top: 0,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseDown={() => startDrag("topLeft")}
                />
                <div
                  className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer"
                  style={{
                    right: `${corners.topRight}%`,
                    top: 0,
                    transform: "translate(50%, -50%)",
                  }}
                  onMouseDown={() => startDrag("topRight")}
                />
                <div
                  className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer"
                  style={{
                    right: `${corners.bottomRight}%`,
                    bottom: 0,
                    transform: "translate(50%, 50%)",
                  }}
                  onMouseDown={() => startDrag("bottomRight")}
                />
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
                  style={{
                    left: `${corners.bottomLeft}%`,
                    bottom: 0,
                    transform: "translate(-50%, 50%)",
                  }}
                  onMouseDown={() => startDrag("bottomLeft")}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4">
        <div>
          <label className="block text-sm sm:text-base text-gray-600 mb-1">Preview Type</label>
          <select
            className="w-full outline-none border border-gray-200 rounded py-2 px-3 "
            value={previewType}
            onChange={(e) => setPreviewType(e.target.value)}
          >
            <option>Solid Color</option>
            <option>Gradient</option>
          </select>
        </div>
        <div>
          <label className="block text-sm sm:text-base text-gray-600 mb-1">
            Width: {width}px
          </label>
          <input
            type="range"
            className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
            min="100"
            max="600"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm sm:text-base text-gray-600 mb-1">
            Height: {height}px
          </label>
          <input
            type="range"
            className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
            min="100"
            max="360"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col sm:flex-row sm:space-x-8 mb-6 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={mergeEdges}
            onChange={() => setMergeEdges(!mergeEdges)}
          />
          <span className="text-sm sm:text-base">Merge Edge Radiuses</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={hideGuides}
            onChange={() => setHideGuides(!hideGuides)}
          />
          <span className="text-sm sm:text-base">Hide Guides</span>
        </label>
      </div>

      {/* CSS Output */}
      <div className="mb-6">
        <label className="block text-sm sm:text-base text-gray-600 mb-1">CSS Code</label>
        <div className="border border-gray-200 rounded p-3 bg-gray-100 overflow-x-auto whitespace-pre-wrap">
          <code className="text-gray-800 text-xs sm:text-sm">
            border-radius: {getBorderRadius()};
          </code>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleReset}
          className="w-full sm:w-40 px-6 py-2 border border-gray-200 rounded-md bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg hover:opacity-90"
        >
          Reset
        </button>
        <button
          onClick={handleCopy}
          className="w-full sm:w-40 px-6 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg hover:opacity-90"
        >
          Copy
        </button>
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
        code {
          overflow-wrap: break-word;
          word-break: break-word;
        }
        /* Responsive adjustments for mobile (≤ 640px) */
        @media (max-width: 640px) {
          .w-full {
            width: 100% !important;
          }
          .max-w-4xl {
            max-width: 100% !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .sm\\:flex-row {
            flex-direction: column !important;
          }
          .sm\\:w-auto {
            width: 100% !important;
          }
          .sm\\:w-40 {
            width: 100% !important;
            max-width: 160px !important;
          }
          /* Adjust preview container height */
          .sm\\:400px {
            height: 180px !important;
          }
          /* Adjust drag handles for better touch interaction */
          .w-4 {
            width: 1.25rem !important;
          }
          .h-4 {
            height: 1.25rem !important;
          }
          /* Adjust font sizes for better readability */
          .text-lg {
            font-size: 0.9375rem !important; /* 15px */
          }
          .text-xl {
            font-size: 1.0625rem !important; /* 17px */
          }
          .text-2xl {
            font-size: 1.1875rem !important; /* 19px */
          }
          .text-3xl {
            font-size: 1.375rem !important; /* 22px */
          }
          .text-4xl {
            font-size: 1.625rem !important; /* 26px */
          }
          .text-5xl {
            font-size: 1.875rem !important; /* 30px */
          }
          .text-6xl {
            font-size: 2.125rem !important; /* 34px */
          }
          .text-sm {
            font-size: 0.8125rem !important; /* 13px */
          }
          .text-base {
            font-size: 0.9375rem !important; /* 15px */
          }
          /* Adjust spacing and padding */
          .mb-6 {
            margin-bottom: 1.25rem !important;
          }
          .gap-6 {
            gap: 1.25rem !important;
          }
          .gap-4 {
            gap: 0.875rem !important;
          }
          .gap-3 {
            gap: 0.625rem !important;
          }
          .gap-2 {
            gap: 0.375rem !important;
          }
          .p-4 {
            padding: 0.625rem !important;
          }
          .p-6 {
            padding: 0.875rem !important;
          }
          .px-4 {
            padding-left: 0.625rem !important;
            padding-right: 0.625rem !important;
          }
          .py-6 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          .px-6 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .py-2 {
            padding-top: 0.625rem !important;
            padding-bottom: 0.625rem !important;
          }
          /* Adjust button sizes for better touch targets */
          .min-w-\\[120px\\] {
            min-width: 100% !important;
            max-width: 160px !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
          /* Adjust checkbox sizes and spacing */
          .h-5 {
            height: 1.5rem !important;
          }
          .w-5 {
            width: 1.5rem !important;
          }
          .sm\\:space-x-8 {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          /* Adjust select and input elements for better touch interaction */
          select {
            padding: 0.625rem !important;
            font-size: 0.8125rem !important;
            height: 2.5rem !important;
          }
          input[type="range"] {
            height: 0.625rem !important;
          }
          input[type="range"]::-webkit-slider-thumb {
            width: 20px !important;
            height: 20px !important;
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px !important;
            height: 20px !important;
          }
          input[type="range"]::-ms-thumb {
            width: 20px !important;
            height: 20px !important;
          }
          /* Adjust textarea in popup */
          textarea {
            padding: 0.625rem !important;
            font-size: 0.8125rem !important;
            height: 6rem !important;
          }
          /* Adjust CSS output font size */
          .text-xs {
            font-size: 0.875rem !important; /* 14px */
          }
        }
        /* Tablet adjustments (641px - 1024px) remain unchanged */
        @media (min-width: 641px) and (max-width: 1024px) {
          .max-w-5xl {
            max-width: 90% !important;
          }
          .sm\\:400px {
            height: 300px !important;
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
          .w-4 {
            width: 1rem !important;
          }
          .h-4 {
            height: 1rem !important;
          }
          select {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
      <Comment />
      </>
  );
};

export default BorderRadiusGenerator;