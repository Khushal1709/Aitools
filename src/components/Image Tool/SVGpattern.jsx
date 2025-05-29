
import React, { useState, useRef, useEffect,useContext } from "react";
import { TbFileTypeSvg } from "react-icons/tb";
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

const SVGpattern = ({id="SVGpattern"}) => {
    const { updateFavorites } = useContext(FavoritesContext);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);
    // Main state variables
    const [patternType, setPatternType] = useState("circle");
    const [patternColor, setPatternColor] = useState("#47d3ff");
    const [backgroundColor, setBackgroundColor] = useState("#474bff");
    const [size, setSize] = useState(32);
    const [spacing, setSpacing] = useState(30);
    const [rotation, setRotation] = useState(0);
    const [skew, setSkew] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [width, setWidth] = useState(1200);
    const [height, setHeight] = useState(630);
    const [showDropdown, setShowDropdown] = useState(false);

    const svgRef = useRef(null);

    // Generate SVG pattern elements based on current parameters
    const generatePatternElements = () => {
        const elements = [];
        const cols = Math.ceil(width / (size + spacing));
        const rows = Math.ceil(height / (size + spacing));

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const posX = x * (size + spacing) + spacing / 2;
                const posY = y * (size + spacing) + spacing / 2;

                let element;

                switch (patternType) {
                    case "circle":
                        element = (
                            <circle
                                key={`${x}-${y}`}
                                cx={posX}
                                cy={posY}
                                r={size / 2}
                                fill={patternColor}
                                opacity={opacity}
                                transform={`rotate(${rotation} ${posX} ${posY}) skewX(${skew})`}
                            />
                        );
                        break;

                    case "plus":
                        const plusWidth = size * 0.2;
                        const plusHeight = size * 0.6;
                        element = (
                            <g key={`${x}-${y}`} transform={`rotate(${rotation} ${posX} ${posY}) skewX(${skew})`} opacity={opacity}>
                                <rect
                                    x={posX - plusWidth / 2}
                                    y={posY - plusHeight / 2}
                                    width={plusWidth}
                                    height={plusHeight}
                                    fill={patternColor}
                                />
                                <rect
                                    x={posX - plusHeight / 2}
                                    y={posY - plusWidth / 2}
                                    width={plusHeight}
                                    height={plusWidth}
                                    fill={patternColor}
                                />
                            </g>
                        );
                        break;

                    case "square":
                        element = (
                            <rect
                                key={`${x}-${y}`}
                                x={posX - size / 2}
                                y={posY - size / 2}
                                width={size}
                                height={size}
                                fill={patternColor}
                                opacity={opacity}
                                transform={`rotate(${rotation} ${posX} ${posY}) skewX(${skew})`}
                            />
                        );
                        break;

                    case "triangle":
                        const trianglePoints = `${posX},${posY - size / 2} ${posX - size / 2},${posY + size / 2} ${posX + size / 2},${posY + size / 2}`;
                        element = (
                            <polygon
                                key={`${x}-${y}`}
                                points={trianglePoints}
                                fill={patternColor}
                                opacity={opacity}
                                transform={`rotate(${rotation} ${posX} ${posY}) skewX(${skew})`}
                            />
                        );
                        break;

                    case "right-triangle":
                        const rightTrianglePoints = `${posX - size / 2},${posY - size / 2} ${posX - size / 2},${posY + size / 2} ${posX + size / 2},${posY + size / 2}`;
                        element = (
                            <polygon
                                key={`${x}-${y}`}
                                points={rightTrianglePoints}
                                fill={patternColor}
                                opacity={opacity}
                                transform={`rotate(${rotation} ${posX} ${posY}) skewX(${skew})`}
                            />
                        );
                        break;

                    case "half-circle":
                        element = (
                            <path
                                key={`${x}-${y}`}
                                d={`M ${posX - size / 2} ${posY} A ${size / 2} ${size / 2} 0 0 1 ${posX + size / 2} ${posY} Z`}
                                fill={patternColor}
                                opacity={opacity}
                                transform={`rotate(${rotation} ${posX} ${posY}) skewX(${skew})`}
                            />
                        );
                        break;

                    case "double-half-circle":
                        element = (
                            <g key={`${x}-${y}`} opacity={opacity} transform={`rotate(${rotation} ${posX} ${posY}) skewX(${skew})`}>
                                <path
                                    d={`M ${posX - size / 2} ${posY} A ${size / 2} ${size / 2} 0 0 1 ${posX + size / 2} ${posY} Z`}
                                    fill={patternColor}
                                />
                                <path
                                    d={`M ${posX - size / 2} ${posY} A ${size / 2} ${size / 2} 0 0 0 ${posX + size / 2} ${posY} Z`}
                                    fill={patternColor}
                                    transform={`rotate(180 ${posX} ${posY})`}
                                />
                            </g>
                        );
                        break;

                    default:
                        break;
                }

                if (element) {
                    elements.push(element);
                }
            }
        }

        return elements;
    };

    // Reset all sliders to default values
    const handleReset = () => {
        setSize(32);
        setSpacing(30);
        setRotation(0);
        setSkew(0);
        setOpacity(1);
    };

    // Generate random colors for pattern and background
    const shuffleColors = () => {
        const randomColor = () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        };
        setPatternColor(randomColor());
        setBackgroundColor(randomColor());
    };

    // Handle full screen preview
    const handleFullScreenPreview = () => {
        if (svgRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                svgRef.current.requestFullscreen();
            }
        }
    };

    // Export SVG file
    const handleExport = () => {
        if (!svgRef.current) return;

        // Create a copy of the SVG element
        const svgData = new XMLSerializer().serializeToString(svgRef.current);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `svg-pattern-${Date.now()}.svg`;
        link.click();
        URL.revokeObjectURL(url);
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
                    <span className="text-4xl text-indigo-400 mt-4">
                        <TbFileTypeSvg />
                    </span>
                    <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-4">
                             SVG&nbsp;Pattern&nbsp;Generator
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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pattern preview */}
                <div>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div
                            ref={svgRef}
                            className="w-full aspect-square relative"
                            style={{ backgroundColor: backgroundColor }}
                        >
                            <svg
                                width="100%"
                                height="100%"
                                viewBox={`0 0 ${width} ${height}`}
                                preserveAspectRatio="xMidYMid slice"
                            >
                                {generatePatternElements()}
                            </svg>
                        </div>
                        <div className="p-4 flex justify-center">
                            <button
                                onClick={handleFullScreenPreview}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                </svg>
                                Full Screen Preview
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    {/* Pattern Type */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pattern Type</label>
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <div className="flex items-center">
                                    {patternType === "circle" && (
                                        <>
                                            <span className="inline-block w-4 h-4 mr-2 rounded-full bg-current" />
                                            <span>Circle</span>
                                        </>
                                    )}
                                    {patternType === "plus" && (
                                        <>
                                            <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-current">+</span>
                                            <span>Plus</span>
                                        </>
                                    )}
                                    {patternType === "square" && (
                                        <>
                                            <span className="inline-block w-4 h-4 mr-2 bg-current" />
                                            <span>Square</span>
                                        </>
                                    )}
                                    {patternType === "triangle" && (
                                        <>
                                            <span className="inline-block w-0 h-0 mr-2 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-current" />
                                            <span>Triangle</span>
                                        </>
                                    )}
                                    {patternType === "right-triangle" && (
                                        <>
                                            <span className="inline-block w-4 h-4 mr-2 border-b-current border-r-current border-b-[10px] border-r-[10px]" />
                                            <span>Right Triangle</span>
                                        </>
                                    )}
                                    {patternType === "half-circle" && (
                                        <>
                                            <span className="inline-block w-4 h-2 mr-2 rounded-t-full bg-current" />
                                            <span>Half Circle</span>
                                        </>
                                    )}
                                    {patternType === "double-half-circle" && (
                                        <>
                                            <span className="inline-block w-4 h-4 mr-2 bg-current rounded-t-full" />
                                            <span>Double Half Circle</span>
                                        </>
                                    )}
                                </div>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </span>
                            </button>

                            {showDropdown && (
                                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    <div
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPatternType("circle");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <span className="inline-block w-4 h-4 mr-2 rounded-full bg-current" />
                                        <span>Circle</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPatternType("plus");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-current">+</span>
                                        <span>Plus</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPatternType("square");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <span className="inline-block w-4 h-4 mr-2 bg-current" />
                                        <span>Square</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPatternType("triangle");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <span className="inline-block w-0 h-0 mr-2 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-current" />
                                        <span>Triangle</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPatternType("right-triangle");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <span className="inline-block w-4 h-4 mr-2 border-b-current border-r-current border-b-[10px] border-r-[10px]" />
                                        <span>Right Triangle</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPatternType("half-circle");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <span className="inline-block w-4 h-2 mr-2 rounded-t-full bg-current" />
                                        <span>Half Circle</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPatternType("double-half-circle");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <span className="inline-block w-4 h-4 mr-2 bg-current rounded-t-full" />
                                        <span>Double Half Circle</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pattern Color</label>
                            <div className="flex items-center">
                                <input
                                    type="color"
                                    value={patternColor}
                                    onChange={(e) => setPatternColor(e.target.value)}
                                    className="w-10 h-10 p-0 border-0 rounded"
                                />
                                <input
                                    type="text"
                                    value={patternColor}
                                    onChange={(e) => setPatternColor(e.target.value)}
                                    className="ml-2 flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                            <div className="flex items-center">
                                <input
                                    type="color"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    className="w-10 h-10 p-0 border-0 rounded"
                                />
                                <input
                                    type="text"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    className="ml-2 flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pattern Settings */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-900">Pattern Settings</h3>
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Size slider */}
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Size: {size}px</label>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="100"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                            />
                        </div>

                        {/* Spacing slider */}
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Spacing: {spacing}px</label>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={spacing}
                                onChange={(e) => setSpacing(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                            />
                        </div>

                        {/* Rotation slider */}
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Rotation: {rotation}deg</label>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={rotation}
                                onChange={(e) => setRotation(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                            />
                        </div>

                        {/* Skew slider */}
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Skew: {skew}deg</label>
                            </div>
                            <input
                                type="range"
                                min="-90"
                                max="90"
                                value={skew}
                                onChange={(e) => setSkew(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                            />
                        </div>

                        {/* Opacity slider */}
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Pattern Opacity: {opacity}</label>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={opacity}
                                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                            />
                        </div>
                    </div>

                    {/* Export Size Settings */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Export Size Settings</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Background Template</label>
                            <select
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option>OG Image</option>
                                <option>Twitter Banner</option>
                                <option>LinkedIn Cover</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(parseInt(e.target.value))}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(parseInt(e.target.value))}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={shuffleColors}
                            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm  rounded-md text-gray-700  bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Shuffle Colors
                        </button>
                        <button
                            onClick={handleExport}
                            className=" cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] inline-flex justify-center items-center px-4 py-2  text-sm  rounded-md shadow-sm "
                        >
                            Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
            <Comment/>
            </>
    );
};

export default SVGpattern;
