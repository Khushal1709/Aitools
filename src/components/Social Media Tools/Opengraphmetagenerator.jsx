import React, { useState,useContext,useEffect } from "react";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import { LuGitGraph } from "react-icons/lu";
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
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

const Opengraphmetagenerator = ({id="Open Graph Meta Generator"}) => {
    const { updateFavorites } = useContext(FavoritesContext);
  
  // State for form fields
  const [formData, setFormData] = useState({
    // Required fields
    title: "",
    type: "",
    url: "",
    image: "",

    // Optional fields
    siteName: "",
    description: "",
    videoUrl: "",
    audioUrl: "",
    determiner: "",
    locale: "",
  });

  // State for showing optional fields
  const [showOptional, setShowOptional] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for generated meta tags
  const [generatedTags, setGeneratedTags] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      title: "",
      type: "",
      url: "",
      image: "",
      siteName: "",
      description: "",
      videoUrl: "",
      audioUrl: "",
      determiner: "",
      locale: "",
    });
    setErrors({});
    setGeneratedTags("");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.url.trim()) newErrors.url = "URL is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate Open Graph meta tags
  const handleGenerate = () => {
    if (!validateForm()) return;

    let tags = `<!-- Open Graph Meta Tags -->\n`;
    tags += `<meta property="og:title" content="${formData.title}" />\n`;
    tags += `<meta property="og:type" content="${formData.type}" />\n`;
    tags += `<meta property="og:url" content="${formData.url}" />\n`;
    tags += `<meta property="og:image" content="${formData.image}" />\n`;

    // Add optional tags if they have values
    if (formData.siteName)
      tags += `<meta property="og:site_name" content="${formData.siteName}" />\n`;
    if (formData.description)
      tags += `<meta property="og:description" content="${formData.description}" />\n`;
    if (formData.videoUrl)
      tags += `<meta property="og:video" content="${formData.videoUrl}" />\n`;
    if (formData.audioUrl)
      tags += `<meta property="og:audio" content="${formData.audioUrl}" />\n`;
    if (formData.determiner)
      tags += `<meta property="og:determiner" content="${formData.determiner}" />\n`;
    if (formData.locale)
      tags += `<meta property="og:locale" content="${formData.locale}" />\n`;

    setGeneratedTags(tags);
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
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <LuGitGraph />
          </span>
          <span className="text-xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            Open&nbsp;Graph&nbsp;Meta&nbsp;Generator
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
                className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm  ${
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

      <div className="bg-white p-6 rounded-md shadow-sm">
        {/* Required Metadata Section */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4 text-gray-700">
            Required Metadata
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 border  outline-none ${
                  errors.title ? "border-red-500" : "border-gray-200"
                } rounded-md`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type<span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full p-2 border outline-none ${
                  errors.type ? "border-red-500" : "border-gray-200"
                } rounded-md`}
              >
                <option value="">Select Type</option> 
                <option value="website">Website</option>
                <option value="article">Article</option>
                <option value="book">Book</option>
                <option value="profile">Profile</option>
                <option value="music.song">Music Song</option>
                <option value="music.album">Music Album</option>
                <option value="music.playlist">Music Playlist</option>
                <option value="video.movie">Video Movie</option>
                <option value="video.episode">Video Episode</option>
                <option value="video.tv_show">Video TV Show</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-500 border-blue-200">
                  {errors.type}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL<span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className={`w-full p-2 border outline-none ${
                  errors.url ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.url && (
                <p className="mt-1 text-sm text-red-500">{errors.url}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image<span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full p-2 border outline-none ${
                  errors.image ? "border-red-500" : "border-gray-200"
                } rounded-md`}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        {/* Optional Metadata Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-medium text-gray-700">
              Optional Metadata
            </h2>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <span className="mr-2 text-sm text-gray-600">Show</span>
                <input
                  type="checkbox"
                  checked={showOptional}
                  onChange={() => setShowOptional(!showOptional)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
              </label>
            </div>
          </div>

          {showOptional && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  className="w-full p-2 border outline-none border-gray-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border outline-none border-gray-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Url
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full p-2 border outline-none border-gray-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audio Url
                </label>
                <input
                  type="url"
                  name="audioUrl"
                  value={formData.audioUrl}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Determiner
                </label>
                <input
                  type="text"
                  name="determiner"
                  value={formData.determiner}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Locale
                </label>
                <input
                  type="text"
                  name="locale"
                  value={formData.locale}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleReset}
            className="px-6 py-2 transition bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg  flex items-center"
          >
            Reset
          </button>
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] cursor-pointer rounded-lg flex items-center"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Generated Tags Output */}
      {generatedTags && (
        <div className="mt-6 bg-gray-800 rounded-md p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Generated Open Graph Meta Tags
          </h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
            {generatedTags}
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedTags);
              alert("Copied to clipboard!");
            }}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
      <Comment/>
      </>
  );
};

export default Opengraphmetagenerator;
