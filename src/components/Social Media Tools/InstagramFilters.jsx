import React, { useRef, useState,useEffect,useContext } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { MdMovieFilter } from "react-icons/md";
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
import { FavoritesContext } from "../../Context/FavoriteContext";
import Comment from "../Text tools/Comment";

// Instagram-like filters using Tailwind filter utilities
const FILTERS = [
    { name: "Normal", className: "" },
    { name: "Clarendon", className: "brightness-125 contrast-110 saturate-130" },
    { name: "Gingham", className: "brightness-105 sepia" },
    { name: "Moon", className: "grayscale brightness-110 contrast-110" },
    { name: "Lark", className: "brightness-110 contrast-105 saturate-110" },
    { name: "Reyes", className: "brightness-110 sepia contrast-95" },
    { name: "Juno", className: "contrast-115 saturate-125" },
    { name: "Slumber", className: "brightness-90 saturate-85" },
    { name: "Crema", className: "brightness-105 contrast-95 sepia" },
    { name: "Ludwig", className: "brightness-105 contrast-105 saturate-95" },
    { name: "Aden", className: "brightness-115 contrast-90 saturate-125 hue-rotate-15" },
    { name: "Perpetua", className: "brightness-105 contrast-110 saturate-110" },
];

// Placeholder image for filter previews
const PREVIEW_IMG =
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80";

export default function InstagramFilters({id="Instagram Filters"}) {
    const { updateFavorites } = useContext(FavoritesContext);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const [urlInput, setUrlInput] = useState("");
    const [active, setActive] = useState("Normal");
    const dropRef = useRef(null);
    const imageRef = useRef(null);

    // Handle file upload
    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => setImgSrc(e.target.result);
        reader.readAsDataURL(file);
    };

    // Handle drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    // Handle image download
    const handleDownload = async () => {
        if (!imgSrc) return;
        const dataUrl = await toPng(imageRef.current);
        saveAs(dataUrl, "filtered-image.png");
    };

    // Handle URL upload
    const handleUrlUpload = () => {
        if (urlInput.trim()) setImgSrc(urlInput.trim());
        setUrlInput("");
    };
    // Helper function
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const rows = chunkArray(FILTERS, Math.ceil(FILTERS.length / 2));

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
        <div className="max-w-4xl mx-auto p-3 md:p-7">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-4xl text-indigo-400 mt-4">
                        <MdMovieFilter />
                    </span>
                    <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
                        Instagram&nbsp;Filters
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
                            : "bg-indigo-50  text-indigo-600"
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
                            <h2 className="text-xl  mb-5 text-gray-600">
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
                            className="absolute top-4 right-4 text-gray-600 text-lg"
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
            {/* Upload controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <label className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                    />
                    <span className="w-full block cursor-pointer py-2 rounded-md text-center  bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]">
                        <svg className="inline mr-2" width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <path stroke="#fff" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload File
                    </span>
                </label>
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Upload from URL"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none"
                    />
                    <button
                        onClick={handleUrlUpload}
                        className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] rounded-r-md  transition"
                    >
                        Upload from URL
                    </button>
                </div>
            </div>

            {/* Drag and drop zone */}
            <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-center mb-4 bg-white"
                style={{ minHeight: "80px" }}
            >
                <div className="text-gray-500">
                    <svg className="mx-auto mb-2" width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <path stroke="#bbb" strokeWidth="2" d="M12 16v-8m0 0l-4 4m4-4l4 4" />
                    </svg>
                    Drag your image here, or click to <span className="text-violet-600 font-medium cursor-pointer underline">browse</span>
                </div>
            </div>

            {/* Main preview area */}
            <div className="w-full bg-white rounded-lg mb-4 flex items-center justify-center min-h-[160px]">
                {imgSrc ? (
                    <div ref={imageRef} className="flex items-center justify-center w-full">
                        <img
                            src={imgSrc}
                            alt="Preview"
                            className={`max-h-64 max-w-full mx-auto rounded-md shadow ${FILTERS.find(f => f.name === active)?.className}`}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full py-10 text-gray-400">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                            <path stroke="#bbb" strokeWidth="2" d="M12 8v8m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        <div className="mt-2 text-base text-center">Upload an image before starting to apply filters</div>
                    </div>
                )}
            </div>

            {/* Filter thumbnails */}
            {/* <div className="w-full overflow-x-auto mb-4">
                <div className="flex gap-2 min-w-max">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.name}
                            onClick={() => setActive(filter.name)}
                            className={`cursor-pointer flex flex-col items-center focus:outline-none ${active === filter.name ? "border-2 border-violet-500 rounded" : ""
                                }`}
                        >
                            <img
                                src={imgSrc || PREVIEW_IMG}
                                alt={filter.name}
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded object-cover mb-1 ${filter.className}`}
                            />
                            <span className={`text-xs ${active === filter.name ? "text-violet-700 font-bold" : "text-gray-500"}`}>{filter.name}</span>
                        </button>
                    ))}
                </div>
            </div> */}
            <div className="w-full overflow-x-auto mb-4">

                {/* ✅ Mobile View: Two Rows */}
                <div className="space-y-2 md:hidden">
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2 ">
                            {row.map((filter) => (
                                <button
                                    key={filter.name}
                                    onClick={() => setActive(filter.name)}
                                    className={`cursor-pointer flex flex-col items-center focus:outline-none ${active === filter.name ? "border-2 border-violet-500 rounded" : ""
                                        }`}
                                >
                                    <img
                                        src={imgSrc || PREVIEW_IMG}
                                        alt={filter.name}
                                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded object-cover mb-1 ${filter.className}`}
                                    />
                                    <span
                                        className={`text-xs ${active === filter.name
                                            ? "text-violet-700 font-bold"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {filter.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                {/* ✅ Tablet/Desktop View: One Row */}
                <div className="hidden md:flex gap-2 min-w-max">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.name}
                            onClick={() => setActive(filter.name)}
                            className={`cursor-pointer flex flex-col items-center focus:outline-none ${active === filter.name ? "border-2 border-violet-500 rounded" : ""
                                }`}
                        >
                            <img
                                src={imgSrc || PREVIEW_IMG}
                                alt={filter.name}
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded object-cover mb-1 ${filter.className}`}
                            />
                            <span
                                className={`text-xs ${active === filter.name
                                    ? "text-violet-700 font-bold"
                                    : "text-gray-500"
                                    }`}
                            >
                                {filter.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>


            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row w-full gap-2 justify-between items-center">
                <button
                    onClick={() => setActive("Normal")}
                    className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-6 py-2 rounded-full "
                >
                    Reset
                </button>
                <button
                    onClick={handleDownload}
                    disabled={!imgSrc}
                    className={`w-full sm:w-auto cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-6 py-2 rounded-full  flex items-center gap-2 ${imgSrc
                        ? ""
                        : "bg-violet-100 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <path stroke="#fff" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Download
                </button>
            </div>
        </div>
            <Comment/>
            </>
    );
}
