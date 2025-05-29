import React, { useState,useContext,useEffect } from "react";
import { PiFileCssLight } from "react-icons/pi";
import { IoLogoVimeo } from "react-icons/io";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
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


const Vimeothumbnailgrabber = ({id="Vimeo Thumbnail Grabber"}) => {
    const { updateFavorites } = useContext(FavoritesContext);
  const [vimeoUrl, setVimeoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper to validate and extract the video ID
  const extractVimeoId = (url) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? match[1] : null;
  };

  // Fetch video data when URL changes
  const handleUrlChange = async (e) => {
    const url = e.target.value;
    setVimeoUrl(url);
    setVideoData(null);
    setError("");
    if (!url) return;

    const id = extractVimeoId(url);
    if (!id) {
      setError("Please enter a valid Vimeo URL.");
      return;
    }
    setLoading(true);
    try {
      const api = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`;
      const res = await fetch(api);
      if (!res.ok) throw new Error("Could not fetch video data.");
      const data = await res.json();
      setVideoData(data);
    } catch (err) {
      setError("Failed to fetch video info. Please check the URL.");
    }
    setLoading(false);
  };

  // Download thumbnail image as file (handles CORS)
  const handleDownload = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image.");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "vimeo-thumbnail.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert(
        "Failed to download image. This may be blocked by Vimeo's CORS policy."
      );
    }
  };

  // Generate different thumbnail sizes
  const getThumbnailSizes = (originalUrl) => {
    const baseUrl = originalUrl.replace(/_\d+x\d+/, "");
    return [
      {
        label: "X-Large",
        size: "1920x1080",
        url: baseUrl.replace(/(\.\w+)$/, "_1920x1080$1"),
      },
      {
        label: "Medium",
        size: "640x360",
        url: baseUrl.replace(/(\.\w+)$/, "_640x360$1"),
      },
      {
        label: "Small",
        size: "320x180",
        url: baseUrl.replace(/(\.\w+)$/, "_320x180$1"),
      },
      {
        label: "Small",
        size: "240x135",
        url: baseUrl.replace(/(\.\w+)$/, "_240x135$1"),
      },
    ];
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
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white rounded-lg  p-2 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <span className="text-4xl text-indigo-400">
             <IoLogoVimeo />
            </span>
            <span className="text-xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
              Vimeo&nbsp;Thumbnail&nbsp;Grabber
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
                  {[
                    FaFacebookF,
                    FaTwitter,
                    FaLinkedinIn,
                    FaEnvelope,
                    FaCopy,
                  ].map((Icon, i) => (
                    <button
                      key={i}
                      className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                      <Icon />
                    </button>
                  ))}
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
      </div>

      <div className="w-full rounded mb-6" />

      <input
        type="text"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 text-gray-700 outline-none text-sm sm:text-base"
        placeholder="e.g. https://vimeo.com/22439234"
        value={vimeoUrl}
        onChange={handleUrlChange}
      />

      {/* Thumbnails or Placeholder */}
      <div className="w-full min-h-[180px] sm:min-h-[200px] bg-indigo-50 rounded flex flex-col items-center justify-center p-4 sm:p-6">
        {loading && <div className="text-indigo-400">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && videoData && (
          <div className="w-full">
            {/* Video Info */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded shadow text-left text-xs sm:text-base">
              <div>
                <strong>Title:</strong> {videoData.title}
              </div>
              <div>
                <strong>Description:</strong>{" "}
                {videoData.description?.slice(0, 80)}...
              </div>
              <div>
                <strong>Channel:</strong> {videoData.author_name}
              </div>
              <div>
                <strong>Duration:</strong>{" "}
                {videoData.duration
                  ? new Date(videoData.duration * 1000)
                      .toISOString()
                      .substr(14, 5)
                  : "N/A"}
              </div>
              <div>
                <strong>Uploaded at:</strong> {videoData.upload_date || "N/A"}
              </div>
            </div>

            {/* Multiple Thumbnail Sizes */}
            <div className="mb-2 sm:mb-4 text-center font-semibold text-base sm:text-lg">
              Thumbnails
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {getThumbnailSizes(videoData.thumbnail_url).map(
                (thumb, index) => (
                  <div
                    key={index}
                    className="mb-4 sm:mb-8 flex flex-col items-center"
                  >
                    <div className="mb-2 text-center text-xs sm:text-base">
                      {thumb.label}
                      <br />
                      Size: {thumb.size}
                    </div>
                    <img
                      src={thumb.url}
                      alt={`Vimeo Thumbnail ${thumb.size}`}
                      className="rounded shadow w-full max-w-xs sm:max-w-md md:max-w-lg h-auto mx-auto mb-2"
                    />
                    <div className="flex flex-row flex-wrap justify-center gap-2 mt-2">
                      <button
                        className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
                        onClick={() => navigator.clipboard.writeText(thumb.url)}
                      >
                        Copy URL
                      </button>
                      <button
                        className="px-2 sm:px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-xs sm:text-sm"
                        onClick={() => handleDownload(thumb.url)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {!loading && !error && !videoData && (
          <>
            {/* Vimeo logo SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 sm:h-14 sm:w-14 text-indigo-300 mb-2"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M29.9 7.1c-.2-1.9-1.7-3.1-4.2-3.4-3.3-.4-6.7 1.9-9.1 6.5-1 1.8-1.8 3.7-2.2 5.2-.4 1.6-.9 2.8-1.5 3.6-.5.7-1 .9-1.5.9-.4 0-.6-.4-.8-1.2-.1-.8.2-2.3 1.1-4.2l.2-.5-2.8-.9-.3.4c-.7 1.4-1.1 2.7-1.2 3.9-.2 1.6-.1 2.8.3 3.6.5 1.1 1.6 1.6 3 1.6 1.6 0 3-.9 4.3-2.8.4-.7.8-1.4 1.2-2.4.3-.8.6-1.6.9-2.1 1.5-2.7 3.4-4.1 5.4-4.1.9 0 1.4.3 1.5.8.1.4-.1 1.1-.8 1.9-.8.9-1.3 1.5-1.4 1.7-.2.4-.2.7-.1.9.1.3.5.4 1 .4.8 0 1.6-.3 2.2-1 .8-.9 1.3-2 1.1-3.3z" />
            </svg>
            <div className="text-indigo-400 text-center text-base font-medium">
              Enter a valid Vimeo URL to see the thumbnails
            </div>
          </>
        )}
      </div>
    </div>
      <Comment/>
      </>
  );
};

export default Vimeothumbnailgrabber;
