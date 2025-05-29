import React, { useState } from "react";
import { PiFileHtmlBold } from "react-icons/pi";
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

export default function UrlEncoderDecoder() {
  const [tab, setTab] = useState("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const onFavoriteToggle = () => setIsFavorite(!isFavorite);
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [bugDescription, setBugDescription] = useState("");

  // Encode or decode on button click
  const handleAction = () => {
    if (tab === "encode") {
      try {
        setOutput(encodeURIComponent(input));
      } catch {
        setOutput("Invalid input for URL encoding.");
      }
    } else {
      try {
        setOutput(decodeURIComponent(input));
      } catch {
        setOutput("Invalid input for URL decoding.");
      }
    }
    setIsCopied(false);
  };

  // Reset input/output
  const handleReset = () => {
    setInput("");
    setOutput("");
    setIsCopied(false);
  };

  // Copy output to clipboard
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

  return (
    <>
    <div className="max-w-4xl mx-auto mt-8">
      {/* Header */}
       <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <span className="text-4xl text-indigo-400">
                  <PiFileHtmlBold />
                </span>
                <h1 className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">URL&nbsp;Encoder&nbsp;Decoder</h1>
              </div>
              <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-6">
                 <button
                    onClick={() => setShareOpen(true)}
                    className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
                  >
                    <FiShare2 className="mr-2" size={18} />
                    Share
                  </button>
                 <button
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
                    onClick={() => setOpen(true)}
                  >
                    <FiAlertCircle className="text-indigo-600 text-base" />
                    Report Bug
                  </button>
                  
                <button
                  onClick={onFavoriteToggle}
                  className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ${isFavorite ? "bg-indigo-100 border-indigo-600 text-indigo-700" : "bg-indigo-50 border-indigo-600 text-indigo-600"
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
                    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-3">
                      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative ">
                        <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
                          <button onClick={() => setActiveTab("tool")} className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "tool" ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}>⚙️ Share Tool</button>
                          <button onClick={() => setActiveTab("home")} className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "home" ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}>🏠 Share 10015</button>
                        </div>
                        <div className="text-center border border-gray-300 rounded-xl p-6">
                          <p className="text-sm mb-1 text-gray-500">You are currently sharing:</p>
                          <h2 className="text-xl font-semibold mb-5 text-gray-600">{activeTab === "tool" ? "Google Fonts Pair Finder" : "10015 Tools"}</h2>
                          <div className="flex justify-center mb-6">
                            <MdShare className="text-indigo-500 text-7xl" />
                          </div>
                          <div className="flex justify-center gap-4">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy].map((Icon, i) => (
                              <button key={i} className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                                <Icon />
                              </button>
                            ))}
                          </div>
                        </div>
                        <button className="absolute top-0 h-2 w-2 right-4 text-gray-600 text-lg cursor-pointer" onClick={() => setShareOpen(false)}>✕</button>
                      </div>
                    </div>
                  )}
            
                  {/* Bug Report Popup */}
                  {open && (
                    <div className="fixed inset-0 bg-black/30 flex z-40 justify-center items-center">
                      <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
                        <h2 className="text-xl font-bold mb-2">Bug Report</h2>
                        <p className="text-sm mb-4"><strong>Tool:</strong> Lorem Ipsum Generator</p>
                        <label className="text-sm mb-1 block" htmlFor="bugDescription">Please describe the issue.</label>
                        <textarea
                          id="bugDescription"
                          className="w-full p-3 border border-gray-300 rounded-xl text-base h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="Description*"
                          value={bugDescription}
                          onChange={(e) => setBugDescription(e.target.value)}
                        />
                        <div className="flex justify-end gap-3 mt-4">
                          <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg">Cancel</button>
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
            

      {/* Tab Switch */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg bg-[#f3f4f8] p-1">
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${
              tab === "encode"
                ? "bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg"
                : "text-gray-500 hover:bg-[#e7eafe]"
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
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${
              tab === "decode"
                ? "bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg"
                : "text-gray-500 hover:bg-[#e7eafe]"
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
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-4">
        {/* Input Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 min-h-[220px] flex flex-col">
          <label className="text-gray-400 text-sm mb-2">
            {tab === "encode" ? "URL" : "Encoded URL"}
          </label>
          <textarea
            className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
            placeholder={tab === "encode" ? "Enter URL here" : "Enter encoded URL here"}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <span className="text-gray-400 text-2xl">&raquo;</span>
        </div>
        {/* Output Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 min-h-[220px] flex flex-col">
          <label className="text-gray-400 text-sm mb-2">
            {tab === "encode" ? "Encoded URL" : "URL"}
          </label>
          <textarea
            className="flex-1 resize-none outline-none bg-transparent text-gray-700 text-base"
            placeholder={tab === "encode" ? "Encoded URL" : "Decoded URL"}
            value={output}
            readOnly
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
        <button
          className="px-6 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg cursor-pointer transition flex items-center gap-2"
          onClick={handleReset}
        >
          <span className="text-lg"></span> Reset
        </button>
        <button
          className="px-8 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg cursor-pointer shadow hover:bg-[#4346b1] transition"
          onClick={handleAction}
        >
          {tab === "encode" ? "Encode \u2192" : "Decode \u2192"}
        </button>
        <button
          className={`px-6 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg cursor-pointer flex items-center gap-2 transition ${
            isCopied
              ? "text-green-600 bg-green-50 border-green-200"
              : "text-[#5b63e6] hover:bg-[#e7eafe]"
          }`}
          onClick={handleCopy}
          disabled={!output}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
      <Comment/>
      </>
  );
}
