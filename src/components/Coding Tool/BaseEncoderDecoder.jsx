import  { useContext, useState, useRef, useEffect } from "react";
import { FiShare2, FiAlertCircle } from "react-icons/fi";
import { PiDatabaseBold } from "react-icons/pi";
import {
  FaCheck,
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

export default function Base64EncoderDecoder({ id = "Base64 Encoder Decoder Generator" }) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [tab, setTab] = useState("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isCopied, setIsCopied] = useState(false);

  // Encode function (handles Unicode)
  const handleEncode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setOutput("Invalid input for Base64 encoding.");
    }
  };

  // Decode function (handles Unicode)
  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setOutput("Invalid Base64 input for decoding.");
    }
  };

  // Reset function
  const handleReset = () => {
    setInput("");
    setOutput("");
    setIsCopied(false);
  };

  // Copy function with feedback
  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
      alert("Copy failed. Please try again.");
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
      <div className="max-w-4xl mx-auto mt-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <span className="text-4xl text-indigo-400">
              <PiDatabaseBold />
            </span>
            <span className="text-1xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-sm">
              Base&nbsp;Encoder&nbsp;Decoder&nbsp;Generator
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
              className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer ${isFavorite
                ? "bg-indigo-100 border-indigo-600 text-indigo-700"
                : "bg-indigo-50 border-indigo-600 text-indigo-600"
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


        <div className="mb-2 inline-flex rounded-lg bg-[#f3f4f8] p-1">
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${tab === "encode"
                ? "bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
                : "text-gray-500"
              }`}
            onClick={() => {
              setTab("encode");
              setOutput("");
              setIsCopied(false);
            }}
          >
            Encoder
          </button>
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${tab === "decode"
                ? "bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
                : "text-gray-500"
              }`}
            onClick={() => {
              setTab("decode");
              setOutput("");
              setIsCopied(false);
            }}
          >
            Decoder
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-4">
          {/* Input Area */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 min-h-[220px] flex flex-col">
            <label className="text-gray-400 text-sm mb-2">
              {tab === "encode" ? "Text" : "Base64"}
            </label>
            <textarea
              className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
              placeholder={tab === "encode" ? "Enter text here" : "Enter Base64 here"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <span className="text-gray-400 text-2xl">&raquo;</span>
          </div>
          {/* Output Area */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 min-h-[220px] flex flex-col">
            <label className="text-gray-400 text-sm mb-2">
              {tab === "encode" ? "Base64" : "Text"}
            </label>
            <textarea
              className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
              placeholder={tab === "encode" ? "Base64 output" : "Decoded text"}
              value={output}
              readOnly
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            className="px-6 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] rounded-lg cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="px-8 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] rounded-lg shadow cursor transition"
            onClick={tab === "encode" ? handleEncode : handleDecode}
          >
            {tab === "encode" ? "Encode →" : "Decode →"}
          </button>
          <button
            className={`px-6 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 transition cursor-pointer ${isCopied
                ? "bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
                : "bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
              }`}
            onClick={handleCopy}
            disabled={!output}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <rect
                x="7"
                y="7"
                width="10"
                height="10"
                rx="2"
                stroke="#2563eb"
                strokeWidth="2"
              />
              <rect
                x="3"
                y="3"
                width="10"
                height="10"
                rx="2"
                stroke="#2563eb"
                strokeWidth="2"
                opacity="0.4"
              />
            </svg>
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <Comment />
    </>
  );
}
