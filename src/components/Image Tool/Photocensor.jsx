import { useRef, useState, useCallback,useContext,useEffect } from "react";
import Cropper from "react-easy-crop";
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
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";


const censorTypes = [
  { value: "pixelate", label: "Pixelate" },
  { value: "blur", label: "Blur" },
  { value: "blackbar", label: "Black Bar" },
];

function getCroppedImg(image, crop, censorType, pixelSize) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  if (censorType === "pixelate") {
    const { x, y, width, height } = crop;
    for (let py = y; py < y + height; py += pixelSize) {
      for (let px = x; px < x + width; px += pixelSize) {
        const w = Math.min(pixelSize, x + width - px);
        const h = Math.min(pixelSize, y + height - py);
        const imgData = ctx.getImageData(px, py, w, h).data;
        let r = 0, g = 0, b = 0, a = 0, count = 0;
        for (let i = 0; i < imgData.length; i += 4) {
          r += imgData[i];
          g += imgData[i + 1];
          b += imgData[i + 2];
          a += imgData[i + 3];
          count++;
        }
        r = r / count;
        g = g / count;
        b = b / count;
        a = a / count;
        ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
        ctx.fillRect(px, py, w, h);
      }
    }
  } else if (censorType === "blur") {
    const { x, y, width, height } = crop;
    // Create a temporary canvas for the cropped area
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    // Draw the cropped area onto the temp canvas
    tempCtx.drawImage(
      image,
      x * scaleX, y * scaleY, width * scaleX, height * scaleY, // Source rect (scaled)
      0, 0, width, height // Destination rect
    );
    // Apply blur filter and redraw
    tempCtx.filter = `blur(${pixelSize}px)`;
    tempCtx.drawImage(tempCanvas, 0, 0, width, height, 0, 0, width, height);
    // Draw the blurred area back to the main canvas
    ctx.drawImage(tempCanvas, x, y);
  } else if (censorType === "blackbar") {
    const { x, y, width, height } = crop;
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, width, height);
  }

  return canvas.toDataURL("image/jpeg");
}

export default function Photocensor({id="Photo Censor"}) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [censorType, setCensorType] = useState("pixelate");
  const [pixelSize, setPixelSize] = useState(10);
  const [censoredImg, setCensoredImg] = useState(null);
  const imgRef = useRef(null);

   const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCensor = async () => {
    if (!croppedAreaPixels || !imgRef.current) return;
    const img = imgRef.current;
    const crop = {
      x: Math.round(croppedAreaPixels.x),
      y: Math.round(croppedAreaPixels.y),
      width: Math.round(croppedAreaPixels.width),
      height: Math.round(croppedAreaPixels.height),
    };
    const out = getCroppedImg(img, crop, censorType, pixelSize);
    setCensoredImg(out);
  };

  const handleReset = () => {
    setCensoredImg(null);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const handleDownload = () => {
    if (!censoredImg) return;
    const link = document.createElement("a");
    link.href = censoredImg;
    link.download = "censored.jpg";
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
     <div className="max-w-4xl mx-auto p-3">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <span className="text-4xl text-indigo-400 mt-6">
                            <MdMovieFilter />
                        </span>
                        <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-6">
                            Photo&nbsp;Censor
                        </span>
                    </div>
                    <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 mt-4 lg:justify-end lg:gap-2">
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
        {!imageSrc && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center mb-6">
            <label className="cursor-pointer flex flex-col items-center text-indigo-400">
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2">
                <path d="M12 16v6h8v-6h5l-9-9-9 9h5z"></path>
                <path d="M20 21v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2"></path>
              </svg>
              <span>Drag your image here, or click to <span className="font-semibold">browse</span></span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        )}

        {imageSrc && !censoredImg && (
          <div className="relative w-full h-96 bg-gray-100 mb-6">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="rect"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <img
              ref={imgRef}
              src={imageSrc}
              alt="to censor"
              className="hidden"
              onLoad={e => { imgRef.current = e.target; }}
            />
          </div>
        )}

        {censoredImg && (
          <div className="flex flex-col items-center mb-6">
            <img src={censoredImg} alt="censored" className="rounded-lg max-w-full" style={{ maxHeight: 350 }} />
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Censor Type</label>
            <select
              className="border border-gray-200 rounded px-2 py-1"
              value={censorType}
              onChange={e => setCensorType(e.target.value)}
            >
              {censorTypes.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Pixel Size: {pixelSize}px</label>
            <input
              type="range"
              min={5}
              max={30}
              value={pixelSize}
              onChange={e => setPixelSize(Number(e.target.value))}
              className="w-32"
              disabled={censorType !== "pixelate" && censorType !== "blur"}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] flex-1 py-2 rounded-lg `}
            onClick={handleCensor}
            disabled={!imageSrc || !croppedAreaPixels || censoredImg}
          >
            Censor
          </button>
          <button
            className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] flex-1 py-2 rounded-lg border border-gray-300 "
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className={`cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] flex-1 py-2 rounded-lg `}
            onClick={handleDownload}
            disabled={!censoredImg}
          >
            Download
          </button>
        </div>
      </div>
        <Comment/>
        </>
  );
}
