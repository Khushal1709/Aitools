import { useState, useRef, useEffect,useContext } from "react";
import { PiFileCssLight } from "react-icons/pi";
import { FiShare2 } from "react-icons/fi";
import { MdOutlineDocumentScanner } from "react-icons/md";
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

const shapes = {
  triangle: {
    points: [
      [50, 0],
      [100, 100],
      [0, 100],
    ],
    name: "Triangle",
  },
  circle: { points: [], name: "Circle" },
  ellipse: { points: [], name: "Ellipse" },
  inset: { points: [], name: "Rectangle" },
  pentagon: {
    points: [
      [50, 0],
      [100, 38],
      [82, 100],
      [18, 100],
      [0, 38],
    ],
    name: "Pentagon",
  },
  hexagon: {
    points: [
      [50, 0],
      [100, 25],
      [100, 75],
      [50, 100],
      [0, 75],
      [0, 25],
    ],
    name: "Hexagon",
  },
  heptagon: {
    points: [
      [50, 0],
      [90, 20],
      [100, 60],
      [75, 100],
      [25, 100],
      [0, 60],
      [10, 20],
    ],
    name: "Heptagon",
  },
  octagon: {
    points: [
      [30, 0],
      [70, 0],
      [100, 30],
      [100, 70],
      [70, 100],
      [30, 100],
      [0, 70],
      [0, 30],
    ],
    name: "Octagon",
  },
  nonagon: {
    points: [
      [50, 0],
      [83, 12],
      [100, 43],
      [93, 78],
      [68, 100],
      [32, 100],
      [7, 78],
      [0, 43],
      [17, 12],
    ],
    name: "Nonagon",
  },
  decagon: {
    points: [
      [50, 0],
      [80, 10],
      [100, 35],
      [100, 70],
      [80, 90],
      [50, 100],
      [20, 90],
      [0, 70],
      [0, 35],
      [20, 10],
    ],
    name: "Decagon",
  },
  bevel: {
    points: [
      [20, 0],
      [80, 0],
      [100, 20],
      [100, 80],
      [80, 100],
      [20, 100],
      [0, 80],
      [0, 20],
    ],
    name: "Bevel",
  },
  rabbet: {
    points: [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
      [15, 50],
    ],
    name: "Rabbet",
  },
  leftArrow: {
    points: [
      [40, 0],
      [40, 30],
      [100, 30],
      [100, 70],
      [40, 70],
      [40, 100],
      [0, 50],
    ],
    name: "Left Arrow",
  },
  rightArrow: {
    points: [
      [60, 0],
      [60, 30],
      [0, 30],
      [0, 70],
      [60, 70],
      [60, 100],
      [100, 50],
    ],
    name: "Right Arrow",
  },
  star: {
    points: [
      [50, 0],
      [61, 35],
      [98, 35],
      [68, 57],
      [79, 91],
      [50, 70],
      [21, 91],
      [32, 57],
      [2, 35],
      [39, 35],
    ],
    name: "Star",
  },
};

const imageSeeds = [101, 202, 303, 404, 505];

