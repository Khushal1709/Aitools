import React, { useState,useContext,useEffect } from "react";
 import { PiFileCssLight } from "react-icons/pi";
 import { PiFileJsxBold } from "react-icons/pi";
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
import { IoMdPhonePortrait } from "react-icons/io";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

// Scenic backgrounds for shuffle
const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // main
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
];

const defaultColor = "#22cc8a";

const users = [
  {
    name: "Kelli Hopkins",
    role: "Fashion Designer",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Craig Voss",
    role: "Software Developer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Debra J. Davis",
    role: "Marketing Specialist",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Joseph Armstrong",
    role: "Content Editor",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export default function GlassmorphismGenerator({id="CSS Glass Morphism"}) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [glassColor, setGlassColor] = useState(defaultColor);
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.5);
  const [useBorder, setUseBorder] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [useBasicShape, setUseBasicShape] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const rgb = hexToRgb(glassColor);
  const rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`;
  const borderColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.25)`;

  const glassStyle = {
    background: rgbaColor,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: useBorder ? `1px solid ${borderColor}` : "none",
  };

  const shuffleBackground = () => {
    setBgIndex((i) => (i + 1) % backgrounds.length);
  };

  const shuffleGlassColor = () => {
    // Generate a random pastel color
    const hue = Math.floor(Math.random() * 360);
    setGlassColor(
      `#${(
        (1 << 24) +
        (Math.floor(180 + Math.random() * 50) << 16) +
        (Math.floor(180 + Math.random() * 50) << 8) +
        Math.floor(180 + Math.random() * 50)
      )
        .toString(16)
        .slice(1)}`
    );
  };

  const reset = () => {
    setGlassColor(defaultColor);
    setBlur(10);
    setOpacity(0.5);
    setUseBorder(true);
    setShowContent(true);
    setUseBasicShape(false);
    setBgIndex(0);
  };

  const cssCode = `
background: rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity});
-webkit-backdrop-filter: blur(${blur}px);
backdrop-filter: blur(${blur}px);
${useBorder ? `border: 1px solid rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.25);` : ""}
`.trim();



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
    <div className="max-w-4xl mx-auto mt-7 p-2">
      <div className="max-w-4xl w-full">
         <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <IoMdPhonePortrait />

          </span>
          <span className="text-base font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            CSS&nbsp;Glassmorphism&nbsp;Generator
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
        <div className="flex flex-col md:flex-row gap-0">
          {/* Left: Background with Glass Card */}
          <div
            className="relative w-full md:w-1/2 aspect-square bg-cover bg-center rounded-xl overflow-hidden"
            style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
          >
            <div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] rounded-xl shadow-lg"
              style={glassStyle}
            >
              {showContent && (
                <div className="p-6 ">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-800 text-lg">
                      User List
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="6" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="18" r="1.5" />
                    </svg>
                  </div>
                  <ul className="space-y-4">
                    {users.map((user) => (
                      <li key={user.name} className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                        />
                        <div>
                          <div className="font-medium text-gray-800">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {user.role}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="w-full md:w-1/2 flex flex-col justify-between py-4 px-4">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Glass Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={glassColor}
                    onChange={(e) => setGlassColor(e.target.value)}
                    className="w-8 h-8 rounded border"
                  />
                  <input
                    type="text"
                    value={glassColor}
                    onChange={(e) => setGlassColor(e.target.value)}
                    className="w-28 p-1 border rounded"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Blur: {blur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={blur}
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Opacity: {opacity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="mb-4 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={useBorder}
                    onChange={() => setUseBorder((v) => !v)}
                    className="accent-blue-500"
                  />
                  Use border for glass
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showContent}
                    onChange={() => setShowContent((v) => !v)}
                    className="accent-blue-500"
                  />
                  Show content on glass?
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={useBasicShape}
                    onChange={() => setUseBasicShape((v) => !v)}
                    className="accent-blue-500"
                  />
                  Use basic shapes for preview
                </label>
              </div>

              <div className="mb-4 flex flex-col gap-3">
                <button
                  onClick={shuffleBackground}
                  className="w-full py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center gap-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Shuffle Background
                </button>
                <button
                  onClick={shuffleGlassColor}
                  className="w-full py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center gap-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Shuffle Glass Color
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Output */}
        <div className="mt-6 bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">CSS</h3>
          </div>
          <pre className="p-4 text-sm font-mono text-gray-700 overflow-x-auto">
            <span className="font-bold">background:</span> {`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity});`}
            {"\n"}<span className="font-bold">-webkit-backdrop-filter:</span> {`blur(${blur}px);`}
            {"\n"}<span className="font-bold">backdrop-filter:</span> {`blur(${blur}px);`}
            {useBorder && (
              <>
                {"\n"}
                <span className="font-bold">border:</span> {`1px solid rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.25);`}
              </>
            )}
          </pre>
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between">
            <button
              onClick={reset}
              className="px-6 py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center "
            >
              Reset
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(cssCode)}
              className="px-6 py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center "
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
      <Comment/>
      </>
  );
}
