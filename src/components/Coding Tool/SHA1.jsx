import React, { useState } from "react";
import { IoLockClosedSharp } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
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

export default function Sha1EncryptDecrypt() {
  const [tab, setTab] = useState("decrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [commonPasswords, setCommonPasswords] = useState(true);
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [special, setSpecial] = useState(false);
  const [whitespace, setWhitespace] = useState(false);
  const [maxLength, setMaxLength] = useState(6);

  const handleDecrypt = () => {
    // Your decryption logic here
    setOutput(""); // Just a placeholder
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setIsCopied(false);
  };

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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

   const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteToggle = () => setIsFavorite(!isFavorite);

  return (
    <div className="max-w-4xl mx-auto mt-7 p-2">
      {/* Header */}
     <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <IoLockClosedSharp />


          </span>
          <span className="text-xl font-bold text-gray-900 md:text-sm lg:text-2xl sm:text-lg">
            SH1&nbsp;Encypter&nbsp;Decypter&nbsp;Generator
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

      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-8 py-2 rounded-t-lg font-semibold text-base transition ${
            tab === "encrypt"
              ? " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm"
              : "bg-white text-[#4f5fff]"
          }`}
          onClick={() => {
            setTab("encrypt");
            setShowSettings(false); // Hide settings when changing tabs
          }}
        >
          Encrypter
        </button>
        <button
          className={`px-8 py-2 rounded-t-lg font-semibold text-base transition ml-2 ${
            tab === "decrypt"
              ? " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm"
              : "bg-[#e7eafe] text-[#4f5fff]"
          }`}
          onClick={() => setTab("decrypt")}
        >
          Decrypter
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-4">
        {/* Input */}
        <div className="flex-1 bg-white rounded-xl border border-[#e7eafe] p-4 min-h-[180px] flex flex-col">
          <label className="text-gray-400 text-sm mb-2">
            {tab === "encrypt" ? "Text" : "SHA1 Hash"}
          </label>
          <textarea
            className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
            placeholder={tab === "encrypt" ? "Text" : "SHA1 Hash"}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <span className="text-gray-300 text-2xl">&raquo;</span>
        </div>
        {/* Output */}
        <div className="flex-1 bg-white rounded-xl border border-[#e7eafe] p-4 min-h-[180px] flex flex-col">
          <label className="text-gray-400 text-sm mb-2">
            {tab === "encrypt" ? "SHA1 Hash" : "Text"}
          </label>
          <textarea
            className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
            placeholder={tab === "encrypt" ? "SHA1 Hash" : "Text"}
            value={output}
            readOnly
          />
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto mt-2">
        {tab === "decrypt" && (
          <button
            onClick={toggleSettings}
            className={`px-6 py-4  bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm ${showSettings ? 'border-[#4f5fff] text-[#4f5fff]' : 'border-[#e7eafe] text-[#4f5fff]'} bg-white flex items-center`}
            style={{ minWidth: 180 }}
          >
            Decryption Settings
            <svg
              className={`ml-2 transition-transform ${showSettings ? 'rotate-180' : ''}`}
              width="16" 
              height="16" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <button
          className={`px-12 py-3 rounded-full text-base transition ${
            tab === "decrypt"
              ? " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg"
              : " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg"
          }`}
          onClick={tab === "decrypt" ? handleDecrypt : undefined}
        >
          {tab === "decrypt" ? "Decrypt >" : "Encrypt >"}
        </button>
        <button
          className="px-8 py-3  bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className={`px-9 py-3  bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg gap-2 transition${
            isCopied
              ? "text-green-600 bg-green-50 border-green-200"
              : "text-[#4f5fff] hover:bg-[#f3f0ff]"
          }`}
          onClick={handleCopy}
          disabled={!output}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      
      {/* Decryption Settings Panel */}
      {tab === "decrypt" && showSettings && (
        <div className="max-w-4xl mx-auto mb-4">
          <div className="bg-[#f8f8fe] border border-[#e7eafe] rounded-xl p-5">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={commonPasswords}
                onChange={() => setCommonPasswords(!commonPasswords)}
                className="mr-2 accent-[#bcbcff]"
                disabled
              />
              <span className="text-[#777] select-none">Check most common 100K passwords</span>
            </div>
            
            <div className="text-[#f43f5e] text-sm mb-3">
              Be careful, enabling following options may increase decryption time significantly!
            </div>
            
            <div className="text-[#666] mb-3">
              Include following character sets for creating combinations:
            </div>
            
            <div className="ml-1 mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={() => setLowercase(!lowercase)}
                  className="mr-2 accent-[#bcbcff]"
                />
                <span className="text-[#555]">Lowercase letters [a-z]</span>
              </div>
              
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={() => setUppercase(!uppercase)}
                  className="mr-2 accent-[#bcbcff]"
                />
                <span className="text-[#555]">Uppercase letters [A-Z]</span>
              </div>
              
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={() => setNumbers(!numbers)}
                  className="mr-2 accent-[#bcbcff]"
                />
                <span className="text-[#555]">Numbers [0-9]</span>
              </div>
              
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={special}
                  onChange={() => setSpecial(!special)}
                  className="mr-2 accent-[#bcbcff]"
                />
                <span className="text-[#555]">Special characters (!@#$% etc.)</span>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={whitespace}
                  onChange={() => setWhitespace(!whitespace)}
                  className="mr-2 accent-[#bcbcff]"
                />
                <span className="text-[#555]">Whitespace</span>
              </div>
            </div>
            
            <div className="flex items-center text-[#555] text-sm">
              <span className="mr-2">Max length of text to be decrypted: <b>{maxLength}</b></span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={maxLength}
                  onChange={(e) => setMaxLength(parseInt(e.target.value))}
                  className="w-full accent-[#bcbcff]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
