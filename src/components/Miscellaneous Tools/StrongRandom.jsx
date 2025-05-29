import React, { useState,useContext,useEffect } from "react";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import Comment from "../Text tools/Comment";
import { FiAlertCircle, FiShare2 } from "react-icons/fi";
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
import { FavoritesContext } from "../../Context/FavoriteContext";

// ... password generation logic remains unchanged
const SYMBOLS = "!#$%&*+-=?@^_";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const CONFUSING = "ilLI1o0O";
const AMBIGUOUS = "{}[]()/\\'\"`~,;:.<>";

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function generatePassword(options) {
  let chars = "";
  if (options.lowercase) chars += LOWERCASE;
  if (options.uppercase) chars += UPPERCASE;
  if (options.numbers) chars += NUMBERS;
  if (options.symbols) chars += SYMBOLS;

  if (!options.confusing) {
    chars = chars.split("").filter(c => !CONFUSING.includes(c)).join("");
  }
  if (!options.ambiguous) {
    chars = chars.split("").filter(c => !AMBIGUOUS.includes(c)).join("");
  }

  if (!chars) return "";

  let pwd = "";
  for (let i = 0; i < options.length; i++) {
    pwd += getRandomChar(chars);
  }
  return pwd;
}

function getStrength(length) {
  if (length < 6) return 0;
  if (length < 10) return 1;
  if (length < 14) return 2;
  return 3;
}

export default function PasswordGenerator({id="Strong Random Password Generator"}) {  
  const { updateFavorites } = useContext(FavoritesContext);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(8);

  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    confusing: false, // false means exclude
    ambiguous: false, // false means exclude
    length: 8,
  });

  const strength = getStrength(length);

  const handleGenerate = () => {
    const pwd = generatePassword(options);
    setPassword(pwd);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  const handleOptionChange = (key) => {
    const updated = { ...options, [key]: !options[key] };
    setOptions(updated);
  };

  const handleLengthChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setLength(val);
    setOptions({ ...options, length: val });
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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 bg-white mt-4 font-sans">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <BiSolidLock />
          </span>
          <h1 className="text-xl sm:text-2xl md:text-lg font-bold text-gray-900">
            Strong&nbsp;Random&nbsp;Password&nbsp;Generator
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

      {/* Length & Strength */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Password Length</label>
          <select
            value={length}
            onChange={handleLengthChange}
            className="w-full border border-gray-300 outline-none rounded px-2 py-1"
          >
            {[...Array(21).keys()].slice(4).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1">Password Strength</label>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className={`w-6 h-3 rounded ${
                  i <= strength
                    ? strength === 0
                      ? "bg-red-500"
                      : strength === 1
                      ? "bg-orange-400"
                      : "bg-green-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
            <span className="ml-2 text-xs font-semibold text-red-500">
              {strength === 0
                ? "Too weak"
                : strength === 1
                ? "Weak"
                : strength === 2
                ? "Medium"
                : "Strong"}
            </span>
          </div>
        </div>
      </div>

      {/* Share Popup */}
      {shareOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-2">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md relative overflow-y-auto max-h-[90vh]">
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
              <p className="text-sm mb-1 text-gray-500">You are currently sharing:</p>
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
              <strong>Tool:</strong> Password Generator
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

      {/* Options */}
      <div className="grid grid-cols-1 gap-3 mb-6 font-sans text-[1.08rem] leading-[1.7]">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={() => handleOptionChange("lowercase")}
            className="accent-indigo-500 w-5 h-5"
          />
          <span>
            Include <span className="font-semibold">lowercase</span> letters
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-mono tracking-wider text-gray-600">a b c d…</span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={() => handleOptionChange("uppercase")}
            className="accent-indigo-500 w-5 h-5"
          />
          <span>
            Include <span className="font-semibold">uppercase</span> letters
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-mono tracking-wider text-gray-600">A B C D…</span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={() => handleOptionChange("numbers")}
            className="accent-indigo-500 w-5 h-5"
          />
          <span>
            Include <span className="font-semibold">numbers</span>
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-mono tracking-wider text-gray-600">1 2 3 4…</span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={options.symbols}
            onChange={() => handleOptionChange("symbols")}
            className="accent-indigo-500 w-5 h-5"
          />
          <span>
            Include <span className="font-semibold">symbols</span>
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-mono tracking-wider text-gray-600">! # $ % &amp; * + - = ? @ ^ _</span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={!options.confusing}
            onChange={() => handleOptionChange("confusing")}
            className="accent-indigo-500 w-5 h-5"
          />
          <span>
            Exclude <span className="font-bold">confusing</span> characters
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-mono tracking-wider text-gray-600">i l L 1 o 0 O</span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={!options.ambiguous}
            onChange={() => handleOptionChange("ambiguous")}
            className="accent-indigo-500 w-5 h-5"
          />
          <span>
            Exclude <span className="font-semibold">ambiguous</span> characters
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-mono tracking-wider text-gray-600">{`{}[]()/\\'"~;:,.<>`}</span>
          </span>
        </label>
      </div>

      {/* Generate & Display */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <button
          className="w-full sm:w-auto bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer px-4 py-2 rounded"
          onClick={handleGenerate}
        >
          Generate Password
        </button>
        <input
          className="flex-1 border border-gray-300 outline-none rounded px-3 py-2 font-mono text-lg"
          value={password}
          readOnly
        />
        <button
          className="w-full sm:w-auto bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-3 py-2 rounded hover:bg-blue-200"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

    </div>
      <Comment />
      </>
  );
}
