//TweetGenerator

import React, { useRef, useState,useContext,useEffect } from "react";
import html2canvas from 'html2canvas-pro';
import bule from "../../image/bule.png";
import { FaTwitterSquare } from "react-icons/fa";
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


const defaultAvatar = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

function TweetGenerator({id="Tweet Generator"}) {
      const { updateFavorites } = useContext(FavoritesContext);

    // State management
     
   const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
    const [theme, setTheme] = useState("Light");
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [tweetImages, setTweetImages] = useState([]);
    const [name, setName] = useState("John Doe");
    const [username, setUsername] = useState("johndoe");
    const [verified, setVerified] = useState(true);
    const [tweetDate, setTweetDate] = useState(
        new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    );
    const [tweetText, setTweetText] = useState(
        "This is a sample tweet. @mentions, #hashtags, https://links.com are all automatically converted."
    );
    const [replyCount, setReplyCount] = useState(0);
    const [retweetCount, setRetweetCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [exportMenuOpen, setExportMenuOpen] = useState(false);

    const previewRef = useRef();

    // Handle avatar upload
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar(URL.createObjectURL(file));
    };

    // Handle tweet images upload (up to 4)
    const handleTweetImagesUpload = (e) => {
        const files = Array.from(e.target.files).slice(0, 4);
        setTweetImages(files.map((file) => URL.createObjectURL(file)));
    };

    // Format tweet text (links/mentions/hashtags)
    const formatTweetText = (text) => {
        let formatted = text
            .replace(
                /@(\w+)/g,
                '<span class="text-blue-500 hover:underline cursor-pointer">@$1</span>'
            )
            .replace(
                /#(\w+)/g,
                '<span class="text-blue-500 hover:underline cursor-pointer">#$1</span>'
            )
            .replace(
                /(https?:\/\/[^\s]+)/g,
                '<span class="text-blue-500 hover:underline cursor-pointer">$1</span>'
            );
        return formatted;
    };

 
    const exportImage = async () => {
        setExportMenuOpen(false);

        try {
            // 1. Element को verify करें
            const element = previewRef.current;
            if (!element) {
                alert('Preview element not found!');
                return;
            }

            // 2. सभी images को लोड होने का इंतज़ार करें
            const images = element.querySelectorAll('img');
            await Promise.all([...images].map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
            }));

            // 3. html2canvas options अपडेट करें
            const canvas = await html2canvas(element, {
                useCORS: true,
                allowTaint: true,
                scale: 2, // HD quality
                logging: true, // Debugging के लिए
                backgroundColor: '#ffffff' // Transparent के लिए null की जगह
            });

            // 4. Temporary preview दिखाएं
            const previewWindow = window.open();
            previewWindow.document.write(`<img src="${canvas.toDataURL()}" />`);

            // 5. डाउनलोड प्रक्रिया
            const link = document.createElement('a');
            link.href = canvas.toDataURL("image/png");
            link.download = `tweet_${Date.now()}.png`;

            // Safari/iPhone के लिए special handling
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Export Error:', error);
            alert('डाउनलोड फेल हुआ! कृपया कंसोल चेक करें');
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
       <div className="max-w-4xl mx-auto p-3 md:py-7">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <span className="text-4xl text-indigo-400 mt-4">
                              <FaTwitterSquare />
                          </span>
                          <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-3">
                           Tweet&nbsp;Generator
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
                                      className={`w-1/2 px-4 py-2 rounded-xl  text-sm ${activeTab === "tool"
                                          ? "bg-indigo-600 text-white"
                                          : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                                          }`}
                                  >
                                      ⚙️ Share Tool
                                  </button>
                                  <button
                                      onClick={() => setActiveTab("home")}
                                      className={`w-1/2 px-4 py-2 rounded-xl  text-sm ${activeTab === "home"
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
                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-md p-2">
                    {/* Preview */}
                    <div
                        ref={previewRef}
                        className={`rounded-lg p-4 mb-6 border  border-gray-300 ${theme === "Dark" ? "bg-gray-900 text-white" : "bg-white text-black"
                            }`}
                    >
                        <div className="flex items-center mb-2">
                            <img
                                src={avatar}
                                alt="avatar"
                                className="w-12 h-12 rounded-full border  border-gray-300"
                            />
                            <div className="ml-3">
                                <div className="flex items-center gap-1">
                                    <span className="font-bold">{name}</span>
                                    {verified && (
                                        <span className="text-blue-500" title="Verified">
                                            <img src={bule} alt="" className="h-5 w-5"></img>
                                        </span>
                                    )}
                                    <span className="text-gray-500">@{username}</span>
                                    <span className="text-gray-400">· 1s</span>
                                </div>
                                <div className="text-xs text-gray-500">{tweetDate}</div>
                            </div>
                        </div>
                        <div
                            className="mt-2 mb-2"
                            dangerouslySetInnerHTML={{ __html: formatTweetText(tweetText) }}
                        />
                        {tweetImages.length > 0 && (
                            <div className="flex gap-2 mt-2">
                                {tweetImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`tweet-img-${idx}`}
                                        className="w-24 h-24 object-cover rounded-lg border  border-gray-300"
                                    />
                                ))}
                            </div>
                        )}
                        <div className="flex gap-4 mt-3 text-gray-500 text-sm">
                            <div>💬 {replyCount}</div>
                            <div>🔁 {retweetCount}</div>
                            <div>❤️ {likeCount}</div>
                            <div>👁️ {viewCount}</div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block font-medium mb-1 outline-none">Theme</label>
                            <select
                                className="w-full border  border-gray-300 rounded px-2 py-1 outline-none"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                            >
                                <option>Light</option>
                                <option>Dark</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Avatar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="block"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Tweet Images (up to 4)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleTweetImagesUpload}
                                className="block outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Name</label>
                            <input
                                className="w-full border  border-gray-300 rounded px-2 py-1 outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Username</label>
                            <input
                                className="w-full border  border-gray-300 rounded px-2 py-1 outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button
                                className={`mt-2 px-2 py-1 rounded ${verified
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-200 text-gray-500"
                                    }`}
                                onClick={() => setVerified((v) => !v)}
                                type="button"
                            >
                                {verified ? "Verified" : "Not Verified"}
                            </button>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Tweet Date</label>
                            <input
                            type="datetime-local"
                                className="w-full border  border-gray-300 rounded px-2 py-1 outline-none"
                                value={tweetDate}
                                onChange={(e) => setTweetDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Tweet Text</label>
                        <textarea
                            className="w-full border   border-gray-300  rounded px-2 py-1 outline-none"
                            rows={3}
                            value={tweetText}
                            onChange={(e) => setTweetText(e.target.value)}
                            maxLength={4000}
                        />
                        <div className="text-right text-xs text-gray-400">
                            {tweetText.length} / 4000
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block font-medium mb-1">Reply Count</label>
                            <input
                                type="number"
                                className="w-full border  border-gray-300 rounded px-2 py-1 outline-none"
                                value={replyCount}
                                onChange={(e) => setReplyCount(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Retweet Count</label>
                            <input
                                type="number"
                                className="w-full border   border-gray-300  rounded px-2 py-1 outline-none"
                                value={retweetCount}
                                onChange={(e) => setRetweetCount(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Like Count</label>
                            <input
                                type="number"
                                className="w-full border  border-gray-300  rounded px-2 py-1 outline-none"
                                value={likeCount}
                                onChange={(e) => setLikeCount(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">View Count</label>
                            <input
                                type="number"
                                className="w-full border  border-gray-300 rounded px-2 py-1 outline-none"
                                value={viewCount}
                                onChange={(e) => setViewCount(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Export Button & Dropdown */}
                    <div className="relative">
                        <button
                            className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]   px-6 py-2 rounded-lg"
                            onClick={() => setExportMenuOpen((v) => !v)}
                            type="button"
                        >
                            Export Tweet Image ▼
                        </button>
                        {exportMenuOpen && (
                            <div className="absolute left-0 mt-2 bg-white border  border-gray-300 rounded shadow w-56 z-10">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={exportImage}
                                >
                                    Download Image
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
                <Comment/>
                </>
    );
}

export default TweetGenerator;


