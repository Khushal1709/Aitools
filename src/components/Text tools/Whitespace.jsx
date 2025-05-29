import React, { useState,useContext,useEffect } from "react";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
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
import Comment from "../Text tools/Comment";
import { BsScissors } from "react-icons/bs";
import { FiAlertCircle } from 'react-icons/fi';
import { FiShare2 } from "react-icons/fi";
import { FavoritesContext } from "../../Context/FavoriteContext";

export default function WhitespaceRemover({ id = "Multiple Whitespace Remove" }) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  // Remove multiple spaces, tabs, newlines
  const handleRemoveSpaces = () => {
    
    setOutput(text.replace(/\s+/g, " ").trim());
    setCopied(false);
  };

  // Reset both fields
  const handleReset = () => {
    setText("");
    setOutput("");
    setCopied(false);
  };

  // Copy output to clipboard
  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
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
    <div className="max-w-4xl mx-auto mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <span className="text-4xl text-indigo-400">
            <BsScissors />
          </span>
          </span>
          <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            Multiple&nbsp;Whitespace&nbsp;Remover
          </span>
        </div>

        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2">
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border  border-indigo-500 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
            >
              <FiShare2 className="mr-2" size={18} />
              Share
            </button>
            <button
              className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border  border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
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
            <p className="text-2xl font-bold text-gray-900 md:text-sm lg:text-2xl sm:text-lg">
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

      {/* Textarea for input */}
      <textarea
        className="w-full h-48 p-5 border border-gray-300 rounded-xl resize-none focus:outline-none text-gray-800 text-lg mb-4"
        placeholder="Enter your text..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setCopied(false);
        }}
      />

      {/* Output box (only show if output exists) */}
      {output && (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 mb-4 min-h-[48px]">
          {output}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-2">
        <button
          className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md cursor-pointer"
          onClick={handleRemoveSpaces}
          disabled={!text}
        >
          Remove Multiple Spaces
        </button>
        <div className="flex gap-2">
          <button
            className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md cursor-pointer"
            onClick={handleReset}
            disabled={!text && !output}
          >
            Reset
          </button>
          <button
            className={`bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md ${!output ? " cursor-not-allowed" : ""
              }`}
            onClick={handleCopy}
            disabled={!output}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>


      {/* Optional Comment Component */}
      <Comment />
    </div>
  );
}
