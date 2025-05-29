import React, { useState, useRef,useContext, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { TbColorPicker } from "react-icons/tb";
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

const ImageColorPicker = ({id="Image Color Picker"}) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [imageLabel, setImageLabel] = useState("");
  const [copied, setCopied] = useState({ hex: false, rgba: false, hsl: false });
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle file upload via input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setImageLabel(file.name.split('.')[0] || "hot 2");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop functionality
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setImageLabel(file.name.split('.')[0] || "hot 2");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Setup canvas and image when imageUrl changes
  useEffect(() => {
    if (imageUrl && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;

      const drawToCanvas = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      };

      img.onload = drawToCanvas;
      if (img.complete) drawToCanvas();
    }
  }, [imageUrl]);

  // Handle click on image to extract color
  const handleImageClick = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixelData;
    setSelectedColor({ r, g, b });
    setCopied({ hex: false, rgba: false, hsl: false });
  };

  // Convert RGB to HEX
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }
    return [
      Math.round(h * 360),
      Math.round(s * 10) / 10,
      Math.round(l * 10) / 10
    ];
  };

  // Copy handlers
  const handleCopyHex = () => {
    if (selectedColor) {
      const hex = rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b);
      navigator.clipboard.writeText(hex);
      setCopied({ hex: true, rgba: false, hsl: false });
      setTimeout(() => setCopied({ hex: false, rgba: false, hsl: false }), 1200);
    }
  };
  const handleCopyRgba = () => {
    if (selectedColor) {
      const rgba = `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`;
      navigator.clipboard.writeText(rgba);
      setCopied({ hex: false, rgba: true, hsl: false });
      setTimeout(() => setCopied({ hex: false, rgba: false, hsl: false }), 1200);
    }
  };
  const handleCopyHsl = () => {
    if (selectedColor) {
      const [h, s, l] = rgbToHsl(selectedColor.r, selectedColor.g, selectedColor.b);
      const hsl = `hsl(${h}, ${s}%, ${l}%)`;
      navigator.clipboard.writeText(hsl);
      setCopied({ hex: false, rgba: false, hsl: true });
      setTimeout(() => setCopied({ hex: false, rgba: false, hsl: false }), 1200);
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
    <div className="max-w-4xl mx-auto p-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400 mt-5">
            <TbColorPicker />
          </span>
          <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-5">
          Image&nbsp;Color&nbsp;Picker
          </span>
        </div>
        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 md:mt-5 lg:justify-end lg:gap-2">
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


      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6 cursor-pointer"
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        <p className="text-gray-600">
          Drag your image here, or click to <span className="text-indigo-600 font-medium">browse</span>
        </p>
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="relative overflow-hidden">
            <div
              className="cursor-crosshair"
              onClick={handleImageClick}
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-auto rounded"
                crossOrigin="anonymous"
                style={{ display: 'block', maxWidth: '100%' }}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 opacity-0 pointer-events-none"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          <p className="text-center text-gray-500 mt-2">{imageLabel || "hot 2"}</p>
        </div>
      )}

      {/* Color Information */}
      {selectedColor && (
        <div className="flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 max-w-md mx-auto">
          <div
            className="w-32 h-32"
            style={{ backgroundColor: rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b) }}
          />
          <div className="flex-1 p-4 font-mono">
            {/* HEX */}
            <div className="mb-4 flex items-center gap-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">HEX</p>
                <p className="inline-block font-medium">{rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b)}</p>
              </div>
              <button
                className="ml-2 p-1 rounded hover:bg-gray-100 transition"
                onClick={handleCopyHex}
                title="Copy HEX"
              >
                <MdContentCopy className={`text-lg ${copied.hex ? "text-green-500" : "text-gray-400"}`} />
              </button>
              {copied.hex && <span className="text-xs text-green-500 ml-1">Copied!</span>}
            </div>
            {/* RGBA */}
            <div className="mb-4 flex items-center gap-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">RGBA</p>
                <p>rgb({selectedColor.r}, {selectedColor.g}, {selectedColor.b})</p>
              </div>
              <button
                className="ml-2 p-1 rounded hover:bg-gray-100 transition"
                onClick={handleCopyRgba}
                title="Copy RGBA"
              >
                <MdContentCopy className={`text-lg ${copied.rgba ? "text-green-500" : "text-gray-400"}`} />
              </button>
              {copied.rgba && <span className="text-xs text-green-500 ml-1">Copied!</span>}
            </div>
            {/* HSLA */}
            <div className="flex items-center gap-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">HSLA</p>
                <p>{(() => {
                  const [h, s, l] = rgbToHsl(selectedColor.r, selectedColor.g, selectedColor.b);
                  return `hsl(${h}, ${s}%, ${l}%)`;
                })()}</p>
              </div>
              <button
                className="ml-2 p-1 rounded hover:bg-gray-100 transition"
                onClick={handleCopyHsl}
                title="Copy HSLA"
              >
                <MdContentCopy className={`text-lg ${copied.hsl ? "text-green-500" : "text-gray-400"}`} />
              </button>
              {copied.hsl && <span className="text-xs text-green-500 ml-1">Copied!</span>}
            </div>
          </div>
        </div>
      )}
    </div>
      <Comment/>
      </>
  );
};

export default ImageColorPicker;