export default function ClipPathGenerator({id="CSS Clip Path Generator"}) {
    const { updateFavorites } = useContext(FavoritesContext);
  const [shape, setShape] = useState("triangle");
  const [width, setWidth] = useState(922);
  const [height, setHeight] = useState(400);
  const [customBackground, setCustomBackground] = useState(false);
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState("");
  const [showOutside, setShowOutside] = useState(false);
  const [hideGuides, setHideGuides] = useState(false);
  const [points, setPoints] = useState(shapes.triangle.points);
  const [draggingPoint, setDraggingPoint] = useState(null);
  const [clipPathCode, setClipPathCode] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
  });
  const previewRef = useRef(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [seed, setSeed] = useState(imageSeeds[0]);
  const [currentImage, setCurrentImage] = useState("");

  const getClipPathValue = (cssCode) => {
    if (!cssCode || !cssCode.includes(": ")) return "none";
    const parts = cssCode.split(": ");
    if (parts.length < 2) return "none";
    const value = parts[1].endsWith(";") ? parts[1].slice(0, -1) : parts[1];
    return value;
  };

  useEffect(() => {
    if (!customBackground) {
      setCurrentImage(`https://picsum.photos/seed/${seed}/1200/800`);
    } else if (customBackgroundUrl) {
      setCurrentImage(customBackgroundUrl);
    }
  }, [seed, customBackground, customBackgroundUrl]);

  useEffect(() => {
    if (shape === "circle") {
      setClipPathCode(`clip-path: circle(50% at 50% 50%);`);
    } else if (shape === "ellipse") {
      setClipPathCode(`clip-path: ellipse(50% 50% at 50% 50%);`);
    } else if (shape === "inset") {
      setClipPathCode(`clip-path: inset(10% 10% 10% 10% round 10px);`);
    } else {
      const polygonPoints = points
        .map((point) => `${point[0]}% ${point[1]}%`)
        .join(", ");
      setClipPathCode(`clip-path: polygon(${polygonPoints});`);
    }
  }, [shape, points]);

  const handleShapeChange = (e) => {
    const value = e.target.value;
    setShape(value);
    if (shapes[value]?.points) {
      setPoints(shapes[value].points);
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = Number.parseInt(e.target.value);
    setWidth(newWidth);
  };

  const handleHeightChange = (e) => {
    const newHeight = Number.parseInt(e.target.value);
    setHeight(newHeight);
  };

  const handleMouseDown = (index) => {
    setDraggingPoint(index);
  };

  const handleMouseMove = (e) => {
    if (draggingPoint === null || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = Math.min(
      100,
      Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.min(
      100,
      Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)
    );
    const newPoints = [...points];
    newPoints[draggingPoint] = [
      Number.parseFloat(x.toFixed(0)),
      Number.parseFloat(y.toFixed(0)),
    ];
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    setDraggingPoint(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(clipPathCode);
    setToastMessage({
      title: "Copied to clipboard",
      description: "CSS clip-path has been copied to your clipboard",
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (shapes[shape]?.points) {
      setPoints(shapes[shape].points);
    }
  };

  const handleShuffleImage = () => {
    const newSeed = Math.floor(Math.random() * 1000) + 1000;
    setSeed(newSeed);
    setSelectedImageIdx(-1);
    setCustomBackground(false);
    setCustomBackgroundUrl("");
  };

  const handleThumbnailSelect = (idx) => {
    setSelectedImageIdx(idx);
    setSeed(imageSeeds[idx]);
    setCustomBackground(false);
    setCustomBackgroundUrl("");
  };

  const handleSetCustomBackground = () => {
    if (customBackgroundUrl) {
      setCurrentImage(customBackgroundUrl);
      setToastMessage({
        title: "Custom Background Set",
        description: "The custom background image has been applied.",
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
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
    <div
      className="max-w-4xl mx-auto mt-7 p-2
"
    >
      {showToast && (
        <div className="fixed top-2 sm:top-4 right-2 sm:right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 sm:p-4 z-50 animate-fade-in-down">
          <div className="font-medium text-sm sm:text-base">
            {toastMessage.title}
          </div>
          {toastMessage.description && (
            <div className="text-xs sm:text-sm text-gray-500 mt-1">
              {toastMessage.description}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <MdOutlineDocumentScanner />
          </span>
          <span className="text-xl font-bold text-gray-900 md:text-sm lg:text-2xl sm:text-lg">
            CSS&nbsp;Clip&nbsp;Path&nbsp;Generator
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
      <div className="bg-slate-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">
              ClipPath Shape
            </label>
            <div className="relative">
              <select
                value={shape}
                onChange={handleShapeChange}
                className="block w-full px-3 sm:px-4 py-1 sm:py-2 pr-8 border border-gray-300 rounded-md focus:outline-none  appearance-none text-xs sm:text-sm"
              >
                {Object.entries(shapes).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">
                Image Width: {width}px
              </label>
              <input
                type="range"
                min="100"
                max="1200"
                step="1"
                value={width}
                onChange={handleWidthChange}
                className="w-full h-1 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">
                Image Height: {height}px
              </label>
              <input
                type="range"
                min="100"
                max="800"
                step="1"
                value={height}
                onChange={handleHeightChange}
                className="w-full h-1 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4 overflow-x-auto">
          {imageSeeds.map((s, idx) => (
            <img
              key={s}
              src={`https://picsum.photos/seed/${s}/80/60`}
              alt={`Thumbnail ${idx + 1}`}
              className={`rounded cursor-pointer border-2 transition ${
                selectedImageIdx === idx
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              style={{ width: 60, height: 45, objectFit: "cover" }}
              onClick={() => handleThumbnailSelect(idx)}
            />
          ))}
        </div>

        <div
          className={`relative rounded-lg overflow-hidden ${
            selectedImageIdx !== -1 ? "border-2 border-gray-200" : ""
          } mx-auto`}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "400px",
            maxHeight: "400px",
          }}
          ref={previewRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {showOutside && currentImage && (
            <div className="absolute inset-0">
              <img
                src={currentImage || "/placeholder.svg"}
                alt="Full image background"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  opacity: 0.3,
                  filter: "grayscale(50%)",
                  transform: "translate(-50%, -50%)",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/1200/800`;
                }}
              />
            </div>
          )}

          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: getClipPathValue(clipPathCode),
            }}
          >
            {currentImage && (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  key={`${seed}-${customBackgroundUrl}`}
                  src={currentImage || "/placeholder.svg"}
                  alt="Clip path preview"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/1200/800`;
                  }}
                />
              </div>
            )}
          </div>

          {!hideGuides &&
            shape !== "circle" &&
            shape !== "ellipse" &&
            shape !== "inset" &&
            points.map((point, index) => (
              <div
                key={index}
                className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-move"
                style={{ left: `${point[0]}%`, top: `${point[1]}%` }}
                onMouseDown={() => handleMouseDown(index)}
              />
            ))}
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4">
          <button
            onClick={handleShuffleImage}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-md flex items-center gap-1 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 sm:h-4 sm:w-4"
            >
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
              <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
              <path d="m18 14 4 4-4 4" />
            </svg>
            <span className="cursor-pointer">Shuffle Image</span>
          </button>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="customBackground"
              checked={customBackground}
              onChange={(e) => setCustomBackground(e.target.checked)}
              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="customBackground" className="text-xs sm:text-sm">
              Custom Background
            </label>
          </div>

          {customBackground && (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Background URL"
                value={customBackgroundUrl}
                onChange={(e) => setCustomBackgroundUrl(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSetCustomBackground}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Set
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showOutside"
              checked={showOutside}
              onChange={(e) => setShowOutside(e.target.checked)}
              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="showOutside" className="text-xs sm:text-sm">
              Show Outside
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hideGuides"
              checked={hideGuides}
              onChange={(e) => setHideGuides(e.target.checked)}
              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hideGuides" className="text-xs sm:text-sm">
              Hide Guides
            </label>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="mb-2 text-xs sm:text-sm font-medium">CSS Code</div>
        <pre className="bg-gray-50 p-2 sm:p-3 rounded text-xs sm:text-sm overflow-x-auto">
          <code>{clipPathCode}</code>
        </pre>
      </div>

      <div className="flex justify-center gap-3 sm:gap-4">
        <button
          onClick={handleReset}
          className="px-3 sm:px-4 py-1 sm:py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-xs sm:text-base"
        >
          Reset
        </button>
        <button
          onClick={handleCopy}
          className="px-3 sm:px-4 py-1 sm:py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center gap-2 text-xs sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 sm:h-4 sm:w-4"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          Copy
        </button>
      </div>
    </div>
      <Comment/>
      </>
  );
}
