import React, { useContext, useEffect, useState } from "react";
import { VscCaseSensitive } from "react-icons/vsc";
import { FaCheck, FaRegStar, FaRegCopy, FaCopy, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import { FavoritesContext } from "../../Context/FavoriteContext";

function CaseConverter({ id = "Case Converter" }) {
  const { updateFavorites } = useContext(FavoritesContext);

  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toSentenceCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
    );
  };
  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()));
  };
  const toMixedCase = () => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += i % 2 === 0 ? text[i].toUpperCase() : text[i].toLowerCase();
    }
    setText(result);
  };
  const toInverseCase = () => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += char === char.toUpperCase()
        ? char.toLowerCase()
        : char.toUpperCase();
    }
    setText(result);
  };

  const handleReset = () => setText("");
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");

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
      <div className="max-w-4xl mx-auto mt-7 md:py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 ">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="text-4xl text-indigo-400">
              <VscCaseSensitive />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">Case&nbsp;Converter</h1>
          </div>
          <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-6">
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
            >
              <FiShare2 className="mr-2" size={18} />
              Share
            </button>
            {shareOpen && (
              <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-3">
                <div className="relative bg-white rounded-2xl p-6 shadow-xl max-w-md w-full">
                  {/* Header Tabs */}
                  <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
                    <button
                      onClick={() => setActiveTab("tool")}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1 w-1/2 justify-center cursor-pointer ${activeTab === "tool"
                        ? "bg-indigo-600 text-white "
                        : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                        }`}
                    >
                      ⚙️ Share Tool
                    </button>
                    <button
                      onClick={() => setActiveTab("home")}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1 w-1/2 justify-center cursor-pointer ${activeTab === "home"
                        ? "bg-indigo-600 text-white"
                        : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                        }`}
                    >
                      🏠 Share 10015
                    </button>
                  </div>

                  {/* Main Share Box */}
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
                      <button className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <FaFacebookF />
                      </button>
                      <button className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <FaTwitter />
                      </button>
                      <button className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <FaLinkedinIn />
                      </button>
                      <button className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <FaEnvelope />
                      </button>
                      <button className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <FaCopy />
                      </button>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    className="absolute top-0 h-2 w-2 right-4 text-gray-600 text-lg cursor-pointer"
                    onClick={() => setShareOpen(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {open && (
              <div className="fixed inset-0 absolute bg-black/30 z-50 opacity-100 flex justify-center items-center ">
                <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg relative">
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    Bug Report
                  </h2>
                  <p className="text-sm mb-4">
                    <strong>Tool:</strong> Tweet to Image Converter
                  </p>
                  <label
                    className="text-sm mb-1 block"
                    htmlFor="bugDescription"
                  >
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
                      className="px-4 py-2  border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black  rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!bugDescription.trim()) {
                          alert("Please enter a description.");
                          return;
                        }
                        // handle form submit here
                        console.log("Bug description submitted:", bugDescription);
                        setOpen(false);
                        setBugDescription("");
                      }}
                      className="px-4 py-2  border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border  border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
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
                  <FaRegStar className="inline-block mr-1" size={12} /> Add to Favorites
                </>
              )}
            </button>
          </div>
        </div>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-2xl text-base mb-5 h-40 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          placeholder="Enter your text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 mb-3">
          <button
            onClick={toSentenceCase}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-4 py-2 rounded-xl shadow-md cursor-pointer border-none"
          >
            Sentence case
          </button>
          <button
            onClick={toUpperCase}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            UPPER CASE
          </button>
          <button
            onClick={toLowerCase}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            lower case
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={toTitleCase}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            Title Case
          </button>
          <button
            onClick={toMixedCase}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            MiXeD CaSe
          </button>
          <button
            onClick={toInverseCase}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            iNvErSe cAsE
          </button>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            onClick={handleReset}
            disabled={!text}
            className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleCopy}
            disabled={!text}
            className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md flex items-center cursor-pointer"
          >
            {!copied ? (
              <>
                <FaRegCopy className="mr-1" />
                <span>Copy</span>
              </>
            ) : (
              <span>Copied!</span>
            )}
          </button>
        </div>
      </div>
      {/* Uncomment below if you have a Comment component */}
      <Comment />
    </>
  );
}

export default CaseConverter;
