import React, { useState,useContext,useEffect } from "react";
 import { PiFileCssLight } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa";
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

const Youtubethumbnailgrabber = ({id="YouTube Thumbnail Grabber"}) => {
    const { updateFavorites } = useContext(FavoritesContext);

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState("");

  // Extract YouTube video ID from URL
  const extractYoutubeId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  // Handle URL input change
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    setVideoData(null);
    setError("");

    if (!url) return;

    // Extract video ID and fetch thumbnails if valid
    const videoId = extractYoutubeId(url);
    if (videoId) {
      setVideoData({
        id: videoId,
        thumbnails: [
          {
            label: "Maximum Resolution",
            size: "1280x720",
            url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          },
          {
            label: "Standard Definition",
            size: "640x480",
            url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          },
          {
            label: "High Quality",
            size: "480x360",
            url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          },
          {
            label: "Medium Quality",
            size: "320x180",
            url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          },
          {
            label: "Default Thumbnail",
            size: "120x90",
            url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
          },
        ],
      });
    } else {
      setError("Please enter a valid YouTube URL");
    }
  };

  // Download thumbnail image
  const handleDownload = async (url, label) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${label
        .toLowerCase()
        .replace(/\s/g, "-")}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Failed to download image. Please try again.");
    }
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
    <div className="max-w-4xl mx-auto mt-7 p-2">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <FaYoutube />

          </span>
          <span className="text-lg font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            YouTube&nbsp;Thumbnail&nbsp;Grabber
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

        {/* Input field */}
        <div className="mb-4">
          <label
            htmlFor="youtubeUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            YouTube URL
          </label>
          <input
            type="text"
            id="youtubeUrl"
            placeholder="e.g. https://www.youtube.com/watch?v=XqZsoesa55w"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            value={youtubeUrl}
            onChange={handleUrlChange}
          />
        </div>

        {/* Results or Placeholder */}
        <div className="w-full min-h-[250px] bg-gray-100 rounded-md flex flex-col items-center justify-center p-2 sm:p-4">
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {videoData ? (
            <div className="w-full">
              <h2 className="text-center font-semibold text-lg mb-4">
                Available Thumbnails
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videoData.thumbnails.map((thumb, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow flex flex-col items-center">
                    <div className="mb-2 text-center">
                      <div className="font-medium text-base sm:text-lg">{thumb.label}</div>
                      <div className="text-sm text-gray-500">Size: {thumb.size}</div>
                    </div>
                    <img
                      src={thumb.url}
                      alt={`YouTube Thumbnail ${thumb.label}`}
                      className="rounded shadow w-full max-w-xs mb-3 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = videoData.thumbnails[2].url; // Fallback to hq if higher res not available
                        e.target.style.opacity = "0.7";
                        e.target.nextSibling.innerHTML =
                          "<small class='text-red-500'>This quality may not be available</small>";
                      }}
                    />
                    <div className="text-center mb-2"></div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
                      <button
                        className="w-full sm:w-auto px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        onClick={() => navigator.clipboard.writeText(thumb.url)}
                      >
                        Copy URL
                      </button>
                      <button
                        className="w-full sm:w-auto px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleDownload(thumb.url, thumb.label)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* YouTube logo SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-gray-400 mb-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              <div className="text-gray-500 text-center text-base">
                Enter a valid YouTube URL to see the thumbnails
              </div>
            </>
          )}
        </div>
      </div>
    </div>
      <Comment/>
      </>
  );
};

export default Youtubethumbnailgrabber;
