import React, { useState, useEffect,useContext} from 'react';
import { IoColorFilterOutline } from "react-icons/io5";
import { MdShare } from "react-icons/md";
import {
  FaCheck,
  FaRegStar,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa6";
import Comment from "../Text tools/Comment";
import { FiAlertCircle, FiShare2 } from 'react-icons/fi';
import { FavoritesContext } from "../../Context/FavoriteContext";

const HexToRgbaConverter = ({ id="HEX to RGBA Converter" }) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [hex, setHex] = useState('#545454');
  const [rgba, setRgba] = useState('rgb(84, 84, 84)');
  const [hsla, setHsla] = useState('hsl(0, 0%, 32.9%)');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  const isValidHex = (value) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

  const hexToRgb = (hex) => {
    let hexClean = hex.replace('#', '');
    if (hexClean.length === 3) {
      hexClean = hexClean.split('').map((char) => char + char).join('');
    }
    const bigint = parseInt(hexClean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
        case g: h = ((b - r) / d + 2); break;
        case b: h = ((r - g) / d + 4); break;
        default: break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 1000) / 10
    };
  };

  const convert = () => {
    setError('');
    if (!isValidHex(hex)) {
      setRgba('');
      setHsla('');
      setError('Please enter a valid HEX color code (e.g., #123abc or #fff)');
      return;
    }
    try {
      const { r, g, b } = hexToRgb(hex);
      setRgba(`rgb(${r}, ${g}, ${b})`);
      const { h, s, l } = rgbToHsl(r, g, b);
      setHsla(`hsl(${h}, ${s}%, ${l}%)`);
    } catch (e) {
      setRgba('');
      setHsla('');
      setError('Conversion failed. Please check your HEX code.');
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = () => {
    if (rgba) {
      navigator.clipboard.writeText(rgba);
      setCopied(true);
    }
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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 mt-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <IoColorFilterOutline />
          </span>
          <h1 className="text-xl sm:text-2xl md:text-lg font-bold text-gray-900">
            HEX&nbsp;to&nbsp;RGBA&nbsp;Converter
          </h1>
        </div>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer"
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
            className={`px-3 py-2 rounded-xl border text-sm w-full sm:w-auto ${
              isFavorite
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
                <FaRegStar className="inline-block mr-1" size={12} /> Add to Favorites
              </>
            )}
          </button>
        </div>
      </div>

      {/* Share Popup */}
      {shareOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-2">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl max-w-xs sm:max-w-md w-full relative overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("tool")}
                className={`w-1/2 px-2 py-2 rounded-xl font-semibold text-sm ${
                  activeTab === "tool"
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                ⚙️ Share Tool
              </button>
              <button
                onClick={() => setActiveTab("home")}
                className={`w-1/2 px-2 py-2 rounded-xl font-semibold text-sm ${
                  activeTab === "home"
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
        <div className="fixed inset-0 bg-black/30 flex z-40 justify-center items-center p-2">
          <div className="bg-white max-w-xs sm:max-w-md w-full p-4 sm:p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Bug Report</h2>
            <p className="text-sm mb-4">
              <strong>Tool:</strong> Hex to RGBA Converter
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

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          className={`w-full sm:w-1/3 px-4 py-2 border border-gray-300 outline-none rounded-md ${error ? 'border-red-400' : ''}`}
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          placeholder="#545454"
          spellCheck={false}
        />
        <button
          onClick={convert}
          className="w-full sm:w-auto bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black px-6 py-2 rounded-md"
        >
          Convert
        </button>
        <input
          type="text"
          className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 outline-none rounded-md"
          value={rgba}
          readOnly
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-red-600 font-medium flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* Copy Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={copyToClipboard}
          disabled={!rgba}
          className={`w-full sm:w-auto bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer text-black px-6 py-2 rounded-md flex items-center gap-2
            ${!rgba ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-50'}
          `}
        >
          {copied ? 'Copied!' : 'Copy RGBA Color'}
        </button>
      </div>

      {/* Color Preview */}
      <div className="flex flex-col sm:flex-row items-stretch max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="w-full sm:w-1/2 h-20 sm:h-auto" style={{ backgroundColor: isValidHex(hex) ? hex : '#fff' }} />
        <div className="w-full sm:w-1/2 p-4 text-sm">
          <p className="mb-2"><strong>HEX</strong><br />{hex}</p>
          <p className="mb-2"><strong>RGBA</strong><br />{rgba}</p>
          <p><strong>HSLA</strong><br />{hsla}</p>
        </div>
      </div>
    </div>
      <Comment />
      </>
  );
};

export default HexToRgbaConverter;
