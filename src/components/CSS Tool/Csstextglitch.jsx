import React, { useState, useRef, useEffect, useContext } from 'react';
import { PiFileCssLight } from "react-icons/pi";
import { CgGoogle } from "react-icons/cg";
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

const CSSTextGlitchEffectGenerator = ({ id = "CSS Text Glitch" }) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [glitchEffect, setGlitchEffect] = useState('Glitch with Color');
  const [text, setText] = useState('glitch');
  const [fontSize, setFontSize] = useState(80);
  const [backgroundColor, setBackgroundColor] = useState('#222222');
  const [textColor, setTextColor] = useState('#ffffff');
  const [glitchColor1, setGlitchColor1] = useState('#00ffff');
  const [glitchColor2, setGlitchColor2] = useState('#ff00ff');
  const codeRef = useRef(null);

  const generateCode = () => {
    return `<div class="glitch-wrapper">
  <div class="glitch" data-glitch="${text}">${text}</div>
</div>

<style>
.glitch-wrapper {
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${backgroundColor};
  box-sizing: border-box;
  padding: clamp(16px, 5vw, 40px);
}
.glitch {
  position: relative;
  font-size: clamp(16px, 5vw, ${fontSize}px);
  font-weight: 700;
  line-height: 1.2;
  color: ${textColor};
  letter-spacing: clamp(0.05em, 0.1vw, 0.1em);
  z-index: 1;
  word-break: break-word;
  max-width: 90%;
}
.glitch:before, .glitch:after {
  display: block;
  content: attr(data-glitch);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
}
.glitch:before {
  animation: glitch-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: ${glitchColor1};
  z-index: -1;
}
.glitch:after {
  animation: glitch-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  color: ${glitchColor2};
  z-index: -2;
}
@keyframes glitch-color {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}
/* Responsiveness for smaller devices */
@media (max-width: 768px) {
  .glitch {
    font-size: clamp(14px, 4vw, ${fontSize * 0.8}px);
    letter-spacing: 0.08em;
  }
  .glitch-wrapper {
    padding: clamp(12px, 4vw, 32px);
    min-height: 40vh;
  }
}
@media (max-width: 480px) {
  .glitch {
    font-size: clamp(12px, 3.5vw, ${fontSize * 0.6}px);
    letter-spacing: 0.05em;
  }
  .glitch-wrapper {
    padding: clamp(8px, 3vw, 24px);
    min-height: 30vh;
  }
}
</style>`;
  };

  const handleReset = () => {
    setText('glitch');
    setFontSize(80);
    setBackgroundColor('#222222');
    setTextColor('#ffffff');
    setGlitchColor1('#00ffff');
    setGlitchColor2('#ff00ff');
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-7">
      {/* Header */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl text-indigo-400">
            <CgGoogle />
          </span>
          <h1 className="text-lg sm:text-xl md:text-lg font-bold text-gray-900 text-center sm:text-left">
            CSS Text Glitch Effect Generator
          </h1>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end md:mt-2 gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center px-4 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition w-full sm:w-auto"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition w-full sm:w-auto"
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
            } hover:bg-indigo-100 transition w-full sm:w-auto`}
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
            <div className="text-center border border-gray-300 rounded-xl p-4 sm:p-6">
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
                className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to۔[#E8D0FF] text-[#14143B] rounded-lg hover:opacity-90 transition"
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
      <div className="bg-white p-4 sm:p-6 rounded-md shadow-sm mb-6">
        {/* Controls Row */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Glitch Effect</label>
            <select
              className="w-full p-3 border border-gray-300 rounded outline-none text-sm"
              value={glitchEffect}
              onChange={(e) => setGlitchEffect(e.target.value)}
            >
              <option>Glitch with Color</option>
              <option>Simple Glitch</option>
              <option>RGB Glitch</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Text</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded outline-none text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Font Size: {fontSize}px</label>
            <input
              type="range"
              className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              min="20"
              max="150"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <div
            className="w-full flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: backgroundColor,
              padding: 'clamp(16px, 5vw, 40px)',
              minHeight: '30vh',
            }}
          >
            <div
              className="relative font-bold text-center"
              style={{
                fontSize: `clamp(12px, 3.5vw, ${fontSize}px)`,
                color: textColor,
                letterSpacing: 'clamp(0.05em, 0.1vw, 0.1em)',
                lineHeight: 1.2,
                wordBreak: 'break-word',
                maxWidth: '90%',
                width: '100%',
              }}
              data-glitch={text}
            >
              {text}
              <span
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  color: glitchColor1,
                  opacity: 0.8,
                  animation: 'glitch-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
                  zIndex: -1,
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                {text}
              </span>
              <span
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  color: glitchColor2,
                  opacity: 0.8,
                  animation: 'glitch-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite',
                  zIndex: -2,
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                {text}
              </span>
            </div>
          </div>
        </div>

        {/* Color Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Background Color</label>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: backgroundColor }}></div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded outline-none text-sm"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Text Color</label>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: textColor }}></div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded outline-none text-sm"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Glitch Color #1</label>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: glitchColor1 }}></div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded outline-none text-sm"
                value={glitchColor1}
                onChange={(e) => setGlitchColor1(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Glitch Color #2</label>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: glitchColor2 }}></div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded outline-none text-sm"
                value={glitchColor2}
                onChange={(e) => setGlitchColor2(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">HTML & CSS Code</label>
          <div className="border border-gray-300 rounded bg-gray-50 p-4 overflow-x-auto">
            <pre className="text-xs sm:text-sm whitespace-pre-wrap" ref={codeRef}>
              <code className="language-html">{generateCode()}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Button Row */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <button
          onClick={handleReset}
          className="w-full sm:w-40 px-6 py-3 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
        >
          Reset
        </button>
        <button
          className="w-full sm:w-40 px-6 py-3 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
          onClick={() => {
            navigator.clipboard.writeText(generateCode());
          }}
        >
          Copy
        </button>
      </div>

      {/* Animation keyframes for the preview */}
      <style jsx global>{`
        @keyframes glitch-color {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
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
        .glitch, pre {
          overflow-wrap: break-word;
          word-break: break-word;
        }
      `}</style>
    </div>
      <Comment />
      </>
  );
};

export default CSSTextGlitchEffectGenerator;