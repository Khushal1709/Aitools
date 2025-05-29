import React, { useState, useContext, useEffect } from "react";
import { ChromePicker } from "react-color";
import { PiFileCssLight } from "react-icons/pi";
import { MdGradient } from "react-icons/md";
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

const GradientGenerator = ({ id = "CSS Gradient Generator" }) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [startColor, setStartColor] = useState("#474bff");
  const [midColor, setMidColor] = useState("#8c6fff");
  const [endColor, setEndColor] = useState("#bc48ff");
  const [useMidColor, setUseMidColor] = useState(false);
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(0);
  const [reverse, setReverse] = useState(false);

  const presetGradients = [
    {
      name: "Default",
      startColor: "#474bff",
      endColor: "#bc48ff",
      midColor: "#8c6fff",
      useMid: false,
    },
    {
      name: "Warm Feelings",
      startColor: "#ff5e62",
      endColor: "#ff9966",
      midColor: "#ff7e5f",
      useMid: false,
    },
    {
      name: "Shiny Purple",
      startColor: "#5f2c82",
      endColor: "#7f7fd5",
      midColor: "#6a4d8f",
      useMid: false,
    },
    {
      name: "Candy Cake",
      startColor: "#ff758c",
      endColor: "#ff7eb3",
      midColor: "#ff7ea1",
      useMid: false,
    },
    {
      name: "Spring",
      startColor: "#00d2ff",
      endColor: "#3a7bd5",
      midColor: "#1fa7ea",
      useMid: false,
    },
    {
      name: "Metallic",
      startColor: "#e0e0e0",
      endColor: "#959595",
      midColor: "#c9c9c9",
      useMid: false,
    },
    {
      name: "Neon Green",
      startColor: "#00c9ff",
      endColor: "#92fe9d",
      midColor: "#50d18d",
      useMid: false,
    },
  ];

  const getGradient = () => {
    const colors = reverse
      ? [endColor, ...(useMidColor ? [midColor] : []), startColor]
      : [startColor, ...(useMidColor ? [midColor] : []), endColor];

    return `${type}-gradient(${
      type === "linear" ? `${angle}deg, ` : ""
    }${colors.join(", ")})`;
  };

  const handleShuffle = () => {
    const randomColor = () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    setStartColor(randomColor());
    setEndColor(randomColor());
    if (useMidColor) setMidColor(randomColor());
  };

  const handlePresetChange = (e) => {
    const selectedPreset = presetGradients.find(
      (preset) => preset.name === e.target.value
    );

    if (selectedPreset) {
      setStartColor(selectedPreset.startColor);
      setEndColor(selectedPreset.endColor);
      setMidColor(selectedPreset.midColor);
      setUseMidColor(selectedPreset.useMid);
    }
  };

  const cssOutput = `background: ${startColor};\nbackground: -webkit-${getGradient()};\nbackground: ${getGradient()};`;
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
      {/* Header */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl text-indigo-400 mt-3">
            <MdGradient />
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center sm:text-left mt-3">
            CSS Gradient Generator
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

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div
          className="w-full sm:w-64 h-48 sm:h-64 rounded shadow"
          style={{ background: getGradient() }}
        ></div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base">Preset Gradients</label>
            <select
              className="w-full border border-gray-200 rounded px-3 py-2 outline-none text-sm sm:text-base"
              onChange={handlePresetChange}
            >
              {presetGradients.map((preset, index) => (
                <option key={index} value={preset.name}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base">Start Color</label>
              <input
                type="color"
                value={startColor}
                onChange={(e) => setStartColor(e.target.value)}
                className="w-full h-10 p-0 border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base">End Color</label>
              <input
                type="color"
                value={endColor}
                onChange={(e) => setEndColor(e.target.value)}
                className="w-full h-10 p-0 border border-gray-200 rounded"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useMidColor}
              onChange={() => setUseMidColor(!useMidColor)}
              className="h-5 w-5"
            />
            <span className="text-sm sm:text-base">Use Mid Color</span>
            {useMidColor && (
              <input
                type="color"
                value={midColor}
                onChange={(e) => setMidColor(e.target.value)}
                className="h-8 w-12 sm:w-16 ml-2 border rounded"
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="linear"
                checked={type === "linear"}
                onChange={() => setType("linear")}
                className="h-5 w-5"
              />
              <span className="text-sm sm:text-base">Linear</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="radial"
                checked={type === "radial"}
                onChange={() => setType("radial")}
                className="h-5 w-5"
              />
              <span className="text-sm sm:text-base">Radial</span>
            </label>
          </div>

          {type === "linear" && (
            <div>
              <label className="block mb-1 text-sm sm:text-base">Angle: {angle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reverse}
              onChange={() => setReverse(!reverse)}
              className="h-5 w-5"
            />
            <span className="text-sm sm:text-base">Reverse</span>
          </div>

          <button
            onClick={handleShuffle}
            className="transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg px-6 py-2 w-full sm:w-auto"
          >
            Shuffle Colors
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1 text-sm sm:text-base">CSS</label>
        <pre className="border border-gray-200 bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap text-xs sm:text-sm">
          {cssOutput}
        </pre>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          className="w-full sm:w-40 px-6 py-3 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
          onClick={() => {
            setStartColor("#474bff");
            setEndColor("#bc48ff");
            setMidColor("#8c6fff");
            setUseMidColor(false);
            setType("linear");
            setAngle(0);
            setReverse(false);
          }}
        >
          Reset
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(cssOutput)}
          className="w-full sm:w-40 px-6 py-3 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
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
          .sm\\:w-64 {
            width: 100% !important;
          }
          .h-48 {
            height: 180px !important;
          }
          .sm\\:h-64 {
            height: 180px !important;
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
          .py-3 {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
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
          .h-8 {
            height: 1.75rem !important;
          }
          .w-12 {
            width: 2.5rem !important;
          }
          .sm\\:w-16 {
            width: 2.5rem !important;
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
          .sm\\:w-64 {
            width: 40% !important;
          }
          .sm\\:h-64 {
            height: 220px !important;
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

export default GradientGenerator;