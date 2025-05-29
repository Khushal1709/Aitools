import React, { useState, useRef,useContext,useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BsQrCode } from "react-icons/bs";
import Comment from "../Text tools/Comment";
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
import { FiAlertCircle, FiShare2 } from "react-icons/fi";
import { MdShare } from "react-icons/md";
import { FavoritesContext } from "../../Context/FavoriteContext";

export default function QRCodeGenerator({id="QR Code Generator"}) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [text, setText] = useState("");
  const qrRef = useRef();
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
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
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400 mt-4">
            <BsQrCode />
          </span>
          <h1 className="text-xl sm:text-2xl md:text-lg font-bold text-gray-900 mt-4">
            QR&nbsp;Code&nbsp;Generator
          </h1>
        </div>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 cursor-pointer"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
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
                : "bg-indigo-50 border-indigo-600 text-indigo-600"
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
          <div className="bg-white w-full max-w-xs sm:max-w-md p-4 sm:p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Bug Report</h2>
            <p className="text-sm mb-4">
              <strong>Tool:</strong> Lorem Ipsum Generator
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
                  // Submit logic here
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

      {/* Input and QR Code */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="URL or text"
          className="w-full p-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300"
        />
        <button
          onClick={() => setText("")}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div
        ref={qrRef}
        className="bg-white rounded-xl p-4 sm:p-6 flex justify-center items-center mx-auto max-w-xs sm:max-w-sm"
      >
        <QRCodeCanvas
          value={text || " "}
          size={220}
          bgColor="#ffffff"
          fgColor="#333333"
          level="M"
          includeMargin={false}
          style={{ width: "100%", height: "auto", maxWidth: 220 }}
        />
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] rounded-full px-6 py-3 cursor-pointer w-full sm:w-auto"
        >
          Download QR Code
        </button>
      </div>
    </div>
      <Comment />
      </>
  );
}
