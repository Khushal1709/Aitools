import React, { useRef, useState, useCallback, useEffect, useContext } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FaCropSimple } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import {
    FaCheck,
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

// Utility: rotate image and return dataURL
function getRotatedImage(imageSrc, rotation = 0) {
    return new Promise((resolve) => {
        const image = new window.Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (rotation % 180 === 90) {
                canvas.width = image.height;
                canvas.height = image.width;
            } else {
                canvas.width = image.width;
                canvas.height = image.height;
            }
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(image, -image.width / 2, -image.height / 2);
            ctx.restore();
            resolve(canvas.toDataURL("image/png"));
        };
        image.src = imageSrc;
    });
}

export default function ImageCropper({ id = "Image Cropper" }) {
    const { updateFavorites } = useContext(FavoritesContext);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);
    const [upImg, setUpImg] = useState(null);
    const [rotatedImg, setRotatedImg] = useState(null);
    const [rotation, setRotation] = useState(0);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%", x: 0, y: 0, width: 50, height: 50 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false); // Track image load state

    // File input or drag-drop
    const onSelectFile = (e) => {
        e.preventDefault();
        let file;
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0];
        } else if (e.target.files) {
            file = e.target.files[0];
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUpImg(reader.result);
                setRotatedImg(reader.result);
                setRotation(0);
                setCrop({ unit: "%", x: 0, y: 0, width: 50, height: 50 });
                setCompletedCrop(null);
                setImageLoaded(false); // Reset image loaded state
            };
            reader.readAsDataURL(file);
        }
    };

    // Drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    // Rotate image by 90deg
    const handleRotate = async () => {
        if (!upImg) return;
        const newRotation = (rotation + 90) % 360;
        const rotated = await getRotatedImage(upImg, newRotation);
        setRotatedImg(rotated);
        setRotation(newRotation);
        setCrop({ unit: "%", x: 0, y: 0, width: 50, height: 50 });
        setCompletedCrop(null);
        setImageLoaded(false); // Reset image loaded state
    };

    // Image load handler: FIXED - ensure proper image reference
    const onImageLoad = useCallback((e) => {
        const img = e.currentTarget;
        imgRef.current = img; // Store the actual img element
        setImageLoaded(true); // Mark image as loaded
        setCrop({ unit: "%", x: 0, y: 0, width: 50, height: 50 });
    }, []);

    // Draw cropped image to canvas - FIXED with better checks
    useEffect(() => {
        // Enhanced validation before drawing
        if (
            !completedCrop ||
            !previewCanvasRef.current ||
            !imgRef.current ||
            !imageLoaded ||
            typeof completedCrop.x !== "number" ||
            typeof completedCrop.y !== "number" ||
            typeof completedCrop.width !== "number" ||
            typeof completedCrop.height !== "number" ||
            completedCrop.width <= 0 ||
            completedCrop.height <= 0 ||
            !imgRef.current.complete || // Check if image is fully loaded
            imgRef.current.naturalWidth === 0 // Additional check for valid image
        ) return;

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        // Additional safety check
        if (!(image instanceof HTMLImageElement)) {
            console.error("imgRef.current is not an HTMLImageElement");
            return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        try {
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        } catch (error) {
            console.error("Error drawing image:", error);
        }
    }, [completedCrop, rotatedImg, imageLoaded]);

    // Download cropped image
    const handleDownload = useCallback(() => {
        if (!previewCanvasRef.current) return;
        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `cropped-${Date.now()}.png`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, "image/png");
    }, []);

    // Reset
    const handleReset = () => {
        setUpImg(null);
        setRotatedImg(null);
        setRotation(0);
        setCompletedCrop(null);
        setCrop({ unit: "%", x: 0, y: 0, width: 50, height: 50 });
        setImageLoaded(false);
    };

    // Placeholder crop function
    const handleCrop = () => {
        alert("Crop functionality handled on selection. Download to save cropped image.");
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
        <div className="max-w-4xl mx-auto p-2">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-4xl text-indigo-400 mt-6">
                        <FaCropSimple />
                    </span>
                    <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-5">
                        {/* Java&nbsp;Script&nbsp;Minifier */}
                        Images&nbsp;Cropper
                    </span>
                </div>
                <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 md:mt-6 lg:justify-end lg:gap-2">
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


            {/* Upload / Drag Area */}
            <div
                className={`w-full max-w-4xl border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-8 mb-8 transition-colors ${dragActive ? "border-indigo-400 bg-indigo-50" : "border-gray-300 bg-white"}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={(e) => { setDragActive(false); onSelectFile(e); }}
            >
                {!rotatedImg ? (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            className="hidden"
                            onChange={onSelectFile}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer text-gray-500 text-center">
                            Drag your image here, or click to <span className="text-indigo-600 underline">browse</span>
                        </label>
                    </>
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <ReactCrop
                            crop={crop}
                            onChange={setCrop}
                            onComplete={setCompletedCrop}
                            aspect={undefined}
                            className="max-w-full"
                        >
                            <img
                                ref={imgRef}
                                src={rotatedImg}
                                alt="Source"
                                onLoad={onImageLoad}
                                className="max-h-96 w-auto mx-auto"
                            />
                        </ReactCrop>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row w-full max-w-4xl gap-3 sm:gap-4 justify-between mb-4 px-2 sm:px-4">
                <button
                    className="w-full sm:w-auto px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] disabled:opacity-50"
                    onClick={handleRotate}
                    disabled={!rotatedImg}
                >
                    &#8635; Rotate
                </button>
                <button
                    className="w-full sm:w-auto px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] disabled:opacity-50"
                    onClick={handleCrop}
                    disabled={!rotatedImg}
                >
                    Crop
                </button>
                <button
                    className="w-full sm:w-auto px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button
                    className="w-full sm:w-auto px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] disabled:opacity-50"
                    onClick={handleDownload}
                    disabled={!completedCrop || !rotatedImg || !imageLoaded}
                >
                    Download
                </button>
            </div>


            {/* Cropped Preview */}
            {completedCrop && completedCrop.width > 0 && completedCrop.height > 0 && imageLoaded && (
                <div className="w-full max-w-2xl flex flex-col items-center mt-6">
                    <h3 className="mb-2 font-semibold text-gray-700">Cropped Preview</h3>
                    <canvas
                        ref={previewCanvasRef}
                        className="border rounded-lg shadow"
                        style={{
                            width: completedCrop.width,
                            height: completedCrop.height,
                            maxWidth: "100%",
                        }}
                    />
                </div>
            )}
        </div>
            <Comment />
            </>
    );
}
