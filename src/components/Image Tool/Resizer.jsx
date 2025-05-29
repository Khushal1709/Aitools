import { useRef, useState,useContext,useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { LuDownload, LuRefreshCw } from "react-icons/lu";
import { GiResize } from "react-icons/gi";
import { FiShare2, FiAlertCircle } from "react-icons/fi";
import {
    FaCheck,
    FaRegStar,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaEnvelope,
    FaCopy,
} from "react-icons/fa6";
import { MdShare } from "react-icons/md";
import { FavoritesContext } from "../../Context/FavoriteContext";
import Comment from "../Text tools/Comment";

export default function ImageResizer({id="Image Resizer"}) {
    const { updateFavorites } = useContext(FavoritesContext);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [pngDataUrl, setPngDataUrl] = useState(null);
    const [width, setWidth] = useState(806);
    const [height, setHeight] = useState(743);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (
            file.type === "image/png" ||
            file.type === "image/jpeg" ||
            file.type === "image/jpg"
        ) {
            setFileName(file.name.replace(/\.[^/.]+$/, ""));
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageSrc(ev.target.result);
                const img = new window.Image();
                img.onload = () => {
                    setWidth(img.width);
                    setHeight(img.height);
                };
                img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            setImageSrc(null);
            setFileName("");
            alert("Only PNG or JPG files are supported.");
        }
    };

    const handleResize = () => {
        if (imageSrc) {
            fetch(imageSrc)
                .then(res => res.blob())
                .then(blob => {
                    Resizer.imageFileResizer(blob, width, height, "PNG", 100, 0, (uri) => {
                        setPngDataUrl(uri);
                    }, "base64");
                });
        }
    };

    const handleDownload = () => {
        if (!pngDataUrl) return;
        const link = document.createElement("a");
        link.href = pngDataUrl;
        link.download = "resized-image.png";
        link.click();
    };

    const handleReset = () => {
        setImageSrc(null);
        setPngDataUrl(null);
        setFileName("");
        setWidth(806);
        setHeight(743);
        if (fileInputRef.current) fileInputRef.current.value = "";
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
        <div className="max-w-4xl mx-auto p-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-4xl text-indigo-400 mt-5">
                        <GiResize />
                    </span>
                    <span className="text-2xl font-bold text-gray-900 mt-5">
                        Image&nbsp;Resizer
                    </span>
                </div>
                <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-2 sm:gap-3 md:mt-5">
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
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl max-w-xs sm:max-w-md w-full relative overflow-y-auto max-h-[90vh]">
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
                            <p className="text-sm mb-1 text-gray-500">
                                You are currently sharing:
                            </p>
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
                <div className="fixed inset-0 bg-black/30 z-40 flex justify-center items-center p-2">
                    <div className="bg-white max-w-xs sm:max-w-md w-full p-4 sm:p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]">
                        <h2 className="text-lg sm:text-xl font-bold mb-2">Bug Report</h2>
                        <p className="text-sm mb-4">
                            <strong>Tool:</strong> Image Resizer
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

            {/* Upload / Drag & Drop */}
            {!imageSrc && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center mb-8">
                    <label
                        className="cursor-pointer flex flex-col items-center text-indigo-400"
                        htmlFor="file-input"
                    >
                        <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2">
                            <path d="M12 16v6h8v-6h5l-9-9-9 9h5z"></path>
                            <path d="M20 21v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2"></path>
                        </svg>
                        <span>
                            Drag your image here, or click to <span className="font-semibold">browse</span>
                        </span>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/png,image/jpeg"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            )}

            {/* Preview & Controls */}
            {imageSrc && (
                <div className="flex flex-col gap-6">
                    {/* Image Preview Card */}
                    <div className="bg-white rounded-xl border border-gray-300 flex flex-col items-center py-8 px-4">
                        <img
                            src={imageSrc}
                            alt="preview"
                            className="rounded-lg object-contain border border-gray-300"
                            style={{ width: width, height: height, maxWidth: "100%", maxHeight: "320px" }}
                        />
                        <div className="mt-4 text-center">
                            <div className="font-medium text-gray-800">{fileName || "Image"}</div>
                            <div className="text-xs text-gray-400 mt-1">
                                Size: {width} × {height}
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-300">
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            {/* Width Input */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-1" htmlFor="width">Width</label>
                                <input
                                    id="width"
                                    type="number"
                                    min={1}
                                    value={width}
                                    onChange={e => setWidth(Number(e.target.value))}
                                    className="w-[100px] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring font-semibold"
                                    placeholder="Width"
                                />
                            </div>
                            {/* Height Input */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-1" htmlFor="height">Height</label>
                                <input
                                    id="height"
                                    type="number"
                                    min={1}
                                    value={height}
                                    onChange={e => setHeight(Number(e.target.value))}
                                    className="w-[100px] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring font-semibold"
                                    placeholder="Height"
                                />
                            </div>
                            {/* Resize Button */}
                            <button
                                onClick={handleResize}
                                className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-6 py-2 rounded-lg shadow-none"
                            >
                                Resize
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <button
                                onClick={handleReset}
                                className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] flex items-center gap-2 px-6 py-2 rounded-lg w-full sm:w-auto"
                            >
                                <LuRefreshCw className="text-lg" />
                                Reset
                            </button>
                            <button
                                onClick={handleDownload}
                                disabled={!pngDataUrl}
                                className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] flex items-center gap-2 px-6 py-2 rounded-lg w-full sm:w-auto"
                            >
                                <LuDownload className="text-lg" />
                                Download
                            </button>
                        </div>
                    </div>

                    {/* Resized Image Preview */}
                    {pngDataUrl && (
                        <div className="flex flex-col items-center mt-4">
                            <img
                                src={pngDataUrl}
                                alt="Resized"
                                className="rounded-lg border max-w-full"
                                style={{ maxHeight: 200 }}
                            />
                            <div className="text-xs text-gray-400 mt-2">Resized Image Preview</div>
                        </div>
                    )}
                </div>
            )}
        </div>
            <Comment/>
            </>
    );
}
