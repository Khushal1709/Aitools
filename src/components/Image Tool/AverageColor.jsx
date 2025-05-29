import React, { useState, useContext, useEffect, useRef } from "react";
import { MdFormatColorFill } from "react-icons/md";
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
import { MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

// Helper functions for color calculations
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 1000) / 10,
    Math.round(l * 1000) / 10,
  ];
}

// Algorithm implementations
function getAverageColorSimple(data) {
  let r = 0,
    g = 0,
    b = 0,
    count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  return [
    Math.round(r / count),
    Math.round(g / count),
    Math.round(b / count),
  ];
}

function getAverageColorSqrt(data) {
  let r = 0,
    g = 0,
    b = 0,
    count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i] * data[i];
    g += data[i + 1] * data[i + 1];
    b += data[i + 2] * data[i + 2];
    count++;
  }
  return [
    Math.round(Math.sqrt(r / count)),
    Math.round(Math.sqrt(g / count)),
    Math.round(Math.sqrt(b / count)),
  ];
}

function getDominantColor(data) {
  // Simple dominant color: find the most common RGB value
  const colorMap = {};
  let maxCount = 0;
  let dominant = [0, 0, 0];
  for (let i = 0; i < data.length; i += 4) {
    const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
    if (colorMap[key] > maxCount) {
      maxCount = colorMap[key];
      dominant = [data[i], data[i + 1], data[i + 2]];
    }
  }
  return dominant;
}

const ALGORITHMS = [
  { name: "Simple", fn: getAverageColorSimple },
  { name: "Square Root", fn: getAverageColorSqrt },
  { name: "Dominant", fn: getDominantColor },
];

export default function AverageColor({ id = "Image Average Color Finder" }) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 }); // Default
  const [algorithm, setAlgorithm] = useState("Simple");
  const fileInputRef = useRef();

  // Calculate color when image or algorithm changes
  const calculateColor = (img) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
    const algo = ALGORITHMS.find((a) => a.name === algorithm);
    const [r, g, b] = algo.fn(imageData);
    setColor({ r, g, b });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageSrc(ev.target.result);
      const img = new window.Image();
      img.onload = () => {
        calculateColor(img);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Re-calculate color when algorithm changes
  useEffect(() => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.onload = () => {
      calculateColor(img);
    };
    img.src = imageSrc;
    // eslint-disable-next-line
  }, [algorithm]);

  // Color formats
  const { r, g, b } = color;
  const hex = rgbToHex(r, g, b);
  const rgba = `rgb(${r}, ${g}, ${b})`;
  const [h, s, l] = rgbToHsl(r, g, b);
  const hsla = `hsl(${h}, ${s}%, ${l}%)`;

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
    <div className="max-w-4xl mx-auto p-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400 mt-5">
            <MdFormatColorFill />
          </span>
          <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-5">
            Image&nbsp;Average&nbsp;Color&nbsp;Finder </span>
        </div>
        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 md:mt-5 lg:justify-end lg:gap-2">
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
            className={`px-3 py-2 rounded-xl border  text-sm mt-2 md:mt-0 ml-0 cursor-pointer ${isFavorite
              ? "bg-indigo-100 border-indigo-600 text-indigo-700"
              : "bg-indigo-50  text-indigo-600"
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
              className="w-full p-3 border border-gray-300 rounded-xl text-base h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"
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

      {/* Upload Box */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-8 mb-6">
        <label
          className="cursor-pointer flex flex-col items-center text-indigo-400"
          htmlFor="file-input"
        >
          <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2">
            <path d="M12 16v6h8v-6h5l-9-9-9 9h5z"></path>
            <path d="M20 21v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2"></path>
          </svg>
          <span>
            Drag your image here, or click to <span className="font-semibold">browse</span>
          </span>
          <input
            id="file-input"
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Image Preview */}
      {imageSrc && (
        <div className="bg-white border  border-gray-300 rounded-lg flex flex-col items-center py-4 px-2 mb-6">
          <img
            src={imageSrc}
            alt="preview"
            className="max-h-32 rounded mb-2 object-contain"
            style={{ maxWidth: "100%" }}
          />
          <div className="text-xs text-gray-500">{fileName}</div>
        </div>
      )}

      {/* Algorithm Switch */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-sm font-semibold mb-2">Algorithm</div>
        <div className="flex gap-6">
          {ALGORITHMS.map((algo) => (
            <label key={algo.name} className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="algorithm"
                value={algo.name}
                checked={algorithm === algo.name}
                onChange={() => setAlgorithm(algo.name)}
                className="accent-indigo-500"
              />
              <span className="text-gray-700">{algo.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Display */}
      <div className="flex flex-col items-center">
        <div
          className="rounded-lg w-32 h-32 mb-4 border border-gray-300"
          style={{ background: hex }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-sm border border-gray-300">
          <div className="bg-white rounded p-2 text-center border border-r-2 border-gray-300">
            <div className="text-xs text-gray-400">HEX</div>
            <div className="font-semibold">{hex}</div>
          </div>
          <div className="bg-white rounded p-2 text-center border-r-2 border-gray-300">
            <div className="text-xs text-gray-400">RGBA</div>
            <div className="font-semibold">{rgba}</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="text-xs text-gray-400">HSLA</div>
            <div className="font-semibold">{hsla}</div>
          </div>
        </div>
      </div>
    </div>
      <Comment />
      </>
  );
}
