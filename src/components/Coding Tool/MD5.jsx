import React, { useState } from "react";
import MD5 from "crypto-js/md5";
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
import { LuSpline } from "react-icons/lu";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { IoLockClosedSharp } from "react-icons/io5";

// Demo dictionary for reverse lookup (expand as needed)
const md5Dictionary = {
  '5d41402abc4b2a76b9719d911017c592': 'hello',
  '098f6bcd4621d373cade4e832627b4f6': 'test',
  '202cb962ac59075b964b07152d234b70': '123',
  // Add more pairs as needed
};

export default function Md5EncryptDecrypt() {
  const [tab, setTab] = useState("encrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Helper to check valid MD5 hash
  const isValidMd5 = (str) =>
    /^[a-f0-9]{32}$/i.test(str);

  const handleEncrypt = () => {
    if (!input.trim()) {
      setError("Please enter text to encrypt.");
      setOutput("");
      return;
    }
    setError("");
    setOutput(MD5(input).toString());
    setIsCopied(false);
  };

  const handleDecrypt = () => {
    if (!input.trim()) {
      setError("Please enter an MD5 hash to decrypt.");
      setOutput("");
      return;
    }
    if (!isValidMd5(input.trim())) {
      setError("Input is not a valid MD5 hash.");
      setOutput("");
      return;
    }
    setError("");
    const found = md5Dictionary[input.trim().toLowerCase()];
    if (found) {
      setOutput(found);
    } else {
      setOutput("");
      setError("Original text not found in dictionary. True MD5 decryption is not possible.");
    }
    setIsCopied(false);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
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
                  MD5&nbsp;Encrypt/Decrypt
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

      {/* Large banner placeholder */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="w-full h-20 bg-[#f5f6fa] rounded-lg flex items-center justify-center text-gray-300 text-lg">
          {/* Ad Banner */}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-8 py-2 rounded-t-lg font-semibold text-base transition ${
            tab === "encrypt"
              ? " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg"
              : "bg-[#e7eafe] text-[#4f5fff]"
          }`}
          onClick={() => {
            setTab("encrypt");
            setInput("");
            setOutput("");
            setError("");
          }}
        >
          Encrypter
        </button>
        <button
          className={`px-8 py-2 rounded-t-lg font-semibold text-base transition ml-2 ${
            tab === "decrypt"
              ? " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg"
              : "bg-[#e7eafe] text-[#4f5fff]"
          }`}
          onClick={() => {
            setTab("decrypt");
            setInput("");
            setOutput("");
            setError("");
          }}
        >
          Decrypter
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-4">
        {/* Input */}
        <div className="flex-1 bg-white rounded-xl border border-[#e7eafe] p-4 min-h-[180px] flex flex-col">
          <label className="text-gray-400 text-sm mb-2">
            {tab === "encrypt" ? "Text" : "MD5 Hash"}
          </label>
          <textarea
            className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
            placeholder={tab === "encrypt" ? "Text" : "MD5 Hash"}
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
            {tab === "encrypt" ? "MD5 Hash" : "Text"}
          </label>
          <textarea
            className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
            placeholder={tab === "encrypt" ? "MD5 Hash" : "Text"}
            value={output}
            readOnly
          />
        </div>
      </div>

      {/* Error Message */}
      <div className="max-w-4xl mx-auto mb-2">
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto mt-2">
        <button
          className={`px-12 py-3 rounded-full font-semibold text-base transition ${
            tab === "encrypt"
              ? " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm"
              : " bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg text-sm"
          }`}
          onClick={tab === "encrypt" ? handleEncrypt : handleDecrypt}
        >
          {tab === "encrypt" ? "Encrypt >" : "Decrypt >"}
        </button>
        <button
          className="px-8 py-3  bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg transition"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className={`px-8 py-3  bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center gap-2 transition ${
            isCopied
              ? "text-green-600 bg-green-50 border-green-200"
              : "text-[#4f5fff] hover:bg-[#f3f0ff]"
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
              stroke="#4f5fff"
              strokeWidth="2"
            />
            <rect
              x="3"
              y="3"
              width="10"
              height="10"
              rx="2"
              stroke="#4f5fff"
              strokeWidth="2"
              opacity="0.4"
            />
          </svg>
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
