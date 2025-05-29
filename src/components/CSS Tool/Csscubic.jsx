import React, { useState, useRef, useEffect,useContext } from "react";
import { PiFileCssLight } from "react-icons/pi";
import { LuSpline } from "react-icons/lu";
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

const PRESETS = [
  { label: "linear", value: [0, 0, 1, 1] },
  { label: "ease", value: [0.25, 0.1, 0.25, 1] },
  { label: "ease-in", value: [0.42, 0, 1, 1] },
  { label: "ease-out", value: [0, 0, 0.58, 1] },
  { label: "ease-in-out", value: [0.42, 0, 0.58, 1] },
];

const DEFAULT = [0, 0, 1, 1];
const DEFAULT_DURATION = 1;

function formatNum(n) {
  return Number(n).toFixed(2).replace(/\.00$/, "");
}

export default function CubicBezierGenerator({id="CSS Cubic"}) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [points, setPoints] = useState(DEFAULT);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [preset, setPreset] = useState("linear");
  const [playing, setPlaying] = useState(false);
  const animRef = useRef(null);

  // SVG helpers
  const width = 180,
    height = 180,
    pad = 24;
  const toSvg = (x, y) => [
    pad + x * (width - 2 * pad),
    height - pad - y * (height - 2 * pad),
  ];

  // Animation
  useEffect(() => {
    if (animRef.current) {
      animRef.current.style.animation = "none";
      void animRef.current.offsetWidth;
      if (playing) {
        animRef.current.style.animation = `moveDot ${duration}s cubic-bezier(${points.join(
          ","
        )}) forwards`;
      }
    }
  }, [playing, points, duration]);

  // Handlers
  const handlePreset = (e) => {
    const val = e.target.value;
    setPreset(val);
    const found = PRESETS.find((p) => p.label === val);
    setPoints(found ? found.value : DEFAULT);
    setPlaying(false);
  };

  const handleSlider = (idx, val) => {
    const newPts = [...points];
    newPts[idx] = Number(val);
    setPoints(newPts);
    setPreset("custom");
    setPlaying(false);
  };

  const handleDuration = (val) => {
    setDuration(Number(val));
    setPlaying(false);
  };

  const handleReset = () => {
    setPoints(DEFAULT);
    setDuration(DEFAULT_DURATION);
    setPreset("linear");
    setPlaying(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `animation-timing-function: ${
        preset === "linear" ? "linear" : `cubic-bezier(${points.join(",")})`
      };\nanimation-duration: ${duration}s;`
    );
  };

  // SVG points
  const [sx, sy] = toSvg(0, 0);
  const [ex, ey] = toSvg(1, 1);
  const [p1x, p1y] = toSvg(points[0], points[1]);
  const [p2x, p2y] = toSvg(points[2], points[3]);

  const cssOut = `animation-timing-function: ${
    preset === "linear" ? "linear" : `cubic-bezier(${points.join(",")})`
  };\nanimation-duration: ${duration}s;`;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <LuSpline />

          </span>
          <span className="text-xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            CSS&nbsp;Cubic&nbsp;Bezier&nbsp;Generator
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
            className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer border-indigo-600 ${
              isFavorite
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
                className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${
                  activeTab === "tool"
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                ⚙️ Share Tool
              </button>
              <button
                onClick={() => setActiveTab("home")}
                className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${
                  activeTab === "home"
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

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* SVG Graph */}
          <div className="bg-[#f7f8fa] rounded-lg border px-4 py-3 flex flex-col items-center w-full max-w-md mx-auto">
            <svg width={width} height={height} className="mb-2">
              <line
                x1={pad}
                y1={height - pad}
                x2={width - pad}
                y2={height - pad}
                stroke="#d1d5db"
                strokeWidth="2"
              />
              <line
                x1={pad}
                y1={height - pad}
                x2={pad}
                y2={pad}
                stroke="#d1d5db"
                strokeWidth="2"
              />
              <path
                d={`M${sx},${sy} C${p1x},${p1y} ${p2x},${p2y} ${ex},${ey}`}
                stroke="#2563eb"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1={sx}
                y1={sy}
                x2={p1x}
                y2={p1y}
                stroke="#a7f3d0"
                strokeDasharray="2,2"
              />
              <line
                x1={ex}
                y1={ey}
                x2={p2x}
                y2={p2y}
                stroke="#fecaca"
                strokeDasharray="2,2"
              />
              <circle cx={sx} cy={sy} r="4" fill="#111" />
              <circle cx={ex} cy={ey} r="4" fill="#111" />
              <circle cx={p1x} cy={p1y} r="5" fill="#10b981" />
              <circle cx={p2x} cy={p2y} r="5" fill="#ef4444" />
              <text x={sx - 18} y={sy + 18} fontSize="12" fill="#555">
                (0,0)
              </text>
              <text x={ex + 6} y={ey - 8} fontSize="12" fill="#555">
                (1,1)
              </text>
              <text x={width / 2 - 18} y={height - 2} fontSize="13" fill="#888">
                Time
              </text>
              <text
                x={2}
                y={height / 2}
                fontSize="13"
                fill="#888"
                transform={`rotate(-90 10,${height / 2})`}
              >
                Progress
              </text>
            </svg>
            <div className="text-center mt-1">
              <div className="text-xs text-gray-500">
                Cubic Bezier Coordinates
              </div>
              <div className="font-mono text-lg font-bold">
                ({points.map(formatNum).join(", ")})
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Predefined Easing Functions
                </label>
                <select
                  className="w-full border border-gray-200 outline-none rounded px-2 py-1 bg-white text-gray-900"
                  value={preset}
                  onChange={handlePreset}
                >
                  {PRESETS.map((p) => (
                    <option key={p.label} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Animation Duration:{" "}
                  <span className="font-semibold text-gray-700">
                    {duration}s
                  </span>
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.01"
                  value={duration}
                  onChange={(e) => handleDuration(e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[0, 2].map((i, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-1 mb-1">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        i === 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        i === 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      Coordinates of P{i / 2 + 1} ({i === 0 ? "Green" : "Red"}{" "}
                      Dot)
                    </span>
                  </div>
                  <label className="block text-xs text-gray-500 mb-0.5">
                    X{i / 2 + 1}:{" "}
                    <span className="text-gray-700">
                      {formatNum(points[i])}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={points[i]}
                    onChange={(e) => handleSlider(i, e.target.value)}
                    className="w-full accent-blue-500"
                  />
                  <label className="block text-xs text-gray-500 mt-2 mb-0.5">
                    Y{i / 2 + 1}:{" "}
                    <span className="text-gray-700">
                      {formatNum(points[i + 1])}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={points[i + 1]}
                    onChange={(e) => handleSlider(i + 1, e.target.value)}
                    className="w-full accent-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animation Preview */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Animation Preview
          </label>
          <div className="flex items-center gap-3">
            <button
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <rect x="4" y="4" width="4" height="12" rx="1" />
                  <rect x="12" y="4" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <polygon points="5,3 17,10 5,17" />
                </svg>
              )}
            </button>
            <div className="relative flex-1 h-2 bg-gray-200 rounded overflow-hidden">
              <div
                ref={animRef}
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full shadow transition-transform"
                style={{
                  animation: playing
                    ? `moveDot ${duration}s cubic-bezier(${points.join(
                        ","
                      )}) forwards`
                    : "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* CSS Output */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1 ">
            CSS
          </label>
          <pre className="bg-[#f7f8fa] border border-gray-300 rounded px-3 py-2 font-mono text-sm text-gray-900 whitespace-pre mb-2 overflow-auto">
            {cssOut}
          </pre>
          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-1.5 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm flex items-center gap-1"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="px-4 py-1.5 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm font-semibold flex items-center gap-1"
              onClick={handleCopy}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <rect x="3" y="3" width="13" height="13" rx="2" />
              </svg>
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes moveDot {
          from { transform: translateX(0); }
          to { transform: translateX(92%); }
        }
      `}</style>
    </div>
  <Comment/>
  </>
  );
}
